const router = require("express").Router();
const crypto = require("crypto");
var S3 = require("aws-sdk/clients/s3");
var s3 = new S3({ apiVersion: "2006-03-01" });
const CF = require("aws-sdk/clients/cloudfront");
const cloudFront = new CF();
const buckets = require("./awsBuckets");
const rateLimiter = require("../middleware/rateLimiter");
const verifyAdminToken = require("./verifyAdminToken");
const compressor = require("./compressor");
const _ = require("lodash/kebabCase");

router
  .route("/new-post")
  .post(rateLimiter.addPostSpeedLimiter, rateLimiter.addPostLimiter, verifyAdminToken, (req, res) => {
    //just setting the date format
    const date = new Date().toLocaleString("pt-BR", { month: "long", day: "numeric", year: "numeric" });

    const fullDate = {
      day: new Date().getDate(),
      month: new Date().toLocaleString("pt-BT", { month: "long" }),
      year: new Date().getFullYear(),
    };

    //calculating the readtime
    let i = 0;
    const bodyBlocks = req.body.body.blocks;
    const readTime = (totalLength, currentLength) => {
      return totalLength + currentLength.split(/\S+/g).length;
    };
    bodyBlocks.map((block) => {
      return (i = i + [block.text].reduce(readTime, -1));
    });
    const roundReadTime = Math.round(i / 130);

    const s3ObjectKey = "posts/" + fullDate.year + "/" + fullDate.month + "/" + Date.now() + "@" + _(req.body.title);

    const newPost = {
      id: crypto.randomBytes(10).toString("hex"),
      key: s3ObjectKey,
      coverImg: "data:image/png;base64," + Buffer.from(req.body.coverImg, "binary").toString("base64"),
      tag: req.body.tag,
      title: req.body.title,
      body: JSON.stringify(req.body.body),
      date: date,
      readTime: roundReadTime,
    };

    const newThumbnail = {
      id: newPost.id + "@thumbnail",
      key: "thumbnails/" + s3ObjectKey,
      coverImg: undefined,
      tag: req.body.tag,
      title: req.body.title,
      body: undefined,
      date: date,
      readTime: roundReadTime,
    };

    const params = {
      Body: Buffer.from(JSON.stringify(newPost), "utf-8"),
      Bucket: buckets.blog.name,
      Key: s3ObjectKey,
    };

    s3.putObject(params, (err, data) => {
      if (err) console.log(err, err.stack);
    })
      .promise()
      .then(() => {
        compressor
          .compressThumbnail(req.body.coverImg)
          .then((res) => {
            console.log("Compressed File Size: " + Math.round(res.length / 1024));
            newThumbnail.coverImg = "data:image/png;base64," + res;
          })
          .then(() => {
            if (bodyBlocks.length >= 2) {
              newThumbnail.body = (bodyBlocks[0].text + " " + bodyBlocks[1].text).slice(0, 300);
            } else {
              newThumbnail.body = bodyBlocks[0].text.slice(0, 300);
            }
          })
          .then(() => {
            const thumbnailParams = {
              Body: Buffer.from(JSON.stringify(newThumbnail), "utf-8"),
              Bucket: buckets.blog.name,
              Key: "thumbnails/" + s3ObjectKey,
            };
            return thumbnailParams;
          })
          .then((thumbnailParams) => {
            s3.putObject(thumbnailParams, (err, data) => {
              if (err) console.log(err, err.stack);
            })
              .promise()
              .then(() => {
                res.json({
                  console: "Artigo Publicado!",
                  key: newPost.key,
                });
              });
          });
      })
      .catch((err) => res.json({ error: true, err }));
  });

router
  .route("/update-post/posts/:year/:month/:time_title")
  .post(rateLimiter.addPostSpeedLimiter, rateLimiter.addPostLimiter, verifyAdminToken, (req, res) => {
    //just setting the date format

    const date = new Date().toLocaleString("pt-BR", { month: "long", day: "numeric", year: "numeric" });

    let i = 0;
    const bodyBlocks = req.body.body.blocks;
    const readTime = (totalLength, currentLength) => {
      return totalLength + currentLength.split(/\S+/g).length;
    };
    bodyBlocks.map((block) => {
      return (i = i + [block.text].reduce(readTime, -1));
    });
    const roundReadTime = Math.round(i / 130);

    const updatedPost = {
      id: req.body.id,
      key: req.body.key,
      coverImg: "data:image/png;base64," + Buffer.from(req.body.coverImg, "binary").toString("base64"),
      tag: req.body.tag,
      title: req.body.title,
      body: JSON.stringify(req.body.body),
      date: req.body.date,
      updateDate: req.body.updateDate,
      readTime: roundReadTime,
    };

    const updatedThumbnail = {
      id: req.body.id + "@thumbnail",
      key: "thumbnails/" + req.body.key,
      coverImg: undefined,
      tag: req.body.tag,
      title: req.body.title,
      body: undefined,
      date: req.body.date,
      updateDate: date,
      readTime: roundReadTime,
    };

    const params = {
      Body: Buffer.from(JSON.stringify(updatedPost), "utf-8"),
      Bucket: buckets.blog.name,
      Key: updatedPost.key,
    };

    s3.putObject(params, (err, data) => {
      if (err) console.log(err, err.stack);
      //   else console.log(data);
    })
      .promise()
      .then(() => {
        const params = {
          DistributionId: "E2O0NTPYA9ZBTG",
          InvalidationBatch: {
            CallerReference: Date.now().toString(),
            Paths: {
              Quantity: 2,
              Items: ["/" + req.body.key, "/thumbnails/" + req.body.key],
            },
          },
        };

        cloudFront.createInvalidation(params, function (err, data) {
          if (err) console.log(err, err.stack);
          else console.log("Data: " + JSON.stringify(data));
        });
      })
      .then(() => {
        compressor
          .compressThumbnail(req.body.coverImg)
          .then((res) => {
            console.log("Compressed File Size: " + Math.round(res.length / 1024));
            updatedThumbnail.coverImg = "data:image/png;base64," + res;
          })
          .then(() => {
            if (bodyBlocks.length >= 2) {
              updatedThumbnail.body = (bodyBlocks[0].text + " " + bodyBlocks[1].text).slice(0, 300);
            } else {
              updatedThumbnail.body = bodyBlocks[0].text.slice(0, 300);
            }
          })
          .then(() => {
            const thumbnailParams = {
              Body: Buffer.from(JSON.stringify(updatedThumbnail), "utf-8"),
              Bucket: buckets.blog.name,
              Key: "thumbnails/" + req.body.key,
            };
            return thumbnailParams;
          })
          .then((thumbnailParams) => {
            s3.putObject(thumbnailParams, (err, data) => {
              if (err) console.log(err, err.stack);
            })
              .promise()
              .then(() => {
                res.json({
                  console: "Artigo Publicado!",
                  key: updatedPost.key,
                });
              });
          });
      })
      .catch((err) => res.json({ error: true, err }));
  });

router
  .route("/delete-post/:id")
  .delete(rateLimiter.addPostSpeedLimiter, rateLimiter.addPostLimiter, verifyAdminToken, (req, res) => {
    Post.findOneAndDelete({ _id: req.params.id })
      .then(() => res.json("Artigo Deletado!"))
      .catch((err) => res.status(400).json("Error: " + err));
  });

module.exports = router;

const router = require("express").Router();
const crypto = require("crypto");
var S3 = require("aws-sdk/clients/s3");
var s3 = new S3({ apiVersion: "2006-03-01" });
const CF = require("aws-sdk/clients/cloudfront");
const cloudFront = new CF();
const buckets = require("./awsBuckets");
const rateLimiter = require("../middleware/rateLimiter");
const verifyAdminToken = require("./verifyAdminToken");
const _ = require("lodash/kebabCase");

router
  .route("/new-post")
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

    const s3ObjectKey = "posts/" + year + "/" + month + "/" + Date.now() + "@" + _(req.body.title);

    const newPost = {
      id: crypto.randomBytes(10).toString("hex"),
      key: s3ObjectKey,
      coverImg: req.body.coverImg,
      tag: req.body.tag,
      title: req.body.title,
      body: JSON.stringify(req.body.body),
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
      //   else console.log(data);
    })
      .promise()
      .then((data) => {
        res.json({
          console: "Artigo Publicado!",
          id: newPost.id,
          title: newPost.title,
        });
      })
      .catch((err) => res.json(err));
  });

router
  .route("/update-post/posts/:year/:month/:time_title")
  .post(rateLimiter.addPostSpeedLimiter, rateLimiter.addPostLimiter, verifyAdminToken, (req, res) => {
    //just setting the date format

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
      coverImg: req.body.coverImg,
      tag: req.body.tag,
      title: req.body.title,
      body: JSON.stringify(req.body.body),
      date: req.body.date,
      updateDate: req.body.updateDate,
      readTime: roundReadTime,
    };

    console.log(updatedPost.key);

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
      .then((data) => {
        var params = {
          DistributionId: "E2O0NTPYA9ZBTG",
          InvalidationBatch: {
            CallerReference: Date.now().toString(),
            Paths: {
              Quantity: 1,
              Items: ["/" + updatedPost.key],
            },
          },
        };

        cloudFront.createInvalidation(params, function (err, data) {
          if (err) console.log(err, err.stack);
          else console.log("Data: " + JSON.stringify(data));
        });
      })
      .then((data) => {
        res.json({
          console: "Artigo Publicado!",
          // id: updatedPost.id,
          // title: updatedPost.title,
          key: updatedPost.key,
        });
      })
      .catch((err) => res.json(err));
  });

router
  .route("/delete-post/:id")
  .delete(rateLimiter.addPostSpeedLimiter, rateLimiter.addPostLimiter, verifyAdminToken, (req, res) => {
    Post.findOneAndDelete({ _id: req.params.id })
      .then(() => res.json("Artigo Deletado!"))
      .catch((err) => res.status(400).json("Error: " + err));
  });

module.exports = router;

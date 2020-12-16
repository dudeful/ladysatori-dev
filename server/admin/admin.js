const express = require("express");
const router = express.Router();
const crypto = require("crypto");
var S3 = require("aws-sdk/clients/s3");
var s3 = new S3({ apiVersion: "2006-03-01" });
var CF = require("aws-sdk/clients/cloudfront");
var cfSigner = new CF.Signer(process.env.AWS_CLOUDFRONT_KEY_PAIR_ID, process.env.AWS_CLOUDFRONT_PRIVATE_KEY);
const buckets = require("./awsBuckets");
const rateLimiter = require("../middleware/rateLimiter");
const verifyAdminToken = require("./verifyAdminToken");
const verifyToken = require("../middleware/verifyToken");
const _ = require("lodash/kebabCase");

router
  .route("/dashboard")
  .get(rateLimiter.blogPostSpeedLimiter, rateLimiter.blogPostLimiter, verifyToken, (req, res) => {
    console.log("hello friend");

    const cfURL = "https://d2x5zciz7allr5.cloudfront.net/";
    const objectKey = "posts/2020/dezembro/1607761348303@this-is-the-largest-image-so-far";

    const signedURL = (cfURL, objectKey) => {
      const options = {
        url: cfURL + objectKey,
        expires: Math.floor((new Date().getTime() + 10000) / 1000), // 30 seconds
      };

      return new Promise((resolve) => {
        let url = cfSigner.getSignedUrl(options);
        resolve(url);
      });
    };

    signedURL(cfURL, objectKey)
      .then((url) => {
        res.json(url);
      })
      .catch((err) => res.json({ err }));
  });

router.route("/").get(rateLimiter.blogSpeedLimiter, rateLimiter.blogLimiter, (req, res) => {
  s3.listObjects({ Bucket: buckets.blog.name }, (err, data) => {
    if (err) console.log(err, err.stack);
  })
    .promise()
    .then((data) => {
      let keys = data.Contents.map((key) => {
        return key.Key;
      });

      keys.sort(
        (a, b) => b.split("/").slice(-1)[0].split("@").slice()[0] - a.split("/").slice(-1)[0].split("@").slice()[0]
      );

      return keys;
    })
    .then((keys) => {
      let urls = keys.map((objectKey) => {
        return "https://dizbkwjzdmgp2.cloudfront.net/" + objectKey;
      });

      res.json(urls);
    })
    .catch((err) => {
      res.json({ err });
      if (err) throw err;
    });
});

// router
//   .route("/new-post")
//   .post(rateLimiter.addPostSpeedLimiter, rateLimiter.addPostLimiter, verifyAdminToken, (req, res) => {
//     //just setting the date format
//     const date = new Date().toLocaleString("pt-BR", { month: "long", day: "numeric", year: "numeric" });

//     let i = 0;
//     const bodyBlocks = req.body.body.blocks;
//     const readTime = (totalLength, currentLength) => {
//       return totalLength + currentLength.split(/\S+/g).length;
//     };
//     bodyBlocks.map((block) => {
//       return (i = i + [block.text].reduce(readTime, -1));
//     });
//     const roundReadTime = Math.round(i / 130);

//     const s3ObjectKey = "posts/" + year + "/" + month + "/" + Date.now() + "@" + _(req.body.title);

//     const newPost = {
//       id: crypto.randomBytes(10).toString("hex"),
//       key: s3ObjectKey,
//       coverImg: req.body.coverImg,
//       tag: req.body.tag,
//       title: req.body.title,
//       body: JSON.stringify(req.body.body),
//       date: date,
//       readTime: roundReadTime,
//     };

//     const params = {
//       Body: Buffer.from(JSON.stringify(newPost), "utf-8"),
//       Bucket: buckets.blog.name,
//       Key: s3ObjectKey,
//     };

//     s3.putObject(params, (err, data) => {
//       if (err) console.log(err, err.stack);
//       //   else console.log(data);
//     })
//       .promise()
//       .then((data) => {
//         res.json({
//           console: "Artigo Publicado!",
//           id: newPost.id,
//           title: newPost.title,
//         });
//       })
//       .catch((err) => res.json(err));
//   });

// const createObject = () => {
//   const body = {
//     fName: "Larrye",
//     lName: "Doe",
//     age: 27,
//     email: "john.doe@gmail.com",
//     password: "aioej894u7kb25lakhsklj290790ablkjsd904bannr09uf",
//   };

//   const bodyJSON = JSON.stringify(body);

//   const params = {
//     Body: Buffer.from(bodyJSON, "utf-8"),
//     Bucket: buckets.blog.name,
//     Key: buckets.blog.name + "/" + body.fName,
//   };

//   s3.putObject(params, (err, data) => {
//     if (err) console.log(err, err.stack);
//     // an error occurred
//     else console.log(data);
//     // successful response
//   });
// };

// const getObject = () => {
//   s3.getObject(
//     {
//       Bucket: buckets.blog.name,
//       Key: "posts/2020/dezembro/54812134481@hello-my-little-friend",
//     },
//     (err, data) => {
//       if (err) console.log(err, err.stack);
//       else console.log(data, JSON.parse(data.Body.toString()));
//       // else console.log(data.Body.toString());
//     }
//   );
// };

// const deleteObject = () => {
//   s3.deleteObject(
//     {
//       Bucket: buckets.blog.name,
//       Key: "posts/2020/dezembro/cc39758c-eb64-4cb4-bfa8-5d2f6002df70@hello-my-little-friend",
//     },
//     (err, data) => {
//       if (err) console.log(err, err.stack);
//       else console.log(data);
//     }
//   );
// };

// createObject();
// getObject();
// deleteObject();

// s3.listBuckets({}, (err, data) => {
//   if (err) console.log(err, err.stack);
//   else console.log(data);
// });

// s3.listObjects({ Bucket: buckets.blog.name }, (err, data) => {
//   if (err) console.log(err, err.stack);
//   else {
//     const keys = [];
//     data.Contents.map((key) => {
//       keys.push(key.Key);
//     });
//     const ok = keys.sort((a, b) => {
//       return -a.split("/").slice(-1)[0].split("@").slice()[0] + b.split("/").slice(-1)[0].split("@").slice()[0];
//     });
//     console.log(ok);
//   }
// });

// const createBucket = () => {
//   s3.createBucket({ Bucket: "lady-satori-blog" }, (err, data) => {
//     if (err) console.log(err, err.stack);
//     // an error occurred
//     else console.log(data);
//     // successful response
//   });
// };

module.exports = router;

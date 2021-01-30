const express = require("express");
const router = express.Router();
const S3 = require("aws-sdk/clients/s3");
const s3 = new S3({ apiVersion: "2006-03-01" });
const buckets = require("./awsBuckets");
const rateLimiter = require("../middleware/rateLimiter");

router.route("/").get(rateLimiter.blogSpeedLimiter, rateLimiter.blogLimiter, (req, res) => {
  s3.listObjects({ Bucket: buckets.blog.name, Prefix: "thumbnails/" }, (err, data) => {
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

      res.json({ urls });
    })
    .catch((err) => {
      res.json({ err });
      if (err) throw err;
    });
});

module.exports = router;

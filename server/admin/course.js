const express = require("express");
const router = express.Router();
const S3 = require("aws-sdk/clients/s3");
const s3 = new S3({ apiVersion: "2006-03-01" });
const rateLimiter = require("../middleware/rateLimiter");
const verifyAdminToken = require("./verifyAdminToken");
// const crypto = require("crypto");
require("dotenv").config();

router.route("/").post((req, res) => {
  console.log(req.body);
  const params = {
    Bucket: "lady-satori-course",
    Fields: {
      key: "videos/" + req.body.key,
    },
  };
  s3.createPresignedPost(params, (err, data) => {
    if (err) {
      console.error("Presigning post data encountered an error", err);
    } else {
      console.log(data);
      res.json(data);
    }
  });
});

router.route("/getPresignedPost").post(verifyAdminToken, (req, res) => {
  // const randomKey = crypto.randomBytes(16).toString("hex");

  const params = {
    Bucket: "lady-satori-course",
    Fields: {
      key: "videos/" + req.body.key,
    },
  };
  s3.createPresignedPost(params, (err, data) => {
    if (err) {
      console.error("Presigning post data encountered an error", err);
    } else {
      console.log(data);
      res.json(data);
    }
  });
});

router
  .route("/briefing")
  .post(rateLimiter.addLessonSpeedLimiter, rateLimiter.addLessonLimiter, verifyAdminToken, (req, res) => {
    //just setting the date format
    const date = new Date().toISOString();

    const briefing = {
      key: "resources/briefings/" + req.body.key,
      body: JSON.stringify(req.body.briefing),
      date: date,
    };

    const params = {
      Body: Buffer.from(JSON.stringify(briefing), "utf-8"),
      Bucket: "lady-satori-course",
      Key: "resources/briefings/" + req.body.key,
    };

    s3.putObject(params, (err, data) => {
      if (err) console.log(err, err.stack);
    })
      .promise()
      .then((data) => {
        console.log(data);
        res.json({ success: true });
      })
      .catch((err) => {
        console.log(err);
        res.json({ error: true, err });
      });
  });

module.exports = router;

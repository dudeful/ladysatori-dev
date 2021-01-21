const express = require("express");
const router = express.Router();
const S3 = require("aws-sdk/clients/s3");
const s3 = new S3({ apiVersion: "2006-03-01" });
const rateLimiter = require("../middleware/rateLimiter");
const verifyAdminToken = require("./verifyAdminToken");
const existingKey = require("../middleware/existingKey");
require("dotenv").config();

router.route("/video").post((req, res) => {
  const keys = req.body.keys;
  const key =
    "videos/" +
    keys.module_id +
    "/" +
    keys.module_name +
    "/" +
    keys.lesson_id +
    "/" +
    keys.lesson_name +
    "/" +
    keys.video;

  const params = {
    Bucket: "lady-satori-course",
    Fields: {
      key: key,
    },
  };
  s3.createPresignedPost(params, (err, data) => {
    if (err) {
      console.error("Presigning post data encountered an error", err);
    } else {
      res.json(data);
    }
  });
});

router
  .route("/resources")
  .post(rateLimiter.addLessonSpeedLimiter, rateLimiter.addLessonLimiter, verifyAdminToken, existingKey, (req, res) => {
    //
    const keys = req.body.keys;
    const key = keys.module_id + "/" + keys.module_name + "/" + keys.lesson_id + "/" + keys.lesson_name;

    const date = new Date().toISOString();

    const complementsArray = Object.keys(req.body.complements).map((key) => req.body.complements[key]);

    const briefing = {
      key: "resources/briefing/" + key,
      body: JSON.stringify(req.body.briefing),
      date: date,
    };

    const complements = {
      key: "resources/complements/" + key,
      body: complementsArray,
      date: date,
    };

    const briefingParams = {
      Body: Buffer.from(JSON.stringify(briefing), "utf-8"),
      Bucket: "lady-satori-course",
      Key: "resources/briefing/" + key,
    };

    const complementsParams = {
      Body: Buffer.from(JSON.stringify(complements), "utf-8"),
      Bucket: "lady-satori-course",
      Key: "resources/complements/" + key,
    };

    s3.putObject(briefingParams, (err, data) => {
      if (err) console.log(err, err.stack);
    })
      .promise()
      .then(() => {
        s3.putObject(complementsParams, (err, data) => {
          if (err) console.log(err, err.stack);
          else console.log(data);
        });
      })
      .then((data) => {
        console.log(data);
        res.json({ success: true });
      })
      .catch((err) => {
        console.log(err);
        res.json({ error: true, err });
      });
  });

router.route("/get-modules").get((req, res) => {
  s3.listObjects({ Bucket: "lady-satori-course", Prefix: "resources/briefing/" }, (err, data) => {
    if (err) console.log(err, err.stack);
  })
    .promise()
    .then((data) => {
      console.log(data);
      if (data.Contents[0]) {
        let modules = data.Contents.map((obj) => {
          return { id: obj.Key.split("/")[2], name: obj.Key.split("/")[3] };
        });

        modules = modules.filter(
          (module, index, self) => index === self.findIndex((m) => m.id === module.id && m.name === module.name)
        );

        return { modules: modules, data: data };
      } else {
        return { data: data };
      }
    })
    .then((res) => {
      if (res.data.Contents[0]) {
        let lessons = res.data.Contents.map((obj) => {
          return { module: obj.Key.split("/")[2], lesson: obj.Key.split("/")[5] };
        });

        return { modules: res.modules, lessons: lessons };
      }
    })
    .then((data) => {
      // console.log(data);
      res.json(data);
    })
    .catch((err) => {
      res.json({ error: true, err });
      console.log(err);
    });
});

module.exports = router;

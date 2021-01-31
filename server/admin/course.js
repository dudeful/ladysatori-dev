const express = require("express");
const router = express.Router();
const S3 = require("aws-sdk/clients/s3");
const s3 = new S3({ apiVersion: "2006-03-01" });
const CF = require("aws-sdk/clients/cloudfront");
const cloudFront = new CF();
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

router
  .route("/resources/submit-answer")
  .post(rateLimiter.answerQuestionSpeedLimiter, rateLimiter.answerQuestionLimiter, verifyAdminToken, (req, res) => {
    if (!req.body.answer) {
      res.json({ error: true, reason: "There is no answer in the body request" });
    } else {
      const question = {
        question_id: req.body.question.question_id,
        user_id: req.body.question.user_id,
        date: req.body.question.date,
        lastUpdated: req.body.question.lastUpdated,
        fName: req.body.question.fName,
        lName: req.body.question.lName,
        picture: req.body.question.picture,
        question: req.body.question.question,
        answer: {
          body: req.body.answer,
          answeredAt: new Date().toISOString(),
          picture: req.user.payload.picture,
        },
        key: req.body.question.key,
      };

      const params = {
        Body: Buffer.from(JSON.stringify(question), "utf-8"),
        Bucket: "lady-satori-course",
        Key: req.body.question.key,
      };

      s3.putObject(params)
        .promise()
        .then(() => {
          const params = {
            DistributionId: "E2Q2T23GVGA6GN",
            InvalidationBatch: {
              CallerReference: Date.now().toString(),
              Paths: {
                Quantity: 1,
                Items: ["/" + req.body.question.key],
              },
            },
          };

          cloudFront.createInvalidation(params, (err, data) => {
            if (err) console.log(err, err.stack);
            else console.log("Data: " + JSON.stringify(data));
          });
        })
        .then((data) => res.json({ data, success: true }))
        .catch((err) => {
          console.log(err);
          res.json({ err, success: false });
        });
    }
  });

router
  .route("/resources/delete-answer")
  .post(rateLimiter.answerQuestionSpeedLimiter, rateLimiter.answerQuestionLimiter, verifyAdminToken, (req, res) => {
    if (req.body.deleteAnswer) {
      const question = {
        question_id: req.body.question.question_id,
        user_id: req.body.question.user_id,
        date: req.body.question.date,
        lastUpdated: req.body.question.lastUpdated,
        fName: req.body.question.fName,
        lName: req.body.question.lName,
        picture: req.body.question.picture,
        question: req.body.question.question,
        key: req.body.question.key,
      };

      const params = {
        Body: Buffer.from(JSON.stringify(question), "utf-8"),
        Bucket: "lady-satori-course",
        Key: req.body.question.key,
      };

      s3.putObject(params)
        .promise()
        .then(() => {
          const params = {
            DistributionId: "E2Q2T23GVGA6GN",
            InvalidationBatch: {
              CallerReference: Date.now().toString(),
              Paths: {
                Quantity: 1,
                Items: ["/" + req.body.question.key],
              },
            },
          };

          cloudFront.createInvalidation(params, (err, data) => {
            if (err) console.log(err, err.stack);
            else console.log("Data: " + JSON.stringify(data));
          });
        })
        .then((data) => res.json({ data, success: true }))
        .catch((err) => {
          console.log(err);
          res.json({ err, success: false });
        });
    }
  });

module.exports = router;

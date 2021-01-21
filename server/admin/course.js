const express = require("express");
const router = express.Router();
const S3 = require("aws-sdk/clients/s3");
const s3 = new S3({ apiVersion: "2006-03-01" });
const rateLimiter = require("../middleware/rateLimiter");
const verifyAdminToken = require("./verifyAdminToken");
// const crypto = require("crypto");
require("dotenv").config();

router.route("/").post((req, res) => {
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
  .route("/resources")
  .post(rateLimiter.addLessonSpeedLimiter, rateLimiter.addLessonLimiter, verifyAdminToken, (req, res) => {
    //just setting the date format
    const date = new Date().toISOString();

    const briefing = {
      key: key + "/resources/briefing",
      body: JSON.stringify(req.body.briefing),
      date: date,
    };

    const complements = {
      key: key + "/resources/complements",
      body: req.body.complements,
      date: date,
    };

    const briefingParams = {
      Body: Buffer.from(JSON.stringify(briefing), "utf-8"),
      Bucket: "lady-satori-course",
      Key: key + "/resources/briefing",
    };

    const complementsParams = {
      Body: Buffer.from(JSON.stringify(complements), "utf-8"),
      Bucket: "lady-satori-course",
      Key: key + "/resources/complements",
    };

    s3.putObject(briefingParams, (err, data) => {
      if (err) console.log(err, err.stack);
    })
      .promise()
      .then(() => {
        s3.putObject(complementsParams, (err, data) => {
          if (err) console.log(err, err.stack);
        })
          .promise()
          .then((data) => console.log(data))
          .catch((err) => console.log(err));
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
  s3.listObjects({ Bucket: "lady-satori-course", Prefix: "modules/" }, (err, data) => {
    if (err) console.log(err, err.stack);
  })
    .promise()
    .then((data) => {
      let modules = data.Contents.map((obj) => {
        return { id: obj.Key.split("/").slice(1, 2)[0], name: obj.Key.split("/").slice(2, 3)[0] };
      });

      modules = modules.filter(
        (module, index, self) => index === self.findIndex((m) => m.id === module.id && m.name === module.name)
      );

      return { modules: modules, data: data };
    })
    .then((res) => {
      let lessons = res.data.Contents.map((obj) => {
        return { module: obj.Key.split("/").slice(1, 2)[0], lesson: obj.Key.split("/").slice(5, 6)[0] };
      });

      const existingModules = [
        { id: "module_1", name: "Module_Frufles_Burples" },
        { id: "module_2", name: "Module_Durplis_Dorples" },
        { id: "module_3", name: "Module_Gorples_Gorples_Yrples_Dirples" },
        { id: "module_4", name: "Module_Fruffles_Turples" },
      ];

      const existingLessons = [
        { module: "module_1", lesson: "Frufles_Burples" },
        { module: "module_1", lesson: "Durplis_Dorples" },
        { module: "module_1", lesson: "Lirplus_Norples_Gorplus_Norplos" },
        { module: "module_1", lesson: "Lorplas_Nerplas_Gorplas" },
        { module: "module_1", lesson: "Fruffles_Grupples_Horpples" },
        { module: "module_1", lesson: "Purpples_Gorples_Xerples" },
        { module: "module_2", lesson: "Nicloes_Porples_Jurples" },
        { module: "module_2", lesson: "Lerples_Derples_Gorples_Norples" },
        { module: "module_2", lesson: "Irgles_Zurples_Darples" },
        { module: "module_2", lesson: "Surples_Wirples_Qirples" },
        { module: "module_2", lesson: "Lurples_Durples_Gurples" },
        { module: "module_2", lesson: "Nirgles_Yrples_Tirples_Rurples_Gorples" },
        { module: "module_2", lesson: "Gorples_Gorples_Yrples_Dirples" },
        { module: "module_3", lesson: "Fruffles_Turples" },
        { module: "module_3", lesson: "Irples_Dirples_Girples" },
        { module: "module_3", lesson: "Urplus_Murples_Furples" },
        { module: "module_4", lesson: "Irples_Dirples_Girples" },
        { module: "module_4", lesson: "Urplus_Murples_Furples" },
        { module: "module_4", lesson: "Irples_Dirples_Girples" },
        { module: "module_4", lesson: "Urplus_Murples_Furples" },
      ];

      return { modules: existingModules, lessons: existingLessons };
    })
    .then((data) => {
      console.log(data);
      res.json(data);
    });
});

module.exports = router;

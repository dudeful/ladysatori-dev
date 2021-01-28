const express = require('express');
const router = express.Router();
const S3 = require('aws-sdk/clients/s3');
const s3 = new S3({ apiVersion: '2006-03-01' });
const verifyToken = require('../middleware/verifyToken');
const crypto = require('crypto');
const rateLimiter = require('../middleware/rateLimiter');

router.route('/questions').get((req, res) => {
  s3.listObjectsV2({ Bucket: 'lady-satori-course', Prefix: 'resources/questions/' + req.query.prefix + '/' })
    .promise()
    .then((data) => {
      let keys = data.Contents.map((key) => {
        return key.Key;
      });

      return keys.reverse();
    })
    .then((keys) => {
      let questions = keys.map((objectKey) => {
        return 'https://dcp2jmsc5uert.cloudfront.net/' + objectKey;
      });

      res.json({ questions });
    })
    .catch((err) => {
      console.log(err);
      res.json({ error: true, err });
    });
});

router.route('/complements').get((req, res) => {
  s3.listObjectsV2({ Bucket: 'lady-satori-course', Prefix: req.body.prefix }, (err, data) => {
    if (err) {
      console.log(err, err.stack);
      res.json({ err });
    }
  })
    .promise()
    .then((data) => {
      let keys = data.Contents.map((key) => {
        return key.Key;
      });

      return keys;
    })
    .then((keys) => {
      let complements = keys.map((objectKey) => {
        return {
          module: objectKey.split('/').slice(2, 3)[0],
          lesson: objectKey.split('/').slice(3, 4)[0],
          complement: 'https://dcp2jmsc5uert.cloudfront.net/' + objectKey,
        };
      });

      res.json({ complements });
      console.log(complements);
    })
    .catch((err) => {
      console.log(err);
      res.json({ err });
    });
});

router.route('/about').get((req, res) => {
  s3.getObject({ Bucket: 'lady-satori-course', Key: 'about' }, (err, data) => {
    if (err) {
      console.log(err, err.stack);
      res.json({ err });
    }
  })
    .promise()
    .then((data) => res.json({ data }));
});

router
  .route('/submit-question')
  .post(rateLimiter.addPostSpeedLimiter, rateLimiter.addPostLimiter, verifyToken, (req, res) => {
    const decoded = req.user.payload;

    const question_id = Date.now() + '-' + crypto.randomBytes(4).toString('hex');

    const question = {
      question_id: question_id,
      user_id: decoded.id,
      date: new Date().toISOString(),
      fName: decoded.fName,
      lName: decoded.lName,
      picture: decoded.picture,
      question: req.body.question,
      key: 'resources/questions/' + req.body.prefix + '/' + question_id,
    };

    const params = {
      Body: Buffer.from(JSON.stringify(question), 'utf-8'),
      Bucket: 'lady-satori-course',
      Key: question.key,
    };

    s3.putObject(params)
      .promise()
      .then((data) => res.json(data))
      .catch((err) => console.log(err));
  });

module.exports = router;

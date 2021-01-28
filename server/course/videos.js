const express = require('express');
const router = express.Router();
var S3 = require('aws-sdk/clients/s3');
var s3 = new S3({ apiVersion: '2006-03-01' });

router.route('/get-keys').get((req, res) => {
  s3.listObjectsV2({ Bucket: 'lady-satori-course', Prefix: 'resources/briefing/' })
    .promise()
    .then((data) => {
      let keys = data.Contents.map((key) => {
        return { prefix: key.Key.split('/').slice(2, 6).join('/') };
      });

      res.json({ keys });
    })
    .catch((err) => {
      console.log(err);
      res.json({ error: true, err });
    });
});

router.route('/get-video-url').get((req, res) => {
  const prefix = 'videos/' + req.query.prefix;

  s3.listObjectsV2({
    Bucket: 'lady-satori-course',
    Prefix: prefix + '/drama_da_cebola__curta_1_1/',
    Delimiter: '/',
  })
    .promise()
    .then((data) => {
      const keys = data.Contents.map((key) => {
        if (key.Key.split('.').slice(-1)[0] === 'm3u8') {
          return { video: 'https://dcp2jmsc5uert.cloudfront.net/' + key.Key };
        } else {
          return { thumbnail: 'https://dcp2jmsc5uert.cloudfront.net/' + key.Key };
        }
      });

      const obj = keys.reduce((accumulator, currentValue) => {
        const k = Object.keys(currentValue);
        accumulator[k] = currentValue[k];
        return accumulator;
      }, {});

      res.json({ urls: obj });
    })
    .catch((err) => {
      console.log(err);
      res.json({ err });
    });
});

module.exports = router;

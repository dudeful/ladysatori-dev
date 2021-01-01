const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const async = require('async');
const CryptoJS = require('crypto-js');
const crypto = require('crypto');
const ddb = require('../DDB');
const ses = require('../SES');
const saltRounds = 12;

router.route('/password-reset').post((req, res, next) => {
  async.waterfall(
    [
      function (done) {
        crypto.randomBytes(20, function (err, buf) {
          let token = buf.toString('hex');
          done(err, token);
        });
      },
      function (token, done) {
        ddb
          .getUser({ key: { email: { S: req.body.email } }, table: 'users_admin_email' })
          .then((user) => {
            if (!user.Item) return res.json({ userExists: false });

            const tokenHash = crypto.createHash('sha512').update(token).digest('hex');

            ddb.requestResetToken({ email: req.body.email, tokenHash: tokenHash, table: 'users_admin_email' });

            done(null, token);
          })
          .catch((err) => console.log(err));
      },
      function (token, done) {
        const data = {
          toAddresses: [req.body.email],
          templateName: 'PasswordResetToken',
          home_link: 'https://main.d3ieky02gu560k.amplifyapp.com/',
          recovery_link: 'https://main.d3ieky02gu560k.amplifyapp.com//admin/reset/' + token + '/' + req.body.email,
        };

        ses.sendTemplatedEmail(data);

        done(null);
      },
    ],
    function (err) {
      if (err) return next(err);
      res.json({ emailSent: true });
    }
  );
});

router.route('/:token/:email').get((req, res) => {
  const tokenHash = crypto.createHash('sha512').update(req.params.token).digest('hex');

  ddb
    .getUser({ key: { email: { S: req.params.email } }, table: 'users_admin_email' })
    .then((user) => {
      if (!user.Item.resetPasswordToken) {
        return res.json({ user: false });
      } else if (user.Item.resetPasswordToken.S === tokenHash && user.Item.resetPasswordExpires.N > Date.now()) {
        return res.json({ user: { fName: user.Item.fName.S, lName: user.Item.lName.S, email: req.params.email } });
      } else {
        return res.json({ user: false });
      }
    })
    .catch((err) => console.log(err));
});

router.route('/:token/:email').patch((req, res) => {
  async.waterfall(
    [
      function (done) {
        const tokenHash = crypto.createHash('sha512').update(req.params.token).digest('hex');

        const data = {
          table: 'users_admin_email',
          email: req.body.user.email,
          newPassword: req.body.newPassword.password,
          resetPasswordToken: tokenHash,
        };

        //Create salt & hash
        bcrypt.hash(data.newPassword, saltRounds, (err, hash) => {
          if (err) throw err;
          data.newPassword = hash;

          ddb
            .resetPassword(data)
            .promise()
            .then(() => {
              const payload = {
                authMethod: 'Email',
                fName: req.body.user.fName,
                lName: req.body.user.lName,
                email: req.body.user.email,
              };

              // Encrypt
              const ciphertext = CryptoJS.AES.encrypt(
                JSON.stringify(payload),
                process.env.JWT_ADMIN_PAYLOAD_ENCRYPTION_KEY
              ).toString();

              jwt.sign({ ciphertext }, process.env.JWT_ADMIN_SECRET, { expiresIn: '12h' }, (err, token) => {
                if (err) throw err;
                done(err, token);
              });
            })
            .catch((err) => console.log(err));
        });
      },
      function (token, done) {
        const data = {
          toAddresses: [req.body.user.email],
          templateName: 'PasswordResetDone',
          home_link: 'https://main.d3ieky02gu560k.amplifyapp.com/',
          login_page_link: 'https://main.d3ieky02gu560k.amplifyapp.com/admin',
        };

        ses.sendTemplatedEmail(data);

        res.json({ token, isAdmin: true });
        done(null, done);
      },
    ],
    function (err) {
      if (err) return res.json({ err });
    }
  );
});
//--------------looks good until here, but I need to fix promise() bug on DynamoDB SDK----------------

module.exports = router;

const router = require("express").Router();
const saltRounds = 12;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const rateLimiter = require("../middleware/rateLimiter");
const { validate, validateOnlyEmail, validateOnlyPassword } = require("../middleware/validator");
let async = require("async");
let crypto = require("crypto");
const CryptoJS = require("crypto-js");
const ddb = require("../admin/DDB");
const ses = require("../admin/SES");

router.route("/checkEmail").post(rateLimiter.checkEmailSpeedLimiter, rateLimiter.checkEmailLimiter, (req, res) => {
  //check for existing user
  ddb
    .getUser({ key: { email: { S: req.body.email } }, table: "users_email" })
    .then((user) => {
      if (user.Item) {
        res.json({ userExists: true });
      } else {
        res.json({ userExists: false });
      }
    })
    .catch((err) => {
      console.log(err);
      res.json({ error: true });
    });
});

router.route("/registration").post(rateLimiter.loginSpeedLimiter, rateLimiter.loginLimiter, validate, (req, res) => {
  //check for existing user
  ddb
    .getUser({ key: { email: { S: req.body.email } }, table: "users_email" })
    .then((user) => {
      if (user.Item) return res.json({ exists: true });

      const newUser = {
        table: "users_email",
        Item: {
          email: {
            S: req.body.email,
          },
          fName: {
            S: req.body.fName,
          },
          lName: {
            S: req.body.lName,
          },
          password: {
            S: req.body.password,
          },
          createdAt: {
            S: new Date(Date.now()).toLocaleString(),
          },
        },
        condition: "attribute_not_exists(email)",
      };

      //create salt & hash
      bcrypt.hash(newUser.Item.password.S, saltRounds, (err, hash) => {
        if (err) throw err;
        newUser.Item.password.S = hash;

        //create user
        ddb
          .createUser(newUser)
          .then(() => {
            let expiration = "8h";
            if (req.body.remember === true) {
              expiration = "365d";
            }

            const payload = {
              fName: req.body.fName,
              lName: req.body.lName,
              email: req.body.email,
            };

            // Encrypt
            const ciphertext = CryptoJS.AES.encrypt(
              JSON.stringify(payload),
              process.env.JWT_PAYLOAD_ENCRYPTION_KEY
            ).toString();

            jwt.sign({ ciphertext }, process.env.JWT_SECRET, { expiresIn: expiration }, (err, token) => {
              if (err) throw err;
              else res.json({ token });
            });
          })
          .catch((err) => {
            console.log(err);
            res.json({ error: true });
          });
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({ error: true });
    });
});

router
  .route("/password-reset")
  .post(
    rateLimiter.resetPasswordEmailSpeedLimiter,
    rateLimiter.resetPasswordEmailLimiter,
    validateOnlyEmail,
    (req, res, next) => {
      async.waterfall(
        [
          function (done) {
            crypto.randomBytes(20, function (err, buf) {
              let token = buf.toString("hex");
              done(err, token);
            });
          },
          function (token, done) {
            ddb
              .getUser({ key: { email: { S: req.body.email } }, table: "users_email" })
              .then((user) => {
                if (!user.Item) return res.json({ userExists: false });

                const tokenHash = crypto.createHash("sha512").update(token).digest("hex");

                ddb.requestResetToken({ email: req.body.email, tokenHash: tokenHash, table: "users_email" });

                done(null, token);
              })
              .catch((err) => console.log(err));
          },
          function (token, done) {
            const data = {
              toAddresses: [req.body.email],
              templateName: "PasswordResetToken",
              home_link: "https://master.d9cbpby23ue80.amplifyapp.com/",
              recovery_link: "https://master.d9cbpby23ue80.amplifyapp.com/users/reset/" + token + "/" + req.body.email,
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
    }
  );

router
  .route("/reset/:token/:email")
  .get(rateLimiter.tokenHashSpeedLimiter, rateLimiter.tokenHashLimiter, (req, res) => {
    const tokenHash = crypto.createHash("sha512").update(req.params.token).digest("hex");

    ddb
      .getUser({ key: { email: { S: req.params.email } }, table: "users_email" })
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

router
  .route("/reset/:token/:email")
  .patch(rateLimiter.resetPasswordSpeedLimiter, rateLimiter.resetPasswordLimiter, validateOnlyPassword, (req, res) => {
    async.waterfall(
      [
        function (done) {
          const tokenHash = crypto.createHash("sha512").update(req.params.token).digest("hex");

          const data = {
            table: "users_email",
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
                  authMethod: "Email",
                  fName: req.body.user.fName,
                  lName: req.body.user.lName,
                  email: req.body.user.email,
                };

                // Encrypt
                const ciphertext = CryptoJS.AES.encrypt(
                  JSON.stringify(payload),
                  process.env.JWT_PAYLOAD_ENCRYPTION_KEY
                ).toString();

                jwt.sign({ ciphertext }, process.env.JWT_SECRET, { expiresIn: "12h" }, (err, token) => {
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
            templateName: "PasswordResetDone",
            home_link: "https://master.d9cbpby23ue80.amplifyapp.com/",
            login_page_link: "https://master.d9cbpby23ue80.amplifyapp.com/login",
          };

          ses.sendTemplatedEmail(data);

          res.json({ token, isAdmin: false });
          done(null, done);
        },
      ],
      function (err) {
        if (err) return res.json({ err });
      }
    );
  });

module.exports = router;

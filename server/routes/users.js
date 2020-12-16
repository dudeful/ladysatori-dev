const router = require("express").Router();
const User = require("../models/userModel");
const saltRounds = 12;
const sgMail = require("@sendgrid/mail");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const rateLimiter = require("../middleware/rateLimiter");
const { validate, validateOnlyEmail, validateOnlyPassword } = require("../middleware/validator");
let async = require("async");
let crypto = require("crypto");
const CryptoJS = require("crypto-js");
let http = require("https");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// router.route("/").get((req, res) => {
//   User.find()
//     .then((users) => res.json(users))
//     .catch((err) => res.status(400).json("Error: " + err));
// });

router.route("/checkEmail").post(rateLimiter.checkEmailSpeedLimiter, rateLimiter.checkEmailLimiter, (req, res) => {
  //check for existing user
  const email = req.body.email;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        res.json({ userExists: true });
      } else {
        res.json({ userExists: false });
      }
    })
    .catch((err) => res.json({ error: err, type: "400" }));
});

router.route("/registration").post(rateLimiter.loginSpeedLimiter, rateLimiter.loginLimiter, validate, (req, res) => {
  //check for existing user
  const { email, remember } = req.body;

  User.findOne({ email }).then((user) => {
    if (user) return res.json({ exists: true });

    const newUser = new User({
      fName: req.body.fName,
      lName: req.body.lName,
      email: req.body.email,
      password: req.body.password,
    });

    let expiration = "8h";
    if (remember === true) {
      expiration = "365d";
    }

    //Create salt & hash
    bcrypt.hash(newUser.password, saltRounds, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser
        .save()
        .then((user) => {
          const payload = {
            id: user.id,
            fName: user.fName,
            lName: user.lName,
            email: user.email,
          };

          // Encrypt
          const ciphertext = CryptoJS.AES.encrypt(
            JSON.stringify(payload),
            process.env.JWT_PAYLOAD_ENCRYPTION_KEY
          ).toString();

          jwt.sign({ ciphertext }, process.env.JWT_SECRET, { expiresIn: expiration }, (err, token) => {
            if (err) throw err;
            res.json({ token });
          });
        })
        .catch((err) => res.status(400).json({ error: err }));
    });
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
              var token = buf.toString("hex");
              done(err, token);
            });
          },
          function (token, done) {
            User.findOne({ email: req.body.email }, function (err, user) {
              if (!user) {
                return res.json({ userExists: false });
              }

              const tokenHash = crypto.createHash("sha512").update(token).digest("hex");

              user.resetPasswordToken = tokenHash;
              user.resetPasswordExpires = Date.now() + 1200000; // 20min

              user.save(function (err) {
                done(err, token, user);
              });
            });
          },
          function (token, user, done) {
            let options = {
              method: "POST",
              hostname: "api.sendgrid.com",
              port: null,
              path: "/v3/mail/send",
              headers: {
                authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
                "content-type": "application/json",
              },
            };

            let request = http.request(options, function (res) {
              let chunks = [];

              res.on("data", function (chunk) {
                chunks.push(chunk);
              });

              res.on("end", function () {
                let body = Buffer.concat(chunks);
              });
            });

            request.write(
              JSON.stringify({
                personalizations: [
                  {
                    to: [{ email: user.email }],
                    dynamic_template_data: {
                      recovery_link: "https://main.d3ieky02gu560k.amplifyapp.com/reset/" + token,
                      home_link: "https://main.d3ieky02gu560k.amplifyapp.com/",
                    },
                  },
                ],
                from: { email: "rellumnyar@gmail.com", name: "Lady Satori" },
                reply_to: { email: "rellumnyar@gmail.com", name: "John Doe" },
                template_id: process.env.EMAIL_PASSWORD_RESET_LINK,
              })
            );
            request.end();

            res.json({ emailSent: true });
          },
        ],
        function (err) {
          if (err) return next(err);
          res.json({ emailSent: true });
        }
      );
    }
  );

router.route("/reset/:token").get(rateLimiter.tokenHashSpeedLimiter, rateLimiter.tokenHashLimiter, (req, res) => {
  const tokenHash = crypto.createHash("sha512").update(req.params.token).digest("hex");

  User.findOne({ resetPasswordToken: tokenHash, resetPasswordExpires: { $gt: Date.now() } }, (err, user) => {
    if (user) {
      return res.json({ user: { fName: user.fName, lName: user.lName, email: user.email } });
    } else {
      return res.json({ user: false });
    }
  });
});

router
  .route("/reset/:token")
  .patch(rateLimiter.resetPasswordSpeedLimiter, rateLimiter.resetPasswordLimiter, validateOnlyPassword, (req, res) => {
    async.waterfall(
      [
        function (done) {
          const tokenHash = crypto.createHash("sha512").update(req.params.token).digest("hex");

          User.findOne({ resetPasswordToken: tokenHash, resetPasswordExpires: { $gt: Date.now() } }, (err, user) => {
            if (!user) {
              return res.json({ user: false });
            }

            user.password = req.body.newPassword.password;
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;
            user.lastPasswordReset = Date.now();

            //Create salt & hash
            bcrypt.hash(user.password, saltRounds, (err, hash) => {
              if (err) throw err;
              user.password = hash;
              user.save().then((user, err) => {
                jwt.sign(
                  {
                    id: user._id,
                    fName: user.fName,
                    lName: user.lName,
                    email: user.email,
                  },
                  process.env.JWT_SECRET,
                  { expiresIn: "1d" },
                  (err, token) => {
                    if (err) throw err;
                    done(err, token, user);
                  }
                );
              });
            });
          });
        },
        function (token, user, done) {
          let options = {
            method: "POST",
            hostname: "api.sendgrid.com",
            port: null,
            path: "/v3/mail/send",
            headers: {
              authorization: `Bearer ${process.env.SENDGRID_API_KEY}`,
              "content-type": "application/json",
            },
          };

          let request = http.request(options, function (res) {
            let chunks = [];

            res.on("data", function (chunk) {
              chunks.push(chunk);
            });

            res.on("end", function () {
              let body = Buffer.concat(chunks);
            });
          });

          request.write(
            JSON.stringify({
              personalizations: [
                {
                  to: [{ email: user.email }],
                  dynamic_template_data: {
                    login_page_link: "https://main.d3ieky02gu560k.amplifyapp.com/login",
                    home_link: "https://main.d3ieky02gu560k.amplifyapp.com/",
                  },
                },
              ],
              from: { email: "rellumnyar@gmail.com", name: "Lady Satori" },
              reply_to: { email: "rellumnyar@gmail.com", name: "John Doe" },
              template_id: process.env.EMAIL_PASSWORD_RESET_CONFIRMATION,
            })
          );
          request.end();

          res.json({ token });
        },
      ],
      function (err) {
        if (err) return next(err);
        res.json({ err });
      }
    );
  });

// router.route("/:id").get((req, res) => {
//   Users.findById(req.params.id)
//     .then((users) => res.json(users))
//     .catch((err) => res.status(400).json("Error: " + err));
// });

// router.route("/:id").delete((req, res) => {
//   Users.findByIdAndDelete(req.params.id)
//     .then(() => res.json("User deleted."))
//     .catch((err) => res.status(400).json("Error: " + err));
// });

// router.route("/update/:id").post((req, res) => {
//   Users.findById(req.params.id)
//     .then((users) => {
//       users.fName = req.body.fName;
//       users.lName = req.body.lName;
//       users.email = req.body.email;
//       users.password = req.body.newUserPassword;

//       users
//         .save()
//         .then(() => res.json("User Updated!"))
//         .catch((err) => res.status(400).json("Error: " + err));
//     })
//     .catch((err) => res.status(400).json("Error: " + err));
// });

module.exports = router;

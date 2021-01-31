const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const CryptoJS = require("crypto-js");
const verifyAdminToken = require("./verifyAdminToken");
const rateLimiter = require("../middleware/rateLimiter");
const ddb = require("./DDB");

require("../middleware/oauth2");

//-------------------------STANDARD LOGIN-------------------------------------
router.route("/login").post(rateLimiter.loginSpeedLimiter, rateLimiter.loginLimiter, (req, res) => {
  const { email, password } = req.body;

  //check for existing user
  ddb
    .getUser({ key: { email: { S: email } }, table: "users_admin_email" })
    .then((user) => {
      if (!user.Item) return res.json({ state: false, msg: "UserAdmin not found" });

      //Validate password
      bcrypt.compare(password, user.Item.password.S).then((isMatch) => {
        if (!isMatch) return res.json(false);

        const payload = {
          authMethod: "Email",
          fName: user.Item.fName.S,
          lName: user.Item.lName.S,
          email: user.Item.email.S,
          id: user.Item.id.S,
        };

        // Encrypt
        const ciphertext = CryptoJS.AES.encrypt(
          JSON.stringify(payload),
          process.env.JWT_ADMIN_PAYLOAD_ENCRYPTION_KEY
        ).toString();

        jwt.sign({ ciphertext }, process.env.JWT_ADMIN_SECRET, { expiresIn: "12h" }, (err, token) => {
          if (err) throw err;
          res.json({ token });
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({ error: true, err });
    });
});

//------------------------CHECK IF USER IS LOGGED IN------------------------
router
  .route("/isLoggedIn")
  .get(rateLimiter.isLoggedInSpeedLimiter, rateLimiter.isLoggedInLimiter, verifyAdminToken, (req, res) => {
    const decoded = req.user.payload;

    if (decoded.authMethod === "Google") {
      ddb
        .getUser({ key: { googleID: { S: decoded.id } }, table: "users_admin_google" })
        .then((user) => {
          if (!user.Item) {
            res.json({ isLoggedIn: false });
          } else {
            res.json({ isLoggedIn: true, loginType: "Google" });
          }
        })
        .catch((err) => console.log(err));
    } else {
      ddb
        .getUser({ key: { email: { S: decoded.email } }, table: "users_admin_email" })
        .then((user) => {
          if (!user.Item) {
            res.json({ isLoggedIn: false });
          } else {
            res.json({ isLoggedIn: true, loginType: "Email" });
          }
        })
        .catch((err) => console.log(err));
    }
  });

// --------------------------GOOGLE OAUTH2.0------------------------------
router
  .route("/oauth2-google/:original_url")
  .get(rateLimiter.oAuth2SpeedLimiter, rateLimiter.oAuth2Limiter, (req, res, next) => {
    passport.authenticate("google-admin", {
      scope: ["profile", "email"],
      state: req.params.original_url,
    })(req, res, next);
  });

router.route("/google/redirect").get(
  rateLimiter.oAuth2RedirectSpeedLimiter,
  rateLimiter.oAuth2RedirectLimiter,
  passport.authenticate("google-admin", {
    failureRedirect: "https://ladysatori.dudeful.com/",
  }),
  (req, res) => {
    const user = req.user;
    const original_url = req.query.state;

    ddb
      .getUser({ key: { googleID: { S: user.Item.googleID.S } }, table: "users_admin_google" })
      .then((user) => {
        const payload = {
          authMethod: "Google",
          id: user.Item.googleID.S,
          fName: user.Item.fName.S,
          lName: user.Item.lName.S,
          email: user.Item.email.S,
          picture: user.Item.picture.S,
        };

        // Encrypt
        const ciphertext = CryptoJS.AES.encrypt(
          JSON.stringify(payload),
          process.env.JWT_ADMIN_PAYLOAD_ENCRYPTION_KEY
        ).toString();

        jwt.sign({ ciphertext }, process.env.JWT_ADMIN_SECRET, { expiresIn: "12h" }, (err, token) => {
          if (err) throw err;
          // req.session.token = token;
          // console.log(req.session);
          // res.redirect('https://ladysatori.dudeful.com/SocialAuth/' + original_url + '/' + token);
          res.redirect("https://ladysatori.dudeful.com/SocialAuth/" + original_url + "/" + payload.id + "/" + token);
        });
      })
      .catch((err) => {
        console.log(err);
        res.redirect("https://ladysatori.dudeful.com/error400");
      });
  }
);

module.exports = router;

const express = require("express");
const router = express.Router();
const UserAdmin = require("../models/userAdminModel");
const googleUserAdmin = require("../models/googleUserAdminModel");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const CryptoJS = require("crypto-js");
const verifyAdminToken = require("./verifyAdminToken");
const rateLimiter = require("../middleware/rateLimiter");

require("./oauth2");

//-------------------------STANDARD LOGIN-------------------------------------
router.route("/login").post(rateLimiter.loginSpeedLimiter, rateLimiter.loginLimiter, (req, res) => {
  const { email, password } = req.body;

  //check for existing user
  UserAdmin.findOne({ email })
    .then((user) => {
      if (!user) return res.json({ state: false, msg: "UserAdmin not found" });

      //Validate password
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch) return res.json(false);

        const payload = {
          authMethod: "Email",
          id: user.id,
          fName: user.fName,
          lName: user.lName,
          email: user.email,
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
    .catch((err) => res.status(400).json({ error: err }));
});

//------------------------CHECK IF USER IS LOGGED IN------------------------
router
  .route("/isLoggedIn")
  .get(rateLimiter.isLoggedInSpeedLimiter, rateLimiter.isLoggedInLimiter, verifyAdminToken, (req, res) => {
    const decoded = req.user.payload;
    const email = decoded.email;

    if (decoded.googleID) {
      googleUserAdmin.findOne({ email }).then((user) => {
        if (!user) {
          res.json({ isLoggedIn: false });
        } else {
          res.json({ isLoggedIn: true, loginType: "Google" });
        }
      });
    } else {
      UserAdmin.findOne({ email }).then((user) => {
        if (!user) {
          res.json({ isLoggedIn: false });
        } else {
          res.json({ isLoggedIn: true, loginType: "Email" });
        }
      });
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
    failureRedirect: "https://main.d3ieky02gu560k.amplifyapp.com/",
  }),
  (req, res) => {
    const user = req.user;
    const original_url = req.query.state;
    googleUserAdmin
      .findById(user._id)
      .then((user) => {
        const payload = {
          authMethod: "Google",
          isAdmin: user.isAdmin,
          id: user._id,
          googleID: user.googleID,
          fName: user.fName,
          lName: user.lName,
          email: user.email,
          picture: user.picture,
        };

        // Encrypt
        const ciphertext = CryptoJS.AES.encrypt(
          JSON.stringify(payload),
          process.env.JWT_ADMIN_PAYLOAD_ENCRYPTION_KEY
        ).toString();

        jwt.sign({ ciphertext }, process.env.JWT_ADMIN_SECRET, { expiresIn: "8h" }, (err, token) => {
          if (err) throw err;
          // req.session.token = token;
          // console.log(req.session);
          res.redirect("https://main.d3ieky02gu560k.amplifyapp.com/SocialAuth/" + original_url + "/" + token);
        });
      })
      .catch((err) => res.redirect("https://main.d3ieky02gu560k.amplifyapp.com/error400"));
  }
);

module.exports = router;

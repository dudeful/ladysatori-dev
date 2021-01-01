const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const googleUser = require("../models/googleUserModel");
const facebookUser = require("../models/facebookUserModel");
const twitterUser = require("../models/twitterUserModel");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const CryptoJS = require("crypto-js");
const verifyToken = require("../middleware/verifyToken");
const rateLimiter = require("../middleware/rateLimiter");
const ddb = require("./DDB");

require("./oauth2");

router.route("/login").post(rateLimiter.loginSpeedLimiter, rateLimiter.loginLimiter, (req, res) => {
  const { email, password, remember } = req.body;

  //check for existing user
  ddb
    .getUser({ key: { email: { S: email } }, table: "users_email" })
    .then((user) => {
      if (!user.Item) return res.json({ state: false, msg: "User not found" });

      //Validate password
      bcrypt.compare(password, user.Item.password.S).then((isMatch) => {
        if (!isMatch) return res.json(false);

        let expiration = "8h";
        if (remember === true) {
          expiration = "365d";
        }

        const payload = {
          authMethod: "Email",
          fName: user.Item.fName.S,
          lName: user.Item.lName.S,
          email: user.Item.email.S,
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
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({ error: true, err });
    });
});

router
  .route("/isLoggedIn")
  .get(rateLimiter.isLoggedInSpeedLimiter, rateLimiter.isLoggedInLimiter, verifyToken, (req, res) => {
    const decoded = req.user.payload;
    if (decoded.googleID) {
      ddb
        .getUser({ key: { googleID: { S: decoded.googleID } }, table: "users_google" })
        .then((user) => {
          if (!user.Item) {
            res.json({ isLoggedIn: false });
          } else {
            res.json({ isLoggedIn: true, loginType: "Google" });
          }
        })
        .catch((err) => console.log(err));
    } else if (decoded.facebookID) {
      ddb
        .getUser({ key: { facebookID: { S: decoded.facebookID } }, table: "users_facebook" })
        .then((user) => {
          if (!user.Item) {
            res.json({ isLoggedIn: false });
          } else {
            res.json({ isLoggedIn: true, loginType: "Facebook" });
          }
        })
        .catch((err) => console.log(err));
    } else if (decoded.twitterID) {
      ddb
        .getUser({ key: { twitterID: { S: decoded.twitterID } }, table: "users_twitter" })
        .then((user) => {
          if (!user.Item) {
            res.json({ isLoggedIn: false });
          } else {
            res.json({ isLoggedIn: true, loginType: "Twitter" });
          }
        })
        .catch((err) => console.log(err));
    } else {
      ddb
        .getUser({ key: { email: { S: decoded.email } }, table: "users_email" })
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

router
  .route("/oauth2-google/:original_url")
  .get(rateLimiter.oAuth2SpeedLimiter, rateLimiter.oAuth2Limiter, (req, res, next) => {
    passport.authenticate("google", {
      scope: ["profile", "email"],
      state: req.params.original_url,
    })(req, res, next);
  });

router.route("/google/redirect").get(
  rateLimiter.oAuth2RedirectSpeedLimiter,
  rateLimiter.oAuth2RedirectLimiter,
  passport.authenticate("google", {
    failureRedirect: "https://main.d3ieky02gu560k.amplifyapp.com/login",
  }),
  (req, res) => {
    const user = req.user;
    const original_url = req.query.state;
    googleUser
      .findById(user._id)
      .then((user) => {
        const payload = {
          authMethod: "Google",
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
          process.env.JWT_PAYLOAD_ENCRYPTION_KEY
        ).toString();

        jwt.sign({ ciphertext }, process.env.JWT_SECRET, { expiresIn: "8h" }, (err, token) => {
          if (err) throw err;

          // req.session.token = token;
          // console.log(req.session);
          res.redirect("https://main.d3ieky02gu560k.amplifyapp.com/SocialAuth/" + original_url + "/" + token);
        });
      })
      .catch((err) => res.redirect("https://main.d3ieky02gu560k.amplifyapp.com/error400"));
  }
);

router
  .route("/oauth2-facebook/:original_url")
  .get(rateLimiter.oAuth2SpeedLimiter, rateLimiter.oAuth2Limiter, (req, res, next) => {
    passport.authenticate("facebook", {
      scope: ["email"],
      state: req.params.original_url,
    })(req, res, next);
  });

router.route("/facebook/redirect").get(
  rateLimiter.oAuth2RedirectSpeedLimiter,
  rateLimiter.oAuth2RedirectLimiter,
  passport.authenticate("facebook", {
    failureRedirect: "https://main.d3ieky02gu560k.amplifyapp.com/login",
  }),
  (req, res) => {
    const user = req.user;
    const original_url = req.query.state;
    ddb
      .getUser({ key: { facebookID: { S: user.Item.facebookID.S } }, table: "users_facebook" })
      .then((user) => {
        const payload = {
          authMethod: "Facebook",
          facebookID: user.Item.facebookID.S,
          username: user.Item.username.S,
          email: user.Item.email.S,
          picture: user.Item.picture.S,
        };

        // Encrypt
        const ciphertext = CryptoJS.AES.encrypt(
          JSON.stringify(payload),
          process.env.JWT_PAYLOAD_ENCRYPTION_KEY
        ).toString();

        jwt.sign({ ciphertext }, process.env.JWT_SECRET, { expiresIn: "8h" }, (err, token) => {
          if (err) throw err;
          // res.redirect('https://main.d3ieky02gu560k.amplifyapp.com/SocialAuth/' + original_url + '/' + token);
          res.redirect("https://main.d3ieky02gu560k.amplifyapp.com//SocialAuth/" + original_url + "/" + token);
        });
      })
      .catch((err) => {
        console.log(err);
        res.redirect("https://main.d3ieky02gu560k.amplifyapp.com/error400");
      });
  }
);

router
  .route("/oauth2-twitter/:original_url")
  .get(rateLimiter.oAuth2SpeedLimiter, rateLimiter.oAuth2Limiter, (req, res, next) => {
    //twitter oauth doesn't allow you to pass the url in the request, so you need to pass it to the callback using the session object
    req.session.state = req.params.original_url;

    passport.authenticate("twitter", {
      scope: ["email"],
    })(req, res, next);
  });

router.route("/twitter/redirect").get(
  rateLimiter.oAuth2RedirectSpeedLimiter,
  rateLimiter.oAuth2RedirectLimiter,
  passport.authenticate("twitter", {
    failureRedirect: "https://main.d3ieky02gu560k.amplifyapp.com/login",
  }),
  (req, res) => {
    const user = req.user;
    const original_url = req.session.state;
    ddb
      .getUser({ key: { twitterID: { S: user.Item.twitterID.S } }, table: "users_twitter" })
      .then((user) => {
        const payload = {
          authMethod: "Twitter",
          twitterID: user.Item.twitterID.S,
          username: user.Item.username.S,
          picture: user.Item.picture.S,
        };

        // Encrypt
        const ciphertext = CryptoJS.AES.encrypt(
          JSON.stringify(payload),
          process.env.JWT_PAYLOAD_ENCRYPTION_KEY
        ).toString();

        jwt.sign({ ciphertext }, process.env.JWT_SECRET, { expiresIn: "8h" }, (err, token) => {
          if (err) throw err;
          // res.redirect('https://main.d3ieky02gu560k.amplifyapp.com/SocialAuth/' + original_url + '/' + token);
          res.redirect("https://main.d3ieky02gu560k.amplifyapp.com//SocialAuth/" + original_url + "/" + token);
        });
      })
      .catch((err) => {
        console.log(err);
        res.redirect("https://main.d3ieky02gu560k.amplifyapp.com/error400");
      });
  }
);

module.exports = router;

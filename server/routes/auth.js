const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const googleUser = require("../models/googleUserModel");
const facebookUser = require("../models/facebookUserModel");
const twitterUser = require("../models/twitterUserModel");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const verifyToken = require("../middleware/verifyToken");

require("./oauth2");

router.route("/login").post((req, res) => {
  const { email, password, remember } = req.body;

  let expiration = "8h";
  if (remember === true) {
    expiration = "365d";
  }

  //check for existing user
  User.findOne({ email })
    .then((user) => {
      if (!user) return res.json({ state: false, msg: "User not found" });

      //Validate password
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch) return res.json(false);

        jwt.sign(
          {
            id: user.id,
            fName: user.fName,
            lName: user.lName,
            email: user.email,
          },
          process.env.JWT_SECRET,
          { expiresIn: expiration },
          (err, token) => {
            if (err) throw err;
            res.json({ token });
          }
        );
      });
    })
    .catch((err) => res.status(400).json({ error: err }));
});

router.route("/isLoggedIn").get(verifyToken, (req, res) => {
  const decoded = req.user;
  const email = decoded.email;
  if (decoded.googleID) {
    googleUser.findOne({ email }).then((user) => {
      if (!user) {
        res.json({ isLoggedIn: false });
      } else {
        res.json({ isLoggedIn: true, loginType: "Google", decoded });
      }
    });
  } else if (decoded.facebookID) {
    facebookUser.findOne({ email }).then((user) => {
      if (!user) {
        res.json({ isLoggedIn: false });
      } else {
        res.json({ isLoggedIn: true, loginType: "Facebook", decoded });
      }
    });
  } else if (decoded.twitterID) {
    twitterUser.findOne({ email }).then((user) => {
      if (!user) {
        res.json({ isLoggedIn: false });
      } else {
        res.json({ isLoggedIn: true, loginType: "Twitter", decoded });
      }
    });
  } else {
    User.findOne({ email }).then((user) => {
      if (!user) {
        res.json({ isLoggedIn: false });
      } else {
        res.json({ isLoggedIn: true, loginType: "Email", decoded });
      }
    });
  }
});

router.route("/google").get(
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.route("/google/redirect").get(
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/login",
  }),
  (req, res) => {
    const user = req.user;
    googleUser
      .findById(user._id)
      .then((user) => {
        jwt.sign(
          {
            id: user._id,
            googleID: user.googleID,
            fName: user.fName,
            lName: user.lName,
            email: user.email,
            picture: user.picture,
          },
          process.env.JWT_SECRET,
          { expiresIn: "90d" },
          (err, token) => {
            if (err) throw err;
            res.redirect("http://localhost:3000/SocialAuth/Google/" + token);
          }
        );
      })
      .catch((err) => res.redirect("http://localhost:3000/error400"));
  }
);

router.route("/facebook").get(passport.authenticate("facebook", { scope: ["email"] }));

router.route("/facebook/redirect").get(
  passport.authenticate("facebook", {
    failureRedirect: "http://localhost:3000/login",
  }),
  (req, res) => {
    const user = req.user;
    facebookUser
      .findById(user._id)
      .then((user) => {
        jwt.sign(
          {
            id: user._id,
            facebookID: user.facebookID,
            fName: user.fName,
            lName: user.lName,
            username: user.username,
            email: user.email,
            picture: user.picture,
          },
          process.env.JWT_SECRET,
          { expiresIn: "90d" },
          (err, token) => {
            if (err) throw err;
            res.redirect("http://localhost:3000/SocialAuth/Facebook/" + token);
          }
        );
      })
      .catch((err) => res.redirect("http://localhost:3000/Error400"));
  }
);

router.route("/twitter").get(passport.authenticate("twitter"));

router.route("/twitter/redirect").get(
  passport.authenticate("twitter", {
    failureRedirect: "http://localhost:3000/login",
  }),
  (req, res) => {
    const user = req.user;
    twitterUser
      .findById(user._id)
      .then((user) => {
        jwt.sign(
          {
            id: user._id,
            twitterID: user.twitterID,
            fName: user.fName,
            lName: user.lName,
            username: user.username,
            email: user.email,
            picture: user.picture,
          },
          process.env.JWT_SECRET,
          { expiresIn: "90d" },
          (err, token) => {
            if (err) throw err;
            res.redirect("http://localhost:3000/SocialAuth/Twitter/" + token);
          }
        );
      })
      .catch((err) => res.redirect("http://localhost:3000/Error400"));
  }
);

module.exports = router;

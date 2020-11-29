const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const router = express.Router();
const User = require("../models/userModel");
const googleUser = require("../models/googleUserModel");
const facebookUser = require("../models/facebookUserModel");
const verifyToken = require("../middleware/verifyToken");

require("dotenv").config();

router.route("/login").post((req, res) => {
  const { email, password, remember } = req.body;
  let expiration = "1h";

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

// router.route("/isLoggedIn").get(verifyToken, (req, res) => {
//   const decoded = req.user;
//   const email = decoded.email;
//   if (decoded.googleID) {
//     googleUser.findOne({ email }).then((user) => {
//       if (!user) {
//         res.json({ isLoggedIn: false });
//       } else {
//         res.json({ isLoggedIn: true, loginType: "Google", decoded });
//       }
//     });
//   } else if (decoded.facebookID) {
//     facebookUser.findOne({ email }).then((user) => {
//       if (!user) {
//         res.json({ isLoggedIn: false });
//       } else {
//         res.json({ isLoggedIn: true, loginType: "Facebook", decoded });
//       }
//     });
//   } else {
//     User.findOne({ email }).then((user) => {
//       if (!user) {
//         res.json({ isLoggedIn: false });
//       } else {
//         res.json({ isLoggedIn: true, loginType: "Email", decoded });
//       }
//     });
//   }
// });

// router.route("/google").get(
//   passport.authenticate("google", {
//     scope: ["profile", "email"],
//   })
// );

// router.route("/google/redirect").get(
//   passport.authenticate("google", {
//     failureRedirect: "https://dudeful.herokuapp.com/login",
//   }),
//   (req, res) => {
//     const user = req.user;
//     googleUser
//       .findById(user._id)
//       .then((user) => {
//         jwt.sign(
//           {
//             id: user._id,
//             googleID: user.googleID,
//             fName: user.fName,
//             lName: user.lName,
//             email: user.email,
//             picture: user.picture,
//           },
//           process.env.JWT_SECRET,
//           { expiresIn: "90d" },
//           (err, token) => {
//             if (err) throw err;
//             res.redirect(
//               "https://dudeful.herokuapp.com/SocialAuth/Google/" + token
//             );
//           }
//         );
//       })
//       .catch((err) => res.redirect("https://dudeful.herokuapp.com/Error400"));
//   }
// );

// router
//   .route("/facebook")
//   .get(passport.authenticate("facebook", { scope: ["email"] }));

// router.route("/facebook/redirect").get(
//   passport.authenticate("facebook", {
//     failureRedirect: "https://dudeful.herokuapp.com/login",
//   }),
//   (req, res) => {
//     const user = req.user;
//     facebookUser
//       .findById(user._id)
//       .then((user) => {
//         jwt.sign(
//           {
//             id: user._id,
//             facebookID: user.facebookID,
//             fName: user.fName,
//             lName: user.lName,
//             username: user.username,
//             email: user.email,
//             picture: user.picture,
//           },
//           process.env.JWT_SECRET,
//           { expiresIn: "90d" },
//           (err, token) => {
//             if (err) throw err;
//             res.redirect(
//               "https://dudeful.herokuapp.com/SocialAuth/Facebook/" + token
//             );
//           }
//         );
//       })
//       .catch((err) => res.redirect("https://dudeful.herokuapp.com/Error400"));
//   }
// );

module.exports = router;

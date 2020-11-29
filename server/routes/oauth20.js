const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const FacebookStrategy = require("passport-facebook");
const googleUser = require("../models/googleUserModel");
const facebookUser = require("../models/facebookUserModel");
require("dotenv").config();

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(function (googleID, done) {
  googleUser.findById(googleID, function (err, user) {
    done(err, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      //options for the Google Strategy
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        "https://dudeful-backend.herokuapp.com/api/auth/google/redirect",
    },
    (accessToken, refreshToken, profile, done) => {
      //Check existing user
      googleUser.findOne({ googleID: profile.id }, (err, user) => {
        if (user) {
          //User already exists
          console.log("user already exists: " + user);
          return done(err, user);
        } else {
          //User does not exists, therefore create user
          new googleUser({
            googleID: profile.id,
            username: profile.displayName,
            fName: profile._json.given_name,
            lName: profile._json.family_name,
            email: profile._json.email,
            emailVerified: profile._json.email_verified,
            locale: profile._json.locale,
            picture: profile._json.picture,
          })
            .save()
            .then((user) => {
              console.log("User created: " + user);
              return done(err, user);
            });
        }
      });
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(function (facebookID, done) {
  facebookUser.findById(facebookID, function (err, user) {
    done(err, user);
  });
});

passport.use(
  new FacebookStrategy(
    {
      //options for the Facebook Strategy
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL:
        "https://dudeful-backend.herokuapp.com/api/auth/facebook/redirect",
      profileFields: ["id", "displayName", "photos", "emails"],
    },
    (accessToken, refreshToken, profile, done) => {
      //Check existing user
      console.log(profile._json);
      facebookUser.findOne({ facebookID: profile.id }, (err, user) => {
        if (user) {
          //User already exists
          console.log("user already exists: " + user);
          return done(err, user);
        } else {
          //User does not exists, therefore create user
          new facebookUser({
            facebookID: profile.id,
            username: profile.displayName,
            fName: profile.displayName.split(" ", 1)[0],
            lName: profile.displayName.substring(
              profile.displayName.lastIndexOf(" ") + 1
            ),
            email: profile.emails[0].value,
            picture: profile.photos[0].value,
          })
            .save()
            .then((user) => {
              console.log("User created: " + user);
              return done(err, user);
            });
        }
      });
    }
  )
);

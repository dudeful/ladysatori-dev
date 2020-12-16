const passport = require("passport");
const googleUserAdmin = require("../models/googleUserAdminModel");
const GoogleStrategy = require("passport-google-oauth20");

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(function (googleID, done) {
  googleUserAdmin.findById(googleID, function (err, user) {
    done(err, user);
  });
});

passport.use(
  "google-admin",
  new GoogleStrategy(
    {
      //options for the Google Strategy
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/admin/google/redirect",
      // passReqToCallback: true, // allows us to pass in the req from our route
    },
    (accessToken, refreshToken, profile, done) => {
      //Check existing user
      googleUserAdmin.findOne({ googleID: profile.id }, (err, user) => {
        if (user) {
          //User already exists
          return done(err, user);
        } else {
          //User does not exists
          return done(err, null);
        }
      });
    }
  )
);

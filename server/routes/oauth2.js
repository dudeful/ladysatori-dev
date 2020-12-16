const passport = require("passport");
const googleUser = require("../models/googleUserModel");
const GoogleStrategy = require("passport-google-oauth20");
const facebookUser = require("../models/facebookUserModel");
const FacebookStrategy = require("passport-facebook");
const twitterUser = require("../models/twitterUserModel");
const TwitterStrategy = require("passport-twitter");

passport.serializeUser(function (user, done) {
  done(null, user._id);
});

passport.deserializeUser(function (googleID, done) {
  googleUser.findById(googleID, function (err, user) {
    done(err, user);
  });
});

passport.deserializeUser(function (facebookID, done) {
  facebookUser.findById(facebookID, function (err, user) {
    done(err, user);
  });
});

passport.deserializeUser(function (twitterID, done) {
  twitterUser.findById(twitterID, function (err, user) {
    done(err, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      //options for the Google Strategy
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "https://v7y5dtabh9.execute-api.sa-east-1.amazonaws.com/dev/admin/google/redirect",
      // passReqToCallback: true, // allows us to pass in the req from our route
    },
    (accessToken, refreshToken, profile, done) => {
      //Check existing user
      googleUser.findOne({ googleID: profile.id }, (err, user) => {
        if (user) {
          //User already exists
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
              return done(err, user);
            });
        }
      });
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      //options for the Facebook Strategy
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      callbackURL: "https://v7y5dtabh9.execute-api.sa-east-1.amazonaws.com/dev/auth/facebook/redirect",
      profileFields: ["id", "displayName", "photos", "emails"],
    },
    (accessToken, refreshToken, profile, done) => {
      //Check existing user
      facebookUser.findOne({ facebookID: profile.id }, (err, user) => {
        if (user) {
          //User already exists
          return done(err, user);
        } else {
          //User does not exists, therefore create user
          new facebookUser({
            facebookID: profile.id,
            username: profile.displayName,
            fName: profile.displayName.split(" ", 1)[0],
            lName: profile.displayName.substring(profile.displayName.lastIndexOf(" ") + 1),
            email: profile.emails[0].value,
            picture: profile.photos[0].value,
          })
            .save()
            .then((user) => {
              return done(err, user);
            });
        }
      });
    }
  )
);

passport.use(
  new TwitterStrategy(
    {
      //options for the Twitter Strategy
      consumerKey: process.env.TWITTER_API_KEY,
      consumerSecret: process.env.TWITTER_API_SECRET_KEY,
      callbackURL: "https://v7y5dtabh9.execute-api.sa-east-1.amazonaws.com/dev/auth/twitter/redirect",
    },
    (token, tokenSecret, profile, done) => {
      //Check existing user
      twitterUser.findOne({ twitterID: profile._json.id_str }, (err, user) => {
        if (user) {
          //User already exists
          return done(err, user);
        } else {
          //User does not exists, therefore create user
          new twitterUser({
            twitterID: profile._json.id_str,
            username: profile._json.name,
            picture: profile._json.profile_image_url,
          })
            .save()
            .then((user) => {
              return done(err, user);
            });
        }
      });
    }
  )
);

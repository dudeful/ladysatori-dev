const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const ddb = require("../DDB");

passport.serializeUser((user, done) => {
  done(null, user.Item.googleID.S);
});

passport.deserializeUser((googleID, done) => {
  ddb
    .getUser({ key: { googleID: { S: googleID } }, table: "users_admin_google" })
    .then((user) => {
      done(null, user);
    })
    .catch((err) => console.log(err));
});

passport.use(
  "google-admin",
  new GoogleStrategy(
    {
      //options for the Google Strategy
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // callbackURL: 'https://v7y5dtabh9.execute-api.sa-east-1.amazonaws.com/dev/admin/auth/google/redirect',
      callbackURL: "https://v7y5dtabh9.execute-api.sa-east-1.amazonaws.com/dev/admin/auth/google/redirect",
    },
    (accessToken, refreshToken, profile, done) => {
      //Check existing user
      ddb
        .getUser({ key: { googleID: { S: profile.id } }, table: "users_admin_google" })
        .then((user) => {
          if (user.Item) {
            //User already exists
            return done(null, user);
          } else {
            //User does not exists, therefore create user
            const newUser = {
              table: "users_admin_google",
              Item: {
                googleID: { S: profile.id },
                username: { S: profile.displayName },
                email: { S: profile._json.email },
                emailVerified: { BOOL: profile._json.email_verified },
                fName: { S: profile._json.given_name },
                lName: { S: profile._json.family_name },
                locale: { S: profile._json.locale },
                picture: { S: profile._json.picture },
                createdAt: { S: new Date(Date.now()).toLocaleString() },
              },
              condition: "attribute_not_exists(googleID)",
            };

            ddb
              .createUser(newUser)
              .then(() => {
                return done(null, newUser);
              })
              .catch((err) => console.log(err));
          }
        })
        .catch((err) => console.log(err));
    }
  )
);

/* passport.use(
  new GoogleStrategy(
    {
      //options for the Google Strategy
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // callbackURL: 'https://v7y5dtabh9.execute-api.sa-east-1.amazonaws.com/dev/admin/auth/google/redirect',
      callbackURL: 'https://v7y5dtabh9.execute-api.sa-east-1.amazonaws.com/dev/admin/auth/google/redirect',
    },
    (accessToken, refreshToken, profile, done) => {
      //Check existing user
      ddb
        .getUser({ key: { googleID: { S: profile.id } }, table: 'users_admin_google' })
        .then((user) => {
          if (user.Item) {
            return done(null, user);
          } else {
            return done(null, null);
          }
        })
        .catch((err) => console.log(err));
    }
  )
); */

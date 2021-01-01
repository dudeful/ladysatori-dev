const mongoose = require("mongoose");

const userGoogleSchema = new mongoose.Schema(
  {
    googleID: String,
    username: String,
    fName: String,
    lName: String,
    email: String,
    emailVerified: Boolean,
    locale: String,
    picture: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("googleUser", userGoogleSchema);

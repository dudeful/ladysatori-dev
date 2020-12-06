const mongoose = require("mongoose");

const userTwitterSchema = new mongoose.Schema(
  {
    twitterID: String,
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

module.exports = mongoose.model("twitterUser", userTwitterSchema);

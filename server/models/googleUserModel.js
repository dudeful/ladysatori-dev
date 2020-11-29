const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.ATLAS_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

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

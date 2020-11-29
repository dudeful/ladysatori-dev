const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.ATLAS_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const userFacebookSchema = new mongoose.Schema(
  {
    profile: Object,
    facebookID: String,
    username: String,
    fName: String,
    lName: String,
    email: String,
    emailVerified: Boolean,
    locale: String,
    gender: String,
    dateOfBirth: String,
    picture: Object,
  },
  { timestamps: true }
);

module.exports = mongoose.model("facebookUser", userFacebookSchema);

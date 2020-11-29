const mongoose = require("mongoose");

mongoose.connect(process.env.ATLAS_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const userSchema = new mongoose.Schema(
  {
    fName: String,
    lName: String,
    email: String,
    password: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);

const { json } = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
mongoose.connect(process.env.ATLAS_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const postSchema = new mongoose.Schema(
  {
    coverImg: String,
    tag: String,
    title: String,
    body: Object,
    date: String,
    readTime: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);

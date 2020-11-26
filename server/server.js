const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 5000;

require("dotenv").config();

app.use(express.json({ limit: "25mb" }));
app.use(cors());

// bellow is the mongoose connection
mongoose.connect(process.env.ATLAS_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established succesfully");
});

// requiring and using routes
app.use(
  "/posts",
  cors({ origin: "http://localhost:3000" }),
  require("./routes/posts")
);

app.get("/", function (req, res, next) {
  res.send("hello friend");
});

app.listen(port, () => {
  console.log(
    `OMG! This is the best server I have ever seen! Oh, it is running on Port ${port} BTW.`
  );
});

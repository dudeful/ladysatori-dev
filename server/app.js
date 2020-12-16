const serverless = require("serverless-http");
const express = require("express");
const session = require("express-session");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

require("dotenv").config();

app.use(express.json({ limit: "25mb" }));
app.use(cors());
app.use(
  session({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: true, maxAge: 60000 },
  })
);
app.use(passport.initialize());
app.use(passport.session());

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
  "/admin/aws",
  cors({ origin: ["http://localhost:3000", "https://main.d3ieky02gu560k.amplifyapp.com"] }),
  require("./admin/admin")
);

app.use(
  "/admin",
  cors({ origin: ["http://localhost:3000", "https://main.d3ieky02gu560k.amplifyapp.com"] }),
  require("./admin/auth")
);

app.use(
  "/admin/blog",
  cors({ origin: ["http://localhost:3000", "https://main.d3ieky02gu560k.amplifyapp.com"] }),
  require("./admin/blog")
);

app.use(
  "/posts",
  cors({ origin: ["http://localhost:3000", "https://main.d3ieky02gu560k.amplifyapp.com"] }),
  require("./routes/posts")
);

app.use(
  "/auth",
  cors({ origin: ["http://localhost:3000", "https://main.d3ieky02gu560k.amplifyapp.com"] }),
  require("./routes/auth")
);

app.use(
  "/users",
  cors({ origin: ["http://localhost:3000", "https://main.d3ieky02gu560k.amplifyapp.com"] }),
  require("./routes/users")
);

app.get("/", (req, res) => {
  res.send("hello friend");
});

// app.listen(port, () => {
//   console.log(`OMG! This is the best server I have ever seen! Oh, it is running on Port ${port} BTW.`);
// });

module.exports.handler = serverless(app);

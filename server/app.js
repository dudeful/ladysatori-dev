const serverless = require("serverless-http");
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const cors = require("cors");
const app = express();
const rateLimiter = require("./middleware/rateLimiter");

require("dotenv").config();

app.use(express.json({ limit: "25mb" }));
app.use(bodyParser.json());
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

// requiring and using routes
app.use("/admin/aws", require("./admin/admin"));

app.use("/admin/reset", require("./admin/passwordReset"));

app.use("/admin/auth", require("./admin/auth"));

app.use("/course", require("./admin/course"));

app.use("/blog", require("./admin/blog"));

app.use("/auth", require("./routes/auth"));

app.use("/users", require("./routes/users"));

app.get("/", rateLimiter.helloFriendSpeedLimiter, rateLimiter.helloFriendLimiter, (req, res) => {
  const hello = [];
  for (i = 0; i < 100000; i++) {
    hello.push("hello friend ");
  }
  res.send(hello.join(""));
});

app.listen(5000, () => {
  console.log(`What a Wonderful Audience!`);
});

// module.exports.handler = serverless(app);

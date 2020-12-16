const router = require("express").Router();
const Post = require("../models/postModel");
const rateLimiter = require("../middleware/rateLimiter");

router.route("/").get(rateLimiter.blogSpeedLimiter, rateLimiter.blogLimiter, (req, res) => {
  Post.find()
    .then((posts) => res.json(posts.reverse()))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/post/:id/:title").get(rateLimiter.blogPostSpeedLimiter, rateLimiter.blogPostLimiter, (req, res) => {
  Post.findById(req.params.id)
    .then((post) => res.json(post))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/latest").get(rateLimiter.blogLatestSpeedLimiter, rateLimiter.blogLatestLimiter, (req, res) => {
  Post.find()
    .limit(3)
    .then((post) => res.json(post.reverse()))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;

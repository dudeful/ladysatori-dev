const router = require("express").Router();
const Post = require("../models/postModel");

router.route("/").get((req, res) => {
  Post.find()
    .then((posts) => res.json(posts.reverse()))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/post/:id/:title").get((req, res) => {
  Post.findById(req.params.id)
    .then((post) => res.json(post))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/latest").get((req, res) => {
  Post.find()
    .limit(3)
    .then((post) => res.json(post.reverse()))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/admin/new-post").post((req, res) => {
  //just setting the date format

  const d = new Date(Date.now());
  const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  const date = d.getDate() + " de " + months[d.getMonth()] + ", " + d.getFullYear();

  const bodyBlocks = req.body.body.blocks;

  function readTime(totalLength, currentLength) {
    return totalLength + currentLength.split(/\S+/g).length;
  }

  let i = 0;

  bodyBlocks.map((block) => {
    return (i = i + [block.text].reduce(readTime, -1));
  });

  const roundReadTime = Math.round(i / 130);

  const newPost = new Post({
    coverImg: req.body.coverImg,
    tag: req.body.tag,
    title: req.body.title,
    body: JSON.stringify(req.body.body),
    date: date,
    readTime: roundReadTime,
  });

  newPost
    .save()
    .then((data) =>
      res.json({
        console: "Artigo Publicado!",
        id: data._id,
        title: data.title,
      })
    )
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update-post/:id/:title").patch((req, res) => {
  const bodyBlocks = req.body.body.blocks;

  function readTime(totalLength, currentLength) {
    return totalLength + currentLength.split(/\S+/g).length;
  }

  let i = 0;

  bodyBlocks.map((block) => {
    return (i = i + [block.text].reduce(readTime, -1));
  });

  const roundReadTime = Math.round(i / 130);

  const updatedPost = {
    coverImg: req.body.coverImg,
    tag: req.body.tag,
    title: req.body.title,
    body: JSON.stringify(req.body.body),
    readTime: roundReadTime,
  };

  Post.findOneAndUpdate({ _id: req.params.id }, updatedPost, { new: true })
    .then((data) =>
      res.json({
        console: "Artigo Atualizado!",
        id: data._id,
        title: data.title,
      })
    )
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/delete-post/:id").delete((req, res) => {
  Post.findOneAndDelete({ _id: req.params.id })
    .then(() => res.json("Artigo Deletado!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;

const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/checkEmail").post((req, res) => {
  //check for existing user
  const email = req.body.email;
  User.findOne({ email })
    .then((user) => {
      if (user) {
        res.json({ userExists: true });
      } else {
        res.json({ userExists: false });
      }
    })
    .catch((err) => res.json({ error: err, type: "400" }));
});

router.post("/registration", (req, res) => {
  //check for existing user
  const { email, remember } = req.body;

  User.findOne({ email }).then((user) => {
    if (user) return res.json({ exists: true });

    const newUser = new User({
      fName: req.body.fName,
      lName: req.body.lName,
      email: req.body.email,
      password: req.body.password,
    });

    let expiration = "1h";

    if (remember === true) {
      expiration = "365d";
    }

    //Create salt & hash
    bcrypt.hash(newUser.password, saltRounds, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;
      newUser
        .save()
        .then((user) => {
          jwt.sign(
            {
              id: user.id,
              fName: user.fName,
              lName: user.lName,
              email: user.email,
            },
            process.env.JWT_SECRET,
            { expiresIn: expiration },
            (err, token) => {
              if (err) throw err;
              res.json({ token });
            }
          );
        })
        .catch((err) => res.status(400).json({ error: err }));
    });
  });
});

// router.route("/:id").get((req, res) => {
//   Users.findById(req.params.id)
//     .then((users) => res.json(users))
//     .catch((err) => res.status(400).json("Error: " + err));
// });

// router.route("/:id").delete((req, res) => {
//   Users.findByIdAndDelete(req.params.id)
//     .then(() => res.json("User deleted."))
//     .catch((err) => res.status(400).json("Error: " + err));
// });

// router.route("/update/:id").post((req, res) => {
//   Users.findById(req.params.id)
//     .then((users) => {
//       users.fName = req.body.fName;
//       users.lName = req.body.lName;
//       users.email = req.body.email;
//       users.password = req.body.newUserPassword;

//       users
//         .save()
//         .then(() => res.json("User Updated!"))
//         .catch((err) => res.status(400).json("Error: " + err));
//     })
//     .catch((err) => res.status(400).json("Error: " + err));
// });

module.exports = router;

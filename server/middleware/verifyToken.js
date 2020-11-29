const jwt = require("jsonwebtoken");
require("dotenv").config();

function verifyToken(req, res, next) {
  //Get auth header value
  const userToken = req.headers["authorization"];
  if (userToken) {
    //Verify if the Token is valid
    jwt.verify(userToken, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.json({ isTokenOk: false });
      } else {
        //Next middleware
        req.user = decoded;
        next();
      }
    });
  } else {
    //Forbidden
    res.json({ isTokenOk: false });
  }
}

module.exports = verifyToken;

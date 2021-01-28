const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  let authToken;

  if (
    req.headers.authorization &&
    req.headers.authorization != "null" &&
    req.headers.authorization != "undefined" &&
    req.headers.authorization != "false"
  ) {
    authToken = req.headers.authorization;
  } else {
    authToken = false;
  }

  if (authToken) {
    //Verify if the token is valid

    jwt.verify(authToken, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        //try again but this time with the ADMIN jwt secrets
        jwt.verify(authToken, process.env.JWT_ADMIN_SECRET, (err, decoded) => {
          if (err) {
            res.json({ isTokenOk: false });
          } else {
            // Decrypt
            const bytes = CryptoJS.AES.decrypt(decoded.ciphertext, process.env.JWT_ADMIN_PAYLOAD_ENCRYPTION_KEY);
            const decryptedPayload = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            decoded.ciphertext = undefined;
            decoded.payload = decryptedPayload;

            req.user = decoded;

            //Next middleware
            next();
          }
        });
      } else {
        // Decrypt
        const bytes = CryptoJS.AES.decrypt(decoded.ciphertext, process.env.JWT_PAYLOAD_ENCRYPTION_KEY);
        const decryptedPayload = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        decoded.ciphertext = undefined;
        decoded.payload = decryptedPayload;

        req.user = decoded;

        //Next middleware
        next();
      }
    });
  } else {
    //Forbidden
    res.json({ isTokenOk: false });
  }
}

module.exports = verifyToken;

const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

function verifyAdminToken(req, res, next) {
  //
  let sessionToken;

  if (req.headers.sessiontoken != "null" && req.headers.sessiontoken != "undefined") {
    sessionToken = req.headers.sessiontoken;
  } else {
    sessionToken = false;
  }

  if (sessionToken) {
    //Verify if the sessionStorage token is valid
    jwt.verify(sessionToken, process.env.JWT_ADMIN_SECRET, (err, decoded) => {
      if (err) {
        res.json({ isTokenOk: false });
      } else {
        //Next middleware

        // Decrypt
        const bytes = CryptoJS.AES.decrypt(decoded.ciphertext, process.env.JWT_ADMIN_PAYLOAD_ENCRYPTION_KEY);
        const decryptedPayload = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        decoded.ciphertext = undefined;
        decoded.payload = decryptedPayload;

        req.user = decoded;
        next();
      }
    });
  } else {
    //Forbidden
    res.json({ isTokenOk: false });
  }
}

module.exports = verifyAdminToken;

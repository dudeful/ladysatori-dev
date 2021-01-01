const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {
  const getToken = () => {
    //Get auth header value
    let localToken;
    let sessionToken;

    switch (req.headers.localtoken) {
      case "null":
        localToken = false;
        break;
      case "undefined":
        localToken = false;
        break;
      case "false":
        localToken = false;
        break;
      default:
        localToken = req.headers.localtoken;
    }

    switch (req.headers.sessiontoken) {
      case "null":
        sessionToken = false;
        break;
      case "undefined":
        sessionToken = false;
        break;
      case "false":
        sessionToken = false;
        break;
      default:
        sessionToken = req.headers.sessiontoken;
    }
    return { localToken, sessionToken };
  };

  if (getToken().localToken) {
    //Verify if the localStorage token is valid

    jwt.verify(getToken().localToken, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        res.json({ isTokenOk: false });
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
  } else if (getToken().sessionToken) {
    //Verify if the sessionStorage token is valid

    jwt.verify(getToken().sessionToken, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        //try again but this time with the ADMIN jwt secrets
        jwt.verify(getToken().sessionToken, process.env.JWT_ADMIN_SECRET, (err, decoded) => {
          if (err) {
            res.json({ isTokenOk: false });
          } else {
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

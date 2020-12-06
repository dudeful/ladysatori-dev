const passwordBlacklist = require("./passwordBlacklist");
const emailValidator = require("email-validator");
const passwordValidator = require("password-validator");

// Create a schema
let passwordSchema = new passwordValidator();

const validate = (req, res, next) => {
  // Add properties to it
  passwordSchema
    .is()
    .min(8) // Minimum length 8
    .is()
    .max(50) // Maximum length 50
    .has()
    .uppercase() // Must have uppercase letters
    .has()
    .lowercase() // Must have lowercase letters
    .has()
    .digits(1) // Must have at least 1 digits
    .has()
    .not()
    .spaces() // Should not have spaces
    .is()
    .not()
    .oneOf(passwordBlacklist({ fName: req.body.fName, lName: req.body.lName, email: req.body.email })); // Blacklist these values

  let validEmail = emailValidator.validate(req.body.email);

  let passwordError = passwordSchema.validate(req.body.password, {
    list: true,
  });

  let validationErrors = { validEmail: validEmail, passwordError: passwordError };

  if (validEmail && passwordSchema.validate(req.body.password)) {
    return next();
  } else {
    return res.json({ validation: validationErrors });
  }
};

const validateOnlyEmail = (req, res, next) => {
  let validEmail = emailValidator.validate(req.body.email);
  if (validEmail) {
    return next();
  } else {
    return res.json({ validEmail: false });
  }
};

const validateOnlyPassword = (req, res, next) => {
  const { user, newPassword } = req.body;
  // Add properties to it
  passwordSchema
    .is()
    .min(8) // Minimum length 8
    .is()
    .max(50) // Maximum length 100
    .has()
    .uppercase() // Must have uppercase letters
    .has()
    .lowercase() // Must have lowercase letters
    .has()
    .digits(1) // Must have at least 1 digits
    .has()
    .not()
    .spaces() // Should not have spaces
    .is()
    .not()
    .oneOf(passwordBlacklist(user)); // Blacklist these values

  let passwordError = passwordSchema.validate(newPassword.password, {
    list: true,
  });

  if (passwordSchema.validate(newPassword.password)) {
    return next();
  } else {
    return res.json({ passwordError });
  }
};

module.exports = { validate, validateOnlyEmail, validateOnlyPassword };

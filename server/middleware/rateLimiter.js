const rateLimit = require("express-rate-limit");
const slowDown = require("express-slow-down");

const helloFriendLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 5,
});

const helloFriendSpeedLimiter = slowDown({
  windowMs: 5 * 60 * 1000,
  delayAfter: 5,
  delayMs: 300,
});

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
// app.set('trust proxy', 1);

const resetPasswordLimiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 15,
});

// app.enable("trust proxy"); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc)

const resetPasswordSpeedLimiter = slowDown({
  windowMs: 5 * 60 * 1000, // 5 minutes
  delayAfter: 5, // allow 5 requests to go at full-speed, then...
  delayMs: 300, // 6th request has a 300ms delay, 7th has a 600ms delay, 8th gets 900ms, etc.
});

const tokenHashLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 20,
});

const tokenHashSpeedLimiter = slowDown({
  windowMs: 5 * 60 * 1000,
  delayAfter: 10,
  delayMs: 300,
});

const resetPasswordEmailLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 20,
});

const resetPasswordEmailSpeedLimiter = slowDown({
  windowMs: 5 * 60 * 1000,
  delayAfter: 10,
  delayMs: 300,
});

const loginLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 15,
});

const loginSpeedLimiter = slowDown({
  windowMs: 5 * 60 * 1000,
  delayAfter: 10,
  delayMs: 300,
});

//VERY CAREFUL WITH THESE ONE
const isLoggedInLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 100,
});

//VERY CAREFUL WITH THESE ONE
const isLoggedInSpeedLimiter = slowDown({
  windowMs: 5 * 60 * 1000,
  delayAfter: 60,
  delayMs: 300,
});

const oAuth2Limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 15,
});

const oAuth2SpeedLimiter = slowDown({
  windowMs: 5 * 60 * 1000,
  delayAfter: 10,
  delayMs: 300,
});

const oAuth2RedirectLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 15,
});

const oAuth2RedirectSpeedLimiter = slowDown({
  windowMs: 5 * 60 * 1000,
  delayAfter: 10,
  delayMs: 300,
});

const checkEmailLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 30,
});

const checkEmailSpeedLimiter = slowDown({
  windowMs: 5 * 60 * 1000,
  delayAfter: 15,
  delayMs: 300,
});

const blogLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 50,
});

const blogSpeedLimiter = slowDown({
  windowMs: 5 * 60 * 1000,
  delayAfter: 30,
  delayMs: 300,
});

const blogPostLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 50,
});

const blogPostSpeedLimiter = slowDown({
  windowMs: 5 * 60 * 1000,
  delayAfter: 30,
  delayMs: 300,
});

const blogLatestLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 50,
});

const blogLatestSpeedLimiter = slowDown({
  windowMs: 5 * 60 * 1000,
  delayAfter: 30,
  delayMs: 300,
});

const classLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 100,
});

const classSpeedLimiter = slowDown({
  windowMs: 5 * 60 * 1000,
  delayAfter: 50,
  delayMs: 300,
});

const addPostLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 20,
});

const addPostSpeedLimiter = slowDown({
  windowMs: 5 * 60 * 1000,
  delayAfter: 10,
  delayMs: 300,
});

const addLessonLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 20,
});

const addLessonSpeedLimiter = slowDown({
  windowMs: 5 * 60 * 1000,
  delayAfter: 10,
  delayMs: 300,
});

module.exports = {
  helloFriendLimiter,
  helloFriendSpeedLimiter,
  resetPasswordLimiter,
  resetPasswordSpeedLimiter,
  tokenHashLimiter,
  tokenHashSpeedLimiter,
  resetPasswordEmailLimiter,
  resetPasswordEmailSpeedLimiter,
  loginLimiter,
  loginSpeedLimiter,
  isLoggedInLimiter,
  isLoggedInSpeedLimiter,
  oAuth2Limiter,
  oAuth2SpeedLimiter,
  oAuth2RedirectLimiter,
  oAuth2RedirectSpeedLimiter,
  checkEmailLimiter,
  checkEmailSpeedLimiter,
  blogLimiter,
  blogSpeedLimiter,
  blogPostLimiter,
  blogPostSpeedLimiter,
  blogLatestLimiter,
  blogLatestSpeedLimiter,
  classLimiter,
  classSpeedLimiter,
  addPostLimiter,
  addPostSpeedLimiter,
  addLessonLimiter,
  addLessonSpeedLimiter,
};

let express = require("express");
let apiRouter = express.Router();

const rateLimit = require("express-rate-limit");
let ratelimit = rateLimit({
  windowMs: 1 * 60 * 1000,
  limit: 5,
  standardHeaders: "draft-8",
  legacyHeaders: false,
});
apiRouter.get("/public", (req, res) => {
  res.status(200).json({ message: "This is a public endpoint!" });
});
apiRouter.get("/limited", ratelimit, (req, res) => {
  res
    .status(200)
    .json({ message: "You have access to this limited endpoint!" });
});

module.exports = apiRouter;

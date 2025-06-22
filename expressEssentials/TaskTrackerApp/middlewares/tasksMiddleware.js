let dataCheckMiddleware = (req, res, next) => {
  let { title, description, tag, priority } = req.body;
  if (!title || !description || !tag || !priority) {
    return res
      .status(405)
      .json({ message: "404 , Please Provide all the required fields..." });
  }
  next();
};

module.exports = { dataCheckMiddleware };

let dataValidationMiddleware = (req, res, next) => {
  let { title, description, priority } = req.body;
  if (!title || !description || !priority) {
    return res.status(405).json({ message: "Incomplete Data Received" });
  }
  priority = priority.toLowerCase();
  // console.log(priority)
  if (priority != "low" && priority != "medium" && priority != "high") {
    return res
      .status(405)
      .json({ message: "Please provide valid priority details.." });
  }
  next();
};

module.exports = dataValidationMiddleware;

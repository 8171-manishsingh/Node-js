module.exports = (req, res, next) => {
  if (!req.body.name) {
    return res.status(400).send("Name is required");
  }
  next();
};

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (token !== "12345") {
    return res.status(401).send("Unauthorized");
  }
  next();
};

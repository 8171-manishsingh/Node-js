module.exports = (req, res, next) => {
  const hour = new Date().getHours();
  if (hour < 10) {
    return res.status(403).send("Website allowed only after 10 AM.");
  }
  next();
};

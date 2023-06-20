require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const token = req.headers["authorization"];

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return res.send({ message: "authentification error" });
    req.body.username = user.username;
    return next();
  });
};

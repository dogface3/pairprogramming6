const jwt = require("jsonwebtoken");
require("dotenv").config();

const requireAuth = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized. Token not provided." });
  }
  console.log(token)
  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized. Invalid token." });
    }

    req.userId = decodedToken.userId;
    next();
  });
};

module.exports = { requireAuth };

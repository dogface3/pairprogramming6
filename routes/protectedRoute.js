const express = require("express");
const router = express.Router();
const { requireAuth } = require("../middlewares/authMiddleware");

router.get("/", requireAuth, (req, res) => {
  res.status(200).json({ message: "This is a protected route. Only authenticated users can access it." });
});

module.exports = router;

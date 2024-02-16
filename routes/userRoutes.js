const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/", userController.registerUser);
router.post("/login", userController.loginUser);
router.get("/", userController.getAllUsers);
router.delete("/:id", userController.deleteUserById);

module.exports = router;

const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = require("../models/userModel");
const jwt = require("jsonwebtoken"); 

const SECRET="secretword"
const createToken = (_id) => {
  return jwt.sign({ _id }, SECRET, { expiresIn: '3d' });
}

exports.registerUser = async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const newUser = new User({ username, hashedPassword });
  await newUser.save();
  const token = createToken(newUser._id);
  res.status(201).json({ message: "User registered successfully", token });
};

exports.getAllUsers = async (req, res) => {
  const allUsers = await User.find({});
  res.status(200).json(allUsers);
};

exports.deleteUserById = async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  res.status(200).json({ message: "User deleted successfully" });
};

// Endpoint to authenticate a user
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  // Find the user by username
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(401).json({ message: "Authentication failed" });
  }

  // Compare the provided password with the hashed password in the database
  const passwordMatch = await bcrypt.compare(password, user.hashedPassword);

  if (!passwordMatch) {
    return res.status(401).json({ message: "Authentication failed" });
  }
  const token = createToken(user._id);
  res.status(200).json({ message: "Authentication successful", token });
  
};
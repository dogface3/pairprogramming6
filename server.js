const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const protectedRoute = require("./routes/protectedRoute");
require("dotenv").config();

const app = express();
app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// Use user routes
app.use("/api/users", userRoutes);

// Use protected route
app.use("/api/protectedroute", protectedRoute);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

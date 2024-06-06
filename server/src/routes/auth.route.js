const express = require("express");
const {
  authLogin,
  authLogout,
  authRegister,
  authStatus,
  verify,
  isVerified,
} = require("../controllers/auth.controller");
const { authenticate } = require("../middlewares");

const app = express.Router();

// Register
app.post("/register", authRegister);

// Login
app.post("/login", authLogin);

// Logout
app.post("/logout", authLogout);

// Check Auth status
app.get("/me", authenticate, authStatus);

//Verify email route
app.get("/verify/:token", verify);

//isVerified user
app.post("/isVerified", isVerified);

module.exports = app;

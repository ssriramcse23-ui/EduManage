// ---------------- IMPORTS ----------------
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

const Marks = require("./models/Marks");

// ---------------- APP SETUP ----------------
const app = express();

app.use(
  cors({
    origin: "*", // 🔧 change to frontend URL later
    credentials: true,
  })
);

app.use(express.json());

// ---------------- MONGODB CONNECTION (FIXED) ----------------
let isConnected = false;

async function connectDB() {
  if (isConnected) return;

  try {
    await mongoose.connect(process.env.MONGO_URI);
    isConnected = true;
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("MongoDB Connection Error:", err);
  }
}

connectDB();

// ---------------- USER MODEL ----------------
const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  gender: String,
  registerNo: String,
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

// ---------------- EMAIL TRANSPORTER ----------------
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ---------------- ROUTES ----------------

// ✅ TEST ROUTE (VERY IMPORTANT)
app.get("/", (req, res) => {
  res.json({ message: "Backend API working on Vercel 🚀" });
});

// --- REGISTER ---
app.post("/register", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      rePassword,
      gender,
      registerNo,
    } = req.body;

    if (password !== rePassword)
      return res.json({
        success: false,
        message: "Password & Re-Password do not match!",
      });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.json({
        success: false,
        message: "Email already exists!",
      });

    const hashedPassword = await bcrypt.hash(password, 10);

    await new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      gender,
      registerNo,
    }).save();

    res.json({ success: true, message: "User Registered Successfully!" });
  } catch (err) {
    console.log("Register Error:", err);
    res.status(500).json({ success: false, message: "Registration Failed!" });
  }
});

// --- LOGIN ---
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ success: false, message: "Email not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ success: false, message: "Incorrect password" });

    res.json({
      success: true,
      message: "Login Successful",
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        gender: user.gender,
        registerNo: user.registerNo,
      },
    });
  } catch (err) {
    console.log("Login Error:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// --- FORGOT PASSWORD ---
app.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user)
      return res.json({
        success: false,
        message: "Email not registered!",
      });

    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${user._id}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Link",
      html: `
        <h3>Hello ${user.firstName}</h3>
        <p>Click below to reset your password:</p>
        <a href="${resetLink}">Reset Password</a>
      `,
    });

    res.json({ success: true, message: "Reset link sent!" });
  } catch (err) {
    console.log("Forgot Password Error:", err);
    res.status(500).json({ success: false, message: "Email failed" });
  }
});

// --- GET MARKS ---
app.get("/marks/:userId", async (req, res) => {
  try {
    const userId = req.params.userId.trim();

    if (!mongoose.Types.ObjectId.isValid(userId))
      return res.status(400).json({ success: false, message: "Invalid userId" });

    const marks = await Marks.find({ userId });
    res.json({ success: true, marks });
  } catch (err) {
    console.log("Marks Fetch Error:", err);
    res.status(500).json({ success: false, message: "Error fetching marks" });
  }
});

// --- ADD MARKS ---
app.post("/marks", async (req, res) => {
  try {
    const { userId, subject } = req.body;

    if (!userId || !subject)
      return res.json({
        success: false,
        message: "userId & subject required!",
      });

    await new Marks(req.body).save();
    res.json({ success: true, message: "Marks added successfully" });
  } catch (err) {
    console.log("Add Marks Error:", err);
    res.status(500).json({ success: false, message: "Error adding marks" });
  }
});

// ✅ REQUIRED FOR VERCEL
module.exports = app;

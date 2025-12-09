import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

// ---------------- ENV ----------------
const MONGO_URI = process.env.MONGO_URI;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const FRONTEND_URL = process.env.FRONTEND_URL || "*";

// ---------------- MONGODB CONNECTION ----------------
let cached = global.mongoose;
if (!cached) cached = global.mongoose = { conn: null, promise: null };

async function connectToDatabase() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }).then((mongoose) => mongoose);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

// ---------------- MODELS ----------------
const UserSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  gender: String,
  registerNo: String,
});
const User = mongoose.models.User || mongoose.model("User", UserSchema);

const MarksSchema = new mongoose.Schema({
  userId: String,
  subject: String,
  score: Number,
});
const Marks = mongoose.models.Marks || mongoose.model("Marks", MarksSchema);

// ---------------- EMAIL TRANSPORTER ----------------
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: EMAIL_USER, pass: EMAIL_PASS },
});

// ---------------- CORS ----------------
function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin", FRONTEND_URL);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

// ---------------- HANDLER ----------------
export default async function handler(req, res) {
  setCors(res);

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  await connectToDatabase();

  // Get route from query parameter
  const route = req.query.route; // e.g., /api/server?route=register
  const { method, body, query } = req;

  // ---------- REGISTER ----------
  if (method === "POST" && route === "register") {
    try {
      const { firstName, lastName, email, password, rePassword, gender, registerNo } = body;
      if (password !== rePassword)
        return res.json({ success: false, message: "Password & Re-Password do not match!" });

      const existingUser = await User.findOne({ email });
      if (existingUser)
        return res.json({ success: false, message: "Email already exists!" });

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ firstName, lastName, email, password: hashedPassword, gender, registerNo });
      await newUser.save();
      return res.json({ success: true, message: "User Registered Successfully!" });
    } catch (err) {
      console.log("Register Error:", err);
      return res.json({ success: false, message: "Registration Failed!" });
    }
  }

  // ---------- LOGIN ----------
  if (method === "POST" && route === "login") {
    try {
      const { email, password } = body;
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ success: false, message: "Email not found" });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ success: false, message: "Incorrect password" });

      const safeUser = {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        gender: user.gender,
        registerNo: user.registerNo,
      };
      return res.json({ success: true, message: "Login Successful", user: safeUser });
    } catch (err) {
      console.log("Login Error:", err);
      return res.status(500).json({ success: false, message: "Server Error" });
    }
  }

  // ---------- FORGOT PASSWORD ----------
  if (method === "POST" && route === "forgot-password") {
    try {
      const { email } = body;
      const user = await User.findOne({ email });
      if (!user) return res.json({ success: false, message: "Email not registered!" });

      const resetLink = `${FRONTEND_URL}/reset-password/${user._id}`;
      await transporter.sendMail({
        from: EMAIL_USER,
        to: email,
        subject: "Password Reset Link",
        html: `<h2>Hello ${user.firstName}</h2><p>Click below to reset password:</p><a href="${resetLink}" target="_blank">Reset Password</a>`,
      });

      return res.json({ success: true, message: "Reset link sent to email!" });
    } catch (err) {
      console.log("Forgot Password Error:", err);
      return res.json({ success: false, message: "Error sending reset email!" });
    }
  }

  // ---------- GET MARKS ----------
  if (method === "GET" && route === "marks") {
    try {
      const userId = query.userId;
      if (!userId) return res.status(400).json({ success: false, message: "userId required" });

      const marks = await Marks.find({ userId });
      return res.json({ success: true, marks });
    } catch (err) {
      console.log("Error fetching marks:", err);
      return res.status(500).json({ success: false, message: "Error fetching marks" });
    }
  }

  // ---------- ADD MARKS ----------
  if (method === "POST" && route === "marks") {
    try {
      const { userId, subject, score } = body;
      if (!userId || !subject) return res.status(400).json({ success: false, message: "userId & subject required" });

      const newMarks = new Marks({ userId, subject, score });
      await newMarks.save();
      return res.json({ success: true, message: "Marks added successfully" });
    } catch (err) {
      console.log("Error adding marks:", err);
      return res.status(500).json({ success: false, message: "Error adding marks" });
    }
  }

  // ---------- DEFAULT ----------
  res.status(404).json({ message: "Route not found" });
}

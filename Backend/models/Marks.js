const mongoose = require("mongoose");

const MarksSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // link to student
  subject: String,
  internal1: Number,
  internal2: Number,
  internal3: Number,
  assignment: Number,
  attendance: Number,
  total: Number,
  grade: String,
  status: String,
});

module.exports = mongoose.model("Marks", MarksSchema);

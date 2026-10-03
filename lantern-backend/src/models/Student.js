const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },
  branch: String,
  college: String,
  year: Number,
  skills: [String],
  github: String,
  linkedin: String,
  leetcode: String,
  resumeUrl: String,
  bio: String,
  stats: {
    commits30d: { type: Number, default: 0 },
    leetcodeSolved: { type: Number, default: 0 },
    hackathons: { type: Number, default: 0 },
    readiness: { type: Number, default: 0 }
  }
}, { timestamps: true });

module.exports = mongoose.model("Student", studentSchema);
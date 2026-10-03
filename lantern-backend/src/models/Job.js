const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  organization: String,
  sector: {
    type: String,
    enum: ["govt", "private"],
    required: true
  },
  requiredSkills: [String],
  screeningCriteria: [String],
  location: String,
  salary: String,
  description: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Job", jobSchema);
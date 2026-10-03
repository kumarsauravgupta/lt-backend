const mongoose = require("mongoose");

const opportunitySchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["internship", "hackathon", "event", "news"],
    required: true
  },
  title: { type: String, required: true },
  organization: String,
  location: String,
  duration: String,
  stipend: String,
  description: String,
  skills: [String],
  deadline: Date,
  url: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Opportunity", opportunitySchema);
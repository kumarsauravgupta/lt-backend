require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("./src/models/User");
const Student = require("./src/models/Student");
const Opportunity = require("./src/models/Opportunity");
const Job = require("./src/models/Job");

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);

  await Promise.all([
    User.deleteMany({}),
    Student.deleteMany({}),
    Opportunity.deleteMany({}),
    Job.deleteMany({})
  ]);

  const password = await bcrypt.hash("Lantern@123", 12);

  const users = await User.insertMany([
    { name: "Saurav", email: "saurav@lantern.dev", password, role: "student" },
    { name: "Aarav Mehta", email: "aarav@lantern.dev", password, role: "student" },
    { name: "Diya Sharma", email: "diya@lantern.dev", password, role: "student" },
    { name: "Lantern College", email: "college@lantern.dev", password, role: "college" },
    { name: "Lantern Industry", email: "industry@lantern.dev", password, role: "industry" }
  ]);

  const byEmail = email => users.find(u => u.email === email)._id;

  await Student.insertMany([
    {
      user: byEmail("saurav@lantern.dev"),
      branch: "CSE",
      college: "Delhi Technical Campus",
      year: 1,
      skills: ["C++", "DSA", "Git", "HTML", "CSS", "JavaScript"],
      github: "https://github.com/your-username",
      linkedin: "https://linkedin.com/in/your-username",
      leetcode: "https://leetcode.com/your-username",
      stats: { commits30d: 47, leetcodeSolved: 312, hackathons: 1, readiness: 72 }
    },
    {
      user: byEmail("aarav@lantern.dev"),
      branch: "CSE",
      college: "Example Institute",
      year: 3,
      skills: ["React", "Node.js", "DSA"],
      stats: { commits30d: 84, leetcodeSolved: 412, hackathons: 3, readiness: 91 }
    },
    {
      user: byEmail("diya@lantern.dev"),
      branch: "IT",
      college: "Example Institute",
      year: 2,
      skills: ["Python", "ML", "SQL"],
      stats: { commits30d: 61, leetcodeSolved: 268, hackathons: 2, readiness: 78 }
    }
  ]);

  await Opportunity.insertMany([
    {
      type: "internship",
      title: "Frontend Intern",
      organization: "Razorpay",
      location: "Remote",
      duration: "3 months",
      stipend: "₹40k/mo",
      skills: ["React", "JavaScript", "CSS"]
    },
    {
      type: "internship",
      title: "Data Analyst Intern",
      organization: "Zoho",
      location: "Chennai",
      duration: "6 months",
      stipend: "₹25k/mo",
      skills: ["Python", "SQL", "Data Analysis"]
    },
    {
      type: "internship",
      title: "Backend Intern",
      organization: "Swiggy",
      location: "Bengaluru",
      duration: "2 months",
      stipend: "₹50k/mo",
      skills: ["Node.js", "APIs", "Databases"]
    },
    {
      type: "hackathon",
      title: "Smart India Hackathon 2026",
      organization: "SIH",
      location: "India",
      description: "Student innovation and problem-solving event"
    },
    {
      type: "event",
      title: "Lantern Build Weekend",
      organization: "Lantern",
      location: "Online",
      duration: "48 hours"
    }
  ]);

  await Job.insertMany([
    {
      title: "Scientific Officer (IT)",
      organization: "Central Govt.",
      sector: "govt",
      requiredSkills: ["C++", "DSA"],
      screeningCriteria: ["Verified projects", "Exam rank"]
    },
    {
      title: "Junior Software Engineer",
      organization: "State e-Governance",
      sector: "govt",
      requiredSkills: ["Java", "SQL"],
      screeningCriteria: ["Coding test", "GitHub history"]
    },
    {
      title: "SDE-1",
      organization: "Product startup",
      sector: "private",
      requiredSkills: ["DSA", "JavaScript"],
      screeningCriteria: ["System design", "Coding consistency"]
    },
    {
      title: "ML Engineer",
      organization: "Fintech",
      sector: "private",
      requiredSkills: ["Python", "ML", "SQL"],
      screeningCriteria: ["Shipped models", "Technical projects"]
    }
  ]);

  console.log("Lantern demo database seeded.");
  console.log("Demo password for all accounts: Lantern@123");

  await mongoose.disconnect();
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
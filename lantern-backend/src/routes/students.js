const express = require("express");
const Student = require("../models/Student");
const auth = require("../middleware/auth");
const roles = require("../middleware/roles");

const router = express.Router();

router.get("/profile", auth, roles("student"), async (req, res, next) => {
  try {
    const profile = await Student.findOne({ user: req.user.id }).populate(
      "user",
      "name email role"
    );

    res.json({
      success: true,
      profile
    });
  } catch (err) {
    next(err);
  }
});

router.post("/profile", auth, roles("student"), async (req, res, next) => {
  try {
    const profile = await Student.findOneAndUpdate(
      { user: req.user.id },
      { user: req.user.id, ...req.body },
      { new: true, upsert: true, runValidators: true }
    );

    res.json({
      success: true,
      profile
    });
  } catch (err) {
    next(err);
  }
});

router.get("/directory", async (req, res, next) => {
  try {
    const { skill, branch, college } = req.query;
    const filter = {};

    if (skill) filter.skills = { $regex: new RegExp(skill, "i") };
    if (branch) filter.branch = branch;
    if (college) filter.college = college;

    const students = await Student.find(filter)
      .populate("user", "name email")
      .limit(100);

    res.json({
      success: true,
      count: students.length,
      students
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
const express = require("express");
const Student = require("../models/Student");
const auth = require("../middleware/auth");
const roles = require("../middleware/roles");

const router = express.Router();

router.get("/dashboard", auth, roles("college", "admin"), async (req, res, next) => {
  try {
    const students = await Student.find()
      .populate("user", "name")
      .sort({ "stats.readiness": -1 })
      .limit(100);

    const totalStudents = await Student.countDocuments();

    const averageReadiness = students.length
      ? Math.round(
          students.reduce((sum, s) => sum + (s.stats?.readiness || 0), 0) /
          students.length
        )
      : 0;

    res.json({
      success: true,
      dashboard: {
        totalStudents,
        averageReadiness,
        students
      }
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
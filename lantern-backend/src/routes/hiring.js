const express = require("express");
const Student = require("../models/Student");
const Job = require("../models/Job");
const auth = require("../middleware/auth");
const roles = require("../middleware/roles");

const router = express.Router();

router.get("/jobs", async (req, res, next) => {
  try {
    const { sector } = req.query;
    const filter = sector && sector !== "all" ? { sector } : {};

    const jobs = await Job.find(filter).sort({ createdAt: -1 });

    res.json({
      success: true,
      jobs
    });
  } catch (err) {
    next(err);
  }
});

router.post("/jobs", auth, roles("industry", "admin"), async (req, res, next) => {
  try {
    const job = await Job.create(req.body);

    res.status(201).json({
      success: true,
      job
    });
  } catch (err) {
    next(err);
  }
});

/*
  Lantern candidate matching:
  Each required skill contributes one point.
  Match percentage = matched skills / required skills * 100.
  This is a transparent baseline for the demo.
  Later you can replace this with a proper ML ranking model.
*/
router.get("/candidates", auth, roles("industry", "admin"), async (req, res, next) => {
  try {
    const skills = String(req.query.skills || "")
      .split(",")
      .map(s => s.trim())
      .filter(Boolean);

    const students = await Student.find()
      .populate("user", "name email")
      .limit(500);

    const candidates = students.map(student => {
      const studentSkills = student.skills.map(s => s.toLowerCase());

      const matchedSkills = skills.filter(skill =>
        studentSkills.includes(skill.toLowerCase())
      );

      const score = skills.length
        ? Math.round((matchedSkills.length / skills.length) * 100)
        : 0;

      return {
        studentId: student._id,
        name: student.user?.name,
        branch: student.branch,
        college: student.college,
        skills: student.skills,
        matchedSkills,
        score,
        stats: student.stats
      };
    });

    candidates.sort((a, b) => b.score - a.score);

    res.json({
      success: true,
      requiredSkills: skills,
      candidates
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
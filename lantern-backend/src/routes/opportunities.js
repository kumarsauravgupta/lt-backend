const express = require("express");
const Opportunity = require("../models/Opportunity");
const Application = require("../models/Application");
const auth = require("../middleware/auth");
const roles = require("../middleware/roles");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const { type, skill } = req.query;
    const filter = {};

    if (type) filter.type = type;
    if (skill) filter.skills = { $regex: new RegExp(skill, "i") };

    const opportunities = await Opportunity.find(filter)
      .sort({ createdAt: -1 })
      .limit(100);

    res.json({
      success: true,
      count: opportunities.length,
      opportunities
    });
  } catch (err) {
    next(err);
  }
});

router.post("/", auth, roles("industry", "college", "admin"), async (req, res, next) => {
  try {
    const opportunity = await Opportunity.create(req.body);

    res.status(201).json({
      success: true,
      opportunity
    });
  } catch (err) {
    next(err);
  }
});

router.post("/:id/apply", auth, roles("student"), async (req, res, next) => {
  try {
    const application = await Application.create({
      student: req.user.id,
      opportunity: req.params.id
    });

    res.status(201).json({
      success: true,
      application
    });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "You already applied to this opportunity"
      });
    }
    next(err);
  }
});

router.get("/my-applications", auth, roles("student"), async (req, res, next) => {
  try {
    const applications = await Application.find({
      student: req.user.id
    }).populate("opportunity");

    res.json({
      success: true,
      applications
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
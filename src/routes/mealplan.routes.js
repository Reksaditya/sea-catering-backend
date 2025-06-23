const express = require("express");
const router = express.Router();
const { getAllMealPlans, createMealPlan } = require("../controllers/mealplan.controllers");

router.get("/", getAllMealPlans);
router.post("/", createMealPlan);

module.exports = router;
const { getMealPlan, addMealPlan } = require("../services/mealplan.services");

async function getAllMealPlans(req, res) {
  const mealPlans = await getMealPlan();
  res.json(mealPlans);
};

async function createMealPlan(req, res) {
  const { name, price, description, imageUrl } = req.body;
  try {
    const plan = await addMealPlan({ name, price, description, imageUrl })
    res.status(201).json(plan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { getAllMealPlans, createMealPlan };
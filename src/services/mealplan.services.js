const prisma = require('../prisma/client');

async function getMealPlan() {
  const mealPlans = await prisma.MealPlan.findMany({
    include: {
      Subscription: true,
    },
  });
  return mealPlans;
};

async function addMealPlan({ name, description, price, imageUrl }) {
  return await prisma.mealPlan.create({
    data: {
      name,
      description,
      price: parseFloat(price),
      imageUrl,
    },
  });
}

module.exports = { getMealPlan, addMealPlan };
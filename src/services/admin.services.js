const prisma = require('../prisma/client'); 

const calculateNewSubscriptions = async (start, end) => {
  return prisma.subscription.count({
    where: {
      createdAt: {
        gte: new Date(start),
        lte: new Date(end),
      },
    },
  });
};

const calculateMRR = async (start, end) => {
  const activeSubs = await prisma.subscription.findMany({
    where: {
      status: 'active',
      createdAt: {
        gte: new Date(start),
        lte: new Date(end),
      },
    },
    include: { plan: true },
  });

  return activeSubs.reduce((total, sub) => {
    const mealTypeCount = sub.mealTypes.length;
    const deliveryDaysCount = sub.deliveryDays.length;
    const price = sub.plan.price * mealTypeCount * deliveryDaysCount * 4.3;
    return total + price;
  }, 0);
};

const calculateReactivations = async (start, end) => {
  return prisma.subscription.count({
    where: {
      status: 'active',
      updatedAt: {
        gte: new Date(start),
        lte: new Date(end),
      },
      pauseFrom: { not: null },
      pauseUntil: { not: null },
    },
  });
};

const calculateGrowth = async () => {
  return prisma.subscription.count({
    where: {
      status: 'active',
    },
  });
};


module.exports = {
  calculateNewSubscriptions,
  calculateMRR,
  calculateReactivations,
  calculateGrowth
};
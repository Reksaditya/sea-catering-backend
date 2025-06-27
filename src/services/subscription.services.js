// subscription.service.js
const prisma = require('../prisma/client');

async function createSubscription(userId, {
  fullName,
  phoneNumber,
  domicile,
  planId,
  mealTypes,
  deliveryDays,
  allergies
}) {
  return await prisma.subscription.create({
    data: {
      userId,
      fullName,
      phoneNumber,
      domicile,
      planId,
      mealTypes,
      deliveryDays,
      allergies,
    },
    include: {
      plan: true
    }
  });
}

async function updateSubscription(id, {
  fullName,
  phoneNumber,
  domicile,
  planId,
  mealTypes,
  deliveryDays,
  allergies
}) {
  return await prisma.subscription.update({
    where: { id },
    data: {
      fullName,
      phoneNumber,
      domicile,
      planId,
      mealTypes,
      deliveryDays,
      allergies,
    },
    include: {
      plan: true
    }
  });
}

async function getUserSubscriptions(userId) {
  return await prisma.subscription.findMany({
    where: { userId, isCancelled: false },
    include: { plan: true }
  });
}

async function cancelSubscription(id) {
  return await prisma.subscription.update({
    where: { id },
    data: { isCancelled: true },
  });
}

module.exports = {
  createSubscription,
  updateSubscription,
  getUserSubscriptions,
  cancelSubscription,
};

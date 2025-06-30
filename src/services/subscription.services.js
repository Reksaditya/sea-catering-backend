const prisma = require('../prisma/client');

async function createSubscription(userId, {
  fullName,
  phoneNumber,
  domicile,
  planId,
  mealTypes,
  deliveryDays,
  allergies,
}) {
  const startDate = new Date();
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 30);

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
      startDate,
      endDate
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
      updatedAt: new Date()
    },
    include: {
      plan: true
    }
  });
}

async function getUserSubscriptions(userId, statusFilter = null) {
  const whereClause = { userId };

  if (statusFilter === 'cancelled') {
    whereClause.isCancelled = true;
  } else if (statusFilter === 'expired') {
    whereClause.isExpired = true;
  } else if (statusFilter === 'active') {
    whereClause.isCancelled = false;
    whereClause.isExpired = false;
  }

  return await prisma.subscription.findMany({
    where: whereClause,
    include: { plan: true },
    orderBy: { createdAt: 'desc' }
  });
}

async function cancelSubscription(id) {
  return await prisma.subscription.update({
    where: { id },
    data: { isCancelled: true, status: 'cancelled' },
  });
}

async function pauseSubscription(id, pauseFrom, pauseUntil) {
  return await prisma.subscription.update({
    where: { id },
    data: {
      pauseFrom: new Date(pauseFrom),
      pauseUntil: new Date(pauseUntil),
      status: 'paused'
    },
  });
}

async function resumeSubscription(id) {
  return await prisma.subscription.update({
    where: { id },
    data: {
      pauseFrom: null,
      pauseUntil: null,
      status: 'active'
    },
  });
}

async function deleteSubscription(id) {
  return await prisma.subscription.delete({ where: { id } });
}

module.exports = {
  createSubscription,
  updateSubscription,
  getUserSubscriptions,
  cancelSubscription,
  pauseSubscription,
  resumeSubscription,
  deleteSubscription
};
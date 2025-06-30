const prisma = require('../prisma/client');

async function checkAndMarkExpiredSubscriptions() {
  const now = new Date();

  const result = await prisma.subscription.updateMany({
    where: {
      endDate: { lt: now },
      isExpired: false,
      isCancelled: false,
    },
    data: {
      isExpired: true,
    },
  });

  console.log(`Marked ${result.count} subscriptions as expired`);
}

module.exports = checkAndMarkExpiredSubscriptions;
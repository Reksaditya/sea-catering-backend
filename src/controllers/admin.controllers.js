const {
  calculateNewSubscriptions,
  calculateMRR,
  calculateReactivations,
  calculateGrowth,
  getAllSubscription
} = require('../services/admin.services');

const getAdminMetrics = async (req, res) => {
  try {
    const { start, end } = req.query;

    const [newSubscriptions, mrr, reactivations, growth] = await Promise.all([
      calculateNewSubscriptions(start, end),
      calculateMRR(start, end),
      calculateReactivations(start, end),
      calculateGrowth(start, end),
    ]);

    res.json({ newSubscriptions, mrr, reactivations, growth });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch admin metrics' });
  }
};

const fetchAllSubcriptions = async (req, res) => {
  try {
    const subscriptions = await getAllSubscription();
    res.json(subscriptions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch subscriptions' });
  }
}

module.exports = { getAdminMetrics, fetchAllSubcriptions };
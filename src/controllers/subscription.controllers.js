const {
  createSubscription,
  updateSubscription,
  getUserSubscriptions,
  cancelSubscription,
} = require('../services/subscription.services');

async function create(req, res) {
  try {
    const subscription = await createSubscription(req.user.id, req.body);
    res.json(subscription);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create subscription' });
  }
};

async function update(req, res) {
  try {
    const subscription = await updateSubscription(req.params.id, req.body);
    res.json(subscription);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update subscription' });
  }
};

async function getAll(req, res) {
  try {
    const subscriptions = await getUserSubscriptions(req.user.id);
    res.json(subscriptions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch subscriptions' });
  }
};

async function cancel(req, res) {
  try {
    const result = await cancelSubscription(req.params.id);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to cancel subscription' });
  }
};

module.exports = {
  create,
  update,
  getAll,
  cancel,
};
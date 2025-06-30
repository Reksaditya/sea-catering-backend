const {
  createSubscription,
  updateSubscription,
  getUserSubscriptions,
  cancelSubscription,
  pauseSubscription,
  resumeSubscription,
  deleteSubscription
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
  const id = Number(req.params.id);

  try {
    const subscription = await updateSubscription(id, req.body);
    res.json(subscription);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update subscription' });
  }
};

async function getAll(req, res) {
  const { status } = req.query;

  try {
    const subscriptions = await getUserSubscriptions(req.user.id, status);
    res.json(subscriptions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch subscriptions' });
  }
};

async function cancel(req, res) {
  const id = Number(req.params.id);

  try {
    const result = await cancelSubscription(id);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to cancel subscription' });
  }
};

async function pause(req, res) {
  const { id } = req.params;
  const { pauseFrom, pauseUntil } = req.body;

  if (!pauseFrom || !pauseUntil || isNaN(Number(id))) {
    return res.status(400).json({ message: "Pause data invalid" });
  }

  if (new Date(pauseUntil) <= new Date(pauseFrom)) {
    return res.status(400).json({ message: "Pause date is not valid" });
  }

  try {
    const result = await pauseSubscription(Number(id), pauseFrom, pauseUntil);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Gagal pause subscription", error: err.message });
  }
}

async function resume(req, res) {
  const id = Number(req.params.id)
  
  try {
    const result = await resumeSubscription(id);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "failed to resume subscription", error: err.message });
  }
}

async function drop(req, res) {
  const id = Number(req.params.id)

  try {
    const result = await deleteSubscription(id);
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "failed to delete subscription", error: err.message });
  }
}

module.exports = {
  create,
  update,
  getAll,
  cancel,
  pause,
  resume,
  drop
};
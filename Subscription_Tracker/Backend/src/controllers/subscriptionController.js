const Subscription = require('../models/Subscription');
const { computeDashboardMetrics } = require('../services/costCalculator');

// @desc    Get all subscriptions with calculated flags
// @route   GET /api/subscriptions
exports.getSubscriptions = async (req, res, next) => {
  try {
    const subscriptions = await Subscription.find().sort({ nextRenewalDate: 1 });
    const { subscriptions: enriched } = computeDashboardMetrics(subscriptions);
    res.status(200).json({ success: true, count: enriched.length, data: enriched });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new subscription
// @route   POST /api/subscriptions
exports.createSubscription = async (req, res, next) => {
  try {
    const { name, cost, billingCycle, nextRenewalDate } = req.body;

    const subscription = await Subscription.create({
      name,
      cost,
      billingCycle,
      nextRenewalDate,
      status: 'ACTIVE'
    });

    res.status(201).json({ success: true, data: subscription });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle subscription status (ACTIVE <-> PAUSED)
// @route   PATCH /api/subscriptions/:id/toggle-status
exports.toggleSubscriptionStatus = async (req, res, next) => {
  try {
    const subscription = await Subscription.findById(req.params.id);

    if (!subscription) {
      return res.status(404).json({ success: false, message: 'Subscription not found' });
    }

    subscription.status = subscription.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE';
    await subscription.save();

    res.status(200).json({ success: true, data: subscription });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a subscription
// @route   DELETE /api/subscriptions/:id
exports.deleteSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findByIdAndDelete(req.params.id);

    if (!subscription) {
      return res.status(404).json({ success: false, message: 'Subscription not found' });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    next(error);
  }
};
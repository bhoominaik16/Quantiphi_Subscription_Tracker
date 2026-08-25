const Subscription = require('../models/Subscription');
const { computeDashboardMetrics } = require('../services/costCalculator');

// @desc    Get dashboard metrics (Monthly Burn Rate & Renewing Soon Alert Count)
// @route   GET /api/analytics/metrics
exports.getDashboardMetrics = async (req, res, next) => {
  try {
    const subscriptions = await Subscription.find();
    const { metrics } = computeDashboardMetrics(subscriptions);
    res.status(200).json({ success: true, data: metrics });
  } catch (error) {
    next(error);
  }
};
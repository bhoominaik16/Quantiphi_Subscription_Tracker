const { getDaysRemaining, isRenewingSoon } = require('../utils/dateUtils');

/**
 * Cost Uniformity Engine:
 * Converts YEARLY amounts to monthly equivalents.
 */
const normalizeToMonthlyCost = (cost, billingCycle) => {
  const parsedCost = Number(cost) || 0;
  if (billingCycle === 'YEARLY') {
    return parseFloat((parsedCost / 12).toFixed(2));
  }
  return parseFloat(parsedCost.toFixed(2));
};

/**
 * Aggregates burn rate and flags renewal warnings.
 */
const computeDashboardMetrics = (subscriptions) => {
  let totalMonthlyBurnRate = 0;
  let upcomingRenewalsCount = 0;

  const enrichedSubscriptions = subscriptions.map((sub) => {
    const plainSub = sub.toObject ? sub.toObject() : { ...sub };
    const normalizedMonthlyCost = normalizeToMonthlyCost(plainSub.cost, plainSub.billingCycle);
    const daysRemaining = getDaysRemaining(plainSub.nextRenewalDate);
    const renewingSoon = isRenewingSoon(plainSub.nextRenewalDate);

    // Paused subscriptions are excluded from cash-flow burn
    if (plainSub.status === 'ACTIVE') {
      totalMonthlyBurnRate += normalizedMonthlyCost;
      if (renewingSoon) {
        upcomingRenewalsCount += 1;
      }
    }

    return {
      ...plainSub,
      normalizedMonthlyCost,
      daysRemaining,
      isRenewingSoon: renewingSoon
    };
  });

  return {
    metrics: {
      totalMonthlyBurnRate: parseFloat(totalMonthlyBurnRate.toFixed(2)),
      upcomingRenewalsCount
    },
    subscriptions: enrichedSubscriptions
  };
};

module.exports = {
  normalizeToMonthlyCost,
  computeDashboardMetrics
};
/**
 * Calculates days remaining from today (at midnight UTC/local) to target date.
 */
const getDaysRemaining = (targetDate, baseDate = new Date()) => {
  const current = new Date(baseDate);
  current.setHours(0, 0, 0, 0);

  const target = new Date(targetDate);
  target.setHours(0, 0, 0, 0);

  const diffTime = target.getTime() - current.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

/**
 * Checks if renewal falls within 0 to 7 days inclusive.
 */
const isRenewingSoon = (targetDate, thresholdDays = 7) => {
  const days = getDaysRemaining(targetDate);
  return days >= 0 && days <= thresholdDays;
};

module.exports = {
  getDaysRemaining,
  isRenewingSoon
};
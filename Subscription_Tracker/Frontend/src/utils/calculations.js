export const calculateDaysRemaining = (targetDate) => {
  const current = new Date();
  current.setHours(0, 0, 0, 0);

  const target = new Date(targetDate);
  target.setHours(0, 0, 0, 0);

  const diffTime = target.getTime() - current.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const normalizeMonthlyCost = (cost, billingCycle) => {
  const numCost = Number(cost) || 0;
  return billingCycle === 'YEARLY' ? numCost / 12 : numCost;
};
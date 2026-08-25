import { useSubscriptions } from './useSubscriptions.js';

export const useDashboardMetrics = () => {
  const { metrics, loading } = useSubscriptions();
  return { ...metrics, loading };
};
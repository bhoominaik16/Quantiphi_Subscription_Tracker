import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const getSubscriptions = () => api.get('/subscriptions');
export const createSubscription = (data) => api.post('/subscriptions', data);
export const toggleSubscriptionStatus = (id) => api.patch(`/subscriptions/${id}/toggle-status`);
export const deleteSubscription = (id) => api.delete(`/subscriptions/${id}`);
export const getDashboardMetrics = () => api.get('/analytics/metrics');

export default api;
import React, { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import * as api from '../services/api';
import { normalizeMonthlyCost, calculateDaysRemaining } from '../utils/calculations';

export const SubscriptionContext = createContext();

export const SubscriptionProvider = ({ children }) => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSubscriptions = useCallback(async () => {
    try {
      setLoading(true);
      const res = await api.getSubscriptions();
      setSubscriptions(res.data.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch subscriptions');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSubscriptions();
  }, [fetchSubscriptions]);

  const addSubscription = async (formData) => {
    try {
      const res = await api.createSubscription(formData);
      await fetchSubscriptions();
      return { success: true, data: res.data.data };
    } catch (err) {
      return { 
        success: false, 
        message: err.response?.data?.message || 'Failed to add subscription' 
      };
    }
  };

  const toggleStatus = async (id) => {
    // Optimistic UI state update
    setSubscriptions((prev) =>
      prev.map((sub) =>
        sub._id === id
          ? { ...sub, status: sub.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE' }
          : sub
      )
    );

    try {
      await api.toggleSubscriptionStatus(id);
    } catch (err) {
      // Rollback on server error
      fetchSubscriptions();
    }
  };

  const removeSubscription = async (id) => {
    setSubscriptions((prev) => prev.filter((sub) => sub._id !== id));
    try {
      await api.deleteSubscription(id);
    } catch (err) {
      fetchSubscriptions();
    }
  };

  // Real-time burn rate & alert simulation
  const metrics = useMemo(() => {
    let totalMonthlyBurnRate = 0;
    let upcomingRenewalsCount = 0;

    subscriptions.forEach((sub) => {
      if (sub.status === 'ACTIVE') {
        totalMonthlyBurnRate += normalizeMonthlyCost(sub.cost, sub.billingCycle);
        const days = calculateDaysRemaining(sub.nextRenewalDate);
        if (days >= 0 && days <= 7) {
          upcomingRenewalsCount += 1;
        }
      }
    });

    return {
      totalMonthlyBurnRate: parseFloat(totalMonthlyBurnRate.toFixed(2)),
      upcomingRenewalsCount
    };
  }, [subscriptions]);

  return (
    <SubscriptionContext.Provider
      value={{
        subscriptions,
        loading,
        error,
        metrics,
        addSubscription,
        toggleStatus,
        removeSubscription,
        refresh: fetchSubscriptions
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};
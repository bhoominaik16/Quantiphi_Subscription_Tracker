import React from 'react';
import { useDashboardMetrics } from '../../hooks/useDashboardMetrics.js';
import MetricCard from './MetricCard.jsx';
import { formatCurrency } from '../../utils/formatters.js';
import { Flame, BellRing } from 'lucide-react';

export default function MetricsRow() {
  const { totalMonthlyBurnRate, upcomingRenewalsCount, loading } = useDashboardMetrics();

  return (
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <MetricCard
        title="Total Monthly Burn Rate"
        value={loading ? '...' : formatCurrency(totalMonthlyBurnRate)}
        icon={Flame}
        color="indigo"
        subtitle="Normalized active recurring cash-flow"
      />
      <MetricCard
        title="Upcoming Renewals Alert"
        value={loading ? '...' : upcomingRenewalsCount}
        icon={BellRing}
        color="amber"
        subtitle="Renewing within 7 days"
      />
    </div>
  );
}
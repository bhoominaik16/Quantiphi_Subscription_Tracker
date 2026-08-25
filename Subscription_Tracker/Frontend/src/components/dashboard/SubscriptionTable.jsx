import React from 'react';
import { useSubscriptions } from '../../hooks/useSubscriptions.js';
import SubscriptionRow from './SubscriptionRow.jsx';
import Card from '../common/CardTemp.jsx';
import { Layers } from 'lucide-react';

export default function SubscriptionTable() {
  const { subscriptions, loading, toggleStatus, removeSubscription } = useSubscriptions();

  return (
    <Card className="overflow-hidden p-0">
      <div class="p-6 border-b border-slate-800 flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
            <Layers class="w-5 h-5" />
          </div>
          <h2 class="text-lg font-bold text-white tracking-wide">Active Subscriptions</h2>
        </div>
        <span class="text-xs bg-slate-800 text-slate-400 px-3 py-1 rounded-full border border-slate-700">
          {subscriptions.length} Total
        </span>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left text-sm text-slate-400">
          <thead class="bg-slate-950/50 text-xs uppercase font-semibold text-slate-400 border-b border-slate-800">
            <tr>
              <th scope="col" class="py-3 px-6">Service</th>
              <th scope="col" class="py-3 px-6">Cost</th>
              <th scope="col" class="py-3 px-6">Next Renewal</th>
              <th scope="col" class="py-3 px-6">Status</th>
              <th scope="col" class="py-3 px-6 text-right">Simulation</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colspan="5" class="text-center py-12 text-slate-500">
                  Loading subscriptions...
                </td>
              </tr>
            ) : subscriptions.length === 0 ? (
              <tr>
                <td colspan="5" class="text-center py-12 text-slate-500">
                  No subscriptions found. Add your first service above!
                </td>
              </tr>
            ) : (
              subscriptions.map((sub) => (
                <SubscriptionRow
                  key={sub._id}
                  subscription={sub}
                  onToggle={toggleStatus}
                  onDelete={removeSubscription}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
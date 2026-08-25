import React, { useState } from 'react';
import { useSubscriptions } from '../../hooks/useSubscriptions';
import Card from '../common/CardTemp.jsx';
import { PlusCircle, DollarSign, Calendar, RefreshCw } from 'lucide-react';

export default function SubscriptionForm() {
  const { addSubscription } = useSubscriptions();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    cost: '',
    billingCycle: 'MONTHLY',
    nextRenewalDate: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim() || !formData.cost || !formData.nextRenewalDate) {
      setError('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);
    const res = await addSubscription({
      ...formData,
      cost: parseFloat(formData.cost)
    });

    if (res.success) {
      setFormData({
        name: '',
        cost: '',
        billingCycle: 'MONTHLY',
        nextRenewalDate: ''
      });
    } else {
      setError(res.message);
    }
    setIsSubmitting(false);
  };

  return (
    <Card className="h-full">
      <div class="flex items-center gap-2 mb-6">
        <div class="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
          <PlusCircle class="w-5 h-5" />
        </div>
        <h2 class="text-lg font-bold text-white tracking-wide">Add New Subscription</h2>
      </div>

      {error && (
        <div class="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} class="space-y-4">
        <div>
          <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
            Service Name
          </label>
          <input
            type="text"
            placeholder="e.g. Netflix, AWS, GitHub"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            class="w-full bg-slate-950/60 border border-slate-800 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm"
          />
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              Cost
            </label>
            <div class="relative">
              <DollarSign class="absolute left-3.5 top-2.5 h-4 w-4 text-slate-500" />
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={formData.cost}
                onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                class="w-full bg-slate-950/60 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-slate-500 focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm"
              />
            </div>
          </div>

          <div>
            <label class="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
              Billing Cycle
            </label>
            <div class="relative">
              <RefreshCw class="absolute left-3.5 top-2.5 h-4 w-4 text-slate-500" />
              <select
                value={formData.billingCycle}
                onChange={(e) => setFormData({ ...formData, billingCycle: e.target.value })}
                class="w-full bg-slate-950/60 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-white focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm appearance-none cursor-pointer"
              >
                <option value="MONTHLY">Monthly</option>
                <option value="YEARLY">Yearly</option>
              </select>
            </div>
          </div>
        </div>

        <div>
  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
    Next Renewal Date
  </label>

  <div className="relative">
    <Calendar
      className="absolute left-3.5 top-2.5 h-4 w-4 text-slate-500 pointer-events-none"
      color="#64748B"
    />

    <input
      type="date"
      value={formData.nextRenewalDate}
      onChange={(e) =>
        setFormData({
          ...formData,
          nextRenewalDate: e.target.value,
        })
      }
      className="w-full bg-slate-950/60 border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-white focus:outline-hidden focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm cursor-pointer
      [&::-webkit-calendar-picker-indicator]:invert
      [&::-webkit-calendar-picker-indicator]:opacity-80"
    />
  </div>
</div>

        <button
          type="submit"
          disabled={isSubmitting}
          class="w-full mt-2 bg-indigo-600 hover:bg-indigo-500 text-white font-medium py-2.5 px-4 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-600/20 active:scale-[0.99] disabled:opacity-50 text-sm cursor-pointer"
        >
          {isSubmitting ? 'Adding...' : 'Add Subscription'}
        </button>
      </form>
    </Card>
  );
}
import React from 'react';
import { formatCurrency, formatDate } from '../../utils/formatters.js';
import { calculateDaysRemaining } from '../../utils/calculations.js';
import ToggleSwitch from '../common/ToggleSwitch.jsx';
import Badge from '../common/Badge.jsx';
import { Trash2 } from 'lucide-react';

export default function SubscriptionRow({ subscription, onToggle, onDelete }) {
  const isPaused = subscription.status === 'PAUSED';
  const daysRemaining = calculateDaysRemaining(subscription.nextRenewalDate);
  const isRenewingSoon = daysRemaining >= 0 && daysRemaining <= 7 && !isPaused;

  return (
    <tr
      class={`border-b border-slate-800/60 transition-colors duration-200 ${
        isRenewingSoon ? 'bg-amber-500/5' : 'hover:bg-slate-900/40'
      }`}
    >
      {/* Service Name */}
      <td class="py-4 px-6">
        <div class={`flex items-center gap-3 transition-opacity duration-200 ${isPaused ? 'opacity-40 grayscale' : ''}`}>
          <div class="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-indigo-400 text-sm">
            {subscription.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <div class="font-semibold text-slate-100">{subscription.name}</div>
            <div class="text-xs text-slate-400">{subscription.billingCycle.toLowerCase()}</div>
          </div>
        </div>
      </td>

      {/* Cost & Normalized Burn */}
      <td class="py-4 px-6">
        <div class={`transition-opacity duration-200 ${isPaused ? 'opacity-40 grayscale' : ''}`}>
          <span class="font-medium text-slate-200">{formatCurrency(subscription.cost)}</span>
          {subscription.billingCycle === 'YEARLY' && (
            <span class="text-xs text-slate-400 block">
              ~{formatCurrency(subscription.cost / 12)}/mo
            </span>
          )}
        </div>
      </td>

      {/* Next Renewal Date */}
      <td class="py-4 px-6">
        <div class={`transition-opacity duration-200 ${isPaused ? 'opacity-40 grayscale' : ''}`}>
          <div class="text-sm text-slate-300">{formatDate(subscription.nextRenewalDate)}</div>
          <div class="text-xs text-slate-400">
            {daysRemaining < 0
              ? 'Expired'
              : daysRemaining === 0
              ? 'Today'
              : `in ${daysRemaining} day${daysRemaining > 1 ? 's' : ''}`}
          </div>
        </div>
      </td>

      {/* Status Warning Badge */}
      <td class="py-4 px-6">
        <div class={`transition-opacity duration-200 ${isPaused ? 'opacity-40' : ''}`}>
          {isRenewingSoon ? (
            <Badge label="Renewing Soon" />
          ) : isPaused ? (
            <span class="text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
              Paused
            </span>
          ) : (
            <span class="text-xs text-emerald-400 font-medium">Healthy</span>
          )}
        </div>
      </td>

      {/* Active / Paused Toggle & Delete Actions */}
      <td class="py-4 px-6 text-right">
        <div class="flex items-center justify-end gap-4">
          <div class="flex items-center gap-2">
            <span class="text-xs text-slate-400">{isPaused ? 'Paused' : 'Active'}</span>
            <ToggleSwitch
              isActive={!isPaused}
              onToggle={() => onToggle(subscription._id)}
            />
          </div>
          <button
            onClick={() => onDelete(subscription._id)}
            title="Delete subscription"
            class="text-slate-500 hover:text-red-400 transition-colors p-1 rounded-lg hover:bg-slate-800"
          >
            <Trash2 class="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}
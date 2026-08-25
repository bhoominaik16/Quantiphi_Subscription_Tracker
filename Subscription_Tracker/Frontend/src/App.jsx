import React from 'react';
import { SubscriptionProvider } from './context/SubscriptionContext.jsx';
import MetricsRow from './components/dashboard/MetricsRow.jsx';
import SubscriptionTable from './components/dashboard/SubscriptionTable.jsx';
import SubscriptionForm from './components/forms/SubscriptionForm.jsx';
import { CreditCard } from 'lucide-react';

export default function App() {
  return (
    <SubscriptionProvider>
      <div class="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between">
        {/* Navigation Bar */}
        <header class="border-b border-slate-800/80 bg-slate-950/60 backdrop-blur-md sticky top-0 z-50">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="p-2 bg-indigo-600 rounded-xl text-white shadow-lg shadow-indigo-600/30">
                <CreditCard class="w-5 h-5" />
              </div>
              <span class="text-lg font-extrabold text-white tracking-tight">
                SubTracker <span class="text-indigo-400">Dash</span>
              </span>
            </div>
            <span class="text-xs font-medium px-3 py-1 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-full">
              Real-time Simulation
            </span>
          </div>
        </header>

        {/* Main Dashboard Layout */}
        <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
          {/* Top Metrics Row */}
          <MetricsRow />

          {/* Form & Table Grid */}
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div class="lg:col-span-1">
              <SubscriptionForm />
            </div>
            <div class="lg:col-span-2">
              <SubscriptionTable />
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer class="border-t border-slate-800/60 py-6 text-center text-xs text-slate-500">
          Personal Finance & SaaS Cash-Flow Burn Simulator
        </footer>
      </div>
    </SubscriptionProvider>
  );
}
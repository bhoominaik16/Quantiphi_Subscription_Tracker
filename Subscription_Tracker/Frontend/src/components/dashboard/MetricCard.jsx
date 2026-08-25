import React from 'react';
import Card from '../common/CardTemp.jsx';

export default function MetricCard({ title, value, icon: Icon, color = 'indigo', subtitle }) {
  const colorMap = {
    indigo: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    amber: 'bg-amber-500/10 text-amber-400 border-amber-500/20'
  };

  return (
    <Card highlight={color === 'indigo'}>
      <div class="flex items-center justify-between">
        <div>
          <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">{title}</p>
          <h3 class="text-3xl font-extrabold text-white mt-1 tracking-tight">{value}</h3>
          {subtitle && <p class="text-xs text-slate-400 mt-1">{subtitle}</p>}
        </div>
        <div class={`p-3 rounded-xl border ${colorMap[color] || colorMap.indigo}`}>
          <Icon class="w-6 h-6" />
        </div>
      </div>
    </Card>
  );
}
import React from 'react';
import { AlertTriangle } from 'lucide-react';

export default function Badge({ label = 'Renewing Soon' }) {
  return (
    <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/30 animate-pulse">
      <AlertTriangle class="w-3.5 h-3.5" />
      {label}
    </span>
  );
}
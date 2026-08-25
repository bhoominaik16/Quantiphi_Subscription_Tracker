import React from 'react';

export default function Card({ children, className = '', highlight = false }) {
  return (
    <div
      class={`bg-slate-900/80 backdrop-blur-md border rounded-2xl p-6 transition-all duration-300 ${
        highlight
          ? 'border-indigo-500/30 shadow-[0_0_25px_rgba(99,102,241,0.1)]'
          : 'border-slate-800 shadow-xl'
      } ${className}`}
    >
      {children}
    </div>
  );
}
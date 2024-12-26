import React from 'react';
import { BarChart2 } from 'lucide-react';

interface ChartHeaderProps {
  title: string;
  subtitle: string;
}

export function ChartHeader({ title, subtitle }: ChartHeaderProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="text-sm text-gray-400">{subtitle}</p>
      </div>
      <BarChart2 className="w-5 h-5 text-emerald-400" />
    </div>
  );
}
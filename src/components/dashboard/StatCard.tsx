import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  isPositive?: boolean;
}

export function StatCard({ title, value, change, isPositive = true }: StatCardProps) {
  return (
    <div>
      <h3 className="text-sm font-medium text-gray-400">{title}</h3>
      <div className="mt-2 flex items-baseline">
        <p className="text-2xl font-semibold text-white">{value}</p>
        <div className={`ml-2 flex items-center text-sm ${isPositive ? 'text-emerald-400' : 'text-red-400'}`}>
          {isPositive ? (
            <ArrowUp className="w-4 h-4 mr-1" />
          ) : (
            <ArrowDown className="w-4 h-4 mr-1" />
          )}
          {change}
        </div>
      </div>
    </div>
  );
}
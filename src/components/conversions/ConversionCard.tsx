import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '../../utils/cn';

interface ConversionCardProps {
  title: string;
  value: number;
  change: number;
  timeframe: string;
  format?: 'number' | 'percentage' | 'currency';
}

export function ConversionCard({ title, value, change, timeframe, format = 'number' }: ConversionCardProps) {
  const formatValue = (val: number) => {
    switch (format) {
      case 'percentage':
        return `${val.toFixed(1)}%`;
      case 'currency':
        return `$${val.toLocaleString()}`;
      default:
        return val.toLocaleString();
    }
  };

  const isPositive = change >= 0;

  return (
    <div className="bg-[#1A2737] rounded-lg border border-gray-800 p-6">
      <h3 className="text-sm font-medium text-gray-400 mb-2">{title}</h3>
      <div className="flex items-baseline space-x-2">
        <p className="text-2xl font-semibold text-white">{formatValue(value)}</p>
        <div className={cn(
          'flex items-center text-sm font-medium',
          isPositive ? 'text-emerald-400' : 'text-red-400'
        )}>
          {isPositive ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
          {Math.abs(change)}%
        </div>
      </div>
      <p className="text-sm text-gray-400 mt-1">vs. {timeframe}</p>
    </div>
  );
}
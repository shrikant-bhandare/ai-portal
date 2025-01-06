import React from 'react';
import { DollarSign, MousePointer, Target, Users } from 'lucide-react';

const metrics = [
  {
    title: 'Total Ad Spend',
    value: '$12,450',
    change: '+8.2%',
    icon: DollarSign,
    trend: 'up'
  },
  {
    title: 'Click-through Rate',
    value: '3.8%',
    change: '+1.2%',
    icon: MousePointer,
    trend: 'up'
  },
  {
    title: 'Conversions',
    value: '842',
    change: '+15.4%',
    icon: Target,
    trend: 'up'
  },
  {
    title: 'Reach',
    value: '125K',
    change: '-2.3%',
    icon: Users,
    trend: 'down'
  }
];

export function AdMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {metrics.map((metric) => {
        const Icon = metric.icon;
        return (
          <div key={metric.title} className="bg-[#1A2737] rounded-lg border border-gray-800 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-emerald-500/10 rounded-lg">
                <Icon className="w-5 h-5 text-emerald-400" />
              </div>
              <span className={`text-sm font-medium ${
                metric.trend === 'up' ? 'text-emerald-400' : 'text-red-400'
              }`}>
                {metric.change}
              </span>
            </div>
            <h3 className="text-2xl font-semibold text-white mb-1">{metric.value}</h3>
            <p className="text-sm text-gray-400">{metric.title}</p>
          </div>
        );
      })}
    </div>
  );
}
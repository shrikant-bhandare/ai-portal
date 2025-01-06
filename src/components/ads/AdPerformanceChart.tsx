import React from 'react';
import { Line } from 'react-chartjs-2';
import { BarChart2 } from 'lucide-react';
import { useAdPerformance } from '../../hooks/useAdPerformance';

interface AdPerformanceChartProps {
  title: string;
  subtitle: string;
  type: 'ctr' | 'spend';
}

export function AdPerformanceChart({ title, subtitle, type }: AdPerformanceChartProps) {
  const { data, options } = useAdPerformance(type);

  return (
    <div className="bg-[#1A2737] rounded-lg border border-gray-800 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <p className="text-sm text-gray-400">{subtitle}</p>
        </div>
        <BarChart2 className="w-5 h-5 text-emerald-400" />
      </div>
      <div className="h-64">
        <Line data={data} options={options} />
      </div>
    </div>
  );
}
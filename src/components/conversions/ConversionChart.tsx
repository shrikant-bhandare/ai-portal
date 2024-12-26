import React, { useRef, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { ChartHeader } from './chart/ChartHeader';
import { chartOptions, defaultGradient } from './chart/ChartConfig';
import { createChartData } from './chart/createChartData';
import type { ConversionChartProps } from './chart/types';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export function ConversionChart({ 
  title, 
  subtitle, 
  data,
  gradient = defaultGradient 
}: ConversionChartProps) {
  const chartRef = useRef<ChartJS | null>(null);

  useEffect(() => {
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  const chartData = createChartData(data, title, gradient);

  return (
    <div className="bg-[#1A2737] rounded-lg border border-gray-800 p-6">
      <ChartHeader title={title} subtitle={subtitle} />
      <div className="h-64">
        <Line 
          ref={chartRef}
          data={chartData} 
          options={chartOptions}
          key={`${title}-${data.length}`}
        />
      </div>
    </div>
  );
}
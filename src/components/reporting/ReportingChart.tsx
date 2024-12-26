import React from 'react';
import { Line } from 'react-chartjs-2';
import { BarChart2 } from 'lucide-react';

interface ReportingChartProps {
  title: string;
  subtitle: string;
  type: 'revenue' | 'customers';
}

export function ReportingChart({ title, subtitle, type }: ReportingChartProps) {
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const data = {
    labels,
    datasets: [
      {
        label: type === 'revenue' ? 'Revenue' : 'Customers',
        data: type === 'revenue'
          ? [30000, 35000, 32000, 38000, 42000, 48000]
          : [180, 195, 210, 225, 235, 245],
        borderColor: '#10B981',
        backgroundColor: (context: any) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 300);
          gradient.addColorStop(0, 'rgba(16, 185, 129, 0.2)');
          gradient.addColorStop(1, 'rgba(16, 185, 129, 0)');
          return gradient;
        },
        tension: 0.4,
        fill: true,
        pointRadius: 0,
        borderWidth: 2
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: '#1A2737',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: '#2D3748',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        displayColors: false
      }
    },
    scales: {
      x: {
        grid: {
          color: '#2D3748',
          drawBorder: false
        },
        ticks: {
          color: '#718096'
        }
      },
      y: {
        grid: {
          color: '#2D3748',
          drawBorder: false
        },
        ticks: {
          color: '#718096',
          callback: (value: any) => type === 'revenue' ? `$${value}` : value
        }
      }
    }
  };

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
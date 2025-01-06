import { useMemo } from 'react';

export function useAdPerformance(type: 'ctr' | 'spend') {
  const data = useMemo(() => ({
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: type === 'ctr' ? 'Click-through Rate' : 'Daily Spend',
        data: type === 'ctr' 
          ? [3.2, 3.5, 3.8, 3.6, 4.1, 3.9, 4.2]
          : [1200, 1450, 1350, 1650, 1850, 1750, 2000],
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
  }), [type]);

  const options = useMemo(() => ({
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
          callback: (value: any) => type === 'ctr' ? `${value}%` : `$${value}`
        }
      }
    }
  }), [type]);

  return { data, options };
}
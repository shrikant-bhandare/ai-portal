import { ChartOptions } from 'chart.js';

export const defaultGradient = {
  from: '#10B981',
  to: '#3B82F6'
};

export const chartOptions: ChartOptions<'line'> = {
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
        color: '#718096'
      }
    }
  }
};
import { ChartDataPoint, GradientConfig } from './types';

export function createChartData(
  data: ChartDataPoint[],
  title: string,
  gradient: GradientConfig
) {
  return {
    labels: data.map(item => item.date),
    datasets: [
      {
        fill: true,
        label: title,
        data: data.map(item => item.value),
        borderColor: gradient.from,
        backgroundColor: (context: any) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return null;

          const gradientFill = ctx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom
          );
          gradientFill.addColorStop(0, `${gradient.from}33`);
          gradientFill.addColorStop(1, `${gradient.to}00`);
          return gradientFill;
        },
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2
      }
    ]
  };
}
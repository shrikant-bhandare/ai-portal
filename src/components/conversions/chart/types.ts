export interface ChartDataPoint {
  date: string;
  value: number;
}

export interface GradientConfig {
  from: string;
  to: string;
}

export interface ConversionChartProps {
  title: string;
  subtitle: string;
  data: ChartDataPoint[];
  gradient?: GradientConfig;
}
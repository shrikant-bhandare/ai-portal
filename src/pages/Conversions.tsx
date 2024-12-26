import React from 'react';
import { GradientText } from '../components/ui/GradientText';
import { ConversionCard } from '../components/conversions/ConversionCard';
import { ConversionChart } from '../components/conversions/ConversionChart';
import { ConversionTable } from '../components/conversions/ConversionTable';

const conversionData = [
  { source: 'Organic Search', visitors: 15000, conversions: 450, rate: 3.0, change: 12.5 },
  { source: 'Direct Traffic', visitors: 8500, conversions: 340, rate: 4.0, change: -2.3 },
  { source: 'Social Media', visitors: 12000, conversions: 600, rate: 5.0, change: 8.7 },
  { source: 'Email Marketing', visitors: 5000, conversions: 250, rate: 5.0, change: 15.2 },
  { source: 'Paid Search', visitors: 9500, conversions: 475, rate: 5.0, change: 6.8 }
];

// Generate sample data for the charts
const generateChartData = (days: number, baseValue: number, volatility: number) => {
  return Array.from({ length: days }).map((_, index) => {
    const date = new Date();
    date.setDate(date.getDate() - (days - index - 1));
    const randomFactor = 1 + (Math.random() * 2 - 1) * volatility;
    return {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      value: Math.round(baseValue * randomFactor)
    };
  });
};

const conversionTrendData = generateChartData(30, 4.2, 0.3); // 30 days of conversion rate data
const revenueData = generateChartData(30, 1750, 0.4); // 30 days of revenue data

export function Conversions() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">
          <GradientText>Conversions</GradientText>
        </h1>
        <p className="text-gray-400">Track and analyze your conversion metrics across all channels</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <ConversionCard
          title="Total Conversions"
          value={2115}
          change={8.2}
          timeframe="last month"
        />
        <ConversionCard
          title="Conversion Rate"
          value={4.2}
          change={1.1}
          timeframe="last month"
          format="percentage"
        />
        <ConversionCard
          title="Revenue"
          value={52640}
          change={12.5}
          timeframe="last month"
          format="currency"
        />
        <ConversionCard
          title="Avg. Order Value"
          value={86}
          change={-2.3}
          timeframe="last month"
          format="currency"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ConversionChart
          title="Conversion Trends"
          subtitle="Daily conversion rate over time"
          data={conversionTrendData}
          gradient={{ from: '#10B981', to: '#3B82F6' }}
        />
        <ConversionChart
          title="Revenue Analysis"
          subtitle="Daily revenue from conversions"
          data={revenueData}
          gradient={{ from: '#8B5CF6', to: '#EC4899' }}
        />
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold text-white mb-4">Conversion Sources</h2>
        <ConversionTable data={conversionData} />
      </div>
    </div>
  );
}
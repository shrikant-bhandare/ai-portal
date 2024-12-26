import React from 'react';
import { GradientText } from '../components/ui/GradientText';
import { ReportingMetrics } from '../components/reporting/ReportingMetrics';
import { ReportingChart } from '../components/reporting/ReportingChart';
import { ReportingTable } from '../components/reporting/ReportingTable';
import { Button } from '../components/ui/Button';
import { Download } from 'lucide-react';

export function Reporting() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">
            <GradientText>Analytics & Reporting</GradientText>
          </h1>
          <p className="text-gray-400">
            Track your business performance and growth metrics
          </p>
        </div>
        <Button>
          <Download className="w-4 h-4 mr-2" />
          Export Report
        </Button>
      </div>

      <ReportingMetrics />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ReportingChart
          title="Revenue Growth"
          subtitle="Monthly revenue trends"
          type="revenue"
        />
        <ReportingChart
          title="Customer Growth"
          subtitle="Monthly customer acquisition"
          type="customers"
        />
      </div>

      <ReportingTable />
    </div>
  );
}
import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

const reportData = [
  {
    channel: 'Direct Traffic',
    visitors: 12500,
    revenue: 28400,
    conversion: 4.2,
    growth: 12.5
  },
  {
    channel: 'Social Media',
    visitors: 8200,
    revenue: 18900,
    conversion: 3.8,
    growth: 15.2
  },
  {
    channel: 'Email Marketing',
    visitors: 6300,
    revenue: 15200,
    conversion: 4.5,
    growth: -2.3
  },
  {
    channel: 'Paid Search',
    visitors: 4800,
    revenue: 12100,
    conversion: 4.1,
    growth: 8.7
  }
];

export function ReportingTable() {
  return (
    <div className="bg-[#1A2737] rounded-lg border border-gray-800">
      <div className="p-6 border-b border-gray-800">
        <h3 className="text-lg font-semibold text-white">Channel Performance</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Channel</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Visitors</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Revenue</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Conversion</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Growth</th>
            </tr>
          </thead>
          <tbody>
            {reportData.map((row) => (
              <tr key={row.channel} className="border-b border-gray-800 last:border-0 hover:bg-[#1E2E42]">
                <td className="px-6 py-4 text-white">{row.channel}</td>
                <td className="px-6 py-4 text-gray-400">{row.visitors.toLocaleString()}</td>
                <td className="px-6 py-4 text-white">${row.revenue.toLocaleString()}</td>
                <td className="px-6 py-4 text-gray-400">{row.conversion}%</td>
                <td className="px-6 py-4">
                  <div className={`flex items-center ${row.growth >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {row.growth >= 0 ? (
                      <ArrowUp className="w-4 h-4 mr-1" />
                    ) : (
                      <ArrowDown className="w-4 h-4 mr-1" />
                    )}
                    {Math.abs(row.growth)}%
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
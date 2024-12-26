import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface ConversionData {
  source: string;
  visitors: number;
  conversions: number;
  rate: number;
  change: number;
}

interface ConversionTableProps {
  data: ConversionData[];
}

export function ConversionTable({ data }: ConversionTableProps) {
  return (
    <div className="bg-[#1A2737] rounded-lg border border-gray-800">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Source</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Visitors</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Conversions</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Rate</th>
              <th className="px-6 py-4 text-left text-sm font-medium text-gray-400">Change</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className="border-b border-gray-800 last:border-0 hover:bg-[#1E2E42]">
                <td className="px-6 py-4 text-white">{row.source}</td>
                <td className="px-6 py-4 text-gray-400">{row.visitors.toLocaleString()}</td>
                <td className="px-6 py-4 text-gray-400">{row.conversions.toLocaleString()}</td>
                <td className="px-6 py-4 text-white">{row.rate.toFixed(1)}%</td>
                <td className="px-6 py-4">
                  <div className={`flex items-center ${row.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    {row.change >= 0 ? <ArrowUp className="w-4 h-4 mr-1" /> : <ArrowDown className="w-4 h-4 mr-1" />}
                    {Math.abs(row.change)}%
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
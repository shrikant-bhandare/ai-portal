import React from 'react';
import { CreditCard, Download } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { GradientText } from '../components/ui/GradientText';

const invoices = [
  {
    id: 'INV-001',
    date: '2024-02-20',
    amount: 299.00,
    status: 'Paid',
    description: 'Professional Plan - Monthly'
  },
  {
    id: 'INV-002',
    date: '2024-01-20',
    amount: 299.00,
    status: 'Paid',
    description: 'Professional Plan - Monthly'
  }
];

export function Billing() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          <GradientText>Billing</GradientText>
        </h1>
        <Button>Update Payment Method</Button>
      </div>

      <div className="grid gap-6">
        {/* Current Plan */}
        <div className="bg-[#1A2737] rounded-lg border border-gray-800 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Current Plan</h2>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-2xl font-bold text-white">Professional Plan</p>
              <p className="text-gray-400">$299/month</p>
            </div>
            <Button variant="secondary">Change Plan</Button>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-[#1A2737] rounded-lg border border-gray-800 p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Payment Method</h2>
          <div className="flex items-center">
            <CreditCard className="w-6 h-6 text-gray-400 mr-3" />
            <div>
              <p className="text-white">•••• •••• •••• 4242</p>
              <p className="text-sm text-gray-400">Expires 12/24</p>
            </div>
          </div>
        </div>

        {/* Billing History */}
        <div className="bg-[#1A2737] rounded-lg border border-gray-800">
          <h2 className="text-lg font-semibold text-white p-6 border-b border-gray-800">
            Billing History
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-gray-800">
                  <th className="px-6 py-4 text-sm font-medium text-gray-400">Invoice</th>
                  <th className="px-6 py-4 text-sm font-medium text-gray-400">Date</th>
                  <th className="px-6 py-4 text-sm font-medium text-gray-400">Amount</th>
                  <th className="px-6 py-4 text-sm font-medium text-gray-400">Status</th>
                  <th className="px-6 py-4 text-sm font-medium text-gray-400">Download</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="border-b border-gray-800 last:border-0 hover:bg-[#1E2E42]">
                    <td className="px-6 py-4 text-white">{invoice.id}</td>
                    <td className="px-6 py-4 text-gray-400">{invoice.date}</td>
                    <td className="px-6 py-4 text-white">${invoice.amount.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400">
                        {invoice.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-gray-400 hover:text-white">
                        <Download className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { StatCard } from '../components/dashboard/StatCard';
import { RevenueChart } from '../components/dashboard/RevenueChart';
import { RecentActivity } from '../components/dashboard/RecentActivity';
import { ServiceHighlights } from '../components/dashboard/ServiceHighlights';
import { GradientText } from '../components/ui/GradientText';

export function Dashboard() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">
          <GradientText>Dashboard</GradientText>
        </h1>
        <p className="text-gray-400">
          Track and analyze your business performance
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-[#1A2737] rounded-lg border border-gray-800 p-6">
          <StatCard
            title="Total Revenue"
            value="$15,500"
            change="+12%"
            isPositive={true}
          />
        </div>
        <div className="bg-[#1A2737] rounded-lg border border-gray-800 p-6">
          <StatCard
            title="Active Customers"
            value="245"
            change="+18%"
            isPositive={true}
          />
        </div>
        <div className="bg-[#1A2737] rounded-lg border border-gray-800 p-6">
          <StatCard
            title="New Customers"
            value="35"
            change="+5%"
            isPositive={true}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-[#1A2737] rounded-lg border border-gray-800 p-6">
          <RevenueChart />
        </div>
        <div className="bg-[#1A2737] rounded-lg border border-gray-800 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
          <RecentActivity />
        </div>
      </div>

      <div className="bg-[#1A2737] rounded-lg border border-gray-800 p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Service Highlights</h3>
        <ServiceHighlights />
      </div>
    </div>
  );
}
import React from 'react';
import { GradientText } from '../components/ui/GradientText';
import { AdMetrics } from '../components/ads/AdMetrics';
import { AdCampaigns } from '../components/ads/AdCampaigns';
import { AdPerformanceChart } from '../components/ads/AdPerformanceChart';
import { Button } from '../components/ui/Button';
import { Plus } from 'lucide-react';

export function Ads() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">
            <GradientText>Ad Campaigns</GradientText>
          </h1>
          <p className="text-gray-400">
            Manage and optimize your advertising campaigns
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Create Campaign
        </Button>
      </div>

      <AdMetrics />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <AdPerformanceChart
          title="Campaign Performance"
          subtitle="Click-through rate and conversions"
          type="ctr"
        />
        <AdPerformanceChart
          title="Ad Spend"
          subtitle="Daily advertising spend"
          type="spend"
        />
      </div>

      <AdCampaigns />
    </div>
  );
}
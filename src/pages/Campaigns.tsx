import React from 'react';
import { Button } from '../components/ui/Button';
import { GradientText } from '../components/ui/GradientText';
import { CampaignCard } from '../components/campaigns/CampaignCard';

const campaigns = [
  {
    id: '1',
    title: 'Summer Collection Launch',
    platform: 'instagram',
    status: 'active',
    startDate: '2024-02-15',
    endDate: '2024-03-15',
    engagement: {
      reach: 25000,
      interactions: 1200,
      conversions: 150
    }
  },
  {
    id: '2',
    title: 'Brand Awareness Campaign',
    platform: 'facebook',
    status: 'scheduled',
    startDate: '2024-03-01',
    endDate: '2024-03-31',
    engagement: {
      reach: 50000,
      interactions: 3000,
      conversions: 300
    }
  },
  {
    id: '3',
    title: 'Professional Network Growth',
    platform: 'linkedin',
    status: 'active',
    startDate: '2024-02-01',
    endDate: '2024-02-28',
    engagement: {
      reach: 15000,
      interactions: 800,
      conversions: 90
    }
  },
  {
    id: '4',
    title: 'Product Launch Tweets',
    platform: 'twitter',
    status: 'completed',
    startDate: '2024-01-15',
    endDate: '2024-02-15',
    engagement: {
      reach: 35000,
      interactions: 2200,
      conversions: 180
    }
  }
] as const;

export function Campaigns() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">
            <GradientText>Social Media Campaigns</GradientText>
          </h1>
          <p className="text-gray-400">Track and manage your social media campaigns across all platforms</p>
        </div>
        <Button>Create Campaign</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {campaigns.map((campaign) => (
          <CampaignCard key={campaign.id} campaign={campaign} />
        ))}
      </div>
    </div>
  );
}
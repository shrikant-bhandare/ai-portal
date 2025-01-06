import React from 'react';
import { AdCampaignCard } from './AdCampaignCard';
import { useAdCampaigns } from '../../hooks/useAdCampaigns';

export function AdCampaigns() {
  const { campaigns } = useAdCampaigns();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {campaigns.map((campaign) => (
        <AdCampaignCard key={campaign.id} campaign={campaign} />
      ))}
    </div>
  );
}
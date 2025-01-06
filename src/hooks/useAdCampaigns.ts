import { useState, useEffect } from 'react';
import type { AdCampaign } from '../types/ads';

export function useAdCampaigns() {
  const [campaigns] = useState<AdCampaign[]>([
    {
      id: '1',
      name: 'Summer Collection Promotion',
      platform: 'Facebook',
      status: 'active',
      spend: 2450,
      clicks: 12500,
      ctr: 3.8
    },
    {
      id: '2',
      name: 'Brand Awareness Campaign',
      platform: 'Instagram',
      status: 'active',
      spend: 1850,
      clicks: 8900,
      ctr: 4.2
    },
    {
      id: '3',
      name: 'Product Launch',
      platform: 'Google Ads',
      status: 'paused',
      spend: 3200,
      clicks: 15600,
      ctr: 3.5
    },
    {
      id: '4',
      name: 'Retargeting Campaign',
      platform: 'LinkedIn',
      status: 'active',
      spend: 1200,
      clicks: 4800,
      ctr: 2.8
    }
  ]);

  return { campaigns };
}
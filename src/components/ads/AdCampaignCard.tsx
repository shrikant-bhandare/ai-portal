import React from 'react';
import { BarChart2, ExternalLink } from 'lucide-react';
import { Button } from '../ui/Button';
import type { AdCampaign } from '../../types/ads';

interface AdCampaignCardProps {
  campaign: AdCampaign;
}

export function AdCampaignCard({ campaign }: AdCampaignCardProps) {
  return (
    <div className="bg-[#1A2737] rounded-lg border border-gray-800 p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">{campaign.name}</h3>
          <div className="flex items-center space-x-3">
            <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
              campaign.status === 'active' ? 'bg-emerald-500/10 text-emerald-400' : 
              campaign.status === 'paused' ? 'bg-amber-500/10 text-amber-400' : 
              'bg-gray-500/10 text-gray-400'
            }`}>
              {campaign.status}
            </span>
            <span className="text-gray-400">•</span>
            <span className="text-gray-400">{campaign.platform}</span>
          </div>
        </div>
        <Button variant="secondary" size="small">
          <ExternalLink className="w-4 h-4 mr-2" />
          View Details
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <BarChart2 className="w-5 h-5 text-emerald-400" />
          </div>
          <p className="text-2xl font-semibold text-white">${campaign.spend}</p>
          <p className="text-sm text-gray-400">Spend</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <BarChart2 className="w-5 h-5 text-emerald-400" />
          </div>
          <p className="text-2xl font-semibold text-white">{campaign.clicks}</p>
          <p className="text-sm text-gray-400">Clicks</p>
        </div>
        <div className="text-center bg-emerald-400/5 rounded-lg p-3">
          <div className="flex items-center justify-center mb-2">
            <BarChart2 className="w-5 h-5 text-emerald-400" />
          </div>
          <p className="text-2xl font-semibold text-emerald-400">{campaign.ctr}%</p>
          <p className="text-sm text-emerald-400/80">CTR</p>
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { BarChart2, Users, MessageCircle, ArrowUpRight } from 'lucide-react';
import { Button } from '../ui/Button';

interface CampaignCardProps {
  campaign: {
    id: string;
    title: string;
    platform: 'facebook' | 'twitter' | 'instagram' | 'linkedin';
    status: 'active' | 'scheduled' | 'completed';
    startDate: string;
    endDate: string;
    engagement: {
      reach: number;
      interactions: number;
      conversions: number;
    };
  };
}

export function CampaignCard({ campaign }: CampaignCardProps) {
  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'facebook': return 'text-blue-400 bg-blue-400/10';
      case 'twitter': return 'text-sky-400 bg-sky-400/10';
      case 'instagram': return 'text-pink-400 bg-pink-400/10';
      case 'linkedin': return 'text-blue-500 bg-blue-500/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-emerald-400 bg-emerald-400/10';
      case 'scheduled': return 'text-amber-400 bg-amber-400/10';
      case 'completed': return 'text-gray-400 bg-gray-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  return (
    <div className="bg-[#1A2737] rounded-lg border border-gray-800 p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">{campaign.title}</h3>
          <div className="flex items-center space-x-3">
            <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getPlatformColor(campaign.platform)}`}>
              {campaign.platform}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(campaign.status)}`}>
              {campaign.status}
            </span>
          </div>
        </div>
        <Button variant="secondary">
          View Details
          <ArrowUpRight className="w-4 h-4 ml-2" />
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <Users className="w-5 h-5 text-emerald-400" />
          </div>
          <p className="text-2xl font-semibold text-white">{campaign.engagement.reach.toLocaleString()}</p>
          <p className="text-sm text-gray-400">Reach</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center mb-2">
            <MessageCircle className="w-5 h-5 text-emerald-400" />
          </div>
          <p className="text-2xl font-semibold text-white">{campaign.engagement.interactions.toLocaleString()}</p>
          <p className="text-sm text-gray-400">Interactions</p>
        </div>
        <div className="text-center bg-emerald-400/5 rounded-lg p-3">
          <div className="flex items-center justify-center mb-2">
            <BarChart2 className="w-5 h-5 text-emerald-400" />
          </div>
          <p className="text-2xl font-semibold text-emerald-400">{campaign.engagement.conversions.toLocaleString()}</p>
          <p className="text-sm text-emerald-400/80">Conversions</p>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-gray-800">
        <div className="flex justify-between text-sm text-gray-400">
          <span>Start: {new Date(campaign.startDate).toLocaleDateString()}</span>
          <span>End: {new Date(campaign.endDate).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}
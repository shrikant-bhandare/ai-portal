export interface AdCampaign {
  id: string;
  name: string;
  platform: string;
  status: 'active' | 'paused' | 'completed';
  spend: number;
  clicks: number;
  ctr: number;
}
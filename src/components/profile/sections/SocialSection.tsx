import React from 'react';
import { Share2 } from 'lucide-react';
import { FormInput } from '../../ui/FormInput';
import type { UserProfile } from '../../../hooks/useProfile';

interface SocialSectionProps {
  profile: UserProfile;
}

export function SocialSection({ profile }: SocialSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 text-white">
        <Share2 className="h-5 w-5 text-purple-400" />
        <h3 className="text-lg font-semibold">Social Profiles</h3>
      </div>
      <div className="grid gap-4 pt-2">
        <FormInput
          name="facebook"
          label="Facebook Profile"
          type="url"
          defaultValue={profile.social?.facebook}
          placeholder="Enter your Facebook profile URL"
        />
        <FormInput
          name="twitter"
          label="Twitter Profile"
          type="url"
          defaultValue={profile.social?.twitter}
          placeholder="Enter your Twitter profile URL"
        />
        <FormInput
          name="linkedin"
          label="LinkedIn Profile"
          type="url"
          defaultValue={profile.social?.linkedin}
          placeholder="Enter your LinkedIn profile URL"
        />
        <FormInput
          name="instagram"
          label="Instagram Profile"
          type="url"
          defaultValue={profile.social?.instagram}
          placeholder="Enter your Instagram profile URL"
        />
      </div>
    </div>
  );
}
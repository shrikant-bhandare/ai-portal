import React from 'react';
import { Phone } from 'lucide-react';
import { FormInput } from '../../ui/FormInput';
import type { UserProfile } from '../../../hooks/useProfile';

interface ContactSectionProps {
  profile: UserProfile;
}

export function ContactSection({ profile }: ContactSectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 text-white">
        <Phone className="h-5 w-5 text-blue-400" />
        <h3 className="text-lg font-semibold">Contact Details</h3>
      </div>
      <div className="grid gap-4 pt-2">
        <FormInput
          name="phone"
          label="Phone Number"
          type="tel"
          defaultValue={profile.contact?.phone}
          placeholder="Enter your phone number"
        />
        <FormInput
          name="address"
          label="Street Address"
          defaultValue={profile.contact?.address}
          placeholder="Enter your street address"
        />
        <div className="grid grid-cols-2 gap-4">
          <FormInput
            name="city"
            label="City"
            defaultValue={profile.contact?.city}
            placeholder="Enter your city"
          />
          <FormInput
            name="postal_code"
            label="Postal Code"
            defaultValue={profile.contact?.postal_code}
            placeholder="Enter postal code"
          />
        </div>
      </div>
    </div>
  );
}
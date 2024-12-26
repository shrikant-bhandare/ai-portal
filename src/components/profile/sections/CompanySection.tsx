import React from 'react';
import { Building2 } from 'lucide-react';
import { FormInput } from '../../ui/FormInput';
import { FormSelect } from '../../ui/FormSelect';
import type { UserProfile } from '../../../hooks/useProfile';

interface CompanySectionProps {
  profile: UserProfile;
}

export function CompanySection({ profile }: CompanySectionProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 text-white">
        <Building2 className="h-5 w-5 text-emerald-400" />
        <h3 className="text-lg font-semibold">Company Information</h3>
      </div>
      <div className="grid gap-4 pt-2">
        <FormInput
          name="company_name"
          label="Company Name"
          defaultValue={profile.company?.name}
          required
          placeholder="Enter your company name"
        />
        <FormInput
          name="website"
          label="Website"
          type="url"
          defaultValue={profile.company?.website}
          placeholder="https://example.com"
        />
        <FormInput
          name="country"
          label="Country"
          defaultValue={profile.company?.country}
          placeholder="Enter your country"
        />
        <FormSelect
          name="employee_range"
          label="Company Size"
          defaultValue={profile.company?.size}
          options={[
            { value: '1-10', label: '1-10 employees' },
            { value: '11-50', label: '11-50 employees' },
            { value: '51-200', label: '51-200 employees' },
            { value: '201-500', label: '201-500 employees' },
            { value: '500+', label: '500+ employees' }
          ]}
        />
      </div>
    </div>
  );
}
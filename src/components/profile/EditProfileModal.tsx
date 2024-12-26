import React from 'react';
import { X } from 'lucide-react';
import { CompanySection } from './sections/CompanySection';
import { ContactSection } from './sections/ContactSection';
import { SocialSection } from './sections/SocialSection';
import { Button } from '../ui/Button';
import { supabase } from '../../lib/supabase';
import type { UserProfile } from '../../hooks/useProfile';

interface EditProfileModalProps {
  profile: UserProfile;
  onClose: () => void;
  onSaved: () => void;
}

export function EditProfileModal({ profile, onClose, onSaved }: EditProfileModalProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No authenticated user');

      // Update company information
      await supabase
        .from('companies')
        .update({
          name: formData.get('company_name'),
          website: formData.get('website'),
          country: formData.get('country'),
          size: formData.get('employee_range'),
        })
        .eq('user_id', user.id);

      // Update contact details
      await supabase
        .from('contact_details')
        .update({
          phone: formData.get('phone'),
          address: formData.get('address'),
          city: formData.get('city'),
          postal_code: formData.get('postal_code'),
        })
        .eq('user_id', user.id);

      // Update social profiles
      await supabase
        .from('social_profiles')
        .update({
          facebook: formData.get('facebook'),
          twitter: formData.get('twitter'),
          linkedin: formData.get('linkedin'),
          instagram: formData.get('instagram'),
        })
        .eq('user_id', user.id);

      onSaved();
      onClose();
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-[#0A1628] rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
        <div className="p-6 border-b border-gray-700 flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white">Edit Profile</h2>
          <Button variant="secondary" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          <CompanySection profile={profile} />
          <ContactSection profile={profile} />
          <SocialSection profile={profile} />

          <div className="flex justify-end space-x-4 pt-4 border-t border-gray-700">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
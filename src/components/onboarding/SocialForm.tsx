import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useOnboarding } from '../../hooks/useOnboarding';
import { FormInput } from '../ui/FormInput';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export function SocialForm() {
  const navigate = useNavigate();
  const { updateStepCompletion } = useOnboarding();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      const { error } = await supabase
        .from('social_profiles')
        .insert([{
          facebook: formData.get('facebook'),
          twitter: formData.get('twitter'),
          linkedin: formData.get('linkedin'),
          instagram: formData.get('instagram'),
          user_id: (await supabase.auth.getUser()).data.user?.id
        }]);

      if (error) throw error;

      await updateStepCompletion('social_step_completed');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving social profiles:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-semibold text-white mb-6">Social Presence</h2>
      
      <div className="space-y-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Facebook className="h-5 w-5 text-gray-400" />
          </div>
          <FormInput
            name="facebook"
            type="url"
            placeholder="Facebook profile URL"
            className="pl-10"
          />
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Twitter className="h-5 w-5 text-gray-400" />
          </div>
          <FormInput
            name="twitter"
            type="url"
            placeholder="Twitter profile URL"
            className="pl-10"
          />
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Linkedin className="h-5 w-5 text-gray-400" />
          </div>
          <FormInput
            name="linkedin"
            type="url"
            placeholder="LinkedIn profile URL"
            className="pl-10"
          />
        </div>

        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Instagram className="h-5 w-5 text-gray-400" />
          </div>
          <FormInput
            name="instagram"
            type="url"
            placeholder="Instagram profile URL"
            className="pl-10"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-emerald-400 to-blue-500 text-white font-medium hover:from-emerald-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Complete Setup
      </button>
    </form>
  );
}
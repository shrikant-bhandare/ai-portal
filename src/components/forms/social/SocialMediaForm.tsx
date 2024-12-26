import React, { useState } from 'react';
import { FormInput } from '../../ui/FormInput';
import { FormSelect } from '../../ui/FormSelect';
import { FormTextArea } from '../brand/FormTextArea';
import { Button } from '../../ui/Button';
import { supabase } from '../../../lib/supabase';

export function SocialMediaForm({ onSuccess }: { onSuccess?: () => void }) {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) throw new Error('No authenticated user');

      const { error } = await supabase.from('social_media_projects').insert([{
        user_id: user.id,
        project_name: formData.get('project_name'),
        platforms: formData.get('platforms'),
        goals: formData.get('goals'),
        target_audience: formData.get('target_audience'),
        content_type: formData.get('content_type'),
        posting_frequency: formData.get('posting_frequency'),
        brand_voice: formData.get('brand_voice'),
        additional_notes: formData.get('additional_notes')
      }]);

      if (error) throw error;
      onSuccess?.();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormInput
        name="project_name"
        label="Project Name"
        placeholder="Enter project name"
        required
      />

      <FormSelect
        name="platforms"
        label="Primary Platform"
        required
        options={[
          { value: 'instagram', label: 'Instagram' },
          { value: 'facebook', label: 'Facebook' },
          { value: 'twitter', label: 'Twitter' },
          { value: 'linkedin', label: 'LinkedIn' },
          { value: 'tiktok', label: 'TikTok' }
        ]}
      />

      <FormTextArea
        name="goals"
        label="Campaign Goals"
        placeholder="What are your main goals for this campaign?"
        required
      />

      <FormTextArea
        name="target_audience"
        label="Target Audience"
        placeholder="Describe your target audience"
        required
      />

      <FormSelect
        name="content_type"
        label="Primary Content Type"
        required
        options={[
          { value: 'photos', label: 'Photos/Images' },
          { value: 'videos', label: 'Videos' },
          { value: 'stories', label: 'Stories' },
          { value: 'mixed', label: 'Mixed Content' }
        ]}
      />

      <FormSelect
        name="posting_frequency"
        label="Posting Frequency"
        required
        options={[
          { value: 'daily', label: 'Daily' },
          { value: '3-5-week', label: '3-5 Times per Week' },
          { value: 'weekly', label: 'Weekly' },
          { value: 'custom', label: 'Custom Schedule' }
        ]}
      />

      <FormTextArea
        name="brand_voice"
        label="Brand Voice"
        placeholder="Describe your brand's voice and tone"
        required
      />

      <FormTextArea
        name="additional_notes"
        label="Additional Notes"
        placeholder="Any other requirements or notes?"
      />

      <Button type="submit" size="large" fullWidth disabled={loading}>
        {loading ? 'Submitting...' : 'Submit Campaign Brief'}
      </Button>
    </form>
  );
}
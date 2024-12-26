import React from 'react';
import { FormInput } from '../../ui/FormInput';
import { FormTextArea } from './FormTextArea';
import { Button } from '../../ui/Button';
import { supabase } from '../../../lib/supabase';

interface BrandDevelopmentFormProps {
  onSuccess?: () => void;
}

export function BrandDevelopmentForm({ onSuccess }: BrandDevelopmentFormProps) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No authenticated user');

      const { error } = await supabase.from('brand_development').insert([{
        user_id: user.id,
        brand_name: formData.get('brand_name'),
        industry: formData.get('industry'),
        product: formData.get('product'),
        benefits: formData.get('benefits'),
        core_values: formData.get('core_values'),
        target_audience: formData.get('target_audience'),
        demographics: formData.get('demographics'),
        brand_personality: formData.get('brand_personality'),
        colors_fonts: formData.get('colors_fonts'),
        notes: formData.get('notes')
      }]);

      if (error) throw error;
      onSuccess?.();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          name="brand_name"
          label="Brand Name"
          placeholder="Enter brand name"
          required
        />
        <FormInput
          name="industry"
          label="Industry"
          placeholder="Enter industry"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          name="product"
          label="Product"
          placeholder="Enter product"
          required
        />
        <FormTextArea
          name="benefits"
          label="Benefits"
          placeholder="Enter benefits"
          required
        />
      </div>

      <FormTextArea
        name="core_values"
        label="Core Values"
        placeholder="Enter core values"
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          name="target_audience"
          label="Target Audience"
          placeholder="Enter target audience"
          required
        />
        <FormTextArea
          name="demographics"
          label="Demographics"
          placeholder="Age, gender, location, income, education"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          name="brand_personality"
          label="Brand Personality"
          placeholder="Enter three words"
          required
        />
        <FormTextArea
          name="colors_fonts"
          label="Colors, fonts, representing the brand"
          placeholder="Enter colors and fonts"
          required
        />
      </div>

      <FormTextArea
        name="notes"
        label="Notes"
        placeholder="Enter additional notes"
      />

      <Button type="submit" size="large" fullWidth>
        Submit Brand Development Form
      </Button>
    </form>
  );
}
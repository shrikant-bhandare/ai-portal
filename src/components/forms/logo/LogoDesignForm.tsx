import React, { useState } from 'react';
import { FormInput } from '../../ui/FormInput';
import { FormTextArea } from '../brand/FormTextArea';
import { ColorPalette } from './ColorPalette';
import { Button } from '../../ui/Button';
import { supabase } from '../../../lib/supabase';

interface LogoDesignFormProps {
  onSuccess?: () => void;
}

export function LogoDesignForm({ onSuccess }: LogoDesignFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No authenticated user');

      const formData = new FormData(e.currentTarget);
      const selectedColors = formData.getAll('colors');

      const { error: submitError } = await supabase.from('logo_designs').insert([{
        user_id: user.id,
        brand_name: formData.get('brand_name'),
        industry: formData.get('industry'),
        product: formData.get('product'),
        benefits: formData.get('benefits'),
        core_values: formData.get('core_values'),
        colors: selectedColors,
        typography_notes: formData.get('typography_notes'),
        notes: formData.get('notes'),
        status: 'pending'
      }]);

      if (submitError) throw submitError;
      onSuccess?.();
    } catch (err) {
      setError('Failed to submit design brief. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-500/10 border border-red-500 text-red-500 rounded-lg p-3 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          name="brand_name"
          label="Brand Name"
          placeholder="Enter your brand name"
          required
        />
        <FormInput
          name="industry"
          label="Industry"
          placeholder="Enter your industry"
          required
        />
      </div>

      <FormInput
        name="product"
        label="Product/Service"
        placeholder="Describe your main product or service"
        required
      />

      <FormTextArea
        name="benefits"
        label="Key Benefits"
        placeholder="What are the main benefits of your product/service?"
        required
      />

      <FormTextArea
        name="core_values"
        label="Core Values"
        placeholder="What are your brand's core values?"
        required
      />

      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-300">
          Color Selection
        </label>
        <ColorPalette />
      </div>

      <FormTextArea
        name="typography_notes"
        label="Preferred Fonts or Typography Styles"
        placeholder="Describe any specific font preferences or styles you like"
      />

      <FormTextArea
        name="notes"
        label="Additional Notes"
        placeholder="Any other preferences or requirements?"
      />

      <div className="pt-4">
        <Button
          type="submit"
          size="large"
          fullWidth
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit Design Brief'}
        </Button>
      </div>
    </form>
  );
}
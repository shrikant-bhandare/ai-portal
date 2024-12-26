import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useOnboarding } from '../../hooks/useOnboarding';
import { FormInput } from '../ui/FormInput';

export function ContactForm() {
  const navigate = useNavigate();
  const { updateStepCompletion } = useOnboarding();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      const { error } = await supabase
        .from('contact_details')
        .insert([{
          phone: formData.get('phone'),
          address: formData.get('address'),
          city: formData.get('city'),
          postal_code: formData.get('postal_code'),
          user_id: (await supabase.auth.getUser()).data.user?.id
        }]);

      if (error) throw error;

      await updateStepCompletion('contact_step_completed');
      navigate('/onboarding/social');
    } catch (error) {
      console.error('Error saving contact details:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-semibold text-white mb-6">Contact Details</h2>
      
      <FormInput
        name="phone"
        type="tel"
        placeholder="Phone number"
        required
      />

      <FormInput
        name="address"
        placeholder="Street address"
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <FormInput
          name="city"
          placeholder="City"
          required
        />
        <FormInput
          name="postal_code"
          placeholder="Postal code"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-emerald-400 to-blue-500 text-white font-medium hover:from-emerald-500 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Continue
      </button>
    </form>
  );
}
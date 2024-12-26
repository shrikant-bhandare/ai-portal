import React from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useOnboarding } from '../../hooks/useOnboarding';
import { FormInput } from '../ui/FormInput';
import { FormSelect } from '../ui/FormSelect';
import { Button } from '../ui/Button';

export function CompanyForm() {
  const navigate = useNavigate();
  const { updateStepCompletion } = useOnboarding();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    try {
      const { error: companyError } = await supabase
        .from('companies')
        .insert([{
          name: formData.get('company_name'),
          website: formData.get('website'),
          country: formData.get('country'),
          size: formData.get('employee_range'),
          user_id: (await supabase.auth.getUser()).data.user?.id
        }]);

      if (companyError) throw companyError;

      await updateStepCompletion('company_step_completed');
      navigate('/onboarding/contact');
    } catch (error) {
      console.error('Error saving company information:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl font-semibold text-white mb-6">Company Information</h2>
      
      <FormInput
        name="company_name"
        placeholder="Enter your company name"
        required
      />

      <FormInput
        type="url"
        name="website"
        placeholder="https://example.com"
        required
      />

      <FormInput
        name="country"
        placeholder="Enter your country"
        required
      />

      <FormSelect
        name="employee_range"
        required
        options={[
          { value: '', label: 'Select employee range' },
          { value: '1-10', label: '1-10 employees' },
          { value: '11-50', label: '11-50 employees' },
          { value: '51-200', label: '51-200 employees' },
          { value: '201-500', label: '201-500 employees' },
          { value: '500+', label: '500+ employees' }
        ]}
      />

      <Button type="submit" fullWidth>
        Continue
      </Button>
    </form>
  );
}
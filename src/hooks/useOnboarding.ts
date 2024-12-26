import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export interface OnboardingStatus {
  company_step_completed: boolean;
  contact_step_completed: boolean;
  social_step_completed: boolean;
}

export function useOnboarding() {
  const [status, setStatus] = useState<OnboardingStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkOnboardingStatus() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // First try to get existing status
        const { data: existingStatus, error: fetchError } = await supabase
          .from('onboarding_status')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();

        if (!existingStatus && !fetchError) {
          // Create new status if none exists
          const { data: newStatus, error: insertError } = await supabase
            .from('onboarding_status')
            .insert([{ user_id: user.id }])
            .select()
            .single();

          if (insertError) throw insertError;
          setStatus(newStatus);
        } else {
          setStatus(existingStatus);
        }
      } catch (error) {
        console.error('Error checking onboarding status:', error);
      } finally {
        setLoading(false);
      }
    }

    checkOnboardingStatus();
  }, []);

  const updateStepCompletion = async (step: keyof OnboardingStatus) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No authenticated user');

      const { data, error } = await supabase
        .from('onboarding_status')
        .update({ [step]: true })
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      setStatus(data);
      
      if (data.company_step_completed && data.contact_step_completed && data.social_step_completed) {
        await supabase
          .from('onboarding_status')
          .update({ completed_at: new Date().toISOString() })
          .eq('user_id', user.id);
      }

      return data;
    } catch (error) {
      console.error('Error updating onboarding status:', error);
      throw error;
    }
  };

  return {
    status,
    loading,
    updateStepCompletion
  };
}
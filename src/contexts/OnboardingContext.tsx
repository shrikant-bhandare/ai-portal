import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

interface OnboardingStatus {
  company_step_completed: boolean;
  contact_step_completed: boolean;
  social_step_completed: boolean;
}

interface OnboardingContextType {
  status: OnboardingStatus | null;
  loading: boolean;
  updateStepCompletion: (step: keyof OnboardingStatus) => Promise<void>;
  checkOnboardingCompletion: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [status, setStatus] = useState<OnboardingStatus | null>(null);
  const [loading, setLoading] = useState(true);

  const checkOnboardingStatus = async () => {
    try {
      const { data: onboardingData, error } = await supabase
        .from('onboarding_status')
        .select('*')
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (!onboardingData) {
        const { data: newStatus } = await supabase
          .from('onboarding_status')
          .insert([{ user_id: (await supabase.auth.getUser()).data.user?.id }])
          .select()
          .single();
        
        setStatus(newStatus);
      } else {
        setStatus(onboardingData);
      }
    } catch (error) {
      console.error('Error checking onboarding status:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  const checkOnboardingCompletion = () => {
    if (!status?.company_step_completed) {
      navigate('/onboarding');
    } else if (!status?.contact_step_completed) {
      navigate('/onboarding/contact');
    } else if (!status?.social_step_completed) {
      navigate('/onboarding/social');
    } else {
      navigate('/dashboard');
    }
  };

  const updateStepCompletion = async (step: keyof OnboardingStatus) => {
    try {
      const { data, error } = await supabase
        .from('onboarding_status')
        .update({ [step]: true })
        .eq('user_id', (await supabase.auth.getUser()).data.user?.id)
        .select()
        .single();

      if (error) throw error;
      setStatus(data);
      
      if (data.company_step_completed && data.contact_step_completed && data.social_step_completed) {
        await supabase
          .from('onboarding_status')
          .update({ completed_at: new Date().toISOString() })
          .eq('user_id', (await supabase.auth.getUser()).data.user?.id);
      }
    } catch (error) {
      console.error('Error updating onboarding status:', error);
      throw error;
    }
  };

  return (
    <OnboardingContext.Provider value={{
      status,
      loading,
      updateStepCompletion,
      checkOnboardingCompletion
    }}>
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (context === undefined) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
}
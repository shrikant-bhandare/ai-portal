import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useAuth } from '../hooks/useAuth';
import { Loader } from '../components/ui/Loader';

interface OnboardingStatus {
  company_step_completed: boolean;
  contact_step_completed: boolean;
  social_step_completed: boolean;
}

interface OnboardingContextType {
  status: OnboardingStatus | null;
  loading: boolean;
  error: Error | null;
  updateStepCompletion: (step: keyof OnboardingStatus) => Promise<void>;
  checkOnboardingCompletion: () => void;
}

const OnboardingContext = createContext<OnboardingContextType | undefined>(undefined);

export function OnboardingProvider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { session } = useAuth();
  const [status, setStatus] = useState<OnboardingStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!session?.user) {
      setLoading(false);
      return;
    }

    async function checkOnboardingStatus() {
      try {
        const { data, error: fetchError } = await supabase
          .from('onboarding_status')
          .select('*')
          .eq('user_id', session.user.id)
          .single();

        if (fetchError) throw fetchError;
        setStatus(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to check onboarding status'));
      } finally {
        setLoading(false);
      }
    }

    checkOnboardingStatus();
  }, [session]);

  const updateStepCompletion = async (step: keyof OnboardingStatus) => {
    if (!session?.user) return;

    try {
      const { data, error: updateError } = await supabase
        .from('onboarding_status')
        .update({ [step]: true })
        .eq('user_id', session.user.id)
        .select()
        .single();

      if (updateError) throw updateError;
      setStatus(data);
    } catch (err) {
      throw err instanceof Error ? err : new Error('Failed to update onboarding status');
    }
  };

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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0A1628] flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0A1628] flex items-center justify-center">
        <div className="bg-red-500/10 border border-red-500 text-red-500 rounded-lg p-4">
          Failed to load onboarding status. Please try again later.
        </div>
      </div>
    );
  }

  return (
    <OnboardingContext.Provider 
      value={{ 
        status, 
        loading, 
        error,
        updateStepCompletion, 
        checkOnboardingCompletion 
      }}
    >
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
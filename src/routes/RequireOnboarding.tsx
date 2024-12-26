import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useOnboarding } from '../hooks/useOnboarding';

interface RequireOnboardingProps {
  children: React.ReactNode;
}

export function RequireOnboarding({ children }: RequireOnboardingProps) {
  const { status, loading } = useOnboarding();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  // If onboarding is not complete, redirect to the appropriate step
  if (!status?.company_step_completed) {
    return <Navigate to="/onboarding" state={{ from: location }} replace />;
  }
  
  if (!status?.contact_step_completed) {
    return <Navigate to="/onboarding/contact" state={{ from: location }} replace />;
  }
  
  if (!status?.social_step_completed) {
    return <Navigate to="/onboarding/social" state={{ from: location }} replace />;
  }

  return <>{children}</>;
}
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { OnboardingLayout } from '../components/onboarding/OnboardingLayout';
import { CompanyForm } from '../components/onboarding/CompanyForm';
import { ContactForm } from '../components/onboarding/ContactForm';
import { SocialForm } from '../components/onboarding/SocialForm';

export function Onboarding() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <OnboardingLayout currentStep={1}>
            <CompanyForm />
          </OnboardingLayout>
        }
      />
      <Route
        path="/contact"
        element={
          <OnboardingLayout currentStep={2}>
            <ContactForm />
          </OnboardingLayout>
        }
      />
      <Route
        path="/social"
        element={
          <OnboardingLayout currentStep={3}>
            <SocialForm />
          </OnboardingLayout>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
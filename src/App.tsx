import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthForm } from './components/auth/AuthForm';
import { AppRoutes } from './routes';
import { useAuth } from './hooks/useAuth';
import { OnboardingProvider } from './contexts/OnboardingContext';

export function App() {
  const { session } = useAuth();

  if (!session) {
    return <AuthForm />;
  }

  return (
    <Router>
      <OnboardingProvider>
        <AppRoutes />
      </OnboardingProvider>
    </Router>
  );
}

export default App;
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthForm } from './components/auth/AuthForm';
import { AppRoutes } from './routes';
import { useAuth } from './hooks/useAuth';
import { OnboardingProvider } from './contexts/OnboardingContext';
import { Loader } from './components/ui/Loader';

export function App() {
  const { session, loading, error } = useAuth();

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
          Failed to connect to the server. Please try again later.
        </div>
      </div>
    );
  }

  if (!session) {
    return <AuthForm />;
  }

  return (
    <div className="min-h-screen bg-[#0A1628]">
      <Router>
        <OnboardingProvider>
          <AppRoutes />
        </OnboardingProvider>
      </Router>
    </div>
  );
}

export default App;
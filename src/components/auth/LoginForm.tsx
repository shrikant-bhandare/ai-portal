import React, { useState } from 'react';
import { FormInput } from '../ui/FormInput';
import { Button } from '../ui/Button';
import { supabase } from '../../lib/supabase';

interface LoginFormProps {
  onSignUpClick: () => void;
}

export function LoginForm({ onSignUpClick }: LoginFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (authError) {
        if (authError.message === 'Invalid login credentials') {
          setError('Invalid email or password. Please try again.');
        } else {
          setError(authError.message);
        }
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A1628] flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">
            Welcome Back
          </h2>
          <p className="mt-2 text-gray-400">
            Sign in to continue your creative journey
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 rounded-lg p-3 text-sm">
              {error}
            </div>
          )}

          <FormInput
            name="email"
            type="email"
            required
            placeholder="Email address"
            disabled={loading}
            autoComplete="email"
          />

          <FormInput
            name="password"
            type="password"
            required
            placeholder="Password"
            disabled={loading}
            autoComplete="current-password"
          />

          <Button
            type="submit"
            disabled={loading}
            fullWidth
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </Button>

          <p className="text-center text-sm text-gray-400">
            Don't have an account?{' '}
            <Button
              type="button"
              variant="secondary"
              onClick={onSignUpClick}
            >
              Sign up
            </Button>
          </p>
        </form>
      </div>
    </div>
  );
}
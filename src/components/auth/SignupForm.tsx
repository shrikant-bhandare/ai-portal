import React, { useState } from 'react';
import { FormInput } from '../ui/FormInput';
import { Button } from '../ui/Button';
import { supabase } from '../../lib/supabase';

export function SignupForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const name = formData.get('name') as string;

    try {
      const { error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: { full_name: name }
        }
      });

      if (error) throw error;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during signup');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A1628] flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white">
            Join Art of Galaxy
          </h2>
          <p className="mt-2 text-gray-400">
            Sign up to start your creative journey
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 rounded-lg p-3 text-sm">
              {error}
            </div>
          )}

          <FormInput
            name="name"
            type="text"
            required
            placeholder="Full name"
            disabled={loading}
          />

          <FormInput
            name="email"
            type="email"
            required
            placeholder="Email address"
            disabled={loading}
          />

          <FormInput
            name="password"
            type="password"
            required
            placeholder="Create a password"
            disabled={loading}
          />

          <Button
            type="submit"
            disabled={loading}
            fullWidth
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </Button>

          <p className="text-center text-sm text-gray-400">
            Already have an account?{' '}
            <Button
              type="button"
              variant="secondary"
              onClick={() => window.location.href = '/login'}
            >
              Sign in
            </Button>
          </p>
        </form>
      </div>
    </div>
  );
}
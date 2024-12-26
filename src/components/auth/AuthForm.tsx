import React, { useState } from 'react';
import { SignupForm } from './SignupForm';
import { LoginForm } from './LoginForm';

export function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(false);

  return isSignUp ? (
    <SignupForm />
  ) : (
    <LoginForm onSignUpClick={() => setIsSignUp(true)} />
  );
}
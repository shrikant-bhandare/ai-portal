import React from 'react';
import { Building } from 'lucide-react';

interface OnboardingLayoutProps {
  children: React.ReactNode;
  currentStep: number;
}

export function OnboardingLayout({ children, currentStep }: OnboardingLayoutProps) {
  const steps = [
    { number: 1, title: 'Company Information', description: 'Tell us about your business' },
    { number: 2, title: 'Contact Details', description: 'How can we reach you?' },
    { number: 3, title: 'Social Presence', description: 'Connect your social media' }
  ];

  return (
    <div className="min-h-screen bg-[#0A1628] flex">
      <div className="flex-1 flex">
        {/* Left side */}
        <div className="w-1/3 p-8 flex flex-col">
          <div className="mb-8">
            <Building className="h-8 w-8 text-emerald-400" />
            <h1 className="text-2xl font-bold text-white mt-4">Welcome to Art of Galaxy</h1>
            <p className="text-gray-400 mt-2">
              Let's set up your brand presence and get you started on your creative journey.
            </p>
          </div>

          <div className="space-y-6">
            {steps.map((step) => (
              <div
                key={step.number}
                className={`flex items-start space-x-3 ${
                  currentStep === step.number ? 'opacity-100' : 'opacity-50'
                }`}
              >
                <div
                  className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-sm
                    ${currentStep === step.number ? 'bg-indigo-500 text-white' : 'bg-gray-700 text-gray-300'}`}
                >
                  {step.number}
                </div>
                <div>
                  <h3 className="text-white font-medium">{step.title}</h3>
                  <p className="text-gray-400 text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right side */}
        <div className="w-2/3 p-8 flex items-center justify-center">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </div>
    </div>
  );
}
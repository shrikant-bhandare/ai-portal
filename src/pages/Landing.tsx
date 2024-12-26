import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ServiceFeatures } from '../components/services/ServiceFeatures';
import { ServicesSection } from '../components/services/ServicesSection';
import { ServiceHero } from '../components/landing/ServiceHero';
import { Button } from '../components/ui/Button';
import { GradientText } from '../components/ui/GradientText';

export function Landing() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedService = location.state?.selectedService;

  return (
    <div className="min-h-screen bg-[#0A1628]">
      <nav className="bg-transparent absolute w-full z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate('/dashboard')}
              className="text-2xl font-bold hover:opacity-80 transition-opacity"
            >
              <GradientText size="small">Art of Galaxy</GradientText>
            </button>
            <div className="flex items-center space-x-6">
              <Button variant="secondary" onClick={() => navigate('/projects')}>Projects</Button>
              <Button variant="secondary" onClick={() => navigate('/dashboard')}>Dashboard</Button>
              <Button variant="secondary" onClick={() => navigate('/files')}>My Files</Button>
              <Button variant="secondary" onClick={() => navigate('/billing')}>Billing</Button>
              <Button onClick={() => navigate('/dashboard')}>Get Started</Button>
            </div>
          </div>
        </div>
      </nav>

      <ServiceHero service={selectedService} />

      <div className="max-w-7xl mx-auto px-6 py-20">
        <ServiceFeatures />
      </div>

      <ServicesSection />
    </div>
  );
}
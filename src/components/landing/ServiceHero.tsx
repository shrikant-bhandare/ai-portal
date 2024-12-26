import React, { useState } from 'react';
import { GradientText } from '../ui/GradientText';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';
import { NewProjectModal } from '../services/NewProjectModal';

interface ServiceHeroProps {
  service?: {
    id: string;
    title: string;
    description: string;
  };
}

export function ServiceHero({ service }: ServiceHeroProps) {
  const navigate = useNavigate();
  const [showProjectModal, setShowProjectModal] = useState(false);

  const handleGetStarted = () => {
    if (service) {
      setShowProjectModal(true);
    } else {
      navigate('/dashboard');
    }
  };

  return (
    <>
      <div className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-6xl font-bold text-white mb-6">
            <GradientText size="large">
              {service ? service.title : 'Your Creative Journey Starts Here'}
            </GradientText>
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            {service ? service.description : 'Art of Galaxy. Your imagination is our canvas'}
          </p>
          <Button size="large" onClick={handleGetStarted}>
            {service ? 'Start New Project' : 'Get Started'}
          </Button>
        </div>
      </div>

      {showProjectModal && service && (
        <NewProjectModal
          service={service}
          onClose={() => setShowProjectModal(false)}
        />
      )}
    </>
  );
}
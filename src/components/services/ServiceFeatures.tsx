import React, { useState } from 'react';
import { MessageCircle, Calendar, Rocket, ListTodo } from 'lucide-react';
import { ServiceFeatureCard } from './ServiceFeatureCard';
import { useNavigate, useLocation } from 'react-router-dom';
import { NewProjectModal } from './NewProjectModal';
import { SchedulingModal } from '../scheduling/SchedulingModal';

export function ServiceFeatures() {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedService = location.state?.selectedService;
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [showScheduling, setShowScheduling] = useState(false);

  const features = [
    { 
      icon: MessageCircle, 
      title: 'Live customer support',
      action: () => window.open('#support', '_blank')
    },
    { 
      icon: Calendar, 
      title: 'Schedule a meeting',
      action: () => setShowScheduling(true)
    },
    { 
      icon: Rocket, 
      title: 'New project',
      action: () => {
        if (selectedService) {
          setShowProjectModal(true);
        } else {
          navigate('/services');
        }
      }
    },
    { 
      icon: ListTodo, 
      title: 'My tasks',
      action: () => navigate('/tasks')
    }
  ];

  return (
    <>
      <div className="flex flex-wrap justify-center gap-6">
        {features.map((feature, index) => (
          <ServiceFeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            onClick={feature.action}
          />
        ))}
      </div>

      {showProjectModal && selectedService && (
        <NewProjectModal
          service={selectedService}
          onClose={() => setShowProjectModal(false)}
        />
      )}

      {showScheduling && (
        <SchedulingModal onClose={() => setShowScheduling(false)} />
      )}
    </>
  );
}
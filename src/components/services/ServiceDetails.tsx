import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { services } from '../../data/services';
import { MessageCircle, Calendar, Rocket, ListTodo } from 'lucide-react';
import { GradientText } from '../ui/GradientText';
import { Button } from '../ui/Button';

export function ServiceDetails() {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const service = services.find(s => s.id === serviceId);

  if (!service) {
    return null;
  }

  const features = [
    { icon: MessageCircle, text: 'Live customer support' },
    { icon: Calendar, text: 'Schedule a meeting' },
    { icon: Rocket, text: 'New project' },
    { icon: ListTodo, text: 'My tasks' }
  ];

  return (
    <div className="min-h-screen bg-[#0A1628] text-white">
      <header className="bg-[#0A1628] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-6xl font-bold mb-6">
            <GradientText size="large">{service.title}</GradientText>
          </h1>
          <p className="text-xl text-white/80 mb-8">
            Art of Galaxy. Your imagination is our canvas
          </p>
          <Button 
            size="large"
            onClick={() => navigate('/dashboard')}
          >
            Go to Dashboard
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="bg-[#1A2737] p-6 rounded-xl hover:bg-[#1E2E42] transition-colors"
              >
                <Icon className="w-8 h-8 text-[#0de39b] mb-4" />
                <p className="text-lg font-medium">{feature.text}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-16">
          <Button 
            size="large"
            fullWidth
          >
            Book a Demo
          </Button>
        </div>
      </div>
    </div>
  );
}
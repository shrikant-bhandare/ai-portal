import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import { GradientText } from '../ui/GradientText';

interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  isCRM?: boolean;
}

export function ServiceCard({ id, title, description, icon: Icon, gradient, isCRM }: ServiceCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/', { 
      state: { 
        selectedService: {
          id,
          title,
          description
        }
      } 
    });
  };

  return (
    <div 
      onClick={handleClick}
      className="bg-[#1A2737] border border-gray-800 p-6 rounded-xl cursor-pointer transition-all duration-200 hover:bg-[#1E2E42] group"
    >
      <div className="flex flex-col h-full">
        <Icon className={`w-8 h-8 mb-4 ${gradient.replace('bg-gradient-to-br', 'text')}`} />
        <h3 className="text-xl font-bold text-white mb-2">
          <GradientText size="small">{title}</GradientText>
        </h3>
        <p className="text-gray-400 text-sm">
          {description}
        </p>
        <div className="mt-auto pt-4">
          <button className="text-gray-400 text-sm group-hover:text-white transition-colors">
            Learn more →
          </button>
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { getGradientClasses } from '../../utils/colors';

interface SubServiceCardProps {
  id: string;
  title: string;
  description: string;
  onClick: () => void;
}

export function SubServiceCard({ id, title, description, onClick }: SubServiceCardProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full p-4 rounded-lg text-left transition-all duration-200 hover:scale-102 ${getGradientClasses('mid', false)}`}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
          <p className="text-sm text-white/80">{description}</p>
        </div>
        <ArrowRight className="h-5 w-5 text-white/80" />
      </div>
    </button>
  );
}
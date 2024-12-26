import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ServiceFeatureCardProps {
  icon: LucideIcon;
  title: string;
  onClick?: () => void;
}

export function ServiceFeatureCard({ icon: Icon, title, onClick }: ServiceFeatureCardProps) {
  return (
    <div
      onClick={onClick}
      className="flex-1 min-w-[200px] max-w-[280px] bg-[#1A2737] px-6 py-4 rounded-xl hover:bg-[#1E2E42] transition-colors cursor-pointer group"
    >
      <div className="flex flex-col items-center">
        <Icon className="w-6 h-6 text-emerald-400 mb-2" />
        <p className="text-gray-300 group-hover:text-white text-sm text-center whitespace-nowrap">
          {title}
        </p>
      </div>
    </div>
  );
}
import React from 'react';
import { Palette, Globe, MessageSquare, BarChart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const highlights = [
  {
    id: 1,
    title: 'Brand Development',
    description: '2 active projects',
    icon: Palette,
    path: '/services',
    color: 'text-purple-400'
  },
  {
    id: 2,
    title: 'Website Development',
    description: '3 projects in progress',
    icon: Globe,
    path: '/services',
    color: 'text-blue-400'
  },
  {
    id: 3,
    title: 'Customer Support',
    description: '15 open conversations',
    icon: MessageSquare,
    path: '/conversations',
    color: 'text-emerald-400'
  },
  {
    id: 4,
    title: 'Analytics',
    description: 'View performance metrics',
    icon: BarChart,
    path: '/conversions',
    color: 'text-orange-400'
  }
];

export function ServiceHighlights() {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {highlights.map((highlight) => {
        const Icon = highlight.icon;
        return (
          <button
            key={highlight.id}
            onClick={() => navigate(highlight.path)}
            className="bg-[#1E2E42] p-4 rounded-lg border border-gray-800 hover:bg-[#1A2737] transition-colors text-left"
          >
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg bg-opacity-10 ${highlight.color} bg-current`}>
                <Icon className={`w-5 h-5 ${highlight.color}`} />
              </div>
              <div>
                <h3 className="text-white font-medium">{highlight.title}</h3>
                <p className="text-sm text-gray-400">{highlight.description}</p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
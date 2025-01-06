import React from 'react';
import { Grid, List } from 'lucide-react';
import { ViewType } from '../types';

interface ViewToggleProps {
  viewType: ViewType;
  onViewChange: (view: ViewType) => void;
}

export function ViewToggle({ viewType, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex space-x-2">
      <button
        onClick={() => onViewChange('grid')}
        className={`p-2 rounded-lg ${viewType === 'grid' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}
      >
        <Grid className="w-5 h-5" />
      </button>
      <button
        onClick={() => onViewChange('list')}
        className={`p-2 rounded-lg ${viewType === 'list' ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white'}`}
      >
        <List className="w-5 h-5" />
      </button>
    </div>
  );
}
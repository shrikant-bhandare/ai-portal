import React from 'react';
import { Search, Filter, Plus, SlidersHorizontal } from 'lucide-react';
import { Button } from '../../ui/Button';

interface ProjectToolbarProps {
  onNewProject: () => void;
}

export function ProjectToolbar({ onNewProject }: ProjectToolbarProps) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search projects..."
            className="w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-700 bg-[#1A2737] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        
        <Button variant="secondary" size="small">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
        
        <Button variant="secondary" size="small">
          <SlidersHorizontal className="w-4 h-4 mr-2" />
          Sort
        </Button>
      </div>

      <Button onClick={onNewProject}>
        <Plus className="w-4 h-4 mr-2" />
        New Project
      </Button>
    </div>
  );
}
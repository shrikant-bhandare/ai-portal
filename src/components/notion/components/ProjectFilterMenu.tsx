import React from 'react';
import { FilterOption } from '../types';

interface ProjectFilterMenuProps {
  onFilterSelect: (filter: FilterOption) => void;
}

const filterOptions = {
  status: ['Planning', 'In Progress', 'Completed'],
  priority: ['High', 'Medium', 'Low'],
  assignee: ['John D', 'Sarah M', 'Mike R']
};

export function ProjectFilterMenu({ onFilterSelect }: ProjectFilterMenuProps) {
  return (
    <div className="absolute top-full left-0 mt-2 w-56 bg-[#1A2737] rounded-lg border border-gray-700 shadow-lg z-10">
      {Object.entries(filterOptions).map(([type, values]) => (
        <div key={type} className="p-2">
          <div className="text-sm font-medium text-gray-400 px-2 py-1 capitalize">
            {type}
          </div>
          {values.map((value) => (
            <button
              key={value}
              onClick={() => onFilterSelect({ type, value })}
              className="w-full text-left px-2 py-1.5 text-sm text-white hover:bg-gray-700/50 rounded"
            >
              {value}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
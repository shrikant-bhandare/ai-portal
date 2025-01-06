import React from 'react';
import { X } from 'lucide-react';

const filters = [
  { type: 'status', label: 'Status', options: ['Planning', 'In Progress', 'Completed'] },
  { type: 'priority', label: 'Priority', options: ['High', 'Medium', 'Low'] },
  { type: 'assignee', label: 'Assignee', options: ['John D', 'Sarah M', 'Mike R'] }
];

export function ProjectFilters() {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {filters.map((filter) => (
        <div
          key={filter.type}
          className="px-3 py-1.5 rounded-lg bg-[#1E2E42] border border-gray-700 text-sm text-white flex items-center space-x-2"
        >
          <span>{filter.label}</span>
          <button className="text-gray-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
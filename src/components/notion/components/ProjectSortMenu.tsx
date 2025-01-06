import React from 'react';
import { Check } from 'lucide-react';
import type { Project } from '../types';

interface ProjectSortMenuProps {
  currentSort: { field: keyof Project; direction: 'asc' | 'desc' };
  onSort: (field: keyof Project, direction: 'asc' | 'desc') => void;
}

const sortOptions = [
  { field: 'title' as keyof Project, label: 'Name' },
  { field: 'dueDate' as keyof Project, label: 'Due Date' },
  { field: 'status' as keyof Project, label: 'Status' },
  { field: 'priority' as keyof Project, label: 'Priority' }
];

export function ProjectSortMenu({ currentSort, onSort }: ProjectSortMenuProps) {
  return (
    <div className="absolute top-full right-0 mt-2 w-48 bg-[#1A2737] rounded-lg border border-gray-700 shadow-lg z-10">
      {sortOptions.map(({ field, label }) => (
        <button
          key={field}
          onClick={() => onSort(
            field,
            currentSort.field === field && currentSort.direction === 'asc' ? 'desc' : 'asc'
          )}
          className="w-full flex items-center justify-between px-4 py-2 text-sm text-white hover:bg-gray-700/50"
        >
          <span>{label}</span>
          {currentSort.field === field && (
            <Check className="w-4 h-4 text-emerald-400" />
          )}
        </button>
      ))}
    </div>
  );
}
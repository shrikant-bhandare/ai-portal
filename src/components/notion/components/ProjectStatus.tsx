import React from 'react';
import { Project } from '../types';

interface ProjectStatusProps {
  status: Project['status'];
}

export function ProjectStatus({ status }: ProjectStatusProps) {
  const statusStyles = {
    'In Progress': 'bg-blue-500/10 text-blue-400',
    'Completed': 'bg-emerald-500/10 text-emerald-400',
    'Planning': 'bg-amber-500/10 text-amber-400'
  };

  return (
    <span className={`px-2 py-1 text-xs rounded-full ${statusStyles[status]}`}>
      {status}
    </span>
  );
}
import React from 'react';

interface ProjectAssigneesProps {
  assignees: string[];
}

export function ProjectAssignees({ assignees }: ProjectAssigneesProps) {
  return (
    <div className="flex -space-x-2">
      {assignees.map((assignee, index) => (
        <div
          key={index}
          className="w-6 h-6 rounded-full bg-gradient-to-r from-emerald-400 to-blue-500 flex items-center justify-center text-white text-xs border-2 border-[#1A2737]"
        >
          {assignee[0]}
        </div>
      ))}
    </div>
  );
}
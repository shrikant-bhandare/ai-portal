import React from 'react';
import { Flag, CheckCircle } from 'lucide-react';

interface ProjectMilestonesProps {
  projectId: number;
}

export function ProjectMilestones({ projectId }: ProjectMilestonesProps) {
  const milestones = [
    { id: 1, title: 'Project Kickoff', date: '2024-02-15', completed: true },
    { id: 2, title: 'Design Phase', date: '2024-02-28', completed: true },
    { id: 3, title: 'Development Sprint 1', date: '2024-03-15', completed: false },
    { id: 4, title: 'Client Review', date: '2024-03-30', completed: false }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-gray-400">Milestones</h4>
        <Flag className="w-4 h-4 text-gray-400" />
      </div>
      <div className="space-y-2">
        {milestones.map((milestone) => (
          <div key={milestone.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-[#1E2E42]">
            <div className="flex items-center space-x-3">
              <CheckCircle className={`w-4 h-4 ${milestone.completed ? 'text-emerald-400' : 'text-gray-400'}`} />
              <div>
                <p className="text-white text-sm">{milestone.title}</p>
                <p className="text-gray-400 text-xs">{milestone.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
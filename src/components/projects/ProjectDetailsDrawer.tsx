import React from 'react';
import { X, Calendar, BarChart2, Users, Link } from 'lucide-react';
import { Button } from '../ui/Button';
import { ProjectTeam } from './ProjectTeam';
import { ProjectMilestones } from './ProjectMilestones';
import { ProjectFiles } from './ProjectFiles';

interface ProjectDetailsDrawerProps {
  project: {
    id: number;
    name: string;
    client: string;
    status: string;
    progress: number;
    dueDate: string;
    description?: string;
  };
  onClose: () => void;
}

export function ProjectDetailsDrawer({ project, onClose }: ProjectDetailsDrawerProps) {
  return (
    <div className="fixed inset-y-0 right-0 w-full max-w-xl bg-[#1A2737] border-l border-gray-800 shadow-xl">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-800 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Project Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Project Title */}
            <div>
              <h3 className="text-2xl font-bold text-white">{project.name}</h3>
              <p className="text-gray-400 mt-1">{project.client}</p>
            </div>

            {/* Project Meta */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#1E2E42] p-4 rounded-lg">
                <div className="flex items-center text-gray-400 mb-1">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="text-sm">Due Date</span>
                </div>
                <p className="text-white">{project.dueDate}</p>
              </div>
              <div className="bg-[#1E2E42] p-4 rounded-lg">
                <div className="flex items-center text-gray-400 mb-1">
                  <BarChart2 className="w-4 h-4 mr-2" />
                  <span className="text-sm">Progress</span>
                </div>
                <p className="text-emerald-400">{project.progress}%</p>
              </div>
            </div>

            {/* Project Description */}
            {project.description && (
              <div className="bg-[#1E2E42] p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-400 mb-2">Description</h4>
                <p className="text-white">{project.description}</p>
              </div>
            )}

            {/* Project Team */}
            <ProjectTeam projectId={project.id} />

            {/* Project Milestones */}
            <ProjectMilestones projectId={project.id} />

            {/* Project Files */}
            <ProjectFiles projectId={project.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
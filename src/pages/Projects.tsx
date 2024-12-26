import React, { useState } from 'react';
import { Clock, CheckCircle, AlertCircle, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { GradientText } from '../components/ui/GradientText';
import { ProjectDetailsDrawer } from '../components/projects/ProjectDetailsDrawer';
import { useNavigate } from 'react-router-dom';

const projects = [
  {
    id: 1,
    name: 'Website Redesign',
    client: 'Tech Corp',
    status: 'In Progress',
    progress: 65,
    dueDate: '2024-03-15',
    description: 'Complete overhaul of the company website with modern design and improved user experience.'
  },
  {
    id: 2,
    name: 'Brand Identity',
    client: 'Fashion Co',
    status: 'Review',
    progress: 90,
    dueDate: '2024-03-10',
    description: 'Development of comprehensive brand identity including logo, color palette, and brand guidelines.'
  }
];

export function Projects() {
  const navigate = useNavigate();
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const handleNewProject = () => {
    navigate('/services');
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          <GradientText>Projects</GradientText>
        </h1>
        <Button onClick={handleNewProject}>New Project</Button>
      </div>

      <div className="grid gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            onClick={() => setSelectedProject(project)}
            className="bg-[#1A2737] rounded-lg border border-gray-800 p-6 cursor-pointer hover:bg-[#1E2E42] transition-colors group"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-white">{project.name}</h3>
                <p className="text-gray-400">{project.client}</p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-500/10 text-blue-400">
                  {project.status}
                </span>
                <ChevronRight className="w-5 h-5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>

            <div className="mt-4">
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>Progress</span>
                <span>{project.progress}%</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-emerald-400 rounded-full h-2"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-400">
                <Clock className="w-4 h-4 mr-2" />
                Due {project.dueDate}
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedProject && (
        <ProjectDetailsDrawer
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}
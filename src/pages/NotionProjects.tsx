import React from 'react';
import { GradientText } from '../components/ui/GradientText';
import { NotionProjectList } from '../components/notion/NotionProjectList';
import { Button } from '../components/ui/Button';
import { Plus } from 'lucide-react';

export function NotionProjects() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">
            <GradientText>Notion Projects</GradientText>
          </h1>
          <p className="text-gray-400">
            Manage and organize your projects with Notion-like interface
          </p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </div>

      <div className="bg-[#1A2737] rounded-lg border border-gray-800 p-6">
        <NotionProjectList />
      </div>
    </div>
  );
}
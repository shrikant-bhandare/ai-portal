import React from 'react';
import { format } from 'date-fns';
import { MoreHorizontal, Calendar } from 'lucide-react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Project } from './types';
import { ProjectStatus } from './components/ProjectStatus';
import { ProjectAssignees } from './components/ProjectAssignees';
import { ProjectTags } from './components/ProjectTags';

interface NotionProjectCardProps extends Project {}

export function NotionProjectCard({ id, title, status, dueDate, assignees, tags }: NotionProjectCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-[#1A2737] rounded-lg border border-gray-800 p-4 cursor-pointer hover:bg-[#1E2E42] transition-colors"
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-white font-medium">{title}</h3>
        <button className="text-gray-400 hover:text-white">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-3">
        <div className="flex items-center text-sm text-gray-400">
          <Calendar className="w-4 h-4 mr-2" />
          <span>{format(new Date(dueDate), 'MMM d, yyyy')}</span>
        </div>

        <div className="flex items-center justify-between">
          <ProjectAssignees assignees={assignees} />
          <ProjectStatus status={status} />
        </div>

        <ProjectTags tags={tags} />
      </div>
    </div>
  );
}
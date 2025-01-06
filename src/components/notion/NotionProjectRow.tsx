import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ExternalLink, Users } from 'lucide-react';
import { Project } from './types';
import { ProjectStatus } from './components/ProjectStatus';
import { ProjectAssignees } from './components/ProjectAssignees';

interface NotionProjectRowProps extends Project {}

export function NotionProjectRow({ id, title, status, dueDate, assignees, tags }: NotionProjectRowProps) {
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
    <tr
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="border-b border-gray-800 last:border-0 hover:bg-[#1E2E42] transition-colors"
    >
      <td className="sticky left-0 bg-[#1A2737] px-4 py-3 group-hover:bg-[#1E2E42]">
        <div className="flex items-center space-x-2">
          <span className="text-white whitespace-nowrap">{title}</span>
          {tags.length > 0 && (
            <span className="px-2 py-1 text-xs rounded-full bg-gray-700/50 text-gray-300 whitespace-nowrap">
              {tags[0]}
            </span>
          )}
        </div>
      </td>
      <td className="px-4 py-3 whitespace-nowrap">
        <ProjectStatus status={status} />
      </td>
      <td className="px-4 py-3 whitespace-nowrap">
        <div className="flex items-center space-x-2">
          <Users className="w-4 h-4 text-gray-400" />
          <span className="text-gray-400">Design team</span>
        </div>
      </td>
      <td className="px-4 py-3 whitespace-nowrap">
        <ProjectAssignees assignees={assignees} />
      </td>
      <td className="px-4 py-3 whitespace-nowrap">
        <span className="px-2 py-1 text-xs rounded-full bg-amber-500/10 text-amber-400">
          High
        </span>
      </td>
      <td className="px-4 py-3 text-gray-400 whitespace-nowrap">
        {new Date(dueDate).toLocaleDateString()}
      </td>
      <td className="px-4 py-3 whitespace-nowrap">
        <button className="text-gray-400 hover:text-white">
          <ExternalLink className="w-4 h-4" />
        </button>
      </td>
    </tr>
  );
}
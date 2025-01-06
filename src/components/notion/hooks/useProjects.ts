import { useState } from 'react';
import { Project } from '../types';
import { DragEndEvent } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

const initialProjects: Project[] = [
  {
    id: '1',
    title: 'Website Redesign',
    status: 'In Progress',
    dueDate: '2024-03-15',
    assignees: ['John D', 'Sarah M'],
    tags: ['Design', 'Development']
  },
  {
    id: '2',
    title: 'Mobile App Launch',
    status: 'Planning',
    dueDate: '2024-04-01',
    assignees: ['Mike R', 'Emily C'],
    tags: ['Mobile', 'Marketing']
  },
  {
    id: '3',
    title: 'Brand Guidelines',
    status: 'Completed',
    dueDate: '2024-03-10',
    assignees: ['Lisa K'],
    tags: ['Branding', 'Design']
  }
];

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>(initialProjects);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setProjects((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return {
    projects,
    handleDragEnd
  };
}
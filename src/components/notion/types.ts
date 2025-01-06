export interface Project {
  id: string;
  title: string;
  status: 'Planning' | 'In Progress' | 'Completed';
  dueDate: string;
  assignees: string[];
  tags: string[];
  priority?: 'High' | 'Medium' | 'Low';
  team?: string;
  link?: string;
  description?: string;
}

export type ViewType = 'grid' | 'list';

export interface FilterOption {
  type: string;
  value: string;
}
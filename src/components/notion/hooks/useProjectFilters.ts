import { useState, useCallback } from 'react';
import { Project, FilterOption } from '../types';

export function useProjectFilters(projects: Project[]) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<FilterOption[]>([]);
  const [sortConfig, setSortConfig] = useState<{field: keyof Project; direction: 'asc' | 'desc'}>({
    field: 'dueDate',
    direction: 'asc'
  });

  const filteredProjects = useCallback(() => {
    return projects
      .filter(project => {
        // Search filter
        if (searchQuery) {
          const searchLower = searchQuery.toLowerCase();
          return (
            project.title.toLowerCase().includes(searchLower) ||
            project.tags.some(tag => tag.toLowerCase().includes(searchLower))
          );
        }
        return true;
      })
      .filter(project => {
        // Active filters
        return activeFilters.every(filter => {
          switch (filter.type) {
            case 'status':
              return project.status === filter.value;
            case 'priority':
              return project.priority === filter.value;
            case 'assignee':
              return project.assignees.includes(filter.value);
            default:
              return true;
          }
        });
      })
      .sort((a, b) => {
        const { field, direction } = sortConfig;
        const aValue = a[field];
        const bValue = b[field];
        
        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return direction === 'asc' 
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }
        return 0;
      });
  }, [projects, searchQuery, activeFilters, sortConfig]);

  return {
    searchQuery,
    setSearchQuery,
    activeFilters,
    setActiveFilters,
    sortConfig,
    setSortConfig,
    filteredProjects
  };
}
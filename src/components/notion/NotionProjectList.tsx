import React, { useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { NotionProjectCard } from './NotionProjectCard';
import { NotionProjectRow } from './NotionProjectRow';
import { ViewToggle } from './components/ViewToggle';
import { ProjectToolbar } from './components/ProjectToolbar';
import { ProjectFilters } from './components/ProjectFilters';
import { ProjectFilterMenu } from './components/ProjectFilterMenu';
import { ProjectSortMenu } from './components/ProjectSortMenu';
import { useProjects } from './hooks/useProjects';
import { useProjectFilters } from './hooks/useProjectFilters';
import { ViewType, FilterOption } from './types';

export function NotionProjectList() {
  const { projects, handleDragEnd } = useProjects();
  const [viewType, setViewType] = useState<ViewType>('list');
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [showSortMenu, setShowSortMenu] = useState(false);

  const {
    searchQuery,
    setSearchQuery,
    activeFilters,
    setActiveFilters,
    sortConfig,
    setSortConfig,
    filteredProjects
  } = useProjectFilters(projects);

  const handleFilterSelect = (filter: FilterOption) => {
    setActiveFilters(prev => [...prev, filter]);
    setShowFilterMenu(false);
  };

  const handleRemoveFilter = (filterToRemove: FilterOption) => {
    setActiveFilters(prev => 
      prev.filter(f => !(f.type === filterToRemove.type && f.value === filterToRemove.value))
    );
  };

  const handleSort = (field: keyof typeof sortConfig.field, direction: 'asc' | 'desc') => {
    setSortConfig({ field, direction });
    setShowSortMenu(false);
  };

  const filteredProjectsList = filteredProjects();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white">Projects</h2>
        <ViewToggle viewType={viewType} onViewChange={setViewType} />
      </div>

      <ProjectToolbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onFilterClick={() => setShowFilterMenu(true)}
        onSortClick={() => setShowSortMenu(true)}
      />

      {showFilterMenu && (
        <ProjectFilterMenu onFilterSelect={handleFilterSelect} />
      )}

      {showSortMenu && (
        <ProjectSortMenu
          currentSort={sortConfig}
          onSort={handleSort}
        />
      )}

      <ProjectFilters
        activeFilters={activeFilters}
        onRemoveFilter={handleRemoveFilter}
      />

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={filteredProjectsList.map(p => p.id)} strategy={rectSortingStrategy}>
          {viewType === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProjectsList.map((project) => (
                <NotionProjectCard key={project.id} {...project} />
              ))}
            </div>
          ) : (
            <div className="bg-[#1A2737] rounded-lg border border-gray-800 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1200px]">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="sticky left-0 bg-[#1A2737] px-4 py-3 text-left text-sm font-medium text-gray-400">Name</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-400 whitespace-nowrap">Status</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-400 whitespace-nowrap">Team</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-400 whitespace-nowrap">Assignee</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-400 whitespace-nowrap">Priority</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-400 whitespace-nowrap">Due Date</th>
                      <th className="px-4 py-3 text-left text-sm font-medium text-gray-400 whitespace-nowrap">Link</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProjectsList.map((project) => (
                      <NotionProjectRow key={project.id} {...project} />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </SortableContext>
      </DndContext>
    </div>
  );
}
import React from 'react';

interface ProjectTagsProps {
  tags: string[];
}

export function ProjectTags({ tags }: ProjectTagsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag, index) => (
        <span
          key={index}
          className="px-2 py-1 text-xs rounded-full bg-gray-700/50 text-gray-300"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
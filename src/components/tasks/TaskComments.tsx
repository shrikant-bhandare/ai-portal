import React from 'react';
import { FormTextArea } from '../forms/brand/FormTextArea';
import { Button } from '../ui/Button';

interface TaskCommentsProps {
  taskId: number;
}

export function TaskComments({ taskId }: TaskCommentsProps) {
  return (
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-gray-400">Comments</h4>
      
      <div className="space-y-4">
        {/* Add comment form */}
        <div className="space-y-4">
          <FormTextArea
            placeholder="Add a comment..."
            rows={3}
          />
          <Button>Add Comment</Button>
        </div>

        {/* Comments list */}
        <div className="space-y-4">
          {/* Sample comment */}
          <div className="bg-[#1E2E42] p-4 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <span className="font-medium text-white">John Doe</span>
              <span className="text-sm text-gray-400">2 hours ago</span>
            </div>
            <p className="text-gray-300">Looking good! Just a few minor adjustments needed.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
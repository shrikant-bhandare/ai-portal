import React from 'react';
import { X, Calendar, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { TaskComments } from './TaskComments';
import { TaskActions } from './TaskActions';

interface TaskDetailsDrawerProps {
  task: {
    id: number;
    title: string;
    project: string;
    priority: string;
    dueDate: string;
    status: string;
    description?: string;
  };
  onClose: () => void;
}

export function TaskDetailsDrawer({ task, onClose }: TaskDetailsDrawerProps) {
  return (
    <div className="fixed inset-y-0 right-0 w-full max-w-xl bg-[#1A2737] border-l border-gray-800 shadow-xl">
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-800 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Task Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Task Title */}
            <div>
              <h3 className="text-2xl font-bold text-white">{task.title}</h3>
              <p className="text-gray-400 mt-1">{task.project}</p>
            </div>

            {/* Task Meta */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-[#1E2E42] p-4 rounded-lg">
                <div className="flex items-center text-gray-400 mb-1">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span className="text-sm">Due Date</span>
                </div>
                <p className="text-white">{task.dueDate}</p>
              </div>
              <div className="bg-[#1E2E42] p-4 rounded-lg">
                <div className="flex items-center text-gray-400 mb-1">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  <span className="text-sm">Priority</span>
                </div>
                <p className={`${task.priority === 'High' ? 'text-emerald-400' : 'text-emerald-300'}`}>
                  {task.priority}
                </p>
              </div>
            </div>

            {/* Task Description */}
            {task.description && (
              <div className="bg-[#1E2E42] p-4 rounded-lg">
                <h4 className="text-sm font-medium text-gray-400 mb-2">Description</h4>
                <p className="text-white">{task.description}</p>
              </div>
            )}

            {/* Task Actions */}
            <TaskActions taskId={task.id} status={task.status} />

            {/* Task Comments */}
            <TaskComments taskId={task.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
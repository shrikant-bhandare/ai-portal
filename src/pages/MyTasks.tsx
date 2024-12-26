import React, { useState } from 'react';
import { CheckCircle, Clock, AlertCircle, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { GradientText } from '../components/ui/GradientText';
import { TaskDetailsDrawer } from '../components/tasks/TaskDetailsDrawer';

const tasks = [
  {
    id: 1,
    title: 'Review logo design concepts',
    project: 'Brand Identity',
    priority: 'High',
    dueDate: '2024-02-22',
    status: 'pending',
    description: 'Review and provide feedback on the latest logo design concepts for the brand refresh project.'
  },
  {
    id: 2,
    title: 'Prepare website content',
    project: 'Website Redesign',
    priority: 'Medium',
    dueDate: '2024-02-25',
    status: 'in-progress',
    description: 'Create and organize content for the new website sections, including homepage, about us, and services.'
  },
  {
    id: 3,
    title: 'Client meeting',
    project: 'Brand Identity',
    priority: 'High',
    dueDate: '2024-02-21',
    status: 'completed',
    description: 'Final presentation and review of the brand identity project with the client.'
  }
];

export function MyTasks() {
  const [selectedTask, setSelectedTask] = useState<typeof tasks[0] | null>(null);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-6 h-6 text-emerald-400" />;
      case 'in-progress':
        return <Clock className="w-6 h-6 text-blue-400" />;
      default:
        return <AlertCircle className="w-6 h-6 text-amber-400" />;
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          <GradientText>My Tasks</GradientText>
        </h1>
        <Button>Add Task</Button>
      </div>

      <div className="grid gap-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            onClick={() => setSelectedTask(task)}
            className="bg-[#1A2737] rounded-lg border border-gray-800 p-4 flex items-center justify-between cursor-pointer hover:bg-[#1E2E42] transition-colors group"
          >
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                {getStatusIcon(task.status)}
              </div>
              <div>
                <h3 className="text-lg font-medium text-white">{task.title}</h3>
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <span>{task.project}</span>
                  <span>•</span>
                  <span>Due {task.dueDate}</span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      task.priority === 'High'
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : 'bg-emerald-400/10 text-emerald-300'
                    }`}
                  >
                    {task.priority}
                  </span>
                </div>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        ))}
      </div>

      {selectedTask && (
        <TaskDetailsDrawer
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
        />
      )}
    </div>
  );
}
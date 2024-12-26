import React from 'react';
import { MessageSquare, Users, FileText, Calendar } from 'lucide-react';
import { formatDate } from '../../utils/date';

const activities = [
  {
    id: 1,
    type: 'conversation',
    icon: MessageSquare,
    content: 'New conversation with Tech Corp about website redesign',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
    color: 'text-blue-400'
  },
  {
    id: 2,
    type: 'customer',
    icon: Users,
    content: 'Sarah Johnson from Design Co joined as a new customer',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
    color: 'text-emerald-400'
  },
  {
    id: 3,
    type: 'file',
    icon: FileText,
    content: 'Brand guidelines document uploaded for Future Brands',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(), // 4 hours ago
    color: 'text-purple-400'
  },
  {
    id: 4,
    type: 'meeting',
    icon: Calendar,
    content: 'Meeting scheduled with InnovateTech Solutions',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
    color: 'text-orange-400'
  }
];

export function RecentActivity() {
  return (
    <div className="space-y-4">
      {activities.map((activity) => {
        const Icon = activity.icon;
        return (
          <div key={activity.id} className="flex items-start space-x-3">
            <div className={`mt-1 p-2 rounded-lg bg-opacity-10 ${activity.color} bg-current`}>
              <Icon className={`w-4 h-4 ${activity.color}`} />
            </div>
            <div className="flex-1">
              <p className="text-gray-300">{activity.content}</p>
              <p className="text-sm text-gray-400">{formatDate(activity.timestamp)}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
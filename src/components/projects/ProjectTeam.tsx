import React from 'react';
import { Users } from 'lucide-react';

interface ProjectTeamProps {
  projectId: number;
}

export function ProjectTeam({ projectId }: ProjectTeamProps) {
  const team = [
    { id: 1, name: 'Sarah Johnson', role: 'Project Manager', avatar: 'SJ' },
    { id: 2, name: 'Mike Chen', role: 'Designer', avatar: 'MC' },
    { id: 3, name: 'Anna Smith', role: 'Developer', avatar: 'AS' }
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-gray-400">Team Members</h4>
        <Users className="w-4 h-4 text-gray-400" />
      </div>
      <div className="space-y-2">
        {team.map((member) => (
          <div key={member.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-[#1E2E42]">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-400 to-blue-500 flex items-center justify-center text-white text-sm">
              {member.avatar}
            </div>
            <div>
              <p className="text-white text-sm">{member.name}</p>
              <p className="text-gray-400 text-xs">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
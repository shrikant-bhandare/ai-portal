import React from 'react';
import { Bell, Moon, Search } from 'lucide-react';
import { ProfileDropdown } from './ProfileDropdown';

export function Header() {
  return (
    <header className="bg-[#0A1628] border-b border-gray-800 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center flex-1">
          <div className="relative w-64">
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-700 bg-[#1A2737] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white">
            <Bell className="h-5 w-5" />
          </button>
          <button className="p-2 hover:bg-white/5 rounded-lg text-gray-400 hover:text-white">
            <Moon className="h-5 w-5" />
          </button>
          <ProfileDropdown />
        </div>
      </div>
    </header>
  );
}
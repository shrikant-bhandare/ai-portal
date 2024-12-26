import React from 'react';
import { Home, LayoutDashboard, Users, MessageSquare, Megaphone, BarChart, Briefcase, FileText, FolderKanban, CheckSquare, CreditCard, TrendingUp } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { GradientText } from '../ui/GradientText';

const navItems = [
  { icon: Home, label: 'Home', path: '/' },
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Briefcase, label: 'All Services', path: '/services' },
  { icon: Users, label: 'Customers', path: '/customers' },
  { icon: MessageSquare, label: 'Conversations', path: '/conversations' },
  { icon: Megaphone, label: 'Campaigns', path: '/campaigns' },
  { icon: TrendingUp, label: 'Conversions', path: '/conversions' },
  { icon: BarChart, label: 'Reporting', path: '/reporting' },
  { 
    icon: FileText, 
    label: 'My Files', 
    path: '/files',
    badge: '3 new'
  },
  { 
    icon: FolderKanban, 
    label: 'Projects', 
    path: '/projects',
    badge: '2 active'
  },
  { 
    icon: CheckSquare, 
    label: 'My Tasks', 
    path: '/tasks',
    badge: '5 pending'
  },
  { 
    icon: CreditCard, 
    label: 'Billing', 
    path: '/billing' 
  }
];

export function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    // If clicking home, always navigate to landing page
    if (path === '/') {
      navigate('/');
    } else {
      navigate(path);
    }
  };

  return (
    <div className="w-64 bg-[#1A2737] h-screen p-4 border-r border-gray-800">
      <div className="mb-8">
        <button 
          onClick={() => navigate('/')}
          className="text-2xl font-bold hover:opacity-80 transition-opacity"
        >
          <GradientText>Art of Galaxy</GradientText>
        </button>
      </div>
      <nav className="space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={`flex items-center justify-between w-full px-4 py-3 text-sm rounded-lg transition-colors ${
                isActive
                  ? 'bg-white/5 text-white'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <div className="flex items-center">
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
              </div>
              {item.badge && (
                <span className="px-2 py-1 text-xs font-medium rounded-full bg-emerald-500/10 text-emerald-400">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
import React, { useState, useRef, useEffect } from 'react';
import { LogOut, User, Settings } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useProfile } from '../../hooks/useProfile';
import { EditProfileModal } from '../profile/EditProfileModal';

export function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { profile, loading, refresh } = useProfile();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  if (loading) {
    return (
      <div className="h-10 w-10 rounded-full bg-gray-700 animate-pulse" />
    );
  }

  return (
    <>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-emerald-400 to-blue-500 flex items-center justify-center text-white font-medium">
            {profile?.full_name?.charAt(0).toUpperCase()}
          </div>
          <span className="text-sm text-gray-700 font-medium">{profile?.full_name}</span>
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 border">
            <div className="px-4 py-2 border-b">
              <p className="text-sm font-medium text-gray-900">{profile?.full_name}</p>
              <p className="text-xs text-gray-500 truncate">{profile?.email}</p>
            </div>
            <button
              onClick={() => {
                setShowEditModal(true);
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
            >
              <Settings className="h-4 w-4 mr-2" />
              Edit Profile
            </button>
            <button
              onClick={handleLogout}
              className="w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
          </div>
        )}
      </div>

      {showEditModal && profile && (
        <EditProfileModal
          profile={profile}
          onClose={() => setShowEditModal(false)}
          onSaved={refresh}
        />
      )}
    </>
  );
}
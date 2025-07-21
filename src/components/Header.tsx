import React from 'react';
import { User, LogOut, Plus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  onAddExperience?: () => void;
  onProfileClick?: () => void;
}

export function Header({ onAddExperience, onProfileClick }: HeaderProps) {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white shadow-soft border-b border-gray-100 sticky top-0 z-40 backdrop-blur-sm bg-white/95">
      <div className="max-w-4xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-900 font-heading">המלצות חברים</h1>
            <p className="text-sm text-gray-600">המקומות שלנו</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={onProfileClick}
                className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-gray-100 transition-all duration-300 btn-hover-lift"
              >
                {user?.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt={user.fullName}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-teal-100"
                  />
                ) : (
                  <User className="w-8 h-8 text-gray-600" />
                )}
                <span className="hidden sm:inline text-gray-700 font-medium">
                  {user?.fullName}
                </span>
              </button>
              
              <button
                onClick={logout}
                className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300"
                title="התנתק"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
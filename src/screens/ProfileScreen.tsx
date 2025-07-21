import React, { useState } from 'react';
import { ArrowRight, Edit3, Camera, Trash2, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { mockExperiences } from '../data/mockData';
import { ExperienceCard } from '../components/ExperienceCard';
import { Experience } from '../types';

interface ProfileScreenProps {
  onBack: () => void;
  onExperienceClick: (experience: Experience) => void;
}

export function ProfileScreen({ onBack, onExperienceClick }: ProfileScreenProps) {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    fullName: user?.fullName || '',
    email: user?.email || ''
  });

  const userExperiences = mockExperiences.filter(exp => exp.creatorId === user?.id);

  const handleSaveProfile = () => {
    // כאן נשמור את הפרטים החדשים
    setIsEditing(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        // כאן נעדכן את תמונת הפרופיל
        console.log('New profile image:', e.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      <header className="bg-white shadow-soft border-b border-gray-100 sticky top-0 z-40 backdrop-blur-sm bg-white/95">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-300 btn-hover-lift"
            >
              <ArrowRight className="w-5 h-5 text-gray-600 rtl-flip" />
            </button>
            <h1 className="text-xl font-bold text-gray-900 font-heading">הפרופיל שלי</h1>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* פרטי הפרופיל */}
        <div className="bg-white rounded-2xl shadow-soft p-6 mb-6 border border-gray-100 animate-fade-in-up">
          <div className="flex items-start justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900 font-heading">פרטי חשבון</h2>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-2 px-3 py-2 text-teal-600 hover:bg-teal-50 rounded-xl transition-all duration-300 btn-hover-lift"
            >
              <Edit3 className="w-4 h-4" />
              {isEditing ? 'ביטול' : 'עריכה'}
            </button>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative">
              <img
                src={user?.profileImage || 'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=120&h=120&fit=crop'}
                alt={user?.fullName}
                className="w-24 h-24 rounded-full object-cover ring-4 ring-teal-100 shadow-soft"
              />
              {isEditing && (
                <label className="absolute bottom-0 right-0 bg-teal-600 text-white p-2 rounded-full cursor-pointer hover:bg-teal-700 transition-all duration-300 shadow-soft btn-hover-lift">
                  <Camera className="w-4 h-4" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>

            <div className="flex-1 w-full">
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                      שם מלא
                    </label>
                    <input
                      type="text"
                      value={editForm.fullName}
                      onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 text-right focus-ring shadow-sm"
                      dir="rtl"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                      אימייל
                    </label>
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 text-right focus-ring shadow-sm"
                      dir="rtl"
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={handleSaveProfile}
                      className="px-4 py-2 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-all duration-300 btn-hover-lift shadow-soft"
                    >
                      שמור
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300 btn-hover-lift shadow-sm"
                    >
                      ביטול
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center sm:text-right">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{user?.fullName}</h3>
                  <p className="text-gray-600 mb-2">@{user?.username}</p>
                  <p className="text-gray-600 mb-4">{user?.email}</p>
                  {user?.bio && (
                    <p className="text-gray-700 mb-4 italic">"{user.bio}"</p>
                  )}
                  <div className="flex flex-col sm:flex-row gap-4 text-sm text-gray-500">
                    <span>{userExperiences.length} המלצות</span>
                    <span>חבר מאז ינואר 2024</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* סטטיסטיקות */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-2xl shadow-soft p-4 border border-gray-100 text-center animate-scale-in">
            <div className="text-2xl font-bold text-teal-600 mb-1 font-heading">{userExperiences.length}</div>
            <div className="text-sm text-gray-600">המלצות</div>
          </div>
          <div className="bg-white rounded-2xl shadow-soft p-4 border border-gray-100 text-center animate-scale-in">
            <div className="text-2xl font-bold text-amber-600 mb-1 font-heading">
              {userExperiences.reduce((acc, exp) => acc + exp.comments.length, 0)}
            </div>
            <div className="text-sm text-gray-600">תגובות</div>
          </div>
          <div className="bg-white rounded-2xl shadow-soft p-4 border border-gray-100 text-center animate-scale-in">
            <div className="text-2xl font-bold text-mint-600 mb-1 font-heading">
              {userExperiences.length > 0 
                ? (userExperiences.reduce((acc, exp) => acc + exp.rating, 0) / userExperiences.length).toFixed(1)
                : '0'
              }
            </div>
            <div className="text-sm text-gray-600">דירוג ממוצע</div>
          </div>
        </div>

        {/* ההמלצות שלי */}
        <div className="bg-white rounded-2xl shadow-soft p-6 border border-gray-100 animate-fade-in-up">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 font-heading">ההמלצות שלי</h2>
          
          {userExperiences.length === 0 ? (
            <div className="text-center py-12 animate-scale-in">
              <p className="text-gray-500 mb-2">עדיין לא פרסמת המלצות</p>
              <p className="text-gray-400 text-sm">בואו נתחיל לשתף את החוויות שלך!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {userExperiences.map((experience) => (
                <ExperienceCard
                  key={experience.id}
                  experience={experience}
                  onClick={() => onExperienceClick(experience)}
                />
              ))}
            </div>
          )}
        </div>

        {/* פעולות חשבון */}
        <div className="bg-white rounded-2xl shadow-soft p-6 mt-6 border border-gray-100 animate-fade-in-up">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 font-heading">פעולות חשבון</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={logout}
              className="flex items-center justify-center gap-2 px-4 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-all duration-300 font-medium btn-hover-lift shadow-soft"
            >
              <LogOut className="w-4 h-4" />
              התנתק
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
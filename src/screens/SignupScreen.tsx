import React, { useState } from 'react';
import { MapPin, Upload, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface SignupScreenProps {
  onSwitchToLogin: () => void;
}

export function SignupScreen({ onSwitchToLogin }: SignupScreenProps) {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    email: ''
  });
  const [profileImage, setProfileImage] = useState<string>('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('הסיסמאות אינן תואמות');
      return;
    }

    if (formData.password.length < 6) {
      setError('הסיסמה חייבת להכיל לפחות 6 תווים');
      return;
    }

    setIsLoading(true);

    try {
      const success = await signup(formData.username, formData.password, formData.fullName, formData.email);
      if (!success) {
        setError('שגיאה ביצירת החשבון. נסה שוב.');
      }
    } catch (err) {
      setError('שגיאה ביצירת החשבון. נסה שוב.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setProfileImage(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-soft flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-soft-lg p-8 w-full max-w-md max-h-[90vh] overflow-y-auto animate-scale-in">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MapPin className="w-8 h-8 text-teal-600" />
            <h1 className="text-2xl font-bold text-gray-900 font-heading">הצטרף אלינו</h1>
          </div>
          <p className="text-gray-600">צור חשבון חדש</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-center">
            <div className="relative inline-block">
              {profileImage ? (
                <div className="relative">
                  <img
                    src={profileImage}
                    alt="תמונת פרופיל"
                    className="w-20 h-20 rounded-full object-cover ring-4 ring-teal-100 shadow-soft"
                  />
                  <button
                    type="button"
                    onClick={() => setProfileImage('')}
                    className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-all duration-300 shadow-soft"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center w-20 h-20 border-2 border-dashed border-teal-300 rounded-full cursor-pointer hover:border-teal-400 hover:bg-teal-50 transition-all duration-300">
                  <Upload className="w-6 h-6 text-teal-500" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-2">תמונת פרופיל (אופציונלי)</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
              שם מלא
            </label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 text-right focus-ring shadow-sm"
              placeholder="הכנס שם מלא"
              required
              dir="rtl"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
              שם משתמש
            </label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 text-right focus-ring shadow-sm"
              placeholder="הכנס שם משתמש"
              required
              dir="rtl"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
              אימייל
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 text-right focus-ring shadow-sm"
              placeholder="הכנס כתובת אימייל"
              required
              dir="rtl"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
              סיסמה
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 text-right focus-ring shadow-sm"
              placeholder="הכנס סיסמה"
              required
              dir="rtl"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1 text-right">
              אימות סיסמה
            </label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 text-right focus-ring shadow-sm"
              placeholder="הכנס סיסמה שוב"
              required
              dir="rtl"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-700 text-sm text-center animate-slide-in-right">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-teal-600 text-white py-3 rounded-xl hover:bg-teal-700 transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed btn-hover-lift shadow-soft hover:shadow-glow"
          >
            {isLoading ? 'יוצר חשבון...' : 'צור חשבון'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            כבר יש לך חשבון?{' '}
            <button
              onClick={onSwitchToLogin}
              className="text-teal-600 hover:text-teal-700 font-medium transition-colors duration-200"
            >
              התחבר
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
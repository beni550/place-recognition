import React, { useState } from 'react';
import { MapPin } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface LoginScreenProps {
  onSwitchToSignup: () => void;
}

export function LoginScreen({ onSwitchToSignup }: LoginScreenProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const success = await login(username, password);
      if (!success) {
        setError('שם משתמש או סיסמה שגויים');
      }
    } catch (err) {
      setError('שגיאה בהתחברות. נסה שוב.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-soft flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-soft-lg p-8 w-full max-w-md animate-scale-in">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MapPin className="w-8 h-8 text-teal-600" />
            <h1 className="text-2xl font-bold text-gray-900 font-heading">המלצות חברים</h1>
          </div>
          <p className="text-gray-600">המקומות שלנו</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
              שם משתמש
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 text-right focus-ring shadow-sm"
              placeholder="הכנס שם משתמש"
              required
              dir="rtl"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
              סיסמה
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 text-right focus-ring shadow-sm"
              placeholder="הכנס סיסמה"
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
            {isLoading ? 'מתחבר...' : 'התחבר'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            אין לך חשבון?{' '}
            <button
              onClick={onSwitchToSignup}
              className="text-teal-600 hover:text-teal-700 font-medium transition-colors duration-200"
            >
              צור חשבון חדש
            </button>
          </p>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-xl animate-fade-in-up">
          <p className="text-sm text-blue-800 text-center mb-2">
            למטרות הדגמה - השתמש בפרטים הבאים:
          </p>
          <div className="text-xs text-blue-700 text-center space-y-1">
            <p><strong>שם משתמש:</strong> yael_travel</p>
            <p><strong>סיסמה:</strong> demo123</p>
          </div>
        </div>
      </div>
    </div>
  );
}
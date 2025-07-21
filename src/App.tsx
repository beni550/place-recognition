import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LoginScreen } from './screens/LoginScreen';
import { SignupScreen } from './screens/SignupScreen';
import { FeedScreen } from './screens/FeedScreen';
import { AddExperienceScreen } from './screens/AddExperienceScreen';
import { ExperienceDetailScreen } from './screens/ExperienceDetailScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { Experience } from './types';

type Screen = 'login' | 'signup' | 'feed' | 'add-experience' | 'experience-detail' | 'profile';

function AppContent() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('feed');
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const { isAuthenticated } = useAuth();

  // אם המשתמש לא מחובר, הצג מסך כניסה או הרשמה
  if (!isAuthenticated) {
    return currentScreen === 'signup' ? (
      <SignupScreen onSwitchToLogin={() => setCurrentScreen('login')} />
    ) : (
      <LoginScreen onSwitchToSignup={() => setCurrentScreen('signup')} />
    );
  }

  // אם המשתמש מחובר, הצג את המסכים הרלוונטיים
  switch (currentScreen) {
    case 'feed':
      return (
        <FeedScreen
          onExperienceClick={(experience) => {
            setSelectedExperience(experience);
            setCurrentScreen('experience-detail');
          }}
          onAddExperience={() => setCurrentScreen('add-experience')}
          onProfileClick={() => setCurrentScreen('profile')}
        />
      );

    case 'add-experience':
      return (
        <AddExperienceScreen
          onBack={() => setCurrentScreen('feed')}
          onSave={(experienceData) => {
            // כאן נשמור את החוויה החדשה
            console.log('Saving experience:', experienceData);
            setCurrentScreen('feed');
          }}
        />
      );

    case 'experience-detail':
      return selectedExperience ? (
        <ExperienceDetailScreen
          experience={selectedExperience}
          onBack={() => setCurrentScreen('feed')}
        />
      ) : (
        <FeedScreen
          onExperienceClick={(experience) => {
            setSelectedExperience(experience);
            setCurrentScreen('experience-detail');
          }}
          onAddExperience={() => setCurrentScreen('add-experience')}
          onProfileClick={() => setCurrentScreen('profile')}
        />
      );

    case 'profile':
      return (
        <ProfileScreen
          onBack={() => setCurrentScreen('feed')}
          onExperienceClick={(experience) => {
            setSelectedExperience(experience);
            setCurrentScreen('experience-detail');
          }}
        />
      );

    default:
      return (
        <FeedScreen
          onExperienceClick={(experience) => {
            setSelectedExperience(experience);
            setCurrentScreen('experience-detail');
          }}
          onAddExperience={() => setCurrentScreen('add-experience')}
          onProfileClick={() => setCurrentScreen('profile')}
        />
      );
  }
}

function App() {
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </div>
  );
}

export default App;
import React, { useState, useMemo } from 'react';
import { ExperienceCard } from '../components/ExperienceCard';
import { SearchFilters } from '../components/SearchFilters';
import { Header } from '../components/Header';
import { FloatingActionButton } from '../components/FloatingActionButton';
import { Experience, ExperienceType } from '../types';
import { mockExperiences } from '../data/mockData';

interface FeedScreenProps {
  onExperienceClick: (experience: Experience) => void;
  onAddExperience: () => void;
  onProfileClick: () => void;
}

export function FeedScreen({ onExperienceClick, onAddExperience, onProfileClick }: FeedScreenProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<ExperienceType | 'all'>('all');

  const filteredExperiences = useMemo(() => {
    return mockExperiences.filter(experience => {
      const matchesSearch = searchTerm === '' || 
        experience.placeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        experience.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        experience.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        experience.tips.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = selectedType === 'all' || experience.type === selectedType;
      
      return matchesSearch && matchesType;
    });
  }, [searchTerm, selectedType]);

  return (
    <div className="min-h-screen bg-gradient-soft">
      <Header onAddExperience={onAddExperience} onProfileClick={onProfileClick} />
      
      <main className="max-w-4xl mx-auto px-4 py-6">
        <SearchFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedType={selectedType}
          onTypeChange={setSelectedType}
        />

        {filteredExperiences.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-white rounded-2xl shadow-soft p-8 animate-scale-in">
              <p className="text-gray-500 text-lg mb-4">
                {searchTerm || selectedType !== 'all' ? 'לא נמצאו התוצאות המתאימות לחיפוש' : 'עדיין אין המלצות'}
              </p>
              <p className="text-gray-400">
                {searchTerm || selectedType !== 'all' ? 'נסה חיפוש אחר או נקה את הפילטרים' : 'בואו נתחיל לשתף המלצות!'}
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExperiences.map((experience) => (
              <ExperienceCard
                key={experience.id}
                experience={experience}
                onClick={() => onExperienceClick(experience)}
              />
            ))}
          </div>
        )}

        {filteredExperiences.length > 0 && (
          <div className="text-center mt-8 text-gray-500 text-sm">
            הצגת {filteredExperiences.length} המלצות
          </div>
        )}
      </main>
      
      <FloatingActionButton onClick={onAddExperience} />
    </div>
  );
}
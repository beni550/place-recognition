import React from 'react';
import { Search, Filter } from 'lucide-react';
import { ExperienceType, experienceTypes } from '../types';

interface SearchFiltersProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedType: ExperienceType | 'all';
  onTypeChange: (type: ExperienceType | 'all') => void;
}

export function SearchFilters({ 
  searchTerm, 
  onSearchChange, 
  selectedType, 
  onTypeChange 
}: SearchFiltersProps) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-soft border border-gray-100 mb-6 animate-slide-in-right">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-teal-400 w-5 h-5" />
          <input
            type="text"
            placeholder="חפש מקומות, תיאורים או מיקומים..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-4 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 text-right focus-ring shadow-sm"
          />
        </div>
        
        <div className="relative sm:w-48">
          <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-teal-400 w-5 h-5" />
          <select
            value={selectedType}
            onChange={(e) => onTypeChange(e.target.value as ExperienceType | 'all')}
            className="w-full pl-4 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 text-right appearance-none bg-white focus-ring shadow-sm"
          >
            <option value="all">כל הקטגוריות</option>
            {experienceTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
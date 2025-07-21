import React from 'react';
import { MapPin, MessageCircle } from 'lucide-react';
import { Experience } from '../types';
import { StarRating } from './StarRating';
import { experienceTypes } from '../types';

interface ExperienceCardProps {
  experience: Experience;
  onClick: () => void;
}

export function ExperienceCard({ experience, onClick }: ExperienceCardProps) {
  const typeLabel = experienceTypes.find(t => t.value === experience.type)?.label || 'אחר';

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl shadow-soft overflow-hidden cursor-pointer card-hover border border-gray-100 animate-fade-in-up"
    >
      <div className="relative">
        <img
          src={experience.featuredImage}
          alt={experience.placeName}
          className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-medium text-gray-700 shadow-soft">
          {typeLabel}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-1 font-heading">
            {experience.placeName}
          </h3>
          <StarRating rating={experience.rating} size="sm" readonly />
        </div>
        
        <div className="flex items-center gap-1 mb-3 text-gray-600">
          <MapPin className="w-4 h-4 text-teal-500" />
          <span className="text-sm">{experience.location}</span>
        </div>
        
        <p className="text-gray-700 text-sm line-clamp-3 mb-4">
          {experience.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src={experience.creator.profileImage || 'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop'}
              alt={experience.creator.fullName}
              className="w-6 h-6 rounded-full object-cover ring-1 ring-gray-200"
            />
            <span className="text-sm text-gray-600 font-medium">
              {experience.creator.fullName}
            </span>
          </div>
          
          <div className="flex items-center gap-1 text-gray-500">
            <MessageCircle className="w-4 h-4 text-amber-500" />
            <span className="text-sm">{experience.comments.length}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
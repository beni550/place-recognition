import React, { useState } from 'react';
import { ArrowRight, Upload, X, Star } from 'lucide-react';
import { ExperienceType, experienceTypes } from '../types';
import { StarRating } from '../components/StarRating';
import { MapSelector } from '../components/MapSelector';

interface AddExperienceScreenProps {
  onBack: () => void;
  onSave: (experienceData: any) => void;
}

export function AddExperienceScreen({ onBack, onSave }: AddExperienceScreenProps) {
  const [formData, setFormData] = useState({
    placeName: '',
    type: 'restaurant' as ExperienceType,
    location: '',
    coordinates: null as { lat: number; lng: number } | null,
    description: '',
    tips: '',
    rating: 5
  });
  const [images, setImages] = useState<string[]>([]);
  const [featuredImageIndex, setFeaturedImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).slice(0, 10); // Limit to 10 images
    files.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setImages(prev => [...prev, result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    if (featuredImageIndex >= index && featuredImageIndex > 0) {
      setFeaturedImageIndex(prev => prev - 1);
    }
  };

  const handleLocationSelect = (location: { address: string; coordinates: { lat: number; lng: number } }) => {
    setFormData(prev => ({
      ...prev,
      location: location.address,
      coordinates: location.coordinates
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (images.length === 0) {
      alert('יש להעלות לפחות תמונה אחת');
      return;
    }

    setIsLoading(true);
    
    // סימולציה של שמירה
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    onSave({
      ...formData,
      images,
      featuredImage: images[featuredImageIndex]
    });
    
    setIsLoading(false);
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
            <h1 className="text-xl font-bold text-gray-900 font-heading">פרסם חוויה חדשה</h1>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-2xl shadow-soft p-6 border border-gray-100 animate-fade-in-up">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 font-heading">פרטי בסיסיים</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                  שם המקום/החוויה *
                </label>
                <input
                  type="text"
                  value={formData.placeName}
                  onChange={(e) => setFormData({ ...formData, placeName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 text-right focus-ring shadow-sm"
                  placeholder="למשל: מסעדת פרנקו, שמורת עין גדי"
                  required
                  dir="rtl"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                  סוג המקום/החוויה *
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as ExperienceType })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 text-right appearance-none bg-white focus-ring shadow-sm"
                >
                  {experienceTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                  מיקום ומפה *
                </label>
                <MapSelector
                  onLocationSelect={handleLocationSelect}
                  initialLocation={formData.location}
                  initialCoordinates={formData.coordinates}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                  דירוג *
                </label>
                <div className="flex justify-end">
                  <StarRating
                    rating={formData.rating}
                    onRatingChange={(rating) => setFormData({ ...formData, rating })}
                    size="lg"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-soft p-6 border border-gray-100 animate-fade-in-up">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 font-heading">תיאור החוויה</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                  תיאור החוויה *
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 text-right resize-none focus-ring shadow-sm"
                  placeholder="ספר על החוויה שלך... מה אהבת? איך היה? מה מיוחד במקום?"
                  required
                  dir="rtl"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 text-right">
                  המלצות וטיפים *
                </label>
                <textarea
                  value={formData.tips}
                  onChange={(e) => setFormData({ ...formData, tips: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 text-right resize-none focus-ring shadow-sm"
                  placeholder="טיפים שימושיים: מתי לבוא? מה להזמין? איפה לחנות? מה חשוב לדעת?"
                  required
                  dir="rtl"
                />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-soft p-6 border border-gray-100 animate-fade-in-up">
            <h2 className="text-lg font-semibold mb-4 text-gray-900 font-heading">תמונות (עד 10)</h2>
            
            <div className="mb-4">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-teal-300 rounded-xl cursor-pointer hover:border-teal-400 hover:bg-teal-50 transition-all duration-300 group">
                <Upload className="w-8 h-8 text-teal-500 mb-2" />
                <span className="text-sm text-teal-600 font-medium group-hover:text-teal-700">העלה תמונות או גרור לכאן</span>
                <span className="text-xs text-gray-500">PNG, JPG עד 5MB כל תמונה</span>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>

            {images.length > 0 && (
              <div>
                <p className="text-sm text-gray-600 mb-3 text-right">
                  התמונות שלך ({images.length}):
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                  {images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image}
                        alt={`תמונה ${index + 1}`}
                        className={`w-full h-24 object-cover rounded-lg ${
                          index === featuredImageIndex 
                            ? 'ring-3 ring-teal-500 ring-offset-2' 
                            : 'hover:opacity-80 hover:scale-105'
                        } transition-all duration-300`}
                      />
                      
                      {index === featuredImageIndex && (
                        <div className="absolute top-1 right-1 bg-teal-500 text-white text-xs px-2 py-1 rounded-full shadow-soft">
                          תמונה ראשית
                        </div>
                      )}
                      
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-lg flex items-center justify-center gap-2">
                        {index !== featuredImageIndex && (
                          <button
                            type="button"
                            onClick={() => setFeaturedImageIndex(index)}
                            className="bg-teal-500 text-white p-1.5 rounded-full text-xs hover:bg-teal-600 transition-colors duration-200 shadow-soft"
                          >
                            <Star className="w-3 h-3" />
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition-colors duration-200 shadow-soft"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={onBack}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-300 font-medium btn-hover-lift shadow-sm"
            >
              ביטול
            </button>
            <button
              type="submit"
              disabled={isLoading || images.length === 0}
              className="flex-1 px-6 py-3 bg-teal-600 text-white rounded-xl hover:bg-teal-700 transition-all duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed btn-hover-lift shadow-soft hover:shadow-glow"
            >
              {isLoading ? 'פורסם...' : 'פרסם חוויה'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
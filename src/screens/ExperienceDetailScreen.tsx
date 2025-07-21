import React, { useState } from 'react';
import { ArrowRight, MapPin, Calendar, Send, User } from 'lucide-react';
import { Experience } from '../types';
import { StarRating } from '../components/StarRating';
import { ImageGallery } from '../components/ImageGallery';
import { MiniMap } from '../components/MiniMap';
import { experienceTypes } from '../types';
import { useAuth } from '../contexts/AuthContext';

interface ExperienceDetailScreenProps {
  experience: Experience;
  onBack: () => void;
}

export function ExperienceDetailScreen({ experience, onBack }: ExperienceDetailScreenProps) {
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFullscreenGallery, setShowFullscreenGallery] = useState(false);
  const { user } = useAuth();

  const typeLabel = experienceTypes.find(t => t.value === experience.type)?.label || 'אחר';

  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    
    // סימולציה של הוספת תגובה
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // כאן נוסיף לוגיקה לשמירת התגובה
    setNewComment('');
    setIsSubmitting(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('he-IL', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
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
            <div>
              <h1 className="text-xl font-bold text-gray-900 font-heading">{experience.placeName}</h1>
              <p className="text-sm text-gray-600">{typeLabel}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        {/* גלריית תמונות */}
        <div className="bg-white rounded-2xl shadow-soft overflow-hidden mb-6 border border-gray-100 animate-fade-in-up">
          <ImageGallery
            images={experience.images}
            placeName={experience.placeName}
            onClose={() => setShowFullscreenGallery(true)}
          />
        </div>

        {showFullscreenGallery && (
          <ImageGallery
            images={experience.images}
            placeName={experience.placeName}
            onClose={() => setShowFullscreenGallery(false)}
            isFullscreen={true}
          />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* תוכן ראשי */}
          <div className="lg:col-span-2 space-y-6">
            {/* פרטי החוויה */}
            <div className="bg-white rounded-2xl shadow-soft p-6 border border-gray-100 animate-fade-in-up">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2 font-heading">{experience.placeName}</h2>
                  <div className="flex items-center gap-4 text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-teal-500" />
                      <span>{experience.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-amber-500" />
                      <span>{formatDate(experience.createdAt)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <StarRating rating={experience.rating} size="md" readonly />
                    <span className="text-gray-600">({experience.rating}/5)</span>
                  </div>
                </div>
              </div>

              <div className="prose prose-gray max-w-none">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 font-heading">תיאור החוויה</h3>
                <p className="text-gray-700 leading-relaxed mb-6 whitespace-pre-wrap">
                  {experience.description}
                </p>

                <h3 className="text-lg font-semibold text-gray-900 mb-3 font-heading">המלצות וטיפים</h3>
                <div className="bg-gradient-to-r from-teal-50 to-mint-50 border border-teal-200 rounded-xl p-4 shadow-soft">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {experience.tips}
                  </p>
                </div>
              </div>
            </div>

            {/* תגובות */}
            <div className="bg-white rounded-2xl shadow-soft p-6 border border-gray-100 animate-fade-in-up">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 font-heading">
                תגובות ({experience.comments.length})
              </h3>

              <form onSubmit={handleSubmitComment} className="mb-6">
                <div className="flex gap-3">
                  <img
                    src={user?.profileImage || 'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop'}
                    alt={user?.fullName}
                    className="w-10 h-10 rounded-full object-cover flex-shrink-0 ring-2 ring-teal-100"
                  />
                  <div className="flex-1">
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="כתוב תגובה..."
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 text-right resize-none focus-ring shadow-sm"
                      dir="rtl"
                    />
                    <div className="flex justify-end mt-2">
                      <button
                        type="submit"
                        disabled={!newComment.trim() || isSubmitting}
                        className="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-xl hover:bg-teal-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed btn-hover-lift shadow-soft"
                      >
                        <Send className="w-4 h-4" />
                        {isSubmitting ? 'שולח...' : 'שלח'}
                      </button>
                    </div>
                  </div>
                </div>
              </form>

              <div className="space-y-4">
                {experience.comments.length === 0 ? (
                  <div className="text-center py-8 animate-scale-in">
                    <p className="text-gray-500">
                    עדיין אין תגובות. היה הראשון להגיב!
                    </p>
                  </div>
                ) : (
                  experience.comments.map((comment) => (
                    <div key={comment.id} className="flex gap-3 p-4 bg-gray-50 rounded-xl animate-slide-in-right">
                      <img
                        src={comment.commenter.profileImage || 'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&fit=crop'}
                        alt={comment.commenter.fullName}
                        className="w-10 h-10 rounded-full object-cover flex-shrink-0 ring-1 ring-gray-200"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-gray-900">
                            {comment.commenter.fullName}
                          </span>
                          <span className="text-xs text-gray-500">
                            {formatDate(comment.createdAt)}
                          </span>
                        </div>
                        <p className="text-gray-700 whitespace-pre-wrap">
                          {comment.content}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* sidebar */}
          <div className="space-y-6">
            {/* פרטי המפרסם */}
            <div className="bg-white rounded-2xl shadow-soft p-6 border border-gray-100 animate-fade-in-up">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 font-heading">המליץ</h3>
              <div className="flex items-center gap-3">
                <img
                  src={experience.creator.profileImage || 'https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&fit=crop'}
                  alt={experience.creator.fullName}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-teal-100"
                />
                <div>
                  <h4 className="font-medium text-gray-900">{experience.creator.fullName}</h4>
                  <p className="text-sm text-gray-600">@{experience.creator.username}</p>
                </div>
              </div>
            </div>

            {/* מפה */}
            {experience.coordinates && (
              <div className="bg-white rounded-2xl shadow-soft p-6 border border-gray-100 animate-fade-in-up">
                <MiniMap
                  coordinates={experience.coordinates}
                  placeName={experience.placeName}
                  address={experience.location}
                />
              </div>
            )}

            {/* פרטים נוספים */}
            <div className="bg-white rounded-2xl shadow-soft p-6 border border-gray-100 animate-fade-in-up">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 font-heading">פרטים נוספים</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">קטגוריה:</span>
                  <span className="font-medium text-gray-900">{typeLabel}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">דירוג:</span>
                  <div className="flex items-center gap-2">
                    <StarRating rating={experience.rating} size="sm" readonly />
                    <span className="font-medium text-gray-900">({experience.rating}/5)</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">תגובות:</span>
                  <span className="font-medium text-gray-900">{experience.comments.length}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
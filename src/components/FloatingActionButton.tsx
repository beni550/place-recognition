import React from 'react';
import { Plus } from 'lucide-react';

interface FloatingActionButtonProps {
  onClick: () => void;
}

export function FloatingActionButton({ onClick }: FloatingActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 bg-teal-600 text-white p-4 rounded-full shadow-lg hover:bg-teal-700 hover:shadow-xl transform hover:scale-105 transition-all duration-300 z-40 group"
      aria-label="פרסם חוויה חדשה"
    >
      <Plus className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
    </button>
  );
}
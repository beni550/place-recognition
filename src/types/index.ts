export interface User {
  id: string;
  username: string;
  fullName: string;
  profileImage?: string;
  email: string;
  bio?: string;
}

export interface Experience {
  id: string;
  creatorId: string;
  creator: User;
  placeName: string;
  type: ExperienceType;
  location: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  description: string;
  tips: string;
  rating: number;
  images: string[];
  featuredImage: string;
  createdAt: string;
  comments: Comment[];
}

export interface Comment {
  id: string;
  commenterId: string;
  commenter: User;
  content: string;
  experienceId: string;
  createdAt: string;
}

export type ExperienceType = 
  | 'restaurant' 
  | 'cafe' 
  | 'nature' 
  | 'culture' 
  | 'attraction' 
  | 'nightlife' 
  | 'accommodation' 
  | 'shopping' 
  | 'other';

export const experienceTypes: { value: ExperienceType; label: string }[] = [
  { value: 'restaurant', label: 'מסעדה' },
  { value: 'cafe', label: 'בית קפה' },
  { value: 'nature', label: 'טיול טבע' },
  { value: 'culture', label: 'אתר היסטורי/תרבות' },
  { value: 'attraction', label: 'אטרקציה' },
  { value: 'nightlife', label: 'בילוי לילי' },
  { value: 'accommodation', label: 'לינה' },
  { value: 'shopping', label: 'קניות' },
  { value: 'other', label: 'אחר' },
];
import { User, Experience } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    username: 'yael_travel',
    fullName: 'יעל כהן',
    profileImage: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    email: 'yael@example.com',
    bio: 'אוהבת לטייל ולגלות מקומות חדשים. תמיד מחפשת את החוויה הבאה!'
  },
  {
    id: '2',
    username: 'omer_foodie',
    fullName: 'עומר לוי',
    profileImage: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    email: 'omer@example.com',
    bio: 'חובב אוכל וטבע. מאמין שהחיים טובים יותר עם אוכל טעים ונוף יפה.'
  },
  {
    id: '3',
    username: 'dana_explorer',
    fullName: 'דנה רוזן',
    profileImage: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    email: 'dana@example.com',
    bio: 'חוקרת עולם ואוהבת קפה. תמיד עם המצלמה מוכנה לתמונה הבאה.'
  }
];

export const mockExperiences: Experience[] = [
  {
    id: '1',
    creatorId: '1',
    creator: mockUsers[0],
    placeName: 'מסעדת פרנקו',
    type: 'restaurant',
    location: 'תל אביב - נמל',
    coordinates: { lat: 32.0853, lng: 34.7818 },
    description: 'מסעדה איטלקית מדהימה עם נוף לים. האווירה רומנטית והאוכל פשוט מושלם. ישבנו בטרסה והרגשנו כמו בחופשה באיטליה.',
    tips: 'מומלץ להזמין מקום מראש, במיוחד לסוף השבוע. הפסטה עם פטריות טריפל היא must! ויש חנייה בסביבה בתשלום.',
    rating: 5,
    images: [
      'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/914388/pexels-photo-914388.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    featuredImage: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: '2024-01-15T10:30:00Z',
    comments: [
      {
        id: '1',
        commenterId: '2',
        commenter: mockUsers[1],
        content: 'נשמע מדהים! חייב לנסות בפעם הבאה בתל אביב',
        experienceId: '1',
        createdAt: '2024-01-15T12:00:00Z'
      }
    ]
  },
  {
    id: '2',
    creatorId: '2',
    creator: mockUsers[1],
    placeName: 'שמורת עין גדי',
    type: 'nature',
    location: 'ים המלח',
    coordinates: { lat: 31.4618, lng: 35.3889 },
    description: 'טיול מדהים למפלי עין גדי. השביל נגיש לכולם והנוף פשוט עוצר נשימה. המים קרירים ומרעננים והטבע פשוט קסום.',
    tips: 'הגיעו מוקדם (7:00-8:00) כדי להימנע מהחום והקהל. קחו הרבה מים ומצלמה! יש שירותים ומזנון בכניסה.',
    rating: 4,
    images: [
      'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1591447/pexels-photo-1591447.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    featuredImage: 'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: '2024-01-10T08:00:00Z',
    comments: []
  },
  {
    id: '3',
    creatorId: '3',
    creator: mockUsers[2],
    placeName: 'קפה נורדוי',
    type: 'cafe',
    location: 'תל אביב - שינקין',
    coordinates: { lat: 32.0668, lng: 34.7758 },
    description: 'בית קפה קסום ברחוב שינקין עם אווירה בוהמיינית. הקפה מעולה והמקום מושלם לעבודה או פגישות עם חברים.',
    tips: 'הקפה הקר שלהם עם חלב שקדים זה הכי טעים בעיר! יש WiFi חזק ומקומות ישיבה נוחים. פתוח עד מאוחר.',
    rating: 4,
    images: [
      'https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2074130/pexels-photo-2074130.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    featuredImage: 'https://images.pexels.com/photos/1307698/pexels-photo-1307698.jpeg?auto=compress&cs=tinysrgb&w=800',
    createdAt: '2024-01-08T14:20:00Z',
    comments: [
      {
        id: '2',
        commenterId: '1',
        commenter: mockUsers[0],
        content: 'אוהבת את המקום הזה! הקפה באמת מעולה ❤️',
        experienceId: '3',
        createdAt: '2024-01-08T16:30:00Z'
      }
    ]
  }
];
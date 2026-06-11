export type CategoryType = 'lounging' | 'gathering' | 'studying';

export interface Dimensions {
  length: number; // in cm
  width: number;
  height: number;
  unit: string;
}

export interface FurnitureItem {
  id: string;
  name: string;
  category: CategoryType;
  price: number;
  image: string;
  description: string;
  details: string[];
  dimensions: Dimensions;
  materials: string[]; // fabric materials available
  woods: string[];     // wood finish options
  metals: string[];    // metallic detail finishes
}

export interface ActiveAtelierItem {
  id: string; // unique placement ID
  itemId: string; // references static FurnitureItem id
  name: string;
  image: string;
  x: number; // percentage coordinate 0-100
  y: number; // percentage coordinate 0-100
  scale: number; // scaling multiplier (0.5 to 1.5)
  rotation: number; // degrees 0-360
  material: string;
  wood: string;
}

export interface SavedAtelierRoom {
  id: string;
  name: string;
  background: 'studio' | 'parisian' | 'concrete';
  items: ActiveAtelierItem[];
  createdAt: string;
}

export interface CustomConfig {
  itemId: string;
  name: string;
  length: number;
  width: number;
  height: number;
  material: string;
  wood: string;
  metal: string;
  notes: string;
  price: number;
}

export interface GoogleReview {
  id: string;
  author: string;
  rating: number;
  text: string;
  timeAgo: string;
  isLocalGuide: boolean;
  guideInfo?: string;
  reply?: string;
}

export interface ConsultationBooking {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  type: 'in-person' | 'virtual';
  projectDetails: string;
  createdAt: string;
}

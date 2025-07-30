export interface User {
  id: string;
  email: string;
  isPremium: boolean;
  premiumExpiry?: Date;
  voiceSettings?: {
    pitch: number;
    speed: number;
    voice: string;
  };
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface GestureResult {
  text: string;
  confidence: number;
  timestamp: Date;
}

export interface PremiumPlan {
  id: string;
  name: string;
  price: number;
  duration: string;
  features: string[];
  popular?: boolean;
}
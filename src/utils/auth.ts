import { User, AuthState } from '../types';

// Mock authentication functions - in production, these would connect to a real backend
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'demo@example.com',
    isPremium: true,
    premiumExpiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    voiceSettings: {
      pitch: 1,
      speed: 1,
      voice: 'female-1'
    }
  }
];

export const authenticateUser = (email: string, password: string): Promise<User | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = mockUsers.find(u => u.email === email);
      if (user && password === 'demo123') {
        resolve(user);
      } else {
        resolve(null);
      }
    }, 1000);
  });
};

export const registerUser = (email: string, password: string): Promise<User | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newUser: User = {
        id: Date.now().toString(),
        email,
        isPremium: false,
        voiceSettings: {
          pitch: 1,
          speed: 1,
          voice: 'female-1'
        }
      };
      mockUsers.push(newUser);
      resolve(newUser);
    }, 1000);
  });
};

export const upgradeToPremium = (userId: string, planId: string): Promise<boolean> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const user = mockUsers.find(u => u.id === userId);
      if (user) {
        user.isPremium = true;
        user.premiumExpiry = new Date(Date.now() + (planId === 'yearly' ? 365 : 30) * 24 * 60 * 60 * 1000);
        resolve(true);
      } else {
        resolve(false);
      }
    }, 1500);
  });
};
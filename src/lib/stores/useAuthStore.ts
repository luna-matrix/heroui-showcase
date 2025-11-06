import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AuthState, User, LoginCredentials, UpdateProfileData } from '@/lib/types';

// Mock user data
const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Developer',
    email: 'john@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john',
    role: 'admin',
    preferences: {
      theme: 'light',
      device: 'ipad-air'
    }
  },
  {
    id: '2',
    name: 'Sarah Designer',
    email: 'sarah@example.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah',
    role: 'user',
    preferences: {
      theme: 'dark',
      device: 'iphone-14-pro'
    }
  }
];

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true });
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock authentication logic
        const user = mockUsers.find(
          u => u.email === credentials.email
        );
        
        if (user && credentials.password === 'password') {
          set({ 
            user, 
            isAuthenticated: true, 
            isLoading: false 
          });
        } else {
          set({ isLoading: false });
          throw new Error('Invalid credentials');
        }
      },

      logout: () => {
        set({ 
          user: null, 
          isAuthenticated: false 
        });
      },

      updateProfile: async (data: UpdateProfileData) => {
        set({ isLoading: true });
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const currentUser = get().user;
        if (currentUser) {
          const updatedUser = {
            ...currentUser,
            ...data,
            preferences: {
              ...currentUser.preferences,
              ...data.preferences
            }
          };
          
          set({ 
            user: updatedUser, 
            isLoading: false 
          });
        }
      }
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);

// Helper hooks
export const useCurrentUser = () => {
  return useAuthStore((state) => state.user);
};

export const useIsAuthenticated = () => {
  return useAuthStore((state) => state.isAuthenticated);
};

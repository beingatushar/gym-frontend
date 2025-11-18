import { toast } from 'react-hot-toast';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { loginUser, signupUser } from '../services/apiService';
import { LoginCredentials, SignupCredentials, User } from '../types/auth.types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  signup: (credentials: SignupCredentials) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (credentials) => {
        set({ isLoading: true });
        try {
          const response = await loginUser(credentials);
          const { user, token } = response;
          // Save token to localStorage for the API interceptor
          localStorage.setItem('auth-token', token);

          set({ user, token, isAuthenticated: true, isLoading: false });
          toast.success(`Welcome back, ${user.name}!`);
        } catch (error: any) {
          set({ isLoading: false });
          const message = error.message || 'Login failed';
          toast.error(message);
          throw error;
        }
      },

      signup: async (credentials) => {
        set({ isLoading: true });
        try {
          const response = await signupUser(credentials);
          const { user, token } = response;
          // Save token to localStorage for the API interceptor
          localStorage.setItem('auth-token', token);

          set({ user, token, isAuthenticated: true, isLoading: false });
          toast.success('Account created successfully!');
        } catch (error: any) {
          set({ isLoading: false });
          const message = error.message || 'Signup failed';
          toast.error(message);
          throw error;
        }
      },

      logout: () => {
        localStorage.removeItem('auth-token');
        set({ user: null, token: null, isAuthenticated: false });
        toast.success('Logged out successfully');
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

import { deleteCookie } from 'cookies-next';
import { create } from 'zustand';

export interface IUser {
  name: string;
  id: number;
  email: string;
  role: number;
}

interface IAuthStore {
  user: IUser | null;
  onAuthSuccess: (user: IUser | null) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<IAuthStore>((set) => ({
  user: null,
  onAuthSuccess: (payload) => set(() => ({ user: payload })),
  clearAuth: () => {
    (set(() => ({ user: null })), deleteCookie('access_token'));
  },
}));

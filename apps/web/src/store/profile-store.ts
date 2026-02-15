import { create } from 'zustand';

interface CounterState {
  isProfile: boolean;
  isOpen: () => void;
  isClose: () => void;
}

export const useProfileStore = create<CounterState>((set) => ({
  isProfile: false,
  isOpen: () =>
    set((state) => ({
      isProfile: (state.isProfile = true),
    })),
  isClose: () =>
    set((state) => ({
      isProfile: (state.isProfile = false),
    })),
}));

import { create } from 'zustand';

interface CounterState {
  isNavbar: boolean;
  isOpen: () => void;
  isClose: () => void;
}

export const useNavbarStore = create<CounterState>((set) => ({
  isNavbar: false,
  isOpen: () =>
    set((state) => ({
      isNavbar: (state.isNavbar = true),
    })),
  isClose: () =>
    set((state) => ({
      isNavbar: (state.isNavbar = false),
    })),
}));

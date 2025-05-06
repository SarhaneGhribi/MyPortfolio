import { useState, useEffect } from 'react';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type AppState = {
  [key: string]: any;
};

type OpenApp = {
  id: string;
  name: string;
  icon: string;
  state: AppState;
};

type AppStore = {
  openApps: OpenApp[];
  activeApp: string | null;
  addOpenApp: (app: Omit<OpenApp, 'state'>) => void;
  closeApp: (id: string) => void;
  setActiveApp: (id: string) => void;
  updateAppState: (id: string, state: AppState) => void;
  closeAllApps: () => void;
};

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      openApps: [],
      activeApp: null,

      addOpenApp: (app) =>
        set((state) => ({
          openApps: [...state.openApps, { ...app, state: {} }],
          activeApp: app.id,
        })),

      closeApp: (id) =>
        set((state) => ({
          openApps: state.openApps.filter((app) => app.id !== id),
          activeApp: state.activeApp === id ? null : state.activeApp,
        })),

      setActiveApp: (id) => set({ activeApp: id }),

      updateAppState: (id, newState) =>
        set((state) => ({
          openApps: state.openApps.map((app) =>
            app.id === id ? { ...app, state: { ...app.state, ...newState } } : app
          ),
        })),

      closeAllApps: () => set({ openApps: [], activeApp: null }),
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// Custom hook to handle hydration
export const useHydratedAppStore = () => {
  const store = useAppStore();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated ? store : {
    ...store,
    openApps: [],
    activeApp: null,
    addOpenApp: () => {},
    closeApp: () => {},
    setActiveApp: () => {},
    updateAppState: () => {},
    closeAllApps: () => {},
  };
};
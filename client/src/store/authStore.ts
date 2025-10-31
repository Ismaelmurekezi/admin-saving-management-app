import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface Admin {
  id: string;
  email: string;
  role: string;
}

interface AuthState {
  admin: Admin | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (admin: Admin, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      admin: null,
      token: null,
      isAuthenticated: false,
      login: (admin, token) => set({ admin, token, isAuthenticated: true }),
      logout: () => set({ admin: null, token: null, isAuthenticated: false }),
    }),
    {
      name: "admin-auth",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

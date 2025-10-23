import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type UserStoreType = {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  provider: string;
  hasOnboarded: boolean;
  setUser: (user: Partial<UserStoreType>) => void;
  clearUser: () => void;
  setOnboarded: (status: boolean) => void;
};

export const useUserStore = create(
  persist<UserStoreType>(
    (set) => ({
      uid: "",
      firstName: "",
      lastName: "",
      email: "",
      provider: "",
      hasOnboarded: false,
      setUser: (user: any) => set(() => ({ ...user })),
      clearUser: () =>
        set((state) => ({
          uid: "",
          firstName: "",
          lastName: "",
          email: "",
          provider: "",
          hasOnboarded: state.hasOnboarded,
        })),
      setOnboarded: (status: boolean) => set(() => ({ hasOnboarded: status })),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

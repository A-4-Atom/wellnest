import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type UserStore = {
    uid: string;
    firstName: string;
    lastName: string;
    email: string;
    provider: string;
    hasOnboarded: boolean;
    setUser: (user: Partial<UserStore>) => void;
    clearUser: () => void;
    setOnboarded: (status: boolean) => void;
    registeredOn: string;
};

export const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      uid: "",
      firstName: "",
      lastName: "",
      email: "",
      provider: "",
      hasOnboarded: false,
      registeredOn: "",
      setUser: (user: any) => set(() => ({ ...user })),
      clearUser: () => set(() => ({ uid: "", firstName: "", lastName: "", email: "", provider: "", hasOnboarded: false, registeredOn: "" })),
      setOnboarded: (status: boolean) => set(() => ({ hasOnboarded: status })),
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

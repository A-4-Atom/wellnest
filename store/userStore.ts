import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type UserStore = {
    user: string
};

export const useUserStore = create(
  persist<UserStore>(
    (set) => ({
      user: "vikas",
    }),
    {
      name: "user-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

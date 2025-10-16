import { getAuth, onAuthStateChanged } from "@react-native-firebase/auth";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-gesture-handler";
import "react-native-reanimated";
import "../global.css";
import { useUserStore } from "../store/userStore";

export default function RootLayout() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const router = useRouter();
  const hasOnboarded = useUserStore((state) => state.hasOnboarded);

  useEffect(() => {
    function handleAuthStateChanged(user: any) {
      setUser(user);
      if (initializing) setInitializing(false);
    }
    const subscriber = onAuthStateChanged(getAuth(), handleAuthStateChanged);
    return subscriber;
  }, [initializing, user]);

  useEffect(() => {
    if (!initializing) {
      if (!hasOnboarded) {
        router.replace("/onboarding");
      } else if (!user) {
        router.replace("/login");
      } else {
        router.replace("/(tabs)");
      }
    }
  }, [initializing, user, router, hasOnboarded]);

  return (
    <>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#6c47ff",
          },
          headerTintColor: " #FFF",
          headerBackTitle: "Back",
        }}
      >
        <Stack.Screen
          name="onboarding"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="login"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="register"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
      <StatusBar style="dark" />
    </>
  );
}

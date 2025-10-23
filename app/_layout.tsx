import {
  FirebaseAuthTypes,
  getAuth,
  onAuthStateChanged,
} from "@react-native-firebase/auth";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-gesture-handler";
import "react-native-reanimated";
import "../global.css";
import { useUserStore } from "../store/userStore";

export default function RootLayout() {
  const [initializing, setInitializing] = useState(true);
  const setUser = useUserStore((state) => state.setUser);
  const uid = useUserStore((state) => state.uid);
  const hasOnboarded = useUserStore((state) => state.hasOnboarded);
  const router = useRouter();

  useEffect(() => {
    function handleAuthStateChanged(user: FirebaseAuthTypes.User | null) {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email ?? "",
          firstName: user.displayName ?? "",
          provider: user.providerData?.[0]?.providerId ?? "",
          registeredOn: new Date().toISOString(),
        });
      }
      setInitializing(false);
    }
    const subscriber = onAuthStateChanged(getAuth(), handleAuthStateChanged);
    return subscriber;
  }, [initializing, setUser]);

  useEffect(() => {
    if (!initializing) {
      if (!hasOnboarded) {
        router.replace("/onboarding");
      } else if (!uid) {
        router.replace("/login");
      } else {
        router.replace("/(tabs)");
      }
    }
  }, [initializing, uid, router, hasOnboarded]);

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

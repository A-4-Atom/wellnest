import { getAuth, onAuthStateChanged } from "@react-native-firebase/auth";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-gesture-handler";
import "react-native-reanimated";
import "../global.css";

export default function RootLayout() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const router = useRouter();

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
      if (!user) {
        router.replace("/login");
      } else {
        router.replace("/(tabs)/home");
      }
    }
  }, [initializing, user, router]);

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

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-gesture-handler";
import "react-native-reanimated";
import "../global.css";


export default function RootLayout() {

  return (
    <>
      <Stack screenOptions={{
        headerStyle: {
          backgroundColor: "#6c47ff"
        },
        headerTintColor: " #FFF",
        headerBackTitle: "Back"
      }}>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false
          }}
        />
        <Stack.Screen
          name="register"
          options={{
            headerShown: false
          }}
        />
      </Stack>
      <StatusBar style="dark" />
    </>
  );
}

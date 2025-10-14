import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-gesture-handler";
import "react-native-reanimated";
import "../global.css";


export default function RootLayout() {

  return (
    <>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false
          }}
        />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}

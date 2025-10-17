import { GoogleSignin } from "@react-native-google-signin/google-signin";

export function configureGoogleSignin() {
  GoogleSignin.configure({
    webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID || "",
  });
}

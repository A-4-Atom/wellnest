// Formats user object for userStore from Firebase userCredential
// Handles Firebase auth errors and shows user-friendly messages
import { firebase } from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { Alert } from "react-native";
import { useUserStore } from "../store/userStore";
export function formatUserFromCredential(
  userCredential: any,
  provider: string,
  firstName?: string
) {
  return {
    uid: userCredential.user.uid,
    email: userCredential.user.email ?? undefined,
    firstName: firstName ?? userCredential.user.displayName ?? "",
    lastName: "",
    provider,
    hasOnboarded: false,
  };
}

export function errorHandler(e: any) {
  let errorMessage = "";
  if (e.code === "auth/wrong-password") {
    errorMessage = "Incorrect password. Please try again.";
  } else if (e.code === "auth/user-not-found") {
    errorMessage = "No account found with this email.";
  } else if (e.code === "auth/invalid-email") {
    errorMessage = "The email address is badly formatted.";
  } else {
    errorMessage = e.message || "An unknown error occurred.";
  }
  Alert.alert("Error", errorMessage);
}

export async function handleGoogleSignIn() {
  const setUser = useUserStore.getState().setUser;
  try {
    await GoogleSignin.hasPlayServices();
    const signInResult = await GoogleSignin.signIn();
    const idToken = signInResult.data?.idToken;
    if (!idToken) {
      Alert.alert("Error", "Failed to get ID token from Google Sign-In");
      return;
    }
    const googleCredential =
      firebase.auth.GoogleAuthProvider.credential(idToken);
    const userCredential = await firebase
      .auth()
      .signInWithCredential(googleCredential);
    setUser({
      uid: userCredential.user.uid,
      email: userCredential.user.email ?? undefined,
      firstName: userCredential.user.displayName ?? "",
      lastName: "",
      provider: "google",
      hasOnboarded: false,
      registeredOn: new Date().toISOString(),
    });
  } catch (error: any) {
    console.log(error.message);
    Alert.alert("Error", error.message);
  }
}

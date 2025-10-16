// Formats user object for userStore from Firebase userCredential
// Handles Firebase auth errors and shows user-friendly messages
import { firebase } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { Alert } from "react-native";
import { useUserStore } from "../store/userStore";

export function formatUserFromCredential(
  userCredential: any,
  provider: string,
  firstName?: string
) {
  // Get the current hasOnboarded value from the store
  const hasOnboarded = useUserStore.getState().hasOnboarded;
  return {
    uid: userCredential.user.uid,
    email: userCredential.user.email ?? undefined,
    firstName: firstName ?? userCredential.user.displayName ?? "",
    lastName: "",
    provider,
    hasOnboarded,
    registeredOn: new Date().toISOString(),
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
    const hasOnboarded = useUserStore.getState().hasOnboarded;
    const formattedUser = {
      uid: userCredential.user.uid,
      email: userCredential.user.email ?? undefined,
      firstName: userCredential.user.displayName ?? "",
      lastName: "",
      provider: "google",
      hasOnboarded,
      registeredOn: new Date().toISOString(),
    };
    setUser(formattedUser);
    await addUserToFirestore({
      uid: formattedUser.uid,
      firstName: formattedUser.firstName,
      lastName: formattedUser.lastName,
      provider: formattedUser.provider,
      registeredOn: formattedUser.registeredOn,
    });
  } catch (error: any) {
    console.log(error.message);
    Alert.alert("Error", error.message);
  }
}

export async function addUserToFirestore({
  uid,
  firstName,
  lastName = "",
  provider,
  registeredOn,
}: {
  uid: string;
  firstName: string;
  lastName?: string;
  provider: string;
  registeredOn: string;
}) {
  try {
    if (!uid) {
      return;
    }
    await firestore().collection("users").doc(uid).set({
      uid,
      firstName,
      lastName,
      provider,
      registered: registeredOn,
    });
  } catch (e: any) {
    console.log("Firestore error:", e.message);
  }
}

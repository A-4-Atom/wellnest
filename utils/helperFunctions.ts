import { firebase } from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { Alert } from "react-native";
import { useUserStore } from "../store/userStore";

export function formatUserFromCredential(
  userCredential: any,
  provider: string,
  firstName?: string,
  lastName?: string
) {
  const hasOnboarded = useUserStore.getState().hasOnboarded;
  return {
    uid: userCredential.user.uid,
    email: userCredential.user.email ?? undefined,
    firstName: firstName ?? userCredential.user.displayName ?? "",
    lastName: lastName ?? "",
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
    // Split displayName into first and last name
    const displayName = userCredential.user.displayName || "";
    const nameParts = displayName.trim().split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

    // Check if user already exists in Firestore
    const userDoc = await firestore()
      .collection("users")
      .doc(userCredential.user.uid)
      .get();
    let registeredOn = new Date().toISOString();
    const userData = userDoc.data();
    if (userData && userData.registered) {
      registeredOn = userData.registered;
    }

    const formattedUser = {
      uid: userCredential.user.uid,
      email: userCredential.user.email ?? undefined,
      firstName,
      lastName,
      provider: "google",
      hasOnboarded,
      registeredOn,
    };
    setUser(formattedUser);
    await addUserToFirestore({
      uid: formattedUser.uid,
      email: formattedUser.email || "",
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
  email,
}: {
  uid: string;
  firstName: string;
  lastName?: string;
  provider: string;
  registeredOn: string;
  email: string;
}) {
  try {
    if (!uid) {
      return;
    }
    await firestore().collection("users").doc(uid).set({
      uid,
      email,
      firstName,
      lastName,
      provider,
      registered: registeredOn,
    });
  } catch (e: any) {
    console.log("Firestore error:", e.message);
  }
}

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { getAuth, signOut } from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import React, { useEffect } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { useUserStore } from "../../store/userStore";
import { configureGoogleSignin } from "../../utils/googleSigninConfig";

const Profile = () => {
  const userName = useUserStore((state) => state.firstName);
  const clearUser = useUserStore((state) => state.clearUser);

  useEffect(() => {
    configureGoogleSignin();
  }, []);

  async function handleLogout() {
    try {
      await signOut(getAuth());
      await GoogleSignin.signOut();
      clearUser();
    } catch (e) {
      Alert.alert("Error", "Failed to log out. Please try again." + e);
    }
  }

  return (
    <View className="flex items-center justify-center h-full gap-4">
      <Text>{`Logged in as: ${userName}`}</Text>
      <Text>Logout</Text>
      <Pressable onPress={handleLogout}>
        <MaterialCommunityIcons name="logout" size={24} color="black" />
      </Pressable>
    </View>
  );
};

export default Profile;

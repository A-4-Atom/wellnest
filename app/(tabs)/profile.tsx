import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React from "react";
import { Pressable, Text, View, Alert } from "react-native";
import {getAuth, signOut} from "@react-native-firebase/auth";

const Profile = () => {
  async function handleLogout() {
    try {
      await signOut(getAuth());
    } catch (e) {
      Alert.alert("Error", "Failed to log out. Please try again." + e);
    }
  }
  return (
    <View className="flex items-center justify-center h-full gap-4">
      <Text>Logout</Text>
      <Pressable onPress={handleLogout}>
        <MaterialCommunityIcons name="logout" size={24} color="black" />
      </Pressable>
    </View>
  );
};

export default Profile;

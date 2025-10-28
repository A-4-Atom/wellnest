import { sendEmailVerification } from "@react-native-firebase/auth";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { auth } from "../../utils/firebase";
import { errorHandler } from "../../utils/helperFunctions";

const Home = () => {
  async function verifyEmail() {
    try {
      if (auth.currentUser) {
        await sendEmailVerification(auth.currentUser);
      } else {
        throw new Error("No user is currently signed in.");
      }
    } catch (e) {
      errorHandler(e);
    }
  }
  return (
    <View className="flex items-center justify-center h-full bg-background">
      <Text>Home</Text>
      <TouchableOpacity
        className="mt-4 p-3 bg-primary rounded-md"
        onPress={verifyEmail}
      >
        <Text className="text-white">Verify Email</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

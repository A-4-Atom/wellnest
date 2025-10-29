import { sendEmailVerification } from "@react-native-firebase/auth";
import { crash, getCrashlytics, log } from "@react-native-firebase/crashlytics";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { auth } from "../../utils/firebase";
import { errorHandler } from "../../utils/helperFunctions";
import mixpanel from "@/utils/mixpanel";

const Home = () => {
  function testCrashlytics() {
    const crashlytics = getCrashlytics();
    log(crashlytics, "Testing a crash");
    crash(crashlytics);
  }
  async function verifyEmail() {
    try {
      if (auth.currentUser) {
        await sendEmailVerification(auth.currentUser);
      } else {
        throw new Error("No user is currently signed in.");
      }
      mixpanel.track('Email Verification Sent', {
        "User ID": auth.currentUser?.uid
      })
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
      <TouchableOpacity
        className="mt-4 p-3 bg-primary rounded-md"
        onPress={testCrashlytics}
      >
        <Text className="text-white">Test Crashlytics</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;

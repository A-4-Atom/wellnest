import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "@react-native-firebase/auth";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { configureGoogleSignin } from "../utils/googleSigninConfig";

import { useUserStore } from "../store/userStore";
import {
  errorHandler,
  formatUserFromCredential,
  handleGoogleSignIn,
} from "../utils/helperFunctions";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    configureGoogleSignin();
  }, []);

  async function handleLogin() {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }
    try {
      const userCredential = await signInWithEmailAndPassword(
        getAuth(),
        email.trim(),
        password.trim()
      );
      setUser(formatUserFromCredential(userCredential, "email"));
    } catch (e: any) {
      errorHandler(e);
    }
  }

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled"
      enableAutomaticScroll
      enableOnAndroid
      className="flex-1 bg-background"
    >
      <View className="flex flex-col gap-4 p-4 h-full mt-5">
        <View className="w-full flex items-center justify-center p-20">
          <FontAwesome name="user-circle" size={100} color="#6c47ff" />
        </View>
        <Text className="font-bold text-3xl mt-5">Login</Text>
        <TextInput
          className="border-2 border-primary rounded-md p-3 text-black"
          autoCapitalize="none"
          placeholder="Enter Your Email"
          placeholderTextColor="#000"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          className="border-2 border-primary rounded-md p-3 text-black"
          autoCapitalize="none"
          placeholder="Enter Your Password"
          placeholderTextColor="#000"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity
          className=" bg-primary p-3 rounded-md"
          onPress={handleLogin}
        >
          <Text className="text-white text-center text-xl font-bold">
            Login
          </Text>
        </TouchableOpacity>
        <Text className="text-center font-semibold">OR</Text>
        <TouchableOpacity
          className="flex-row items-center justify-center gap-5 border-2 border-primary p-3"
          onPress={handleGoogleSignIn}
        >
          <AntDesign name="google" size={24} color="#6c47ff" />
          <Text className="text-xl font-semibold text-primary">
            Continue with Google
          </Text>
        </TouchableOpacity>
        <Text className="text-center text-md mt-2">
          Don&apos;t have an account?{" "}
          <Link href="/register">
            <Text className="font-bold">Register</Text>
          </Link>{" "}
          here.
        </Text>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Login;

import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "@react-native-firebase/auth";
import { Link } from "expo-router";
import { useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  async function handleLogin() {
    if(!email.trim() || !password.trim()) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }
    try {
      await signInWithEmailAndPassword(getAuth(), email.trim(), password.trim());
    } catch (e: any) {
        let errorMessage = "";
        if(e.code === 'auth/wrong-password'){
          errorMessage = "Incorrect password. Please try again.";
        }else if(e.code === 'auth/user-not-found'){
            errorMessage = "No account found with this email.";
        } else if (e.code === 'auth/invalid-email') {
            errorMessage = "The email address is badly formatted.";
        } else {
            errorMessage = e.message;
        }
      Alert.alert("Error", errorMessage);
    }
  }

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled"
      enableAutomaticScroll
      enableOnAndroid
      className="flex-1"
    >
      <View className="flex flex-col gap-4 p-4 h-full mt-5">
        <View className="w-full flex items-center justify-center p-20">
          <FontAwesome name="user-circle" size={100} color="#6c47ff" />
        </View>
        <Text className="font-bold text-3xl mt-5">Login</Text>
        <TextInput
          className="border-2 border-[#6c47ff] rounded-md p-3 text-black"
          autoCapitalize="none"
          placeholder="Enter Your Email"
          placeholderTextColor="#000"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          className="border-2 border-[#6c47ff] rounded-md p-3 text-black"
          autoCapitalize="none"
          placeholder="Enter Your Password"
          placeholderTextColor="#000"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity
          className=" bg-[#6c47ff] p-3 rounded-md"
          onPress={handleLogin}
        >
          <Text className="text-white text-center text-xl font-bold">
            Login
          </Text>
        </TouchableOpacity>
        <Text className="text-center font-semibold">OR</Text>
        <TouchableOpacity className="flex-row items-center justify-center gap-5 border-2 border-[#6c47ff] p-3">
          <AntDesign name="google" size={24} color="#6c47ff" className="" />
          <Text className="text-xl font-semibold text-[#6c47ff]">
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

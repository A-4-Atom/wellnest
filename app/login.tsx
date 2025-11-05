import FontAwesome from "@expo/vector-icons/FontAwesome";
import { signInWithEmailAndPassword } from "@react-native-firebase/auth";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import FormInput from "../components/FormInput";
import GoogleSignInButton from "../components/GoogleSignInButton";
import { useUserStore } from "../store/userStore";
import { auth } from "../utils/firebase";
import { configureGoogleSignin } from "../utils/googleSigninConfig";
import {
  errorHandler,
  formatUserFromCredential,
} from "../utils/helperFunctions";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    configureGoogleSignin();
  }, []);

  const handleChange = (key: "email" | "password", value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  async function handleLogin() {
    const { email, password } = form;
    if (!email.trim() || !password.trim()) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email.trim(),
        password.trim()
      );
      setUser(formatUserFromCredential(userCredential));
    } catch (e) {
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
        <FormInput
          autoCapitalize="none"
          placeholder="Enter Your Email"
          value={form.email}
          onChangeText={(val) => handleChange("email", val)}
          keyboardType="email-address"
        />
        <FormInput
          autoCapitalize="none"
          placeholder="Enter Your Password"
          value={form.password}
          onChangeText={(val) => handleChange("password", val)}
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
        <GoogleSignInButton mode="login"/>
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

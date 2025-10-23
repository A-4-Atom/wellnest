import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import {
  createUserWithEmailAndPassword,
  reload,
  updateProfile,
} from "@react-native-firebase/auth";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Text, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Button from "../components/Button";
import FormInput from "../components/FormInput";
import GoogleSignInButton from "../components/GoogleSignInButton";
import { useUserStore } from "../store/userStore";
import { auth } from "../utils/firebase";
import { configureGoogleSignin } from "../utils/googleSigninConfig";
import {
  addUserToFirestore,
  errorHandler,
  formatUserFromCredential,
} from "../utils/helperFunctions";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const handleChange = (key: "name" | "email" | "password", value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    configureGoogleSignin();
  }, []);

  function isValidEmail(email: string) {
    // Simple email regex for validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  async function handleRegister() {
    const { name, email, password } = form;
    if (!email.trim() || !password.trim() || !name.trim()) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }
    if (!isValidEmail(email.trim())) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        password.trim()
      );

      await updateProfile(userCredential.user, { displayName: name.trim() });
      await reload(userCredential.user);

      if (!auth.currentUser) {
        Alert.alert("Error", "User not found after registration.");
        return;
      }
      const formattedUser = formatUserFromCredential(auth.currentUser);

      setUser(formattedUser);
      await addUserToFirestore({
        uid: formattedUser.uid,
        email: formattedUser.email || "",
        firstName: formattedUser.firstName,
        lastName: formattedUser.lastName,
        provider: formattedUser.provider,
        registeredOn: new Date().toISOString(),
      });
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
          <FontAwesome5 name="user-plus" size={100} color="#6c47ff" />
        </View>
        <Text className="font-bold text-3xl mt-5">Register</Text>
        <FormInput
          autoCapitalize="none"
          placeholder="Enter Your Name"
          value={form.name}
          onChangeText={(val) => handleChange("name", val)}
        />
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
        <Button text="Register" onPress={handleRegister} />
        <Text className="text-center font-semibold">OR</Text>
        <GoogleSignInButton />
        <Text className="text-center text-md mt-2">
          Already Have An Account?{" "}
          <Link href="/login">
            <Text className="font-bold">Login</Text>
          </Link>{" "}
          here.
        </Text>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Register;

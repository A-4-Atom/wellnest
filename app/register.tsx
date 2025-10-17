// ...existing code...
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import {
  createUserWithEmailAndPassword,
  getAuth,
} from "@react-native-firebase/auth";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Text, TextInput, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Button from "../components/Button";
import GoogleSignInButton from "../components/GoogleSignInButton";
import { useUserStore } from "../store/userStore";
import { configureGoogleSignin } from "../utils/googleSigninConfig";
import {
  addUserToFirestore,
  errorHandler,
  formatUserFromCredential,
} from "../utils/helperFunctions";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const setUser = useUserStore((state) => state.setUser);

  useEffect(() => {
    configureGoogleSignin();
  }, []);

  async function handleRegister() {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }
    try {
      // Split name into first and last name
      const nameParts = name.trim().split(" ");
      const firstName = nameParts[0] || "";
      const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

      const userCredential = await createUserWithEmailAndPassword(
        getAuth(),
        email.trim(),
        password.trim()
      );

      const formattedUser = {
        ...formatUserFromCredential(userCredential, "email", firstName),
        lastName,
      };
      setUser(formattedUser);
      await addUserToFirestore({
        uid: formattedUser.uid,
        email: formattedUser.email,
        firstName: formattedUser.firstName,
        lastName: formattedUser.lastName,
        provider: formattedUser.provider,
        registeredOn: formattedUser.registeredOn,
      });
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
          <FontAwesome5 name="user-plus" size={100} color="#6c47ff" />
        </View>
        <Text className="font-bold text-3xl mt-5">Register</Text>
        <TextInput
          className="border-2 border-primary rounded-md p-3 text-black"
          autoCapitalize="none"
          placeholder="Enter Your Name"
          placeholderTextColor="#000"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          className="border-2 border-primary rounded-md p-3 text-black"
          autoCapitalize="none"
          placeholder="Enter Your Email"
          placeholderTextColor="#000"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
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

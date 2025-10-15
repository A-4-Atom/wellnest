import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Link } from "expo-router";
import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled"
      enableAutomaticScroll
      enableOnAndroid
      className="flex-1"
    >
      <View className="flex flex-col gap-4 p-4 h-full mt-5">
        <View className="w-full flex items-center justify-center p-20">
          <FontAwesome5 name="user-plus" size={100} color="#6c47ff" />
        </View>
        <Text className="font-bold text-3xl mt-5">Register</Text>
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
        />
        <TouchableOpacity className=" bg-[#6c47ff] p-3 rounded-md">
          <Text className="text-white text-center text-xl font-bold">
            Register
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
          Already Have An Account?{" "}
          <Link href="/">
            <Text className="font-bold">Login</Text>
          </Link>{" "}
          here.
        </Text>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Register;

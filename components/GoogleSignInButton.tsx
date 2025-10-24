import AntDesign from "@expo/vector-icons/AntDesign";
import { Text, TouchableOpacity } from "react-native";
import { handleGoogleSignIn } from "../utils/helperFunctions";

const GoogleSignInButton = ({ mode }: { mode: "login" | "register" }) => (
  <TouchableOpacity
    className="flex-row items-center justify-center gap-5 border-2 border-primary p-3"
    onPress={() => handleGoogleSignIn(mode)}
  >
    <AntDesign name="google" size={24} color="#6c47ff" />
    <Text className="text-xl font-semibold text-primary">
      Continue with Google
    </Text>
  </TouchableOpacity>
);

export default GoogleSignInButton;

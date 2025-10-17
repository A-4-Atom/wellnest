import React from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

interface ButtonProps extends TouchableOpacityProps {
  text: string;
  onPress: () => void;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  text,
  onPress,
  className = "bg-primary p-3 rounded-md",
  ...props
}) => {
  return (
    <TouchableOpacity className={className} onPress={onPress} {...props}>
      <Text className="text-white text-center text-xl font-bold">{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;

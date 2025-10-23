import React from "react";
import { TextInput, TextInputProps } from "react-native";

const FormInput = (props: TextInputProps) => (
  <TextInput
    className="border-2 border-primary rounded-md p-3 text-black"
    placeholderTextColor="#000"
    {...props}
  />
);

export default FormInput;

import React from "react";
import { Text, TextProps, StyleSheet } from "react-native";

// Define a type that extends the default TextProps with any additional custom props
interface CustomTextProps extends TextProps {
  bold?: boolean;
}

// Create the custom Text component
const AppText: React.FC<CustomTextProps> = ({ style, bold, ...props }) => {
  return (
    <Text
      style={[styles.text, bold ? styles.boldText : styles.regularText, style]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16, // Default font size, can be overridden via style prop
    color: "white",
  },
  regularText: {
    fontFamily: "Krub_400Regular",
  },
  boldText: {
    fontFamily: "Krub_600SemiBold",
  },
});

export default AppText;

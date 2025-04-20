import { ThemeContext } from "@/context/ThemeContext";
import React, { useContext } from "react";
import { Text, TextProps, StyleSheet } from "react-native";
import Colors from "@/constants/Colors";

// Define a type that extends the default TextProps with any additional custom props
interface CustomTextProps extends TextProps {
  bold?: boolean;
}

// Create the custom Text component
const AppText: React.FC<CustomTextProps> = ({ style, bold, ...props }) => {
  const { currentTheme, toggleTheme } = useContext(ThemeContext);

  const isDarkMode = currentTheme === "dark";
  const textColor = isDarkMode ? Colors.dark.text : Colors.light.text;

  return (
    <Text
      style={[
        styles.text,
        bold ? styles.boldText : styles.regularText,
        { color: textColor },
        style,
      ]}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
  },
  regularText: {
    fontFamily: "Krub_400Regular",
  },
  boldText: {
    fontFamily: "Krub_600SemiBold",
  },
});

export default AppText;

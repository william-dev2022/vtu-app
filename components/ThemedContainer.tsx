import { ThemeContext } from "@/context/ThemeContext";
import { StatusBar } from "expo-status-bar";
import { useContext } from "react";
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";

export default function ThemedContainer({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
}) {
  const { colorScheme, currentTheme } = useContext(ThemeContext);
  const { width, height } = Dimensions.get("window");
  const isDark = currentTheme === "dark";

  return (
    <View
      style={[
        {
          flex: 1,
          backgroundColor: isDark ? "#000" : colorScheme.background,
          paddingHorizontal: width * 0.04,
          paddingBottom: 10,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

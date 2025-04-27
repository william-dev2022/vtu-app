// Import necessary components and libraries
import { View, Switch, StyleSheet } from "react-native";
import React, { useContext } from "react";
import AppText from "./AppText";
import { ThemeContext } from "@/context/ThemeContext";
import Colors from "@/constants/Colors";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    borderRadius: 10,
    minHeight: 45,
  },
});

export default function SettingThemeToggle() {
  // Access theme context for current theme and toggle function
  const { currentTheme, toggleTheme } = useContext(ThemeContext);

  // Determine if the current theme is dark mode
  const isDarkMode = currentTheme === "dark";

  // Get the appropriate color scheme based on the current theme
  const colorScheme = currentTheme === "dark" ? Colors.dark : Colors.light;

  return (
    <View>
      {/* Container for the theme toggle switch */}
      <View
        style={[styles.container, { backgroundColor: colorScheme.secondary }]}
      >
        {/* Label for the toggle */}
        <AppText>Dark mode</AppText>

        {/* Switch to toggle between light and dark mode */}
        <Switch
          value={isDarkMode}
          onChange={() => toggleTheme()}
          trackColor={{
            true: colorScheme.switchTrackTrue,
            false: colorScheme.switchTrackFalse,
          }}
        />
      </View>
    </View>
  );
}

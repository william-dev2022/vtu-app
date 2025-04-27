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
  const { currentTheme, toggleTheme } = useContext(ThemeContext);

  const isDarkMode = currentTheme === "dark";

  const colorScheme = currentTheme === "dark" ? Colors.dark : Colors.light;

  return (
    <View>
      <View
        style={[styles.container, { backgroundColor: colorScheme.secondary }]}
      >
        <AppText>Dark mode</AppText>

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

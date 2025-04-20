import { View, Text, Switch } from "react-native";
import React, { useContext } from "react";
import AppText from "./AppText";
import { ThemeContext } from "@/context/ThemeContext";
import Colors from "@/constants/Colors";

export default function SettingThemeToggle() {
  const { currentTheme, toggleTheme } = useContext(ThemeContext);

  const isDarkMode = currentTheme === "dark";

  const colorScheme = currentTheme === "dark" ? Colors.dark : Colors.light;

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: colorScheme.secondary,
          paddingHorizontal: 10,
          borderRadius: 10,
        }}
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

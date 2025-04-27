// Import necessary components and libraries
import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import AppText from "./AppText";
import { ThemeContext } from "@/context/ThemeContext";
import Colors from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Define the props for the SettingsItemList component
type Props = {
  title: string; // Title of the setting item
  onPress: () => void; // Callback when the item is pressed
  iconText?: React.ComponentProps<typeof MaterialCommunityIcons>["name"]; // Icon name for the setting item
};

export default function SettingsItemList({ iconText, title, onPress }: Props) {
  // Access theme context for color scheme
  const { currentTheme } = useContext(ThemeContext);

  const colorScheme = currentTheme === "dark" ? Colors.dark : Colors.light;

  return (
    // Touchable item for each setting
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: colorScheme.secondary,
        paddingHorizontal: 10,
        borderRadius: 10,
        minHeight: 45,
        marginBottom: 5,
      }}
    >
      {/* Display icon and title */}
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        {iconText && (
          <MaterialCommunityIcons
            name={iconText}
            size={16}
            color={colorScheme.icon}
          />
        )}
        <AppText>{title}</AppText>
      </View>
    </TouchableOpacity>
  );
}

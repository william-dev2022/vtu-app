import { View, Text, Switch } from "react-native";
import React, { useContext } from "react";
import AppText from "./AppText";
import { ThemeContext } from "@/context/ThemeContext";
import Colors from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type Props = {
  title: string;
  onPress: () => void;
  iconText?: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
};
export default function SettingsItemList({ iconText, title, onPress }: Props) {
  const { currentTheme } = useContext(ThemeContext);

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
          minHeight: 45,
          marginBottom: 5,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <MaterialCommunityIcons
            name={iconText}
            size={16}
            color={colorScheme.icon}
          />
          <AppText>{title}</AppText>
        </View>
      </View>
    </View>
  );
}

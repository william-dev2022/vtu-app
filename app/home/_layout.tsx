import { View, Text } from "react-native";
import React, { useContext } from "react";
import { Link, Stack } from "expo-router";
import { ThemeContext } from "@/context/ThemeContext";
import AppText from "@/components/AppText";
import { ChevronLeft } from "lucide-react-native";

export default function _layout() {
  const { colorScheme } = useContext(ThemeContext);
  return (
    <Stack>
      <Stack.Screen
        name="buy-airtime"
        options={{
          headerShown: true,
          navigationBarHidden: true,
          title: "Buy Airtime",
          headerBackVisible: false,
          headerStyle: {
            // backgroundColor: "#2C2C2C",
            backgroundColor: colorScheme.secondary,
            // backgroundColor: colorScheme.background,
          },
          headerShadowVisible: false,
          headerTintColor: colorScheme.text, // 🔥 this changes back button color
          headerTitleStyle: {
            color: colorScheme.text,
            fontFamily: "Krub_400Regular",

            fontSize: 18,
          },
          headerLeft(props) {
            return (
              <Link href="/(tabs)" style={{ marginRight: 15 }}>
                <ChevronLeft color={colorScheme.text} />
              </Link>
            );
          },
          // Removed headerLeftContainerStyle as it is not a valid property
          headerTitleAlign: "left",
          headerRight: () => {
            return (
              <Link href="/transactions">
                <AppText
                  bold
                  style={{
                    color: "#0f766e",
                    borderStyle: "dashed",
                    borderBottomWidth: 1,
                    borderBottomColor: "#0f766e",
                  }}
                >
                  Histoy
                </AppText>
              </Link>
            );
          },
        }}
      />
    </Stack>
  );
}

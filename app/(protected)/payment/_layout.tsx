import { Pressable } from "react-native";
import React, { useContext } from "react";
import { Stack, useRouter } from "expo-router";
import { ThemeContext } from "@/context/ThemeContext";
import AppText from "@/components/AppText";
import { ChevronLeft } from "lucide-react-native";
import * as SystemUI from "expo-system-ui";

export default function _layout() {
  const { colorScheme } = useContext(ThemeContext);
  const router = useRouter();

  SystemUI.setBackgroundColorAsync(colorScheme.background);
  // Reusable headerLeft component
  const HeaderLeft = () => (
    <Pressable onPress={() => router.back()} style={{ marginRight: 15 }}>
      <ChevronLeft color={colorScheme.text} />
    </Pressable>
  );

  // Reusable headerRight component
  const HeaderRight = () => (
    <Pressable onPress={() => router.push("/transactions")}>
      <AppText
        bold
        style={{
          color: "#0f766e",
          borderStyle: "dashed",
          borderBottomWidth: 1,
          borderBottomColor: "#0f766e",
        }}
      >
        History
      </AppText>
    </Pressable>
  );

  // Reusable options
  const screenOptions = (title: string, showRight = true) => ({
    headerShown: true,
    navigationBarHidden: true,
    title,

    headerBackVisible: false,
    headerStyle: {
      backgroundColor: colorScheme.background,
    },
    cardStyle: {
      backgroundColor: colorScheme.background, // Ensures consistent background during transitions
    },
    headerShadowVisible: false,
    headerTintColor: colorScheme.text,
    headerTitleStyle: {
      color: colorScheme.text,
      fontFamily: "Krub_400Regular",
      fontSize: 18,
    },
    headerLeft: () => <HeaderLeft />,
    headerRight: showRight ? () => <HeaderRight /> : undefined,
    headerTitleAlign: "left" as const,
  });

  return (
    <Stack>
      <Stack.Screen
        name="manual-payment"
        options={{
          ...screenOptions("Make Manual Payment", false),
          title: "Make Manual Payment",
        }}
      />
      <Stack.Screen
        name="paystack"
        options={{
          ...screenOptions("Make  Payment", false),
          title: "Paystack  Payment",
        }}
      />
    </Stack>
  );
}

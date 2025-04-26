import { Pressable } from "react-native";
import React, { useContext } from "react";
import { Stack, useRouter } from "expo-router";
import { ThemeContext } from "@/context/ThemeContext";
import AppText from "@/components/AppText";
import { ChevronLeft } from "lucide-react-native";

export default function _layout() {
  const { colorScheme } = useContext(ThemeContext);
  const router = useRouter();

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
      <Stack.Screen name="buy-airtime" options={screenOptions("Buy Airtime")} />
      <Stack.Screen name="buy-data" options={screenOptions("Buy Data")} />
      <Stack.Screen
        name="profile-details"
        options={{
          ...screenOptions("Account Details", false),
          title: "",
        }}
        // options={screenOptions("Account Details", false)}
      />
      <Stack.Screen
        name="fund-wallet"
        options={screenOptions("Fund Wallet", false)}
      />
    </Stack>
  );
}

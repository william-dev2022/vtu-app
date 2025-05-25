import { Pressable } from "react-native";
import React, { useContext } from "react";
import { Stack, useRouter } from "expo-router";
import { ThemeContext } from "@/context/ThemeContext";
import AppText from "@/components/AppText";
import { ChevronLeft } from "lucide-react-native";
import * as SystemUI from "expo-system-ui";
import { PaystackProvider } from "react-native-paystack-webview";

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
    <PaystackProvider
      publicKey={"pk_test_8cc17556f8799a7759dab42f70e7a725fa0e5e27"}
      defaultChannels={["card", "bank", "bank_transfer"]} // Default channels to show
    >
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
    </PaystackProvider>
  );
}

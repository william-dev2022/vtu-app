import { Pressable } from "react-native";
import React, { useContext } from "react";
import { Stack, useRouter } from "expo-router";
import { ThemeContext } from "@/context/ThemeContext";
import AppText from "@/components/AppText";
import { ChevronLeft } from "lucide-react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
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
    <GestureHandlerRootView
      style={{
        flex: 1,
        backgroundColor: colorScheme.background, // Dynamically set background color
      }}
    >
      <BottomSheetModalProvider>
        <Stack>
          <Stack.Screen
            name="buy-airtime"
            options={screenOptions("Buy Airtime")}
          />
          <Stack.Screen name="buy-data" options={screenOptions("Buy Data")} />
          <Stack.Screen
            name="profile-details"
            options={{
              ...screenOptions("Account Details", false),
              title: "",
            }}
          />
          <Stack.Screen
            name="fund-wallet"
            options={screenOptions("Fund Wallet", false)}
          />
          <Stack.Screen
            name="complete-transaction"
            options={{
              presentation: "containedTransparentModal", // Makes the screen appear as a modal
              headerShown: false, // Optional: Hides the header for a cleaner modal look
            }}
          />
        </Stack>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

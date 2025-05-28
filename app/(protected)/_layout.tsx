import React from "react";
import useAuth from "@/context/AuthContext";
import { Redirect, Stack } from "expo-router";
import { AppDataProvider } from "@/providers/AppDataProvider";
import { useTheme } from "@/context/ThemeContext";

export default function _layout() {
  const { token, isLoading } = useAuth();
  const { colorScheme } = useTheme();

  console.log("User is authenticated, token:", token);
  console.log("Is loading", isLoading);

  if (isLoading) {
    // Optionally show a loading screen
    return null;
  }

  if (!token?.current) {
    return <Redirect href="/auth/login" />;
  }
  console.log("User is authenticated, rendering protected layout");

  return (
    <AppDataProvider>
      {/* <AppLoadingIndicator isLoading={isLoading} /> */}
      <Stack
        screenOptions={{
          statusBarBackgroundColor: colorScheme.background,
        }}
      >
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false, navigationBarHidden: true }}
        />

        <Stack.Screen
          name="home"
          options={{ headerShown: false, navigationBarHidden: true }}
        />
        <Stack.Screen
          name="payment"
          options={{ headerShown: false, navigationBarHidden: true }}
        />
      </Stack>
    </AppDataProvider>
  );
}

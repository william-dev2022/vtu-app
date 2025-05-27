import { View, Text } from "react-native";
import React from "react";
import useAuth from "@/context/AuthContext";
import { Redirect, Slot, Stack, useRouter } from "expo-router";
import { AppDataContext, AppDataProvider } from "@/providers/AppDataProvider";
import AppLoadingIndicator from "@/components/AppLoadingIndicator";

export default function _layout() {
  const { token, isLoading } = useAuth();

  console.log("User is authenticated, token:", token);
  console.log("Is loading", isLoading);

  // if (isLoading) {
  //   return;
  // }

  if (!token?.current) {
    return <Redirect href="/auth/login" />;
  }

  return (
    <AppDataProvider>
      <AppLoadingIndicator isLoading={isLoading} />
      <Stack initialRouteName="(tabs)">
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

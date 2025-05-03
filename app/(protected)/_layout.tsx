import { View, Text } from "react-native";
import React from "react";
import useAuth from "@/context/AuthContext";
import { Redirect, Slot, Stack, useRouter } from "expo-router";

export default function _layout() {
  const { token, isLoading } = useAuth();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!token?.current) {
    return <Redirect href="/auth/login" />;
  }

  return (
    <Stack initialRouteName="(tabs)">
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false, navigationBarHidden: true }}
      />

      <Stack.Screen
        name="home"
        options={{ headerShown: false, navigationBarHidden: true }}
      />
    </Stack>
  );
}

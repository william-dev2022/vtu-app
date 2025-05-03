import React from "react";
import { Stack } from "expo-router";

export default function _layout() {
  return (
    <Stack
      initialRouteName="login"
      screenOptions={{
        headerShown: false,
        navigationBarHidden: true,
        statusBarTranslucent: true,
        statusBarHidden: false,
        statusBarStyle: "light",
      }}
    >
      <Stack.Screen
        name="login"
        options={{
          headerShown: false,
          navigationBarHidden: true,
          statusBarTranslucent: true,
          statusBarHidden: false,
          statusBarStyle: "light",
        }}
      />
      <Stack.Screen name="register" />
    </Stack>
  );
}

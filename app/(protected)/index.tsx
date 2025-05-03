import React from "react";
import { Slot, Stack } from "expo-router";

export default function index() {
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

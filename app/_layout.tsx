import FontAwesome from "@expo/vector-icons/FontAwesome";
// import {
//   DarkTheme,
//   DefaultTheme,
//   ThemeProvider,
// } from "@react-navigation/native";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/components/useColorScheme";
import {
  Krub_400Regular,
  Krub_600SemiBold,
  useFonts,
} from "@expo-google-fonts/krub";
import { ThemeProvider } from "@/context/ThemeContext";
import ThemedContainer from "@/components/ThemedContainer";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "main/(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Krub_400Regular,
    Krub_600SemiBold,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider>
      {/* <ThemedContainer> */}
      <Stack initialRouteName="(tabs)">
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false, navigationBarHidden: true }}
        />
        <Stack.Screen
          name="home"
          options={{ headerShown: false, navigationBarHidden: true }}
        />
        <Stack.Screen name="modal" options={{ presentation: "modal" }} />
      </Stack>
      {/* </ThemedContainer> */}
    </ThemeProvider>
  );
}

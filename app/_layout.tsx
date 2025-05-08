import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import {
  Krub_400Regular,
  Krub_600SemiBold,
  Krub_500Medium,
  Krub_400Regular_Italic,
  Krub_500Medium_Italic,
  useFonts,
} from "@expo-google-fonts/krub";
import {
  Poppins_400Regular,
  Poppins_600SemiBold,
} from "@expo-google-fonts/poppins";
import { ThemeProvider } from "@/context/ThemeContext";
import { ToastProvider } from "react-native-toast-notifications";
import { View } from "react-native";
import AppText from "@/components/AppText";
import AuthProvider from "@/providers/AuthProvider";
export { ErrorBoundary } from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "/auth/login",
};
import { Slot } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ONBORDING_KEY } from "@/constants";
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Krub_400Regular,
    Krub_600SemiBold,
    Poppins_400Regular,
    Poppins_600SemiBold,
    Krub_500Medium,
    Krub_400Regular_Italic,
    Krub_500Medium_Italic,
  });
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);

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

  console.log("isLoaded", loaded);
  return <RootLayoutNav />;
}

type ToastProviderProps = React.ComponentProps<typeof ToastProvider>;
const toastConfig: Omit<ToastProviderProps, "children"> = {
  placement: "top",
  duration: 3000,
  animationType: "slide-in",
  animationDuration: 250,
  successColor: "green",
  dangerColor: "red",
  warningColor: "orange",
  icon: <FontAwesome name="info-circle" size={24} color="black" />,
  successIcon: <FontAwesome name="check-circle" size={24} color="green" />,
  dangerIcon: <FontAwesome name="exclamation-circle" size={24} color="red" />,
  warningIcon: (
    <FontAwesome name="exclamation-triangle" size={24} color="orange" />
  ),
  textStyle: { fontSize: 20 },
  offset: 50, // offset for both top and bottom toasts
  offsetTop: 40,
  offsetBottom: 40,
  swipeEnabled: true,
  renderType: {
    danger: (toast) => (
      <View
        style={{
          backgroundColor: "red",
          padding: 10,
          borderRadius: 8,
          // marginLeft: "auto",
        }}
      >
        <AppText style={{ color: "white" }}>{toast.message}</AppText>
      </View>
    ),
    success: (toast) => (
      <View
        style={{
          backgroundColor: "rgba(0, 87, 180, 0.5)",
          padding: 10,
          borderRadius: 8,
          // marginLeft: "auto",
        }}
      >
        <AppText style={{ color: "white" }}>{toast.message}</AppText>
      </View>
    ),
    normal: (toast) => (
      <View
        style={{
          backgroundColor: "#09090b",
          padding: 10,
          borderRadius: 8,
          // marginLeft: "auto",
        }}
      >
        <AppText style={{ color: "white" }}>{toast.message}</AppText>
      </View>
    ),
  },
};

function RootLayoutNav() {
  return (
    <ThemeProvider>
      {/* <ThemedContainer> */}
      <ToastProvider {...toastConfig}>
        <AuthProvider>
          <Slot />
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

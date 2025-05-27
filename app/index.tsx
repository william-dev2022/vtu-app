import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ONBORDING_KEY } from "@/constants";
import { Redirect } from "expo-router";
import useAuth from "@/context/AuthContext";
import AppLoadingIndicator from "@/components/AppLoadingIndicator";

export default function Index() {
  const [isLoading, setIsLoading] = useState(true);
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);

  const { isLoading: isAuthLoading, token, user } = useAuth();

  useEffect(() => {
    const checkOnboarding = async () => {
      const onboardingStatus = await AsyncStorage.getItem(ONBORDING_KEY);
      setIsOnboardingComplete(onboardingStatus === "done");
      setIsLoading(false);
    };

    checkOnboarding();
  }, []);

  // ⛔ Avoid rendering or redirecting until both states are resolved
  if (isLoading || isAuthLoading)
    return <AppLoadingIndicator isLoading={isLoading || isAuthLoading} />;

  if (!isOnboardingComplete) {
    return <Redirect href="/onboarding" />;
  }

  if (token && user) {
    if (user.isVerified) {
      return <Redirect href="/(protected)/(tabs)" />;
    }
    return <Redirect href="/auth/verify" />;
  }

  return <Redirect href="/auth/login" />;
}

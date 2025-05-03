import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ONBORDING_KEY } from "@/constants";
import { Redirect, useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
  // This is the main entry point of your app

  useEffect(() => {
    const checkOnboarding = async () => {
      const onboardingStatus = await AsyncStorage.getItem(ONBORDING_KEY);
      setIsOnboardingComplete(onboardingStatus === "done");
    };

    checkOnboarding();
  }, []);

  if (!isOnboardingComplete) {
    // If onboarding is complete, navigate to the main app
    router.replace({ pathname: "/onboarding" });
    // return <Redirect href="/on" />;
  }

  //check if onboarding has been viited before

  return (
    <View>
      <Text>Index Page</Text>
    </View>
  );
}

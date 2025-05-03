import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import React from "react";
import { hp, wp } from "@/helpers/common";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ONBORDING_KEY } from "@/constants";

export default function index() {
  const router = useRouter();

  const handleOnboardingCompleted = async () => {
    //persist state
    try {
      await AsyncStorage.setItem(ONBORDING_KEY, "done");
      router.replace("/auth/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar translucent />
      <Image
        resizeMode="cover"
        source={require("../../assets/images/onboarding-first.png")}
        style={{
          width: wp(100),
          height: hp(100),
          transform: [{ translateY: -80 }],
        }}
        resizeMethod="scale"
      />
      <Animated.View
        entering={FadeInDown.duration(800)}
        style={{ flex: 1, position: "absolute", top: 0, bottom: 0, left: 0 }}
      >
        <LinearGradient
          colors={[
            "rgba(255,255, 255,0)",
            "rgba(255,255, 255,0.5)",
            "white",
            "white",
          ]}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 0.8 }}
          style={styles.gradient}
        ></LinearGradient>

        <View style={styles.contentContainer}>
          <View>
            <Animated.Text
              entering={FadeInDown.delay(400).springify()}
              style={styles.title}
            >
              {/* Pixels */}
              Top Up. Stay Connected.
            </Animated.Text>

            <Animated.Text
              entering={FadeInDown.delay(500).springify()}
              style={styles.punchline}
            >
              {/* Buy airtime, data, and utilities — fast, easy, and anywhere. */}
              Enjoy unbeatable prices on airtime, data, and utilities.
            </Animated.Text>
          </View>

          <Animated.View entering={FadeInDown.delay(600).springify()}>
            <Pressable
              onPress={handleOnboardingCompleted}
              style={[styles.startButton]}
            >
              <Text style={styles.startText}>Start Explore</Text>
            </Pressable>
          </Animated.View>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  gradient: {
    width: wp(100),
    height: hp(60),
    position: "absolute",
    bottom: 0,
  },

  contentContainer: {
    height: hp(100),
    width: wp(100),
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 20,
    // paddingHorizontal: wp(5),
    // paddingBottom: 10,
  },
  title: {
    fontSize: hp(6),
    fontFamily: "Krub_500Medium_Italic",
    marginBottom: 5,
  },
  punchline: {
    fontSize: hp(2),
    // fontWeight: "700",
    marginBottom: 25,
    textAlign: "center",
    fontFamily: "Krub_500Medium",
  },
  startButton: {
    backgroundColor: "black",
    marginBottom: hp(5),
    padding: 10,
    borderCurve: "continuous",
    borderRadius: 8,

    paddingHorizontal: wp(30),
  },
  startText: {
    fontSize: hp(2.5),
    fontFamily: "Krub_500Medium",
    color: "white",
  },
});

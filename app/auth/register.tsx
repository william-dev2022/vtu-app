import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Pressable,
  TextInput,
} from "react-native";
import React from "react";
import { Image, ImageBackground } from "expo-image";
import { hp, wp } from "@/helpers/common";
import AppText from "@/components/AppText";
import { applyOpacityToColor } from "@/helpers/colorUtils";
import { Link, useRouter } from "expo-router";

export default function register() {
  const router = useRouter();
  return (
    <ImageBackground
      source={require("../../assets/images/onboarding-first.png")}
      style={styles.contentContainer}
    >
      <StatusBar translucent backgroundColor="transparent" />

      {/* <AppText bold style={{ fontSize: hp(3) }}>
        Register
      </AppText> */}
      <View
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          padding: wp(5),
          width: wp(100),
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AppText
          bold
          style={{ fontSize: hp(3), color: "#fff", marginBottom: 20 }}
        >
          Register
        </AppText>
        <TextInput
          placeholder="Name"
          style={{
            marginBottom: 25,
            backgroundColor: "rgba(232, 229, 229, 0.72)",
            padding: 14,
            width: wp(85),
            borderRadius: 8,
            fontFamily: "Krub_400Regular",
          }}
          onChangeText={(text) => console.log(text)}
        />
        <TextInput
          placeholder="Email Or Phone Number"
          style={{
            marginBottom: 25,
            backgroundColor: "rgba(232, 229, 229, 0.72)",
            padding: 14,
            width: wp(85),
            borderRadius: 8,
            fontFamily: "Krub_400Regular",
          }}
          onChangeText={(text) => console.log(text)}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          style={{
            marginBottom: 25,
            backgroundColor: "rgba(232, 229, 229, 0.72)",
            padding: 14,
            borderRadius: 8,
            width: wp(85),
            fontFamily: "Krub_400Regular",
          }}
          onChangeText={(text) => console.log(text)}
        />
        <TextInput
          placeholder="Confirm Password"
          secureTextEntry={true}
          style={{
            marginBottom: 25,
            backgroundColor: "rgba(232, 229, 229, 0.72)",
            padding: 14,

            width: wp(85),
            borderRadius: 8,
            fontFamily: "Krub_400Regular",
          }}
          onChangeText={(text) => console.log(text)}
        />

        <Pressable
          // onPress={() => router.push("/")}
          style={[styles.startButton]}
        >
          <AppText style={styles.startText}>Register</AppText>
        </Pressable>

        <View
          style={{
            marginBottom: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AppText style={{ color: "#fff" }}>Already have an account?</AppText>
          <Link href="/auth/login">
            <AppText style={{ color: "#065f46", textAlign: "center" }}>
              Login
            </AppText>
          </Link>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  gradient: {
    width: wp(100),
    height: hp(80),
    position: "absolute",
    bottom: 0,
  },

  contentContainer: {
    flex: 1,
    justifyContent: "center",
    width: wp(100),
    alignItems: "center",
    backgroundColor: applyOpacityToColor("#fff", 1),
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
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
    marginBottom: hp(2),
    width: wp(85),
    padding: 10,
    borderCurve: "continuous",
    borderRadius: 8,

    paddingHorizontal: wp(30),
  },
  startText: {
    fontSize: hp(1.5),
    fontFamily: "Krub_500Medium",
    color: "white",
    textAlign: "center",
  },
});

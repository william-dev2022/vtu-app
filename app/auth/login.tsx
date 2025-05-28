import {
  View,
  StatusBar,
  StyleSheet,
  Pressable,
  TextInput,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { hp, wp } from "@/helpers/common";
import AppText from "@/components/AppText";
import { applyOpacityToColor } from "@/helpers/colorUtils";
import { Link, useRouter } from "expo-router";
import { ImageBackground } from "expo-image";
import axios from "axios";
import { useToast } from "react-native-toast-notifications";
import useAuth from "@/context/AuthContext";
import { API_URL } from "@/constants";
import { User } from "@/type";

export default function login() {
  const [phoneNumber, setPhoneNumber] = useState<string>();
  const [password, setPassword] = useState<string>();

  const [isLoading, setIsLoading] = useState(false);
  const [isloginBottonDisabled, setIsLoginButtonDisabled] = useState(true);

  const toast = useToast();
  const { signIn } = useAuth();

  useEffect(() => {
    if (phoneNumber && password) {
      // and if they are valid (e.g., phone number is 11 digits long)
      const isPhoneNumberValid = phoneNumber.length === 11;
      const isPasswordValid = password.length >= 6; // Example: password should be at least 6 characters long

      setIsLoginButtonDisabled(!isPhoneNumberValid || !isPasswordValid);
    } else {
      setIsLoginButtonDisabled(true);
    }
  }, [phoneNumber, password]);

  const handleLogin = async () => {
    Keyboard.dismiss(); // Dismiss the keyboard when the button is pressed
    setIsLoading(true);

    try {
      const phone_number = "+234" + phoneNumber?.slice(1);
      // Perform login logic here
      const response = await axios.post(
        `${API_URL}/login`,
        { phone_number, password },
        { timeout: 5000 }
      );

      type LoginResponse = {
        token: string;
        user: User;
      };

      const { token, user } = response.data as LoginResponse;

      if (!token || !user) {
        toast.show("Invalid response from server, try again later", {
          type: "danger",
        });
        return;
      }
      signIn({ token, user });
    } catch (error: any) {
      if (error.response) {
        const { status, data } = error.response;

        if (status === 401) {
          toast.show("Invalid credentials, please try again.", {
            type: "danger",
          });
        } else if (status === 422 && data?.message) {
          toast.show(data?.message, { type: "danger" });
        } else {
          toast.show("An unexpected error occurred. Please try again later.", {
            type: "danger",
          });
        }
      } else if (error.request) {
        console.error("No response received:", error.request);
        toast.show("Network error. Please check your connection.", {
          type: "danger",
        });
      } else {
        console.error("Error setting up request:", error.message);
        toast.show(error.message, { type: "danger" });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/images/onboarding-first-v2.png")}
      style={styles.contentContainer}
    >
      <StatusBar translucent />

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
          style={{
            color: "white",
            fontSize: hp(3),
            textAlign: "left",
            marginBottom: 80,
          }}
        >
          Welcome Back!
        </AppText>
        <TextInput
          placeholder="Phone Number"
          placeholderTextColor="#000"
          style={{
            marginBottom: 25,
            backgroundColor: "rgba(232, 229, 229, 0.72)",
            width: wp(85),
            padding: 14,
            borderRadius: 8,
            fontFamily: "Krub_600SemiBold",
            color: "#000",
          }}
          maxLength={11}
          keyboardType="phone-pad"
          onChangeText={setPhoneNumber}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          placeholderTextColor="#000"
          style={{
            marginBottom: 25,
            backgroundColor: "rgba(232, 229, 229, 0.72)",
            width: wp(85),
            padding: 14,
            borderRadius: 8,
            fontFamily: "Krub_600SemiBold",
            color: "#000",
          }}
          onChangeText={setPassword}
        />

        <View
          style={{
            marginBottom: 20,
            justifyContent: "flex-end",
            alignItems: "flex-end",
            width: wp(85),
          }}
        >
          <Link
            href="/auth/register"
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "rgba(255, 255, 255, 0.5)",
              borderStyle: "dashed",
              padding: 5,
            }}
          >
            <AppText
              style={{
                color: "#fff",
              }}
            >
              Forget Password
            </AppText>
          </Link>
        </View>

        <Pressable
          onPress={handleLogin}
          disabled={isloginBottonDisabled}
          style={[
            styles.startButton,
            { opacity: isloginBottonDisabled ? 0.5 : 1 },
          ]}
        >
          <AppText style={styles.startText}>Login</AppText>
        </Pressable>

        <View
          style={{
            marginBottom: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AppText style={{ color: "#fff" }}>Don't have an account?</AppText>
          <Link
            href="/auth/register"
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "rgba(255, 255, 255, 0.5)",
              borderStyle: "dashed",
              marginTop: 5,
            }}
          >
            <AppText style={{ color: "rgb(49, 140, 0)" }}>
              Poceed To Register
            </AppText>
          </Link>
        </View>
      </View>

      {isLoading && (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            height: hp(100),
            width: wp(100),
            backgroundColor: "rgb(0, 0, 0)",
            opacity: 0.4,
          }}
        >
          <ActivityIndicator color="#fff" size="large" />
        </View>
      )}
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
    // borderTopRightRadius: 20,
    // borderTopLeftRadius: 20,
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
    textAlign: "center",
  },
});

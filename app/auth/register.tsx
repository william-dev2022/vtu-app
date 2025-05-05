import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  Pressable,
  TextInput,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Image, ImageBackground } from "expo-image";
import { hp, wp } from "@/helpers/common";
import AppText from "@/components/AppText";
import { applyOpacityToColor } from "@/helpers/colorUtils";
import { Link, useRouter } from "expo-router";
import { useToast } from "react-native-toast-notifications";
import axios from "axios";
import { API_URL } from "@/constants";
import useAuth from "@/context/AuthContext";

export default function register() {
  const [name, setName] = useState<string>();
  const [phoneNumber, setPhoneNumber] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [confirmPassword, setConfirmPassword] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const [isRegisterBottonDisabled, setIsRegisterButtonDisabled] =
    useState(true);
  const toast = useToast();

  const { signIn } = useAuth();

  useEffect(() => {
    if (phoneNumber && password && confirmPassword && name) {
      // and if they are valid (e.g., phone number is 11 digits long)
      const isPhoneNumberValid = phoneNumber.length === 11;
      const isPasswordValid = password.length >= 6;
      const isConfirmPasswordValid = confirmPassword.length >= 6;

      setIsRegisterButtonDisabled(
        !isPhoneNumberValid || !isPasswordValid || !isConfirmPasswordValid
      );
    } else {
      setIsRegisterButtonDisabled(true);
    }
  }, [phoneNumber, password, confirmPassword, name]);

  const handleRegister = async () => {
    Keyboard.dismiss(); // Dismiss the keyboard when the button is pressed
    setIsLoading(true);

    if (password !== confirmPassword) {
      toast.show("Passwords do not match", {
        type: "danger",
      });
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    try {
      const phone_number = "+234" + phoneNumber?.slice(1);
      // Perform login logic here
      const response = await axios.post(
        `${API_URL}/register`,
        { phone_number, password, name },
        { timeout: 5000 }
      );

      const { token, user } = response.data; // Assuming the response contains the token and user data

      // Check if the response contains the expected data
      if (!user || !token) {
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
      <StatusBar translucent backgroundColor="transparent" />
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
          style={styles.textInput}
          autoComplete="name"
          onChangeText={setName}
        />
        <TextInput
          placeholder="Phone Number"
          keyboardType="phone-pad"
          maxLength={11}
          style={styles.textInput}
          onChangeText={setPhoneNumber}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          style={styles.textInput}
          onChangeText={setPassword}
        />
        <TextInput
          placeholder="Confirm Password"
          secureTextEntry={true}
          style={styles.textInput}
          onChangeText={setConfirmPassword}
        />

        <Pressable
          onPress={handleRegister}
          disabled={isRegisterBottonDisabled}
          style={[
            styles.startButton,
            { opacity: isRegisterBottonDisabled ? 0.5 : 1 },
          ]}
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
          <Link
            href="/auth/login"
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "rgba(255, 255, 255, 0.5)",
              borderStyle: "dashed",
              marginTop: 5,
            }}
          >
            <AppText
              bold
              style={{ color: "rgb(49, 140, 0)", textAlign: "center" }}
            >
              Proceed To Login
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
  contentContainer: {
    flex: 1,
    justifyContent: "center",
    width: wp(100),
    alignItems: "center",
    backgroundColor: applyOpacityToColor("#fff", 1),
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },

  textInput: {
    marginBottom: 25,
    backgroundColor: "rgba(232, 229, 229, 0.72)",
    padding: 14,
    width: wp(85),
    borderRadius: 8,
    fontFamily: "Krub_400Regular",
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

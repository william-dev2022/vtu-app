import {
  View,
  StatusBar,
  StyleSheet,
  Pressable,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { hp, wp } from "@/helpers/common";
import AppText from "@/components/AppText";
import { applyOpacityToColor } from "@/helpers/colorUtils";
import { Link, Redirect, useRouter } from "expo-router";
import { ImageBackground } from "expo-image";
import axios from "axios";
import { useToast } from "react-native-toast-notifications";
import useAuth from "@/context/AuthContext";
import { API_URL, USERI_TOKEN_KEY } from "@/constants";
import CodeInputBox from "@/components/CodeInputBox";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getStorageItemAsync } from "@/helpers/secureStorage";

const CODE_REQUEST_DELAY = 5 * 60 * 1000; // 5 minutes

export default function verify() {
  const [code, setCode] = useState<string>("");

  const [isLoading, setIsLoading] = useState(false);
  const [isBottonDisabled, setIsButtonDisabled] = useState(true);

  const [isCooldown, setIsCooldown] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState<number | null>(null);

  const toast = useToast();
  const { signIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Check if the user has requested a code before
    const checkCooldown = async () => {
      await AsyncStorage.setItem("lastCodeRequestTime", Date.now().toString());
      const lastRequestTime = await AsyncStorage.getItem("lastCodeRequestTime");
      if (lastRequestTime) {
        const elapsedTime = Date.now() - parseInt(lastRequestTime);

        if (elapsedTime < CODE_REQUEST_DELAY) {
          setIsCooldown(true);
          setTimeRemaining(CODE_REQUEST_DELAY - elapsedTime);
          startCountdown(CODE_REQUEST_DELAY - elapsedTime);
        }
      }
    };
    checkCooldown();
  }, []);

  useEffect(() => {
    if (code) {
      // and if they are valid (e.g., phone number is 11 digits long)
      const isCodeValid = code.length === 5;
      setIsButtonDisabled(!isCodeValid);
    } else {
      setIsButtonDisabled(true);
    }
  }, [code]);

  const formatTime = (time: number | null) => {
    if (!time) return "00:00";
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    return `${minutes < 10 ? "0" : ""}${minutes}:${
      seconds < 10 ? "0" : ""
    }${seconds}`;
  };

  const startCountdown = (time: number) => {
    const intervalId = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime && prevTime <= 1000) {
          clearInterval(intervalId); // Clear the interval when the countdown ends
          setIsCooldown(false); // Reset the cooldown status
          return 0; // Set remaining time to 0 when countdown ends
        }
        return prevTime ? prevTime - 1000 : 0;
      });
    }, 1000);
  };

  const handleRequestCode = async () => {
    Keyboard.dismiss(); // Dismiss the keyboard when the button is pressed
    setIsLoading(true);

    await AsyncStorage.setItem("lastCodeRequestTime", Date.now().toString());
    setIsCooldown(true);
    setTimeRemaining(CODE_REQUEST_DELAY);

    // Start the countdown after code request
    startCountdown(CODE_REQUEST_DELAY);

    //TODO: make the request to the server to send the code
    setIsLoading(false);

    return;
  };

  const verifyCode = async () => {
    const storedToken = await getStorageItemAsync(USERI_TOKEN_KEY);

    if (!storedToken) {
      toast.show("No token found, please login again", { type: "danger" });
      router.replace("/auth/login");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        `${API_URL}/check-verification-code`,
        {
          verification_code: code,
        },
        {
          timeout: 5000,
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );

      console.log("Response from server:", response);

      if (response.status !== 200) {
        toast.show("Invalid response from server, try again later", {
          type: "danger",
        });
        return;
      }

      const { token, user } = response.data; // Assuming the response contains the token and user data
      // Check if the response contains the expected data
      if (!token || !user) {
        toast.show("Invalid response from server, try again later", {
          type: "danger",
        });
        return;
      }

      signIn({ token, user });

      toast.show("Code verified successfully");
      setIsLoading(false);
      return;
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

  const handleCodeInput = (newCode: string) => {
    setCode(newCode);
  };

  const handleRequestAgain = () => {
    console.log("Requesting code again...");
    if (!isCooldown) {
      handleRequestCode();
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
          Verify Code
        </AppText>
        <CodeInputBox
          pin={code.split("")}
          handlCodeChange={handleCodeInput}
          length={5}
        />

        <Pressable
          onPress={verifyCode}
          disabled={isBottonDisabled}
          style={[
            styles.startButton,
            { opacity: isBottonDisabled ? 0.5 : 1, marginTop: 20 },
          ]}
        >
          <AppText style={styles.startText}>Veify</AppText>
        </Pressable>

        <View>
          {timeRemaining !== 0 && (
            <AppText>Wait for {formatTime(timeRemaining)} </AppText>
          )}

          <Pressable
            onPress={handleRequestAgain}
            style={{
              borderBottomWidth: 1,
              borderBottomColor: "rgba(255, 255, 255, 0.5)",
              borderStyle: "dashed",
            }}
            disabled={isCooldown && timeRemaining !== 0}
          >
            {!isCooldown && timeRemaining === 0 && (
              <AppText>Request a new code</AppText>
            )}
          </Pressable>
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

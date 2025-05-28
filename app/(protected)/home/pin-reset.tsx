import { View, StyleSheet, TextInput, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import ThemedContainer from "@/components/ThemedContainer";
import AppText from "@/components/AppText";
import { hp, wp } from "@/helpers/common";
import { applyOpacityToColor } from "@/helpers/colorUtils";
import { useTheme } from "@/context/ThemeContext";
import { brandColor } from "@/constants/Colors";
import axios from "axios";
import { API_URL, USERI_TOKEN_KEY } from "@/constants";
import AppLoadingIndicator from "@/components/AppLoadingIndicator";
import { useToast } from "react-native-toast-notifications";
import { useRouter } from "expo-router";
import { getStorageItemAsync } from "@/helpers/secureStorage";
import useAuth from "@/context/AuthContext";

export default function CableSubscription() {
  const [pin, setPin] = useState<string>("");
  const [confirmPin, setConfirmPin] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [canSubmit, setCanSubmit] = useState<boolean>(false);
  const { colorScheme } = useTheme();

  const router = useRouter();
  const toast = useToast();
  const { updateUserPinStatus } = useAuth();

  useEffect(() => {
    if (pin && confirmPin && password) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  }, [pin, confirmPin, password]);

  const handleSubmit = async () => {
    setIsLoading(true);

    if (pin !== confirmPin) {
      toast.show("Pins do not match", {
        type: "danger",
      });
      console.error("Pins do not match");
      setIsLoading(false);
      return;
    }

    if (pin.length !== 4) {
      console.error("Pin must be 4 digits");
      toast.show("Pin must be 4 digits", {
        type: "danger",
      });
      setIsLoading(false);

      return;
    }
    try {
      const userToken = await getStorageItemAsync(USERI_TOKEN_KEY);
      if (!userToken) {
        console.error("User token not found");
        toast.show("User token not found", {
          type: "danger",
        });
        setIsLoading(false);
        return;
      }
      console.log("Pin", pin);
      const response = await axios.post(
        `${API_URL}/account/set-pin`,
        {
          pin,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      console.log("Response from set-pin API:");
      console.log(response.data);
      if (response.status === 200) {
        // Handle success
        toast.show("Pin set successfully", {
          type: "success",
        });
        setPin("");
        setConfirmPin("");
        setPassword("");
        updateUserPinStatus();
        router.replace("/(protected)/(tabs)/profile");
        return;
      } else {
        // Handle error
        console.error("Error setting pin");
      }
    } catch (error: any) {
      //   console.error(error);
      if (error.response) {
        const { status, data } = error.response;
        if (status === 401) {
          toast.show("Invalid Password", {
            type: "danger",
          });
        } else if (status === 422 && data?.message) {
          toast.show(data?.message, { type: "danger" });
        } else {
          console.log(data);
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
      setPassword("");
    }
  };

  return (
    <ThemedContainer
      style={{
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
        paddingTop: hp(15),
        paddingHorizontal: wp(10),
      }}
    >
      <AppText bold>Set a 4-Digit Transaction PIN</AppText>
      <AppText style={{ fontSize: hp(1.8) }}>
        Don’t use obvious combinations like{" "}
        <AppText style={{ color: "red" }}>1234</AppText> or your birth year.
        You’ll need to your PIN to authorize every transaction.
      </AppText>

      <View style={{ flex: 1, marginTop: 20, rowGap: 20 }}>
        <TextInput
          placeholder="Pin"
          value={pin}
          placeholderTextColor={applyOpacityToColor(colorScheme.text, 0.8)}
          keyboardType="number-pad"
          maxLength={4}
          secureTextEntry={true}
          onChangeText={setPin}
          style={{
            ...styles.dropdown,
            backgroundColor: applyOpacityToColor(colorScheme.secondary, 0.8),
            borderWidth: 0,
            padding: 10,
            color: applyOpacityToColor(colorScheme.text, 0.8),
            fontFamily: "Krub_400Regular_Italic",
            fontSize: hp(1.8),
          }}
        />

        <TextInput
          placeholder="Enter Pin Again"
          keyboardType="number-pad"
          value={confirmPin}
          onChangeText={setConfirmPin}
          secureTextEntry={true}
          placeholderTextColor={applyOpacityToColor(colorScheme.text, 0.5)}
          style={{
            ...styles.dropdown,
            backgroundColor: applyOpacityToColor(colorScheme.secondary, 0.8),
            borderWidth: 0,
            padding: 10,
            color: applyOpacityToColor(colorScheme.text, 0.8),
            fontFamily: "Krub_400Regular_Italic",
            fontSize: hp(1.8),
          }}
        />

        <TextInput
          placeholder="password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor={applyOpacityToColor(colorScheme.text, 0.5)}
          style={{
            ...styles.dropdown,
            backgroundColor: applyOpacityToColor(colorScheme.secondary, 0.8),
            borderWidth: 0,
            padding: 10,
            color: applyOpacityToColor(colorScheme.text, 0.8),
            fontFamily: "Krub_400Regular_Italic",
            fontSize: hp(1.8),
          }}
        />

        <Pressable
          disabled={!canSubmit}
          onPress={handleSubmit}
          style={{
            backgroundColor: brandColor,
            opacity: canSubmit ? 1 : 0.5,
            padding: 10,
            borderRadius: 8,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AppText
            style={{
              color: "white",
              fontFamily: "Krub_400Regular",
              fontSize: hp(1.8),
            }}
          >
            Proceed to Payment!
          </AppText>
        </Pressable>
      </View>

      <AppLoadingIndicator isLoading={isLoading} />
    </ThemedContainer>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    // margin: 16,
    height: 50,
    borderRadius: 8,
  },
});

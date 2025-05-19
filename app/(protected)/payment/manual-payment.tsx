import { View, StyleSheet, TextInput, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import ThemedContainer from "@/components/ThemedContainer";
import AppText from "@/components/AppText";
import { formatAmount, hp, wp } from "@/helpers/common";
import { applyOpacityToColor } from "@/helpers/colorUtils";
import { useTheme } from "@/context/ThemeContext";
import { brandColor } from "@/constants/Colors";
import axios from "axios";
import { API_URL, USERI_TOKEN_KEY } from "@/constants";
import AppLoadingIndicator from "@/components/AppLoadingIndicator";
import { useToast } from "react-native-toast-notifications";
import { useRouter } from "expo-router";
import { getStorageItemAsync } from "@/helpers/secureStorage";

export default function ManualTransfer() {
  const [amount, setAmount] = useState<string>("");
  const [accountName, setAccountName] = useState<string>("");
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [bankName, setBankName] = useState<string>("");
  const [paymentType, setPaymentType] = useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [canSubmit, setCanSubmit] = useState<boolean>(false);
  const { colorScheme } = useTheme();

  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    if (amount && accountName && bankName && paymentType) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  }, [accountName, amount, bankName, paymentType]);

  const handleSubmit = async () => {
    setIsLoading(true);

    return;

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
      const response = await axios.post(
        `${API_URL}/account/set-pin`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );

      if (response.status === 200) {
        // Handle success
        toast.show("Pin set successfully", {
          type: "success",
        });
        setAccountName("");
        setAmount("");
        setBankName("");
        setPaymentType("");
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
    }
  };

  return (
    <ThemedContainer
      style={{
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
        paddingTop: hp(5),
        paddingHorizontal: wp(10),
      }}
    >
      <AppText bold></AppText>
      <AppText style={{ fontSize: hp(1.8) }}>
        Minimum funding is {formatAmount(4000)}. Kindly pay into this account{" "}
        <AppText bold style={{ color: "red" }}>
          0762974174 PluginLinkNg Gtbank
        </AppText>{" "}
        Don't submit more than once to aviod your wallet not been funded
      </AppText>

      <View style={{ flex: 1, marginTop: 20, rowGap: 20 }}>
        <TextInput
          placeholder="account name"
          value={accountName}
          placeholderTextColor={applyOpacityToColor(colorScheme.text, 0.8)}
          keyboardType="default"
          onChangeText={setAccountName}
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
          placeholder="Bank Name"
          value={bankName}
          placeholderTextColor={applyOpacityToColor(colorScheme.text, 0.8)}
          keyboardType="default"
          onChangeText={setBankName}
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
          placeholder="Account Number"
          placeholderTextColor={applyOpacityToColor(colorScheme.text, 0.8)}
          keyboardType="phone-pad"
          onChangeText={setAccountNumber}
          maxLength={10}
          secureTextEntry
          value={accountNumber}
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
          placeholder="Amount"
          placeholderTextColor={applyOpacityToColor(colorScheme.text, 0.8)}
          keyboardType="phone-pad"
          onChangeText={setAmount}
          maxLength={5}
          secureTextEntry
          value={amount}
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
          placeholder="USSD, Mobile Transfer, POS"
          value={paymentType}
          placeholderTextColor={applyOpacityToColor(colorScheme.text, 0.8)}
          keyboardType="default"
          onChangeText={setPaymentType}
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

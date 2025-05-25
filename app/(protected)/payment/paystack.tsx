import { View, StyleSheet, TextInput, Pressable, Keyboard } from "react-native";
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
import { usePaystack } from "react-native-paystack-webview";
import useAuth from "@/context/AuthContext";
import { useAppData } from "@/providers/AppDataProvider";
import { Transaction } from "@/type";

export default function ManualTransfer() {
  const [amount, setAmount] = useState<number | null>(null);

  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [canSubmit, setCanSubmit] = useState<boolean>(false);
  const { colorScheme } = useTheme();
  const { refreshBalance, addTransaction } = useAppData();

  const router = useRouter();
  const toast = useToast();

  const { popup } = usePaystack();

  const payNow = async (amount: number) => {
    Keyboard.dismiss();
    setIsLoading(true);
    const userToken = await getStorageItemAsync(USERI_TOKEN_KEY);
    if (!userToken) {
      //rediect user to login
      setIsLoading(false);
      return;
    }
    try {
      popup.checkout({
        email: "de@gmail.com",
        amount: amount,
        // reference: "TXN_123456",
        metadata: {
          custom_fields: [
            {
              display_name: user!.name,
              phone_number: user!.phoneNumber,
              id: user!.id,
            },
          ],
        },

        onSuccess: async (res) => {
          setIsLoading(true);
          const { reference, status: statusCode } = res;
          if (statusCode !== "success") {
            toast.show("Payment Failed", {
              type: "danger",
            });
            return;
          }

          // You can send the reference to your server for verification
          const response = await axios.post(
            `${API_URL}/payment/verify`,
            { reference },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userToken}`,
              },
              timeout: 10000, // 10 seconds timeout
            }
          );

          const { status, data } = response.data as {
            status: number;
            data: Transaction;
          };

          if (status && data) {
            addTransaction(data);
            await refreshBalance();

            toast.show("Payment Successful", {
              type: "success",
            });

            router.push({
              pathname: "/home/receipt",
              params: {
                data: JSON.stringify(data),
              },
            });
          }
          setIsLoading(false);
        },
        onCancel: () => {
          console.log("Payment Cancelled");
          toast.show("Payment Cancelled", {
            type: "danger",
          });
        },

        onError: (err) => {
          console.log("Payment Error:", err);
          toast.show("Payment Error", {
            type: "danger",
          });
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (amount && amount >= 1000) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  }, [amount]);

  const handleSubmit = async () => {
    if (!amount) return;
    payNow(amount);
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
        Minimum funding is {formatAmount(1000)}.
      </AppText>

      <View style={{ flex: 1, marginTop: 20, rowGap: 20 }}>
        <TextInput
          placeholder="Amount"
          placeholderTextColor={applyOpacityToColor(colorScheme.text, 0.8)}
          keyboardType="phone-pad"
          onChangeText={(value) => {
            const parsedValue = parseInt(value);
            if (!isNaN(parsedValue)) {
              setAmount(parsedValue);
            } else {
              setAmount(0);
            }
          }}
          maxLength={5}
          secureTextEntry
          value={amount?.toString()}
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

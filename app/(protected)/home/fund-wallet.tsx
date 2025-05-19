// Import necessary components and libraries
import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  StyleSheet,
  StatusBar,
} from "react-native";
import React, { useContext, useState } from "react";
import ThemedContainer from "@/components/ThemedContainer";
import AppText from "@/components/AppText";
import { ThemeContext } from "@/context/ThemeContext";
import { brandColor } from "@/constants/Colors";
import { useRouter } from "expo-router";

export default function FundWallet() {
  // Access theme context for color scheme
  const { colorScheme } = useContext(ThemeContext);
  const router = useRouter();
  const [wallet, setWallet] = useState(false);

  return (
    // Themed container for consistent styling
    <ThemedContainer>
      {/* If user doesn't have a wallet yet */}
      {/* show create wallet  */}

      {/* <WalletDetails /> */}

      <View style={{ ...styles.box, backgroundColor: colorScheme.secondary }}>
        <AppText>
          Generate a virtual dedicated accounts, that is link your wallet.
        </AppText>
        <Pressable
          style={{
            padding: 10,
            backgroundColor: brandColor,
            borderRadius: 10,
            width: "100%",
            alignItems: "center",
          }}
          onPress={() => setWallet(true)}
        >
          <AppText>Generate</AppText>
        </Pressable>
      </View>

      <View style={{ ...styles.box, backgroundColor: colorScheme.secondary }}>
        <AppText>Manual Account Transfer</AppText>
        <AppText>this might take with 10-20 mins to reflect</AppText>
        <Pressable
          style={{
            padding: 10,
            backgroundColor: brandColor,
            borderRadius: 10,
            width: "100%",
            alignItems: "center",
          }}
          onPress={() => router.push("/(protected)/payment/manual-payment")}
        >
          <AppText>Proceed</AppText>
        </Pressable>
      </View>

      {/* ?Fund Wallet With Card */}
      <View style={{ ...styles.box, backgroundColor: colorScheme.secondary }}>
        <AppText>Fund Wallet With Card</AppText>
        <Pressable
          style={{
            padding: 10,
            backgroundColor: brandColor,
            borderRadius: 10,
            width: "100%",
            alignItems: "center",
          }}
          onPress={() => router.push("/(protected)/payment/paystack")}
        >
          <AppText>Proceed</AppText>
        </Pressable>
      </View>
    </ThemedContainer>
  );
}

const styles = StyleSheet.create({
  box: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 20,
    padding: 20,
    rowGap: 20,
  },
});
const WalletDetails = () => {
  const { colorScheme } = useContext(ThemeContext);
  return (
    <View
      style={{
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colorScheme.secondary,
        borderRadius: 10,
        marginTop: 20,
        padding: 20,
        rowGap: 20,
      }}
    >
      {/* Display bank name */}
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AppText style={{ fontSize: 14, textAlign: "center" }}>
          Bank Name
        </AppText>
        <AppText bold style={{ textAlign: "center" }}>
          Union Bank
        </AppText>
      </View>

      {/* Display account number */}
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AppText style={{ fontSize: 14, textAlign: "center" }}>
          Account Number
        </AppText>
        <AppText bold style={{ textAlign: "center" }}>
          9087364537
        </AppText>
      </View>

      {/* Display account name */}
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AppText style={{ fontSize: 14, textAlign: "center" }}>
          Account Name
        </AppText>
        <AppText bold style={{ textAlign: "center" }}>
          PillPay Vtu
        </AppText>
      </View>

      {/* Buttons for copying and sharing account details */}
      <View style={{ flexDirection: "row", columnGap: 10 }}>
        <TouchableOpacity>
          <View
            style={{
              backgroundColor: "#0f766e",
              paddingVertical: 8,
              paddingHorizontal: 15,
              borderRadius: 15,
            }}
          >
            <AppText style={{ color: "white" }}>Copy Number</AppText>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View
            style={{
              backgroundColor: "#0f766e",
              paddingVertical: 8,
              paddingHorizontal: 15,
              borderRadius: 15,
            }}
          >
            <AppText style={{ color: "white" }}>Share Details</AppText>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

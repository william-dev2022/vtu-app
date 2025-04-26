import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import ThemedContainer from "@/components/ThemedContainer";
import AppText from "@/components/AppText";
import { ThemeContext } from "@/context/ThemeContext";

export default function FundWallet() {
  const { colorScheme } = useContext(ThemeContext);
  return (
    <ThemedContainer>
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
    </ThemedContainer>
  );
}

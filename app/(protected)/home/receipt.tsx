import { View, StatusBar, BackHandler } from "react-native";
import React, { useEffect } from "react";
import { Transaction } from "@/type";
import { useLocalSearchParams, useRouter } from "expo-router";
import AppText from "@/components/AppText";
import ThemedContainer from "@/components/ThemedContainer";
import { useTheme } from "@/context/ThemeContext";
import { formatDateTime, hp, wp } from "@/helpers/common";
import { applyOpacityToColor } from "@/helpers/colorUtils";

export default function Receipt() {
  const { data } = useLocalSearchParams();
  const transaction: Transaction = JSON.parse(data as string);
  const { colorScheme } = useTheme();
  const router = useRouter();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        router.replace("/(protected)/(tabs)");
        return true; // Allow default back button behavior
      }
    );

    return () => backHandler.remove();
  }, []);

  return (
    <ThemedContainer
      style={{
        paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + 20 : 20,
      }}
    >
      <View
        style={{
          marginBottom: 20,
          alignItems: "center",
          backgroundColor: applyOpacityToColor(colorScheme.secondary, 0.4),
          paddingVertical: 40,
          paddingHorizontal: 10,
          borderRadius: 10,
        }}
      >
        <AppText bold style={{ fontSize: 24 }}>
          Transaction Details
        </AppText>
        <AppText bold>{transaction.type} PURCHASE</AppText>
        <AppText bold style={{ fontSize: 24 }}>
          ₦{transaction.amount}.00
        </AppText>

        <View style={{ marginTop: 20 }} />
        <ReceiptItem title="Fees" value={`0.00`} />
        <ReceiptItem title="Amount Paid" value={`${transaction.amount}.00`} />
      </View>
      <View
        style={{
          marginBottom: 20,
          alignItems: "center",
          backgroundColor: applyOpacityToColor(colorScheme.secondary, 0.4),
          borderRadius: 10,
          paddingVertical: 40,
          paddingHorizontal: 10,
        }}
      >
        <AppText
          bold
          style={{ fontSize: 16, textAlign: "left", alignSelf: "flex-start" }}
        >
          Transaction Details
        </AppText>

        <View
          style={{
            marginTop: 20,
          }}
        />

        <ReceiptItem title="Transaction Type" value={`${transaction.type}`} />
        {transaction.meta?.plan_name && (
          <ReceiptItem title="Plan" value={transaction.meta.plan_name} />
        )}
        <ReceiptItem title="Reference" value={transaction.reference} />
        <ReceiptItem title="Date" value={formatDateTime(transaction.date)} />
        {transaction.meta?.phone_number && (
          <ReceiptItem title="Number" value={transaction.meta.phone_number} />
        )}
        {transaction.meta?.network && (
          <ReceiptItem title="Network" value={transaction.meta.network} />
        )}
      </View>
    </ThemedContainer>
  );
}

const ReceiptItem = ({ title, value }: { title: string; value: string }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignSelf: "flex-start",
        width: "100%",
      }}
    >
      <AppText>{title}</AppText>
      <AppText>{value}</AppText>
    </View>
  );
};

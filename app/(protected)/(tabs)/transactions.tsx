import { View, ScrollView } from "react-native";
import React from "react";
import AppText from "@/components/AppText";
import { Ionicons } from "@expo/vector-icons";
import TransactionList from "@/components/TransactionList";
import ThemedContainer from "@/components/ThemedContainer";
import { useAppData } from "@/providers/AppDataProvider";
import AppErrorScreen from "@/components/AppErrorScreen";

export default function TransactionsTab() {
  const { loading, transactions, error } = useAppData();

  if (loading) {
    return (
      <AppErrorScreen
        title="Loading..."
        description="Please wait"
        buttonText={""}
      />
    );
  }

  if (error) {
    return (
      <AppErrorScreen
        buttonText="Retry"
        title="Something Went Wrong"
        description="check your internet connection and retry"
      />
    );
  }
  return (
    <ThemedContainer>
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
        {/* Header */}
        <View style={{ rowGap: 20, paddingTop: 60 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 20,
            }}
          >
            <AppText>Transaction History</AppText>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                columnGap: 5,
              }}
            >
              <Ionicons name="download-outline" size={18} color="#0f766e" />
              <AppText style={{ fontSize: 12 }}>Download</AppText>
            </View>
          </View>

          {/* Filter */}
          {/* <View style={{ flexDirection: "row", columnGap: 10 }}>
          <AppText>Filter</AppText>
        </View> */}

          {/* Statistics */}
          <View style={{ flexDirection: "row", columnGap: 10 }}>
            <AppText>
              IN - <AppText style={{ color: "#0f766e" }}>+₦10,000</AppText>
            </AppText>
            <AppText>
              OUT - <AppText style={{ color: "red" }}>-₦9,670</AppText>
            </AppText>
          </View>
          {/* History */}
          <TransactionList transactions={transactions} onPress={() => {}} />
        </View>
      </ScrollView>
    </ThemedContainer>
  );
}

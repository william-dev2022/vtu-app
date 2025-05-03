import { View, ScrollView, TextInput } from "react-native";
import React from "react";
import AppText from "@/components/AppText";
import { Ionicons } from "@expo/vector-icons";
import TransactionList from "@/components/TransactionList";
import { transactions } from "@/data/sample";
import ThemedContainer from "@/components/ThemedContainer";

export default function TransactionsTab() {
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
          <TransactionList
            transactions={transactions.slice(0, 10)}
            onPress={() => {}}
          />
        </View>
      </ScrollView>
    </ThemedContainer>
  );
}

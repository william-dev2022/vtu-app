import { View, Text } from "react-native";
import React from "react";
import TransactionList from "./TransactionList";
import AppText from "./AppText";
import { Transaction } from "@/type";

// const transactions = [
//   {
//     name: "Airtime",
//     amount: "₦500.00",
//     date: "11:25 AM  10th, Mar 2025",
//     icon: "airtel",
//   },

//   {
//     name: "Electricity",
//     amount: "₦3,000.00",
//     date: "10:00 AM   26th, Jun 2025",
//     icon: "airtel",
//   },
// ];

export default function RecentTransaction({
  transactions,
}: {
  transactions: Transaction[];
}) {
  return (
    <View style={{ rowGap: 20 }}>
      <AppText bold>Recent Transactions</AppText>
      <TransactionList transactions={transactions} onPress={(x) => {}} />
    </View>
  );
}

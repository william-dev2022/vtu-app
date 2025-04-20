import { View, Text } from "react-native";
import React from "react";
import TransactionList from "./TransactionList";
import AppText from "./AppText";

const transactions = [
  {
    name: "Airtime",
    amount: "₦500.00",
    date: "11:25 AM  10th, Mar 2025",
    icon: "airtel",
  },
  {
    name: "Fund Wallet",
    amount: "₦5,000.00",
    date: "11:25 AM   20th, Jun 2025",
    icon: "fund",
  },
  {
    name: "Data",
    amount: "₦2,000.00",
    date: "11:25 AM   20th, Jun 2025",
    icon: "mtn",
  },
  {
    name: "Electricity Bill",
    amount: "₦10,000.00",
    date: "11:25 AM   20th, Jun 2025",
    icon: "electricity",
  },
  {
    name: "Airtime",
    amount: "₦500.00",
    date: "10:25 AM   20th, Jun 2025",
    icon: "mtn",
  },
  {
    name: "Electricity",
    amount: "₦3,000.00",
    date: "10:00 AM   26th, Jun 2025",
    icon: "airtel",
  },
];

export default function RecentTransaction() {
  return (
    <View style={{ rowGap: 20 }}>
      <AppText>Recent Transactions</AppText>
      <TransactionList transactions={transactions} onPress={(x) => {}} />
    </View>
  );
}

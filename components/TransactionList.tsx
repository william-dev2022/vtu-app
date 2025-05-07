// Import necessary components and libraries
import { View, Pressable, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { Transaction } from "@/type";
import { Image } from "expo-image";
import AppText from "./AppText";
import { ThemeContext } from "@/context/ThemeContext";
import { iconMap } from "@/helpers/networkIcnMap";
import { formatDateTime } from "@/helpers/common";

// Define the props for the TransactionList component
type Props = {
  transactions: Transaction[]; // List of transactions to display
  onPress: (transaction: Transaction) => void; // Callback when a transaction is pressed
};

export default function TransactionList({ onPress, transactions }: Props) {
  return (
    <View style={{ rowGap: 10 }}>
      {/* Render each transaction as a list item */}
      {transactions.map((transaction, index) => (
        <TransactionListItem
          key={index}
          transaction={transaction}
          onPress={onPress}
        />
      ))}
    </View>
  );
}

// Define the props for the TransactionListItem component
type TransactionListItemProps = {
  transaction: Transaction; // Single transaction to display
  onPress: (transaction: Transaction) => void; // Callback when the item is pressed
};

const styles = StyleSheet.create({
  listItem: {
    flexDirection: "row",
    columnGap: 10,
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 10,
  },
});

const TransactionListItem = ({ transaction }: TransactionListItemProps) => {
  // Access theme context for color scheme
  const { colorScheme } = useContext(ThemeContext);
  const { amount, date, type, meta } = transaction;
  let network = (
    (meta as Record<string, any>)?.network as string
  )?.toLowerCase();

  network =
    network === "9mobile" || network === "etisalat" ? "ninemobile" : network;
  const transactionType = type?.toLowerCase();
  const icon =
    transactionType == "data" || transactionType == "airtime"
      ? network
      : transactionType == "deposit"
      ? "fund"
      : "electricity";

  console.log(network, icon, type);
  return (
    // Pressable item for each transaction
    <Pressable
      style={[styles.listItem, { backgroundColor: colorScheme.secondary }]}
    >
      {/* Display transaction icon */}
      <View>
        <Image
          source={iconMap[icon]}
          contentFit="cover"
          style={{ width: 40, height: 40, borderRadius: 10 }}
        />
      </View>

      {/* Display transaction details */}
      <View>
        <AppText>{type}</AppText>
        <AppText style={{ fontSize: 12, color: "#9F9FA9" }}>
          {formatDateTime(date)}
        </AppText>
      </View>

      {/* Display transaction amount */}
      <AppText style={{ marginLeft: "auto" }}>₦{amount + ".00"}</AppText>
    </Pressable>
  );
};

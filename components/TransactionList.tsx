// Import necessary components and libraries
import { View, Pressable, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { Transaction } from "@/type";
import { Image } from "expo-image";
import AppText from "./AppText";
import { ThemeContext } from "@/context/ThemeContext";
import { iconMap } from "@/helpers/networkIcnMap";

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

  return (
    // Pressable item for each transaction
    <Pressable
      style={[styles.listItem, { backgroundColor: colorScheme.secondary }]}
    >
      {/* Display transaction icon */}
      <View>
        <Image
          source={iconMap[transaction.icon]}
          contentFit="cover"
          style={{ width: 40, height: 40, borderRadius: 10 }}
        />
      </View>

      {/* Display transaction details */}
      <View>
        <AppText>{transaction.name}</AppText>
        <AppText style={{ fontSize: 12, color: "#9F9FA9" }}>
          {transaction.date}
        </AppText>
      </View>

      {/* Display transaction amount */}
      <AppText style={{ marginLeft: "auto" }}>{transaction.amount}</AppText>
    </Pressable>
  );
};

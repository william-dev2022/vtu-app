import { View, Pressable, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { Transaction } from "@/type";
import { Image } from "expo-image";
import AppText from "./AppText";
import { ThemeContext } from "@/context/ThemeContext";
import Colors from "@/constants/Colors";
import { iconMap } from "@/helpers/networkIcnMap";

type Props = {
  transactions: Transaction[];
  onPress: (transaction: Transaction) => void;
};

export default function TransactionList({ onPress, transactions }: Props) {
  return (
    <View style={{ rowGap: 10 }}>
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

type TransactionListItemProps = {
  transaction: Transaction;
  onPress: (transaction: Transaction) => void;
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
  const { currentTheme } = useContext(ThemeContext);

  const isDark = currentTheme === "dark";
  const colorScheme = isDark ? Colors.dark : Colors.light;
  return (
    <Pressable
      style={[styles.listItem, { backgroundColor: colorScheme.secondary }]}
    >
      <View>
        <Image
          source={iconMap[transaction.icon]}
          contentFit="cover"
          style={{ width: 40, height: 40, borderRadius: 10 }}
        />
      </View>
      <View>
        <AppText>{transaction.name}</AppText>
        <AppText style={{ fontSize: 12, color: "#9F9FA9" }}>
          {transaction.date}
        </AppText>
      </View>
      <AppText style={{ marginLeft: "auto" }}>{transaction.amount}</AppText>
    </Pressable>
  );
};

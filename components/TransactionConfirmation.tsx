import React from "react";
import { View, Pressable, StyleSheet } from "react-native";
import AppText from "./AppText";

interface TransactionConfirmationProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const TransactionConfirmation: React.FC<TransactionConfirmationProps> = ({
  onConfirm,
  onCancel,
}) => {
  return (
    <View style={styles.container}>
      <AppText style={styles.title}>Confirm Payment</AppText>
      <AppText style={styles.detail}>Phone Number: 09375436636</AppText>
      <AppText style={styles.detail}>Amount: ₦500</AppText>

      <Pressable style={styles.confirmButton} onPress={onConfirm}>
        <AppText style={styles.buttonText}>Pay</AppText>
      </Pressable>

      <Pressable style={styles.cancelButton} onPress={onCancel}>
        <AppText style={styles.buttonText}>Cancel</AppText>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  detail: {
    fontSize: 16,
    marginBottom: 10,
  },
  confirmButton: {
    backgroundColor: "#065f46",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: "#d32f2f",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
  },
});

export default TransactionConfirmation;

import React, { useContext } from "react";
import { View, StyleSheet } from "react-native";
import AppText from "./AppText";
import { ThemeContext } from "@/context/ThemeContext";

interface DetailRowProps {
  label: string;
  value: string;
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  label: {
    color: "#6b7280",
    fontSize: 14,
    marginBottom: 3,
  },
  value: {
    fontSize: 16,
  },
});

const DetailRow: React.FC<DetailRowProps> = ({ label, value }) => {
  const { colorScheme } = useContext(ThemeContext);

  return (
    <View style={styles.container}>
      <AppText style={styles.label}>{label}</AppText>
      <AppText bold style={[styles.value, { color: colorScheme.text }]}>
        {value}
      </AppText>
    </View>
  );
};

export default DetailRow;
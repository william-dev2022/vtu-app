import { View, Text, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { applyOpacityToColor } from "@/helpers/colorUtils";
import { ThemeContext } from "@/context/ThemeContext";
import AppText from "./AppText";

type Props = {
  pin: string[];
  showPin?: boolean;
};
export default function TransactionCodeInputBox({
  pin,
  showPin = false,
}: Props) {
  const { colorScheme } = useContext(ThemeContext);
  return (
    <View style={styles.container}>
      {[...Array(4)].map((_, index) => (
        <View
          key={index}
          style={{
            ...styles.box,
            borderColor: applyOpacityToColor(colorScheme.text, 0.2),
          }}
        >
          <AppText bold style={{ fontSize: 18 }}>
            {showPin ? pin[index] || "" : !pin[index] ? "" : "∗"}
          </AppText>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    columnGap: 10,
  },
  box: {
    width: 50,
    height: 40,
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});

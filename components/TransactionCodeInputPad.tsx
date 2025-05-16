import { View, Text, Pressable, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { applyOpacityToColor } from "@/helpers/colorUtils";
import AppText from "./AppText";
import { ThemeContext } from "@/context/ThemeContext";
import { Delete } from "lucide-react-native";

type Props = {
  pin: string;
  setPin: React.Dispatch<React.SetStateAction<string>>;
};

export default function TransactionCodeInputPad({ pin, setPin }: Props) {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const { colorScheme } = useContext(ThemeContext);

  return (
    <View style={styles.container}>
      {numbers.map((number, index) => (
        <Pressable
          key={index}
          style={{
            ...styles.numberButton,
            backgroundColor: applyOpacityToColor(colorScheme.text, 0.04),
          }}
          onPress={() => {
            if (pin.length < 4) {
              setPin((prev) => prev + number.toString());
            }
          }}
        >
          <AppText bold style={{ fontSize: 18 }}>
            {number}
          </AppText>
        </Pressable>
      ))}

      <Pressable
        style={{
          ...styles.numberButton,
          width: "59%",
          backgroundColor: applyOpacityToColor(colorScheme.text, 0.04),
        }}
        onPress={() => {
          if (pin.length < 4) {
            setPin((prev) => prev + 0);
          }
        }}
      >
        <AppText bold style={{ fontSize: 18 }}>
          0
        </AppText>
      </Pressable>
      <Pressable
        style={{
          ...styles.numberButton,
          backgroundColor: applyOpacityToColor(colorScheme.text, 0.04),
        }}
        onPress={() => {
          if (pin.length > 0) {
            setPin((prev) => prev.slice(0, -1));
          }
        }}
      >
        <Delete color={colorScheme.text} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 20,
  },
  numberButton: {
    width: "28%",
    margin: "1.5%",
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
});

import { View, Text, Pressable } from "react-native";
import React, { useContext, useState } from "react";
import TransactionCodeInputBox from "@/components/TransactionCodeInputBox";
import TransactionCodeInputPad from "@/components/TransactionCodeInputPad";
import AppText from "@/components/AppText";
import { ThemeContext } from "@/context/ThemeContext";

type Props = {
  handlePinSubmit: () => void;
};

export default function CompleteTransaction({ handlePinSubmit }: Props) {
  const [pin, setPin] = useState("");
  const { colorScheme } = useContext(ThemeContext);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: "transparent",
      }}
    >
      <View
        style={{
          width: "100%",
          padding: 20,
          borderRadius: 10,
          height: "46%",
          backgroundColor: colorScheme.secondary,
        }}
      >
        <AppText
          style={{ fontSize: 18, marginBottom: 10, textAlign: "center" }}
        >
          Enter PIN
        </AppText>
        <TransactionCodeInputBox pin={pin.split("")} showPin={false} />

        <TransactionCodeInputPad pin={pin} setPin={setPin} />

        <Pressable
          style={{
            marginTop: 10,
            padding: 10,
            backgroundColor: "#065f46",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 5,
          }}
          onPress={handlePinSubmit}
        >
          <AppText style={{ fontSize: 18, color: "white" }}>Submit</AppText>
        </Pressable>
      </View>
    </View>
  );
}

import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Keyboard,
  TextInput,
} from "react-native";
import React, { useContext, useRef } from "react";
import { applyOpacityToColor } from "@/helpers/colorUtils";
import { ThemeContext } from "@/context/ThemeContext";
import AppText from "./AppText";
import { wp } from "@/helpers/common";

type Props = {
  pin: string[];
  showPin?: boolean;
  length?: number;
  handlCodeChange: (code: string) => void;
};
export default function CodeInputBox({
  pin,
  showPin = false,
  length = 4,
  handlCodeChange,
}: Props) {
  const { colorScheme } = useContext(ThemeContext);
  const inputRef = useRef<TextInput>(null);
  const [isFocused, setIsFocused] = React.useState(false);

  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      setIsFocused(true); // Update the state to reflect that the input is focused
    }
  };

  const handleTextInputChange = (text: string) => {
    if (text.length > length) {
      text = text.slice(0, length);
      handlCodeChange(text);
      return;
    }

    handlCodeChange(text);
    if (text.length === length) {
      Keyboard.dismiss(); // Dismiss the keyboard when the input is filled
      inputRef.current?.blur(); // Remove focus from input
      setIsFocused(false); // Update the state to reflect that the input is not focused
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        ref={inputRef}
        onChangeText={handleTextInputChange}
        maxLength={length}
        keyboardType="number-pad"
        style={{ position: "absolute", height: 0, width: 0, opacity: 0 }}
        placeholder="Keyboard opens on load"
      />
      {[...Array(length)].map((_, index) => (
        <Pressable
          onPress={handleFocus}
          key={index}
          style={{
            ...styles.box,
            borderColor: applyOpacityToColor(
              colorScheme.text,
              isFocused ? 0.7 : 0.2
            ),
            width: length === wp(15) ? 0.6 : wp(10),
          }}
        >
          <AppText bold style={{ fontSize: 18 }}>
            {pin[index] || ""}
          </AppText>
        </Pressable>
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

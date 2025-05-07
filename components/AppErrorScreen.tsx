import { View, Text, Pressable } from "react-native";
import React, { ReactNode } from "react";
import { hp, wp } from "@/helpers/common";
import AppText from "./AppText";

type Props = {
  content?: ReactNode;
  title: string;
  description?: string;
  buttonText: string;
  onPress?: () => void;
};

export default function AppErrorScreen({
  content,
  title,
  description,
  buttonText,
  onPress,
}: Props) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        height: hp(100),
        width: wp(100),
        backgroundColor: "rgb(0, 0, 0)",
        opacity: 0.4,
      }}
    >
      {content ? (
        content
      ) : (
        <View>
          <AppText bold>{title}</AppText>
          <AppText>{description}</AppText>

          {buttonText && (
            <Pressable onPress={onPress}>
              <AppText>{buttonText}</AppText>
            </Pressable>
          )}
        </View>
      )}
    </View>
  );
}

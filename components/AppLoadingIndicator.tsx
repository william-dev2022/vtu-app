import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { hp, wp } from "@/helpers/common";

import { Dimensions } from "react-native";

const { width: deviceWidth, height: deviceHeight } = Dimensions.get("window");

export default function AppLoadingIndicator({
  isLoading = false,
}: {
  isLoading: boolean;
}) {
  if (!isLoading) {
    return null;
  }
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        zIndex: 1000000000,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        height: deviceHeight,
        width: deviceWidth,
        backgroundColor: "rgb(0, 0, 0)",
        opacity: 0.4,
      }}
    >
      <ActivityIndicator color="#fff" size="large" />
    </View>
  );
}

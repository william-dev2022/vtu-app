import { View, Text, ScrollView, Pressable } from "react-native";
import React, { useContext } from "react";
import { Image } from "expo-image";
import AppText from "./AppText";
import { iconMap } from "@/helpers/networkIcnMap";
import { ThemeContext } from "@/context/ThemeContext";
import { RECENT_AIRTIME_NUMBERS_TYPE } from "@/api/localStorage";

export default function RecentSubcriptionNumbers({
  recentNumbers,
  onSelect,
}: {
  recentNumbers: RECENT_AIRTIME_NUMBERS_TYPE[];
  onSelect: (number: string) => void;
}) {
  const { colorScheme } = useContext(ThemeContext);

  return (
    <View style={{ backgroundColor: colorScheme.secondary }}>
      <ScrollView
        showsHorizontalScrollIndicator={false}
        horizontal
        style={{ paddingTop: 20 }}
      >
        {recentNumbers.map((recent, index) => (
          <Pressable
            onPress={() => onSelect(recent.number)}
            key={index}
            style={{
              alignItems: "center",
              padding: 10,
            }}
          >
            {/* Display network icon */}
            <Image
              source={iconMap[recent.network || ""]}
              contentFit="cover"
              style={{ width: 30, height: 30, borderRadius: 10 }}
            />
            {/* Display transaction number */}
            <AppText style={{ fontSize: 12 }}>{recent.number}</AppText>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

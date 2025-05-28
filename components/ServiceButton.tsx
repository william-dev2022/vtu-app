import { useRouter } from "expo-router";
import { Dimensions, Pressable, StyleSheet } from "react-native";
import AppText from "./AppText";
import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import Colors from "@/constants/Colors";
import { Service } from "@/type";
import { Ionicons } from "@expo/vector-icons";

const windowWidth = Dimensions.get("window").width;
const itemWidth = windowWidth / 4.9;

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    columnGap: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    width: itemWidth,
    minWidth: Dimensions.get("window").width / 5,
    // maxWidth: "20%",
  },
});

export const ServiceButton = ({ name, status }: Service) => {
  const { currentTheme } = useContext(ThemeContext);
  const router = useRouter();

  // console.log("ServiceButton rendered with name:", name, "and status:", status);

  const colorScheme = currentTheme === "dark" ? Colors.dark : Colors.light;
  const serviceName = name.toLowerCase();
  const icon =
    serviceName == "airtime" ? (
      <Ionicons name="cellular-outline" size={16} color={colorScheme.icon} />
    ) : serviceName == "data" ? (
      <Ionicons name="wifi-outline" size={16} color={colorScheme.icon} />
    ) : serviceName == "exam pin" ? (
      <Ionicons name="book-outline" size={16} color={colorScheme.icon} />
    ) : serviceName == "cable bill" ? (
      <Ionicons name="tv-outline" size={16} color={colorScheme.icon} />
    ) : serviceName == "betting" ? (
      <Ionicons
        name="game-controller-outline"
        size={16}
        color={colorScheme.icon}
      />
    ) : (
      <Ionicons
        name="ellipsis-vertical-circle-outline"
        size={16}
        color={colorScheme.icon}
      />
    );

  const link =
    serviceName == "airtime"
      ? "/home/buy-airtime"
      : serviceName == "data"
      ? "/home/buy-data"
      : serviceName == "exam pin"
      ? "/home/exam-pin"
      : serviceName == "betting"
      ? "/"
      : "/home/cable-subscription";

  const handlePress = () => {
    if (link) {
      try {
        router.push(link);
      } catch (error) {
        console.error("Navigation error:", error);
      }
    } else {
      console.warn("No link provided for service:", name);
    }
  };

  return (
    <Pressable
      disabled={status !== "active"}
      onPress={handlePress}
      style={[
        styles.button,
        {
          backgroundColor: colorScheme.secondary,
          opacity: status !== "active" ? 0.5 : 1,
        },
      ]}
    >
      {icon}
      <AppText style={{ fontSize: 12, textAlign: "center" }}>{name}</AppText>
    </Pressable>
  );
};

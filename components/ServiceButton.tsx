import { useRouter } from "expo-router";
import { Dimensions, Pressable, StyleSheet } from "react-native";
import AppText from "./AppText";
import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import Colors from "@/constants/Colors";

type Service = {
  name: string;
  link?: string | any;
  icon: JSX.Element;
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    columnGap: 5,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    minWidth: Dimensions.get("window").width / 5,
  },
});

export const ServiceButton = ({ name, link, icon }: Service) => {
  const { currentTheme } = useContext(ThemeContext);
  const router = useRouter();

  const colorScheme = currentTheme === "dark" ? Colors.dark : Colors.light;

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
      onPress={handlePress}
      style={[styles.button, { backgroundColor: colorScheme.secondary }]}
    >
      {icon}
      <AppText>{name}</AppText>
    </Pressable>
  );
};

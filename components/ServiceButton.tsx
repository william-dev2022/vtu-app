import { useRouter } from "expo-router";
import { Dimensions, Pressable } from "react-native";
import AppText from "./AppText";
import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import Colors from "@/constants/Colors";

type Service = {
  name: string;
  link?: string | any;
  icon: JSX.Element;
};

export const ServiceButton = ({ name, link, icon }: Service) => {
  const { currentTheme } = useContext(ThemeContext);
  const router = useRouter();

  const colorScheme = currentTheme === "dark" ? Colors.dark : Colors.light;
  const { width } = Dimensions.get("window");
  return (
    <Pressable
      onPress={() => link && router.push(link)}
      style={{
        alignItems: "center",
        columnGap: 5,
        backgroundColor: colorScheme.secondary,
        paddingVertical: 10,
        paddingHorizontal: 10,
        borderRadius: 10,
        minWidth: width / 5,
      }}
    >
      {icon}
      <AppText>{name}</AppText>
    </Pressable>
  );
};

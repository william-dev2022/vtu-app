import { ThemeContext } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import { View, StyleSheet } from "react-native";
import AppText from "./AppText";
import { ServiceButton } from "./ServiceButton";

type Service = {
  name: string;
  link?: string;
  icon: JSX.Element;
};

const styles = StyleSheet.create({
  container: {
    rowGap: 20,
  },
  serviceRow: {
    flexDirection: "row",
    columnGap: 10,
    justifyContent: "space-between",
  },
});

const Services = () => {
  const { colorScheme } = useContext(ThemeContext);

  const services: Service[] = [
    {
      name: "Airtime",
      link: "/buy-airtime",
      icon: (
        <Ionicons name="cellular-outline" size={16} color={colorScheme.icon} />
      ),
    },
    {
      name: "Data",
      link: "/buy-data",
      icon: <Ionicons name="wifi-outline" size={16} color={colorScheme.icon} />,
    },
    {
      name: "Electricity",
      link: "/buy-electricity",
      icon: <Ionicons name="bulb-outline" size={16} color={colorScheme.icon} />,
    },
    {
      name: "More",
      link: "/buy-airtime",
      icon: (
        <Ionicons
          name="ellipsis-vertical-circle-outline"
          size={16}
          color={colorScheme.icon}
        />
      ),
    },
  ];
  return (
    <View style={styles.container}>
      <AppText bold>Quick Links</AppText>

      <View style={styles.serviceRow}>
        {services.map((service, index) => (
          <ServiceButton
            key={index}
            name={service.name}
            link={service.link}
            icon={service.icon}
          />
        ))}
      </View>
    </View>
  );
};

export default Services;

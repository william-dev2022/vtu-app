import { ThemeContext } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import { View } from "react-native";
import AppText from "./AppText";
import { ServiceButton } from "./ServiceButton";

const Services = () => {
  const { colorScheme } = useContext(ThemeContext);

  const services = [
    {
      name: "Airtime",
      link: "/home/buy-airtime",
      icon: (
        <Ionicons name="cellular-outline" size={16} color={colorScheme.icon} />
      ),
    },
    {
      name: "Data",
      link: "/home/buy-data",
      icon: <Ionicons name="wifi-outline" size={16} color={colorScheme.icon} />,
    },
    {
      name: "Electricity",
      icon: <Ionicons name="bulb-outline" size={16} color={colorScheme.icon} />,
    },
    {
      name: "More",
      link: "/home/buy-airtime",
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
    <View style={{ rowGap: 20 }}>
      <AppText bold>Quick Links</AppText>

      <View
        style={{
          flexDirection: "row",
          columnGap: 10,
          justifyContent: "space-between",
        }}
      >
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

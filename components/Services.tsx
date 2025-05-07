import { View, StyleSheet } from "react-native";
import AppText from "./AppText";
import { ServiceButton } from "./ServiceButton";
import { useAppData } from "@/providers/AppDataProvider";

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
  const { services } = useAppData();

  return (
    <View style={styles.container}>
      <AppText bold>Quick Links</AppText>

      <View style={styles.serviceRow}>
        {services.map((service, index) => (
          <ServiceButton
            key={index}
            name={service.name}
            link={service.link}
            iconText={""}
            status={service.status}
            // icon={service.icon}
          />
        ))}
      </View>
    </View>
  );
};

export default Services;

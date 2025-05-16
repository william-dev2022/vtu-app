import { View, StyleSheet, Dimensions } from "react-native";
import AppText from "./AppText";
import { ServiceButton } from "./ServiceButton";
import { useAppData } from "@/providers/AppDataProvider";
import { wp } from "@/helpers/common";

const styles = StyleSheet.create({
  container: {
    rowGap: 20,
  },
  serviceRow: {
    flexDirection: "row",
    columnGap: 10,
    rowGap: 10,
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
});

const Services = () => {
  const { services } = useAppData();

  const testServices = [...services, ...services];
  const fillRow = Math.ceil(services.length % 4);
  const windowWidth = Dimensions.get("window").width;
  const itemWidth = windowWidth / 4.9;
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
        {Array.from({ length: fillRow }, (_, index) => (
          <View
            key={index}
            style={{
              alignItems: "center",
              columnGap: 5,
              paddingVertical: 10,
              paddingHorizontal: 10,
              borderRadius: 10,
              width: itemWidth,
              minWidth: Dimensions.get("window").width / 5,
            }}
          />
        ))}
      </View>
    </View>
  );
};

export default Services;

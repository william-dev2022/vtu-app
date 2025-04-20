import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import AppText from "@/components/AppText";
import { CirclePlus, Eye } from "lucide-react-native";
import { Image } from "expo-image";
import RecentTransaction from "@/components/RecentTransaction";

export default function index() {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Header />
        <Services />

        <RecentTransaction />
      </View>
    </ScrollView>
  );
}

const Header = () => {
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            columnGap: 5,
          }}
        >
          {/* Avatar */}
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 25,
              backgroundColor: "gray",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons name="person-circle-outline" size={40} color="white" />
          </View>

          <AppText>
            Welcome, <AppText bold>Alex</AppText>
          </AppText>
        </View>

        <View>
          <Ionicons name="notifications" size={18} color="white" />
        </View>
      </View>

      {/* Balance */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: 20,
        }}
      >
        <View style={{ rowGap: 5 }}>
          <AppText>Wallet Balance</AppText>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              columnGap: 10,
            }}
          >
            <AppText style={{ fontSize: 25 }}>₦150.00</AppText>
            <Pressable>
              <Eye size={18} color="white" />
            </Pressable>
          </View>
        </View>

        <Pressable
          style={{
            marginTop: 20,
            flexDirection: "row",
            alignItems: "center",
            columnGap: 4,
            backgroundColor: "#230C33",
            paddingVertical: 10,
            paddingHorizontal: 10,
            borderRadius: 10,
          }}
        >
          <CirclePlus size={16} color="white" />
          <AppText>Fund Wallet</AppText>
        </Pressable>
      </View>
    </View>
  );
};

const Services = () => {
  const { height, width } = Dimensions.get("window");
  const services = [
    {
      name: "Airtime",
      icon: <Ionicons name="cellular-outline" size={16} color="white" />,
    },
    {
      name: "Data",
      icon: <Ionicons name="wifi-outline" size={16} color="white" />,
    },
    {
      name: "Electricity",
      icon: <Ionicons name="bulb-outline" size={16} color="white" />,
    },
    {
      name: "More",
      icon: (
        <Ionicons
          name="ellipsis-vertical-circle-outline"
          size={16}
          color="white"
        />
      ),
    },
  ];
  return (
    <View style={{ rowGap: 20 }}>
      <AppText>Quick Links</AppText>

      <View>
        <View
          style={{
            flexDirection: "row",
            columnGap: 10,
            justifyContent: "space-between",
          }}
        >
          {services.map((service, index) => (
            <Pressable
              key={index}
              style={{
                alignItems: "center",
                columnGap: 5,
                backgroundColor: "#09090B",
                paddingVertical: 10,
                paddingHorizontal: 10,
                borderRadius: 10,
                minWidth: width / 5,
              }}
            >
              {service.icon}
              <AppText>{service.name}</AppText>
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 20,
    rowGap: 40,
  },
});

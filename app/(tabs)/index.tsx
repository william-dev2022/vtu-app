import {
  Dimensions,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import React, { useContext } from "react";
import { Ionicons } from "@expo/vector-icons";
import AppText from "@/components/AppText";
import { CirclePlus, Eye } from "lucide-react-native";
import { Image } from "expo-image";
import RecentTransaction from "@/components/RecentTransaction";
import ThemedContainer from "@/components/ThemedContainer";
import { ThemeContext } from "@/context/ThemeContext";
import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";

export default function index() {
  return (
    <ThemedContainer>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, backgroundColor: "transparent" }}
      >
        <View style={styles.container}>
          <Header />
          <Services />

          <RecentTransaction />
        </View>
      </ScrollView>
    </ThemedContainer>
  );
}

const Header = () => {
  const { currentTheme, toggleTheme } = useContext(ThemeContext);

  const colorScheme = currentTheme === "dark" ? Colors.dark : Colors.light;
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
            backgroundColor: colorScheme.secondary,
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
  const { currentTheme, toggleTheme } = useContext(ThemeContext);
  const router = useRouter();

  const colorScheme = currentTheme === "dark" ? Colors.dark : Colors.light;

  const services = [
    {
      name: "Airtime",
      icon: (
        <Ionicons name="cellular-outline" size={16} color={colorScheme.icon} />
      ),
    },
    {
      name: "Data",
      icon: <Ionicons name="wifi-outline" size={16} color={colorScheme.icon} />,
    },
    {
      name: "Electricity",
      icon: <Ionicons name="bulb-outline" size={16} color={colorScheme.icon} />,
    },
    {
      name: "More",
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
              onPress={() => router.push("/home/buy-airtime")}
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
    marginTop: 60,
    rowGap: 30,
    // backgroundColor: "red",
  },
});

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
import RecentTransaction from "@/components/RecentTransaction";
import ThemedContainer from "@/components/ThemedContainer";
import { ThemeContext } from "@/context/ThemeContext";
import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";
import Services from "@/components/Services";

export default function Index() {
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
  const { colorScheme } = useContext(ThemeContext);

  const router = useRouter();
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
          onPress={() => router.push("/home/fund-wallet")}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
    rowGap: 30,
    // backgroundColor: "red",
  },
});

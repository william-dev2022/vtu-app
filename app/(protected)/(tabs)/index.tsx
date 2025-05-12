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
import { useRouter } from "expo-router";
import Services from "@/components/Services";
import { useAppData } from "@/providers/AppDataProvider";
import AppLoadingIndicator from "@/components/AppLoadingIndicator";
import AppErrorScreen from "@/components/AppErrorScreen";
import useAuth from "@/context/AuthContext";
import { formatAmount } from "@/helpers/common";

export default function Index() {
  const { loading, transactions, error } = useAppData();

  if (error) {
    return (
      <AppErrorScreen
        buttonText="Retry"
        title="Something Went Wrong"
        description="check your internet connection and retry"
      />
    );
  }

  return (
    <ThemedContainer>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, backgroundColor: "transparent" }}
      >
        <View style={styles.container}>
          <Header />
          <Services />

          <RecentTransaction transactions={transactions.slice(0, 5)} />
        </View>
      </ScrollView>

      {loading && <AppLoadingIndicator isLoading={loading} />}
    </ThemedContainer>
  );
}

const Header = () => {
  const { colorScheme } = useContext(ThemeContext);
  const { user } = useAuth();
  const { balance } = useAppData();

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
              backgroundColor: colorScheme.background,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons
              name="person-circle-outline"
              size={40}
              color={colorScheme.icon}
            />
          </View>

          <AppText>
            {/* Welcome,{" "} */}
            <AppText bold style={{ fontSize: 15 }}>
              {user
                ? user.name.substring(0, 1).toUpperCase() +
                  user.name.substring(1).toLowerCase()
                : "Alex"}
            </AppText>
          </AppText>
        </View>

        <View>
          <Ionicons name="notifications" size={18} color={colorScheme.icon} />
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
            <AppText style={{ fontSize: 24 }}>
              {balance != null && balance >= 0 ? formatAmount(balance) : "∗∗∗"}
            </AppText>
            <Pressable>
              <Eye size={18} color={colorScheme.icon} />
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
          <CirclePlus size={16} color={colorScheme.icon} />
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

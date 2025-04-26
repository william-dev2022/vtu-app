import { View } from "react-native";
import React from "react";
import ThemedContainer from "@/components/ThemedContainer";
import AppText from "@/components/AppText";
import SettingThemeToggle from "@/components/SettingThemeToggle";
import SettingsItemList from "@/components/SettingItemList";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function profile() {
  const router = useRouter();
  return (
    <ThemedContainer style={{ paddingTop: 60 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 40,
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
              backgroundColor: "black",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Ionicons
              name="person-circle-outline"
              size={40}
              color="rgb(181, 181, 183)"
            />
          </View>

          <View>
            <AppText>John Doe</AppText>
            <AppText style={{ fontSize: 12 }}>mail@samplemail.com</AppText>
          </View>
        </View>
      </View>
      <SettingThemeToggle />

      <View style={{ marginTop: 10, marginBottom: 20 }}>
        <SettingsItemList
          title={"Account Details"}
          onPress={() => router.push("/home/profile-details")}
          iconText="account-details-outline"
        />
        <SettingsItemList
          title={"Transactions Settings"}
          onPress={() => {}}
          iconText="account-lock"
        />
        <SettingsItemList
          title={"Notification Settings"}
          onPress={() => {}}
          iconText="bell-ring-outline"
        />
      </View>

      <View>
        <SettingsItemList
          title={"Share App"}
          onPress={() => {}}
          iconText="share-circle"
        />
        <SettingsItemList
          title={"Rate App"}
          onPress={() => {}}
          iconText="star-circle-outline"
        />
        <SettingsItemList
          title={"Log Out"}
          onPress={() => {}}
          iconText="power-cycle"
        />
      </View>
    </ThemedContainer>
  );
}

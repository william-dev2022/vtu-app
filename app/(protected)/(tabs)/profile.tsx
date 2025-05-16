import { View } from "react-native";
import React from "react";
import ThemedContainer from "@/components/ThemedContainer";
import AppText from "@/components/AppText";
import SettingThemeToggle from "@/components/SettingThemeToggle";
import SettingsItemList from "@/components/SettingItemList";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import useAuth from "@/context/AuthContext";
import { Share } from "react-native";

export default function profile() {
  const router = useRouter();
  const { signOut, user } = useAuth();

  const onShare = async () => {
    try {
      const result = await Share.share({
        url: "Check out this awesome app! Download it here: https://yourapp.link",
        title: "Share Our App",
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      console.log("Error", error.message);
    }
  };

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
            <AppText>{user?.name}</AppText>
            <AppText style={{ fontSize: 12 }}>{user?.phoneNumber}</AppText>
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
          title={"Transactions Pin"}
          onPress={() => router.push("/home/pin-reset")}
          iconText="lock"
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
          onPress={onShare}
          iconText="share-circle"
        />
        <SettingsItemList
          title={"Rate App"}
          onPress={() => {}}
          iconText="star-circle-outline"
        />
        <SettingsItemList
          title={"Log Out"}
          onPress={signOut}
          iconText="power-cycle"
        />
      </View>
    </ThemedContainer>
  );
}

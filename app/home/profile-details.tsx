import { View, ScrollView, Pressable } from "react-native";
import React, { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import AppText from "@/components/AppText";
import ThemedContainer from "@/components/ThemedContainer";
import DetailRow from "@/components/DetailRow";

export default function ProfileDetails() {
  const { colorScheme } = useContext(ThemeContext);

  // Mocked user details (you can later fetch real ones)
  const user = {
    name: "John Doe v",
    phone: "08123456789",
    email: "johndoe@example.com",
    walletBalance: 4500, // in naira
    accountNumber: "1234567890",
    bankName: "Wema Bank",
  };

  return (
    <ThemedContainer style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          padding: 20,
          flexGrow: 1,
        }}
        accessibilityLabel="Profile details screen"
      >
        <AppText
          bold
          style={{ fontSize: 24, marginBottom: 20, color: colorScheme.text }}
          accessibilityRole="header"
          accessibilityLabel="Profile Details Header"
        >
          Profile Details
        </AppText>

        {/* User Basic Info */}
        <View style={{ marginBottom: 30 }}>
          <DetailRow label="Full Name" value={user.name} />
          <DetailRow label="Phone Number" value={user.phone} />
          <DetailRow label="Email" value={user.email} />
        </View>

        {/* Wallet Info */}
        <View style={{ marginBottom: 30 }}>
          <AppText
            bold
            style={{ fontSize: 18, marginBottom: 10, color: colorScheme.text }}
            accessibilityRole="header"
            accessibilityLabel="Wallet Information Header"
          >
            Wallet
          </AppText>
          <DetailRow
            label="Balance"
            value={`₦${user.walletBalance.toLocaleString()}`}
          />
          <DetailRow label="Account Number" value={user.accountNumber} />
          <DetailRow label="Bank Name" value={user.bankName} />
        </View>

        {/* Edit Profile Button */}
        <Pressable
          style={{
            backgroundColor: "#0f766e",
            padding: 15,
            borderRadius: 10,
            alignItems: "center",
          }}
          onPress={() => {
            console.log("Edit Profile Pressed");
          }}
          accessibilityRole="button"
          accessibilityLabel="Edit Profile Button"
          accessibilityHint="Navigates to the edit profile screen"
        >
          <AppText bold style={{ color: "#fff", fontSize: 16 }}>
            Edit Profile
          </AppText>
        </Pressable>
      </ScrollView>
    </ThemedContainer>
  );
}

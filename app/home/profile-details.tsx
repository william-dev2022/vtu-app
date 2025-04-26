import { View, ScrollView, Pressable } from "react-native";
import React, { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import AppText from "@/components/AppText";
import ThemedContainer from "@/components/ThemedContainer";

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
          // backgroundColor: colorScheme.background,
          flexGrow: 1,
        }}
      >
        <AppText
          bold
          style={{ fontSize: 24, marginBottom: 20, color: colorScheme.text }}
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
            // later navigate to edit profile screen
            console.log("Edit Profile Pressed");
          }}
        >
          <AppText bold style={{ color: "#fff", fontSize: 16 }}>
            Edit Profile
          </AppText>
        </Pressable>
      </ScrollView>
    </ThemedContainer>
  );
}

// Reusable component for each row
function DetailRow({ label, value }: { label: string; value: string }) {
  const { colorScheme } = useContext(ThemeContext);

  return (
    <View style={{ marginBottom: 15 }}>
      <AppText style={{ color: "#6b7280", fontSize: 14, marginBottom: 3 }}>
        {label}
      </AppText>
      <AppText bold style={{ fontSize: 16, color: colorScheme.text }}>
        {value}
      </AppText>
    </View>
  );
}

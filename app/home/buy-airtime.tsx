// Import necessary components and libraries
import {
  View,
  ScrollView,
  TextInput,
  Pressable,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState } from "react";
import ThemedContainer from "@/components/ThemedContainer";
import AppText from "@/components/AppText";
import { previousTransactions as previousAirtimeTransactions } from "@/data/sample";
import { Image } from "expo-image";
import { iconMap } from "@/helpers/networkIcnMap";
import { Contact } from "lucide-react-native";
import { ThemeContext } from "@/context/ThemeContext";

// Utility function to parse amount input
const parseAmount = (value: string): number | null => {
  const parsed = parseInt(value, 10); // specify radix 10 for clarity
  return isNaN(parsed) ? null : parsed;
};

export default function BuyAirtime() {
  // Get screen dimensions
  const { width } = Dimensions.get("window");
  // Access theme context for color scheme
  const { colorScheme } = useContext(ThemeContext);

  // State variables for user input
  const [amount, setAmount] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // Handle changes to the amount input
  const handleAmountChange = (amount: string) => {
    const parsedAmount = parseAmount(amount);

    if (parsedAmount != null) {
      setAmount(amount);
    } else {
      setAmount("");
    }
  };

  // Handle changes to the phone number input
  const handlePhoneNumberChange = (phoneNumber: string) => {
    if (phoneNumber.length > 11) {
      return;
    }

    setPhoneNumber(phoneNumber);
  };

  return (
    // Themed container for consistent styling
    <ThemedContainer style={{ paddingHorizontal: 0 }}>
      {/* Section for displaying previous transactions */}
      <View style={{ backgroundColor: colorScheme.secondary }}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          style={{ paddingTop: 20 }}
        >
          {previousAirtimeTransactions.map((transaction) => (
            <Pressable
              onPress={() => handlePhoneNumberChange(transaction.number)}
              key={transaction.id}
              style={{
                alignItems: "center",
                padding: 10,
              }}
            >
              {/* Display network icon */}
              <Image
                source={iconMap[transaction.network]}
                contentFit="cover"
                style={{ width: 30, height: 30, borderRadius: 10 }}
              />
              {/* Display transaction number */}
              <AppText style={{ fontSize: 12 }}>{transaction.number}</AppText>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* Section for user input and airtime plans */}
      <View
        style={{
          padding: 20,
          marginTop: 20,
          minHeight: 40,
          backgroundColor: colorScheme.secondary,
          borderRadius: 10,
          marginHorizontal: 10,
        }}
      >
        {/* Display user balance */}
        <AppText style={{ fontSize: 16, color: "#a1a1aa", textAlign: "right" }}>
          Balance: ₦535
        </AppText>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            columnGap: 10,
            borderBottomWidth: 0.3,
            borderColor: "#e4e4e7",
            marginTop: 20,
          }}
        >
          {/* Display selected network icon */}
          <Image
            source={iconMap["mtn"]}
            contentFit="cover"
            style={{ width: 25, height: 25, borderRadius: 10 }}
          />
          {/* Input field for phone number */}
          <TextInput
            style={{
              flex: 1,
              minHeight: 40,
              color: "rgb(190, 187, 187)",
              fontSize: 18,
            }}
            value={phoneNumber}
            onChangeText={handlePhoneNumberChange}
            placeholderTextColor="rgb(105, 104, 104)"
            placeholder="09375436636"
            keyboardType="phone-pad"
          />

          {/* Button to open contact list */}
          <Pressable>
            <Contact color="white" size={20} />
          </Pressable>
        </View>

        {/* Airtime Plans */}
        <View style={{ marginTop: 30 }}>
          <AppText>Top up Airtime</AppText>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
              justifyContent: "space-between",
              rowGap: 10,
              marginTop: 10,
            }}
          >
            {/* Display predefined airtime amounts */}
            {[100, 200, 300, 400, 500, 1000, 1500, 2000].map((item) => (
              <TouchableOpacity
                onPress={() => handleAmountChange(item.toString())}
                key={item}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: width * 0.2,
                  padding: 10,
                  backgroundColor: colorScheme.background,
                  borderRadius: 10,
                  justifyContent: "center",
                }}
              >
                <AppText style={{ fontSize: 16 }} key={item}>
                  ₦{item}
                </AppText>
              </TouchableOpacity>
            ))}
          </View>

          <View
            style={{
              marginTop: 20,
              flexDirection: "row",
              alignItems: "center",
              borderBottomWidth: 0.3,
              borderColor: "rgb(105, 104, 104)",
            }}
          >
            {/* Input field for custom airtime amount */}
            <AppText style={{ fontSize: 18 }}>₦</AppText>
            <TextInput
              style={{
                flex: 1,
                minHeight: 40,
                color: "rgb(190, 187, 187)",
                fontSize: 18,
                fontFamily: "Krub_400Regular",
                marginBottom: 0,
              }}
              onChangeText={handleAmountChange}
              value={amount}
              placeholderTextColor="rgb(105, 104, 104)"
              placeholder="50-50000"
              keyboardType="phone-pad"
            />

            {/* Button to initiate payment */}
            <Pressable
              style={{
                paddingHorizontal: 15,
                paddingVertical: 5,
                borderRadius: 40,
                backgroundColor: "#065f46",
              }}
            >
              <AppText>Pay</AppText>
            </Pressable>
          </View>
        </View>
      </View>
    </ThemedContainer>
  );
}

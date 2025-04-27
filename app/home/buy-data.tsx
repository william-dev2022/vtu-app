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
import {
  groupedPlans,
  previousTransactions as previousAirtimeTransactions,
} from "@/data/sample";
import { Image } from "expo-image";
import { iconMap } from "@/helpers/networkIcnMap";
import { Contact } from "lucide-react-native";
import { ThemeContext } from "@/context/ThemeContext";

// Utility function to parse amount input
const parseAmount = (value: string): number | null => {
  const parsed = parseInt(value, 10); // specify radix 10 for clarity
  return isNaN(parsed) ? null : parsed;
};

export default function BuyData() {
  // Get screen dimensions
  const { width } = Dimensions.get("window");
  // Access theme context for color scheme
  const { colorScheme } = useContext(ThemeContext);

  // State variables for user input and selected plan menu
  const [amount, setAmount] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [currentPlanMenu, setCurrentPlanMenu] =
    useState<keyof typeof groupedPlans>("daily");

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
              <AppText
                style={{
                  fontSize: 12,
                  fontFamily: "Poppins_400Regular",
                  marginTop: 4,
                }}
              >
                {transaction.number}
              </AppText>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* Section for user input and data plans */}
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
              fontFamily: "Krub_400Regular",
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

        {/* Data Plans */}
        <View style={{ marginTop: 30 }}>
          <View
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              marginBottom: 20,
            }}
          >
            {/* Tabs for selecting data plan categories */}
            {Object.keys(groupedPlans).map((key, index) => (
              <Pressable
                onPress={() =>
                  setCurrentPlanMenu(key as keyof typeof groupedPlans)
                }
                style={{
                  borderBottomWidth: index == 0 ? 3 : 0,
                  borderColor: "#0f766e",
                  borderBottomRightRadius: 5,
                  borderBottomLeftRadius: 5,
                }}
                key={key}
              >
                <AppText
                  style={{
                    textTransform: "capitalize",
                  }}
                >
                  {key.toString()}
                </AppText>
              </Pressable>
            ))}
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              flexWrap: "wrap",
              columnGap: 4,
              rowGap: 10,
              marginTop: 10,
            }}
          >
            {/* Display available data plans */}
            {groupedPlans[currentPlanMenu].map((plan, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  alignItems: "center",
                  width: width * 0.2,
                  padding: 10,
                  backgroundColor: colorScheme.background,
                  borderRadius: 10,
                  justifyContent: "center",
                  rowGap: 5,
                }}
              >
                <AppText style={{ fontSize: 16 }}>{plan.data}</AppText>
                <AppText style={{ fontSize: 12 }}>{plan.duration}</AppText>
                <AppText style={{ fontSize: 12 }}>₦{plan.price}</AppText>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </ThemedContainer>
  );
}

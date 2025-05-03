// Import necessary components and libraries
import {
  View,
  ScrollView,
  TextInput,
  Pressable,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
  ToastAndroid,
} from "react-native";
import React, {
  useContext,
  useState,
  useRef,
  useCallback,
  useEffect,
} from "react";
import ThemedContainer from "@/components/ThemedContainer";
import AppText from "@/components/AppText";
import { previousTransactions as previousAirtimeTransactions } from "@/data/sample";
import { Image } from "expo-image";
import { iconMap } from "@/helpers/networkIcnMap";
import { Contact, Delete } from "lucide-react-native";
import { ThemeContext } from "@/context/ThemeContext";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { applyOpacityToColor } from "@/helpers/colorUtils";
import { Ionicons } from "@expo/vector-icons";
import TransactionCodeInputBox from "@/components/TransactionCodeInputBox";
import TransactionCodeInputPad from "@/components/TransactionCodeInputPad";
import { useRouter } from "expo-router";
import CompleteTransaction from "@/components/CompleteTransaction";
import Toast from "react-native-toast-message";
import { useToast } from "react-native-toast-notifications";

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
  const toast = useToast();

  // State variables for user input
  const [amount, setAmount] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [pin, setPin] = useState("");

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const router = useRouter();

  // Update the function to show the bottom sheet
  const showBottomSheet = () => {
    console.log("Pay button clicked, attempting to present BottomSheetModal");
    bottomSheetModalRef.current?.present();
    setIsModalVisible(true);
  };

  // Update the function to hide the bottom sheet
  const hideBottomSheet = () => {
    bottomSheetModalRef.current?.dismiss();
    setIsModalVisible(false);
  };

  // Add back button handler to close the bottom sheet
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (isModalVisible && bottomSheetModalRef.current) {
          bottomSheetModalRef.current.dismiss();
          setIsModalVisible(false); // Update the state to reflect the modal is closed
          return true; // Prevent default back button behavior
        }
        return false; // Allow default back button behavior
      }
    );

    return () => backHandler.remove();
  }, [isModalVisible]);

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

  const handleConfirmation = () => {
    //check if user provided a phone number and amount
    if (phoneNumber.length < 11) {
      toast.show("Please enter a valid phone number 👋", {
        type: "danger",
        placement: "top",
        animationType: "zoom-in",
        dangerColor: "red",
      });
      return;
    }
    const parsedAmount = parseAmount(amount);
    if (parsedAmount === null || parsedAmount < 50) {
      toast.show("Please enter a valid amount, minimum of 50  👋", {
        type: "danger",
        placement: "top",
        animationType: "zoom-in",
        dangerColor: "red",
      });
      return;
    }

    // Proceed with transaction logic
    showBottomSheet();
  };

  // Function to handle PIN submission
  const handlePinSubmit = () => {
    if (pin.length === 4) {
      // Proceed with transaction logic
      console.log("PIN entered:", pin);
      hideBottomSheet();
    } else {
      alert("Please enter a 4-digit PIN.");
    }
  };

  return (
    // Themed container for consistent styling
    <ThemedContainer style={{ paddingHorizontal: 0, flex: 1 }}>
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
              // onPress={showBottomSheet}
              onPress={handleConfirmation}
            >
              <AppText style={{ color: "white" }}>Pay</AppText>
            </Pressable>
          </View>
        </View>
      </View>

      {/* Render the bottom sheet */}
      <CompleteTransaction
        bottomSheetModalRef={bottomSheetModalRef}
        // handlePinSubmit={handlePinSubmit}
        hideBottomSheet={hideBottomSheet}
      />
    </ThemedContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});

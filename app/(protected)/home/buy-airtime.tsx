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
} from "react-native";
import React, { useContext, useState, useRef, useEffect } from "react";
import ThemedContainer from "@/components/ThemedContainer";
import AppText from "@/components/AppText";
import { Image } from "expo-image";
import { iconMap } from "@/helpers/networkIcnMap";
import { Contact } from "lucide-react-native";
import { ThemeContext } from "@/context/ThemeContext";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import CompleteTransaction from "@/components/CompleteTransaction";
import { useToast } from "react-native-toast-notifications";
import { determineNetwork, formatAmount } from "@/helpers/common";
import AppLoadingIndicator from "@/components/AppLoadingIndicator";
import axios from "axios";
import { API_URL, USERI_TOKEN_KEY } from "@/constants";
import { useAppData } from "@/providers/AppDataProvider";
import { getStorageItemAsync } from "@/helpers/secureStorage";
import {
  addRecentAirtimeSubcriptionNumber,
  getRecentAirtimeSubcriptionNumbers,
  RECENT_AIRTIME_NUMBERS_TYPE,
} from "@/api/localStorage";
import RecentSubcriptionNumbers from "@/components/RecentSubcriptionNumbers";

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
  const router = useRouter();

  // State variables for user input
  const [amount, setAmount] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [network, setNetwork] = useState("");
  const [recentNumbers, setRecentNumbers] = useState<
    RECENT_AIRTIME_NUMBERS_TYPE[]
  >([]);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { addTransaction, balance } = useAppData();

  // Update the function to show the bottom sheet
  const showBottomSheet = () => {
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

  const loadRecentNumbers = async () => {
    try {
      const recentNumbers = await getRecentAirtimeSubcriptionNumbers();
      if (recentNumbers) {
        setRecentNumbers(recentNumbers);
      }
    } catch (error) {
      console.error("Error loading recent numbers:", error);
    }
  };

  useEffect(() => {
    loadRecentNumbers();
  }, []);

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
    if (phoneNumber.length === 4 || phoneNumber.length === 11) {
      const network = determineNetwork(phoneNumber);
      setNetwork(network ?? "");
    }
    setPhoneNumber(phoneNumber);
  };

  const submitRequest = async (pin: string) => {
    if (!pin || pin.length < 4) {
      toast.show("Please enter a valid pin", { type: "danger" });
      return;
    }
    hideBottomSheet();
    setIsLoading(true);
    try {
      const storedToken = await getStorageItemAsync(USERI_TOKEN_KEY);
      const phone = phoneNumber;
      // const phone = "+234" + phoneNumber.slice(1);
      const response = await axios.post(
        `${API_URL}/buy-airtime`,
        {
          phone_number: phone,
          amount,
          network,
          pin: pin,
        },
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );

      if (response.status != 200) {
        throw new Error("Invalid server response");
      }

      const { transaction } = response.data;

      addTransaction(transaction);
      addRecentAirtimeSubcriptionNumber(phoneNumber);
      setRecentNumbers((prev) => {
        const newRecentNumbers = [{ number: phoneNumber, network }, ...prev];
        if (newRecentNumbers.length > 5) {
          newRecentNumbers.slice(0, 5); // Remove the oldest number
        }
        return newRecentNumbers;
      });
      toast.show("Request successfull", { type: "success" });
      router.push({
        pathname: "/home/receipt",
        params: {
          data: JSON.stringify(transaction),
        },
      });
    } catch (error: any) {
      console.error(error);
      if (error.response) {
        const { status, data } = error.response;
        if (status == 400) {
          toast.show(data?.message, {
            type: "danger",
          });
        } else if (status === 422 && data?.message) {
          toast.show(data?.message, { type: "danger" });
        } else {
          toast.show("An unexpected error occurred. Please try again later.", {
            type: "danger",
          });
        }
      } else if (error.request) {
        console.error("No response received:", error.request);
        toast.show("Network error. Please check your connection.", {
          type: "danger",
        });
      } else {
        console.error("Error setting up request:", error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirmation = () => {
    //check if user provided a phone number and amount
    if (phoneNumber.length != 11) {
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

    if (balance < parsedAmount) {
      toast.show("Insufficient balance", {
        type: "danger",
        placement: "top",
        animationType: "zoom-in",
        dangerColor: "red",
      });
      return;
    }

    showBottomSheet();
  };

  return (
    // Themed container for consistent styling
    <ThemedContainer style={{ paddingHorizontal: 0, flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Section for displaying previous transactions */}
        <RecentSubcriptionNumbers
          onSelect={(number) => {
            handlePhoneNumberChange(number);
          }}
          recentNumbers={recentNumbers}
        />
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
          <AppText
            style={{ fontSize: 16, color: "#a1a1aa", textAlign: "right" }}
          >
            Balance: {formatAmount(balance)}
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
              source={iconMap[network]}
              contentFit="cover"
              style={{
                width: 30,
                height: 30,
                borderRadius: 10,
                backgroundColor: "white",
              }}
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
              {/* <Pressable
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
            </Pressable> */}
            </View>
          </View>
        </View>

        {/* submit */}
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
          {amount && (
            <AppText
              style={{ fontSize: 16, color: "#a1a1aa", textAlign: "right" }}
            >
              Amount: ₦{amount}
            </AppText>
          )}

          <Pressable
            onPress={handleConfirmation}
            style={{
              padding: 10,
              backgroundColor: "#065f46",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
            }}
          >
            <AppText style={{ fontSize: 18, color: "white" }}>Pay</AppText>
          </Pressable>
        </View>
        <AppLoadingIndicator isLoading={isLoading} />
        <CompleteTransaction
          bottomSheetModalRef={bottomSheetModalRef}
          hideBottomSheet={hideBottomSheet}
          handlePinSubmit={submitRequest}
        />
      </ScrollView>
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

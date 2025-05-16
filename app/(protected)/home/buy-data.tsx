// Import necessary components and libraries
import {
  View,
  ScrollView,
  TextInput,
  Pressable,
  Dimensions,
  TouchableOpacity,
  BackHandler,
  Keyboard,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import ThemedContainer from "@/components/ThemedContainer";
import AppText from "@/components/AppText";
import { Image } from "expo-image";
import { iconMap } from "@/helpers/networkIcnMap";
import { Contact } from "lucide-react-native";
import { ThemeContext } from "@/context/ThemeContext";
import CompleteTransaction from "@/components/CompleteTransaction";
import { BottomSheetModal } from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import { useToast } from "react-native-toast-notifications";
import AppLoadingIndicator from "@/components/AppLoadingIndicator";
import axios from "axios";
import { API_URL, USERI_TOKEN_KEY } from "@/constants";
import { DataPlan, GroupedPlanType } from "@/type";
import { determineNetwork, formatAmount, wp } from "@/helpers/common";
import RecentSubcriptionNumbers from "@/components/RecentSubcriptionNumbers";
import {
  addRecentAirtimeSubcriptionNumber,
  getRecentAirtimeSubcriptionNumbers,
  RECENT_AIRTIME_NUMBERS_TYPE,
} from "@/api/localStorage";
import { useAppData } from "@/providers/AppDataProvider";
import { brandColor } from "@/constants/Colors";
import { getStorageItemAsync } from "@/helpers/secureStorage";

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

  const toast = useToast();
  const router = useRouter();

  // State variables for user input and selected plan menu
  const [plans, setPlans] = useState<GroupedPlanType | null>(null);
  const [networks, setNetworks] = useState<string[]>([]);
  const [currentNetwork, setCurentNetwork] = useState<string>("");

  const [selectedPlan, setSelectedPlan] = useState<DataPlan | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [currentPlanMenu, setCurrentPlanMenu] = useState<string>("daily");
  const [isLoading, setIsLoading] = useState(false);
  const [recentNumbers, setRecentNumbers] = useState<
    RECENT_AIRTIME_NUMBERS_TYPE[]
  >([]);
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { addTransaction, balance } = useAppData();

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
    // Load data plans from AsyncStorage
    const loadPlans = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${API_URL}/data-plans`);

        if (response.status !== 200) {
          console.error("Failed to fetch data plans:", response.statusText);
          return;
        }

        const { plans, networks } = response.data;

        if (!plans || !networks) {
          setPlans(null);
        }
        setPlans(plans);
        setNetworks(networks);
        setCurentNetwork(networks[0]);
      } catch (error) {
        console.error("Error loading plans from AsyncStorage:", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadRecentNumbers();
    loadPlans();
  }, []);

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

  const submitRequest = async (pin: string) => {
    if (!pin || pin.length < 4) {
      toast.show("Please enter a valid pin", { type: "danger" });
      return;
    }

    setIsLoading(true);
    hideBottomSheet();
    //validate inputs
    if (phoneNumber.length < 11) {
      toast.show("Please enter a valid phone number 👋", {
        type: "danger",
        placement: "top",
        animationType: "zoom-in",
        dangerColor: "red",
      });
      return;
    }

    if (pin.length != 4) {
      toast.show("Please enter a valid pin 👋", {
        type: "danger",
        placement: "top",
        animationType: "zoom-in",
        dangerColor: "red",
      });
      return;
    }

    console.log("Selected plan:", selectedPlan);

    try {
      if (!selectedPlan) {
        toast.show("Please select a plan", { type: "danger" });
        throw new Error("No plan selected");
      }

      const storedToken = await getStorageItemAsync(USERI_TOKEN_KEY);
      // const phone = "+234" + phoneNumber.slice(1);
      const phone = phoneNumber;
      const response = await axios.post(
        `${API_URL}/buy-data`,
        {
          phone_number: phone,
          pin: pin,
          plan_id: selectedPlan.id,
          network: currentNetwork,
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
        const newRecentNumbers = [
          { number: phoneNumber, network: currentNetwork },
          ...prev,
        ];
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
      console.log(error);
      if (error.response) {
        const { status, data } = error.response;
        if (status === 422 && data?.message) {
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
    Keyboard.dismiss(); // Dismiss the keyboard when the button is pressed
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

    if (selectedPlan && balance < parseAmount(selectedPlan.price.toString())!) {
      toast.show("Insufficient balance", {
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
        if (isLoading) {
          return true;
        }
        return false; // Allow default back button behavior
      }
    );

    return () => backHandler.remove();
  }, [isModalVisible, isLoading]);

  // Handle changes to the phone number input
  const handlePhoneNumberChange = (phoneNumber: string) => {
    if (phoneNumber.length > 11) {
      return;
    }

    if (phoneNumber.length === 4 || phoneNumber.length === 11) {
      const network = determineNetwork(phoneNumber);
      setCurentNetwork(network ?? "");
    }
    setPhoneNumber(phoneNumber);

    setPhoneNumber(phoneNumber);
  };

  return (
    // Themed container for consistent styling
    <ThemedContainer style={{ paddingHorizontal: 0 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Section for displaying previous transactions */}
        <RecentSubcriptionNumbers
          onSelect={(number) => {
            handlePhoneNumberChange(number);
          }}
          recentNumbers={recentNumbers}
        />
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
              source={iconMap[currentNetwork ?? ""]}
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
                justifyContent: "center",
                flexDirection: "row",
                marginBottom: 20,
              }}
            >
              {/* Tabs for selecting data plan categories */}
              {["daily", "weekly", "monthly"].map((validity, index) => (
                <Pressable
                  onPress={() => setCurrentPlanMenu(validity)}
                  style={{
                    paddingHorizontal: wp(4),
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  key={validity}
                >
                  <AppText
                    style={{
                      textTransform: "capitalize",
                    }}
                  >
                    {validity}
                  </AppText>

                  <View
                    style={{
                      width: 4,
                      height: 4,
                      backgroundColor:
                        currentPlanMenu == validity ? "#0f766e" : "transparent",
                      borderRadius: 2,
                    }}
                  />
                </Pressable>
              ))}
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "stretch",
                flexWrap: "wrap",
                columnGap: 10,
                rowGap: 15,
                marginTop: 10,
              }}
            >
              {/* Display available data plans */}
              {plans &&
                plans[
                  currentNetwork == "ninemobile" ? "9mobile" : currentNetwork
                ]?.map((plan, index) => {
                  if (plan.category !== currentPlanMenu) {
                    return null; // Skip plans that don't match the selected validity
                  }
                  return (
                    <TouchableOpacity
                      key={index}
                      style={{
                        alignItems: "center",
                        width: width * 0.25,
                        padding: 10,
                        backgroundColor:
                          selectedPlan?.planId === plan.planId
                            ? brandColor
                            : colorScheme.background,
                        borderRadius: 10,
                        justifyContent: "center",
                        rowGap: 5,
                      }}
                      // onPress={showBottomSheet}
                      onPress={() => setSelectedPlan(plan)}
                    >
                      <AppText
                        bold
                        style={{
                          fontSize: 14,
                          textAlign: "center",
                          color:
                            selectedPlan?.planId === plan.planId
                              ? "white"
                              : colorScheme.text,
                        }}
                      >
                        {plan.name}
                        {/* {plan.name.split(" ")[0]} */}
                      </AppText>
                      {/* <AppText style={{ fontSize: 12 }}>{plan.planId}</AppText> */}
                      <AppText
                        style={{
                          fontSize: 12,
                          color:
                            selectedPlan?.planId === plan.planId
                              ? "white"
                              : colorScheme.text,
                        }}
                      >
                        {plan.validity}
                      </AppText>
                      <AppText
                        style={{
                          fontSize: 12,
                          color:
                            selectedPlan?.planId === plan.planId
                              ? "white"
                              : colorScheme.text,
                        }}
                      >
                        {/* ₦{plan.price} */}
                        {formatAmount(plan.price)}
                      </AppText>
                    </TouchableOpacity>
                  );
                })}
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
          <AppText
            style={{ fontSize: 16, color: "#a1a1aa", textAlign: "right" }}
          >
            Amount: ₦{selectedPlan ? selectedPlan.price : "0"}
          </AppText>

          <AppText
            style={{ fontSize: 16, color: "#a1a1aa", textAlign: "right" }}
          >
            Plan: {selectedPlan ? selectedPlan.name : "0"}
          </AppText>

          <AppText
            style={{ fontSize: 16, color: "#a1a1aa", textAlign: "right" }}
          >
            Duration: {selectedPlan ? selectedPlan.validity : "0"}
          </AppText>

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

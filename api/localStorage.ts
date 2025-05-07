import { determineNetwork } from "@/helpers/common";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RECENT_AIRTIME_NUMBERS = "RECENT_AIRTIME_NUMBERS";

export type RECENT_AIRTIME_NUMBERS_TYPE = {
  number: string;
  network: string | null;
};

export const addRecentAirtimeSubcriptionNumber = async (number: string) => {
  try {
    const existingData = await AsyncStorage.getItem(RECENT_AIRTIME_NUMBERS);
    let items: RECENT_AIRTIME_NUMBERS_TYPE[] = existingData
      ? JSON.parse(existingData)
      : [];

    const network = determineNetwork(number);

    const newItem = {
      number, // or any unique identifier
      network: network,
    };

    if (existingData?.includes(number)) {
      return;
    }
    // Add new item at the beginning
    items.unshift(newItem);

    // Keep only latest 5 items
    if (items.length > 5) {
      items = items.slice(0, 5);
    }

    await AsyncStorage.setItem(RECENT_AIRTIME_NUMBERS, JSON.stringify(items));
  } catch (error) {
    console.error("Failed to update array in AsyncStorage:", error);
  }
};

export const getRecentAirtimeSubcriptionNumbers = async () => {
  try {
    const existingData = await AsyncStorage.getItem(RECENT_AIRTIME_NUMBERS);
    if (existingData) {
      return JSON.parse(existingData) as RECENT_AIRTIME_NUMBERS_TYPE[];
    }
  } catch (error) {
    console.error("Failed to retrieve array from AsyncStorage:", error);
  }
  return null; // or return an empty array if you prefer
};
//   const setRecentAirtimeSubcriptionNumbers = async (data: YourItemType[]) => {
//     try {
//       await AsyncStorage.setItem(RECENT_AIRTIME_NUMBERS, JSON.stringify(data));
//     } catch (error) {
//       console.error("Failed to store array in AsyncStorage:", error);
//     }
//   }

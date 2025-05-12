import moment from "moment";
import { Dimensions } from "react-native";

const { width: deviceWidth, height: deviceHeight } = Dimensions.get("screen");

export const wp = (percentage: number) => (percentage / 100) * deviceWidth;

export const hp = (percentage: number) => (percentage / 100) * deviceHeight;

export const getImageSize = (width: number, height: number) => {
  if (width > height) return { height: 250 };
  if (width < height) return { height: 300 };
  return { height: 200 };
};

export const numberOfColumn = () => {
  const screenWidth = Dimensions.get("window").width;
  if (screenWidth >= 1600) return 5;
  if (screenWidth >= 1024) return 4;
  if (screenWidth >= 768) return 3;
  return 2;
};

export function capitalizeFirstLetter(text: string) {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export function formatDateTime(input: string | Date): string {
  const date = new Date(input);

  const formattedDate = moment(date).format("hh:mm A  Do, MMM YYYY");
  // e.g., "11:25 AM  10th, Mar 2025"

  return formattedDate;
}

export function formatAmount(amount: number): string {
  const formatter = new Intl.NumberFormat("en-NG");
  return "₦" + formatter.format(amount);
}

export function determineNetwork(phoneNumber: string): string | null {
  const networkPrefixes = {
    MTN: [
      "0803",
      "0806",
      "0703",
      "0706",
      "0810",
      "0813",
      "0814",
      "0816",
      "0903",
      "0906",
      "0913",
      "0916",
    ],
    Airtel: [
      "0802",
      "0808",
      "0701",
      "0708",
      "0812",
      "0902",
      "0904",
      "0907",
      "0912",
      "0901",
    ],
    Glo: ["0805", "0807", "0705", "0811", "0815", "0905", "0915"],
    nineMobile: ["0809", "0817", "0818", "0908", "0909"],
  };

  const cleanedPhoneNumber = phoneNumber.replace(/[^0-9]/g, "");

  for (const network in networkPrefixes) {
    for (const prefix of networkPrefixes[
      network as keyof typeof networkPrefixes
    ]) {
      if (cleanedPhoneNumber.startsWith(prefix)) {
        return network.toLowerCase();
      }
    }
  }

  return null;
}

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

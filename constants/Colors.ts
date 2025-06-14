const tintColorLight = "#2f95dc";
const tintColorDark = "#fff";
export const brandColor = "#065f46";

export default {
  light: {
    text: "#000",
    background: "#e2e8f0",
    tint: tintColorLight,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorLight,
    icon: "#000",
    // secondary: "#FBFBFB",
    secondary: "#fff",
    // secondary: "rgba(223, 223, 223, 0.92)",
    switchTrackTrue: "rgba(11, 11, 11, 0.66)",
    switchTrackFalse: "rgba(11, 11, 11, 0.66)",
    tabBarInactiveTintColor: "rgba(73, 73, 73, 0.66)",
    tabBarActiveTintColor: "rgba(0, 0, 0, 0.97)",
  },
  dark: {
    text: "#fff",
    background: "#09090b",
    icon: "#fff",
    tint: tintColorDark,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorDark,
    secondary: "#18181b",
    // secondary: "rgba(11, 11, 11, 0.66)",
    switchTrackTrue: "rgba(64, 86, 119, 0.66)",
    switchTrackFalse: "rgb(95, 95, 95)",
    tabBarInactiveTintColor: "rgba(255, 255, 255, 0.66)",
    tabBarActiveTintColor: "rgb(255, 255, 255)",
  },
};

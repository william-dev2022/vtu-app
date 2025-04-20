const tintColorLight = "#2f95dc";
const tintColorDark = "#fff";

export default {
  light: {
    text: "#000",
    background: "#FFFFFF",
    tint: tintColorLight,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorLight,
    icon: "#000",
    secondary: "#FBFBFB",
    // secondary: "rgba(223, 223, 223, 0.92)",
    switchTrackTrue: "rgba(11, 11, 11, 0.66)",
    switchTrackFalse: "rgba(11, 11, 11, 0.66)",
    tabBarInactiveTintColor: "rgba(73, 73, 73, 0.66)",
    tabBarActiveTintColor: "rgba(0, 0, 0, 0.97)",
  },
  dark: {
    text: "#fff",
    background: "#000",
    icon: "#fff",
    tint: tintColorDark,
    tabIconDefault: "#ccc",
    tabIconSelected: tintColorDark,
    secondary: "rgba(11, 11, 11, 0.66)",
    switchTrackTrue: "rgba(64, 86, 119, 0.66)",
    switchTrackFalse: "rgb(95, 95, 95)",
    tabBarInactiveTintColor: "rgba(255, 255, 255, 0.66)",
    tabBarActiveTintColor: "rgb(255, 255, 255)",
  },
};

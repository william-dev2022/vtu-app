import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from "react";
import { Appearance } from "react-native";
import Colors from "@/constants/Colors"; // your light/dark color object

type ThemeType = "light" | "dark";

type ThemeContextType = {
  currentTheme: ThemeType;
  toggleTheme: () => void;
  isDark: boolean;
  colorScheme: typeof Colors.light; // structure should match
};

const ThemeContext = createContext<ThemeContextType>({
  currentTheme: "light",
  toggleTheme: () => {},
  isDark: false,
  colorScheme: Colors.light,
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<ThemeType>("light");

  useEffect(() => {
    const loadTheme = async () => {
      const storedTheme = await AsyncStorage.getItem("theme");
      if (storedTheme === "light" || storedTheme === "dark") {
        setTheme(storedTheme);
      } else {
        const systemTheme = Appearance.getColorScheme() ?? "light";
        setTheme(systemTheme);
        await AsyncStorage.setItem("theme", systemTheme);
      }
    };

    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    await AsyncStorage.setItem("theme", newTheme);
  };

  const isDark = theme === "dark";
  const colorScheme = isDark ? Colors.dark : Colors.light;

  return (
    <ThemeContext.Provider
      value={{
        currentTheme: theme,
        toggleTheme,
        isDark,
        colorScheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// Optional hook for easy usage
export const useTheme = () => useContext(ThemeContext);

export { ThemeContext };

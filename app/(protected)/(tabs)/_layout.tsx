import React, { useContext } from "react";
import { FontAwesome, Ionicons, Feather } from "@expo/vector-icons";
import { ReceiptText } from "lucide-react-native";
import { Tabs } from "expo-router";
import { Pressable, View } from "react-native";

import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { ThemeContext } from "@/context/ThemeContext";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const { currentTheme, colorScheme } = useContext(ThemeContext);

  // const isDark = currentTheme === "dark";

  return (
    <View style={[{ backgroundColor: colorScheme.background, flex: 1 }]}>
      <Tabs
        initialRouteName="index"
        screenOptions={{
          tabBarActiveTintColor: colorScheme.tabBarActiveTintColor,
          headerShown: useClientOnlyValue(false, true),
          tabBarStyle: {
            backgroundColor: colorScheme.background,
            borderColor: colorScheme.secondary,
            elevation: 1,
            borderTopWidth: 0.3,
            shadowColor: "transparent",
            marginBottom: 10,
          },

          tabBarInactiveTintColor: colorScheme.tabBarInactiveTintColor,
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: "Krub_400Regular",
            fontWeight: "500",
          },
          tabBarButton: (props) => (
            <Pressable
              {...props}
              android_ripple={null}
              style={({ pressed }) => [
                {
                  opacity: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 10,
                },
              ]}
            >
              {props.children}
            </Pressable>
          ),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            headerShadowVisible: false,
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <Feather name="home" size={20} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="transactions"
          options={{
            headerShown: false,
            title: "Transactions",
            tabBarIcon: ({ color }) => <ReceiptText size={20} color={color} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            headerShown: false,
            title: "Profile",
            tabBarIcon: ({ color }) => (
              <Ionicons name="person-circle-outline" size={20} color={color} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}

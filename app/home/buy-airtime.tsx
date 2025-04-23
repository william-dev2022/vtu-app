import {
  View,
  ScrollView,
  TextInput,
  Pressable,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useContext } from "react";
import ThemedContainer from "@/components/ThemedContainer";
import AppText from "@/components/AppText";
import { previousTransactions } from "@/data/sample";
import { Image } from "expo-image";
import { iconMap } from "@/helpers/networkIcnMap";
import { Contact } from "lucide-react-native";
import { ThemeContext } from "@/context/ThemeContext";

export default function BuyAirtime() {
  const { width } = Dimensions.get("window");
  const { colorScheme } = useContext(ThemeContext);

  return (
    <ThemedContainer style={{ paddingHorizontal: 0 }}>
      <View style={{ backgroundColor: colorScheme.secondary }}>
        {/* <View style={{ backgroundColor: "rgb(44, 44, 44)" }}> */}
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          style={{ paddingTop: 20 }}
        >
          {previousTransactions.map((transaction) => (
            <View
              key={transaction.id}
              style={{
                alignItems: "center",
                padding: 10,
              }}
            >
              <Image
                source={iconMap[transaction.network]}
                contentFit="cover"
                style={{ width: 30, height: 30, borderRadius: 10 }}
              />
              <AppText style={{ fontSize: 12 }}>{transaction.number}</AppText>
            </View>
          ))}
        </ScrollView>
      </View>

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
            // backgroundColor: "red",
            // paddingBottom: 5,
          }}
        >
          <Image
            source={iconMap["mtn"]}
            contentFit="cover"
            style={{ width: 25, height: 25, borderRadius: 10 }}
          />
          <TextInput
            style={{
              flex: 1,
              minHeight: 40,
              color: "rgb(190, 187, 187)",
              fontSize: 18,
              //   borderBottomWidth: 1,
              //   paddingBottom: 0,
            }}
            placeholderTextColor="rgb(105, 104, 104)"
            placeholder="09375436636"
            keyboardType="phone-pad"
          />

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
            {[100, 200, 300, 400, 500, 1000, 1500, 2000].map((item) => (
              <TouchableOpacity
                key={item}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  width: width * 0.2,
                  padding: 10,
                  backgroundColor: "#09090b",
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
              paddingBottom: 10,
            }}
          >
            <AppText style={{ fontSize: 16 }}>₦</AppText>
            <TextInput
              style={{
                flex: 1,
                minHeight: 40,
                color: "rgb(190, 187, 187)",
                fontSize: 18,
                //   borderBottomWidth: 1,
                //   paddingBottom: 0,
              }}
              placeholderTextColor="rgb(105, 104, 104)"
              placeholder="50-50000"
              keyboardType="phone-pad"
            />

            <Pressable
              style={{
                paddingHorizontal: 15,
                paddingVertical: 5,
                borderRadius: 40,
                backgroundColor: "#065f46",
              }}
            >
              <AppText>Pay</AppText>
            </Pressable>
          </View>
        </View>
      </View>
    </ThemedContainer>
  );
}

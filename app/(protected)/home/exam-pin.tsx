import {
  View,
  StatusBar,
  StyleSheet,
  TextInput,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import ThemedContainer from "@/components/ThemedContainer";
import AppText from "@/components/AppText";
import { hp, wp } from "@/helpers/common";
import { applyOpacityToColor } from "@/helpers/colorUtils";
import { useTheme } from "@/context/ThemeContext";
import { brandColor } from "@/constants/Colors";
import axios from "axios";
import { API_URL } from "@/constants";
import { ExamPlan, GroupedExamPlanType } from "@/type";
import AppLoadingIndicator from "@/components/AppLoadingIndicator";
import DropdownInput from "@/components/DropdownInput";

export default function ExamPin() {
  const [providers, setProviders] = useState<string[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [selectedPlan, setSelectedPlan] = useState<ExamPlan | null>(null);
  const [currentPlan, setCurrenPlan] = useState<
    { label: string; value: string }[] | null
  >(null);
  const [plans, setPlans] = useState<GroupedExamPlanType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [canSubmit, setCanSubmit] = useState<boolean>(false);
  const { colorScheme } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${API_URL}/exam-plans`);

        const { providers, plans } = response.data;

        if (!providers || !plans) {
          throw new Error("Invalid data format");
        }
        setProviders(providers);
        setPlans(plans);
      } catch (error) {
        console.error("Error fetching cable subscription data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (plans) {
      const selectedPlans = plans[selectedProvider] || null;
      setCurrenPlan(
        selectedPlans?.map((plan) => ({
          label: plan.name,
          value: plan.planId,
        })) || null
      );
    }
  }, [selectedProvider]);

  useEffect(() => {
    if (selectedPlan && selectedPlan.planId && number) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  }, [selectedPlan, number]);

  return (
    <ThemedContainer
      style={{
        flex: 1,
        paddingTop: (StatusBar.currentHeight ?? 0) + 50,
        paddingHorizontal: wp(10),
      }}
    >
      <AppText>Exam Pin Purchase</AppText>

      <View style={{ flex: 1, marginTop: 20, rowGap: 20 }}>
        <DropdownInput
          placeholder="Exam"
          onChange={({ value }) => {
            setSelectedProvider(value);
            setSelectedPlan(null);
          }}
          value={selectedProvider}
          data={providers.map((provider) => ({
            label: provider.toUpperCase(),
            value: provider,
          }))}
        />
        <DropdownInput
          placeholder="Select Plan"
          onChange={({ value }) => {
            const selectedPlan = plans?.[selectedProvider]?.find(
              (plan) => plan.planId === value
            );
            setSelectedPlan(selectedPlan ?? null);
          }}
          value={selectedPlan?.planId ?? ""}
          data={currentPlan ?? []}
        />

        <TextInput
          placeholder="Enter Phone Number"
          placeholderTextColor={applyOpacityToColor(colorScheme.text, 0.5)}
          keyboardType="phone-pad"
          onChangeText={setNumber}
          value={number}
          style={{
            ...styles.dropdown,
            backgroundColor: applyOpacityToColor(colorScheme.secondary, 0.5),
            borderWidth: 0,
            padding: 10,
            color: applyOpacityToColor(colorScheme.text, 0.8),
            fontFamily: "Krub_400Regular_Italic",
            fontSize: hp(1.8),
          }}
        />

        <TextInput
          placeholder="₦ 0.00"
          value={selectedPlan?.price ?? ""}
          readOnly
          editable={false}
          placeholderTextColor={applyOpacityToColor(colorScheme.text, 0.5)}
          style={{
            ...styles.dropdown,
            backgroundColor: applyOpacityToColor(colorScheme.secondary, 0.5),
            borderWidth: 0,
            padding: 10,
            color: applyOpacityToColor(colorScheme.text, 0.8),
            fontFamily: "Krub_400Regular_Italic",
            fontSize: hp(1.8),
          }}
        />

        <Pressable
          disabled={!canSubmit}
          style={{
            backgroundColor: brandColor,
            opacity: canSubmit ? 1 : 0.5,
            padding: 10,
            borderRadius: 8,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AppText
            style={{
              color: applyOpacityToColor(colorScheme.text, 0.8),
              fontFamily: "Krub_400Regular",
              fontSize: hp(1.8),
            }}
          >
            Proceed to Payment
          </AppText>
        </Pressable>
      </View>

      <AppLoadingIndicator isLoading={isLoading} />
    </ThemedContainer>
  );
}

const styles = StyleSheet.create({
  dropdown: {
    // margin: 16,
    height: 50,
    borderRadius: 8,
  },
});

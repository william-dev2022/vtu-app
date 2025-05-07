import React, { useContext, useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import AppText from "./AppText";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { ThemeContext } from "@/context/ThemeContext";

type Props = {
  bottomSheetModalRef: React.RefObject<BottomSheetModal | null>;
  hideBottomSheet: () => void;
  //   setPin: React.Dispatch<React.SetStateAction<string>>;
  handlePinSubmit: (pin: string) => void;
};
export default function CompleteTransaction({
  bottomSheetModalRef,
  handlePinSubmit,
  hideBottomSheet,
}: Props) {
  const [pin, setPin] = useState("");
  const { colorScheme } = useContext(ThemeContext);
  return (
    <BottomSheetModal
      handleComponent={null} // This removes the top white handle
      enableHandlePanningGesture={false} // Disable the handle panning gesture
      enableOverDrag={false} // Disable over-dragging
      enablePanDownToClose={false} // Disable the ability to close by dragging down
      style={{
        ...styles.contentContainer,
        backgroundColor: colorScheme.background,
      }}
      ref={bottomSheetModalRef}
      onDismiss={hideBottomSheet}
    >
      <BottomSheetView
        style={{ padding: 20, backgroundColor: colorScheme.secondary }}
      >
        <AppText
          style={{ fontSize: 18, marginBottom: 10, textAlign: "center" }}
        >
          Confirm Details
        </AppText>

        <Pressable
          style={{
            marginTop: 10,
            padding: 10,
            backgroundColor: "#065f46",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 5,
          }}
          onPress={() => handlePinSubmit(pin)}
        >
          <AppText style={{ fontSize: 18, color: "white" }}>Submit</AppText>
        </Pressable>
      </BottomSheetView>
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});

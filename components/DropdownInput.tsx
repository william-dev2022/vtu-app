import { brandColor } from "@/constants/Colors";
import { useTheme } from "@/context/ThemeContext";
import { applyOpacityToColor } from "@/helpers/colorUtils";
import { hp } from "@/helpers/common";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

const DropdownInput = ({
  value,
  onChange,
  placeholder,
  data,
  leftIcon,
}: {
  value: string;
  data: { label: string; value: string }[] | [];
  leftIcon?: (visible?: boolean) => React.ReactElement | null;
  onChange: (item: { _index: number; label: string; value: string }) => void;
  placeholder?: string;
}) => {
  const { colorScheme } = useTheme();
  return (
    <Dropdown
      style={{
        ...styles.dropdown,
        backgroundColor: applyOpacityToColor(colorScheme.secondary, 0.5),
        borderColor: applyOpacityToColor(colorScheme.secondary, 0.5),
        padding: 10,
      }}
      placeholderStyle={{
        ...styles.placeholderStyle,
        color: applyOpacityToColor(colorScheme.text, 0.5),
      }}
      selectedTextStyle={{
        ...styles.selectedTextStyle,
        color: applyOpacityToColor(colorScheme.text, 0.8),
      }}
      activeColor={brandColor}
      itemTextStyle={{
        color: colorScheme.text,
        fontFamily: "Krub_400Regular",
        fontSize: hp(1.8),
      }}
      containerStyle={{
        backgroundColor: colorScheme.secondary,
        borderColor: applyOpacityToColor(colorScheme.secondary, 0.5),
        borderRadius: 8,
      }}
      itemContainerStyle={{
        backgroundColor: "applyOpacityToColor(colorScheme.secondary, 0.5)",
        // borderColor: applyOpacityToColor(colorScheme.secondary, 0.5),
        borderRadius: 8,
      }}
      iconStyle={styles.iconStyle}
      data={data}
      showsVerticalScrollIndicator={false}
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={placeholder ?? "Select item"}
      searchPlaceholder="Search..."
      value={value}
      onChange={onChange}
      renderLeftIcon={leftIcon}
    />
  );
};

export default DropdownInput;
const styles = StyleSheet.create({
  dropdown: {
    // margin: 16,
    height: 50,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 8,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 14,
    fontFamily: "Krub_400Regular_Italic",
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

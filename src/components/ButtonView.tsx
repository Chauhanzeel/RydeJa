import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { CommonStyles, FontStyle, Variables } from "../Theme";
import { ButtonProps } from "./types";

const ButtonView: React.FC<ButtonProps> = ({
  btnTxt,
  onBtnPress,
  width,
  backgroundColor,
  fontColor,
  borderColor,
  borderWidth,
  isLoading,
  disablebtn = false,
  style,
}) => {
  return (
    <TouchableOpacity
      disabled={disablebtn}
      style={[styles.nextBtnView, style]}
      onPress={() => onBtnPress()}
    >
      <View
        style={[
          styles.nextBtnTextView,
          {
            width: width,
            backgroundColor: backgroundColor,
            borderColor: borderColor,
            borderWidth: borderWidth,
          },
        ]}
      >
        {!isLoading ? (
          <Text
            style={[
              CommonStyles.buttonCommonTxt,
              FontStyle.urbanistBold,
              { color: fontColor },
            ]}
          >
            {btnTxt}
          </Text>
        ) : (
          <ActivityIndicator color={fontColor} animating={isLoading} />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  nextBtnView: {
    alignSelf: "center",
    height: Variables.Measures.fontSize * 2.5,
  },
  nextBtnTextView: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    borderRadius: 12,
  },
  nextTxt: {
    fontSize: Variables.Measures.fontSize / 1.2,
  },
});
export default ButtonView;

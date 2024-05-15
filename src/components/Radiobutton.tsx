import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Variables } from "../Theme";
import { Colors } from "../Theme/variables";
import { RadioProps } from "./types";

const RadioView: React.FC<RadioProps> = ({
  onBtnPress = () => {},
  isCheck,
  disablebtn = false,
}) => {
  return (
    <View
      // disabled={disablebtn}
      style={styles.nextBtnView}
      // onPress={() => onBtnPress()}
    >
      {isCheck ? <View style={[styles.nextBtnTextView]} /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  nextBtnView: {
    height: Variables.Measures.fontSize,
    width: Variables.Measures.fontSize,
    borderRadius: Variables.Measures.fontSize / 2,
    borderWidth: 1,
    backgroundColor: Colors.darkBlack,
    borderColor: Colors.yellow,
    alignItems: "center",
    justifyContent: "center",
  },
  nextBtnTextView: {
    height: Variables.Measures.fontSize / 2,
    width: Variables.Measures.fontSize / 2,
    borderRadius: Variables.Measures.fontSize / 2,
    backgroundColor: Colors.yellow,
  },
});
export default RadioView;

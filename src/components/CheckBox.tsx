import React from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Variables } from "../Theme";
import { Colors } from "../Theme/variables";
import { RadioProps } from "./types";

import Check from "../assets/Images/CheckYellow.svg";
import UnCheck from "../assets/Images/Authentication/uncheck.svg";

const CheckBox: React.FC<RadioProps> = ({
  onBtnPress = () => {},
  isCheck,
  disablebtn = false,
}) => {
  return (
    <TouchableOpacity disabled={disablebtn} onPress={() => onBtnPress()}>
      {isCheck ? <Check /> : <UnCheck />}
    </TouchableOpacity>
  );
};
export default CheckBox;

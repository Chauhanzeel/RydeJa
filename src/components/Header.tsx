import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { FontStyle, Layout, Variables } from "../Theme";
import { HeaderProps } from "./types";

const Header: React.FC<HeaderProps> = ({
  leftIcon,
  leftText,
  centerText,
  rightIcon,
  rightText,
  onLeftPress,
  onRightPress,
  rightSvg,
  leftSvg,
  backgroundColor,
}) => {
  return (
    <View
      style={[
        styles.headerView,
        { justifyContent: "center", backgroundColor: backgroundColor },
      ]}
    >
      <View style={Layout.rowAlignCenter}>
        <View style={[styles.leftView]}>
          <TouchableOpacity onPress={onLeftPress}>
            {leftIcon && <Image source={leftIcon} style={styles.imageView} />}
            {leftSvg && <View style={styles.imageView}>{leftSvg}</View>}
            {leftText && (
              <Text style={FontStyle.textWhiteSemiBoldSmall}>{leftText}</Text>
            )}
          </TouchableOpacity>
        </View>
        <View style={[styles.centerView]}>
          <Text
            numberOfLines={1}
            style={[FontStyle.urbanistBold, styles.centerText]}
          >
            {centerText}
          </Text>
        </View>
        <View style={[styles.leftView, Layout.center]}>
          <TouchableOpacity onPress={onRightPress}>
            {rightIcon && <Image source={rightIcon} style={styles.imageView} />}
            {rightSvg && <View style={styles.imageView}>{rightSvg}</View>}
            {rightText && (
              <TouchableOpacity onPress={onRightPress}>
                <Text style={FontStyle.textWhiteSemiBoldSmall}>
                  {rightText}
                </Text>
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  headerView: {
    height: 55,
    backgroundColor: Variables.Colors.darkBlack,
    width: "93%",
    alignSelf: "center",
  },
  centerView: {
    width: "79%",
    marginLeft: 10,
  },
  leftView: {
    width: "9%",
    alignItems: "center",
  },
  imageView: {
    height: 20,
    width: 20,
    justifyContent: "center",
  },
  centerText: {
    color: Variables.Colors.white,
    fontSize: Variables.Measures.fontSize * 1.0,
  },
});
export default Header;

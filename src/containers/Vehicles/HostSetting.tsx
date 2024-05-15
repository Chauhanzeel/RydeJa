import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useTranslation } from "react-i18next";

import { CommonStyles, FontStyle, Layout, Variables } from "../../Theme";

import { navigate } from "../../navigators/RootNavigation";
import RightArrowSvg from "../../assets/Images/Right.svg";

interface HostSettingProps {}

const HostSettings: React.FC<HostSettingProps> = () => {
  const { t } = useTranslation();

  return (
    <ScrollView>
      <View style={styles.firstView} />
      <View style={styles.outerView}>
        <Text style={[FontStyle.urbanistMedium, CommonStyles.descCommonTxt]}>
          Pick up and return hours
        </Text>
        <TouchableOpacity onPress={() => navigate("PickUpHours")}>
          <RightArrowSvg />
        </TouchableOpacity>
      </View>
      {/* <View style={styles.outerView}>
        <Text style={[FontStyle.urbanistMedium, styles.pickupTxt]}>
          Host tools
        </Text>
        <TouchableOpacity onPress={() => navigate("PickUpHours")}>
          <RightArrowSvg />
        </TouchableOpacity>
      </View> */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  pickupTxt: {
    fontSize: 14,
    color: Variables.Colors.white,
  },
  outerView: {
    width: "90%",
    alignSelf: "center",
    borderBottomColor: Variables.Colors.borderGrey,
    borderBottomWidth: 1.5,
    paddingVertical: 17,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  firstView: {
    width: "90%",
    alignSelf: "center",
    borderBottomColor: Variables.Colors.borderGrey,
    borderBottomWidth: 1,
    justifyContent: "center",
    height: 30,
  },
});

export default HostSettings;

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  StatusBar,
} from "react-native";
import { FontStyle, Variables, CommonStyles, Images } from "../Theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";

import ButtonView from "../components/ButtonView";

interface ApprovedProps {
  onClick: (val: number) => void;
}

const Approved: React.FC<ApprovedProps> = ({ onClick }) => {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={CommonStyles.safeAreaStyle}>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor={"transparent"}
      />
      <ScrollView style={{ flex: 1 }}>
        <View>
          <View style={styles.centerImgView}>
            <Image source={Images.approvedImg} style={{ height: "100%" }} />
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={[FontStyle.urbanistBold, styles.approvedTxt]}>
              You're Approved
            </Text>
            <Text style={[FontStyle.urbanistMedium, styles.subHeadingTxt]}>
              Congratulations! You are now approved to deliver your Ryde to a
              guest's location.
            </Text>
          </View>
          <ButtonView
            btnTxt="OK"
            onBtnPress={() => {
              onClick(0);
            }}
            width={Variables.Measures.width / 1.12}
            backgroundColor={Variables.Colors.yellow}
            fontColor={Variables.Colors.darkBlack}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  approvedTxt: {
    color: Variables.Colors.darkYellow,
    fontSize: 24,
  },
  subHeadingTxt: {
    fontSize: 14,
    color: Variables.Colors.white,
    lineHeight: 20,
    width: "90%",
    marginVertical: 20,
  },
  headerContainer: {
    height: 60,
    width: "90%",
    alignSelf: "center",
    flexDirection: "row",
  },
  headingTxt: {
    color: Variables.Colors.white,
    fontSize: 22,
    width: "90%",
  },
  leftHeaderView: {
    width: "10%",
    justifyContent: "center",
  },
  centerImgView: {
    height: Variables.Measures.height * 0.6,
    width: "100%",
  },
});

export default Approved;

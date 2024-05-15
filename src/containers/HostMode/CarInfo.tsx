import React from "react";
import { StyleSheet, ScrollView, View, Text } from "react-native";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import { Variables, FontStyle, Layout } from "../../Theme";

import { goBack, navigate } from "../../navigators/RootNavigation";

import Header from "../../components/Header";
import ButtonView from "../../components/ButtonView";

import CloseSvg from "../../assets/Images/Close.svg";

interface CancelProps {}

const CarInfo: React.FC<CancelProps> = ({}) => {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.safeAreaStyle}>
      <Header
        leftSvg={<CloseSvg height={22} width={22} />}
        onLeftPress={goBack}
      />
      <View
        style={{
          marginBottom: 100,
        }}
      >
        <ScrollView>
          <View
            style={{
              width: "92%",
              alignSelf: "center",
              marginTop: Variables.Measures.fontSize,
            }}
          >
            <Text style={[FontStyle.urbanistBold, styles.headingTxt]}>
              Your car
            </Text>
            <Text style={[FontStyle.urbanistMedium, styles.descTxt]}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Text>
            <View style={Layout.row}>
              <View style={styles.pointView}>
                <View style={styles.leftNumView}>
                  <Text style={[styles.numTxt, FontStyle.urbanistBold]}>1</Text>
                </View>
              </View>
              <View style={styles.rightDescView}>
                <Text
                  style={[FontStyle.urbanistSemiBold, styles.pointsDescTxt]}
                >
                  Drive - side door
                </Text>
                <Text style={[FontStyle.urbanistMedium, styles.subHeadingTxt]}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad
                </Text>
              </View>
            </View>
            <View style={Layout.row}>
              <View style={styles.pointView}>
                <View style={styles.leftNumView}>
                  <Text style={[styles.numTxt, FontStyle.urbanistBold]}>2</Text>
                </View>
              </View>
              <View style={styles.rightDescView}>
                <Text
                  style={[FontStyle.urbanistSemiBold, styles.pointsDescTxt]}
                >
                  Drive - side - dashboard
                </Text>
                <Text style={[FontStyle.urbanistMedium, styles.subHeadingTxt]}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad
                </Text>
              </View>
            </View>
            <View style={Layout.row}>
              <View style={styles.pointView}>
                <View style={styles.leftNumView}>
                  <Text style={[styles.numTxt, FontStyle.urbanistBold]}>3</Text>
                </View>
              </View>
              <View style={styles.rightDescView}>
                <Text
                  style={[FontStyle.urbanistSemiBold, styles.pointsDescTxt]}
                >
                  Documentation
                </Text>
                <Text style={[FontStyle.urbanistMedium, styles.subHeadingTxt]}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad
                </Text>
              </View>
            </View>
            <Text style={[FontStyle.urbanistMedium, styles.bottomTxt]}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna
            </Text>
            <View style={{ marginVertical: Variables.Measures.fontSize }}>
              <ButtonView
                width={Variables.Measures.width / 1.12}
                btnTxt={t("labelConst.continueTxt")}
                backgroundColor={Variables.Colors.darkYellow}
                onBtnPress={() => {
                  navigate("AboutCarInfo");
                }}
                fontColor={Variables.Colors.darkBlack}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaStyle: {
    flex: 1,
    backgroundColor: Variables.Colors.darkBlack,
  },
  headingTxt: {
    fontSize: Variables.Measures.fontSize * 1.2,
    color: Variables.Colors.white,
  },
  descTxt: {
    fontSize: Variables.Measures.fontSize / 1.6,
    color: Variables.Colors.white,
    marginVertical: Variables.Measures.fontSize,
    lineHeight: 22,
  },
  pointView: {
    width: "15%",
  },
  rightDescView: {
    width: "85%",
    justifyContent: "center",
    marginTop: 5,
  },
  pointsDescTxt: {
    fontSize: 14,
    color: Variables.Colors.white,
    marginBottom: 5,
    lineHeight: 20,
  },
  subHeadingTxt: {
    fontSize: 14,
    color: Variables.Colors.white,
    marginBottom: 20,
    lineHeight: 22,
    marginTop: 4,
  },
  bottomTxt: {
    fontSize: 14,
    color: Variables.Colors.white,
    lineHeight: 22,
    width: "97%",
    alignSelf: "center",
    marginTop: 5,
  },
  continueTxt: {
    fontSize: 12,
    color: Variables.Colors.inputTxtColor,
  },
  leftNumView: {
    height: 27,
    width: 27,
    borderWidth: 2,
    borderColor: Variables.Colors.darkYellow,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 5,
  },
  numTxt: {
    color: Variables.Colors.darkYellow,
    fontSize: 17,
  },
});

export default CarInfo;

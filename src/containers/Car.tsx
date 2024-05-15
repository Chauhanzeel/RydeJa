import React from "react";
import { StyleSheet, StatusBar, ScrollView, View, Text } from "react-native";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import { Variables, FontStyle, Layout, CommonStyles } from "../Theme";

import { goBack, navigate } from "../navigators/RootNavigation";
import Header from "../components/Header";
import CloseSvg from "../assets/Images/Close.svg";
import ButtonView from "../components/ButtonView";
import { RouteProp } from "@react-navigation/native";

interface CancelProps {
  // onClick?: (val: number) => void;
  route?: RouteProp<any, any>;
}

const Car: React.FC<CancelProps> = ({ route }) =>
  // { onClick }
  {
    const { t } = useTranslation();

    return (
      <SafeAreaView style={styles.safeAreaStyle}>
        <StatusBar
          backgroundColor={Variables.Colors.darkBlack}
          barStyle="light-content"
        />

        <ScrollView
          style={{ flex: 1, backgroundColor: Variables.Colors.darkGrey }}
        >
          <Header
            leftSvg={<CloseSvg />}
            backgroundColor={Variables.Colors.darkGrey}
            onLeftPress={() => {
              // navigate('AboutCar');
              // onClick(23);
              goBack();
            }}
          />
          <View
            style={{
              width: "92%",
              alignSelf: "center",
              marginTop: Variables.Measures.fontSize,
              backgroundColor: Variables.Colors.darkGrey,
            }}
          >
            <Text style={[FontStyle.urbanistBold, CommonStyles.smallCommonTxt]}>
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
                  style={[
                    FontStyle.urbanistSemiBold,
                    styles.pointsDescTxt,
                    CommonStyles.smallCommonTxt,
                  ]}
                >
                  Drive - side door
                </Text>
                <Text
                  style={[
                    FontStyle.urbanistMedium,
                    styles.subHeadingTxt,
                    CommonStyles.descCommonTxt,
                  ]}
                >
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
                  style={[
                    FontStyle.urbanistSemiBold,
                    styles.pointsDescTxt,
                    CommonStyles.smallCommonTxt,
                  ]}
                >
                  Drive - side - dashboard
                </Text>
                <Text
                  style={[
                    FontStyle.urbanistMedium,
                    styles.subHeadingTxt,
                    CommonStyles.descCommonTxt,
                  ]}
                >
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
                  style={[
                    FontStyle.urbanistSemiBold,
                    styles.pointsDescTxt,
                    CommonStyles.smallCommonTxt,
                  ]}
                >
                  Documentation
                </Text>
                <Text
                  style={[
                    FontStyle.urbanistMedium,
                    styles.subHeadingTxt,
                    CommonStyles.descCommonTxt,
                  ]}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad
                </Text>
              </View>
            </View>
            <Text
              style={[FontStyle.urbanistMedium, CommonStyles.descCommonTxt]}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna
            </Text>
            <View
              style={{
                marginTop: Variables.MetricsSizes.tiny * 10,
                marginBottom: Variables.MetricsSizes.large,
              }}
            >
              <ButtonView
                width={Variables.Measures.width / 1.12}
                btnTxt={t("labelConst.continueTxt")}
                backgroundColor={Variables.Colors.darkYellow}
                onBtnPress={() => {
                  // navigate("TabNavigations", { navigationfrom: 1 });
                  // onClick(25);
                  // navigate("ScanVin");
                  navigate("TypeVin");
                }}
                fontColor={Variables.Colors.darkBlack}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };

const styles = StyleSheet.create({
  safeAreaStyle: {
    flex: 1,
    backgroundColor: Variables.Colors.darkGrey,
  },
  headingTxt: {
    fontSize: 24,
    color: Variables.Colors.white,
  },
  descTxt: {
    fontSize: 14,
    color: Variables.Colors.white,
    marginTop: Variables.MetricsSizes.small,
    marginBottom: Variables.FontSize.large,
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
    marginTop: 7,
  },
  bottomTxt: {
    fontSize: 14,
    color: Variables.Colors.white,
    lineHeight: 22,
    width: "100%",
    alignSelf: "center",
    marginTop: Variables.MetricsSizes.tiny,
    marginLeft: Variables.MetricsSizes.tiny,
  },
  continueTxt: {
    fontSize: 12,
    color: Variables.Colors.inputTxtColor,
  },
  leftNumView: {
    height: 30,
    width: 30,
    borderWidth: 2,
    borderColor: Variables.Colors.darkYellow,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 5,
  },
  numTxt: {
    color: Variables.Colors.darkYellow,
    fontSize: 20,
  },
});

export default Car;

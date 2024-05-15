import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";

import { CommonStyles, FontStyle, Images, Variables } from "../../Theme";
import { goBack, navigate } from "../../navigators/RootNavigation";
import IconQuestionSvg from "../../assets/Images/iconQuestion.svg";
import ButtonView from "../../components/ButtonView";
import LeftSvg from "../../assets/Images/BackArrow.svg";
import WhiteDotSvg from "../../assets/Images/roundWhiteDot.svg";
import Header from "../../components/Header";
import { FilterModalProps } from "../types";
import _ from "lodash";
import { useSelector } from "react-redux";
import { ReducerStateProps } from "../Inbox/InterfaceProps";

const SafetyStandards: React.FC<FilterModalProps> = ({ route }) => {
  const { t } = useTranslation();
  const [profileDetailsData] = useSelector((state: ReducerStateProps) => [
    state.user.profileDetailsData,
  ]);

  return (
    <SafeAreaView style={styles.safeAreaStyle}>
      <StatusBar translucent backgroundColor="transparent" />
      <Header
        leftSvg={<LeftSvg />}
        onLeftPress={() => {
          _.get(profileDetailsData, "verifiedInfo.hostStripeId", null)
            ? navigate("TakePhoto")
            : goBack();
        }}
      />

      <ScrollView>
        <View style={styles.sv}>
          <Image
            resizeMode="contain"
            source={Images.safetyCar}
            style={styles.iv}
          />
          <Text
            style={[
              FontStyle.urbanistBold,
              CommonStyles.titleCommonTxt,
              styles.routingNumberInput,
            ]}
          >
            Safety & quality standards
          </Text>
          <Text style={[FontStyle.urbanistMedium, CommonStyles.descCommonTxt]}>
            We strive to maintain a safe and reliable car sharing community. As
            a host, you're expected to uphold these standards:
          </Text>

          <View
            style={{
              marginTop: Variables.MetricsSizes.regular,
              flexDirection: "row",
            }}
          >
            <View
              style={{
                width: "5%",
                marginTop: Variables.MetricsSizes.tiny,
              }}
            >
              <WhiteDotSvg />
            </View>

            <Text
              style={[
                FontStyle.urbanistMedium,
                CommonStyles.descCommonTxt,
                { width: "95%" },
              ]}
            >
              Keep your car well maintained so your guests are safe on the road.
            </Text>
          </View>

          <View
            style={{
              marginTop: Variables.MetricsSizes.regular,
              flexDirection: "row",
            }}
          >
            <View
              style={{
                width: "5%",
                marginTop: Variables.MetricsSizes.tiny,
              }}
            >
              <WhiteDotSvg />
            </View>

            <Text
              style={[
                FontStyle.urbanistMedium,
                CommonStyles.descCommonTxt,
                { width: "95%" },
              ]}
            >
              Clean and refuel your car before every trip so your guests have an
              enjoyable experience.
            </Text>
          </View>
          <View
            style={{
              marginTop: Variables.MetricsSizes.regular,
              flexDirection: "row",
            }}
          >
            <View
              style={{
                width: "5%",
                marginTop: Variables.MetricsSizes.tiny,
              }}
            >
              <WhiteDotSvg />
            </View>

            <Text
              style={[
                FontStyle.urbanistMedium,
                CommonStyles.descCommonTxt,
                { width: "95%" },
              ]}
            >
              Turo doesn't permit hosts to list the same car on other sharing
              platforms so guests can count on a consistent experience.
            </Text>
          </View>
        </View>
      </ScrollView>
      <View style={styles.btnView}>
        <ButtonView
          btnTxt={"Agree and continue"}
          onBtnPress={() => {
            navigate("SubmitListing");
          }}
          width={Variables.Measures.width / 1.09}
          backgroundColor={Variables.Colors.yellow}
          fontColor={Variables.Colors.darkBlack}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  iv: {
    width: "80%",
    height: Variables.Measures.width / 2.1,
    alignSelf: "center",
  },
  sv: {
    width: "90%",
    alignSelf: "center",
    marginTop: Variables.MetricsSizes.small,
    marginBottom: Variables.FontSize.large,
  },
  safeAreaStyle: {
    flex: 1,
    backgroundColor: Variables.Colors.darkBlack,
  },
  btnView: {
    // bottom: 30,
    left: 0,
    right: 0,
    justifyContent: "center",
    height: 80,
  },
  routingNumberInput: {
    color: Variables.Colors.yellow,
    marginVertical: Variables.FontSize.regular,
  },
  desc: {
    color: Variables.Colors.white,
    fontSize: 14,
    lineHeight: 22,
  },
});
export default SafetyStandards;

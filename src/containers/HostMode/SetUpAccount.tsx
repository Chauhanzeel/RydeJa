import React, { useEffect, useState } from "react";
import { CommonStyles, FontStyle, Images, Variables } from "../../Theme";
import {
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  Text,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useTranslation } from "react-i18next";
import { goBack, navigate, replace } from "../../navigators/RootNavigation";

import ButtonView from "../../components/ButtonView";

import BackSvg from "../../assets/Images/BackArrow.svg";
import AccountSvg from "../../assets/Images/StripAccount.svg";

import { useDispatch, useSelector } from "react-redux";

import { switchModeStart } from "../../actions/authActions";
import Header from "../../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import _ from "lodash";
import { ReducerStateProps } from "../Inbox/InterfaceProps";
import AsyncStorageHelper from "../../components/AsyncStorageHelper";
import { FilterModalProps } from "../types";

const SetUpAccount: React.FC<FilterModalProps> = ({ route }) => {
  const bankDetails = route?.params?.bankDetails;

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [profileDetailsData] = useSelector((state: ReducerStateProps) => [
    state.user.profileDetailsData,
  ]);

  const nextScreen = () => {
    if (!profileDetailsData?.verifiedInfo?.hostStripeId) {
      replace("VerifyStripe", { bankDetails: bankDetails });
    } else if (!profileDetailsData?.verifiedInfo?.isBankDetailsAddStatus) {
      bankDetails
        ? replace("DirectDeposit", { bankDetails: bankDetails })
        : replace("DirectDeposit");
    } else {
      navigate("SafetyStandards");
    }
  };

  return (
    <SafeAreaView style={CommonStyles.safeAreaStyle}>
      <StatusBar barStyle="light-content" backgroundColor="rgb(44,42,38)" />
      <ScrollView>
        <ImageBackground
          source={Images.BlackBg}
          style={{
            height: Variables.Measures.width * 2,
            width: Variables.Measures.width,
          }}
        >
          <View style={styles.headerView}>
            <TouchableOpacity onPress={goBack}>
              <BackSvg />
            </TouchableOpacity>

            {/* {_.get(
              profileDetailsData,
              "verifiedInfo.stripeId",
              null
            ) && (
              <TouchableOpacity
                onPress={() => {
                  // navigate("TabNavigations", { navigationfrom: 2 });
                  navigate("SafetyStandards");
                }}
              >
                <Text
                  style={[
                    FontStyle.urbanistBold,
                    {
                      fontSize: 16,
                      color: Variables.Colors.white,
                      textAlign: "right",
                    },
                  ]}
                >
                  Save and exit
                </Text>
              </TouchableOpacity>
            )} */}
          </View>

          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <AccountSvg />
          </View>
          <View
            style={{
              width: "88%",
              alignSelf: "center",
            }}
          >
            <Text style={[FontStyle.urbanistBold, styles.accountTxt]}>
              Set up your Bank Account
            </Text>
            <Text style={[FontStyle.urbanistMedium, styles.infoTxt]}>
              To receive your earnings, you need to add your account details.
            </Text>
            {/* <Text
              style={[
                FontStyle.urbanistMedium,
                styles.infoTxt,
                { marginVertical: Variables.Measures.fontSize * 1.2 },
              ]}
            >
              In next step. Stripe will verify your identity and account
              information.
            </Text> */}
            <Text style={[FontStyle.urbanistMedium, styles.infoTxt]}>
              Once your account is verified you will receive your payout via
              bank transfer.
            </Text>
          </View>
        </ImageBackground>
      </ScrollView>
      <View style={styles.btnView}>
        <ButtonView
          btnTxt={"Continue"}
          onBtnPress={nextScreen}
          width={Variables.Measures.width / 1.09}
          backgroundColor={Variables.Colors.yellow}
          fontColor={Variables.Colors.darkBlack}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerView: {
    width: "90%",
    alignSelf: "center",
    height: 70,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  safeAreaStyle: {
    flex: 1,
    backgroundColor: Variables.Colors.darkBlack,
  },
  statusBarStyle: {
    height: 35,
    backgroundColor: Variables.Colors.statusBarColor,
  },

  accountTxt: {
    fontSize: 24,
    color: Variables.Colors.darkYellow,
    marginTop: Variables.Measures.fontSize * 2.5,
    marginBottom: Variables.Measures.fontSize,
    textAlign: "center",
  },
  infoTxt: {
    fontSize: 14,
    color: Variables.Colors.white,
    lineHeight: 22,
    textAlign: "justify",
  },
  btnView: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
  },
});

export default SetUpAccount;

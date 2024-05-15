import React, { useState, useRef } from "react";
import { CommonStyles, FontStyle, Variables } from "../../Theme";
import {
  StyleSheet,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import { goBack, navigate } from "../../navigators/RootNavigation";

import DashedLine from "react-native-dashed-line";

import Header from "../../components/Header";

import BackSvg from "../../assets/Images/ProfileLeft.svg";
import AddFundSvg from "../../assets/Images/FundPlus.svg";
import RightArrowSvg from "../../assets/Images/TransactionRight.svg";
import LockSvg from "../../assets/Images/LockWhite.svg";

interface CreateProfileProps {}

const AddWallet: React.FC<CreateProfileProps> = () => {
  const { t } = useTranslation();

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={CommonStyles.safeAreaStyle}>
        <Header
          centerText="My Wallet"
          leftSvg={<BackSvg />}
          onLeftPress={() => navigate("TabNavigations")}
        />
        <View style={{ marginTop: Variables.Measures.fontSize }}>
          <View style={styles.cardView}>
            <View style={{ marginTop: 15 }}>
              <Text style={[FontStyle.urbanistBold, styles.nameTxt]}>
                Bill Smith
              </Text>
              <Text style={[FontStyle.urbanistBold, styles.cardNumTxt]}>
                .... .... ....
              </Text>
              <Text style={[FontStyle.urbanistSemiBold, styles.balanceTxt]}>
                Your balance
              </Text>
              <View style={styles.amountView}>
                <View>
                  <Text style={[FontStyle.urbanistBold, styles.dollarTxt]}>
                    $000,0
                  </Text>
                </View>
                <View style={styles.fundsView}>
                  <AddFundSvg />
                  <TouchableOpacity onPress={() => navigate("AddFunds")}>
                    <Text style={[FontStyle.urbanistBold, styles.fundsTxt]}>
                      Add funds
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ marginVertical: 16 }}>
                <DashedLine
                  dashLength={4}
                  dashColor={Variables.Colors.borderGrey}
                />
              </View>
              <TouchableOpacity style={styles.transactionView}>
                <Text
                  style={[FontStyle.urbanistSemiBold, styles.transactionTxt]}
                >
                  Transactions
                </Text>
                <RightArrowSvg />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.paymentMethodView}>
            <View style={{ width: "57%" }}>
              <Text style={[FontStyle.urbanistSemiBold, styles.paymentTxt]}>
                Payment Methods
              </Text>
            </View>
            <TouchableOpacity style={styles.paymentView}>
              <Text style={[FontStyle.urbanistSemiBold, styles.addPaymentTxt]}>
                Add payment method
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.infoAbsoluteView}>
          <View style={styles.infoView}>
            <LockSvg />
            <Text style={[FontStyle.urbanistSemiBold, styles.secureTxt]}>
              Your information is stored securely
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  infoView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  infoAbsoluteView: {
    position: "absolute",
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: "center",
    width: "100%",
  },
  nameTxt: {
    color: Variables.Colors.white,
    fontSize: 20,
  },
  cardNumTxt: {
    color: Variables.Colors.white,
    fontSize: 22,
  },
  balanceTxt: {
    color: Variables.Colors.white,
    fontSize: 13,
    marginVertical: 20,
  },
  fundsTxt: {
    fontSize: 15,
    marginLeft: 5,
  },
  dollarTxt: {
    color: Variables.Colors.white,
    fontSize: 40,
  },
  transactionTxt: {
    color: Variables.Colors.inputTxtColor,
    fontSize: 15,
  },
  paymentTxt: {
    color: Variables.Colors.white,
    fontSize: 15,
  },
  paymentView: {
    height: 40,
    backgroundColor: Variables.Colors.greyBg,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  addPaymentTxt: {
    color: Variables.Colors.inputTxtColor,
  },
  fundsView: {
    backgroundColor: Variables.Colors.darkYellow,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 8,
    borderRadius: 8,
    paddingVertical: 5,
  },
  amountView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardView: {
    width: "93%",
    backgroundColor: Variables.Colors.greyBg,
    alignSelf: "center",
    borderRadius: 10,
    paddingHorizontal: 25,
    paddingVertical: 10,
  },
  transactionView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  paymentMethodView: {
    marginTop: Variables.Measures.fontSize * 2,
    width: "90%",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  secureTxt: {
    color: Variables.Colors.white,
    fontSize: 12,
    marginLeft: 5,
  },
});

export default AddWallet;

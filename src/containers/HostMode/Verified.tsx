import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";

import { FontStyle, Images, Variables } from "../../Theme";
import { goBack, navigate } from "../../navigators/RootNavigation";
import StripeVerifiedSvg from "../../assets/Images/stripeVerified.svg";
import ButtonView from "../../components/ButtonView";
import LeftSvg from "../../assets/Images/Close.svg";
import Header from "../../components/Header";
import { FilterModalProps } from "../types";
import _ from "lodash";

const Verified: React.FC<FilterModalProps> = ({ route }) => {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.safeAreaStyle}>
      <StatusBar translucent backgroundColor="transparent" />
      <Header leftSvg={<LeftSvg />} onLeftPress={goBack} />

      <ScrollView>
        <View style={styles.txtView}>
          <StripeVerifiedSvg style={styles.svg} />
          <Text style={[FontStyle.urbanistBold, styles.VerifiedTxt]}>
            You're verified!
          </Text>
          <Text
            style={[
              FontStyle.urbanistMedium,
              {
                color: Variables.Colors.white,
                fontSize: 14,
                marginTop: Variables.MetricsSizes.small,
              },
            ]}
          >
            Stripe has successfully verified your information. Next, please add
            your direct deposit information.
          </Text>
        </View>
      </ScrollView>
      <View style={styles.btnView}>
        <ButtonView
          btnTxt={"Continue"}
          onBtnPress={() => {
            navigate("DirectDeposit");
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
  VerifiedTxt: {
    color: Variables.Colors.white,
    fontSize: 24,
    marginTop: Variables.MetricsSizes.large,
  },
  svg: {
    alignSelf: "center",
    marginTop: Variables.MetricsSizes.large,
  },
  txtView: {
    width: "90%",
    alignSelf: "center",
    marginTop: Variables.MetricsSizes.small,
  },
  safeAreaStyle: {
    flex: 1,
    backgroundColor: Variables.Colors.darkBlack,
  },
  btnView: {
    left: 0,
    right: 0,
    height: 80,
    justifyContent: "center",
  },
});
export default Verified;

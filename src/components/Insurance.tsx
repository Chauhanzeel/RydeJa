import React, { useEffect } from "react";
import {
  StyleSheet,
  StatusBar,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import { Variables, FontStyle } from "../Theme";

import CloseSvg from "../assets/Images/CloseSvg.svg";
import { goBack } from "../navigators/RootNavigation";
import { useDispatch, useSelector } from "react-redux";
import { insuranceProtectionStart } from "../actions/customerActions";
import { ReducerStateProps } from "../containers/Inbox/InterfaceProps";
import _ from "lodash";
import ContentLoader, { Rect } from "react-content-loader/native";
import { InsuranceProps } from "../containers/types";

const Insurance: React.FC<InsuranceProps> = ({ route }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const INSURANCE = route?.params?.INSURANCE;

  const [carViewData, insuranceProtectionData] = useSelector(
    (state: ReducerStateProps) => [
      state.customer.carViewData,
      state.customer.insuranceProtectionData,
    ]
  );

  // useEffect(() => {
  //   let parmas = {
  //     car: carViewData?.id,
  //   };
  //   dispatch(insuranceProtectionStart(parmas));
  // }, []);

  const LoadingView = () => {
    return (
      <SafeAreaView style={styles.safeAreaStyle}>
        <StatusBar
          backgroundColor={Variables.Colors.blackBg}
          barStyle="light-content"
        />
        <ScrollView
          style={{
            height: Variables.Measures.height,
          }}
        >
          <ContentLoader
            backgroundColor={Variables.Colors.absoluteBgGrey}
            foregroundColor={Variables.Colors.grey}
            height={80}
            width={Variables.Measures.width}
          >
            <Rect x="15" y="20" rx="4" ry="4" width="40" height="40" />
          </ContentLoader>

          <ContentLoader
            backgroundColor={Variables.Colors.absoluteBgGrey}
            foregroundColor={Variables.Colors.grey}
            height={Variables.Measures.width * 2}
            width={Variables.Measures.width}
          >
            <Rect x="15" y="10" rx="4" ry="4" width="250" height="40" />

            <Rect x="15" y="80" rx="4" ry="4" width="90%" height="10" />
            <Rect x="15" y="100" rx="4" ry="4" width="90%" height="10" />
            <Rect x="15" y="120" rx="4" ry="4" width="90%" height="10" />
            <Rect x="15" y="140" rx="4" ry="4" width="90%" height="10" />
            <Rect x="15" y="160" rx="4" ry="4" width="90%" height="10" />
            <Rect x="15" y="180" rx="4" ry="4" width="90%" height="10" />
          </ContentLoader>
        </ScrollView>
      </SafeAreaView>
    );
  };

  return (
    <SafeAreaView style={styles.safeAreaStyle}>
      <StatusBar translucent backgroundColor="transparent" />
      <ScrollView style={{ height: "100%" }}>
        <View style={styles.headerView}>
          <TouchableOpacity onPress={goBack}>
            <CloseSvg />
          </TouchableOpacity>
        </View>
        <View style={styles.outerView}>
          <Text style={[FontStyle.urbanistBold, styles.headingTxt]}>
            Insurance & Protection
          </Text>
          <Text
            style={[
              FontStyle.urbanistMedium,
              styles.subHeadingTxt,
              { marginTop: 20 },
            ]}
          >
            {INSURANCE}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaStyle: {
    flex: 1,
    backgroundColor: Variables.Colors.darkBlack,
  },
  headerView: {
    width: "91%",
    alignSelf: "center",
    marginTop: 20,
  },
  outerView: {
    width: "93%",
    alignSelf: "center",
    height: "100%",
    marginTop: 20,
  },
  headingTxt: {
    color: Variables.Colors.white,
    fontSize: 24,
  },
  subHeadingTxt: {
    color: Variables.Colors.white,
    fontSize: 14,
    lineHeight: 22,
  },
});
export default Insurance;

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Button,
} from "react-native";
import { FontStyle, Variables, Images, CommonStyles, Layout } from "../Theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { FilterModalProps } from "./types";
import { goBack, navigate } from "../navigators/RootNavigation";
import Logo from "../assets/Images/RydeJaLogo.svg";
import ButtonView from "../components/ButtonView";
import SmoothPinCodeInput from "../components/SmoothInput";
import Header from "../components/Header";

import BackSvg from "../assets/Images/BackArrow.svg";
import { useDispatch, useSelector } from "react-redux";
import { ReducerStateProps } from "./Inbox/InterfaceProps";
import { resendOtpStart, verifyOtpStart } from "../actions/authActions";
import _ from "lodash";
import { Measures } from "../Theme/variables";
import PinButton from "../components/Pin/PinButton";

const PasswordOtp: React.FC<FilterModalProps> = ({ route }) => {
  const email = _.get(route, "params.email", "");
  let interval: any;
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [otpValue, setOtpValue] = useState("");
  const [update, setUpdate] = useState(false);

  // const [timer, setTimer] = useState(60);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setTimer((prevTimer) => (prevTimer === 0 ? 60 : prevTimer - 1));
  //   }, 1000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, []);

  // useEffect(() => {
  //   if (timer === 0) {
  //     let params = {
  //       email: email,
  //       action: "PasswordReset",
  //     };
  //     dispatch(resendOtpStart(params));
  //   }
  // }, [timer]);

  const validateNum = (val: string) => {
    const numData = val.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, "");
    setOtpValue(numData);
  };

  const [isLoading, verifyOtpData] = useSelector((state: ReducerStateProps) => [
    state.auth.isLoading,
    state.auth.verifyOtpData,
  ]);

  useEffect(() => {
    if (update && verifyOtpData?.success === true) {
      setUpdate(false);
      navigate("CreatePassword", { email: email });
      setOtpValue("");
    }
  }, [verifyOtpData]);

  const verify = () => {
    let params = {
      otp: otpValue,
      action: "PasswordReset",
    };
    dispatch(verifyOtpStart(params));
    setUpdate(true);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView>
        <Header
          centerText={"Verify OTP"}
          leftSvg={<BackSvg height={25} width={25} />}
          onLeftPress={goBack}
        />
        <KeyboardAvoidingView
          style={{ width: "100%" }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView>
            <View style={styles.containerView}>
              <View>
                <View style={styles.headingView}>
                  <Logo
                    height={Variables.Measures.width / 3}
                    width={Variables.Measures.width / 2}
                  />
                  <Text style={[styles.PinText, FontStyle.urbanistRegular]}>
                    {t("labelConst.sendInstruction")}
                  </Text>
                  <Text
                    style={[
                      styles.PinText,
                      FontStyle.urbanistRegular,
                      { marginLeft: 5 },
                    ]}
                  >
                    {email}
                  </Text>
                </View>
              </View>

              <View style={styles.inputOuterView}>
                {/* <SmoothPinCodeInput
                  cellStyle={styles.defaultCell}
                  cellStyleFocused={styles.cellStyleFocused}
                  textStyle={{
                    fontSize: 24,
                    color: "white",
                    FontFamily: "Urbanist-Bold",
                  }}
                  codeLength={4}
                  value={otpValue}
                  onTextChange={(val: string) => validateNum(val)}
                  autoFocus
                  onFulfill={() => {}}
                  maskDelay={1000}
                /> */}
                <PinButton onSucces={setOtpValue} CELL_COUNT={4} />
              </View>

              {/* <View style={styles.resendView}>
                <View style={Layout.row}>
                  <Text style={styles.resendTxt}>
                    {t("labelConst.resendTxt")}
                  </Text>
                  <Text
                    style={[
                      styles.resendTxt,
                      { marginHorizontal: 5, color: Variables.Colors.yellow },
                    ]}
                  >
                    {timer}
                  </Text>
                  <Text style={styles.resendTxt}>seconds</Text>
                </View>
              </View> */}

              <View style={{ marginTop: 40 }}>
                <ButtonView
                  isLoading={isLoading}
                  btnTxt={t("labelConst.verifyTxt")}
                  onBtnPress={() => {
                    verify();
                  }}
                  width={Variables.Measures.width / 1.15}
                  backgroundColor={Variables.Colors.yellow}
                  fontColor={Variables.Colors.blackBg}
                />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Variables.Colors.blackBg,
    flex: 1,
  },
  fillProfileTxt: {
    color: Variables.Colors.white,
    fontSize: 22,
    marginLeft: 15,
  },
  headerView: {
    flexDirection: "row",
    height: 40,
    alignItems: "center",
    marginLeft: 20,
    marginTop: 12,
  },
  PinText: {
    color: Variables.Colors.white,
    fontSize: 18,
    textAlign: "center",
    lineHeight: 25,
  },
  defaultCell: {
    borderWidth: 1,
    borderRadius: 12,
    height: 60,
    width: 60,
    borderColor: "#35383F",
    backgroundColor: Variables.Colors.greyBg,
  },
  cellStyleFocused: {
    borderColor: Variables.Colors.yellow,
    backgroundColor: Variables.Colors.greyBg,
    height: 60,
    width: 60,
  },
  inputOuterView: {
    alignItems: "center",
    marginTop: Variables.Measures.fontSize * 3,
    width: "90%",
    alignSelf: "center",
  },
  headingView: {
    alignItems: "center",
    justifyContent: "center",
    // flexDirection: "row",
    width: "98%",
    // flexWrap: "wrap",
  },
  containerView: {
    height: Variables.Measures.height / 1.2,
    alignSelf: "center",
    justifyContent: "center",
  },
  resendTxt: {
    color: Variables.Colors.white,
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Urbanist-Medium",
    fontSize: Variables.Measures.fontSize / 1.3,
  },
  resendView: {
    marginTop: 40,
    alignItems: "center",
  },
});
export default PasswordOtp;

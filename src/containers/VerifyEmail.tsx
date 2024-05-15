import React, { useEffect, useRef, useState } from "react";
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
  Image,
  TouchableOpacity,
} from "react-native";
import { FontStyle, Variables, Images, CommonStyles, Layout } from "../Theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { FilterModalProps } from "./types";
import { goBack, navigate, replace } from "../navigators/RootNavigation";

import Logo from "../assets/Images/RydeJaLogo.svg";

import ButtonView from "../components/ButtonView";
import SmoothPinCodeInput from "../components/SmoothInput";
import Header from "../components/Header";

import BackSvg from "../assets/Images/BackArrow.svg";
import { useDispatch, useSelector } from "react-redux";
import { ReducerStateProps, VerifyEmailProps } from "./Inbox/InterfaceProps";
import {
  logOutResetAll,
  resendOtpStart,
  verifyOtpStart,
} from "../actions/authActions";
import _ from "lodash";
import { Measures } from "../Theme/variables";
import BlurViewUI from "../components/BlurView";
import { BlurView } from "@react-native-community/blur";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { emit } from "process";
import PinButton from "../components/Pin/PinButton";

const VerifyEmail: React.FC<VerifyEmailProps> = ({ route }) => {
  const email = _.get(route, "params.email", "");

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [otpValue, setOtpValue] = useState("");
  const [update, setUpdate] = useState(false);
  const firstInput = useRef(null);
  const secondInput = useRef(null);
  const thirdInput = useRef(null);
  const fourthInput = useRef(null);
  // const fifthInput = useRef(null);
  // const sixthInput = useRef(null);
  const [otp, setOtp] = React.useState({
    1: "",
    2: "",
    3: "",
    4: "",
    // 5: "",
    // 6: "",
  });
  // const [fcmToken, setFCMToken] = useState(null);

  const [isLoading, verifyOtpData, userData] = useSelector(
    (state: ReducerStateProps) => [
      state.auth.isLoading,
      state.auth.verifyOtpData,
      state.auth.userData,
    ]
  );

  const storeData = async (data: any) => {
    try {
      const loginUserDetails = JSON.stringify(data);
      await AsyncStorage.setItem("loginUserData", loginUserDetails);
      replace("TabNavigations");
    } catch (e) {
      console.log("error", e);
    }
    return;
  };

  useEffect(() => {
    if (update && _.get(verifyOtpData, "data.token", null)) {
      // setUpdate(false);
      // navigate("SignIn");
      setOtpValue("");
      storeData(_.get(verifyOtpData, "data", null));
    }
  }, [verifyOtpData]);

  const verifyEmail = () => {
    let params = {
      otp: otpValue,
      // otp[1].concat(otp[2].concat(otp[3].concat(otp[4]))),
      action: "EmailConfirmation",
    };

    dispatch(verifyOtpStart(params));
    setUpdate(true);
  };

  const resendOtp = () => {
    const params = {
      email: userData?.email,
      action: "EmailConfirmation",
    };

    dispatch(resendOtpStart(params));
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor="rgb(44,42,38)"
      />
      <Image
        style={styles.backgroundImage}
        source={Images.BlackBg}
        resizeMode="cover"
      />
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAwareScrollView
          style={{ flex: 1 }}
          // behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <Header
            leftSvg={<BackSvg height={25} width={25} />}
            onLeftPress={goBack}
          />
          <View style={{ alignItems: "center", marginTop: 20 }}>
            <Logo
              height={Variables.Measures.width / 3}
              width={Variables.Measures.width / 2}
            />
            <Text style={[FontStyle.urbanistSemiBold, styles.txtVerifyEmail]}>
              Verify Email
            </Text>
            <Text style={[FontStyle.urbanistRegular, styles.txtdesc]}>
              A temporary code has been sent to your email.
            </Text>
            <View style={styles.inputOuterView}>
              <View style={styles.otpContainer}>
                <PinButton onSucces={setOtpValue} CELL_COUNT={4} />
                {/* <View style={styles.otpBox}>
                  <TextInput
                    focusable={true}
                    autoFocus={true}
                    secureTextEntry
                    style={styles.otpText}
                    keyboardType="number-pad"
                    maxLength={1}
                    underlineColorAndroid="transparent"
                    ref={firstInput}
                    onChangeText={(text) => {
                      setOtp({ ...otp, 1: text });
                      text && secondInput.current.focus();
                    }}
                  />
                </View>
                <View style={styles.otpBox}>
                  <TextInput
                    secureTextEntry
                    style={styles.otpText}
                    keyboardType="number-pad"
                    maxLength={1}
                    underlineColorAndroid="transparent"
                    ref={secondInput}
                    onChangeText={(text) => {
                      setOtp({ ...otp, 2: text });
                      text
                        ? thirdInput.current.focus()
                        : firstInput.current.focus();
                    }}
                  />
                </View>
                <View style={styles.otpBox}>
                  <TextInput
                    secureTextEntry
                    style={styles.otpText}
                    keyboardType="number-pad"
                    maxLength={1}
                    underlineColorAndroid="transparent"
                    ref={thirdInput}
                    onChangeText={(text) => {
                      setOtp({ ...otp, 3: text });
                      text
                        ? fourthInput.current.focus()
                        : secondInput.current.focus();
                    }}
                  />
                </View>
                <View style={styles.otpBox}>
                  <TextInput
                    secureTextEntry
                    style={styles.otpText}
                    ref={fourthInput}
                    keyboardType="number-pad"
                    maxLength={1}
                    // onChangeText={(text) => {
                    //   setOtp({ ...otp, 4: text });
                    //   text
                    //     ? fifthInput.current.focus()
                    //     : thirdInput.current.focus();
                    // }}
                    onChangeText={(text) => {
                      setOtp({ ...otp, 4: text });
                      !text && thirdInput.current.focus();
                    }}
                    underlineColorAndroid="transparent"
                  />
                </View> */}
                {/* <View style={styles.otpBox}>
                  <TextInput
                    secureTextEntry
                    style={styles.otpText}
                    ref={fifthInput}
                    keyboardType="number-pad"
                    maxLength={1}
                    onChangeText={(text) => {
                      setOtp({ ...otp, 5: text });
                      text
                        ? sixthInput.current.focus()
                        : fourthInput.current.focus();
                    }}
                    underlineColorAndroid="transparent"
                  />
                </View>
                <View style={styles.otpBox}>
                  <TextInput
                    secureTextEntry
                    style={styles.otpText}
                    ref={sixthInput}
                    keyboardType="number-pad"
                    maxLength={1}
                    onChangeText={(text) => {
                      setOtp({ ...otp, 6: text });
                      !text && fifthInput.current.focus();
                    }}
                    underlineColorAndroid="transparent"
                  />
                </View> */}
              </View>
            </View>
            <View
              style={{
                marginTop: Variables.FontSize.regular * 2,
                marginBottom: 10,
              }}
            >
              <ButtonView
                isLoading={isLoading}
                btnTxt={t("labelConst.verfiyCode")}
                onBtnPress={() => {
                  verifyEmail();
                }}
                width={Variables.Measures.width / 1.12}
                backgroundColor={Variables.Colors.yellow}
                fontColor={Variables.Colors.darkBlack}
              />
            </View>
            <ButtonView
              isLoading={isLoading}
              btnTxt={"Resend otp"}
              onBtnPress={() => resendOtp()}
              width={Variables.Measures.width / 1.12}
              fontColor={Variables.Colors.yellow}
            />

            {/* <Text
              numberOfLines={2}
              style={[
                FontStyle.urbanistRegular,
                CommonStyles.descCommonTxt,
                styles.txtdesc1,
              ]}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Text> */}
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  otpContainer: {
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
    alignSelf: "center",
    width: "85%",
  },
  otpBox: {
    justifyContent: "center",
    backgroundColor: Variables.Colors.greyBg,
    height: 60,
    width: 60,
    borderRadius: 12,
    borderColor: Variables.Colors.yellow,
    borderWidth: 1,
  },
  otpText: {
    color: Variables.Colors.white,
    fontFamily: "Montserrat-Bold",
    textAlign: "center",
    fontSize: 28,
    padding: 0,
  },
  inputOuterView: {
    alignItems: "center",
    marginTop: Variables.Measures.fontSize * 2,
    width: "90%",
    alignSelf: "center",
  },

  container: {
    flex: 1,
    backgroundColor: "black",
  },
  backgroundImage: {
    flex: 1,
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 24,
  },
  txtVerifyEmail: {
    fontSize: 24,
    color: Variables.Colors.white,
  },
  resendOtp: {
    fontSize: 18,
    color: Variables.Colors.yellow,
    marginVertical: 20,
  },
  txtdesc: {
    fontSize: 14,
    color: Variables.Colors.white,
    marginTop: Variables.FontSize.regular * 2,
  },
  txtdesc1: {
    color: Variables.Colors.white,
    marginVertical: Variables.FontSize.regular,
    lineHeight: 20,
    textAlign: "center",
    width: Variables.Measures.width / 1.12,
  },
});
export default VerifyEmail;

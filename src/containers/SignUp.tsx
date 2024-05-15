import React, { useState, useRef, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../components/Header";
import BackSvg from "../assets/Images/BackArrow.svg";
import { CommonStyles, FontStyle, Variables } from "../Theme";
import { goBack, navigate } from "../navigators/RootNavigation";
import { useDispatch, useSelector } from "react-redux";
import { signUpStart } from "../actions/authActions";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Check from "../assets/Images/CheckYellow.svg";
import UnCheck from "../assets/Images/Authentication/uncheck.svg";
import ButtonView from "../components/ButtonView";
import { useTranslation } from "react-i18next";
import { ReducerStateProps } from "./Inbox/InterfaceProps";
import { Measures, Colors } from "../Theme/variables";
import { CountryPicker } from "react-native-country-codes-picker";

const SignUp = () => {
  const { t } = useTranslation();
  const [fullName, setFullName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [checked1, setChecked1] = useState(false);
  const [show, setShow] = useState(false);

  const [countryName, setCountryName] = useState("");
  const [countryCode, setCountryCode] = useState("+1");

  const [isLoading, userData] = useSelector((state: ReducerStateProps) => [
    state.auth.isLoading,
    state.auth.userData,
  ]);

  const fullNameRef = useRef(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const phoneRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (userData) {
      navigate("VerifyEmail", { email: email });
    }
  }, [userData]);

  const signUp = () => {
    let params = {
      fullName: fullName,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phone,
      countryCode: countryCode,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      role: "ROLE_CUSTOMER",
      isDealsUpdated: checked1,
      isPolicyAccepted: checked,
    };
    dispatch(signUpStart(params));
  };

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor={Variables.Colors.blackBg}
        barStyle="light-content"
      />
      <CountryPicker
        style={{
          modal: {
            height: Measures.width,
            backgroundColor: Colors.toastBg,
          },
          countryButtonStyles: {
            backgroundColor: Colors.toastBg,
            borderBottomWidth: 1,
            borderBottomColor: Colors.white,
          },
          searchMessageText: {
            color: Colors.darkBlack,
          },
          textInput: {
            color: Colors.darkBlack,
          },
          countryName: {
            color: Colors.white,
          },
          dialCode: {
            color: Colors.white,
          },
        }}
        show={show}
        pickerButtonOnPress={(item) => {
          setCountryCode(item?.dial_code);
          setShow(false);
          phoneRef?.current?.focus();
        }}
        inputPlaceholderTextColor={Colors.grey}
        searchMessage={"Search Country"}
        onRequestClose={() => setShow(false)}
        lang={"en"}
        onBackdropPress={() => setShow(!show)}
      />
      <SafeAreaView style={styles.safeAreaView}>
        <KeyboardAwareScrollView>
          <Header
            backgroundColor={Variables.Colors.lightgrey}
            leftSvg={<BackSvg width={26} height={26} />}
            onLeftPress={() => goBack()}
            centerText="Sign Up"
          />
          <View style={{ marginTop: Variables.Measures.fontSize }}>
            {/* Email */}
            <View style={styles.infoOuterView}>
              <View style={{ width: "90%", alignSelf: "center" }}>
                <Text
                  style={[FontStyle.urbanistMedium, CommonStyles.descCommonTxt]}
                >
                  Email
                </Text>
                <TextInput
                  style={styles.inputView}
                  placeholder="ktmstudio@gmail.com"
                  value={email}
                  onChangeText={(email) => setEmail(email)}
                  placeholderTextColor={Variables.Colors.inputTxtColor}
                  returnKeyType={"next"}
                  keyboardType="email-address"
                  underlineColorAndroid={"transparent"}
                  onSubmitEditing={() => fullNameRef.current.focus()}
                />
              </View>
            </View>
            {/* Full Name */}
            {/* <View style={styles.infoOuterView}>
              <View style={{ width: "90%", alignSelf: "center" }}>
                <Text
                  style={[FontStyle.urbanistMedium, styles.loginHeadingTxt]}
                >
                  Full Name
                </Text>
                <TextInput
                  ref={fullNameRef}
                  style={styles.inputView}
                  value={fullName}
                  onChangeText={(fullName) => setFullName(fullName)}
                  keyboardType="default"
                  returnKeyType={"next"}
                  underlineColorAndroid={"transparent"}
                  onSubmitEditing={() => firstNameRef.current.focus()}
                />
              </View>
            </View> */}
            {/* First Name */}
            <View style={styles.infoOuterView}>
              <View style={{ width: "90%", alignSelf: "center" }}>
                <Text
                  style={[FontStyle.urbanistMedium, CommonStyles.descCommonTxt]}
                >
                  First Name
                </Text>
                <TextInput
                  ref={firstNameRef}
                  style={styles.inputView}
                  value={firstName}
                  onChangeText={(firstName) => setFirstName(firstName)}
                  keyboardType="default"
                  returnKeyType={"next"}
                  underlineColorAndroid={"transparent"}
                  onSubmitEditing={() => lastNameRef.current.focus()}
                />
              </View>
            </View>
            {/* Last Name */}
            <View style={styles.infoOuterView}>
              <View style={{ width: "90%", alignSelf: "center" }}>
                <Text
                  style={[FontStyle.urbanistMedium, CommonStyles.descCommonTxt]}
                >
                  Last Name
                </Text>
                <TextInput
                  ref={lastNameRef}
                  style={styles.inputView}
                  value={lastName}
                  onChangeText={(lastName) => setLastName(lastName)}
                  keyboardType="default"
                  returnKeyType={"next"}
                  underlineColorAndroid={"transparent"}
                  onSubmitEditing={() => phoneRef.current.focus()}
                />
              </View>
            </View>
            {/* Phone Number */}
            <View style={styles.infoOuterView}>
              <View
                style={{
                  width: "90%",
                  alignSelf: "center",
                }}
              >
                <Text
                  style={[FontStyle.urbanistMedium, CommonStyles.descCommonTxt]}
                >
                  Phone Number
                </Text>

                <View
                  style={{ flexDirection: "row", justifyContent: "center" }}
                >
                  <TouchableOpacity onPress={() => setShow(true)}>
                    <Text
                      style={[
                        styles.inputView,
                        {
                          color: countryCode
                            ? Colors.white
                            : Colors.inputTxtColor,
                        },
                      ]}
                    >
                      {countryCode ? "( " + countryCode + " )" : "Country Code"}
                    </Text>
                  </TouchableOpacity>

                  <TextInput
                    ref={phoneRef}
                    style={[styles.inputView, { flex: 1 }]}
                    value={phone}
                    keyboardType="number-pad"
                    returnKeyType={Platform.OS == "ios" ? "done" : "next"}
                    maxLength={15}
                    onChangeText={(phone) => setPhone(phone)}
                    onSubmitEditing={() => passwordRef.current.focus()}
                  />
                </View>
              </View>
            </View>

            {/* Password */}
            <View style={styles.infoOuterView}>
              <View style={{ width: "90%", alignSelf: "center" }}>
                <Text
                  style={[FontStyle.urbanistMedium, CommonStyles.descCommonTxt]}
                >
                  Password
                </Text>
                <TextInput
                  ref={passwordRef}
                  style={styles.inputView}
                  placeholderTextColor={Variables.Colors.inputTxtColor}
                  secureTextEntry={true}
                  value={password}
                  returnKeyType={"next"}
                  onChangeText={(password) => setPassword(password)}
                  onSubmitEditing={() => confirmPasswordRef.current.focus()}
                />
              </View>
            </View>
            {/* Confirm Password */}
            <View style={styles.infoOuterView}>
              <View style={{ width: "90%", alignSelf: "center" }}>
                <Text
                  style={[FontStyle.urbanistMedium, CommonStyles.descCommonTxt]}
                >
                  Re-enter Password
                </Text>
                <TextInput
                  ref={confirmPasswordRef}
                  style={styles.inputView}
                  placeholderTextColor={Variables.Colors.inputTxtColor}
                  secureTextEntry={true}
                  value={confirmPassword}
                  returnKeyType={"done"}
                  onChangeText={(confirmPassword) =>
                    setConfirmPassword(confirmPassword)
                  }
                />
              </View>
            </View>

            <View style={styles.checkSvgView}>
              <TouchableOpacity
                style={{ marginRight: 3 }}
                onPress={() => setChecked(!checked)}
              >
                {checked ? <Check /> : <UnCheck />}
              </TouchableOpacity>
              <Text
                style={[FontStyle.urbanistRegular, CommonStyles.descCommonTxt]}
              >
                {t("labelConst.acceptPolicy")}
              </Text>
            </View>
            <View style={styles.checkSvgView1}>
              <TouchableOpacity
                style={{ marginRight: 3 }}
                onPress={() => setChecked1(!checked1)}
              >
                {checked1 ? <Check /> : <UnCheck />}
              </TouchableOpacity>
              <Text
                style={[FontStyle.urbanistRegular, CommonStyles.descCommonTxt]}
              >
                {t("labelConst.sendMeDeals")}
              </Text>
            </View>
            <View
              style={{
                marginTop: Variables.Measures.fontSize * 2.5,
                alignItems: "center",
                bottom: 20,
              }}
            >
              <ButtonView
                isLoading={isLoading}
                disablebtn={!checked}
                btnTxt={t("labelConst.signupEmail")}
                onBtnPress={() => {
                  signUp();
                }}
                width={Variables.Measures.width / 1.12}
                backgroundColor={
                  email &&
                  firstName &&
                  lastName &&
                  phone &&
                  password &&
                  confirmPassword &&
                  checked
                    ? Variables.Colors.yellow
                    : Variables.Colors.borderGrey
                }
                fontColor={Variables.Colors.darkBlack}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  countryCodeTxt: {
    color: Variables.Colors.inputTxtColor,
    fontSize: 14,
  },
  countryNameTxt: {
    color: "white",
    fontSize: Measures.fontSize - 3,
  },
  updateTxt: {
    color: Variables.Colors.white,
    marginLeft: 10,
    fontSize: 12,
    lineHeight: 22,
    flexShrink: 1,
  },
  checkSvgView: {
    width: "90%",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: Variables.MetricsSizes.large,
  },
  checkSvgView1: {
    width: "90%",
    alignSelf: "center",
    flexDirection: "row",
    marginTop: Variables.FontSize.small,
  },
  container: {
    backgroundColor: Variables.Colors.blackBg,
    flex: 1,
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: Variables.Colors.lightgrey,
  },
  loginHeadingTxt: {
    fontSize: Variables.Measures.fontSize / 1.65,
    color: Variables.Colors.white,
  },
  infoOuterView: {
    borderBottomColor: Variables.Colors.inputTxtColor,
    borderBottomWidth: 0.5,
    paddingBottom: 5,
    marginTop: Variables.Measures.unit * 3,
  },
  // inputView: {
  //   padding: 0,
  //   fontSize: 14,
  //   fontFamily: "urbanist-SemiBold",
  //   color: Variables.Colors.white,
  //   paddingVertical: 5,
  // },
  inputView: {
    padding: 3,
    fontSize: Measures.fontSize - 3,
    fontFamily: "urbanist-Medium",
    color: Variables.Colors.white,
  },
  forgotText: {
    color: Variables.Colors.darkYellow,
    fontSize: 14,
    fontFamily: "Urbanist-Bold",
  },
  forgotView: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  btnLogin: {
    width: Variables.Measures.width / 1.12,
    backgroundColor: Variables.Colors.carGrey,
    borderColor: "rgba(53, 56, 63, 1)",
    borderWidth: 1.5,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },
});

export default SignUp;

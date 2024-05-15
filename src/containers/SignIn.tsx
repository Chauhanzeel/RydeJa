import React, { useState, useRef, useEffect } from "react";
import { Layout, Variables, FontStyle, CommonStyles } from "../Theme";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Platform,
  Alert,
} from "react-native";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import { goBack, navigate, replace } from "../navigators/RootNavigation";

import BackSvg from "../assets/Images/BackArrow.svg";
import messaging from "@react-native-firebase/messaging";

import Header from "../components/Header";
import ButtonView from "../components/ButtonView";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUserStart,
  logOutResetAll,
  resendOtpStart,
} from "../actions/authActions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ReducerStateProps } from "./Inbox/InterfaceProps";
import { Measures } from "../Theme/variables";
import _ from "lodash";
import { FCM_TOKEN, alwaysBounceVertical } from "../constants/constants";
interface SignInProps {}

const SignIn: React.FC<SignInProps> = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const pwdRef = useRef(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fcmToken, setFCMToken] = useState("abc");
  const [update, setUpdate] = useState(false);

  const [loginData, isLoading, resendOtpData] = useSelector(
    (state: ReducerStateProps) => [
      state.auth.loginData,
      state.auth.isLoading,
      state.auth.resendOtpData,
    ]
  );

  useEffect(() => {
    if (_.get(resendOtpData, "success", null) && update) {
      navigate("VerifyEmail", { email: email });
      setUpdate(false);
    } else {
      setUpdate(false);
    }
  }, [resendOtpData]);

  useEffect(() => {
    getFCMToken();
  }, []);

  const getFCMToken = async () => {
    messaging()
      .getToken()
      .then((fcmToken) => {
        setFCMToken(fcmToken);
        AsyncStorage.setItem(FCM_TOKEN, fcmToken);
      })
      .catch((error) => {
        let err = `FCm token get error${error}`;
        console.log(err);
      });
  };

  useEffect(() => {
    if (loginData) {
      if (loginData?.user?.isEmailVerified) {
        storeData(loginData);
      } else {
        dispatch(
          resendOtpStart({
            email: loginData?.user?.email,
            action: "EmailConfirmation",
          })
        );
        setUpdate(true);
      }
    }
  }, [loginData]);

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

  const login = () => {
    let params = {
      username: email,
      password: password,
      deviceType: Platform.OS === "ios" ? "ios" : "android",
      deviceToken: fcmToken,
    };
    dispatch(loginUserStart(params));
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={Layout.fill}>
        <ScrollView bounces={alwaysBounceVertical}>
          <Header
            leftSvg={<BackSvg height={25} width={25} />}
            onLeftPress={goBack}
            centerText="Email Log in"
          />
          <View style={{ marginTop: Variables.Measures.fontSize * 3 }}>
            <View style={styles.infoOuterView}>
              <View style={{ width: "90%", alignSelf: "center" }}>
                <Text
                  style={[FontStyle.urbanistMedium, CommonStyles.descCommonTxt]}
                >
                  Email
                </Text>
                <TextInput
                  style={styles.inputView}
                  placeholder="xyz@gmail.com"
                  value={email}
                  onChangeText={(email) => setEmail(email)}
                  placeholderTextColor={Variables.Colors.inputTxtColor}
                  keyboardType="email-address"
                  onSubmitEditing={() => pwdRef.current.focus()}
                  underlineColorAndroid={"transparent"}
                  autoCapitalize="none"
                />
              </View>
            </View>
            <View style={styles.infoOuterView}>
              <View style={{ width: "90%", alignSelf: "center" }}>
                <Text
                  style={[FontStyle.urbanistMedium, CommonStyles.descCommonTxt]}
                >
                  Password
                </Text>
                <TextInput
                  style={styles.inputView}
                  placeholderTextColor={Variables.Colors.inputTxtColor}
                  secureTextEntry={true}
                  ref={pwdRef}
                  value={password}
                  onChangeText={(password) => setPassword(password)}
                />
              </View>
            </View>
            <View style={{ marginTop: Variables.Measures.fontSize * 2.5 }}>
              <ButtonView
                width={Variables.Measures.width / 1.12}
                btnTxt="Log in with email"
                isLoading={isLoading}
                backgroundColor={Variables.Colors.carGrey}
                onBtnPress={() => {
                  // navigate("TabNavigations");
                  login();
                }}
                fontColor={Variables.Colors.inputTxtColor}
                borderColor={"rgba(53, 56, 63, 1)"}
                borderWidth={1.5}
              />
            </View>
            <TouchableOpacity
              style={styles.forgotView}
              onPress={() => navigate("ForgotPass")}
            >
              <Text
                style={[
                  FontStyle.urbanistBold,
                  CommonStyles.smallCommonTxt,
                  styles.forgotText,
                ]}
              >
                Forgot password?
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Variables.Colors.blackBg,
    flex: 1,
  },
  loginHeadingTxt: {
    fontSize: Variables.Measures.fontSize / 1.7,
    color: Variables.Colors.white,
  },
  infoOuterView: {
    borderBottomColor: Variables.Colors.inputTxtColor,
    borderBottomWidth: 0.5,
    paddingBottom: 5,
    marginTop: Variables.Measures.unit * 3,
  },
  inputView: {
    padding: 3,
    fontSize: Measures.fontSize - 3,
    fontFamily: "urbanist-Medium",
    color: Variables.Colors.white,
  },
  forgotText: {
    color: Variables.Colors.darkYellow,
  },
  forgotView: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SignIn;

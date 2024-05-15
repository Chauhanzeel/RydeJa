import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontStyle, Variables, Images, CommonStyles } from "../Theme";
import { useTranslation } from "react-i18next";

import BackSvg from "../assets/Images/ProfileLeft.svg";
import LogoSvg from "../assets/Images/RydeJaLogo.svg";

import { goBack, navigate } from "../navigators/RootNavigation";
import InputField from "../components/InputField";
import ButtonView from "../components/ButtonView";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassStart } from "../actions/authActions";
import { ReducerStateProps } from "./Inbox/InterfaceProps";
import _ from "lodash";
import { Measures } from "../Theme/variables";
import { alwaysBounceVertical } from "../constants/constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

interface ForgotPassProps {}

const ForgotPassword: React.FC<ForgotPassProps> = ({}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [emptyField, setEmptyField] = useState(0);
  const [email, setEmail] = useState("");
  const [update, setUpdate] = useState(false);

  const [isLoading, forgotPassData] = useSelector(
    (state: ReducerStateProps) => [
      state.auth.isLoading,
      state.auth.forgotPassData,
    ]
  );

  useEffect(() => {
    if (update && forgotPassData?.success === true) {
      setUpdate(false);
      navigate("PasswordOtp", { email: email });
      setEmail("");
    }
  }, [forgotPassData]);

  const sendOtp = (email: string) => {
    if (_.size(email) > 0) {
      setEmptyField(0);

      let params = {
        email: email,
      };
      dispatch(forgotPassStart(params));
      setUpdate(true);
    } else {
      setEmptyField(1);
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: Variables.Colors.blackBg }}
    >
      <StatusBar
        backgroundColor={Variables.Colors.darkBlack}
        barStyle="light-content"
      />
      <Header
        leftSvg={<BackSvg height={25} width={25} />}
        onLeftPress={goBack}
      />

      <KeyboardAwareScrollView
        style={{ height: Variables.Measures.height }}
        bounces={alwaysBounceVertical}
      >
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <View style={{ alignItems: "center", width: "100%" }}>
            <LogoSvg
              height={Variables.Measures.width / 3}
              width={Variables.Measures.width / 2.3}
            />
            <Text style={[FontStyle.urbanistBold, CommonStyles.titleCommonTxt]}>
              Reset your password
            </Text>
            <View
              style={{
                width: "80%",
                alignSelf: "center",
              }}
            >
              <Text
                style={[
                  FontStyle.urbanistRegular,
                  styles.subHeadingTxt,
                  CommonStyles.descCommonTxt,
                ]}
              >
                Enter your email address and we'll send you a temporary code
              </Text>
            </View>
            <View
              style={{
                width: "89.5%",
                alignSelf: "center",
                marginVertical: Variables.Measures.fontSize,
              }}
            >
              <InputField
                placeholder="Your Email"
                placeholderTextColor={Variables.Colors.inputTxtColor}
                inputReturnKeyType="done"
                inputKeyboardType={"email-address"}
                value={email}
                labelTxt={"Email"}
                onChangeText={(val: string) => {
                  setEmail(val);
                  email ? setEmptyField(1) : setEmptyField(0);
                }}
                emptyField={emptyField}
                onSubmitEditing={() => setEmptyField(0)}
              />
              <View
                style={{
                  marginVertical: Variables.Measures.fontSize * 2,
                }}
              >
                <ButtonView
                  isLoading={isLoading}
                  btnTxt={"Email password reset code"}
                  onBtnPress={() => {
                    sendOtp(email);
                  }}
                  width={Variables.Measures.width / 1.12}
                  backgroundColor={Variables.Colors.yellow}
                  fontColor={Variables.Colors.darkBlack}
                />
                {/* <Text
                  style={[
                    FontStyle.urbanistRegular,
                    styles.descTxt,
                    CommonStyles.descCommonTxt,
                  ]}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna
                </Text> */}
              </View>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  statusBarStyle: {
    height: 35,
    backgroundColor: Variables.Colors.statusBarColor,
  },
  safeAreaStyle: {
    flex: 1,
    backgroundColor: Variables.Colors.darkBlack,
  },
  userView: {
    width: "90%",
    alignSelf: "center",
    flexDirection: "row",
    marginTop: Variables.Measures.fontSize,
  },
  resetPassTxt: {
    fontSize: 24,
    color: Variables.Colors.white,
  },
  subHeadingTxt: {
    fontSize: 14,
    color: Variables.Colors.white,
    marginTop: Variables.Measures.fontSize,
    textAlign: "center",
    lineHeight: 22,
  },
  descTxt: {
    fontSize: 12,
    color: Variables.Colors.inputTxtColor,
    marginVertical: Variables.Measures.fontSize * 3,
    textAlign: "center",
    lineHeight: 22,
  },
  inputView: {
    padding: 3,
    fontSize: Measures.fontSize - 3,
    fontFamily: "urbanist-Medium",
    color: Variables.Colors.white,
  },
});

export default ForgotPassword;

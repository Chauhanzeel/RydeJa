import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { FontStyle, Variables } from "../Theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { goBack, navigate } from "../navigators/RootNavigation";
import { validationReg } from "../constants/constants";

import Header from "../components/Header";
import ButtonView from "../components/ButtonView";

import CreatePasswordSvg from "../assets/Images/NewPassword.svg";

import EyeOffWhite from "../assets/Images/Authentication/EyeOffWhite.svg";
import EyeOffYellow from "../assets/Images/Authentication/EyeOffYellow.svg";
import EyeOnWhite from "../assets/Images/Authentication/EyeOnWhite.svg";
import EyeOnYellow from "../assets/Images/Authentication/EyeOnYellow.svg";
import BackSvg from "../assets/Images/BackArrow.svg";
import { FilterModalProps } from "./types";

import { useDispatch, useSelector } from "react-redux";
import { ReducerStateProps } from "./Inbox/InterfaceProps";
import { resetPassStart } from "../actions/authActions";
import _ from "lodash";

const CreatePassword: React.FC<FilterModalProps> = ({ route }) => {
  const email = _.get(route, "params.email", null);
  const dispatch = useDispatch();

  const newPasswordRef = useRef(null);
  const reEnterPasswordRef = useRef(null);

  const [newPassError, setNewPassError] = useState(2);
  const [rePasswordError, setRePasswordError] = useState(2);

  const [newPassword, setNewPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const [newPassErrorMes, setNewPassErrorMes] = useState(null);

  const [visibleNewPass, setVisibleNewPass] = useState(true);
  const [rePassVisible, setRePassVisible] = useState(true);
  const [update, setUpdate] = useState(false);

  const { t } = useTranslation();

  const [isLoading, resetPassData] = useSelector((state: ReducerStateProps) => [
    state.auth.isLoading,
    state.auth.resetPassData,
  ]);

  const checkNewPassword = (val: string) => {
    setNewPassword(val);
    if (val.length === 0) {
      setNewPassError(2);
      setNewPassErrorMes(null);
    } else if (validationReg.passwordReg.test(val) === false) {
      setNewPassError(1);
      setNewPassErrorMes(
        "Your password must include at least 8 characters including 1 special , 1 number & 1 Capital letter."
      );
    } else if (validationReg.passwordReg.test(val) === true) {
      setNewPassError(2);
      setNewPassErrorMes(null);
      setNewPassword(val);
    }
  };

  const checkRePassowrd = (val: string) => {
    setRePassword(val);
    if (val.length === 0) {
      setRePasswordError(2);
    } else if (validationReg.passwordReg.test(val) === false) {
      setRePasswordError(1);
    } else if (validationReg.passwordReg.test(val) === true) {
      setRePasswordError(2);
      setRePassword(val);
    }
  };

  useEffect(() => {
    if (update && resetPassData.success === true) {
      setUpdate(false);
      navigate("SignIn");
      setNewPassword("");
      setRePassword("");
    }
  }, [resetPassData]);

  const resetPassword = () => {
    let params = {
      password: newPassword,
      passwordRepeat: rePassword,
      email: email,
    };
    dispatch(resetPassStart(params));
    setUpdate(true);
  };
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <Header
          centerText="Create New Password"
          leftSvg={<BackSvg height={25} width={25} />}
          onLeftPress={() => {
            navigate("ForgotPass");
          }}
        />
        <ScrollView style={{ height: "100%" }}>
          <View style={styles.containerView}>
            <View style={styles.headingView}>
              <CreatePasswordSvg
                height={Variables.Measures.width / 2}
                width={Variables.Measures.width / 1.5}
              />
            </View>
            <View style={styles.inputView}>
              <Text style={[styles.createPassTxt, FontStyle.urbanistMedium]}>
                {t("labelConst.createNewPass")}
              </Text>
            </View>
            <View>
              <View
                style={[
                  newPassError === 2 ? styles.successView : styles.errorView,
                  { marginTop: Variables.Measures.fontSize / 1.1 },
                ]}
              >
                <TextInput
                  style={
                    newPassError === 2
                      ? styles.successTextInput
                      : styles.errorTextInput
                  }
                  placeholder={t("labelConst.newPass")}
                  placeholderTextColor={Variables.Colors.white}
                  secureTextEntry={visibleNewPass}
                  onChangeText={(val) => checkNewPassword(val)}
                  value={newPassword}
                  ref={newPasswordRef}
                  onSubmitEditing={() => reEnterPasswordRef.current.focus()}
                />
                <TouchableOpacity
                  onPress={() => setVisibleNewPass(!visibleNewPass)}
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  {visibleNewPass ? (
                    newPassError === 2 ? (
                      <EyeOffWhite />
                    ) : (
                      <EyeOffYellow />
                    )
                  ) : newPassError === 2 ? (
                    <EyeOnWhite />
                  ) : (
                    <EyeOnYellow />
                  )}
                </TouchableOpacity>
              </View>

              {newPassErrorMes && (
                <View style={styles.errorMesView}>
                  <Text style={[FontStyle.urbanistRegular, styles.errorMesTxt]}>
                    {newPassErrorMes}
                  </Text>
                </View>
              )}
              <View
                style={[
                  rePasswordError === 2 ? styles.successView : styles.errorView,
                  { marginTop: Variables.Measures.fontSize / 1.1 },
                ]}
              >
                <TextInput
                  style={
                    rePasswordError === 2
                      ? styles.successTextInput
                      : styles.errorTextInput
                  }
                  placeholder={t("labelConst.reEnterPass")}
                  placeholderTextColor={Variables.Colors.white}
                  secureTextEntry={rePassVisible}
                  onChangeText={(val) => checkRePassowrd(val)}
                  value={rePassword}
                  ref={reEnterPasswordRef}
                />
                <TouchableOpacity
                  onPress={() => setRePassVisible(!rePassVisible)}
                  style={{ alignItems: "center", justifyContent: "center" }}
                >
                  {rePassVisible ? (
                    rePasswordError === 2 ? (
                      <EyeOffWhite />
                    ) : (
                      <EyeOffYellow />
                    )
                  ) : rePasswordError === 2 ? (
                    <EyeOnWhite />
                  ) : (
                    <EyeOnYellow />
                  )}
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ marginTop: Variables.Measures.fontSize * 2 }}>
              <ButtonView
                isLoading={isLoading}
                btnTxt={t("labelConst.continueTxt")}
                onBtnPress={() => {
                  resetPassword();
                }}
                width={Variables.Measures.width / 1.15}
                backgroundColor={Variables.Colors.yellow}
                fontColor={Variables.Colors.blackBg}
              />
            </View>
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
  },
  headingView: {
    alignItems: "center",
    marginTop: Variables.Measures.fontSize,
  },
  containerView: {
    height: Variables.Measures.height,
  },
  inputView: {
    width: "90%",
    alignSelf: "center",
    marginTop: Variables.Measures.fontSize,
  },
  createPassTxt: {
    color: Variables.Colors.white,
    fontSize: Variables.Measures.fontSize / 1.3,
  },
  rememberMeView: {
    marginTop: Variables.Measures.fontSize,
    flexDirection: "row",
  },
  rememberMeTxt: {
    color: Variables.Colors.white,
    paddingLeft: 10,
    fontSize: Variables.Measures.fontSize / 1.5,
  },
  successView: {
    width: "90%",
    height: 55,
    backgroundColor: Variables.Colors.carGrey,
    alignSelf: "center",
    borderWidth: 0.7,
    borderColor: Variables.Colors.carsBorderGrey,
    borderRadius: 10,
    flexDirection: "row",
  },
  errorView: {
    width: "90%",
    height: 55,
    backgroundColor: Variables.Colors.carGrey,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: Variables.Colors.yellow,
    borderRadius: 10,
    flexDirection: "row",
  },
  errorMesView: {
    marginVertical: 10,
    width: "90%",
    alignSelf: "center",
    marginBottom: 20,
  },
  errorMesTxt: {
    color: Variables.Colors.carsBorderGrey,
  },
  successTextInput: {
    width: "85%",
    marginLeft: 5,
    padding: 10,
    color: "white",
  },
  errorTextInput: {
    width: "85%",
    marginLeft: 5,
    padding: 10,
    color: Variables.Colors.white,
  },
});
export default CreatePassword;

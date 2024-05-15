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
import { FontStyle, Variables, Layout } from "../Theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { goBack } from "../navigators/RootNavigation";
import { toastConst, validationReg } from "../constants/constants";

import Header from "../components/Header";
import BackSvg from "../assets/Images/BackArrow.svg";

import EyeOffWhite from "../assets/Images/Authentication/EyeOffWhite.svg";
import EyeOffYellow from "../assets/Images/Authentication/EyeOffYellow.svg";
import EyeOnWhite from "../assets/Images/Authentication/EyeOnWhite.svg";
import EyeOnYellow from "../assets/Images/Authentication/EyeOnYellow.svg";
import ButtonView from "../components/ButtonView";
import { Colors, FontSize } from "../Theme/variables";
import { changePassword } from "../saga/userSaga";
import { useDispatch, useSelector } from "react-redux";
import { changePasswordStart } from "../actions/userActions";
import { ReducerStateProps } from "./Inbox/InterfaceProps";
import ToastMessage from "../components/ToastMessage";

interface ChangePasswordProps {
  // onClick: (val: number) => void;
}

const ChangePassword: React.FC<ChangePasswordProps> = () =>
  // { onClick }
  {
    const dispatch = useDispatch();
    const currentPaswordRef = useRef(null);
    const newPasswordRef = useRef(null);
    const reEnterPasswordRef = useRef(null);

    const [passwordError, setPasswordError] = useState(2);
    const [newPassError, setNewPassError] = useState(2);
    const [rePasswordError, setRePasswordError] = useState(2);

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [rePassword, setRePassword] = useState("");

    const [newPassErrorMes, setNewPassErrorMes] = useState(null);

    const [secure, setSecure] = useState(true);
    const [visibleNewPass, setVisibleNewPass] = useState(true);
    const [rePassVisible, setRePassVisible] = useState(true);
    const [update, setUpdate] = useState(false);

    const { t } = useTranslation();

    const [isLoading, changePasswordData] = useSelector(
      (state: ReducerStateProps) => [
        state.user.isLoading,
        state.user.changePasswordData,
      ]
    );

    useEffect(() => {
      if (update && changePasswordData?.success) {
        goBack();
      }
    }, [changePasswordData]);

    const checkPassowrd = (val: string) => {
      setCurrentPassword(val);
      if (val.length === 0) {
        setPasswordError(2);
      } else if (validationReg.passwordReg.test(val) === false) {
        setPasswordError(1);
      } else if (validationReg.passwordReg.test(val) === true) {
        setPasswordError(2);
        setCurrentPassword(val);
      }
    };

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

    const changePassword = () => {
      if (!currentPassword && !newPassword && !rePassword) {
        setPasswordError(1);
        setNewPassError(1);
        setRePasswordError(1);
        ToastMessage.set(
          toastConst.errorToast,
          "Please fill out all the fields to change password."
        );
      } else {
        let params = {
          currentPassword: currentPassword,
          newPassword: newPassword,
          reEnterPassword: rePassword,
        };

        dispatch(changePasswordStart(params));
        setUpdate(true);
      }
    };

    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={Variables.Colors.blackBg}
        />
        <SafeAreaView style={{ flex: 1 }}>
          <Header
            centerText={t("labelConst.changePassword")}
            leftSvg={<BackSvg height={25} width={25} />}
            onLeftPress={goBack}
          />
          <ScrollView style={{ height: "100%" }}>
            <View style={styles.containerView}>
              <View style={{ marginTop: Variables.Measures.fontSize * 4 }}>
                <View
                  style={
                    passwordError === 2 ? styles.successView : styles.errorView
                  }
                >
                  <TextInput
                    style={
                      passwordError === 2
                        ? styles.successTextInput
                        : styles.errorTextInput
                    }
                    placeholder={t("labelConst.currentPassword")}
                    placeholderTextColor={Variables.Colors.white}
                    secureTextEntry={secure}
                    onChangeText={(val) => checkPassowrd(val)}
                    value={currentPassword}
                    ref={currentPaswordRef}
                    onSubmitEditing={() => newPasswordRef.current.focus()}
                    returnKeyType="next"
                  />
                  <TouchableOpacity
                    onPress={() => setSecure(!secure)}
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
                    {secure ? (
                      passwordError === 2 ? (
                        <EyeOffWhite />
                      ) : (
                        <EyeOffYellow />
                      )
                    ) : passwordError === 2 ? (
                      <EyeOnWhite />
                    ) : (
                      <EyeOnYellow />
                    )}
                  </TouchableOpacity>
                </View>
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
                    returnKeyType="next"
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
                {/* <Text
                style={{
                  fontFamily: FontStyle.urbanistRegular.fontFamily,
                  fontSize: 10,
                  color: Colors.chocolate,
                  width: "90%",
                  alignSelf: "center",
                  marginTop: 5,
                }}
              >
                Your password must include at least 8 characters
              </Text> */}
                {newPassErrorMes && (
                  <View style={styles.errorMesView}>
                    <Text
                      style={[FontStyle.urbanistRegular, styles.errorMesTxt]}
                    >
                      {newPassErrorMes}
                    </Text>
                  </View>
                )}
                <View
                  style={[
                    rePasswordError === 2
                      ? styles.successView
                      : styles.errorView,
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
              <View style={{ marginTop: Variables.Measures.fontSize * 4 }}>
                <ButtonView
                  isLoading={isLoading}
                  width={Variables.Measures.width / 1.12}
                  btnTxt={t("labelConst.changeTxt")}
                  backgroundColor={Variables.Colors.yellow}
                  onBtnPress={() => {
                    changePassword();
                  }}
                  fontColor={Variables.Colors.blackBg}
                />
                {/* <TouchableOpacity style={styles.forgotBtnView}>
                <Text style={[FontStyle.urbanistBold, styles.forgotPassTxt]}>
                  Forgot password?
                </Text>
              </TouchableOpacity> */}
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  };

const styles = StyleSheet.create({
  forgotBtnView: {
    width: "90%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  forgotPassTxt: {
    color: Variables.Colors.yellow,
    fontSize: 14,
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
  container: {
    backgroundColor: Variables.Colors.blackBg,
    flex: 1,
  },
  containerView: {
    height: Variables.Measures.height - 150,
  },
});
export default ChangePassword;

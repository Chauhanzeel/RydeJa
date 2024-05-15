import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
} from "react-native";
import { FontStyle, Variables, Layout } from "../Theme";
import { useTranslation } from "react-i18next";

import { CountryPicker } from "react-native-country-codes-picker";

import Header from "../components/Header";
import BackSvg from "../assets/Images/BackArrow.svg";

import Check from "../assets/Images/CheckYellow.svg";
import UnCheck from "../assets/Images/Authentication/uncheck.svg";
import ButtonView from "../components/ButtonView";

import { useDispatch, useSelector } from "react-redux";
import {
  profileDetailsStart,
  updatePhoneNumberStart,
} from "../actions/userActions";
import { toastConst, ToastVisibility } from "../constants/constants";
import { goBack } from "../navigators/RootNavigation";
import ToastMessage from "../components/ToastMessage";
import _ from "lodash";
import { ReducerStateProps } from "./Inbox/InterfaceProps";
import { Colors, Measures } from "../Theme/variables";

interface ChangePasswordProps {
  // onClick: (val: number) => void;
}

const ChangeNumber: React.FC<ChangePasswordProps> = () =>
  // { onClick }
  {
    const dispatch = useDispatch();
    const [show, setShow] = useState(false);
    const [countryCode, setCountryCode] = useState(null);
    const [countryName, setCountryName] = useState("");
    const [phoneNo, setPhoneNo] = useState(null);
    const [phoneErrorMes, setPhoneErrorMes] = useState("");
    const [checked, setChecked] = useState(false);
    const [updateKey, setUpdateKey] = useState(false);
    const [countryError, setCountryError] = useState(0);

    const [isLoading, updatePhoneNumberData] = useSelector(
      (state: ReducerStateProps) => [
        state.user.isLoading,
        state.user.updatePhoneNumberData,
      ]
    );

    const { t } = useTranslation();

    const validateNum = (val: string) => {
      const numData = val.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, "");
      setPhoneNo(numData);
      if (val == "") {
        setPhoneErrorMes(null);
      } else {
        const checkValid = numData.length;
        if (checkValid > 10 || checkValid < 10) {
          setPhoneErrorMes("Your phone number must include only 10 characters");
        } else {
          setPhoneErrorMes(null);
        }
      }
    };

    useEffect(() => {
      if (updatePhoneNumberData?.success && updateKey) {
        goBack();
        setUpdateKey(false);
        dispatch(profileDetailsStart());
      }
    }, [updatePhoneNumberData]);

    const updatephoneNumber = () => {
      if (_.size(countryCode) == 0 && _.size(phoneNo) == 0) {
        setCountryError(1);
        setPhoneErrorMes("Phone number is required");
        ToastMessage.set(
          toastConst.errorToast,
          "Please fill out all required fields."
        );
      } else if (_.size(countryCode) == 0) {
        setCountryError(1);
        ToastMessage.set(
          toastConst.errorToast,
          "Please fill out all required fields."
        );
      } else if (_.size(phoneNo) == 0) {
        setPhoneErrorMes("Phone number is required");
        ToastMessage.set(
          toastConst.errorToast,
          "Please fill out all required fields."
        );
      } else {
        setCountryError(0);
        let params = {
          countryCode: countryCode,
          phoneNumber: phoneNo,
          isTextNotification: checked,
        };
        dispatch(updatePhoneNumberStart(params));
        setPhoneNo("");
        setUpdateKey(true);
      }
    };

    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={Variables.Colors.blackBg}
          barStyle="light-content"
        />
        <View style={{ height: 30 }} />
        <Header
          centerText={t("labelConst.changeNum")}
          leftSvg={<BackSvg height={25} width={25} />}
          onLeftPress={goBack}
        />
        <ScrollView style={{ height: "100%" }}>
          <View style={styles.containerView}>
            <View style={{ marginTop: Variables.Measures.fontSize * 2 }}>
              <Text style={[FontStyle.urbanistMedium, styles.descTxt]}>
                {t("labelConst.numDesc")}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => setShow(true)}
              style={[
                styles.countryBtn,
                {
                  borderColor:
                    countryError == 1
                      ? Variables.Colors.yellow
                      : Variables.Colors.carsBorderGrey,
                },
              ]}
            >
              <View style={{ flexDirection: "row" }}>
                {countryName && (
                  <Text style={styles.countryNameTxt}>{countryName}</Text>
                )}
                <Text
                  style={[
                    styles.countryCodeTxt,
                    { marginLeft: countryCode ? 10 : 0 },
                  ]}
                >
                  {countryCode ? "( " + countryCode + " )" : "Select Country"}
                </Text>
              </View>
            </TouchableOpacity>
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
                setCountryCode(item.dial_code);
                setCountryName(item.name.en);
                setShow(false);
                if (item.name.en.length >= 1) {
                  setCountryError(0);
                } else {
                  setCountryError(1);
                }
              }}
              searchMessage={"Search Country Code"}
              onRequestClose={() => setShow(false)}
              lang={"en"}
              onBackdropPress={() => setShow(!show)}
            />
            <TextInput
              style={
                phoneErrorMes ? styles.errorPhone : styles.successTextInput
              }
              placeholder={t("labelConst.enterMob")}
              placeholderTextColor={Variables.Colors.white}
              keyboardType="number-pad"
              returnKeyType={Platform.OS == "ios" ? "done" : "next"}
              value={phoneNo}
              maxLength={10}
              onChangeText={(val: any) => validateNum(val)}
            />
            {phoneErrorMes && (
              <View style={styles.errorMesView}>
                <Text style={styles.errorMesTxt}>{phoneErrorMes}</Text>
              </View>
            )}
            <TouchableOpacity
              onPress={() => setChecked(!checked)}
              style={styles.checkSvgView}
            >
              {checked ? <Check /> : <UnCheck />}
              <Text style={[FontStyle.urbanistRegular, styles.updateTxt]}>
                {t("labelConst.notificationDecsTxt")}
              </Text>
            </TouchableOpacity>

            <View style={{ marginTop: Variables.Measures.fontSize * 2.5 }}>
              <ButtonView
                isLoading={isLoading}
                width={Variables.Measures.width / 1.12}
                // btnTxt={t("labelConst.sendCode")}
                btnTxt={t("labelConst.save")}
                backgroundColor={Variables.Colors.darkYellow}
                onBtnPress={() => {
                  // onClick(4);
                  updatephoneNumber();
                }}
                fontColor={Variables.Colors.blackBg}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  };

const styles = StyleSheet.create({
  errorMesView: {
    marginTop: 10,
    width: "90%",
    alignSelf: "center",
  },
  errorMesTxt: {
    color: Variables.Colors.carsBorderGrey,
  },
  errorPhone: {
    width: "90%",
    color: Variables.Colors.yellow,
    backgroundColor: Variables.Colors.carGrey,
    marginTop: Variables.Measures.fontSize,
    alignSelf: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Variables.Colors.yellow,
    paddingHorizontal: 15,
  },
  checkSvgView: {
    width: "90%",
    alignSelf: "center",
    flexDirection: "row",
    marginTop: Variables.Measures.fontSize * 2,
  },
  countryCodeTxt: {
    color: "white",
    fontSize: 14,
  },
  countryNameTxt: {
    color: "white",
    fontSize: 14,
  },
  countryBtn: {
    width: "90%",
    backgroundColor: Variables.Colors.carGrey,
    alignSelf: "center",
    marginTop: Variables.Measures.fontSize * 2,
    height: 55,
    justifyContent: "center",
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 1,
  },
  updateTxt: {
    color: Variables.Colors.white,
    marginLeft: 10,
    fontSize: 12,
  },
  descTxt: {
    color: Variables.Colors.white,
    fontSize: 14,
    width: "90%",
    alignSelf: "center",
    lineHeight: 22,
  },
  successTextInput: {
    width: "90%",
    color: "white",
    backgroundColor: Variables.Colors.carGrey,
    marginTop: Variables.Measures.fontSize,
    alignSelf: "center",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Variables.Colors.carsBorderGrey,
    paddingHorizontal: 15,
    height: 55,
  },
  container: {
    backgroundColor: Variables.Colors.blackBg,
    flex: 1,
  },
  containerView: {
    height: Variables.Measures.height - 100,
  },
});
export default ChangeNumber;

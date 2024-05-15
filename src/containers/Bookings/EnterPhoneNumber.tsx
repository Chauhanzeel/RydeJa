import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, StatusBar, Image } from "react-native";
import { FontStyle, Variables, Images } from "../../Theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { FilterModalProps } from "../types";
import { goBack } from "../../navigators/RootNavigation";

import Logo from "../../assets/Images/RydeJaLogo.svg";

import ButtonView from "../../components/ButtonView";
import Header from "../../components/Header";

import BackSvg from "../../assets/Images/BackArrow.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  updatePhoneNumberStart,
  updatePhoneNumberSuccess,
} from "../../actions/userActions";
import { ReducerStateProps } from "../Inbox/InterfaceProps";
import _ from "lodash";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import InputField from "../../components/InputField";
import BookingValidation from "../../components/BookedValidation";
import { validationCheckStart } from "../../actions/customerActions";

const VerifyNumber: React.FC<FilterModalProps> = ({ route }) => {
  const rentalCarObj = route.params?.rentalCarObj;

  const [numberError, setNumberError] = useState(0);
  const numberRef = useRef(null);
  const [number, setNumber] = useState(null);

  const [countryCode, setCountryCode] = useState("+91");

  const [isLoading, updatePhoneNumberData, validationObj, custLoading] =
    useSelector((state: ReducerStateProps) => [
      state.user.isLoading,
      state.user.updatePhoneNumberData,
      state.customer.validationObj,
      state.customer.isLoading,
    ]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (_.get(validationObj, "isPhoneVerified", null)) {
      BookingValidation.Check(validationObj, rentalCarObj);
    }
  }, [validationObj]);

  useEffect(() => {
    if (_.get(updatePhoneNumberData, "success", null)) {
      dispatch(validationCheckStart(null));
      dispatch(updatePhoneNumberSuccess(null));
    }
  }, [updatePhoneNumberData]);

  const updatephoneNumber = () => {
    let params = {
      countryCode: countryCode,
      phoneNumber: number,
    };
    dispatch(updatePhoneNumberStart(params));
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Variables.Colors.darkBlack}
      />
      <Image
        style={styles.backgroundImage}
        source={Images.BlackBg}
        resizeMode="cover"
      />
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAwareScrollView style={{ flex: 1 }}>
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
              Verify Phone Number
            </Text>
            <Text style={[FontStyle.urbanistRegular, styles.txtdesc]}>
              Enter your phone number and we'll send you a temporary code.
            </Text>
            <View style={styles.inputOuterView}>
              <InputField
                placeholderTextColor={Variables.Colors.inputTxtColor}
                value={number}
                onChangeText={(val: string) => {
                  setNumber(val);
                  if (val.length >= 1) {
                    setNumberError(1);
                  } else {
                    setNumberError(0);
                  }
                }}
                inputKeyboardType={"phone-pad"}
                onSubmitEditing={() => {}}
                emptyField={numberError}
                placeholder="Your Phone Number"
                inputref={numberRef}
                maxLength={10}
              />
            </View>
            <View style={{ marginTop: Variables.FontSize.regular * 2 }}>
              <ButtonView
                isLoading={isLoading || custLoading}
                btnTxt={"Save and Continue"}
                onBtnPress={() => updatephoneNumber()}
                // onBtnPress={() => navigate("DriverLicense")}
                width={Variables.Measures.width / 1.12}
                backgroundColor={Variables.Colors.yellow}
                fontColor={Variables.Colors.darkBlack}
              />
            </View>
            <Text
              numberOfLines={2}
              style={[FontStyle.urbanistRegular, styles.txtdesc1]}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Text>
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
    marginTop: Variables.Measures.fontSize * 2,
    width: "90%",
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
  txtdesc: {
    fontSize: 14,
    color: Variables.Colors.white,
    marginTop: Variables.FontSize.regular * 2,
    textAlign: "center",
    width: "90%",
  },
  txtdesc1: {
    fontSize: 12,
    color: Variables.Colors.white,
    marginTop: Variables.FontSize.regular * 4,
    marginBottom: Variables.FontSize.regular * 6,
    lineHeight: 20,
    textAlign: "center",
    width: Variables.Measures.width / 1.12,
  },
});
export default VerifyNumber;

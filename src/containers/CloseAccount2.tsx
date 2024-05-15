import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, View, Text, TextInput } from "react-native";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import { Variables, FontStyle, Images, Layout } from "../Theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";

import { goBack, navigate, replace } from "../navigators/RootNavigation";

import Header from "../components/Header";
import ButtonView from "../components/ButtonView";

import BackSvg from "../assets/Images/BackArrow.svg";
import { closeAccountStart } from "../actions/customerActions";
import { ReducerStateProps } from "./Inbox/InterfaceProps";
import { logOutResetAll } from "../actions/authActions";
import { RouteProp } from "@react-navigation/native";
import ToastMessage from "../components/ToastMessage";
import { toastConst } from "../constants/constants";
import _ from "lodash";

interface CancelProps {
  route: RouteProp<any, any>;
}

const CloseAccount2: React.FC<CancelProps> = ({ route }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const reasons: any = [];
  const [inputValue, setInputValue] = useState("");
  const [updateKey, setUpdateKey] = useState(false);

  const [closeAccountData] = useSelector((state: ReducerStateProps) => [
    state.customer.closeAccountData,
  ]);

  const closeAccount = (inputValue: any) => {
    if (_.size(inputValue) > 0) {
      reasons.push(inputValue);
      let params = {
        reason: reasons,
      };

      dispatch(closeAccountStart(params));
      setUpdateKey(true);
    } else {
      ToastMessage.set(
        toastConst.errorToast,
        "Please tell us a reason to close your account."
      );
    }
  };

  useEffect(() => {
    if (closeAccountData?.success && updateKey) {
      dispatch(logOutResetAll());
      setUpdateKey(false);
      AsyncStorage.clear();
      replace("LoginSplash");
    }
  }, [closeAccountData]);

  return (
    <SafeAreaView style={styles.safeAreaStyle}>
      <Header
        centerText="Close Account"
        leftSvg={<BackSvg />}
        onLeftPress={goBack}
      />
      <View
        style={{
          marginBottom: 100,
        }}
      >
        <ScrollView>
          <View
            style={{
              width: "92%",
              alignSelf: "center",
              marginTop: Variables.Measures.fontSize,
            }}
          >
            <Text style={[FontStyle.urbanistBold, styles.headingTxt]}>
              What does closing your account means?
            </Text>
            <Text style={[FontStyle.urbanistRegular, styles.subHeadingTxt]}>
              Let us know what's going on
            </Text>
            <TextInput
              placeholder="Care to tell us more?"
              style={[FontStyle.urbanistRegular, styles.inputTxtView]}
              placeholderTextColor={Variables.Colors.inputTxtColor}
              multiline={true}
              value={inputValue}
              onChangeText={(inputValue) => {
                setInputValue(inputValue);
              }}
            />
            <View style={{ marginTop: Variables.Measures.fontSize * 7.5 }}>
              <ButtonView
                width={Variables.Measures.width / 1.12}
                btnTxt="Close my account"
                backgroundColor={Variables.Colors.btnRed}
                fontColor={Variables.Colors.white}
                onBtnPress={() => {
                  closeAccount(inputValue);
                }}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaStyle: {
    flex: 1,
    backgroundColor: Variables.Colors.darkBlack,
  },
  ratingsTxt: {
    fontSize: 15,
    color: Variables.Colors.chatWhite,
  },
  inputTxtView: {
    width: "99%",
    height: 95,
    borderWidth: 1,
    alignSelf: "center",
    borderRadius: 10,
    color: Variables.Colors.white,
    textAlignVertical: "top",
    paddingHorizontal: 10,
    fontSize: 12,
    paddingVertical: 15,
    borderColor: Variables.Colors.borderGrey,
  },
  headingTxt: {
    fontSize: Variables.Measures.fontSize * 1.5,
    color: Variables.Colors.white,
  },
  descTxt: {
    fontSize: Variables.Measures.fontSize / 1.6,
    color: Variables.Colors.white,
    marginVertical: Variables.Measures.fontSize,
    lineHeight: 22,
  },
  pointView: {
    width: "5%",
    marginLeft: 2,
    marginTop: 5,
  },
  leftPointView: {
    height: 8,
    width: 8,
    borderRadius: 8,
    backgroundColor: Variables.Colors.white,
  },
  rightDescView: {
    width: "90%",
  },
  pointsDescTxt: {
    fontSize: Variables.Measures.fontSize / 1.6,
    color: Variables.Colors.white,
    marginBottom: 15,
    lineHeight: 20,
  },
  continueTxt: {
    fontSize: 12,
    color: Variables.Colors.inputTxtColor,
  },
  subHeadingTxt: {
    color: Variables.Colors.inputTxtColor,
    marginVertical: Variables.Measures.unit * 3,
    fontSize: 14,
  },
});

export default CloseAccount2;

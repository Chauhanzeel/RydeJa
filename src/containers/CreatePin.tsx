import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { FontStyle, Variables, Images } from "../Theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import SmoothPinCodeInput from "../components/SmoothInput";
import { goBack, navigate } from "../navigators/RootNavigation";

import ButtonView from "../components/ButtonView";
import Header from "../components/Header";

import BackSvg from "../assets/Images/BackArrow.svg";

interface CreatePinProps {}

const CreatePin: React.FC<CreatePinProps> = () => {
  const [pin, setPin] = useState("");
  const { t } = useTranslation();

  const validateNum = (val: string) => {
    const numData = val.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, "");
    setPin(numData);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView>
        <Header
          centerText={t("labelConst.CreateNewPin")}
          leftSvg={<BackSvg height={25} width={25} />}
          onLeftPress={goBack}
        />
        <KeyboardAvoidingView
          style={{ width: "100%" }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView>
            <View style={styles.containerView}>
              <View style={styles.headingView}>
                <Text style={[styles.PinText, FontStyle.urbanistRegular]}>
                  {t("labelConst.pinDesc")}
                </Text>
              </View>
              <View style={styles.inputOuterView}>
                <SmoothPinCodeInput
                  mask={<View style={styles.maskedView} />}
                  cellStyle={styles.defaultCell}
                  cellStyleFocused={styles.cellStyleFocused}
                  textStyle={{
                    fontSize: 24,
                    color: "white",
                    FontFamily: "Urbanist-Bold",
                  }}
                  codeLength={4}
                  value={pin}
                  onTextChange={(val: string) => validateNum(val)}
                  autoFocus
                  maskDelay={1000}
                  password={true}
                  onFulfill={() => navigate("SetFingerPrint")}
                />
              </View>
              <View style={{ marginTop: 40 }}>
                <ButtonView
                  btnTxt={"Continue"}
                  onBtnPress={() => {}}
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
  PinText: {
    color: Variables.Colors.white,
    fontSize: 18,
    textAlign: "center",
  },
  maskedView: {
    width: 20,
    height: 20,
    borderRadius: 25,
    backgroundColor: Variables.Colors.greyBg,
    borderColor: "white",
    borderWidth: 1,
  },
  defaultCell: {
    borderWidth: 1,
    borderRadius: 10,
    height: 60,
    width: 75,
    borderColor: "#35383F",
    backgroundColor: Variables.Colors.greyBg,
  },
  cellStyleFocused: {
    borderColor: Variables.Colors.yellow,
    backgroundColor: Variables.Colors.greyBg,
    height: 60,
    width: 75,
  },
  defaultTextStyle: {
    color: "white",
    fontsize: 35,
    fontFamily: "Urbanist-Bold",
  },
  textFocusedStyle: {
    color: "white",
    fontsize: 35,
    fontFamily: "Urbanist-Bold",
  },
  inputOuterView: {
    alignItems: "center",
    marginTop: Variables.Measures.fontSize * 2,
  },
  headingView: {
    alignItems: "center",
    justifyContent: "center",
  },
  containerView: {
    height: Variables.Measures.height / 1.2,
    alignSelf: "center",
    justifyContent: "center",
  },
});
export default CreatePin;

import React, { useState, useRef } from "react";
import { CommonStyles, FontStyle, Images, Variables } from "../../Theme";
import {
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  Text,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import { goBack, navigate } from "../../navigators/RootNavigation";
import ImagePicker from "react-native-image-crop-picker";

import Header from "../../components/Header";
import ButtonView from "../../components/ButtonView";

import CloseSvg from "../../assets/Images/Close.svg";
import InputField from "../../components/InputField";
import BottomModal from "../../components/BottomModal";
import { useDispatch, useSelector } from "react-redux";
import { updateProfileStart } from "../../actions/userActions";
import { ReducerStateProps } from "../Inbox/InterfaceProps";
import FastImageView from "../../components/FastImageView";
import { Colors, Measures } from "../../Theme/variables";
import CheckBox from "../../components/CheckBox";

interface EditProfileProps {}

export interface ImageProps {
  didCancel?: string;
  errorCode?: string;
  errorMessage?: string;
  path: string;
  height?: number;
  mime?: string;
  size?: number;
  width?: number;
}

const Extras: React.FC<EditProfileProps> = () => {
  const { t } = useTranslation();

  const [isCheck, setCheck] = useState(false);

  const dispatch = useDispatch();

  const [isLoading, updateProfileData] = useSelector(
    (state: ReducerStateProps) => [
      state.user.isLoading,
      state.user.updateProfileData,
    ]
  );

  return (
    <SafeAreaView style={CommonStyles.safeAreaStyle}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.blackBg} />
      <Header
        leftSvg={<CloseSvg height={25} width={25} />}
        onLeftPress={goBack}
      />
      <View style={{ width: "93%", alignSelf: "center" }}>
        <Text style={[FontStyle.urbanistBold, styles.headingTxt]}>Extras</Text>
        <Text style={[FontStyle.urbanistMedium, styles.profileDescTxt]}>
          These optional Extras are offered by this host and can help make your
          trip unique and memorable.
        </Text>
      </View>

      <View style={styles.stepToBook}>
        <Text
          style={[
            FontStyle.urbanistMedium,
            styles.headingTxt,
            {
              fontSize: 12,
              color: Colors.chocolate,
            },
          ]}
        >
          CONVENIENCE
        </Text>
      </View>

      <View style={{ width: "93%", alignSelf: "center" }}>
        <Text
          style={[FontStyle.urbanistBold, styles.headingTxt, { fontSize: 15 }]}
        >
          Prepaid refuel
        </Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <CheckBox isCheck={isCheck} onBtnPress={() => setCheck(!isCheck)} />
          <View style={{ width: 10 }} />
          <Text style={[FontStyle.urbanistMedium, styles.profileDescTxt]}>
            Save time, make drop-off a breeze, and avoid additional fees by
            adding this Extra, which allows you to return my car at any fuel
            level. Price includes up to a full tank of gas.
          </Text>
        </View>
        <View style={{ marginVertical: Variables.Measures.fontSize * 2.5 }}>
          <Text style={[FontStyle.urbanistMedium, styles.extraTxt]}>
            No thanks, I don't want to add any Extras
          </Text>
          <ButtonView
            btnTxt={"Apply"}
            onBtnPress={() => goBack()}
            width={Variables.Measures.width / 2}
            backgroundColor={Variables.Colors.yellow}
            fontColor={Variables.Colors.blackBg}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inputTitleTxt: {
    color: Variables.Colors.inputTxtColor,
    fontSize: 12,
    marginTop: Variables.Measures.fontSize / 1.3,
  },
  inputView: {
    width: "100%",
    backgroundColor: Variables.Colors.carGrey,
    height: 50,
    alignSelf: "center",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginTop: 10,
    color: Variables.Colors.white,
  },
  headingTxt: {
    fontSize: Variables.Measures.fontSize,
    color: Variables.Colors.white,
  },
  profileDescTxt: {
    fontSize: Variables.Measures.fontSize / 1.8,
    color: Variables.Colors.white,
    marginVertical: 5,
    lineHeight: 22,
    flexShrink: 1,
  },
  changePicTxt: {
    fontSize: Variables.Measures.fontSize / 1.3,
    color: Variables.Colors.white,
  },
  changeProfileBtn: {
    width: "100%",
    alignSelf: "center",
    backgroundColor: Variables.Colors.greyBg,
    height: 55,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  stepToBook: {
    flexDirection: "row",
    marginVertical: Measures.fontSize,
    width: "100%",
    alignSelf: "center",
    justifyContent: "space-between",
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.grey,
    height: 50,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  extraTxt: {
    fontSize: Variables.Measures.fontSize / 1.5,
    color: Variables.Colors.chocolate,
    marginVertical: 20,
    alignSelf: "center",
  },
});

export default Extras;

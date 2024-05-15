import React, { useState } from "react";
import { CommonStyles, FontStyle, Variables } from "../../Theme";
import {
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import { goBack } from "../../navigators/RootNavigation";
import Header from "../../components/Header";
import ButtonView from "../../components/ButtonView";
import CloseSvg from "../../assets/Images/Close.svg";
import { useDispatch, useSelector } from "react-redux";
import { ReducerStateProps } from "../Inbox/InterfaceProps";
import { Colors, Measures } from "../../Theme/variables";
import RadioView from "../../components/Radiobutton";

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

const ProtectionPlan: React.FC<EditProfileProps> = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const [isLoading, updateProfileData] = useSelector(
    (state: ReducerStateProps) => [
      state.user.isLoading,
      state.user.updateProfileData,
    ]
  );
  const [ischeck, setCheck] = useState(true);

  return (
    <SafeAreaView style={CommonStyles.safeAreaStyle}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.blackBg} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView>
          <Header
            leftSvg={<CloseSvg height={25} width={25} />}
            centerText={"Protection plans"}
            onLeftPress={goBack}
          />
          <View style={{ width: "93%", alignSelf: "center" }}>
            <Text style={[FontStyle.urbanistMedium, styles.profileDescTxt]}>
              Choose a protection plan that includes coverage under a policy of
              insurance from Liberty Mutual offered through Turo insurance
              Agency, LLC.
            </Text>
          </View>

          <TouchableOpacity
            style={[
              styles.cardView,
              { borderColor: ischeck ? Colors.yellow : Colors.carGrey },
            ]}
            onPress={() => setCheck(true)}
          >
            <RadioView isCheck={ischeck} disablebtn={false} />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text
                style={[
                  FontStyle.urbanistBold,
                  styles.headingTxt,
                  { fontSize: 15 },
                ]}
              >
                Standard
              </Text>
              <Text
                style={[
                  FontStyle.urbanistBold,
                  styles.headingTxt,
                  { fontSize: 10 },
                ]}
              >
                Deoendable -
                <Text style={[FontStyle.urbanistMedium, styles.boxDescTxt]}>
                  {" "}
                  Hit the road confidently with solid protection.
                </Text>
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: 5,
                    marginRight: 5,
                    backgroundColor: Colors.chocolate,
                  }}
                />
                <Text style={[FontStyle.urbanistMedium, styles.boxDescTxt]}>
                  Protection against thef, vandalism, and collision damage
                </Text>
              </View>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: 5,
                    marginRight: 5,
                    backgroundColor: Colors.chocolate,
                  }}
                />
                <Text style={[FontStyle.urbanistMedium, styles.boxDescTxt]}>
                  $500 max out-of-pocket for vehicle damage or theft
                </Text>
              </View>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: 5,
                    marginRight: 5,
                    backgroundColor: Colors.chocolate,
                  }}
                />
                <Text style={[FontStyle.urbanistMedium, styles.boxDescTxt]}>
                  Physical damage costs covered up to the value of the car
                </Text>
              </View>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: 5,
                    marginRight: 5,
                    backgroundColor: Colors.chocolate,
                  }}
                />
                <Text style={[FontStyle.urbanistMedium, styles.boxDescTxt]}>
                  State minimum liability insurance
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setCheck(false)}
            style={[
              styles.cardView,
              { borderColor: ischeck ? Colors.carGrey : Colors.yellow },
            ]}
          >
            <RadioView
              isCheck={!ischeck}
              disablebtn={false}
              // onBtnPress={() => setCheck(!ischeck)}
            />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text
                style={[
                  FontStyle.urbanistBold,
                  styles.headingTxt,
                  { fontSize: 15 },
                ]}
              >
                Minimum
              </Text>
              <Text
                style={[
                  FontStyle.urbanistBold,
                  styles.headingTxt,
                  { fontSize: 10 },
                ]}
              >
                Deoendable -
                <Text style={[FontStyle.urbanistMedium, styles.boxDescTxt]}>
                  {" "}
                  Hit the road confidently with solid protection.
                </Text>
              </Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: 5,
                    marginRight: 5,
                    backgroundColor: Colors.chocolate,
                  }}
                />
                <Text style={[FontStyle.urbanistMedium, styles.boxDescTxt]}>
                  Protection against thef, vandalism, and collision damage
                </Text>
              </View>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: 5,
                    marginRight: 5,
                    backgroundColor: Colors.chocolate,
                  }}
                />
                <Text style={[FontStyle.urbanistMedium, styles.boxDescTxt]}>
                  $500 max out-of-pocket for vehicle damage or theft
                </Text>
              </View>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: 5,
                    marginRight: 5,
                    backgroundColor: Colors.chocolate,
                  }}
                />
                <Text style={[FontStyle.urbanistMedium, styles.boxDescTxt]}>
                  Physical damage costs covered up to the value of the car
                </Text>
              </View>

              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: 5,
                    marginRight: 5,
                    backgroundColor: Colors.chocolate,
                  }}
                />
                <Text style={[FontStyle.urbanistMedium, styles.boxDescTxt]}>
                  State minimum liability insurance
                </Text>
              </View>
            </View>
          </TouchableOpacity>

          <View
            style={{ width: "93%", alignSelf: "center", marginVertical: 20 }}
          >
            {/* <Text style={[FontStyle.urbanistMedium, styles.extraTxt]}>
              No thanks, I don't want to add any Extras
            </Text> */}
            <ButtonView
              btnTxt={"Save"}
              isLoading={isLoading}
              onBtnPress={() => goBack()}
              width={Variables.Measures.width / 2}
              backgroundColor={Variables.Colors.yellow}
              fontColor={Variables.Colors.blackBg}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inputTitleTxt: {
    color: Variables.Colors.inputTxtColor,
    fontSize: 12,
    marginTop: Variables.Measures.fontSize / 1.3,
  },
  cardView: {
    flexDirection: "row",
    marginTop: Measures.fontSize,
    marginHorizontal: 20,
    backgroundColor: Colors.carGrey,
    minHeight: 200,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
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
  },

  extraTxt: {
    fontSize: Variables.Measures.fontSize / 1.5,
    color: Variables.Colors.chocolate,
    marginVertical: 20,
    alignSelf: "center",
  },
  boxDescTxt: {
    fontSize: Variables.Measures.fontSize / 1.8,
    color: Variables.Colors.chocolate,
    lineHeight: 22,
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
    width: "93%",
    alignSelf: "center",
    justifyContent: "space-between",
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.grey,
    height: 50,
    alignItems: "center",
  },
});

export default ProtectionPlan;

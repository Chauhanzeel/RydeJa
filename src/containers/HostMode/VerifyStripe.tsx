import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";

import { FontStyle, Variables } from "../../Theme";
import { goBack, navigate, replace } from "../../navigators/RootNavigation";
import VerifiedSvg from "../../assets/Images/verified.svg";
import ButtonView from "../../components/ButtonView";
import DropDownWhite from "../../assets/Images/DropDownWhite.svg";
import LeftSvg from "../../assets/Images/Close.svg";
import { Dropdown } from "react-native-element-dropdown";
import Header from "../../components/Header";
import { FilterModalProps } from "../types";
import _ from "lodash";
import * as Progress from "react-native-progress";
import InputField from "../../components/InputField";
import { TextInputMask } from "react-native-masked-text";
import moment from "moment";
import {
  createStripeAccountStart,
  createStripeAccountSuccess,
} from "../../actions/paymentActions";
import { useDispatch, useSelector } from "react-redux";
import { ReducerStateProps } from "../Inbox/InterfaceProps";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { profileDetailsStart } from "../../actions/userActions";

import { toastConst } from "../../constants/constants";
import ToastMessage from "../../components/ToastMessage";

const VerifyStripe: React.FC<FilterModalProps> = ({ route }) => {
  const { t } = useTranslation();
  const [progress, setProgres] = useState(0.2);
  const [businessType, setBusinessType] = useState(null);
  const [businessName, setBusinessName] = useState(null);
  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const birthDateRef = useRef(null);
  const trnNumberRef = useRef(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstNameError, setFirstNameError] = useState(0);
  const [lastNameError, setLastNameError] = useState(0);
  const [businessError, setBusinessError] = useState(0);

  const [birthDateError, setBirthDateError] = useState(0);
  const [birthDate, setBirthDate] = useState("");

  const [trnNumber, setTrnNumber] = useState(null);
  const [trnNumberError, setTrnNumberError] = useState(0);

  const dispatch = useDispatch();

  const [isLoading, stripeAccount, profileDetailsData] = useSelector(
    (state: ReducerStateProps) => [
      state.payment.isLoading,
      state.payment.stripeAccount,
      state.user.profileDetailsData,
    ]
  );

  useEffect(() => {
    if (profileDetailsData) {
      setFirstName(profileDetailsData?.verifiedInfo?.firstName || "");
      setLastName(profileDetailsData?.verifiedInfo?.lastName || "");
    }
  }, [profileDetailsData]);

  useEffect(() => {
    if (stripeAccount) {
      replace("Verified");
      dispatch(createStripeAccountSuccess(null));
      dispatch(profileDetailsStart());
    }
  }, [stripeAccount]);

  const businessData = [
    {
      id: "individual",
      name: "Individual",
    },
  ];

  let createAccount = () => {
    var newdate = _.split(birthDate, "/")?.reverse()?.join("-");
    var data = {
      businessType: businessType,
      dob: newdate,
      trn: trnNumber ? Number(trnNumber) : Number("000000000"),
    };
    dispatch(createStripeAccountStart(data));
  };

  let nextPage = () => {
    setBusinessError(businessType ? 0 : 1);

    setBirthDateError(birthDate ? 0 : 1);

    setTrnNumberError(trnNumber && _.size(trnNumber) == 9 ? 0 : 1);

    if (businessType && progress == 0.2) {
      setProgres(0.8);
    } else if (
      birthDate &&
      trnNumber &&
      _.size(trnNumber) == 9 &&
      progress < 1
    ) {
      setProgres(1);
    } else if (progress == 1) {
      createAccount();
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaStyle}>
      <StatusBar translucent backgroundColor="transparent" />
      <Header
        leftSvg={<LeftSvg />}
        onLeftPress={() => {
          if (progress == 0.2) {
            goBack();
          } else if (progress < 1) {
            setProgres(0.2);
          } else if (progress == 1) {
            setProgres(0.8);
          }
        }}
      />

      <ScrollView>
        <View style={styles.sv}>
          {progress == 1 ? null : (
            <Progress.Bar
              progress={progress}
              width={Variables.Measures.width / 2}
              height={Variables.MetricsSizes.small}
              color={Variables.Colors.white}
              unfilledColor={Variables.Colors.activeTab}
              borderWidth={0}
            />
          )}

          {progress == 0.2 ? (
            <>
              <Text
                style={[
                  FontStyle.urbanistBold,
                  {
                    color: Variables.Colors.white,
                    fontSize: 24,
                    marginTop: Variables.MetricsSizes.large,
                  },
                ]}
              >
                About your business
              </Text>
              <Text style={[FontStyle.urbanistMedium, styles.legatTxt]}>
                Select a legal entity for your company.
              </Text>

              <View
                style={{
                  marginTop: Variables.MetricsSizes.large,
                }}
              />

              {businessType && (
                <Text style={[FontStyle.urbanistMedium, styles.inputTitleTxt]}>
                  Type of business
                </Text>
              )}
              <Dropdown
                style={[
                  styles.dropdown,
                  {
                    marginTop: businessType ? 10 : 0,
                    borderColor: Variables.Colors.yellow,
                    borderWidth: businessError ? 1 : 0,
                  },
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={[
                  FontStyle.urbanistRegular,
                  styles.selectedTextStyle,
                ]}
                iconStyle={styles.iconStyle}
                data={businessData}
                maxHeight={280}
                labelField="name"
                valueField={"id"}
                placeholder={"Type of business"}
                value={businessType}
                onChange={(item) => {
                  setBusinessType(item.id);
                  setBusinessName(item.name);
                }}
                renderRightIcon={() => <DropDownWhite />}
                dropdownPosition="bottom"
                containerStyle={{
                  backgroundColor: Variables.Colors.greyBg,
                  borderColor: Variables.Colors.greyBg,
                  borderRadius: 8,
                  marginTop: 0,
                }}
                showsVerticalScrollIndicator
                itemTextStyle={[
                  FontStyle.urbanistRegular,
                  {
                    color: Variables.Colors.inputTxtColor,
                    fontSize: 16,
                  },
                ]}
                activeColor={Variables.Colors.greyBg}
              />
            </>
          ) : progress < 1 && progress > 0.2 ? (
            <KeyboardAwareScrollView>
              <Text style={[FontStyle.urbanistBold, styles.pdTxt]}>
                Personal details
              </Text>
              <Text style={[FontStyle.urbanistMedium, styles.aboutTxt]}>
                Tell us a few detials about yourself.
              </Text>

              <View
                style={{
                  marginTop: Variables.MetricsSizes.large,
                }}
              />
              <Text style={[FontStyle.urbanistMedium, styles.inputTitleTxt]}>
                Legal name of person
              </Text>

              <View style={{ width: "100%", alignSelf: "center" }}>
                <InputField
                  placeholder="First name"
                  placeholderTextColor={Variables.Colors.activeTab}
                  value={firstName}
                  onChangeText={(val: any) => {
                    setFirstName(val);
                    if (val.length >= 1) {
                      setFirstNameError(1);
                    } else {
                      setFirstNameError(0);
                    }
                  }}
                  onSubmitEditing={() => {
                    lastNameRef.current.focus();
                    setFirstNameError(0);
                  }}
                  inputref={firstNameRef}
                  inputReturnKeyType="next"
                  emptyField={firstNameError}
                />
                <View
                  style={{
                    marginTop: Variables.MetricsSizes.regular,
                  }}
                />
                <InputField
                  placeholder="Last name"
                  placeholderTextColor={Variables.Colors.activeTab}
                  value={lastName}
                  onChangeText={(val: string) => {
                    setLastName(val);
                    if (val.length >= 1) {
                      setLastNameError(1);
                    } else {
                      setLastNameError(0);
                    }
                  }}
                  inputref={lastNameRef}
                  emptyField={lastNameError}
                  onSubmitEditing={() => {
                    setLastNameError(0);
                  }}
                />
              </View>

              <View
                style={{
                  width: "50%",
                  marginTop: Variables.MetricsSizes.large,
                }}
              >
                <Text style={[FontStyle.urbanistMedium, styles.nameHeadingTxt]}>
                  Date of birth
                </Text>
                <View
                  style={[
                    birthDateError === 1
                      ? styles.emptyCardRowView
                      : styles.cardRowView,
                    { marginTop: 5 },
                  ]}
                >
                  <TextInputMask
                    placeholder="DD/MM/YYYY"
                    style={{
                      color: Variables.Colors.white,
                      width: "100%",
                    }}
                    placeholderTextColor={Variables.Colors.carsBorderGrey}
                    refInput={(ref) => birthDateRef == ref}
                    includeRawValueInChangeText={true}
                    onChangeText={(maskedText) => {
                      setBirthDate(maskedText);
                      maskedText.length >= 1
                        ? setBirthDateError(1)
                        : setBirthDateError(0);
                    }}
                    value={birthDate}
                    type={"custom"}
                    options={{ mask: "99/99/9999" }}
                    keyboardType={"decimal-pad"}
                    onSubmitEditing={() => {
                      trnNumberRef.current.focus();
                      setBirthDateError(0);
                    }}
                    returnKeyType={Platform.OS == "android" ? "next" : "done"}
                  />
                </View>
              </View>

              <Text
                style={[
                  FontStyle.urbanistMedium,
                  styles.inputTitleTxt,
                  { marginTop: Variables.MetricsSizes.large },
                ]}
              >
                Enter 9 digits of Tax Registration Number
              </Text>
              <View style={{ width: "50%" }}>
                <InputField
                  placeholder="- - - - - - - - -"
                  placeholderTextColor={Variables.Colors.activeTab}
                  value={trnNumber}
                  onChangeText={(val: any) => {
                    setTrnNumber(val);
                    if (val.length >= 1) {
                      setTrnNumberError(1);
                    } else {
                      setTrnNumberError(0);
                    }
                  }}
                  onSubmitEditing={() => {
                    setTrnNumberError(0);
                  }}
                  inputref={trnNumberRef}
                  emptyField={trnNumberError}
                  inputKeyboardType={"decimal-pad"}
                  maxLength={9}
                  inputReturnKeyType={"done"}
                />
              </View>
            </KeyboardAwareScrollView>
          ) : (
            <>
              <Text
                style={[
                  FontStyle.urbanistBold,
                  styles.pdTxt,
                  {
                    marginTop: Variables.MetricsSizes.large / 3,
                  },
                ]}
              >
                Confirm your Information
              </Text>
              <Text style={[FontStyle.urbanistMedium, styles.aboutTxt]}>
                You're almost ready to begin using RydeJa. Please ensure that
                these details are accurate.
              </Text>

              <View
                style={{
                  marginTop: Variables.MetricsSizes.large,
                }}
              />
              <Text style={[FontStyle.urbanistMedium, styles.aboutTxt]}>
                ACCOUNT OWNER
              </Text>

              <View
                style={{
                  borderRadius: 12,
                  backgroundColor: Variables.Colors.carGrey,
                  padding: 20,
                  marginTop: Variables.MetricsSizes.tiny,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={[
                      FontStyle.urbanistMedium,
                      {
                        fontSize: 14,
                        color: Variables.Colors.white,
                        lineHeight: 19,
                      },
                    ]}
                  >
                    {firstName} {lastName}
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      setProgres(0.2);
                    }}
                  >
                    <Text
                      style={[
                        FontStyle.urbanistBold,
                        {
                          fontSize: 12,
                          color: Variables.Colors.yellow,
                          lineHeight: 22,
                        },
                      ]}
                    >
                      EDIT
                    </Text>
                  </TouchableOpacity>
                </View>
                <Text
                  style={[
                    FontStyle.urbanistSemiBold,
                    {
                      fontSize: 13,
                      color: Variables.Colors.inputTxtColor,
                    },
                  ]}
                >
                  Account representative
                </Text>
                <Text
                  style={[
                    FontStyle.urbanistSemiBold,
                    {
                      fontSize: 13,
                      color: Variables.Colors.inputTxtColor,
                      marginTop: Variables.FontSize.small,
                      lineHeight: 25,
                    },
                  ]}
                >
                  Born on {birthDate}
                </Text>
                <Text
                  style={[
                    FontStyle.urbanistMedium,
                    {
                      fontSize: 14,
                      color: Variables.Colors.white,
                      marginTop: Variables.FontSize.small,
                      lineHeight: 19,
                      letterSpacing: 0.17,
                    },
                  ]}
                >
                  Tax Registration Number
                </Text>
                <Text
                  style={[
                    FontStyle.urbanistSemiBold,
                    {
                      fontSize: 13,
                      color: Variables.Colors.inputTxtColor,
                      lineHeight: 25,
                    },
                  ]}
                >
                  {trnNumber}
                </Text>
                <View
                  style={{
                    height: 1,
                    marginTop: 18,
                    marginBottom: Variables.MetricsSizes.regular,
                    width: "100%",
                    backgroundColor: Variables.Colors.carsBorderGrey,
                  }}
                />
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <VerifiedSvg width={16} height={16} />
                  <Text
                    style={[
                      FontStyle.urbanistMedium,
                      {
                        fontSize: 13,
                        color: Variables.Colors.white,
                        lineHeight: 19,
                        marginLeft: 8,
                      },
                    ]}
                  >
                    Verified
                  </Text>
                </View>
              </View>
              <Text
                style={[
                  FontStyle.urbanistMedium,
                  {
                    color: Variables.Colors.inputTxtColor,
                    fontSize: 13,
                    marginTop: Variables.MetricsSizes.regular,
                    lineHeight: 22,
                  },
                ]}
              >
                This person must undergo verification before your business can
                get started.
              </Text>
              <Text
                style={[
                  FontStyle.urbanistMedium,
                  {
                    color: Variables.Colors.inputTxtColor,
                    fontSize: 13,
                    marginVertical: Variables.MetricsSizes.large,
                    lineHeight: 22,
                  },
                ]}
              >
                By clicking Continue, you agree to the terms and conditions and
                confirm the accuracy of your information.
              </Text>
            </>
          )}
        </View>
      </ScrollView>
      <View style={styles.btnView}>
        <ButtonView
          btnTxt={"Continue"}
          isLoading={isLoading}
          disablebtn={isLoading}
          onBtnPress={() => {
            nextPage();
          }}
          width={Variables.Measures.width / 1.09}
          backgroundColor={Variables.Colors.yellow}
          fontColor={Variables.Colors.darkBlack}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  aboutTxt: {
    color: Variables.Colors.white,
    fontSize: 14,
    marginTop: Variables.MetricsSizes.small,
  },
  pdTxt: {
    color: Variables.Colors.white,
    fontSize: 24,
    marginTop: Variables.MetricsSizes.large,
  },
  legatTxt: {
    color: Variables.Colors.white,
    fontSize: 14,
    marginTop: Variables.MetricsSizes.small,
  },
  sv: {
    width: "90%",
    alignSelf: "center",
    marginTop: Variables.MetricsSizes.small,
  },
  safeAreaStyle: {
    flex: 1,
    backgroundColor: Variables.Colors.darkBlack,
  },
  btnView: {
    // position: "absolute",
    // bottom: 30,
    left: 0,
    right: 0,
    height: 80,
    justifyContent: "center",
  },
  inputTitleTxt: {
    color: Variables.Colors.white,
    fontSize: 14,
    width: "96%",
    alignSelf: "center",
  },
  dropdown: {
    height: 50,
    backgroundColor: Variables.Colors.greyBg,
    borderRadius: 10,
    paddingLeft: 8,
    width: "100%",
    alignSelf: "center",
    paddingRight: 20,
  },
  placeholderStyle: {
    fontSize: 16,
    color: Variables.Colors.inputTxtColor,
    paddingLeft: 8,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "white",
    paddingHorizontal: 10,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  nameHeadingTxt: {
    color: Variables.Colors.white,
    fontSize: 14,
    width: "95%",
    alignSelf: "center",
  },
  cardRowView: {
    width: "100%",
    alignSelf: "center",
    backgroundColor: Variables.Colors.carGrey,
    height: 50,
    marginTop: 10,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  emptyCardRowView: {
    width: "100%",
    alignSelf: "center",
    backgroundColor: Variables.Colors.carGrey,
    height: 50,
    marginTop: 10,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: Variables.Colors.darkYellow,
  },
});
export default VerifyStripe;

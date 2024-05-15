import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  StatusBar,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { CommonStyles, FontStyle, Variables } from "../../Theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { goBack } from "../../navigators/RootNavigation";

import LockSvg from "../../assets/Images/Lock.svg";
import CreditCardSvg from "../../assets/Images/CreditCard.svg";
import BackSvg from "../../assets/Images/BackArrow.svg";
import InfoSvg from "../../assets/Images/Info.svg";

import InputField from "../../components/InputField";
import ButtonView from "../../components/ButtonView";
import { useDispatch, useSelector } from "react-redux";
import { cardAccessTokenStart } from "../../actions/paymentActions";
import { GetApprovedProps, ReducerStateProps } from "../Inbox/InterfaceProps";
import {
  saveCardStart,
  saveCardSuccess,
  validationCheckStart,
} from "../../actions/customerActions";
import _ from "lodash";
import { TextInputMask } from "react-native-masked-text";
import { Colors } from "../../Theme/variables";
import { Dropdown } from "react-native-element-dropdown";
import Header from "../../components/Header";
import BookingValidation from "../../components/BookedValidation";
import ToastMessage from "../../components/ToastMessage";
import { toastConst } from "../../constants/constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const AddPaymentCard: React.FC<GetApprovedProps> = ({ route }) => {
  const { t } = useTranslation();
  const rentalCarObj = route.params?.rentalCarObj;

  const cardNameRef = useState(null);
  const cardNumberRef = useRef(null);
  const expiryDateRef = useRef(null);
  const cvvNumref = useRef(null);
  const streetAddressRef = useRef(null);
  const cityRef = useRef(null);
  const provinceRef = useRef(null);
  const postalCodeRef = useRef(null);
  const countryRef = useRef(null);

  const [cardName, setCardName] = useState(null);
  const [cardNum, setCardNum] = useState(null);
  const [expiryDate, setExpiryDate] = useState("");
  const [cvvNum, setCvvNum] = useState(null);
  const [streetAddress, setStreetAddress] = useState(null);
  const [city, setCity] = useState(null);
  const [province, setProvince] = useState(null);
  const [postalCode, setPostalCode] = useState(null);
  const [country, setCountry] = useState(null);

  const [cardNameError, setCardNameError] = useState(0);
  const [cardNumError, setCardNumError] = useState(0);
  const [expiryDateError, setExpiryDateError] = useState(0);
  const [cvvNumError, setCvvNumError] = useState(0);
  const [streetAddressError, setStreetAddressError] = useState(0);
  const [cityError, setCityError] = useState(0);
  const [provinceError, setProvinceError] = useState(0);
  const [postalCodeError, setPostalCodeError] = useState(0);
  const [countryError, setCountryError] = useState(0);
  const [firstTime, setFirstTime] = useState(false);

  const checkCvv = (val: string) => {
    const numData = val.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, "");
    setCvvNum(numData);
  };

  const checkCardNumber = (val: string) => {
    const numData = val.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, "");
    setCardNum(numData);
  };

  const dispatch = useDispatch();

  const [
    countryListdata,
    cardToken,
    saveCard,
    payLoading,
    custLoading,
    validationObj,
  ] = useSelector((state: ReducerStateProps) => [
    state.user.countryListData,
    state.payment.cardToken,
    state.customer.saveCard,
    state.payment.isLoading,
    state.customer.isLoading,
    state.customer.validationObj,
  ]);

  useEffect(() => {
    if (_.get(saveCard, "success", null)) {
      dispatch(validationCheckStart(null));
      dispatch(saveCardSuccess(null));
    }
  }, [saveCard]);

  useEffect(() => {
    if (_.get(validationObj, "isPaymentMethod", null)) {
      BookingValidation.Check(validationObj, rentalCarObj);
    }
  }, [validationObj]);

  useEffect(() => {
    if (cardToken && firstTime) {
      SaveCardMethod();
      setFirstTime(false);
    }
  }, [cardToken, saveCard]);

  const SaveCardMethod = () => {
    const params = {
      source: _.get(cardToken, "id", null),
      // source: "tok_visa",
    };

    dispatch(saveCardStart(params));
  };

  const cardTokenAccess = () => {
    setCardNameError(cardName ? 0 : 1);
    setCardNumError(cardNum ? 0 : 1);
    setCityError(city ? 0 : 1);
    setProvinceError(province ? 0 : 1);
    setPostalCodeError(postalCode ? 0 : 1);
    setStreetAddressError(streetAddress ? 0 : 1);
    setExpiryDateError(expiryDate ? 0 : 1);
    setCvvNumError(cvvNum ? 0 : 1);
    setCountryError(country ? 0 : 1);

    if (
      cardName &&
      cardNum &&
      expiryDate &&
      cvvNum &&
      streetAddress &&
      province &&
      postalCode &&
      country &&
      city
    ) {
      const params = {
        "card[currency]": "usd",
        "card[name]": cardName,
        "card[number]": cardNum,
        "card[cvc]": cvvNum,
        "card[exp_month]": _.split(expiryDate, "/")[0],
        "card[exp_year]": _.split(expiryDate, "/")[1],
        "card[address_line1]": streetAddress,
        "card[address_line2]": streetAddress,
        "card[address_state]": province,
        "card[address_zip]": postalCode,
        "card[address_country]": country,
        "card[address_city]": city,
      };
      dispatch(cardAccessTokenStart(params));
    } else {
      ToastMessage.set(
        toastConst.errorToast,
        "Please fill out all required fields."
      );
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaStyle}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.blackBg} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <KeyboardAwareScrollView>
          <Header
            centerText="Payment Method"
            leftSvg={<BackSvg />}
            onLeftPress={() => goBack()}
          />
          <View>
            <View style={styles.infoView}>
              <InfoSvg />
              <Text
                style={[
                  FontStyle.urbanistMedium,
                  CommonStyles.descCommonTxt,
                  styles.infoTxt,
                ]}
              >
                You won't be charged until you book.
              </Text>
            </View>
            <View style={styles.billingHeadingView}>
              <Text
                style={[FontStyle.urbanistBold, CommonStyles.descCommonTxt]}
              >
                Card information
              </Text>
            </View>
            <View>
              <View style={styles.ifView}>
                <InputField
                  placeholderTextColor={Variables.Colors.carsBorderGrey}
                  value={cardName}
                  onChangeText={(val: string) => {
                    setCardName(val);
                    val.length >= 1 ? setCardNameError(1) : setCardNameError(0);
                  }}
                  onSubmitEditing={() => {
                    cardNumberRef.current.focus();
                    setCardNameError(0);
                  }}
                  emptyField={cardNameError}
                  inputref={cardNameRef}
                  placeholder="Name on card"
                  labelTxt={"Name on card"}
                  inputReturnKeyType="next"
                />
              </View>
              <Text
                style={[
                  FontStyle.urbanistMedium,
                  CommonStyles.descCommonTxt,
                  styles.nameHeadingTxt,
                ]}
              >
                Credit card number
              </Text>
              <View
                style={[
                  cardNumError === 1
                    ? styles.emptyCardRowView
                    : styles.cardRowView,
                ]}
              >
                <View style={styles.cardView}>
                  <CreditCardSvg />
                </View>
                <View style={styles.inputView}>
                  <TextInput
                    placeholder="0000 0000 0000 0000"
                    placeholderTextColor={Variables.Colors.carsBorderGrey}
                    value={cardNum}
                    maxLength={16}
                    onChangeText={(val) => {
                      checkCardNumber(val);
                      val.length >= 1 ? setCardNumError(1) : setCardNumError(0);
                    }}
                    onSubmitEditing={() => {
                      expiryDateRef.current.getElement().focus();

                      setCardNumError(0);
                    }}
                    returnKeyType={"next"}
                    ref={cardNumberRef}
                    style={[CommonStyles.descCommonTxt]}
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.cardView}>
                  <LockSvg />
                </View>
              </View>
              <View style={styles.rowView}>
                <View style={{ width: "48%" }}>
                  <Text
                    style={[
                      FontStyle.urbanistMedium,
                      CommonStyles.descCommonTxt,
                      styles.nameHeadingTxt,
                      { marginTop: 0 },
                    ]}
                  >
                    Expiration Date
                  </Text>
                  <View
                    style={[
                      expiryDateError === 1
                        ? styles.emptyCardRowView
                        : styles.cardRowView,
                      { marginTop: 8 },
                    ]}
                  >
                    <TextInputMask
                      ref={expiryDateRef}
                      placeholder="MM / YY"
                      style={{
                        color: Colors.white,
                        width: "100%",
                      }}
                      placeholderTextColor={Variables.Colors.carsBorderGrey}
                      refInput={(ref) => expiryDateRef == ref}
                      includeRawValueInChangeText={true}
                      onChangeText={(maskedText) => {
                        setExpiryDate(maskedText);
                        maskedText.length >= 1
                          ? setExpiryDateError(1)
                          : setExpiryDateError(0);
                      }}
                      value={expiryDate}
                      type={"custom"}
                      options={{ mask: "99/99" }}
                      keyboardType={"decimal-pad"}
                      onSubmitEditing={() => {
                        cvvNumref.current.focus();
                        setExpiryDateError(0);
                      }}
                      returnKeyType="next"
                    />
                  </View>
                </View>
                <View style={{ width: "48%" }}>
                  <InputField
                    placeholder={"000"}
                    placeholderTextColor={Variables.Colors.carsBorderGrey}
                    value={cvvNum}
                    secureTextEntry={true}
                    maxLength={3}
                    onChangeText={(val) => {
                      checkCvv(val);
                      val.length >= 1 ? setCvvNumError(1) : setCvvNumError(0);
                    }}
                    inputKeyboardType="numeric"
                    inputref={cvvNumref}
                    onSubmitEditing={() => {
                      streetAddressRef.current.focus();
                      setCvvNumError(0);
                    }}
                    inputReturnKeyType="next"
                    labelTxt={t("labelConst.securityCode")}
                    emptyField={cvvNumError}
                  />
                </View>
              </View>
            </View>
            <View
              style={[
                styles.billingHeadingView,
                { marginTop: Variables.Measures.fontSize * 1.5 },
              ]}
            >
              <Text
                style={[FontStyle.urbanistBold, CommonStyles.descCommonTxt]}
              >
                Billing information
              </Text>
            </View>
            <View>
              <View
                style={{
                  width: "93%",
                  alignSelf: "center",
                  marginTop: Variables.Measures.fontSize / 2,
                }}
              >
                <InputField
                  placeholder="Address"
                  placeholderTextColor={Variables.Colors.carsBorderGrey}
                  value={streetAddress}
                  onChangeText={(val) => {
                    setStreetAddress(val);
                    val.length >= 1
                      ? setStreetAddressError(1)
                      : setStreetAddressError(0);
                  }}
                  onSubmitEditing={() => {
                    cityRef.current.focus();
                    setStreetAddressError(0);
                  }}
                  inputReturnKeyType="next"
                  inputref={streetAddressRef}
                  labelTxt="Street address"
                  emptyField={streetAddressError}
                />
              </View>
              <View style={styles.rowView}>
                <View style={{ width: "48%" }}>
                  <InputField
                    placeholder="City"
                    placeholderTextColor={Variables.Colors.carsBorderGrey}
                    value={city}
                    onChangeText={(val) => {
                      setCity(val);
                      val.length >= 1 ? setCityError(1) : setCityError(0);
                    }}
                    onSubmitEditing={() => {
                      provinceRef.current.focus();
                      setCityError(0);
                    }}
                    inputref={cityRef}
                    inputReturnKeyType="next"
                    labelTxt="City"
                    emptyField={cityError}
                  />
                </View>
                <View style={{ width: "48%" }}>
                  <InputField
                    placeholder="Province"
                    placeholderTextColor={Variables.Colors.carsBorderGrey}
                    value={province}
                    inputref={provinceRef}
                    inputReturnKeyType="next"
                    labelTxt="Province"
                    onChangeText={(val) => {
                      setProvince(val);
                      val.length >= 1
                        ? setProvinceError(1)
                        : setProvinceError(0);
                    }}
                    onSubmitEditing={() => {
                      postalCodeRef.current.focus();
                      setProvinceError(0);
                    }}
                    emptyField={provinceError}
                  />
                </View>
              </View>
              <View style={styles.rowView}>
                <View style={{ width: "48%" }}>
                  <InputField
                    placeholder="Postal code"
                    placeholderTextColor={Variables.Colors.carsBorderGrey}
                    value={postalCode}
                    inputref={postalCodeRef}
                    inputReturnKeyType="done"
                    labelTxt="Postal code"
                    onChangeText={(val) => {
                      setPostalCode(val);
                      val.length >= 1
                        ? setPostalCodeError(1)
                        : setPostalCodeError(0);
                    }}
                    onSubmitEditing={() => {
                      // countryRef.current.focus();
                      setPostalCodeError(0);
                    }}
                    emptyField={postalCodeError}
                  />
                </View>
                <View style={{ width: "48%" }}>
                  {/* <InputField
                    placeholder="Country"
                    placeholderTextColor={Variables.Colors.carsBorderGrey}
                    value={country}
                    inputref={countryRef}
                    labelTxt="Country"
                    onChangeText={(val) => {
                      setCountry(val);
                      val.length >= 1 ? setCountryError(1) : setCountryError(0);
                    }}
                    onSubmitEditing={() => {
                      setCountryError(0);
                    }}
                    emptyField={countryError}
                  /> */}
                  {/* {country && (
                  <Text
                    style={[
                      FontStyle.urbanistMedium,
                      styles.inputTitleTxt,
                      { marginTop: 15 },
                    ]}
                  >
                    Country
                  </Text>
                  )} */}

                  <Dropdown
                    style={[
                      styles.dropdown,
                      {
                        borderColor:
                          countryError == 1
                            ? Variables.Colors.yellow
                            : Variables.Colors.greyBg,
                        borderWidth: countryError == 1 ? 1 : 0,
                      },
                    ]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    data={_.get(countryListdata, "items", null) || []}
                    maxHeight={150}
                    labelField="name"
                    valueField="id"
                    placeholder={"Country"}
                    value={country}
                    onChange={(item) => {
                      setCountry(item.id);
                      setCountryError(0);
                    }}
                    dropdownPosition="bottom"
                    containerStyle={{
                      backgroundColor: Variables.Colors.greyBg,
                      borderColor: Variables.Colors.greyBg,
                      borderRadius: 8,
                    }}
                    showsVerticalScrollIndicator
                    itemTextStyle={{ color: Variables.Colors.inputTxtColor }}
                    activeColor={Variables.Colors.greyBg}
                  />
                </View>
              </View>
            </View>
            <View style={{ marginVertical: Variables.Measures.fontSize * 2.5 }}>
              <ButtonView
                btnTxt={"Save and Continue"}
                onBtnPress={() => {
                  cardTokenAccess();
                  setFirstTime(true);
                }}
                isLoading={payLoading || custLoading}
                width={Variables.Measures.width / 1.1}
                backgroundColor={Variables.Colors.yellow}
                fontColor={Variables.Colors.blackBg}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  ifView: {
    width: "93%",
    alignSelf: "center",
    marginTop: Variables.Measures.fontSize / 2,
  },
  cardNumInput: {
    color: Variables.Colors.white,
  },
  keyboardView: {
    flex: 1,
  },
  billingHeadingView: {
    width: "93%",
    alignSelf: "center",
  },
  inputView: {
    width: "78%",
    justifyContent: "center",
    marginLeft: 10,
  },
  cardRowView: {
    width: "93%",
    alignSelf: "center",
    backgroundColor: Variables.Colors.carGrey,
    height: 50,
    marginTop: 10,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  emptyCardRowView: {
    width: "93%",
    alignSelf: "center",
    backgroundColor: Variables.Colors.carGrey,
    height: 50,
    marginTop: 10,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: Variables.Colors.darkYellow,
  },
  cardView: {
    width: "10%",
    justifyContent: "center",
    alignItems: "center",
  },
  nameHeadingTxt: {
    color: Variables.Colors.inputTxtColor,
    width: "93%",
    marginTop: Variables.Measures.fontSize / 1.5,
    alignSelf: "center",
  },
  infoView: {
    width: "93%",
    backgroundColor: Variables.Colors.carGrey,
    alignSelf: "center",
    borderRadius: 10,
    flexDirection: "row",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: Variables.Measures.fontSize * 2,
  },
  infoTxt: {
    color: Variables.Colors.white,
    marginLeft: 5,
  },
  safeAreaStyle: {
    flex: 1,
    backgroundColor: Variables.Colors.blackBg,
  },
  centerTxt: {
    color: Variables.Colors.white,
    fontSize: Variables.Measures.fontSize * 1.1,
  },
  headerView: {
    flexDirection: "row",
    width: "93%",
    alignSelf: "center",
    height: 70,
    alignItems: "center",
  },
  leftImgView: {
    width: Variables.Measures.width / 10,
    marginLeft: 5,
  },
  cardNumView: {
    width: "90%",
    alignSelf: "center",
    marginTop: Variables.Measures.unit * 2,
  },
  rowView: {
    width: "93%",
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: Variables.Measures.fontSize / 1.5,
    alignItems: "center",
  },
  dateTxt: {
    marginLeft: 10,
    marginTop: Variables.Measures.unit * 2.5,
    color: Variables.Colors.white,
    fontSize: Variables.Measures.fontSize / 1.2,
  },
  cvvTxt: {
    marginLeft: 10,
    marginTop: Variables.Measures.unit * 2.5,
    fontSize: 18,
    color: Variables.Colors.white,
  },
  cardTxt: {
    color: Variables.Colors.white,
    fontSize: 14,
  },
  dropdown: {
    height: 50,
    backgroundColor: Variables.Colors.greyBg,
    borderRadius: 10,
    paddingLeft: 8,
    width: "90%",
    alignSelf: "center",
    paddingRight: 20,
    marginTop: Variables.FontSize.regular,
  },
  inputTitleTxt: {
    color: Variables.Colors.inputTxtColor,
    fontSize: 12,
    width: "88%",
    alignSelf: "center",
  },
  placeholderStyle: {
    fontSize: 14,
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
});
export default AddPaymentCard;

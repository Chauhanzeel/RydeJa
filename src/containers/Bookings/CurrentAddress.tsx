import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  StatusBar,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { FontStyle, Variables } from "../../Theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { goBack, replace } from "../../navigators/RootNavigation";
import BackSvg from "../../assets/Images/BackArrow.svg";
import InputField from "../../components/InputField";
import ButtonView from "../../components/ButtonView";
import { useSelector } from "react-redux";
import { GetApprovedProps, ReducerStateProps } from "../Inbox/InterfaceProps";
import _ from "lodash";
import { Colors } from "../../Theme/variables";
import { Dropdown } from "react-native-element-dropdown";
import Header from "../../components/Header";
import { toastConst } from "../../constants/constants";
import ToastMessage from "../../components/ToastMessage";
import { Text } from "react-native";
import { saveCardListStart } from "../../actions/customerActions";
import { useDispatch } from "react-redux";

const CurrentAddress: React.FC<GetApprovedProps> = ({ route }) => {
  const rentalCarObj = route.params?.rentalCarObj;

  const streetAddressRef = useRef(null);
  const cityRef = useRef(null);
  const postalCodeRef = useRef(null);

  const [streetAddress, setStreetAddress] = useState(null);
  const [city, setCity] = useState(null);
  const [postalCode, setPostalCode] = useState(null);
  const [country, setCountry] = useState(null);
  const [countryId, setCountryId] = useState(null);

  const [countryError, setCountryError] = useState(0);
  const [streetAddressError, setStreetAddressError] = useState(0);
  const [cityError, setCityError] = useState(0);
  const [postalCodeError, setPostalCodeError] = useState(0);
  const [countryListdata, payLoading, custLoading, saveCardList] = useSelector(
    (state: ReducerStateProps) => [
      state.user.countryListData,
      state.payment.isLoading,
      state.customer.isLoading,
      state.customer.saveCardList,
    ]
  );
  const cardDetails = _.first(saveCardList.items);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!cardDetails) {
      dispatch(saveCardListStart());
    } else {
      setStreetAddress(_.get(cardDetails, "address_line1", null));
      setCountry(_.get(cardDetails, "address_country", null));
      setCountryId(_.get(cardDetails, "address_country", null));
      setCity(_.get(cardDetails, "address_city", null));
      setPostalCode(_.get(cardDetails, "address_zip", null));
    }
  }, [cardDetails]);

  const nextScreen = () => {
    if (countryId && streetAddress && city && postalCode) {
      replace("Checkout", {
        rentalCarObj: {
          ...rentalCarObj,
          currentAddress: {
            country: countryId,
            address: streetAddress,
            city: city,
            postalCode: postalCode,
          },
        },
      });
    } else {
      setStreetAddressError(streetAddress ? 0 : 1);
      setCityError(city ? 0 : 1);
      setPostalCodeError(postalCode ? 0 : 1);
      setCountryError(countryId ? 0 : 1);
      ToastMessage.set(toastConst.errorToast, "Please fill all the details");
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaStyle}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.blackBg} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView keyboardShouldPersistTaps="always">
          <Header
            centerText="Current Address"
            leftSvg={<BackSvg />}
            onLeftPress={() => goBack()}
          />
          <View>
            <View style={styles.common}>
              <InputField
                // placeholder="Address"
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
                labelTxt="Address"
                emptyField={streetAddressError}
              />
            </View>
            <View style={styles.common}>
              <Text style={[FontStyle.urbanistMedium, styles.inputTitleTxt]}>
                {"Country"}
              </Text>
            </View>
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
              placeholder={"Select Country"}
              value={country}
              onChange={(item) => {
                setCountryId(item.id);
                setCountryError(0);
              }}
              dropdownPosition="bottom"
              containerStyle={{
                backgroundColor: Variables.Colors.greyBg,
                borderColor: Variables.Colors.greyBg,
              }}
              showsVerticalScrollIndicator
              itemTextStyle={{ color: Variables.Colors.inputTxtColor }}
              activeColor={Variables.Colors.greyBg}
            />

            <View style={styles.common}>
              <InputField
                // placeholder="City"
                placeholderTextColor={Variables.Colors.carsBorderGrey}
                value={city}
                onChangeText={(val) => {
                  setCity(val);
                  val.length >= 1 ? setCityError(1) : setCityError(0);
                }}
                onSubmitEditing={() => {
                  postalCodeRef.current.focus();
                  setCityError(0);
                }}
                inputref={cityRef}
                inputReturnKeyType="next"
                labelTxt="City"
                emptyField={cityError}
              />
            </View>

            <View style={styles.common}>
              <InputField
                // placeholder="Zip/Postal code"
                placeholderTextColor={Variables.Colors.carsBorderGrey}
                value={postalCode}
                inputref={postalCodeRef}
                inputReturnKeyType="done"
                labelTxt="Postal code"
                inputKeyboardType={""}
                onChangeText={(val) => {
                  setPostalCode(val);
                  val.length >= 1
                    ? setPostalCodeError(1)
                    : setPostalCodeError(0);
                }}
                onSubmitEditing={() => {
                  setPostalCodeError(0);
                }}
                emptyField={postalCodeError}
              />
            </View>
          </View>
          <View style={{ marginVertical: Variables.Measures.fontSize * 2.5 }}>
            <ButtonView
              btnTxt={"Save and Continue"}
              onBtnPress={() => {
                nextScreen();
              }}
              isLoading={payLoading || custLoading}
              width={Variables.Measures.width / 1.1}
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
  common: {
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
    fontSize: 12,
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
    fontSize: Variables.Measures.fontSize / 2,
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
    width: "93%",
    alignSelf: "center",
    paddingRight: 20,
    marginTop: Variables.Measures.fontSize / 2,
  },
  inputTitleTxt: {
    color: Variables.Colors.inputTxtColor,
    fontSize: 12,
    width: "90%",
    marginLeft: 3,
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
export default CurrentAddress;

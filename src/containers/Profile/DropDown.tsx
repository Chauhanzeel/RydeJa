import React, { useState, useRef } from "react";
import { CommonStyles, FontStyle, Images, Variables } from "../../Theme";
import {
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  Text,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import { goBack, navigate } from "../../navigators/RootNavigation";

import ButtonView from "../../components/ButtonView";
import Header from "../../components/Header";

import DropDownWhite from "../../assets/Images/DropDownWhite.svg";
import BackSvg from "../../assets/Images/BackArrow.svg";
import InputField from "../../components/InputField";

import { Dropdown } from "react-native-element-dropdown";
import SelectDropdown from "react-native-select-dropdown";

interface AddressProps {}

interface DropDownProps {
  label: string;
  value: string;
}

const Address: React.FC<AddressProps> = () => {
  const { t } = useTranslation();
  const streetRef = useRef(null);
  const cityRef = useRef(null);
  const zipCodeRef = useRef(null);

  const [country, setCountry] = useState(null);
  const [street, setStreet] = useState(null);
  const [city, setCity] = useState(null);
  const [province, setProvince] = useState(null);
  const [zipCode, setZipCode] = useState(null);

  const [streetError, setStreetError] = useState(0);
  const [cityError, setCityError] = useState(0);
  const [zipCodeError, setZipCodeError] = useState(0);

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [isProvinceVisble, setIsProvinceVisble] = useState(false);

  const provinceData = [
    { label: "Toronto", value: "Toronto" },
    { label: "Ontario", value: "Ontario" },
    { label: "Water Loo", value: "Water Loo" },
  ];

  const countries = [
    "Egypt",
    "Canada",
    "Australia",
    "Ireland",
    "Brazil",
    "England",
    "Dubai",
    "France",
    "Germany",
    "Saudi Arabia",
    "Argentina",
    "India",
  ];

  const getCountry = (val: DropDownProps) => {
    setCountry(val.value);
  };
  const getProvince = (val: DropDownProps) => {
    setProvince(val.value);
  };

  // const checkEmptyValues = (val: any) => {
  //   if (!val) {
  //     setEmptyField(0);
  //   } else {
  //     setEmptyField(1);
  //   }
  // };

  // const checkEmail = (val: string) => {
  //   const emailReg =
  //     /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  //   setEmail(val);
  //   if (val.length === 0) {
  //     setEmailErrorMsg(null);
  //   } else if (emailReg.test(val) === false) {
  //     setEmailErrorMsg('please enter valid email');
  //   } else if (emailReg.test(val) === true) {
  //     setEmailErrorMsg(null);
  //     setEmail(val);
  //   }
  // };

  const topValue =
    street && city && country ? 290 : street || city || province ? 280 : 270;

  return (
    <SafeAreaView style={CommonStyles.safeAreaStyle}>
      <StatusBar
        backgroundColor={Variables.Colors.darkBlack}
        barStyle="dark-content"
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <Header
          centerText={"Your address"}
          leftSvg={<BackSvg height={22} width={22} />}
          onLeftPress={goBack}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={false}
          contentContainerStyle={styles.scrollViewContainer}
        >
          <Image source={Images.addressBg} style={styles.imageView} />
          <Text style={[styles.imageHeadingTxt, FontStyle.urbanistBold]}>
            Tell us about your Ryde
          </Text>
          <View style={{ width: "90%", alignSelf: "center", marginBottom: 30 }}>
            <Text style={[FontStyle.urbanistSemiBold, styles.carHeading]}>
              Where is your car located?
            </Text>
          </View>
          {country && (
            <Text style={[FontStyle.urbanistMedium, styles.inputTitleTxt]}>
              Country
            </Text>
          )}
          <SelectDropdown
            data={countries}
            onSelect={(selectedItem, index) => {}}
            defaultButtonText={"Select country"}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem;
            }}
            rowTextForSelection={(item, index) => {
              return item;
            }}
            buttonStyle={styles.dropdown1BtnStyle}
            buttonTextStyle={styles.dropdown1BtnTxtStyle}
            renderDropdownIcon={() => {
              return <DropDownWhite />;
            }}
            dropdownIconPosition={"right"}
            dropdownStyle={styles.dropdown1DropdownStyle}
            rowStyle={styles.dropdown1RowStyle}
            rowTextStyle={styles.dropdown1RowTxtStyle}
          />
          <View
            style={{
              marginTop: 15,
            }}
          />
          <View style={{ width: "90%", alignSelf: "center" }}>
            <InputField
              placeholder="Street"
              placeholderTextColor={Variables.Colors.inputTxtColor}
              value={street}
              onChangeText={(val) => {
                setStreet(val);
                if (val.length >= 1) {
                  setStreetError(1);
                } else {
                  setStreetError(0);
                }
              }}
              onSubmitEditing={() => {
                cityRef.current.focus(), setStreetError(0);
              }}
              inputref={streetRef}
              inputReturnKeyType="next"
              labelTxt={streetError === 1 && "Street"}
              emptyField={streetError}
            />
            <View style={{ height: 20 }}></View>
            <InputField
              placeholder="City"
              placeholderTextColor={Variables.Colors.inputTxtColor}
              value={city}
              onChangeText={(val: string) => {
                setCity(val);
                if (val.length >= 1) {
                  setCityError(1);
                } else {
                  setCityError(0);
                }
              }}
              inputref={cityRef}
              labelTxt={cityError === 1 && "City"}
              emptyField={cityError}
              onSubmitEditing={() => {
                setCityError(0);
              }}
            />
            <View style={{ marginTop: province ? 20 : 25 }} />
            {province && (
              <Text style={[FontStyle.urbanistMedium, styles.inputTitleTxt]}>
                State / Region / Prvoince
              </Text>
            )}
          </View>
          <Dropdown
            style={[styles.dropdown, { marginTop: province ? 10 : 0 }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            data={provinceData}
            maxHeight={150}
            labelField="label"
            valueField="value"
            placeholder={
              !isProvinceVisble ? "State / Region / Prvoince" : "..."
            }
            value={province}
            onChange={(item) => {
              setProvince(item.value);
              setIsProvinceVisble(false);
            }}
            renderRightIcon={() => <DropDownWhite />}
            dropdownPosition="bottom"
            containerStyle={{
              backgroundColor: Variables.Colors.greyBg,
              borderColor: Variables.Colors.greyBg,
              borderRadius: 8,
              position: "absolute",
              marginTop: 0,
            }}
            showsVerticalScrollIndicator
            itemTextStyle={{ color: Variables.Colors.inputTxtColor }}
            activeColor={Variables.Colors.greyBg}
          />
          <View style={{ height: 15 }}></View>
          <View style={{ width: "90%", alignSelf: "center" }}>
            <InputField
              placeholder="Zip / PostalCode"
              placeholderTextColor={Variables.Colors.inputTxtColor}
              value={zipCode}
              onChangeText={(val: string) => {
                setZipCode(val);
                if (val.length >= 1) {
                  setZipCodeError(1);
                } else {
                  setZipCodeError(0);
                }
              }}
              emptyField={zipCodeError}
              labelTxt={zipCodeError === 1 && "Zip / PostalCode"}
            />
          </View>
          <View
            style={{
              marginTop: 100,
            }}
          />
          <ButtonView
            btnTxt={t("labelConst.nextTxt")}
            onBtnPress={() => {
              navigate("YourCar");
            }}
            width={Variables.Measures.width / 1.12}
            backgroundColor={Variables.Colors.yellow}
            fontColor={Variables.Colors.white}
          />
          <View style={{ height: 40 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    width: Variables.Measures.width,
    backgroundColor: Variables.Colors.darkBlack,
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  dropdown1BtnStyle: {
    width: "90%",
    height: 50,
    backgroundColor: Variables.Colors.greyBg,
    borderRadius: 10,
    alignSelf: "center",
  },
  dropdown1BtnTxtStyle: { color: "#FFF", textAlign: "left" },
  dropdown1DropdownStyle: { backgroundColor: Variables.Colors.greyBg },
  dropdown1RowStyle: {
    backgroundColor: Variables.Colors.greyBg,
    borderBottomColor: Variables.Colors.greyBg,
  },
  dropdown1RowTxtStyle: { color: "#FFF", textAlign: "left" },
  container: {
    flex: 1,
    width: "100%",
  },
  dropdown: {
    height: 50,
    backgroundColor: Variables.Colors.greyBg,
    borderRadius: 10,
    paddingLeft: 8,
    width: "90%",
    alignSelf: "center",
    paddingRight: 20,
  },
  carHeading: {
    color: Variables.Colors.white,
    fontSize: 14,
  },
  icon: {
    marginRight: 5,
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

  imageHeadingTxt: {
    position: "absolute",
    top: Variables.Measures.width / 2.5,
    color: Variables.Colors.white,
    alignSelf: "center",
    fontSize: 24,
  },
  inputView: {
    width: "90%",
    backgroundColor: Variables.Colors.carGrey,
    height: 50,
    alignSelf: "center",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginTop: 10,
    color: Variables.Colors.white,
  },
  emptyInputField: {
    width: "90%",
    backgroundColor: Variables.Colors.carGrey,
    height: 50,
    alignSelf: "center",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginTop: 10,
    borderColor: Variables.Colors.darkYellow,
    borderWidth: 1,
    color: Variables.Colors.white,
  },
  inputTitleTxt: {
    color: Variables.Colors.inputTxtColor,
    fontSize: 12,
    width: "88%",
    alignSelf: "center",
  },
  headingTxt: {
    color: Variables.Colors.white,
    fontSize: 24,
    marginTop: 10,
    marginBottom: 20,
  },
  headerView: {
    width: "91%",
    alignSelf: "center",
    marginTop: 20,
  },
  subHeadingTxt: {
    color: Variables.Colors.white,
    fontSize: 12,
    lineHeight: 20,
    marginBottom: 10,
  },
  contentCenter: {
    alignItems: "center",
    justifyContent: "center",
  },
  numView: {
    width: "90%",
    borderWidth: 1,
    alignSelf: "center",
    justifyContent: "center",
    height: 50,
    borderRadius: 12,
    backgroundColor: Variables.Colors.greyBg,
    marginTop: 15,
    borderColor: Variables.Colors.greyBg,
    paddingLeft: 5,
  },
  inputTxt: {
    padding: -1,
    color: "white",
    marginBottom: -3,
  },
  uriImage: {
    height: Variables.Measures.fontSize * 5.5,
    width: Variables.Measures.fontSize * 6,
  },
  placeholderImage: {
    resizeMode: "contain",
    height: Variables.Measures.fontSize * 5,
  },
  imageOrangeView: {
    backgroundColor: Variables.Colors.yellow,
    height: 20,
    width: 20,
    position: "absolute",
    bottom: 5,
    right: Variables.Measures.width / 2.83,
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonView: {
    height: Variables.Measures.height / 3.7,
    justifyContent: "flex-end",
  },
  errorView: {
    width: "88%",
    alignSelf: "center",
    height: 30,
    marginTop: 5,
  },
  errorMes: {
    color: Variables.Colors.yellow,
    fontSize: Variables.Measures.fontSize / 1.4,
  },
  imageView: {
    width: "95%",
    height: Variables.Measures.width / 1.9,
    alignSelf: "center",
  },
});

export default Address;

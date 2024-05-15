import React, { useState, useRef, useEffect } from "react";
import { CommonStyles, FontStyle, Images, Variables } from "../Theme";
import {
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  Text,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";

import ButtonView from "../components/ButtonView";

import Header from "../components/Header";
import BackSvg from "../assets/Images/BackArrow.svg";
import InputField from "../components/InputField";
import { useDispatch, useSelector } from "react-redux";

import { Dropdown } from "react-native-element-dropdown";
import { ReducerStateProps } from "./Inbox/InterfaceProps";
import _ from "lodash";
import { carBrandListStart } from "../actions/carOwnerActions";
import AsyncStorageHelper from "../components/AsyncStorageHelper";
import {
  keyboardVerticalOffsetValue,
  toastConst,
  ToastVisibility,
} from "../constants/constants";
import { Colors } from "../Theme/variables";
import ToastMessage from "../components/ToastMessage";

interface CreateProfileProps {
  onClick: (val: number) => void;
}

const AboutCar: React.FC<CreateProfileProps> = ({ onClick }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const streetRef = useRef(null);
  const carNameRef = useRef(null);

  const [street, setStreet] = useState(null);
  const [carName, setCarName] = useState(null);
  const [description, setDescription] = useState(null);
  // const [make, setMake] = useState(null);
  const [transmission, setTransmission] = useState(null);
  const [vehicleType, setVehicleType] = useState(null);
  const [marketValue, setMarketValue] = useState(null);
  const [numberPlate, setNumberPlate] = useState(null);

  const [streetError, setStreetError] = useState(0);
  const [makeError, setMakeError] = useState(0);
  const [vehicleTypeError, setVehicleTypeError] = useState(0);
  const [marketvalueError, setMaketValueError] = useState(0);
  const [numberPlateError, setNumberPlateError] = useState(0);
  const [descriptionError, setDescriptionError] = useState(0);
  const [carNameError, setCarNameError] = useState(0);

  const [isTransmissionVisible, setIsTransmissionVisible] = useState(false);

  const [carTypeListData, carBrandListData, isLoading] = useSelector(
    (state: ReducerStateProps) => [
      state.customer.carTypeListData,
      state.carOwner.carBrandListData,
      state.carOwner.isLoading,
    ]
  );

  const transmissionData = [
    { label: "Automatic", value: "Automatic" },
    { label: "Manual", value: "Manual" },
  ];

  useEffect(() => {
    dispatch(carBrandListStart());
  }, []);

  // const checkEmptyValues = (val: any) => {
  //   if (!val) {
  //     setEmptyField(0);
  //   } else {
  //     setEmptyField(1);
  //   }
  // };

  const [year, setYear] = useState(null);
  const [make, setMake] = useState(null);
  const [modal, setModal] = useState(null);

  const [data, setData] = useState({});

  const yearData = [
    { label: "2023", value: "2023" },
    { label: "2022", value: "2022" },
    { label: "2021", value: "2021" },
    { label: "2020", value: "2020" },
    { label: "2019", value: "2019" },
    { label: "2018", value: "2018" },
    { label: "2017", value: "2017" },
    { label: "2016", value: "2016" },
    { label: "2015", value: "2015" },
    { label: "2014", value: "2014" },
    { label: "2013", value: "2013" },
  ];

  const makeData = [
    { label: "Abarth", value: "Abarth" },
    { label: "Acura", value: "Acura" },
    { label: "Alfa-Romeo", value: "Alfa-Romeo" },
    { label: "Aston Martin", value: "Aston Martin" },
    { label: "Audi", value: "Audi" },
    { label: "Bentley", value: "Bentley" },
    { label: "BMW", value: "BMW" },
    { label: "Buick", value: "Buick" },
    { label: "Byd", value: "Byd" },
    { label: "Cadillac", value: "Cadillac" },
    { label: "Caterham", value: "Caterham" },
  ];

  const modalData = [
    { label: "A1", value: "A1" },
    { label: "A3", value: "A3" },
    { label: "A4 allroad", value: "A4 allroad" },
    { label: "A4 Avant", value: "A4 Avant" },
    { label: "A5", value: "A5" },
    { label: "A5 carriolot", value: "A5 carriolot" },
    { label: "A5 Sportsback", value: "A5 Sportsback" },
    { label: "A6 Allroad", value: "A6 Allroad" },
    { label: "A6 Avant", value: "A6 Avant" },
    { label: "A6 saloon", value: "A6 saloon" },
    { label: "A7", value: "A7" },
  ];

  const storeData = async () => {
    if (!carName) {
      setCarNameError(2);
    }
    if (!description) {
      setDescriptionError(2);
    }
    if (!transmission) {
      ToastMessage.set(toastConst.errorToast, "Please select car transmission");
    }
    if (!vehicleType) {
      ToastMessage.set(toastConst.errorToast, "Please select vehicle type");
    }
    if (!marketValue) {
      setMaketValueError(2);
    }
    if (!numberPlate) {
      setNumberPlateError(2);
    }
    if (!year) {
      ToastMessage.set(toastConst.errorToast, "Please select year");
    }
    if (!make) {
      ToastMessage.set(toastConst.errorToast, "Please select make");
    }
    if (!modal) {
      ToastMessage.set(toastConst.errorToast, "Please select car modal");
    }
    if (
      carName &&
      description &&
      transmission &&
      vehicleType &&
      marketValue &&
      numberPlate &&
      year &&
      make &&
      modal
    ) {
      const newData = {
        carName: carName,
        description: description,
        transmission: transmission,
        vehicleType: vehicleType,
        marketValue: marketValue,
        numberPlate: numberPlate,
        year: year,
        make: make,
        modal: modal,
        carBrand: carBrandListData?.items[0]?.id,
      };
      await AsyncStorageHelper.set("myData", newData);
      setData(newData);
      onClick(23);
    } else {
      ToastMessage.set("Required fields are missing", toastConst.errorToast);
    }
  };

  return (
    <SafeAreaView style={CommonStyles.safeAreaStyle}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.darkBlack} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={keyboardVerticalOffsetValue}
        style={{ flex: 1 }}
      >
        <ScrollView style={{ flex: 1 }}>
          <Header
            leftSvg={<BackSvg height={25} width={25} />}
            onLeftPress={() => onClick(9)}
          />
          <Image source={Images.userImg9} style={styles.imageView} />
          <Text style={[styles.imageHeadingTxt, FontStyle.urbanistBold]}>
            Tell us about your Ryde
          </Text>
          <View style={styles.container}>
            <View style={{ height: 10 }} />
            {carName && (
              <Text style={[FontStyle.urbanistMedium, styles.inputTitleTxt]}>
                What car do you have?
              </Text>
            )}

            <View style={{ width: "90%", alignSelf: "center", marginTop: 15 }}>
              <InputField
                placeholder="Car name"
                placeholderTextColor={Variables.Colors.inputTxtColor}
                value={carName}
                onChangeText={(val: string) => {
                  setCarName(val);
                  if (val.length >= 1) {
                    setCarNameError(1);
                  } else {
                    setCarNameError(0);
                  }
                }}
                onSubmitEditing={() => {}}
                emptyField={carNameError}
                labelTxt={carNameError === 1 && "Car name"}
              />
            </View>

            <View style={{ width: "90%", alignSelf: "center", marginTop: 15 }}>
              <InputField
                placeholder="Car Description"
                placeholderTextColor={Variables.Colors.inputTxtColor}
                value={description}
                onChangeText={(val: string) => {
                  setDescription(val);
                  if (val.length >= 1) {
                    setDescriptionError(1);
                  } else {
                    setDescriptionError(0);
                  }
                }}
                onSubmitEditing={() => {}}
                emptyField={descriptionError}
                labelTxt={descriptionError === 1 && "Car Description"}
              />
            </View>

            <View
              style={{
                marginTop: 22,
              }}
            />

            <Dropdown
              style={[styles.dropdown]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              data={transmissionData}
              maxHeight={150}
              labelField="label"
              valueField="value"
              placeholder={!isTransmissionVisible ? "Transmission" : "..."}
              value={transmission}
              onChange={(item) => {
                setTransmission(item.value);
                setIsTransmissionVisible(false);
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

            <View style={{ height: 20 }} />

            <Dropdown
              style={[styles.dropdown]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              data={_.get(carTypeListData, "items", null) || []}
              maxHeight={150}
              labelField="name"
              valueField="id"
              placeholder={"Vehicle Type"}
              value={vehicleType}
              onChange={(item) => {
                setVehicleType(item.id);
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

            <View style={{ width: "90%", alignSelf: "center", marginTop: 15 }}>
              <InputField
                placeholder="Per Day Price"
                placeholderTextColor={Variables.Colors.inputTxtColor}
                value={marketValue}
                onChangeText={(val: string) => {
                  setMarketValue(val);
                  if (val.length >= 1) {
                    setMaketValueError(1);
                  } else {
                    setMaketValueError(0);
                  }
                }}
                inputKeyboardType="number-pad"
                onSubmitEditing={() => {}}
                emptyField={marketvalueError}
                labelTxt={marketvalueError === 1 && "Per Day Price"}
                inputReturnKeyType={Platform.OS == "ios" ? "done" : "next"}
              />
            </View>
            <View style={{ width: "90%", alignSelf: "center", marginTop: 15 }}>
              <InputField
                placeholder="Number Plate"
                placeholderTextColor={Variables.Colors.inputTxtColor}
                value={numberPlate}
                onChangeText={(val: string) => {
                  setNumberPlate(val);
                  if (val.length >= 1) {
                    setNumberPlateError(1);
                  } else {
                    setNumberPlateError(0);
                  }
                }}
                onSubmitEditing={() => {}}
                emptyField={numberPlateError}
                labelTxt={numberPlateError === 1 && "Number Plate"}
              />
            </View>
            <View style={{ height: 20 }} />
            <Dropdown
              style={[styles.dropdown]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              data={yearData}
              maxHeight={200}
              labelField="label"
              valueField="value"
              placeholder={"Year"}
              value={year}
              onChange={(item) => {
                setYear(item.value);
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
            <View style={{ height: 20 }} />
            <Dropdown
              style={[styles.dropdown]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              data={makeData}
              maxHeight={150}
              labelField="label"
              valueField="value"
              placeholder={"Make"}
              value={make}
              onChange={(item) => {
                setMake(item.value);
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
            <View style={{ height: 20 }} />
            <Dropdown
              style={[styles.dropdown]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              data={modalData}
              maxHeight={150}
              labelField="label"
              valueField="value"
              placeholder={"Modal"}
              value={modal}
              onChange={(item) => {
                setModal(item.value);
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

            <View style={{ height: 30 }} />
            <ButtonView
              isLoading={isLoading}
              btnTxt={t("labelConst.nextTxt")}
              onBtnPress={() => {
                storeData();
              }}
              width={Variables.Measures.width / 1.12}
              backgroundColor={Variables.Colors.yellow}
              fontColor={Variables.Colors.darkBlack}
            />
            <View style={{ height: 30 }} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    backgroundColor: Variables.Colors.greyBg,
    borderRadius: 10,
    paddingLeft: 8,
    width: "90%",
    alignSelf: "center",
    paddingRight: 20,
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
  startTxt: {
    color: Variables.Colors.darkYellow,
  },
  carHeading: {
    color: Variables.Colors.white,
    fontSize: 14,
    width: "90%",
    alignSelf: "center",
    marginBottom: 20,
  },
  imageHeadingTxt: {
    position: "absolute",
    top: Variables.Measures.width / 1.8,
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
  carView: {
    width: "90%",
    backgroundColor: Variables.Colors.carGrey,
    height: 50,
    alignSelf: "center",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 10,
    color: Variables.Colors.white,
    flexDirection: "row",
  },
  carNameView: {
    width: "85%",
    color: "white",
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
  container: {
    backgroundColor: Variables.Colors.blackBg,
    marginTop: Variables.Measures.fontSize,
    flex: 1,
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
    width: "100%",
    height: Variables.Measures.width / 2,
    alignSelf: "center",
    marginTop: Variables.Measures.fontSize / 1.5,
  },
});

export default AboutCar;

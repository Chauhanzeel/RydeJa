import React, { useState, useRef, useEffect } from "react";
import { CommonStyles, FontStyle, Variables } from "../Theme";
import {
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  Text,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import { goBack, navigate } from "../navigators/RootNavigation";
import ButtonView from "../components/ButtonView";
import DropDownWhite from "../assets/Images/DropDownWhite.svg";
import InputField from "../components/InputField";
import Header from "../components/Header";
import dayjs from "dayjs";
import BackSvg from "../assets/Images/ProfileLeft.svg";
import CameraSvg from "../assets/Images/ScanCamera.svg";
import DateModal from "../components/DateModal";
import { Dropdown } from "react-native-element-dropdown";
import { useDispatch, useSelector } from "react-redux";
import {
  driverLicenseCreateStart,
  driverLicenseCreateSuccess,
  validationCheckStart,
} from "../actions/customerActions";
import moment from "moment";
import _ from "lodash";
import { GetApprovedProps, ReducerStateProps } from "./Inbox/InterfaceProps";
import { Colors } from "react-native/Libraries/NewAppScreen";
import BookingValidation from "../components/BookedValidation";
import { toastConst } from "../constants/constants";
import ToastMessage from "../components/ToastMessage";
import { Measures } from "../Theme/variables";

interface DropDownProps {
  label: string;
  value: string;
}

const DriverLicense: React.FC<GetApprovedProps> = ({ route }) => {
  const rentalCarObj = route.params?.rentalCarObj;

  const { t } = useTranslation();

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const middleNameRef = useRef(null);
  const licenseNoRef = useRef(null);

  const [date, setDate] = useState(null);
  const [expirationDate, setExpirationDate] = useState(null);

  const [country, setCountry] = useState(null);
  const [province, setProvince] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [middleName, setMiddleName] = useState(null);
  const [licenseNo, setLicenseNo] = useState(null);

  const [firstNameError, setFirstNameError] = useState(0);
  const [lastNameError, setLastNameError] = useState(0);
  const [middleNameError, setMiddleNameError] = useState(0);
  const [licenseNoError, setLicenseNoError] = useState(0);

  const [openDateModal, setOpenDateModal] = useState(false);
  const [openDatePicker, setopenDatePicker] = useState(false);

  const [openExpirationModal, setOpenExpirationModal] = useState(false);
  const [openExpirationPicker, setOpenExpirationPicker] = useState(false);

  const [
    isLoading,
    driverLicenseCreateData,
    parishListData,
    countryListData,
    validationObj,
  ] = useSelector((state: ReducerStateProps) => [
    state.customer.isLoading,
    state.customer.driverLicenseCreateData,
    state.customer.parishListData,
    state.user.countryListData,
    state.customer.validationObj,
  ]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (_.get(validationObj, "driverLicense", null)) {
      BookingValidation.Check(validationObj, rentalCarObj);
    }
  }, [validationObj]);

  useEffect(() => {
    if (_.get(driverLicenseCreateData, "success", null)) {
      dispatch(validationCheckStart(null));
      dispatch(driverLicenseCreateSuccess(null));
    }
  }, [driverLicenseCreateData]);

  const createLicense = () => {
    setFirstNameError(firstName ? 0 : 1);
    setLastNameError(lastName ? 0 : 1);
    setLicenseNoError(licenseNo ? 0 : 1);

    if (
      firstName &&
      lastName &&
      country &&
      province &&
      date &&
      expirationDate &&
      licenseNo
    ) {
      const param = {
        firstName: firstName,
        lastName: lastName,
        middleName: middleName,
        country: country,
        parish: province,
        licenseNumber: licenseNo,
        dateOfBirth: moment(date).format("YYYY-MM-DD"),
        expirationDate: moment(expirationDate).format("YYYY-MM-DD"),
      };
      dispatch(driverLicenseCreateStart(param));
    } else {
      ToastMessage.set(
        toastConst.errorToast,
        "Please fill out all required fields."
      );
    }
  };

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={Colors.blackBg} />
      <SafeAreaView style={CommonStyles.safeAreaStyle}>
        <Header
          centerText="Driver’s license"
          leftSvg={<BackSvg />}
          onLeftPress={() => goBack()}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardView}
        >
          <ScrollView nestedScrollEnabled>
            <View style={styles.headerView}>
              <Text
                style={[
                  FontStyle.urbanistMedium,
                  CommonStyles.descCommonTxt,
                  styles.subHeadingTxt,
                ]}
              >
                Since this is your first trip, you'll need to provide us with
                some information before you can check out.
              </Text>
            </View>
            {/* <View style={styles.cameraScanView}>
              <CameraSvg height={30} width={30} />
              <Text style={[FontStyle.urbanistRegular, styles.autoFillTxt]}>
                Scan to autofill
              </Text>
            </View> */}
            <View style={styles.container}>
              <View
                style={{
                  height: "100%",
                }}
              >
                {/* <View style={{ width: "89%", alignSelf: "center" }}>
                  <InputField
                    placeholder="Country"
                    labelTxt={country && "Country"}
                    value={country}
                    onChangeText={(val) => {
                      setCountry(val);
                      if (val.length >= 1) {
                        setCountryError(1);
                      } else {
                        setCountryError(0);
                      }
                    }}
                    emptyField={countryError}
                    placeholderTextColor={Variables.Colors.inputTxtColor}
                    inputref={countryNameRef}
                    onSubmitEditing={() => {
                      setCountryError(0);
                    }}
                    inputReturnKeyType="next"
                  />
                </View> */}

                {country && (
                  <Text
                    style={[
                      FontStyle.urbanistMedium,
                      styles.inputTitleTxt,
                      { marginTop: 20 },
                    ]}
                  >
                    Country
                  </Text>
                )}

                <Dropdown
                  style={[
                    styles.dropdown,
                    {
                      marginTop:
                        country && province
                          ? 10
                          : country || province
                          ? 20
                          : 20,
                    },
                  ]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  iconStyle={styles.iconStyle}
                  data={_.get(countryListData, "items", null) || []}
                  maxHeight={280}
                  labelField="name"
                  valueField={"id"}
                  placeholder={"Country"}
                  value={country}
                  onChange={(item) => {
                    setCountry(item.id);
                    // setIsFocus(false);
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
                  itemTextStyle={{ color: Variables.Colors.inputTxtColor }}
                  activeColor={Variables.Colors.greyBg}
                />

                {province && (
                  <Text
                    style={[
                      FontStyle.urbanistMedium,
                      styles.inputTitleTxt,
                      { marginTop: 20 },
                    ]}
                  >
                    Parish
                  </Text>
                )}
                <Dropdown
                  style={[
                    styles.dropdown,
                    {
                      marginTop:
                        country && province
                          ? 10
                          : country || province
                          ? 20
                          : 20,
                    },
                  ]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  iconStyle={styles.iconStyle}
                  data={_.get(parishListData, "items", null) || []}
                  maxHeight={280}
                  labelField="name"
                  valueField={"id"}
                  placeholder={"Province"}
                  value={province}
                  onChange={(item) => {
                    setProvince(item.id);
                    // setIsFocus(false);
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
                  itemTextStyle={{ color: Variables.Colors.inputTxtColor }}
                  activeColor={Variables.Colors.greyBg}
                />
                <View
                  style={{ width: "89%", alignSelf: "center", marginTop: 15 }}
                >
                  <InputField
                    placeholder="First name"
                    labelTxt={firstName && "First name"}
                    value={firstName}
                    onChangeText={(val) => {
                      setFirstName(val);
                      if (val.length >= 1) {
                        setFirstNameError(1);
                      } else {
                        setFirstNameError(0);
                      }
                    }}
                    emptyField={firstNameError}
                    placeholderTextColor={Variables.Colors.inputTxtColor}
                    inputref={firstNameRef}
                    onSubmitEditing={() => {
                      lastNameRef.current.focus(), setFirstNameError(0);
                    }}
                    inputReturnKeyType="next"
                  />
                </View>
                <View
                  style={{ width: "89%", alignSelf: "center", marginTop: 15 }}
                >
                  <InputField
                    placeholder="Last name"
                    labelTxt={lastName && "Last name"}
                    value={lastName}
                    onChangeText={(val) => {
                      setLastName(val);
                      if (val.length >= 1) {
                        setLastNameError(1);
                      } else {
                        setLastNameError(0);
                      }
                    }}
                    placeholderTextColor={Variables.Colors.inputTxtColor}
                    emptyField={lastNameError}
                    inputref={lastNameRef}
                    onSubmitEditing={() => {
                      middleNameRef.current.focus(), setLastNameError(0);
                    }}
                    inputReturnKeyType="next"
                  />
                </View>
                <View
                  style={{ width: "89%", alignSelf: "center", marginTop: 15 }}
                >
                  <InputField
                    placeholder="Middle name"
                    labelTxt={middleName && "Middle name"}
                    value={middleName}
                    onChangeText={(val) => {
                      setMiddleName(val);
                      if (val.length >= 1) {
                        setMiddleNameError(1);
                      } else {
                        setMiddleNameError(0);
                      }
                    }}
                    placeholderTextColor={Variables.Colors.inputTxtColor}
                    emptyField={middleNameError}
                    inputref={middleNameRef}
                    onSubmitEditing={() => {
                      licenseNoRef.current.focus(), setMiddleNameError(0);
                    }}
                    inputReturnKeyType="next"
                  />
                </View>
                <View
                  style={{ width: "89%", alignSelf: "center", marginTop: 15 }}
                >
                  <InputField
                    placeholder="License number"
                    labelTxt={licenseNo && "License number"}
                    value={licenseNo}
                    onChangeText={(val) => {
                      setLicenseNo(val);
                      if (val.length >= 1) {
                        setLicenseNoError(1);
                      } else {
                        setLicenseNoError(0);
                      }
                    }}
                    placeholderTextColor={Variables.Colors.inputTxtColor}
                    emptyField={licenseNoError}
                    inputref={licenseNoRef}
                    onSubmitEditing={() => {
                      setLicenseNoError(0);
                    }}
                    inputReturnKeyType="next"
                  />
                </View>
                <View
                  style={{
                    marginBottom: 25,
                  }}
                />
                {country && (
                  <Text
                    style={[FontStyle.urbanistMedium, styles.inputTitleTxt]}
                  >
                    Date of birth
                  </Text>
                )}
                <TouchableOpacity
                  style={styles.outerView}
                  onPress={() => setOpenDateModal(!openDateModal)}
                >
                  <View style={styles.leftInputView}>
                    <Text
                      style={[
                        FontStyle.urbanistMedium,
                        styles.inputLabel,
                        {
                          color: date
                            ? Variables.Colors.white
                            : Variables.Colors.inputTxtColor,
                        },
                      ]}
                    >
                      {date
                        ? dayjs(date).format("YYYY-MM-DD")
                        : "Date of birth"}
                    </Text>
                  </View>
                  <View
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
                    <DropDownWhite />
                  </View>
                </TouchableOpacity>
                <View
                  style={{
                    marginBottom: 25,
                  }}
                />
                <TouchableOpacity
                  style={[
                    styles.outerView,
                    { marginBottom: Variables.Measures.fontSize * 2 },
                  ]}
                  onPress={() => setOpenExpirationModal(!openExpirationModal)}
                >
                  <View style={styles.leftInputView}>
                    <Text
                      style={[
                        FontStyle.urbanistMedium,
                        styles.inputLabel,
                        {
                          color: expirationDate
                            ? Variables.Colors.white
                            : Variables.Colors.inputTxtColor,
                        },
                      ]}
                    >
                      {expirationDate
                        ? dayjs(expirationDate).format("YYYY-MM-DD")
                        : "Expiration date"}
                    </Text>
                  </View>
                  <View
                    style={{ alignItems: "center", justifyContent: "center" }}
                  >
                    <DropDownWhite />
                  </View>
                </TouchableOpacity>
                {/* <Text
                  style={[
                    FontStyle.urbanistMedium,
                    CommonStyles.descCommonTxt,
                    styles.descTxt,
                  ]}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut
                </Text> */}
                <ButtonView
                  btnTxt={t("labelConst.continueTxt")}
                  isLoading={isLoading}
                  onBtnPress={() => {
                    createLicense();
                  }}
                  width={Variables.Measures.width / 2.15}
                  backgroundColor={Variables.Colors.yellow}
                  fontColor={Variables.Colors.blackBg}
                />
                <View
                  style={{ marginTop: Variables.Measures.fontSize * 2.5 }}
                />
              </View>
            </View>
            <DateModal
              visibleModal={openDateModal}
              onOkPress={() => {
                setOpenDateModal(!openDateModal),
                  setopenDatePicker(!openDatePicker);
              }}
              onDatePress={() => setopenDatePicker(!openDatePicker)}
              onCancelPress={() => {
                setOpenDateModal(!openDateModal),
                  setopenDatePicker(!openDatePicker);
              }}
              cancelTxt={"Cancel"}
              okTxt={"Ok"}
              DateHeading="DATE OF BIRTH"
              datePlaceholder={
                date ? dayjs(date).format("YYYY-MM-DD") : "yyyy-mm-dd"
              }
              onDateChange={(data) => {
                setDate(data);
              }}
              openDatePicker={openDatePicker}
            />
            <DateModal
              visibleModal={openExpirationModal}
              onOkPress={() => {
                setOpenExpirationModal(!openExpirationModal),
                  setOpenExpirationPicker(!openExpirationPicker);
              }}
              onDatePress={() => setOpenExpirationPicker(!openExpirationPicker)}
              onCancelPress={() => {
                setOpenExpirationModal(!openExpirationModal),
                  setOpenExpirationPicker(!openExpirationPicker);
              }}
              cancelTxt={"Cancel"}
              okTxt={"Ok"}
              DateHeading="EXPIRATION DATE"
              datePlaceholder={
                expirationDate
                  ? dayjs(expirationDate).format("YYYY-MM-DD")
                  : "yyyy-mm-dd"
              }
              onDateChange={(data) => setExpirationDate(data)}
              openDatePicker={openExpirationPicker}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  placeholderStyle: {
    fontSize: 14,
    color: Variables.Colors.inputTxtColor,
    paddingLeft: 8,
  },
  keyboardView: {
    flex: 1,
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
  dropdown: {
    height: 50,
    backgroundColor: Variables.Colors.greyBg,
    borderRadius: 10,
    paddingLeft: 8,
    width: "90%",
    alignSelf: "center",
    paddingRight: 20,
  },
  leftInputView: {
    width: "88%",
    justifyContent: "center",
    paddingHorizontal: 15,
  },
  datePickerOuter: {
    position: "absolute",
    height: 290,
    bottom: 0,
    width: "100%",
  },
  descTxt: {
    color: Variables.Colors.inputTxtColor,
    alignSelf: "center",
    width: "87%",
    marginVertical: Variables.Measures.fontSize * 1.5,
  },
  outerView: {
    width: "89%",
    alignSelf: "center",
    backgroundColor: Variables.Colors.greyBg,
    borderRadius: 10,
    height: 50,
    flexDirection: "row",
  },
  inputLabel: {
    fontSize: 12,
  },
  inputTitleTxt: {
    color: Variables.Colors.inputTxtColor,
    fontSize: Measures.fontSize / 1.5,
    width: "88%",
    alignSelf: "center",
    marginBottom: 7,
  },
  headerView: {
    width: "88%",
    alignSelf: "center",
    marginTop: 10,
  },
  subHeadingTxt: {
    color: Variables.Colors.white,
    marginBottom: 10,
  },
  container: {
    backgroundColor: Variables.Colors.blackBg,
    marginTop: Variables.Measures.fontSize,
    flex: 1,
  },
  cameraScanView: {
    height: 55,
    backgroundColor: Variables.Colors.greyBg,
    width: "90%",
    alignSelf: "center",
    borderRadius: 12,
    borderWidth: 0.7,
    borderColor: Variables.Colors.inputTxtColor,
    alignItems: "center",
    justifyContent: "center",
    marginTop: Variables.Measures.fontSize / 1.5,
    flexDirection: "row",
  },
  autoFillTxt: {
    color: Variables.Colors.white,
    fontSize: 14,
    marginLeft: 10,
  },
});

export default DriverLicense;

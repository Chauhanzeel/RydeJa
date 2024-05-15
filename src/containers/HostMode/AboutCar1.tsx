import React, { useEffect, useRef, useState } from "react";
import { CommonStyles, FontStyle, Images, Variables } from "../../Theme";
import {
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useTranslation } from "react-i18next";
import { goBack, navigate } from "../../navigators/RootNavigation";

import ButtonView from "../../components/ButtonView";

import BackSvg from "../../assets/Images/BackArrow.svg";
import { Dropdown } from "react-native-element-dropdown";
import BlurViewUI from "../../components/BlurView";
import { useDispatch, useSelector } from "react-redux";
import { ReducerStateProps } from "../Inbox/InterfaceProps";
import {
  carBrandListStart,
  carOwnerUpdateCarStart,
} from "../../actions/carOwnerActions";
import _, { update } from "lodash";
import InputField from "../../components/InputField";
import { SafeAreaView } from "react-native-safe-area-context";
import { RouteProp } from "@react-navigation/native";
import { ToastVisibility, toastConst } from "../../constants/constants";
import AsyncStorageHelper from "../../components/AsyncStorageHelper";
import ToastMessage from "../../components/ToastMessage";
import { Measures } from "../../Theme/variables";

interface CreateProfileProps {
  route?: RouteProp<any, any>;
}

const AboutCar1: React.FC<CreateProfileProps> = ({ route }) => {
  const { t } = useTranslation();
  const details = route?.params?.details;

  const dispatch = useDispatch();
  const [
    carTypeListData,
    carBrandListData,
    isLoading,
    mapData,
    ownerCarViewData,
    carOwnerUpdateCarData,
  ] = useSelector((state: ReducerStateProps) => [
    state.customer.carTypeListData,
    state.carOwner.carBrandListData,
    state.carOwner.isLoading,
    state.auth.mapData,
    state.carOwner.ownerCarViewData,
    state.carOwner.carOwnerUpdateCarData,
  ]);

  const [btnChecked, setBtnChecked] = useState(false);
  const [make, setMake] = useState(_.get(ownerCarViewData, "make", null));
  const [modal, setModal] = useState(_.get(ownerCarViewData, "model", null));
  const [year, setYear] = useState(_.get(ownerCarViewData, "year", null));

  const [isTransmissionVisible, setIsTransmissionVisible] = useState(false);
  const [transmission, setTransmission] = useState(
    _.get(ownerCarViewData, "transmission", null)
  );
  const [vehicleType, setVehicleType] = useState(
    _.get(ownerCarViewData, "carType.id", null)
  );
  const [marketValue, setMarketValue] = useState(
    _.get(ownerCarViewData, "marketValue", null)
  );
  const [address, setAddress] = useState(
    _.get(ownerCarViewData, "carAddress.streetAddress", null)
  );
  const [carName, setCarName] = useState(_.get(ownerCarViewData, "name", null));
  const [brand, setBrand] = useState(
    _.get(ownerCarViewData, "carBrand.id", null)
  );
  const [desc, setDesc] = useState(
    _.get(ownerCarViewData, "description", null)
  );
  const [trim, setTrim] = useState(_.get(ownerCarViewData, "trim", null));

  const [transmissionError, setTransmissionError] = useState(0);
  const [vehicleTypeError, setVehicleTypeError] = useState(0);
  const [addressError, setAddressError] = useState(0);
  const [marketvalueError, setMaketValueError] = useState(0);
  const [carNameError, setCarNameError] = useState(0);
  const [descError, setDescError] = useState(0);
  const [makeError, setMakeError] = useState(0);
  const [trimError, setTrimError] = useState(0);
  const [modalError, setModalError] = useState(0);
  const [yearError, setYearError] = useState(0);
  const [brandError, setBrandError] = useState(null);
  const carNameRef = useRef(null);
  const descRef = useRef(null);
  const makeRef = useRef(null);
  const modalRef = useRef(null);
  const yearRef = useRef(null);
  const marketRef = useRef(null);
  const trimRef = useRef(null);

  const [updated, setUpdated] = useState(false);

  const transmissionData = [
    { label: "Automatic", value: "Automatic" },
    { label: "Manual", value: "Manual" },
  ];

  useEffect(() => {
    dispatch(carBrandListStart());
  }, []);

  useEffect(() => {
    if (route?.params?.address?.street) {
      setAddress(route?.params?.address?.street);
    }
  }, [route?.params?.address?.street]);

  const storeData = async () => {
    setAddressError(address ? 0 : 1);
    setCarNameError(carName ? 0 : 1);
    setDescError(desc ? 0 : 1);
    setBrandError(brand ? 0 : 1);
    setMakeError(make ? 0 : 1);
    setModalError(modal ? 0 : 1);
    setYearError(year ? 0 : 1);
    setTransmissionError(transmission ? 0 : 1);
    setVehicleTypeError(vehicleType ? 0 : 1);
    setMaketValueError(marketValue ? 0 : 1);
    setTrimError(trim ? 0 : 1);

    if (
      !address ||
      !carName ||
      !desc ||
      !make ||
      !brand ||
      !modal ||
      !year ||
      !trim ||
      !transmission ||
      !vehicleType ||
      !marketValue
    ) {
      ToastMessage.set(toastConst.errorToast, "Please fill all details");
    } else {
      await AsyncStorageHelper.set("carDetails", {
        address: address,
        carName: carName,
        desc: desc,
        make: make,
        modal: modal,
        year: year,
        trim: trim,
        transmission: transmission,
        vehicleType: vehicleType,
        marketValue: marketValue,
        addressData: route?.params?.address,
        carBrand: brand,
      });
      navigate("AboutCarInfo", { details: details ? details : false });
    }
  };

  useEffect(() => {
    if (_.get(carOwnerUpdateCarData, "success", null) && updated) {
      navigate("TabNavigations", { navigationfrom: 2 });
    }
  }, [carOwnerUpdateCarData]);

  const update = () => {
    setAddressError(address ? 0 : 1);
    setCarNameError(carName ? 0 : 1);
    setDescError(desc ? 0 : 1);
    setBrandError(brand ? 0 : 1);
    setMakeError(make ? 0 : 1);
    setModalError(modal ? 0 : 1);
    setYearError(year ? 0 : 1);
    setTransmissionError(transmission ? 0 : 1);
    setVehicleTypeError(vehicleType ? 0 : 1);
    setMaketValueError(marketValue ? 0 : 1);
    setTrimError(trim ? 0 : 1);

    if (
      !address ||
      !carName ||
      !desc ||
      !make ||
      !brand ||
      !modal ||
      !trim ||
      !year ||
      !transmission ||
      !vehicleType ||
      !marketValue
    ) {
      ToastMessage.set(toastConst.errorToast, "Please fill all details");
    } else {
      let formData = new FormData();

      // console.log(
      //   ">>",
      //   _.map(_.get(routeData, "carFeature", null), (res) => res.id)
      // );

      const params: any = {
        carType: vehicleType,
        carBrand: brand,
        name: carName,
        description: desc,
        model: modal,
        make: make,
        year: year,
        transmission: transmission,
        marketValue: marketValue,
        rentAmount: marketValue,
        numberPlate: _.get(ownerCarViewData, "numberPlate", null),
        country: _.get(ownerCarViewData, "carAddress.country.id", null),
        streetAddress: _.get(
          ownerCarViewData,
          "carAddress.streetAddress",
          null
        ),
        city: _.get(ownerCarViewData, "carAddress.city", null),
        latitude: _.get(ownerCarViewData, "carAddress.latitude", null),
        longitude: _.get(ownerCarViewData, "carAddress.longitude", null),
        parish: _.get(ownerCarViewData, "carAddress.parish.id", null),
        zipPostalCode: _.get(
          ownerCarViewData,
          "carAddress.zipPostalCode",
          null
        ),
        VINNumber: _.get(ownerCarViewData, "VINNumber", null),
        isModelYear1980Older: _.get(
          ownerCarViewData,
          "isModelYear1980Older",
          null
        ),
        carFeatures: _.map(
          _.get(ownerCarViewData, "carFeature", []),
          (res) => res.id
        ),
        carInformations: _.map(
          _.get(ownerCarViewData, "carInformation", null),
          (res) => res.id
        ),
        insuranceProtection: _.get(
          ownerCarViewData,
          "insuranceProtection.text",
          null
        ),
        financialGoal: _.get(ownerCarViewData, "financialGoal", null),
        carUseFrequency: _.get(ownerCarViewData, "carUseFrequency", null),
        advanceNotice: _.get(ownerCarViewData, "advanceNotice", null),
        maxTripDuration: _.get(ownerCarViewData, "maxTripDuration", null),
        odometer: _.get(ownerCarViewData, "odometer", null),
        trim: _.get(ownerCarViewData, "trim", null),
        style: _.get(ownerCarViewData, "style", null),
        isBrandedOrSalvage: _.get(
          ownerCarViewData,
          "isBrandedOrSalvage",
          false
        ),
        files: [],
        vehicleProtection: _.get(
          ownerCarViewData,
          "vehicleProtection",
          "Minimum"
        ),
      };

      _.forEach(params, (value, key) => {
        if (key == "files") {
          for (let index = 0; index < _.size(value); index++) {
            const element = value[index];
            formData.append(key + "[" + index + "]", element);
          }
        } else if (_.isArray(value)) {
          for (let index = 0; index < _.size(value); index++) {
            const element = value[index];
            formData.append(key + "[" + index + "]", [element]);
          }
        } else {
          formData.append(key, value);
        }
      });
      dispatch(
        carOwnerUpdateCarStart(formData, _.get(ownerCarViewData, "id", null))
      );
      setUpdated(true);
    }
  };
  const validateNum = (val: string) => {
    const sanitizedText = val?.replace(/[^0-9.]/g, "");
    setMarketValue(sanitizedText);
  };

  return (
    <View style={{ flex: 1, backgroundColor: Variables.Colors.darkBlack }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <StatusBar
          translucent
          backgroundColor="rgb(44,42,38)"
          barStyle="light-content"
        />
        <SafeAreaView style={styles.viewContainer}>
          <ScrollView style={styles.scrollViewStyle}>
            <View style={{ flex: 1 }}>
              <TouchableOpacity style={styles.headerView} onPress={goBack}>
                <BackSvg height={25} width={25} />
              </TouchableOpacity>
              <Image source={Images.carBg2} style={styles.imageView} />
              <Text
                style={[
                  styles.imageHeadingTxt,
                  FontStyle.urbanistBold,
                  CommonStyles.headingCommonTxt,
                ]}
              >
                Tell us about your Ryde
              </Text>
              <View style={styles.container}>
                <Text
                  style={[
                    FontStyle.urbanistSemiBold,
                    CommonStyles.smallCommonTxt,
                  ]}
                >
                  Were is your car located?
                </Text>

                <Text style={[FontStyle.urbanistSemiBold, styles.carTxt]}>
                  Enter car address
                </Text>

                <View
                  style={[
                    styles.addressView,
                    {
                      borderColor: addressError
                        ? Variables.Colors.yellow
                        : Variables.Colors.inputTxtColor,
                    },
                  ]}
                >
                  <Text
                    style={[FontStyle.urbanistSemiBold, styles.addressTxt]}
                    numberOfLines={1}
                  >
                    {address}
                  </Text>
                  {ownerCarViewData ? null : (
                    <TouchableOpacity
                      onPress={() => navigate("Address")}
                      style={styles.toAddress}
                    >
                      <Text style={[FontStyle.urbanistBold, styles.to1Address]}>
                        {address ? "Edit" : "Find"}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
                <Text
                  style={[
                    FontStyle.urbanistSemiBold,
                    CommonStyles.smallCommonTxt,
                    { marginTop: 7 },
                  ]}
                >
                  What car do you have?
                </Text>

                {/* <View
                  style={[
                    carNameError === 0
                      ? styles.inputView
                      : carNameError === 2
                      ? styles.errorInputField
                      : styles.emptyInputField,
                    ,
                    styles.carTextView,
                  ]}
                >
                  {/* <Text
                    style={[
                      FontStyle.urbanistSemiBold,
                      {
                        fontSize: 14,
                        color: Variables.Colors.white,
                        width: "80%",
                        paddingLeft: Variables.MetricsSizes.small,
                      },
                    ]}
                  ></Text> */}

                {/* <TextInput
                    style={[styles.tiView]}
                    value={carName}
                    placeholder="Car Name"
                    placeholderTextColor={Variables.Colors.inputTxtColor}
                    onChangeText={(val: string) => {
                      setCarName(val);
                      if (val.length >= 1) {
                        setCarNameError(1);
                      } else {
                        setCarNameError(0);
                      }
                    }}
                    onSubmitEditing={() => {
                      descRef.current.focus();
                      setCarNameError(0);
                    }}
                    ref={carNameRef}
                    returnKeyType={"next"}
                    keyboardType={"default"}
                  /> */}
                {/* <TouchableOpacity
                    onPress={() => navigate("Car")}
                    style={{
                      width: "20%",
                      paddingRight: Variables.MetricsSizes.small,
                    }}
                  >
                    <Text
                      style={[
                        FontStyle.urbanistBold,
                        {
                          fontSize: 12,
                          color: Variables.Colors.yellow,
                          textAlign: "right",
                        },
                      ]}
                    >
                      START
                    </Text>
                  </TouchableOpacity> */}

                <View style={styles.makeView}>
                  <InputField
                    inputref={makeRef}
                    placeholder="Make"
                    placeholderTextColor={Variables.Colors.inputTxtColor}
                    value={make}
                    onChangeText={(val: string) => {
                      setMake(val);
                      if (val.length >= 1) {
                        setMakeError(1);
                      } else {
                        setMakeError(0);
                      }
                    }}
                    onSubmitEditing={() => {
                      modalRef.current.focus();
                      setMakeError(0);
                    }}
                    emptyField={makeError}
                    inputReturnKeyType={"next"}
                    labelTxt={_.size(make) >= 1 && "Make"}
                  />
                </View>

                <View style={styles.makeView}>
                  <InputField
                    inputref={modalRef}
                    placeholder="Model"
                    placeholderTextColor={Variables.Colors.inputTxtColor}
                    value={modal}
                    onChangeText={(val: string) => {
                      setModal(val);
                      if (val.length >= 1) {
                        setModalError(1);
                      } else {
                        setModalError(0);
                      }
                    }}
                    onSubmitEditing={() => {
                      trimRef.current.focus();
                      setModalError(0);
                    }}
                    emptyField={modalError}
                    inputReturnKeyType={"next"}
                    labelTxt={_.size(modal) >= 1 && "Model"}
                  />
                </View>

                <View style={styles.makeView}>
                  <InputField
                    inputref={trimRef}
                    placeholder="Trim"
                    placeholderTextColor={Variables.Colors.inputTxtColor}
                    value={trim}
                    onChangeText={(val: string) => {
                      setTrim(val);
                      if (val.length >= 1) {
                        setTrimError(1);
                      } else {
                        setTrimError(0);
                      }
                    }}
                    onSubmitEditing={() => {
                      descRef.current.focus();
                      setTrimError(0);
                    }}
                    emptyField={trimError}
                    inputReturnKeyType={"next"}
                    labelTxt={_.size(trim) >= 1 && "Trim"}
                  />
                </View>

                <View style={styles.descView}>
                  <InputField
                    inputref={descRef}
                    placeholder="Description"
                    placeholderTextColor={Variables.Colors.inputTxtColor}
                    value={desc}
                    onChangeText={(val: string) => {
                      setDesc(val);
                      if (val.length >= 1) {
                        setDescError(1);
                      } else {
                        setDescError(0);
                      }
                    }}
                    onSubmitEditing={() => {
                      carNameRef.current.focus();
                      setDescError(0);
                    }}
                    inputReturnKeyType={"next"}
                    emptyField={descError}
                    labelTxt={_.size(desc) >= 1 && "Description"}
                  />
                </View>

                <View style={styles.descView}>
                  <InputField
                    inputref={carNameRef}
                    placeholder="Car Name"
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
                    onSubmitEditing={() => {
                      yearRef.current.focus();
                      setCarNameError(0);
                    }}
                    inputReturnKeyType={"next"}
                    emptyField={carNameError}
                    labelTxt={_.size(carName) >= 1 && "Car Name"}
                  />
                </View>

                <View style={styles.makeView}>
                  <InputField
                    inputref={yearRef}
                    placeholder="Year"
                    placeholderTextColor={Variables.Colors.inputTxtColor}
                    value={year}
                    onChangeText={(val: string) => {
                      setYear(val);
                      if (val.length >= 1) {
                        setYearError(1);
                      } else {
                        setYearError(0);
                      }
                    }}
                    onSubmitEditing={() => {
                      marketRef.current.focus();
                      setYearError(0);
                    }}
                    emptyField={yearError}
                    inputReturnKeyType={Platform.OS == "ios" ? "done" : "next"}
                    labelTxt={_.size(year) >= 1 && "Year"}
                    inputKeyboardType="number-pad"
                    maxLength={4}
                  />
                </View>

                <Dropdown
                  style={[
                    styles.dropdown,
                    {
                      borderColor: brandError
                        ? Variables.Colors.yellow
                        : Variables.Colors.greyBg,
                      borderWidth: brandError ? 1 : 0,
                    },
                  ]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  data={_.get(carBrandListData, "items", null) || []}
                  maxHeight={150}
                  labelField="name"
                  valueField="id"
                  placeholder={"Brand"}
                  value={brand}
                  onChange={(item) => {
                    setBrand(item.id);
                    setBrandError(0);
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

                <Dropdown
                  style={[
                    styles.dropdown,
                    {
                      borderColor: transmissionError
                        ? Variables.Colors.yellow
                        : Variables.Colors.greyBg,
                      borderWidth: transmissionError ? 1 : 0,
                    },
                  ]}
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
                    setTransmissionError(0);
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

                <Dropdown
                  style={[
                    styles.dropdown,

                    {
                      borderColor: vehicleTypeError
                        ? Variables.Colors.yellow
                        : Variables.Colors.greyBg,
                      borderWidth: vehicleTypeError ? 1 : 0,
                    },
                  ]}
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
                    setVehicleTypeError(0);
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

                <View
                  style={[
                    styles.makeView,
                    { marginBottom: Variables.FontSize.large },
                  ]}
                >
                  <InputField
                    placeholder="Per Day Price (USD)"
                    inputref={marketRef}
                    placeholderTextColor={Variables.Colors.inputTxtColor}
                    value={marketValue ? "$" + marketValue : marketValue}
                    onChangeText={(val: any) => {
                      validateNum(val);
                      if (val.length >= 1) {
                        setMaketValueError(1);
                      } else {
                        setMaketValueError(0);
                      }
                    }}
                    inputKeyboardType="number-pad"
                    onSubmitEditing={() => {
                      setMaketValueError(0);
                    }}
                    emptyField={marketvalueError}
                    labelTxt={_.size(marketValue) >= 1 && "Per Day Price (USD)"}
                    inputReturnKeyType={Platform.OS == "ios" ? "done" : "next"}
                  />
                </View>

                <ButtonView
                  isLoading={isLoading}
                  btnTxt={
                    ownerCarViewData && details
                      ? t("labelConst.nextTxt")
                      : ownerCarViewData
                      ? "Update"
                      : t("labelConst.nextTxt")
                  }
                  onBtnPress={() => {
                    ownerCarViewData && details
                      ? storeData()
                      : ownerCarViewData
                      ? update()
                      : storeData();
                  }}
                  width={Variables.Measures.width / 1.12}
                  backgroundColor={Variables.Colors.yellow}
                  fontColor={Variables.Colors.darkBlack}
                />
                <View style={{ height: 40 }} />
              </View>
            </View>
          </ScrollView>
          <BlurViewUI Type="dark" />
        </SafeAreaView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  makeView: {
    width: "100%",
    alignSelf: "center",
    marginTop: 20,
  },
  descView: {
    width: "100%",
    alignSelf: "center",
    marginTop: 20,
  },
  tiView: {
    width: "100%",
    color: Variables.Colors.white,
    fontSize: 14,
  },
  carTextView: {
    width: "100%",
    height: Variables.MetricsSizes.small * 5,
    marginTop: Variables.MetricsSizes.small * 1.5,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Variables.Colors.greyBg,
  },
  whatCarTxt: {
    fontSize: 14,
    color: Variables.Colors.white,
    marginTop: Variables.FontSize.regular,
  },
  to1Address: {
    fontSize: 14,
    color: Variables.Colors.yellow,
    textAlign: "right",
    letterSpacing: 0.15,
  },
  toAddress: {
    width: "20%",
    paddingRight: Variables.MetricsSizes.small,
    height: "100%",
    borderTopRightRadius: 12,
    borderBottomRightRadius: 12,
    justifyContent: "center",
  },
  addressTxt: {
    fontSize: 14,
    color: Variables.Colors.white,
    width: "80%",
    paddingLeft: Variables.MetricsSizes.small,
    textAlignVertical: "center",
  },
  addressView: {
    borderWidth: 1,
    height: Variables.MetricsSizes.small * 5,
    marginTop: 3,
    borderRadius: 12,
    backgroundColor: Variables.Colors.greyBg,
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  carTxt: {
    fontSize: 14,
    lineHeight: 25,
    color: Variables.Colors.yellow,
    marginTop: 24,
    marginLeft: 5,
  },
  locatedTxt: {
    fontSize: 16,
    lineHeight: 25,
    color: Variables.Colors.white,
  },
  errorInputField: {
    width: "100%",
    backgroundColor: Variables.Colors.carGrey,
    height: 50,
    alignSelf: "center",
    borderRadius: 10,
    paddingHorizontal: 10,
    borderColor: Variables.Colors.red,
    borderWidth: 1,
    fontSize: 12,

    color: Variables.Colors.white,
  },
  emptyInputField: {
    width: "100%",
    backgroundColor: Variables.Colors.carGrey,
    height: 50,
    alignSelf: "center",
    borderRadius: 10,
    paddingHorizontal: 10,
    borderColor: Variables.Colors.darkYellow,
    borderWidth: 1,
    fontSize: 12,

    color: Variables.Colors.white,
  },
  inputView: {
    width: "100%",
    backgroundColor: Variables.Colors.carGrey,
    height: 50,
    alignSelf: "center",
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 12,
    color: Variables.Colors.white,
  },
  placeholderStyle: {
    fontSize: 14,
    color: Variables.Colors.inputTxtColor,
    paddingLeft: 8,
  },
  selectedTextStyle: {
    fontSize: Measures.fontSize / 1.4,
    color: "white",
    paddingHorizontal: 10,
  },
  dropdown: {
    height: 50,
    backgroundColor: Variables.Colors.greyBg,
    borderRadius: 10,
    paddingLeft: 8,
    width: "100%",
    alignSelf: "center",
    paddingRight: 20,
    marginTop: 20,
    fontSize: Measures.fontSize / 1.4,
  },

  statusBarStyle: {
    height: 35,
    backgroundColor: Variables.Colors.statusBarColor,
  },
  viewContainer: {
    flex: 1,
  },
  headerView: {
    position: "absolute",
    top: Variables.Measures.fontSize,
    left: 20,
    zIndex: 1000,
  },
  scrollViewStyle: {
    flex: 1,
    height: "100%",
    backgroundColor: Variables.Colors.darkBlack,
  },
  inputPlaceHolder: {
    padding: 0,
    color: "white",
    fontFamily: "Urbanist-SemiBold",
    fontSize: 12,
  },
  inputStyle: {
    padding: 0,
    color: "white",
    fontFamily: "Urbanist-Regular",
    fontSize: 14,
  },
  uncheckView: {
    height: 20,
    width: 20,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: Variables.Colors.darkYellow,
    marginRight: 5,
  },
  editView: {
    alignItems: "flex-end",
    justifyContent: "center",
    flex: 1,
  },
  editTxt: {
    color: Variables.Colors.darkYellow,
    fontSize: 12,
    marginRight: 5,
  },
  infoView: {
    width: "93%",
    alignSelf: "center",
    marginBottom: 10,
    borderBottomColor: Variables.Colors.carsBorderGrey,
    borderBottomWidth: 1,
    paddingVertical: 5,
  },
  carHeading: {
    color: Variables.Colors.white,
    fontSize: 14,
  },
  imageHeadingTxt: {
    position: "absolute",
    top: Variables.Measures.width / 1.5,
    color: Variables.Colors.white,
    alignSelf: "center",
    fontSize: 24,
  },
  container: {
    width: "90%",
    flex: 1,
    marginTop: Variables.Measures.width / 1.25,
    alignSelf: "center",
  },
  imageView: {
    width: "100%",
    height: Variables.Measures.width * 1.2,
    alignSelf: "center",
    position: "absolute",
  },
});

export default AboutCar1;

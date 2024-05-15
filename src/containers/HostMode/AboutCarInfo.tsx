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
import { SafeAreaView } from "react-native-safe-area-context";

import { useTranslation } from "react-i18next";
import { goBack, navigate } from "../../navigators/RootNavigation";

import ButtonView from "../../components/ButtonView";

import BackSvg from "../../assets/Images/BackArrow.svg";
import CheckSvg from "../../assets/Images/Authentication/check.svg";
import BlurViewUI from "../../components/BlurView";
import { RouteProp } from "@react-navigation/native";
import AsyncStorageHelper from "../../components/AsyncStorageHelper";
import _ from "lodash";
import { ToastVisibility, toastConst } from "../../constants/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { parse } from "react-native-svg";
import ToastMessage from "../../components/ToastMessage";
import { log } from "console";
import { useSelector } from "react-redux";
import { ReducerStateProps } from "../Inbox/InterfaceProps";

interface CreateProfileProps {
  route?: RouteProp<any, any>;
}

const AboutCarInfo: React.FC<CreateProfileProps> = ({ route }) => {
  const { t } = useTranslation();
  const details = route?.params?.details;

  const [ownerCarViewData] = useSelector((state: ReducerStateProps) => [
    state.carOwner.ownerCarViewData,
  ]);

  const [btnChecked, setBtnChecked] = useState(
    _.get(ownerCarViewData, "isBrandedOrSalvage", false)
  );
  const [isOnYellowToggleSwitch, setIsOnYellowToggleSwitch] = useState(false);
  const [insuranceProtection, setInsuranceProtection] = useState("");
  const [vinError, setVinError] = useState(0);
  const [odometerError, setOdometerError] = useState(0);

  const [address, setAddress] = useState("");
  const [carName, setCarName] = useState("");
  const [transmission, setTransmission] = useState("");
  const [vin, setVin] = useState(null);
  const [odometer, setOdometer] = useState(
    _.get(ownerCarViewData, "odometer", "")
  );
  const [trim, setTrim] = useState("");
  const [style, setStyle] = useState(_.get(ownerCarViewData, "style", ""));
  const odometerRef = useRef(null);
  const trimRef = useRef(null);
  const styleRef = useRef(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let carData = await AsyncStorageHelper.get("carDetails");
    setAddress(_.get(carData, "address", null));
    setCarName(_.get(carData, "carName", null));
    setTransmission(_.get(carData, "transmission", null));
    setTrim(_.get(carData, "trim", null));
  };

  useEffect(() => {
    setVin(
      route?.params?.vin
        ? route?.params?.vin
        : _.get(ownerCarViewData, "VINNumber", null)
    );
    // setOdometer(details ? _.get(ownerCarViewData, "odometer", "") : "");
    // setBtnChecked(
    //   details ? _.get(ownerCarViewData, "isBrandedOrSalvage", false) : false
    // );
    setIsOnYellowToggleSwitch(
      route
        ? route?.params?.isOnYellowToggleSwitch
        : _.get(ownerCarViewData, "isModelYear1980Older", false)
    );
    setInsuranceProtection(
      route?.params?.insuranceProtection
        ? route?.params?.insuranceProtection
        : _.get(ownerCarViewData, "insuranceProtection", null)
    );
    // setTrim(details ? _.get(ownerCarViewData, "trim", "") : "");
    // setStyle(details ? _.get(ownerCarViewData, "style", "") : "");
  }, [route]);

  const storeData = async () => {
    setVinError(vin ? 0 : 1);
    setOdometerError(odometer ? 0 : 1);

    if (!address) {
      ToastMessage.set(toastConst.errorToast, "Address cannot be empty.");
    } else if (!carName) {
      ToastMessage.set(toastConst.errorToast, "Car name cannot be empty.");
    } else if (!vin) {
      ToastMessage.set(toastConst.errorToast, "Vin Number cannot be empty.");
    } else if (!odometer) {
      ToastMessage.set(
        toastConst.errorToast,
        "Please set the odometer of your car."
      );
    } else {
      const existingData = await AsyncStorage.getItem("carDetails");
      const parsedData = JSON.parse(existingData);
      parsedData.vin = vin;
      parsedData.odometer = odometer;
      parsedData.trim = trim;
      parsedData.style = style;
      parsedData.isBrandedOrSalvage = btnChecked;
      parsedData.isOnYellowToggleSwitch = isOnYellowToggleSwitch;
      parsedData.insuranceProtection = insuranceProtection;

      await AsyncStorage.setItem("carDetails", JSON.stringify(parsedData));

      navigate("EligibleCar");
    }
  };

  const d = async () => {
    setVinError(vin ? 0 : 1);
    setOdometerError(odometer ? 0 : 1);

    if (!address) {
      ToastMessage.set(toastConst.errorToast, "Address cannot be empty.");
    } else if (!carName) {
      ToastMessage.set(toastConst.errorToast, "Car name cannot be empty.");
    } else if (!vin) {
      ToastMessage.set(toastConst.errorToast, "Vin Number cannot be empty.");
    } else if (!odometer) {
      ToastMessage.set(
        toastConst.errorToast,
        "Please set the odometer of your car."
      );
    } else {
      const existingData = await AsyncStorage.getItem("carDetails");
      const parsedData = JSON.parse(existingData);
      parsedData.vin = vin;
      parsedData.odometer = odometer;
      parsedData.trim = trim;
      parsedData.style = style;
      parsedData.isBrandedOrSalvage = btnChecked;
      parsedData.isOnYellowToggleSwitch = isOnYellowToggleSwitch;
      parsedData.insuranceProtection = insuranceProtection;

      await AsyncStorage.setItem("carDetails", JSON.stringify(parsedData));
      navigate("CarFeatures");
    }
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
                <View
                  style={[
                    styles.infoView,
                    {
                      borderBottomColor: Variables.Colors.carsBorderGrey,
                    },
                  ]}
                >
                  <Text
                    style={[
                      FontStyle.urbanistSemiBold,
                      CommonStyles.descCommonTxt,
                      { color: Variables.Colors.inputTxtColor, lineHeight: 25 },
                    ]}
                  >
                    Where is your car located?
                  </Text>
                </View>
                <Text
                  style={[
                    FontStyle.urbanistSemiBold,
                    CommonStyles.descCommonTxt,
                    { lineHeight: 25 },
                  ]}
                >
                  {address}
                </Text>

                <View
                  style={[
                    styles.infoView,
                    {
                      borderBottomColor: Variables.Colors.carsBorderGrey,
                    },
                  ]}
                >
                  <Text
                    style={[
                      FontStyle.urbanistSemiBold,
                      CommonStyles.descCommonTxt,

                      {
                        color: Variables.Colors.inputTxtColor,
                        lineHeight: 25,
                      },
                    ]}
                  >
                    What car do you have?
                  </Text>
                </View>
                <View
                  style={[
                    styles.infoView,
                    {
                      borderBottomColor:
                        vinError == 1
                          ? Variables.Colors.yellow
                          : Variables.Colors.carsBorderGrey,
                    },
                  ]}
                >
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ width: "80%" }}>
                      <Text
                        style={[
                          FontStyle.urbanistRegular,
                          CommonStyles.descCommonTxt,
                          { paddingBottom: Variables.MetricsSizes.tiny },
                        ]}
                      >
                        {carName}
                      </Text>
                      <Text
                        style={[
                          FontStyle.urbanistSemiBold,
                          CommonStyles.descCommonTxt,
                          {
                            color: Variables.Colors.inputTxtColor,
                          },
                        ]}
                      >
                        {vin == null ? "VIN NUMBER" : vin}
                      </Text>
                      {/* <TextInput
                        placeholder="VIN NUMBER"
                        placeholderTextColor={Variables.Colors.inputTxtColor}
                        style={styles.inputPlaceHolder}
                      /> */}
                    </View>

                    <TouchableOpacity
                      style={styles.editView}
                      onPress={() => {
                        vin == null ? navigate("Car") : navigate("TypeVin");
                      }}
                    >
                      <Text
                        style={[
                          FontStyle.urbanistBold,
                          CommonStyles.descCommonTxt,
                          styles.editTxt,
                        ]}
                      >
                        {vin == null ? "START" : "EDIT"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={[
                    styles.infoView,
                    {
                      borderBottomColor:
                        odometerError == 1
                          ? Variables.Colors.yellow
                          : Variables.Colors.carsBorderGrey,
                    },
                  ]}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View style={{ width: "50%" }}>
                      <Text
                        style={[
                          FontStyle.urbanistRegular,
                          CommonStyles.descCommonTxt,
                        ]}
                      >
                        Odometer
                      </Text>
                    </View>
                    <View style={styles.editView}>
                      <TextInput
                        ref={odometerRef}
                        placeholder="20-40k kilometers"
                        placeholderTextColor={Variables.Colors.inputTxtColor}
                        style={[styles.inputStyle, { marginTop: 5 }]}
                        value={odometer}
                        textAlign={"right"}
                        onChangeText={(val) => setOdometer(val)}
                        onSubmitEditing={() => {
                          styleRef.current.focus();
                        }}
                        returnKeyType="next"
                      />
                    </View>
                  </View>
                </View>
                <View
                  style={[
                    styles.infoView,
                    {
                      borderBottomColor: Variables.Colors.carsBorderGrey,
                    },
                  ]}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View style={{ width: "50%" }}>
                      <Text
                        style={[
                          FontStyle.urbanistRegular,
                          CommonStyles.descCommonTxt,
                        ]}
                      >
                        Transmission
                      </Text>
                    </View>
                    <View style={styles.editView}>
                      {/* <TextInput
                        placeholder="Automatic"
                        placeholderTextColor={Variables.Colors.inputTxtColor}
                        style={[styles.inputStyle, { marginTop: 5 }]}
                      />  */}
                      <Text style={[styles.inputStyle, { marginTop: 5 }]}>
                        {transmission}
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={[
                    styles.infoView,
                    {
                      borderBottomColor: Variables.Colors.carsBorderGrey,
                    },
                  ]}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View style={{ width: "50%" }}>
                      <Text
                        style={[
                          FontStyle.urbanistRegular,
                          CommonStyles.descCommonTxt,
                        ]}
                      >
                        Trim
                      </Text>
                    </View>
                    <View style={styles.editView}>
                      <TextInput
                        editable={false}
                        ref={trimRef}
                        value={trim}
                        placeholder="Limited"
                        placeholderTextColor={Variables.Colors.inputTxtColor}
                        style={[styles.inputStyle, { marginTop: 5 }]}
                        textAlign={"right"}
                        onChangeText={(val) => setTrim(val)}
                        onSubmitEditing={() => {
                          styleRef.current.focus();
                        }}
                        returnKeyType="next"
                      />
                    </View>
                  </View>
                </View>
                <View
                  style={[
                    styles.infoView,
                    {
                      borderBottomColor: Variables.Colors.carsBorderGrey,
                    },
                  ]}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View style={{ width: "50%" }}>
                      <Text
                        style={[
                          FontStyle.urbanistRegular,
                          CommonStyles.descCommonTxt,
                        ]}
                      >
                        Style (optional)
                      </Text>
                    </View>
                    <View style={styles.editView}>
                      <TextInput
                        ref={styleRef}
                        placeholder="4dr Limited AWD"
                        placeholderTextColor={Variables.Colors.inputTxtColor}
                        style={[styles.inputStyle, { marginTop: 5 }]}
                        value={style}
                        textAlign={"right"}
                        onChangeText={(val) => setStyle(val)}
                        onSubmitEditing={() => {}}
                        returnKeyType="done"
                      />
                    </View>
                  </View>
                </View>
                <View
                  style={[
                    styles.infoView,
                    {
                      borderBottomColor: Variables.Colors.carsBorderGrey,
                    },
                  ]}
                >
                  <View style={{ flexDirection: "row" }}>
                    <View style={{ width: "60%" }}>
                      <Text
                        style={[
                          FontStyle.urbanistRegular,
                          CommonStyles.descCommonTxt,
                          { lineHeight: 20 },
                        ]}
                      >
                        My car has never had a branded or salvage title.
                      </Text>
                      {/* <Text
                        style={[
                          FontStyle.urbanistBold,
                          styles.editTxt,
                          { marginTop: 10 },
                        ]}
                      >
                        Learn more
                      </Text> */}
                    </View>
                    <TouchableOpacity
                      style={styles.editView}
                      onPress={() => setBtnChecked(!btnChecked)}
                    >
                      {btnChecked ? (
                        <CheckSvg />
                      ) : (
                        <View style={styles.uncheckView} />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{ marginTop: Variables.Measures.fontSize * 2 }} />
                <ButtonView
                  btnTxt={t("labelConst.nextTxt")}
                  onBtnPress={() => {
                    details || ownerCarViewData ? d() : storeData();
                  }}
                  width={Variables.Measures.width / 1.09}
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
  statusBarStyle: {
    height: 35,
    backgroundColor: Variables.Colors.statusBarColor,
  },
  viewContainer: {
    flex: 1,
  },
  headerView: {
    position: "absolute",
    top: Variables.Measures.fontSize + 20,
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
    marginRight: 5,
  },
  infoView: {
    width: "100%",
    alignSelf: "center",
    marginBottom: 10,
    // borderBottomColor: Variables.Colors.carsBorderGrey,
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
    width: "93%",
    fontSize: 24,
    textAlign: "center",
  },
  container: {
    width: "93%",
    flex: 1,
    marginTop: Variables.Measures.width / 1.2,
    alignSelf: "center",
  },
  imageView: {
    width: "100%",
    height: Variables.Measures.width * 1.2,
    alignSelf: "center",
    position: "absolute",
  },
});

export default AboutCarInfo;

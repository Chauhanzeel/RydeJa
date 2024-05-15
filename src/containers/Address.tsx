import React, { useState, useRef, useEffect } from "react";
import { CommonStyles, FontStyle, Images, Variables } from "../Theme";
import {
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import { goBack, navigate } from "../navigators/RootNavigation";

import ButtonView from "../components/ButtonView";
import Header from "../components/Header";

import DropDownWhite from "../assets/Images/DropDownWhite.svg";
import BackSvg from "../assets/Images/BackArrow.svg";
import InputField from "../components/InputField";

import { Dropdown } from "react-native-element-dropdown";
import { useDispatch, useSelector } from "react-redux";
import { ReducerStateProps } from "./Inbox/InterfaceProps";
import _, { zip } from "lodash";
import { getOr, toastConst } from "../constants/constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { RouteProp } from "@react-navigation/native";
import ToastMessage from "../components/ToastMessage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { mapDataSuccess } from "../actions/authActions";
import { carOwnerUpdateCarStart } from "../actions/carOwnerActions";
import { Measures } from "../Theme/variables";

interface AddressProps {
  route?: RouteProp<any, any>;
}

const Address: React.FC<AddressProps> = ({ route }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [
    isLoading,
    parishListData,
    countryListData,
    mapData,
    ownerCarViewData,
    carOwnerUpdateCarData,
  ] = useSelector((state: ReducerStateProps) => [
    state.carOwner.isLoading,
    state.customer.parishListData,
    state.user.countryListData,
    state.auth.mapData,
    state.carOwner.ownerCarViewData,
    state.carOwner.carOwnerUpdateCarData,
  ]);

  const streetRef = useRef(null);
  const cityRef = useRef(null);
  const zipCodeRef = useRef(null);

  const [country, setCountry] = useState(null);
  const [countryName, setCountryName] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState(null);
  const [province, setProvince] = useState(null);
  const [zipCode, setZipCode] = useState(null);

  const [countryError, setCountryError] = useState(0);
  const [streetError, setStreetError] = useState(0);
  const [cityError, setCityError] = useState(0);
  const [provinceError, setProvinceError] = useState(0);

  const [zipCodeError, setZipCodeError] = useState(0);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    if (_.get(carOwnerUpdateCarData, "success", null) && updated) {
      navigate("TabNavigations", { navigationfrom: 2 });
    }
  }, [carOwnerUpdateCarData]);

  useEffect(() => {
    if (ownerCarViewData) {
      dispatch(mapDataSuccess(null));
    }
  }, [ownerCarViewData]);

  useEffect(() => {
    const countrydata = _.find(
      countryListData?.items,
      (res) => res?.name == _.get(mapData, "address.country", null)
    );
    const statedata = _.find(
      parishListData?.items,
      (res) => res.name == _.get(mapData, "address.state", null)
    );
    setStreet(
      mapData
        ? _.get(mapData, "display_name", null)
        : _.get(ownerCarViewData, "carAddress.streetAddress", null)
    );
    setZipCode(
      mapData
        ? _.get(mapData, "address.postcode", null)
        : _.get(ownerCarViewData, "carAddress.zipPostalCode", null)
    );
    setCity(
      mapData
        ? getOr(
            mapData,
            "address.city",
            _.get(mapData, "address.state_district", null)?.replace(
              " District",
              ""
            )
          )
        : _.get(ownerCarViewData, "carAddress.city", null)
    );
    setCountry(
      mapData
        ? _.get(countrydata, "id", null)
        : _.get(ownerCarViewData, "carAddress.country.id", null)
    );
    setProvince(
      mapData
        ? _.get(statedata, "id", null)
        : _.get(ownerCarViewData, "carAddress.parish.id", null)
    );
  }, [mapData]);

  const storeData = async () => {
    setCountryError(country ? 0 : 1);
    setStreetError(street ? 0 : 1);
    setCityError(city ? 0 : 1);
    setProvinceError(province ? 0 : 1);
    setZipCodeError(zipCode ? 0 : 1);

    if (!country || !street || !city || !province || !zipCode) {
      ToastMessage.set(toastConst.errorToast, "Please fill all the details");
    } else {
      navigate("AboutCar1", {
        address: {
          country: country,
          street: street,
          city: city,
          province: province,
          zip: zipCode,
          latitude: _.get(mapData, "lat", null),
          longitude: _.get(mapData, "lon", null),
        },
      });
    }
  };

  const update = () => {
    setCountryError(country ? 0 : 1);
    setStreetError(street ? 0 : 1);
    setCityError(city ? 0 : 1);
    setProvinceError(province ? 0 : 1);
    setZipCodeError(zipCode ? 0 : 1);

    if (!country || !street || !city || !province || !zipCode) {
      ToastMessage.set(toastConst.errorToast, "Please fill all the details");
    } else {
      let formData = new FormData();

      // console.log(
      //   ">>",
      //   _.map(_.get(routeData, "carFeature", null), (res) => res.id)
      // );

      const params: any = {
        carType: _.get(ownerCarViewData, "carType.id", null),
        carBrand: _.get(ownerCarViewData, "carBrand.id", null),
        name: _.get(ownerCarViewData, "name", null),
        description: _.get(ownerCarViewData, "description", null),
        model: _.get(ownerCarViewData, "model", null),
        make: _.get(ownerCarViewData, "make", null),
        year: _.get(ownerCarViewData, "year", null),
        transmission: _.get(ownerCarViewData, "transmission", null),
        marketValue: _.get(ownerCarViewData, "marketValue", null),
        rentAmount: _.get(ownerCarViewData, "marketValue", null),
        numberPlate: _.get(ownerCarViewData, "numberPlate", null),
        country: country,
        streetAddress: street,
        city: city,
        latitude: _.get(mapData, "lat", null),
        longitude: _.get(mapData, "lon", null),
        parish: province,
        zipPostalCode: zipCode,
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

  return (
    <SafeAreaView style={CommonStyles.safeAreaStyle}>
      <StatusBar
        backgroundColor={Variables.Colors.darkBlack}
        barStyle="light-content"
      />

      <KeyboardAwareScrollView style={{ flex: 1 }}>
        <View style={styles.viewContainer}>
          <ScrollView alwaysBounceVertical={false}>
            <Header
              leftSvg={<BackSvg height={30} width={22} />}
              centerText="Your address"
              onLeftPress={() => {
                goBack();
                // dispatch(mapDataSuccess(null));
              }}
            />

            <Image source={Images.addressBg} style={styles.imageView} />
            <Text style={[styles.imageHeadingTxt, FontStyle.urbanistBold]}>
              Tell us about your Ryde
            </Text>
            <View style={{ marginTop: 20 }}>
              <View
                style={{
                  width: "90%",
                  alignSelf: "center",
                  marginBottom: 30,
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                <Text style={[FontStyle.urbanistSemiBold, styles.carHeading]}>
                  Where is your car located?
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    navigate("MapScreen");
                  }}
                >
                  <Text
                    style={[FontStyle.urbanistSemiBold, styles.carHeading1]}
                  >
                    Map
                  </Text>
                </TouchableOpacity>
              </View>
              {country && (
                <Text
                  style={[FontStyle.urbanistSemiBold, styles.inputTitleTxt]}
                >
                  Country
                </Text>
              )}
              <Dropdown
                style={[
                  styles.dropdown,
                  {
                    marginTop: country ? 10 : 0,
                    marginBottom: 20,
                    borderColor: countryError
                      ? Variables.Colors.yellow
                      : Variables.Colors.greyBg,
                    borderWidth: countryError ? 1 : 0,
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
                  setCountryName(item.name);
                  setCountryError(0);
                }}
                renderRightIcon={() => <DropDownWhite />}
                dropdownPosition="top"
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

              <View style={{ width: "90%", alignSelf: "center" }}>
                <InputField
                  placeholder="Street"
                  placeholderTextColor={Variables.Colors.inputTxtColor}
                  value={street}
                  onChangeText={(val: any) => {
                    setStreet(val);
                    if (val.length >= 1) {
                      setStreetError(1);
                    } else {
                      setStreetError(0);
                    }
                  }}
                  onSubmitEditing={() => {
                    cityRef.current.focus();
                    setStreetError(0);
                  }}
                  inputref={streetRef}
                  inputReturnKeyType="next"
                  labelTxt={street && "Street"}
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
                  onSubmitEditing={() => {
                    zipCodeRef.current.focus();
                    setCityError(0);
                  }}
                  inputref={cityRef}
                  inputReturnKeyType="next"
                  labelTxt={city && "City"}
                  emptyField={cityError}
                />
                <View style={{ marginTop: province ? 20 : 25 }} />
              </View>
              {province && (
                <Text style={[FontStyle.urbanistMedium, styles.inputTitleTxt]}>
                  Parish
                </Text>
              )}
              <Dropdown
                style={[
                  styles.dropdown,
                  {
                    borderColor: provinceError
                      ? Variables.Colors.yellow
                      : Variables.Colors.greyBg,
                    borderWidth: provinceError ? 1 : 0,
                  },
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={_.get(parishListData, "items", null) || []}
                maxHeight={150}
                labelField="name"
                valueField={"id"}
                placeholder={"Select Parish"}
                value={province}
                onChange={(item) => {
                  setProvince(item.id);
                  setProvinceError(0);
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
              <View style={{ height: 20 }} />
              <View style={{ width: "90%", alignSelf: "center" }}>
                <InputField
                  inputref={zipCodeRef}
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
                  labelTxt={zipCode && "Zip / PostalCode"}
                  onSubmitEditing={() => {
                    setZipCodeError(0);
                  }}
                />
              </View>
              <View
                style={{
                  marginTop: 20,
                }}
              />
              <ButtonView
                isLoading={isLoading}
                btnTxt={
                  (ownerCarViewData && mapData) || ownerCarViewData
                    ? "Update"
                    : t("labelConst.save")
                }
                onBtnPress={() => {
                  (ownerCarViewData && mapData) || ownerCarViewData
                    ? update()
                    : storeData();
                }}
                width={Variables.Measures.width / 1.12}
                backgroundColor={Variables.Colors.yellow}
                fontColor={Variables.Colors.darkBlack}
              />
              <View style={{ height: 20 }} />
            </View>
          </ScrollView>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerTxt: {
    color: Variables.Colors.white,
    fontSize: 24,
    marginLeft: 10,
  },
  viewContainer: {
    flex: 1,
    width: Variables.Measures.width,
    backgroundColor: Variables.Colors.darkBlack,
  },
  headerView: {
    // position: "absolute",
    // top: 0,
    height: 50,
    alignItems: "center",
    flexDirection: "row",
    zIndex: 1000,
    width: "92%",
    alignSelf: "center",
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
    paddingTop: 16,
  },
  dropdown: {
    height: 50,
    backgroundColor: Variables.Colors.greyBg,
    borderRadius: 10,
    paddingLeft: 8,
    width: "90%",
    alignSelf: "center",
    paddingRight: 20,
    marginTop: 10,
  },
  carHeading: {
    color: Variables.Colors.white,
    fontSize: 16,
  },
  carHeading1: {
    color: Variables.Colors.yellow,
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
    fontSize: Measures.fontSize / 1.3,
    width: "88%",
    alignSelf: "center",
  },
  headingTxt: {
    color: Variables.Colors.white,
    fontSize: 24,
    marginTop: 10,
    marginBottom: 20,
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
    width: "100%",
    height: Variables.Measures.width / 2,
    alignSelf: "center",
  },
});

export default Address;

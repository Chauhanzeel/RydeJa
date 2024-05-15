import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";

import { CommonStyles, FontStyle, Images, Variables } from "../../Theme";
import { goBack, navigate } from "../../navigators/RootNavigation";
import Check from "../../assets/Images/CheckYellow.svg";
import UnCheck from "../../assets/Images/Authentication/uncheck.svg";
import ButtonView from "../../components/ButtonView";
import LeftSvg from "../../assets/Images/Close.svg";
import WhiteDotSvg from "../../assets/Images/roundWhiteDot.svg";
import Header from "../../components/Header";
import { FilterModalProps } from "../types";
import _ from "lodash";
import { ToastVisibility, toastConst } from "../../constants/constants";
import AsyncStorageHelper from "../../components/AsyncStorageHelper";
import ToastMessage from "../../components/ToastMessage";
import { useDispatch, useSelector } from "react-redux";
import { ReducerStateProps } from "../Inbox/InterfaceProps";
import { carOwnerCreateCar } from "../../saga/carOwnerSaga";
import {
  carOwnerCreateCarStart,
  carOwnerUpdateCarStart,
} from "../../actions/carOwnerActions";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SubmitListing: React.FC<FilterModalProps> = ({ route }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [
    isLoading,
    carOwnerCreateCarData,
    ownerCarViewData,
    carOwnerUpdateCarData,
  ] = useSelector((state: ReducerStateProps) => [
    state.carOwner.isLoading,
    state.carOwner.carOwnerCreateCarData,
    state.carOwner.ownerCarViewData,
    state.carOwner.carOwnerUpdateCarData,
  ]);
  const [checked, setChecked] = useState(false);
  const [data, setData] = useState(null);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (
      (_.get(carOwnerCreateCarData, "success", null) && update) ||
      (_.get(carOwnerUpdateCarData, "success", null) && update)
    ) {
      navigate("TabNavigations", { navigationfrom: 2 });
      setUpdate(false);
      AsyncStorage.removeItem("carDetails");
    }
  }, [carOwnerCreateCarData, carOwnerUpdateCarData]);

  const getData = async () => {
    let carData = await AsyncStorageHelper.get("carDetails");
    setData(carData);
  };

  const submit = async () => {
    if (!data?.vehicleType) {
      navigate("TabNavigations", { navigationfrom: 2 });
      return;
    }

    let formData = new FormData();

    const params: any = {
      carType: data?.vehicleType,
      carBrand: data?.carBrand,
      name: data?.carName,
      description: data?.desc,
      model: data?.modal,
      make: data?.make,
      year: data?.year,
      transmission: data?.transmission,
      marketValue: data?.marketValue,
      rentAmount: data?.marketValue,
      numberPlate: data?.numberPlate,
      country: data?.addressData?.country,
      streetAddress: data?.address,
      city: data?.addressData?.city,
      latitude: data?.addressData?.latitude,
      longitude: data?.addressData?.longitude,
      parish: data?.parish,
      zipPostalCode: data?.addressData?.zip,
      VINNumber: data?.vin,
      isModelYear1980Older: data?.isOnYellowToggleSwitch,
      carFeatures: data?.carFeatures,
      carInformations: data?.carInformations,
      insuranceProtection: data?.insuranceProtection,
      financialGoal: data?.financialGoal,
      carUseFrequency: data?.carUseFrequency,
      advanceNotice: data?.advanceNotice,
      maxTripDuration: data?.maxTripDuration,
      odometer: data?.odometer,
      trim: data?.trim,
      style: data?.style,
      isBrandedOrSalvage: data?.isBrandedOrSalvage,
      files: data?.carImages,
      // vehicleProtection: "Minimum",

      // carType: "31f82cee-a2c4-11ed-a8fc-0242ac120002",
      // carBrand: "31f832e8-a2c4-11ed-a8fc-0242ac120002",
      // name: "ZZ",
      // description: "The Tesla Model 2 ",
      // model: "Allroad",
      // make: "Romeo",
      // year: "2020",
      // transmission: "Automatic",
      // marketValue: "500000",
      // rentAmount: "6000",
      // numberPlate: "GJ 5 ED 5916",
      // country: "851ffe05-eb74-4cc8-a3dd-03861e32e1a3",
      // streetAddress: "123 ornato",
      // city: "cacanada",
      // latitude: 200036.65,
      // longitude: 200036.65,
      // parish: "0f0bf746-b0da-11ed-afa1-0242ac120002",
      // zipPostalCode: "394230",
      // VINNumber: "12365487920",
      // isModelYear1980Older: true,
      // carFeatures: [
      //   "ede71d8d-9ebf-4811-916f-ac19944cbad2",
      //   "d05133ea-26c7-11ee-be56-0242ac120002",
      // ],
      // carInformations: [
      //   "3606f9b4-a6ac-11ed-afa1-0242ac120002",
      //   "3606fb12-a6ac-11ed-afa1-0242ac120002",
      // ],
      // insuranceProtection: "insuranace done",
      // financialGoal: "Expand an existing bussiness",
      // carUseFrequency: true,
      // advanceNotice: "12 Hours",
      // maxTripDuration: "1 week",
      // odometer: "20-40k kilometers",
      // trim: "Limite",
      // style: "4dr Limited",
      // isBrandedOrSalvage: true,
      // files: [
      //   {
      //     uri: "https://i.pinimg.com/736x/79/c8/11/79c81189fe4173c187a2399a22683c4e.jpg",
      //     name: "image.jpg",
      //     type: "image/jpg",
      //   },
      //   {
      //     uri: "https://i.pinimg.com/564x/7f/45/98/7f4598b8c930d1ca57870bef77a7fb0b.jpg",
      //     name: "image.jpg",
      //     type: "image/jpg",
      //   },
      // vehicleProtection: "Minimum",
      // ],
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
    if (_.get(ownerCarViewData, "id", null)) {
      dispatch(
        carOwnerUpdateCarStart(formData, _.get(ownerCarViewData, "id", null))
      );
    } else {
      dispatch(carOwnerCreateCarStart(formData));
    }

    setUpdate(true);
  };

  return (
    <SafeAreaView style={styles.safeAreaStyle}>
      <StatusBar translucent backgroundColor="transparent" />
      <Header leftSvg={<LeftSvg />} onLeftPress={goBack} />

      <ScrollView>
        <View style={styles.sv}>
          <Image
            resizeMode="contain"
            source={Images.safetyCar}
            style={styles.iv}
          />
          <Text
            style={[
              FontStyle.urbanistBold,
              CommonStyles.titleCommonTxt,
              styles.routingNumberInput,
            ]}
          >
            Submit your listing
          </Text>
          <Text
            style={[
              FontStyle.urbanistMedium,
              CommonStyles.descCommonTxt,
              styles.desc,
            ]}
          >
            You're ready to list your car on Turo! You'll be able to edit your
            listing, pricing, and availability anytime.
          </Text>

          <TouchableOpacity
            style={{
              marginTop: Variables.FontSize.regular,
              flexDirection: "row",
            }}
            onPress={() => setChecked(!checked)}
          >
            <View
              style={{
                width: "10%",
                marginTop: Variables.MetricsSizes.regular,
              }}
            >
              {checked ? <Check /> : <UnCheck />}
            </View>

            <Text
              style={[
                FontStyle.urbanistRegular,
                styles.desc,
                CommonStyles.descCommonTxt,
                { width: "90%" },
              ]}
            >
              By submitting your listing, you agree to the turo terms of service
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={styles.btnView}>
        <ButtonView
          isLoading={isLoading}
          btnTxt={ownerCarViewData && data?.vehicleType ? "Update" : "Submit"}
          disablebtn={isLoading || !checked}
          onBtnPress={() => {
            {
              checked
                ? submit()
                : ToastMessage.set(
                    toastConst.errorToast,
                    "Please accept terms to continue."
                  );
            }
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
  iv: {
    width: "80%",
    height: Variables.Measures.width / 2.1,
    alignSelf: "center",
  },
  sv: {
    width: "90%",
    alignSelf: "center",
    marginTop: Variables.MetricsSizes.small,
    marginBottom: Variables.FontSize.large,
  },
  safeAreaStyle: {
    flex: 1,
    backgroundColor: Variables.Colors.darkBlack,
  },
  btnView: {
    // bottom: 30,
    left: 0,
    right: 0,
    justifyContent: "center",
    height: 80,
  },
  routingNumberInput: {
    color: Variables.Colors.yellow,
    marginTop: Variables.FontSize.regular,
  },
  desc: {
    color: Variables.Colors.white,
    lineHeight: 22,
    marginTop: Variables.MetricsSizes.small,
  },
});
export default SubmitListing;

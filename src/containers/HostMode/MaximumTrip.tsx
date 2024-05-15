import React, { useState, useRef, useEffect } from "react";
import { CommonStyles, FontStyle, Images, Variables } from "../../Theme";
import {
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import { goBack, navigate } from "../../navigators/RootNavigation";

import ButtonView from "../../components/ButtonView";
import Header from "../../components/Header";

import BackSvg from "../../assets/Images/BackArrow.svg";
import TaxiSvg from "../../assets/Images/Taxi.svg";
import SelectedSvg from "../../assets/Images/SelectedGrey.svg";
import UnSelectedSvg from "../../assets/Images/SelectedYellow.svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastVisibility, toastConst } from "../../constants/constants";
import ToastMessage from "../../components/ToastMessage";
import { RouteProp } from "@react-navigation/native";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { ReducerStateProps } from "../Inbox/InterfaceProps";
import { carOwnerUpdateCarStart } from "../../actions/carOwnerActions";

interface CreateProfileProps {
  route?: RouteProp<any, any>;
}

const MaximumTrip: React.FC<CreateProfileProps> = ({ route }) => {
  const { t } = useTranslation();
  const [isLoading, ownerCarViewData, carOwnerUpdateCarData] = useSelector(
    (state: ReducerStateProps) => [
      state.carOwner.isLoading,
      state.carOwner.ownerCarViewData,
      state.carOwner.carOwnerUpdateCarData,
    ]
  );
  const dispatch = useDispatch();
  const [updated, setUpdated] = useState(false);
  const [optionId, setOptionId] = useState(null);
  const [reason, setReason] = useState(null);
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const existingData = await AsyncStorage.getItem("carDetails");
    setData(JSON.parse(existingData));
  };

  useEffect(() => {
    findFirstSelectedReason(_.get(ownerCarViewData, "maxTripDuration", null));
    if (_.get(ownerCarViewData, "maxTripDuration", null) == "14") {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, []);

  useEffect(() => {
    if (_.get(carOwnerUpdateCarData, "success", null) && updated) {
      navigate("TabNavigations", { navigationfrom: 2 });
    }
  }, [carOwnerUpdateCarData]);

  const findFirstSelectedReason = (answerText: any) => {
    const foundAnswer = options.find((item) => item.id == answerText);

    setReason(answerText);
    // setReason(foundAnswer.option);

    setOptionId(foundAnswer ? foundAnswer.id : null);
  };

  const options = [
    {
      id: 5,
      option: "5 days",
    },
    {
      id: 7,
      option: "1 week",
    },
    {
      id: 14,
      option: "2 weeks Recommended",
    },
    {
      id: 30,
      option: "1 month",
    },
  ];

  const storeData = async () => {
    if (!reason) {
      ToastMessage.set(toastConst.errorToast, "Please select any option.");
    } else {
      const existingData = await AsyncStorage.getItem("carDetails");
      const parsedData = JSON.parse(existingData);
      parsedData.maxTripDuration = optionId;
      await AsyncStorage.setItem("carDetails", JSON.stringify(parsedData));
      navigate("CarFeatures");
    }
  };

  const selectOption = (item: any) => {
    setOptionId(item.id);
    setReason(item.option);
    if (item.id == "14") {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const DisplayOptions = (item: any) => {
    const isSelected = item.id === optionId;

    return (
      <TouchableOpacity
        style={styles.answerView}
        onPress={() => selectOption(item)}
      >
        <View style={styles.leftAnswerView}>
          <Text style={[FontStyle.urbanistRegular, CommonStyles.descCommonTxt]}>
            {item.option}
          </Text>

          {isSelected ? (
            <UnSelectedSvg height={22} width={22} />
          ) : (
            <SelectedSvg height={22} width={22} />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const update = () => {
    if (!reason) {
      ToastMessage.set(toastConst.errorToast, "Please select any option.");
    } else {
      let formData = new FormData();

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
          false
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
          " insuranceProtection",
          null
        ),
        financialGoal: _.get(ownerCarViewData, "financialGoal", null),
        carUseFrequency: _.get(ownerCarViewData, "carUseFrequency", null),
        advanceNotice: route?.params?.advanceNotice,
        maxTripDuration: optionId,
        odometer: _.get(ownerCarViewData, "odometer", null),
        trim: _.get(ownerCarViewData, "trim", null),
        style: _.get(ownerCarViewData, "style", null),
        isBrandedOrSalvage: _.get(
          ownerCarViewData,
          "isBrandedOrSalvage",
          false
        ),
        files: [],
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
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={CommonStyles.safeAreaStyle}>
        <Header
          centerText="Maximum trip duration"
          leftSvg={<BackSvg height={22} width={22} />}
          onLeftPress={goBack}
        />
        <ScrollView
          style={{
            flex: 1,
          }}
        >
          <View style={styles.questionView}>
            <Text
              style={[FontStyle.urbanistMedium, CommonStyles.smallCommonTxt]}
            >
              What's the longest possible trip you'll accept?
            </Text>
            {visible && (
              <View style={styles.taxiView}>
                <View style={{ width: "20%" }}>
                  <TaxiSvg />
                </View>
                <View style={{ width: "70%" }}>
                  <Text
                    style={[
                      FontStyle.urbanistMedium,
                      CommonStyles.descCommonTxt,
                    ]}
                  >
                    2% of booked trips are longer than your current maximum of 2
                    weeks
                  </Text>
                </View>
              </View>
            )}
            <View style={styles.answerView} />
            <FlatList
              data={options}
              renderItem={({ item }): any => DisplayOptions(item)}
            />
          </View>
        </ScrollView>
        <View style={styles.btnView}>
          <ButtonView
            isLoading={isLoading}
            btnTxt={ownerCarViewData ? "Update" : t("labelConst.continueTxt")}
            onBtnPress={() => {
              ownerCarViewData ? update() : storeData();
            }}
            width={Variables.Measures.width / 1.09}
            backgroundColor={Variables.Colors.yellow}
            fontColor={Variables.Colors.darkBlack}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  questionView: {
    width: "90%",
    alignSelf: "center",
    paddingBottom: 80,
  },
  optionTxt: {
    fontSize: 14,
    color: Variables.Colors.white,
  },
  answerView: {
    width: "100%",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: Variables.Colors.inputTxtColor,
    paddingVertical: 10,
    justifyContent: "center",
  },
  leftAnswerView: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "space-between",
  },
  tripTxt: {
    color: Variables.Colors.white,
    fontSize: 16,
  },
  taxiTxt: {
    color: Variables.Colors.white,
    fontSize: 14,
    lineHeight: 24,
  },
  taxiView: {
    width: "100%",
    backgroundColor: Variables.Colors.carGrey,
    marginVertical: 20,
    borderRadius: 10,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 50,
  },
  btnView: {
    // position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    height: 80,
    paddingTop: 20,
  },
});

export default MaximumTrip;

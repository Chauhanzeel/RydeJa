import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Modal,
  FlatList,
} from "react-native";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import { CommonStyles, FontStyle, Variables } from "../../Theme";

import RBSheet from "react-native-raw-bottom-sheet";
import { goBack, navigate } from "../../navigators/RootNavigation";
import DashedLine from "react-native-dashed-line";

import Header from "../../components/Header";
import InputField from "../../components/InputField";
import ButtonView from "../../components/ButtonView";

import { provinceData } from "../MockData/CountryData";

import SelectedGreySvg from "../../assets/Images/SelectedGrey.svg";
import SelectedYellowSvg from "../../assets/Images/SelectedYellow.svg";
import PencilSvg from "../../assets/Images/PencilSvg.svg";
import BackSvg from "../../assets/Images/BackArrow.svg";
import AsyncStorageHelper from "../../components/AsyncStorageHelper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { parishListStart } from "../../actions/customerActions";
import { useDispatch, useSelector } from "react-redux";
import { ReducerStateProps } from "../Inbox/InterfaceProps";
import _ from "lodash";
import ToastMessage from "../../components/ToastMessage";
import { toastConst } from "../../constants/constants";
import { RouteProp } from "@react-navigation/native";
import { carOwnerUpdateCarStart } from "../../actions/carOwnerActions";
import { log } from "console";

interface CancelProps {
  route?: RouteProp<any, any>;
}

interface ParishesProps {
  id: number;
  value: string;
}

const LicensePlate: React.FC<CancelProps> = ({ route }) => {
  const { t } = useTranslation();
  const refRBSheet = useRef(null);
  const dispatch = useDispatch();
  const [isLoading, parishListData, ownerCarViewData, carOwnerUpdateCarData] =
    useSelector((state: ReducerStateProps) => [
      state.carOwner.isLoading,
      state.customer.parishListData,
      state.carOwner.ownerCarViewData,
      state.carOwner.carOwnerUpdateCarData,
    ]);
  const [data, setData] = useState(null);

  const [numPlate, setNumPlate] = useState(
    _.get(ownerCarViewData, "numberPlate", null)
  );
  const [numPlateError, setNumPlateError] = useState(0);
  const [parishModal, setParishModal] = useState(null);
  const [parish, setParish] = useState(_.get(ownerCarViewData, "parish", null));
  const [parishId, setParishId] = useState(
    _.get(ownerCarViewData, "parish.id", null)
  );
  const [parishError, setParishError] = useState(0);
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (_.get(carOwnerUpdateCarData, "success", null) && updated) {
      navigate("TabNavigations", { navigationfrom: 2 });
    }
  }, [carOwnerUpdateCarData]);

  const getData = async () => {
    const existingData = await AsyncStorage.getItem("carDetails");
    setData(JSON.parse(existingData));
  };
  const displayParish = (item: any) => {
    return (
      <TouchableOpacity
        style={styles.parishOuterView}
        onPress={() => {
          setParish(item);
          setParishId(_.get(item, "id", null));
          setTimeout(() => {
            setParishModal(!parishModal);
          });
        }}
      >
        {item.id === parish?.id ? <SelectedYellowSvg /> : <SelectedGreySvg />}
        <View>
          <Text style={[FontStyle.urbanistMedium, styles.parishTxt]}>
            {_.get(item, "name", null)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const storeData = async () => {
    setNumPlateError(numPlate ? 0 : 1);
    setParishError(parishId ? 0 : 1);
    if (!parishId) {
      ToastMessage.set(
        toastConst.errorToast,
        "Please fill out all required fields."
      );
    } else if (!numPlate) {
      ToastMessage.set(
        toastConst.errorToast,
        "Licence Plate number is required."
      );
    } else {
      const existingData = await AsyncStorage.getItem("carDetails");
      const parsedData = JSON.parse(existingData);
      parsedData.numberPlate = numPlate;
      parsedData.parish = parishId;
      await AsyncStorage.setItem("carDetails", JSON.stringify(parsedData));
      navigate("AddPhoto");
    }
  };

  const update = () => {
    setNumPlateError(numPlate ? 0 : 1);
    setParishError(parishId ? 0 : 1);
    if (!parishId) {
      ToastMessage.set(
        toastConst.errorToast,
        "Please fill out all required fields."
      );
    } else if (!numPlate) {
      ToastMessage.set(
        toastConst.errorToast,
        "Licence Plate number is required."
      );
    } else {
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
        numberPlate: numPlate,
        country: _.get(ownerCarViewData, "carAddress.country.id", null),
        streetAddress: data?.address,
        city: _.get(ownerCarViewData, "carAddress.city", null),
        latitude: _.get(ownerCarViewData, "carAddress.latitude", null),
        longitude: _.get(ownerCarViewData, "carAddress.longitude", null),
        parish: parishId,
        zipPostalCode: _.get(
          ownerCarViewData,
          "carAddress.zipPostalCode",
          null
        ),
        VINNumber: data?.vin,
        isModelYear1980Older: data?.isOnYellowToggleSwitch,
        carFeatures: data?.carFeatures,
        carInformations: data?.carInformations,
        insuranceProtection: data?.insuranceProtection?.text
          ? data?.insuranceProtection?.text
          : data?.insuranceProtection,
        financialGoal: _.get(ownerCarViewData, "financialGoal", null),
        carUseFrequency: _.get(ownerCarViewData, "carUseFrequency", null),
        advanceNotice: _.get(ownerCarViewData, "advanceNotice", null),
        maxTripDuration: _.get(ownerCarViewData, "maxTripDuration", null),
        odometer: data?.odometer,
        trim: data?.trim,
        style: data?.style,
        isBrandedOrSalvage: data?.isBrandedOrSalvage,
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
    <SafeAreaView style={styles.safeAreaStyle}>
      <StatusBar translucent backgroundColor="transparent" />
      <Header
        centerText="License plate"
        leftSvg={<BackSvg height={23} width={23} />}
        onLeftPress={goBack}
      />
      <ScrollView>
        <View style={{ width: "91%", alignSelf: "center" }}>
          <Text style={[FontStyle.urbanistMedium, CommonStyles.smallCommonTxt]}>
            Your license plate information won't be publicly visible
          </Text>
          <View style={styles.licenseView}>
            <Text
              style={[FontStyle.urbanistMedium, CommonStyles.smallCommonTxt]}
            >
              License plate number
            </Text>
            <TouchableOpacity onPress={() => refRBSheet.current.open()}>
              <Text
                style={[
                  FontStyle.urbanistSemiBold,
                  CommonStyles.smallCommonTxt,
                  styles.plateTxt,
                ]}
              >
                {numPlate ? numPlate : "Plate number"}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={[
              styles.pView,
              {
                borderColor:
                  parishError == 1
                    ? Variables.Colors.yellow
                    : Variables.Colors.greyBg,
              },
            ]}
          >
            <View style={styles.parishView}>
              <Text
                style={[FontStyle.urbanistBold, CommonStyles.descCommonTxt]}
              >
                Parish
              </Text>
              {parish?.name ? (
                <TouchableOpacity
                  onPress={() => setParishModal(!parishModal)}
                  style={{ flexDirection: "row", alignItems: "center" }}
                >
                  <Text
                    style={[
                      FontStyle.urbanistSemiBold,
                      styles.selectedParishTxt,
                      { marginRight: 20 },
                    ]}
                  >
                    {parish.name}
                  </Text>
                  <PencilSvg width={25} height={25} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => setParishModal(!parishModal)}>
                  <Text
                    style={[
                      FontStyle.urbanistSemiBold,
                      CommonStyles.descCommonTxt,
                      styles.plateTxt,
                    ]}
                  >
                    Add
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
        <RBSheet
          ref={refRBSheet}
          closeOnPressMask={true}
          closeOnPressBack={true}
          customStyles={{
            wrapper: {
              backgroundColor: Variables.Colors.blackAbsolute,
            },
            container: {
              backgroundColor: Variables.Colors.blackBg,
              borderTopLeftRadius: 25,
              borderTopRightRadius: 25,
              paddingTop: 20,
              height: 200,
            },
          }}
        >
          <View style={styles.innerView}>
            <InputField
              placeholderTextColor={Variables.Colors.inputTxtColor}
              value={numPlate}
              onChangeText={(val: string) => {
                setNumPlate(val);
                if (val.length >= 1) {
                  setNumPlateError(1);
                } else {
                  setNumPlateError(0);
                }
              }}
              emptyField={numPlateError}
              placeholder="Enter number plate"
              onSubmitEditing={() => {
                setNumPlateError(0), refRBSheet.current.close();
              }}
              inputReturnKeyType="done"
            />
            <View style={{ marginVertical: 30 }}>
              <ButtonView
                btnTxt={"Ok"}
                onBtnPress={() => {
                  refRBSheet.current.close();
                }}
                width={Variables.Measures.width / 1.09}
                backgroundColor={Variables.Colors.yellow}
                fontColor={Variables.Colors.darkBlack}
              />
            </View>
          </View>
        </RBSheet>
        <Modal
          animationType="slide"
          transparent={true}
          visible={parishModal}
          onRequestClose={() => {}}
        >
          <View style={styles.parentView}>
            <View style={styles.modalView}>
              <View style={{ marginTop: 30, marginBottom: 10 }}>
                <DashedLine
                  dashLength={3}
                  dashColor={Variables.Colors.borderGrey}
                />
              </View>
              <View>
                <FlatList
                  data={_.get(parishListData, "items", null) || []}
                  renderItem={({ item }) => displayParish(item)}
                  style={{
                    height: Variables.Measures.width / 1.2,
                  }}
                />
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
      <View style={{ position: "absolute", bottom: 30, right: 0, left: 0 }}>
        <ButtonView
          isLoading={isLoading}
          btnTxt={ownerCarViewData ? "Update" : "Continue"}
          onBtnPress={() => {
            ownerCarViewData ? update() : storeData();
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
  pView: {
    marginTop: Variables.Measures.fontSize,
    borderWidth: 1,
    borderRadius: 10,
  },
  parishOuterView: {
    flexDirection: "row",
    paddingVertical: 10,
    alignItems: "center",
  },
  selectedParishTxt: {
    color: Variables.Colors.inputTxtColor,
    FontSize: 12,
  },
  parishTxt: {
    color: Variables.Colors.white,
    fontSize: 14,
    marginLeft: 10,
  },
  parentView: {
    backgroundColor: "rgba(13, 13, 13, .8)",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    top: "37%",
  },
  modalView: {
    backgroundColor: Variables.Colors.carGrey,
    borderRadius: 15,
    width: "95%",
    alignSelf: "center",
    height: Variables.Measures.width,
    paddingHorizontal: 15,
  },
  innerView: {
    width: "90%",
    alignSelf: "center",
  },
  parishView: {
    height: 55,
    backgroundColor: Variables.Colors.carGrey,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  licenseView: {
    marginTop: Variables.Measures.fontSize * 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  safeAreaStyle: {
    flex: 1,
    backgroundColor: Variables.Colors.darkBlack,
  },
  licenseTxt: {
    color: Variables.Colors.white,
    fontSize: 16,
    lineHeight: 24,
  },
  plateTxt: {
    color: Variables.Colors.darkYellow,
  },
  parishLabelTxt: {
    color: Variables.Colors.white,
    fontSize: 14,
  },
});

export default LicensePlate;

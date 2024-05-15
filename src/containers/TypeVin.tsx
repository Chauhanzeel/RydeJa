import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  StatusBar,
  Platform,
} from "react-native";
import { FontStyle, Variables, CommonStyles, Layout, Images } from "../Theme";
import { useTranslation } from "react-i18next";

import ButtonView from "../components/ButtonView";
import ToggleSwitch from "toggle-switch-react-native";
import InputField from "../components/InputField";
import { ReducerStateProps } from "./Inbox/InterfaceProps";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorageHelper from "../components/AsyncStorageHelper";
import { toastConst, ToastVisibility } from "../constants/constants";
import {
  carOwnerCreateCarStart,
  carOwnerUpdateCarStart,
} from "../actions/carOwnerActions";
import { createRentalCar } from "../saga/customerSaga";
import _ from "lodash";
import Header from "../components/Header";
import BackSvg from "../assets/Images/BackArrow.svg";
import { goBack, navigate } from "../navigators/RootNavigation";
import { SafeAreaView } from "react-native-safe-area-context";
import ToastMessage from "../components/ToastMessage";
import { RouteProp } from "@react-navigation/native";
import { Dropdown } from "react-native-element-dropdown";

interface MapProps {
  // onClick: (val: number) => void;
  route?: RouteProp<any, any>;
}

const TypeVin: React.FC<MapProps> = ({ route }) =>
  // { onClick }
  {
    const [isloading, ownerCarViewData, carOwnerUpdateCarData] = useSelector(
      (state: ReducerStateProps) => [
        state.carOwner.isLoading,
        state.carOwner.ownerCarViewData,
        state.carOwner.carOwnerUpdateCarData,
      ]
    );

    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [updated, setUpdated] = useState(false);

    const [isOnYellowToggleSwitch, setIsOnYellowToggleSwitch] = useState(
      _.get(ownerCarViewData, "isModelYear1980Older", false)
    );
    const [emptyField, setEmptyField] = useState(0);
    const [emptyField1, setEmptyField1] = useState(0);
    const [vin, setVin] = useState(null);
    const [insuranceProtection, setInsuranceProtection] = useState(null);
    const [displayVinModal, setDisplayVinModal] = useState(false);
    const [insuranceProtectionError, setInsuranceProtectionError] = useState(0);

    useEffect(() => {
      if (ownerCarViewData) {
        setVin(_.get(ownerCarViewData, "VINNumber", null));
        setInsuranceProtection(
          _.get(ownerCarViewData, "insuranceProtection.text", null)
        );
      }
    }, []);

    useEffect(() => {
      if (_.get(carOwnerUpdateCarData, "success", null) && updated) {
        navigate("TabNavigations", { navigationfrom: 2 });
      }
    }, [carOwnerUpdateCarData]);

    const insuranceProtectionData = [
      {
        id: 1,
        value: "Yes",
      },
      {
        id: 2,
        value: "No",
      },
    ];

    const onToggle = (isOn: boolean) => {
      setIsOnYellowToggleSwitch(isOn);
    };

    const checkEmptyValues = (val: any) => {
      setVin(val);
      if (!val) {
        setEmptyField(0);
      } else {
        setEmptyField(1);
      }
    };
    const checkEmptyValues1 = (val: any) => {
      setInsuranceProtection(val);
      if (!val) {
        setEmptyField1(0);
      } else {
        setEmptyField1(1);
      }
    };

    const storeData = async () => {
      setEmptyField(vin ? 0 : 1);
      setEmptyField1(insuranceProtection ? 0 : 1);

      if (!vin || !insuranceProtection) {
        ToastMessage.set(toastConst.errorToast, "Please fill all details");
      } else {
        navigate("AboutCarInfo", {
          vin: vin,
          insuranceProtection: insuranceProtection,
          isOnYellowToggleSwitch: isOnYellowToggleSwitch,
        });
      }
    };

    return (
      <SafeAreaView style={CommonStyles.safeAreaStyle}>
        <StatusBar
          // translucent
          backgroundColor={Variables.Colors.blackBg}
          barStyle="light-content"
        />
        <Header
          leftSvg={<BackSvg height={25} width={25} />}
          onLeftPress={() =>
            // onClick(17)
            goBack()
          }
          centerText={"VIN Number"}
        />

        <ScrollView style={{ flex: 1 }}>
          <View style={styles.widthView}>
            {/* <View style={{ marginTop: Variables.Measures.fontSize * 4 }}>
            <Text style={[FontStyle.urbanistBold, styles.vinTxt]}>VIN</Text>
          </View> */}

            <View style={styles.rowOuterView}>
              <View
                style={{
                  marginTop: Variables.Measures.fontSize,
                  flexDirection: "row",
                }}
              >
                <View style={{ width: "87%" }}>
                  <Text
                    style={[
                      FontStyle.urbanistSemiBold,
                      CommonStyles.smallCommonTxt,
                    ]}
                  >
                    Your car should be 2020 or Newer
                  </Text>
                </View>
                <ToggleSwitch
                  onColor={Variables.Colors.inputTxtColor}
                  offColor={Variables.Colors.activeTab}
                  thumbOnStyle={styles.onThumbStyle}
                  thumbOffStyle={styles.offThumbStyle}
                  isOn={isOnYellowToggleSwitch}
                  onToggle={(value) => {
                    setIsOnYellowToggleSwitch(isOnYellowToggleSwitch);
                    onToggle(value);
                  }}
                />
              </View>
            </View>
            <View style={{ marginTop: Variables.Measures.fontSize }}>
              <InputField
                emptyField={emptyField}
                labelTxt={"VIN"}
                onChangeText={(val) => {
                  checkEmptyValues(val);
                }}
                placeholder={"01234"}
                value={vin}
                placeholderTextColor={Variables.Colors.inputTxtColor}
                onSubmitEditing={() => {
                  // setDisplayVinModal(true),
                  setEmptyField(0);
                }}
                inputReturnKeyType={"done"}
              />
            </View>

            <View>
              {/* <InputField
                emptyField={emptyField1}
                labelTxt={"Insurance Protection"}
                onChangeText={(val) => {
                  checkEmptyValues1(val);
                }}
                // placeholder={"Insurance Protection"}
                value={insuranceProtection}
                // placeholderTextColor={Variables.Colors.inputTxtColor}
                // inputKeyboardType="numeric"
                onSubmitEditing={() => {
                  setEmptyField1(0);
                }}
              /> */}
              {/* {insuranceProtection && ( */}
              <Text
                style={[
                  FontStyle.urbanistMedium,
                  CommonStyles.descCommonTxt,
                  styles.inputTitleTxt,
                ]}
              >
                Insurance Protection
              </Text>
              {/* )} */}
              <Dropdown
                style={[
                  styles.dropdown,
                  {
                    borderColor: insuranceProtectionError
                      ? Variables.Colors.yellow
                      : Variables.Colors.greyBg,
                    borderWidth: insuranceProtectionError ? 1 : 0,
                  },
                ]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                data={insuranceProtectionData}
                maxHeight={150}
                labelField="value"
                valueField="value"
                value={insuranceProtection}
                onChange={(item) => {
                  setInsuranceProtection(item.value);
                  setInsuranceProtectionError(0);
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
            </View>
          </View>
        </ScrollView>
        <View
          style={{
            width: "100%",
            marginVertical: 20,
          }}
        >
          <ButtonView
            btnTxt={"Submit"}
            isLoading={isloading}
            onBtnPress={() => {
              storeData();
            }}
            width={Variables.Measures.width / 1.12}
            backgroundColor={Variables.Colors.yellow}
            fontColor={Variables.Colors.darkBlack}
          />
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={displayVinModal}
        >
          <View style={styles.parentView}>
            <View style={styles.modalView}>
              <View style={styles.modalBorderView}>
                <Text style={[styles.modalText, FontStyle.urbanistBold]}>
                  VIN was not recognized
                </Text>
                <Text style={[FontStyle.urbanistMedium, styles.modalDescTxt]}>
                  Some cars have manual transmission. Are you able to drive a
                  stick shift?
                </Text>
              </View>
              <View style={styles.btnOuterView}>
                <TouchableOpacity
                  onPress={() => {
                    setDisplayVinModal(!displayVinModal);
                  }}
                  style={styles.continueBtnView}
                >
                  <Text style={[FontStyle.urbanistBold, styles.btnTxt]}>
                    YES
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    );
  };

const styles = StyleSheet.create({
  inputTitleTxt: {
    color: Variables.Colors.inputTxtColor,
    width: "98%",
    alignSelf: "center",
    marginTop: Variables.Measures.fontSize,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "white",
    paddingHorizontal: 10,
  },
  placeholderStyle: {
    fontSize: 14,
    color: Variables.Colors.inputTxtColor,
    paddingLeft: 8,
  },
  dropdown: {
    height: 50,
    backgroundColor: Variables.Colors.greyBg,
    borderRadius: 10,
    paddingLeft: 8,
    width: "100%",
    alignSelf: "center",
    paddingRight: 20,
    marginTop: 10,
  },
  modalBorderView: {
    paddingVertical: 35,
    width: "90%",
    alignSelf: "center",
  },
  continueBtnView: {
    alignItems: "center",
  },
  btnInnerView: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  btnOuterView: {
    width: "90%",
    height: 50,
    alignItems: "flex-end",
  },
  btnTxt: {
    color: Variables.Colors.darkYellow,
    fontSize: 11,
  },
  modalDescTxt: {
    color: Variables.Colors.white,
    fontSize: 14,
    lineHeight: 22,
    marginTop: 15,
  },
  parentView: {
    backgroundColor: "rgba(13, 13, 13, .8)",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  modalText: {
    color: Variables.Colors.white,
    fontSize: 20,
    lineHeight: 22,
  },
  modalView: {
    backgroundColor: Variables.Colors.carGrey,
    borderRadius: 8,
    width: "90%",
    alignSelf: "center",
    marginTop: Variables.Measures.fontSize * 5,
  },

  onThumbStyle: {
    backgroundColor: Variables.Colors.darkYellow,
    height: 22,
    width: 22,
    borderRadius: 10,
  },
  offThumbStyle: {
    backgroundColor: Variables.Colors.inputTxtColor,
    height: 22,
    width: 22,
    borderRadius: 10,
  },
  headingTxt: {
    color: Variables.Colors.white,
    fontSize: 22,
    width: "90%",
  },
  widthView: {
    width: "90%",
    alignSelf: "center",
    flex: 1,
  },
  vinTxt: {
    color: Variables.Colors.white,
    fontSize: 24,
  },
  rowOuterView: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 13,
  },
  editProfileTxt: {
    color: Variables.Colors.chatWhite,
    fontSize: 16,
  },
});

export default TypeVin;

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Platform,
  StatusBar,
} from "react-native";
import { FontStyle, Variables, Images, CommonStyles } from "../../Theme";
import { useTranslation } from "react-i18next";
import Header from "../../components/Header";

import BackSvg from "../../assets/Images/ProfileLeft.svg";
import UpdateDataModal from "../../components/UpdateDataModal";

import { useDispatch, useSelector } from "react-redux";
import {
  changeEmailStart,
  changeManualTransmissionStart,
} from "../../actions/userActions";
import { ReducerStateProps } from "../Inbox/InterfaceProps";
import { logOutResetAll } from "../../actions/authActions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import _, { first } from "lodash";
import { Colors } from "../../Theme/variables";
import { SafeAreaView } from "react-native-safe-area-context";
import { goBack, navigate, replace } from "../../navigators/RootNavigation";
import ToastMessage from "../../components/ToastMessage";
import { toastConst } from "../../constants/constants";

interface AccountProps {
  // onClick: (val: number) => void;
}

const Account: React.FC<AccountProps> = (
  {
    // onClick,
  }
) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [emailModalVisible, setEmailModalVisible] = useState(false);
  const [travelCreditModal, setTravelCreditModal] = useState(false);
  const [transmissionModal, setTransmissionModal] = useState(false);
  const [firstSelected, setFirstSelected] = useState(0);
  const [secondSelected, setSecondSelected] = useState(0);
  const [selectedValue, setSelectedValue] = useState("no");
  const [email, setEmail] = useState("");
  const [updateKey, setUpdateKey] = useState(false);
  const [value, setValue] = useState(false);

  const [profileDetailsData, changeEmailData] = useSelector(
    (state: ReducerStateProps) => [
      state.user.profileDetailsData,
      state.user.changeEmailData,
    ]
  );

  useEffect(() => {
    {
      _.find(profileDetailsData?.verifiedInfo?.manualTransmission)
        ? setSelectedValue(
            _.get(profileDetailsData, "verifiedInfo.manualTransmission", null)
          )
        : setSelectedValue(selectedValue);
    }
  }, [transmissionModal]);

  useEffect(() => {
    {
      _.find(profileDetailsData?.verifiedInfo?.manualTransmission) &&
      selectedValue === "yes"
        ? [setFirstSelected(1), setSecondSelected(0)]
        : [setFirstSelected(0), setSecondSelected(1)];
    }
  }, [transmissionModal]);

  useEffect(() => {
    if (changeEmailData && updateKey) {
      setUpdateKey(false);
      dispatch(logOutResetAll());
      AsyncStorage.clear();
      replace("LoginSplash");
    }
  }, [changeEmailData]);

  const changeEmail = () => {
    if (!email) {
      ToastMessage.set(toastConst.errorToast, "Email required.");
    } else {
      let params = {
        newEmail: email,
      };
      dispatch(changeEmailStart(params));
      setUpdateKey(true);
      if (changeEmailData) {
        replace("LoginSplash");
      }
    }
  };

  useEffect(() => {
    if (value) {
      setTransmission();
    }
  }, [value]);

  const setTransmission = () => {
    if (firstSelected === 1) {
      setSelectedValue("yes");
    } else if (firstSelected === 0) {
      setSelectedValue("no");
    }

    callApi();
  };

  const callApi = () => {
    let params = {
      manualTransmission: selectedValue,
    };

    setValue(false);
    dispatch(changeManualTransmissionStart(params));
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Variables.Colors.blackBg,
      }}
    >
      <StatusBar backgroundColor={Colors.darkBlack} barStyle="light-content" />
      <Header
        centerText={t("labelConst.accountTxt")}
        onRightPress={() => {}}
        leftSvg={<BackSvg height={25} width={25} />}
        onLeftPress={goBack}
      />
      <ScrollView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Text
            style={[
              FontStyle.urbanistBold,
              styles.loginTxt,
              CommonStyles.smallCommonTxt,
            ]}
          >
            {t("labelConst.loginSettings")}
          </Text>
          <TouchableOpacity
            style={styles.infoOuterView}
            onPress={() => setEmailModalVisible(!emailModalVisible)}
          >
            <View style={{ width: "90%", alignSelf: "center" }}>
              <Text
                style={[FontStyle.urbanistMedium, CommonStyles.smallCommonTxt]}
              >
                Email
              </Text>
              <Text
                style={[
                  FontStyle.urbanistSemiBold,
                  CommonStyles.extraSmallCommonTxt,
                  styles.descTxt,
                ]}
              >
                {profileDetailsData?.verifiedInfo?.email}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.infoOuterView}
            onPress={() => {
              navigate("ChangePassword");
            }}
          >
            <View style={{ width: "90%", alignSelf: "center" }}>
              <Text
                style={[
                  FontStyle.urbanistMedium,
                  ,
                  CommonStyles.smallCommonTxt,
                ]}
              >
                Password
              </Text>
              <Text
                style={[
                  FontStyle.urbanistSemiBold,
                  CommonStyles.extraSmallCommonTxt,
                  styles.descTxt,
                ]}
              >
                Change Password
              </Text>
            </View>
          </TouchableOpacity>
          <View style={styles.infoOuterView}>
            <View style={{ width: "90%", alignSelf: "center" }}>
              <Text
                style={[FontStyle.urbanistMedium, CommonStyles.smallCommonTxt]}
              >
                Google
              </Text>
              <Text
                style={[
                  FontStyle.urbanistSemiBold,
                  CommonStyles.extraSmallCommonTxt,
                  styles.descTxt,
                ]}
              >
                Not connected
              </Text>
            </View>
          </View>
          <View style={styles.infoOuterView}>
            <View style={{ width: "90%", alignSelf: "center" }}>
              <Text
                style={[FontStyle.urbanistMedium, CommonStyles.smallCommonTxt]}
              >
                Facbook
              </Text>
              <Text
                style={[
                  FontStyle.urbanistSemiBold,
                  CommonStyles.extraSmallCommonTxt,
                  styles.descTxt,
                ]}
              >
                Not connected
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.infoOuterView}
            onPress={() => {
              navigate("ChangeNumber");
            }}
          >
            <View style={{ width: "90%", alignSelf: "center" }}>
              <Text
                style={[FontStyle.urbanistMedium, CommonStyles.smallCommonTxt]}
              >
                Mobile phone
              </Text>
              <Text
                style={[
                  FontStyle.urbanistSemiBold,
                  CommonStyles.extraSmallCommonTxt,
                  styles.descTxt,
                ]}
              >
                {profileDetailsData?.verifiedInfo.phoneNumber}
              </Text>
            </View>
          </TouchableOpacity>

          {_.get(profileDetailsData, "verifiedInfo.role", null) ===
            "ROLE_CAR_OWNER" && (
            <TouchableOpacity
              style={styles.infoOuterView}
              onPress={() => {
                if (
                  _.get(
                    profileDetailsData,
                    "verifiedInfo.isBankDetailsAddStatus"
                  ) == true
                ) {
                  navigate("BankDetails");
                } else {
                  navigate("SetUpAccount");
                }
              }}
            >
              <View style={{ width: "90%", alignSelf: "center" }}>
                <Text
                  style={[
                    FontStyle.urbanistMedium,
                    CommonStyles.smallCommonTxt,
                  ]}
                >
                  Bank Detials
                </Text>
                <Text
                  style={[
                    FontStyle.urbanistSemiBold,
                    CommonStyles.extraSmallCommonTxt,
                    styles.descTxt,
                  ]}
                >
                  {_.get(
                    profileDetailsData,
                    "verifiedInfo.bankDetails[0].accountNumber",
                    null
                  )}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          {/* {_.get(profileDetailsData, "verifiedInfo.role") ===
            "ROLE_CUSTOMER" && (
            <>
              <Text
                style={[
                  FontStyle.urbanistBold,
                  styles.loginHeadingTxt,
                  { paddingLeft: 20, marginTop: 30 },
                ]}
              >
                PAYMENT SETTINGS
              </Text>
              <TouchableOpacity
                style={styles.paymentOuterView}
                onPress={() => setTravelCreditModal(!travelCreditModal)}
              >
                <View style={{ width: "90%", alignSelf: "center" }}>
                  <Text
                    style={[FontStyle.urbanistMedium, styles.loginHeadingTxt]}
                  >
                    Add travel credit
                  </Text>
                  <Text
                    style={[
                      FontStyle.urbanistSemiBold,
                      styles.descTxt,
                      { paddingBottom: 5 },
                    ]}
                  >
                    Travel credit JA $100
                  </Text>
                </View>
              </TouchableOpacity>
            </>
          )} */}
          <Text
            style={[
              FontStyle.urbanistBold,
              CommonStyles.descCommonTxt,
              { paddingLeft: 20, marginTop: 15 },
            ]}
          >
            NOTIFICATION
          </Text>
          <TouchableOpacity
            style={styles.paymentOuterView}
            onPress={() => {
              navigate("NotificationSettings");
            }}
          >
            <View style={{ width: "90%", alignSelf: "center" }}>
              <Text
                style={[
                  FontStyle.urbanistMedium,
                  CommonStyles.extraSmallCommonTxt,
                ]}
              >
                Notification manager
              </Text>
              <Text
                style={[
                  FontStyle.urbanistSemiBold,
                  CommonStyles.extraSmallCommonTxt,
                  styles.descTxt,
                ]}
              ></Text>
            </View>
          </TouchableOpacity>
          {_.get(profileDetailsData, "verifiedInfo.role") ===
            "ROLE_CUSTOMER" && (
            <>
              <Text
                style={[
                  FontStyle.urbanistBold,
                  CommonStyles.descCommonTxt,
                  { paddingLeft: 20, marginTop: 15 },
                ]}
              >
                GENERAL SETTINGS
              </Text>

              <TouchableOpacity
                style={styles.paymentOuterView}
                onPress={() => setTransmissionModal(!transmissionModal)}
              >
                <View style={{ width: "90%", alignSelf: "center" }}>
                  <Text
                    style={[
                      FontStyle.urbanistMedium,
                      CommonStyles.extraSmallCommonTxt,
                    ]}
                  >
                    Manual transmission
                  </Text>
                  <Text
                    style={[
                      FontStyle.urbanistSemiBold,
                      CommonStyles.extraSmallCommonTxt,
                      styles.descTxt,
                    ]}
                  >
                    {selectedValue}
                  </Text>
                </View>
              </TouchableOpacity>
            </>
          )}
          {_.get(profileDetailsData, "verifiedInfo.role") ===
            "ROLE_CAR_OWNER" && (
            <>
              <Text
                style={[
                  FontStyle.urbanistBold,
                  styles.loginHeadingTxt,
                  { paddingLeft: 20, marginTop: 15 },
                ]}
              ></Text>
              <TouchableOpacity
                style={styles.paymentOuterView}
                onPress={() => {
                  navigate("TabNavigations", { navigationfrom: 19 });
                }}
              >
                <View style={{ width: "90%", alignSelf: "center" }}>
                  <Text
                    style={[
                      FontStyle.urbanistMedium,
                      CommonStyles.smallCommonTxt,
                    ]}
                  >
                    Approved status
                  </Text>
                  <Text
                    style={[
                      FontStyle.urbanistSemiBold,
                      CommonStyles.extraSmallCommonTxt,
                      styles.descTxt,
                    ]}
                  ></Text>
                </View>
              </TouchableOpacity>
            </>
          )}
          <Text
            style={[
              FontStyle.urbanistBold,
              styles.loginHeadingTxt,
              { paddingLeft: 20, marginTop: 15 },
            ]}
          ></Text>
          <TouchableOpacity
            style={styles.paymentOuterView}
            onPress={() => {
              navigate("CloseAccount");
            }}
          >
            <View style={{ width: "90%", alignSelf: "center" }}>
              <Text
                style={[FontStyle.urbanistMedium, CommonStyles.smallCommonTxt]}
              >
                Close account
              </Text>
              <Text
                style={[
                  FontStyle.urbanistSemiBold,
                  CommonStyles.extraSmallCommonTxt,
                  styles.descTxt,
                ]}
              ></Text>
            </View>
          </TouchableOpacity>
          <UpdateDataModal
            modalVisible={emailModalVisible}
            headerTxt={"Change email"}
            descTxt={
              "We'll send a link to your email address to verify it. Your log in email will be updated as well."
            }
            okTxt={"OK"}
            cancelTxt={"CANCEL"}
            onCancelPress={() => setEmailModalVisible(!emailModalVisible)}
            onOkPress={() => {
              setEmailModalVisible(!emailModalVisible);
              changeEmail();
            }}
            placeholderTxt="Enter Email"
            onSubmit={(val) => {
              setEmail(val);
            }}
          />
          <UpdateDataModal
            modalVisible={travelCreditModal}
            headerTxt={"Enter travel credit code"}
            descTxt={
              "Travel credit will automatically apply towards your next trip. Promo code must be entered at checkout."
            }
            okTxt={"OK"}
            cancelTxt={"CANCEL"}
            onCancelPress={() => setTravelCreditModal(!travelCreditModal)}
            onOkPress={() => setTravelCreditModal(!travelCreditModal)}
            placeholderTxt="Travel credit code"
          />

          <Modal
            animationType="slide"
            transparent={true}
            visible={transmissionModal}
          >
            <View style={styles.parentView}>
              <View style={styles.modalView}>
                <Text style={[styles.modalText, FontStyle.urbanistBold]}>
                  Manual Transmission
                </Text>
                <Text style={[FontStyle.urbanistMedium, styles.modalDescTxt]}>
                  Some cars dont't have manual transmission. Are you able to
                  drive a stick shift?
                </Text>
                <View style={styles.selectionView}>
                  {firstSelected === 0 ? (
                    <TouchableOpacity
                      style={styles.leftOptionView}
                      onPress={() => {
                        {
                          setFirstSelected(1),
                            setSecondSelected(0),
                            setSelectedValue("yes");
                        }
                      }}
                    />
                  ) : (
                    <TouchableOpacity
                      style={styles.selectedView}
                      onPress={(val) => {
                        {
                          // setFirstSelected(0), setSecondSelected(1);
                          // setSelectedValue("yes");
                        }
                      }}
                    >
                      <View style={styles.innerSelectedView} />
                    </TouchableOpacity>
                  )}
                  <Text style={[FontStyle.urbanistMedium, styles.optionsTxt]}>
                    Yes, I'm able to drive a stick shift
                  </Text>
                </View>
                <View
                  style={[
                    styles.selectionView,
                    { marginTop: Variables.Measures.fontSize / 1.5 },
                  ]}
                >
                  {secondSelected === 0 ? (
                    <TouchableOpacity
                      style={styles.leftOptionView}
                      onPress={() => {
                        setSecondSelected(1),
                          setFirstSelected(0),
                          setSelectedValue("no");
                      }}
                    />
                  ) : (
                    <TouchableOpacity
                      style={styles.selectedView}
                      onPress={() => {
                        // setSecondSelected(0), setFirstSelected(1);
                        // setSelectedValue("no");
                      }}
                    >
                      <View style={styles.innerSelectedView} />
                    </TouchableOpacity>
                  )}
                  <Text style={[FontStyle.urbanistMedium, styles.optionsTxt]}>
                    No, I'm not able to drive a stick shift
                  </Text>
                </View>
                <View style={styles.btnOuterView}>
                  <View style={styles.rowInnerView}>
                    <TouchableOpacity
                      onPress={() => {
                        setTransmissionModal(!transmissionModal),
                          _.find(
                            profileDetailsData?.verifiedInfo?.manualTransmission
                          ) &&
                            setSelectedValue(
                              _.get(
                                profileDetailsData,
                                "verifiedInfo.manualTransmission",
                                null
                              )
                            );
                      }}
                    >
                      <Text style={[FontStyle.urbanistBold, styles.btnTxt]}>
                        {"CANCEL"}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setTransmissionModal(!transmissionModal),
                          // setTransmission();
                          setValue(true);
                      }}
                    >
                      <Text style={[FontStyle.urbanistBold, styles.btnTxt]}>
                        {"OK"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loginTxt: {
    paddingLeft: Variables.FontSize.regular,
    marginTop: Variables.FontSize.large,
  },
  selectedView: {
    height: 18,
    width: 18,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Variables.Colors.darkYellow,
    alignItems: "center",
    justifyContent: "center",
  },
  innerSelectedView: {
    height: 10,
    width: 10,
    borderRadius: 10,
    backgroundColor: Variables.Colors.darkYellow,
    alignItems: "center",
  },
  selectionView: {
    flexDirection: "row",
    width: "98%",
    alignSelf: "center",
    marginTop: Variables.Measures.fontSize / 1.1,
    alignItems: "center",
  },
  leftOptionView: {
    height: 18,
    width: 18,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Variables.Colors.inputTxtColor,
  },
  optionsTxt: {
    color: Variables.Colors.white,
    fontSize: 12,
    marginLeft: Variables.Measures.fontSize / 3,
  },
  rowInnerView: {
    flexDirection: "row",
    width: "40%",
    justifyContent: "space-evenly",
  },
  btnOuterView: {
    width: "100%",
    alignItems: "flex-end",
    marginTop: 20,
    marginBottom: 10,
  },
  inputTxt: {
    width: "100%",
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: Variables.Colors.carsBorderGrey,
    borderRadius: 10,
    marginTop: 10,
    paddingHorizontal: 15,
    color: Variables.Colors.white,
    height: 50,
  },
  btnTxt: {
    color: Variables.Colors.darkYellow,
    fontSize: 11,
  },
  modalDescTxt: {
    color: Variables.Colors.white,
    fontSize: 12,
    marginTop: Variables.Measures.fontSize * 1.2,
    marginBottom: 5,
    lineHeight: 20,
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
    fontSize: 14,
  },
  modalView: {
    backgroundColor: Variables.Colors.carGrey,
    borderRadius: 5,
    width: "90%",
    alignSelf: "center",
    padding: 15,
  },

  loginHeadingTxt: {
    fontSize: Variables.Measures.fontSize / 1.65,
    color: Variables.Colors.white,
  },
  descTxt: {
    color: Variables.Colors.inputTxtColor,
    marginTop: 5,
  },
  infoOuterView: {
    flex: 1,
    marginTop: 20,
    borderBottomColor: Variables.Colors.carsBorderGrey,
    borderBottomWidth: 1,
    paddingBottom: 10,
    paddingTop: 2,
  },
  paymentOuterView: {
    flex: 1,
    marginTop: 5,
    borderBottomColor: Variables.Colors.carsBorderGrey,
    borderBottomWidth: 1,
    paddingBottom: 5,
    paddingTop: 2,
  },
});
export default Account;

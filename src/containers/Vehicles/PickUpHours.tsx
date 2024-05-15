import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from "react-native";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import { Variables, FontStyle, Layout, CommonStyles } from "../../Theme";
import ToggleSwitch from "toggle-switch-react-native";
import { goBack, navigate } from "../../navigators/RootNavigation";

import Header from "../../components/Header";

import BackSvg from "../../assets/Images/BackArrow.svg";
import RightArrowSvg from "../../assets/Images/Right.svg";
import { useDispatch, useSelector } from "react-redux";
import { ReducerStateProps } from "../Inbox/InterfaceProps";
import {
  addUnavailableDatesStart,
  getUnavailableDatesStart,
} from "../../actions/carOwnerActions";
import _ from "lodash";
import { addUnavailableDates } from "../../saga/carOwnerSaga";
import ToastMessage from "../../components/ToastMessage";
import { toastConst } from "../../constants/constants";

interface CancelProps {}

const PickUpHours: React.FC<CancelProps> = ({}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  const [isOnYellowToggleSwitch, setIsOnYellowToggleSwitch] = useState(false);

  const [isLoading, getUnavailableDatesData, addUnavailableDatesData] =
    useSelector((state: ReducerStateProps) => [
      state.carOwner.isLoading,
      state.carOwner.getUnavailableDatesData,

      state.carOwner.addUnavailableDatesData,
    ]);

  useEffect(() => {
    if (!isLoading) {
      setVisible(false);
    }
  }, [isLoading]);

  useEffect(() => {
    dispatch(getUnavailableDatesStart());
  }, []);

  useEffect(() => {
    if (_.size(getUnavailableDatesData?.items) == 0) {
      setIsOnYellowToggleSwitch(true);
    } else {
      setIsOnYellowToggleSwitch(false);
    }
  }, [getUnavailableDatesData]);

  const onToggle = (isOn: boolean) => {
    setIsOnYellowToggleSwitch(isOn);
  };

  return (
    <SafeAreaView style={styles.safeAreaStyle}>
      <Header
        leftSvg={<BackSvg height={25} width={25} />}
        onLeftPress={goBack}
        centerText="Pick up and return hours"
      />
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        statusBarTranslucent
        onDismiss={() => {
          setVisible(false);
        }}
      >
        <View
          style={{
            flex: 1,
            width: Variables.Measures.width,
            height: Variables.Measures.height,
            backgroundColor: Variables.Colors.blackAbsolute,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" color={Variables.Colors.yellow} />
        </View>
      </Modal>
      <View
        style={{
          marginBottom: 100,
        }}
      >
        <View style={styles.outerWidthView}>
          <Text
            style={[
              FontStyle.urbanistMedium,
              CommonStyles.descCommonTxt,
              CommonStyles.justifyText,
            ]}
          >
            Don't forget to establish your available pick-up and return dates,
            and be sure to block out any dates when your vehicle won't be
            accessible. This way, you can manage your car-sharing schedule
            effectively.
          </Text>

          <View style={styles.availableView}>
            <Text
              style={[
                FontStyle.urbanistBold,
                CommonStyles.smallCommonTxt,
                styles.headingTxt,
              ]}
            >
              DAILY AVAILABILITY
            </Text>
            <View style={styles.lineView}></View>
            <View style={styles.outerRowView}>
              <View style={{ width: "80%" }}>
                <Text
                  style={[FontStyle.urbanistMedium, CommonStyles.descCommonTxt]}
                >
                  Always available
                </Text>
              </View>
              <View
                style={{
                  alignItems: "flex-end",
                  flex: 1,
                }}
              >
                <ToggleSwitch
                  onColor={Variables.Colors.greyBg}
                  offColor={Variables.Colors.activeTab}
                  thumbOnStyle={styles.onThumbStyle}
                  thumbOffStyle={styles.offThumbStyle}
                  isOn={isOnYellowToggleSwitch}
                  onToggle={(value) => {
                    // onToggle(value);
                    if (
                      value == false &&
                      _.size(getUnavailableDatesData?.items) == 0
                    ) {
                      ToastMessage.set(
                        toastConst.errorToast,
                        "Please add Unavailable dates."
                      );
                      setIsOnYellowToggleSwitch(true);
                    } else {
                      dispatch(
                        addUnavailableDatesStart({ availability: value })
                      );
                      setIsOnYellowToggleSwitch(false);
                      setVisible(!visible);
                    }
                  }}
                />
              </View>
            </View>
          </View>
          <View style={styles.availableView}>
            <Text
              style={[
                FontStyle.urbanistBold,
                CommonStyles.smallCommonTxt,
                styles.headingTxt,
              ]}
            >
              UNAVAILABLE DATES
            </Text>
            <TouchableOpacity
              style={styles.rightArrowView}
              onPress={() => navigate("UnAvailableDates")}
            >
              <Text
                style={[FontStyle.urbanistMedium, CommonStyles.descCommonTxt]}
              >
                Upcoming dates
              </Text>
              <RightArrowSvg />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  rightArrowView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: Variables.MetricsSizes.large,
    marginBottom: Variables.FontSize.regular,
    alignItems: "center",
  },
  availableView: {
    width: "100%",
    borderWidth: 1,
    borderBottomColor: Variables.Colors.borderGrey,
    // paddingVertical: 20,
    marginTop: Variables.FontSize.large,
  },
  lineView: {
    width: "100%",
    // marginTop: Variables.Measures.fontSize,
    borderWidth: 1,
    borderBottomColor: Variables.Colors.borderGrey,
  },
  outerWidthView: {
    width: "92%",
    alignSelf: "center",
    marginTop: Variables.Measures.fontSize / 1.5,
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
  outerRowView: {
    flexDirection: "row",
    marginVertical: Variables.MetricsSizes.large,
    width: "100%",
    alignSelf: "center",
    alignItems: "center",
  },
  notificationView: {
    borderBottomWidth: 1,
    borderBottomColor: Variables.Colors.carsBorderGrey,
  },
  notificationTxt: {
    color: Variables.Colors.white,
    fontSize: 14,
  },
  safeAreaStyle: {
    flex: 1,
    backgroundColor: Variables.Colors.darkBlack,
  },
  infoTxt: {
    fontSize: 16,
    color: Variables.Colors.white,
    lineHeight: 20,
  },
  headingTxt: {
    color: Variables.Colors.inputTxtColor,
  },
});

export default PickUpHours;

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
import { goBack, navigate } from "../../navigators/RootNavigation";
import DatePicker from "react-native-date-picker";
import moment from "moment";

import Header from "../../components/Header";

import CloseSvg from "../../assets/Images/CloseSvg.svg";
import CheckSvg from "../../assets/Images/Authentication/check.svg";
import { useDispatch, useSelector } from "react-redux";
import { ReducerStateProps } from "../Inbox/InterfaceProps";
import { addUnavailableDatesStart } from "../../actions/carOwnerActions";
import _ from "lodash";
import ToastMessage from "../../components/ToastMessage";
import { toastConst } from "../../constants/constants";

interface CancelProps {}

const SelectDate: React.FC<CancelProps> = ({}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [date, setDate] = useState(new Date());
  const [displayDate, setDisplayDate] = useState(null);
  const [dateVisible, setDateVisible] = useState(false);
  const [fromDate, setFromDate] = useState(null);
  const [newDates, setNewDates] = useState([]);

  const [untillDate, setUntillDate] = useState(new Date());
  const [displayUntillDate, setDisplayUntillDate] = useState(null);
  const [untillDateVisible, setUntillDateVisible] = useState(false);
  const [untilDate1, setUntilDate1] = useState(null);

  const [update, setUpdate] = useState(false);
  const [visible, setVisible] = useState(false);

  const getData = (date: any) => {
    const formatedDate = moment(date).format("ddd, MMM DD");
    const currentTime = moment(date).format("hh:mm A");
    const dateTime = formatedDate + " at " + currentTime;
    setDisplayDate(dateTime);
  };

  const getUntillDate = (date: any) => {
    const formatedUntillDate = moment(date).format("ddd, MMM DD");
    const currentUntillTime = moment(date).format("hh:mm A");
    const untillDateTime = formatedUntillDate + " at " + currentUntillTime;
    setDisplayUntillDate(untillDateTime);
  };

  const [isLoading, addUnavailableDatesData, getUnavailableDatesData] =
    useSelector((state: ReducerStateProps) => [
      state.carOwner.isLoading,
      state.carOwner.addUnavailableDatesData,
      state.carOwner.getUnavailableDatesData,
    ]);

  useEffect(() => {
    setNewDates(
      _.get(getUnavailableDatesData, "items", null).map((item: any) => ({
        fromDate: item?.fromDateTime,
        toDate: item?.toDateTime,
      }))
    );
  }, []);

  useEffect(() => {
    if (_.get(addUnavailableDatesData, "success", null) && update == true) {
      navigate("UnAvailableDates");
    }
  }, [addUnavailableDatesData]);

  return (
    <SafeAreaView style={styles.safeAreaStyle}>
      <Header
        leftSvg={<CloseSvg height={25} width={25} />}
        onLeftPress={goBack}
        centerText="Unavailable dates"
        rightSvg={<CheckSvg />}
        onRightPress={() => {
          if (
            moment(fromDate).format("YYYY-MM-DD HH:mm:ss") <=
            moment(new Date()).format("YYYY-MM-DD HH:mm:ss")
          ) {
            ToastMessage.set(
              toastConst.errorToast,
              "Please select future dates."
            );
          } else {
            setUntillDateVisible(false);
            setDateVisible(false);
            setVisible(!visible);
            dispatch(
              addUnavailableDatesStart({
                availability: false,
                dates: [
                  ...newDates,
                  {
                    fromDate: fromDate,
                    toDate: untilDate1,
                  },
                ],
              })
            );
            setUpdate(true);
          }
        }}
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
          <View style={styles.availableView}>
            <View style={styles.lineView} />
            <View style={styles.rightArrowView}>
              <View style={{ width: "20%" }}>
                <Text
                  style={[FontStyle.urbanistMedium, CommonStyles.descCommonTxt]}
                >
                  From
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setUntillDateVisible(false), setDateVisible(!dateVisible);
                }}
                style={{ width: "80%" }}
              >
                <Text
                  style={[
                    FontStyle.urbanistMedium,
                    CommonStyles.descCommonTxt,
                    {
                      color: displayDate
                        ? Variables.Colors.white
                        : Variables.Colors.inputTxtColor,
                    },
                  ]}
                >
                  {displayDate ? displayDate : "Select"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: Variables.Colors.carGrey,
            }}
          >
            <View style={styles.rightArrowView}>
              <View style={{ width: "20%" }}>
                <Text
                  style={[FontStyle.urbanistMedium, CommonStyles.descCommonTxt]}
                >
                  Until
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  setUntillDateVisible(!untillDateVisible),
                    setDateVisible(false);
                }}
              >
                <Text
                  style={[
                    FontStyle.urbanistMedium,
                    CommonStyles.descCommonTxt,
                    {
                      color: displayDate
                        ? Variables.Colors.white
                        : Variables.Colors.inputTxtColor,
                    },
                  ]}
                >
                  {displayUntillDate ? displayUntillDate : "Select"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      {dateVisible && (
        <View style={styles.dateAbsoluteView}>
          <DatePicker
            date={date}
            onDateChange={(date: any) => {
              const momentDate = moment(
                date,
                "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (z)"
              );
              // Convert to ISO 8601 format (UTC)
              const iso8601Date = momentDate.toISOString();
              setFromDate(iso8601Date);

              setDate(date);
              getData(date);
            }}
            theme="dark"
            androidVariant="iosClone"
            dividerHeight={0}
            fadeToColor="#000"
            style={{ width: Variables.Measures.width }}
          />
        </View>
      )}
      {untillDateVisible && (
        <View style={styles.dateAbsoluteView}>
          <DatePicker
            date={untillDate}
            onDateChange={(date: any) => {
              const momentDate = moment(
                date,
                "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (z)"
              );
              // Convert to ISO 8601 format (UTC)
              const iso8601Date = momentDate.toISOString();
              setUntilDate1(iso8601Date);

              setUntillDate(date);
              getUntillDate(date);
            }}
            theme="dark"
            androidVariant="iosClone"
            dividerHeight={0}
            fadeToColor="#000"
            style={{ width: Variables.Measures.width }}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  dateAbsoluteView: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 30,
    width: "100%",
  },
  rightArrowView: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
  },
  availableView: {
    width: "100%",
    borderWidth: 1,
    borderBottomColor: Variables.Colors.borderGrey,
    justifyContent: "center",
    marginTop: 20,
  },
  lineView: {
    width: "100%",
    marginTop: Variables.Measures.fontSize,
    borderBottomWidth: 1,
    borderBottomColor: Variables.Colors.borderGrey,
  },
  outerWidthView: {
    width: "92%",
    alignSelf: "center",
    marginTop: Variables.Measures.fontSize / 1.5,
  },
  notificationTxt: {
    color: Variables.Colors.white,
    fontSize: 14,
  },
  safeAreaStyle: {
    flex: 1,
    backgroundColor: Variables.Colors.darkBlack,
  },
  selectTxt: {
    fontSize: 14,
  },
});

export default SelectDate;

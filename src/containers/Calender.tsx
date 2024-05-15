import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  Modal,
  SafeAreaView,
} from "react-native";
import { useTranslation } from "react-i18next";
import dayjs from "dayjs";

import { CommonStyles, FontStyle, Layout, Variables } from "../Theme";

import LeftSvg from "../assets/Images/BackArrow.svg";
import RightArrowSvg from "../assets/Images/RightYellowArrow.svg";
import Calendar from "../components/RangeCalendar/Index";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import moment from "moment";
import { Colors, Measures } from "../Theme/variables";
import _ from "lodash";
const CUSTOM_LOCALE = {
  monthNames: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  dayNames: ["S", "M", "T", "W", "T", "F", "S"],
  today: "",
  year: "",
};

interface CalendarProps {
  modalVisible?: boolean;
  onDismiss?: () => void;
  onSubmit?: (val: any) => void;
  startOfDate?: any;
  endOfDate?: any;
}

const Calender: React.FC<CalendarProps> = ({
  modalVisible,
  onDismiss,
  onSubmit,
  startOfDate,
  endOfDate,
}) => {
  const [startDate, setStartDate] = useState(startOfDate);
  const [endDate, setEndDate] = useState(endOfDate);
  const [minDate, setMinDate] = useState(null);

  const TIME = { min: 0, max: 24 };

  const { t } = useTranslation();

  const { min, max } = TIME;

  const [startSelected, setStartSelected] = useState(null);
  const [endSelected, setEndSelected] = useState(null);

  const [startTime, setStartTime] = useState(moment(startDate).get("hour"));
  const [endTime, setEndTime] = useState(moment(endDate).get("hour"));

  if (!startSelected) {
    setStartSelected([1]);
  }

  if (!endSelected) {
    setEndSelected([1]);
  }

  const onStartValuesChangeFinish = useCallback(
    (values: any) => {
      setStartSelected(values);
    },
    [startSelected]
  );

  const onEndValuesChangeFinish = useCallback(
    (values: any) => {
      setEndSelected(values);
    },
    [endSelected]
  );

  const DisplayStartMarker = useCallback(
    (values: any) => {
      setStartTime(values.currentValue);
      return (
        <View style={styles.markerView}>
          <Text style={[FontStyle.urbanistSemiBold, styles.amTxt]}>
            {moment(values.currentValue, ["HH"]).format("hh:mm A")}
          </Text>
        </View>
      );
    },
    [startTime]
  );

  const DisplayEndMarker = useCallback(
    (values: any) => {
      setEndTime(values.currentValue);
      return (
        <View style={styles.markerView}>
          <Text style={[FontStyle.urbanistSemiBold, styles.amTxt]}>
            {moment(values.currentValue, ["HH"]).format("hh:mm A")}
          </Text>
        </View>
      );
    },
    [endTime]
  );

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      presentationStyle={"fullScreen"}
      statusBarTranslucent={true}
      onRequestClose={onDismiss}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: Variables.Colors.darkBlack,
        }}
      >
        <View style={styles.headerView}>
          <View style={styles.headerInnerView}>
            <View style={Layout.rowCenter}>
              <View>
                <Text
                  style={[CommonStyles.smallCommonTxt, FontStyle.urbanistBold]}
                >
                  {startDate
                    ? dayjs(startDate).format("ddd MMM DD")
                    : "Start Date"}
                </Text>
                <Text
                  style={[
                    CommonStyles.descCommonTxt,
                    FontStyle.urbanistMedium,
                    styles.timeTxt,
                  ]}
                >
                  {startTime
                    ? moment(startTime, ["HH"]).format("hh:mm A")
                    : "Start Time"}
                </Text>
              </View>
              <View style={{ marginHorizontal: 10, marginTop: 5 }}>
                <RightArrowSvg height={20} />
              </View>
              <View>
                <Text
                  style={[CommonStyles.smallCommonTxt, FontStyle.urbanistBold]}
                >
                  {endDate ? dayjs(endDate).format("ddd MMM DD") : "End Date"}
                </Text>
                <Text
                  style={[
                    CommonStyles.descCommonTxt,
                    FontStyle.urbanistMedium,
                    styles.timeTxt,
                  ]}
                >
                  {endTime
                    ? moment(endTime, ["HH"]).format("hh:mm A")
                    : "End Time"}
                </Text>
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={{ position: "absolute", left: 15, top: 15 }}
            onPress={onDismiss}
          >
            <LeftSvg />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          <Calendar
            startDate={moment(startOfDate).format("YYYY-MM-DD")}
            endDate={moment(endOfDate).format("YYYY-MM-DD")}
            disabledBeforeToday={true}
            onChange={({ startDate, endDate }) => {
              setStartDate(startDate), setEndDate(endDate);
            }}
            pastYearRange={0}
            futureYearRange={2}
            flatListProps={{
              maxToRenderPerBatch: 3,
              updateCellsBatchingPeriod: 1000,
              removeClippedSubviews: true,
            }}
            locale={CUSTOM_LOCALE}
            style={{
              selectedDayBackgroundColor: Colors.yellow,
              selectedBetweenDayBackgroundTextColor: "rgba(224, 186, 34, 0.3)",
              selectedDayTextColor: Colors.darkBlack,
              selectedBetweenDayTextColor: Colors.white,
              disabledTextColor: Colors.chocolate,
              todayColor: Colors.yellow,
              dayTextColor: Colors.white,
              holidayColor: Colors.white,
              monthNameText: { color: Colors.white, alignSelf: "center" },
              container: { backgroundColor: Colors.darkBlack },
              monthContainer: { backgroundColor: Colors.darkBlack },
              dayText: [FontStyle.urbanistSemiBold, { fontSize: 13 }],
              dayNameText: [FontStyle.urbanistSemiBold, { fontSize: 13 }],
            }}
          />
        </View>
        <View style={[styles.buttonWrapper]}>
          <View
            style={{
              flexDirection: "row",
            }}
          >
            <View style={styles.startView}>
              <Text
                style={[
                  FontStyle.urbanistMedium,
                  CommonStyles.descCommonTxt,
                  styles.startTxt,
                ]}
              >
                Start
              </Text>
            </View>
            <View
              style={{
                height: 40,
                width: "85%",
                marginLeft: 10,
                // backgroundColor: "green",
              }}
            >
              <MultiSlider
                min={min}
                max={max}
                values={[startTime]}
                sliderLength={Variables.Measures.width / 1.6}
                onValuesChangeFinish={onStartValuesChangeFinish}
                enableLabel={false}
                trackStyle={{
                  height: 2,
                }}
                customMarker={DisplayStartMarker}
                selectedStyle={{
                  backgroundColor: Variables.Colors.darkYellow,
                }}
                unselectedStyle={{
                  backgroundColor: Variables.Colors.greyBg,
                }}
              />
            </View>
          </View>
          <View style={{ flexDirection: "row", marginBottom: 10 }}>
            <View style={styles.startView}>
              <Text
                style={[
                  FontStyle.urbanistMedium,
                  CommonStyles.descCommonTxt,
                  styles.startTxt,
                ]}
              >
                End
              </Text>
            </View>
            <View style={{ height: 40, width: "85%" }}>
              <MultiSlider
                min={min}
                max={max}
                values={[endTime]}
                sliderLength={Variables.Measures.width / 1.6}
                onValuesChangeFinish={onEndValuesChangeFinish}
                enableLabel={false}
                trackStyle={{
                  height: 2,
                }}
                customMarker={DisplayEndMarker}
                selectedStyle={{
                  backgroundColor: Variables.Colors.darkYellow,
                }}
                unselectedStyle={{
                  backgroundColor: Variables.Colors.greyBg,
                }}
              />
            </View>
          </View>
          <TouchableOpacity
            style={styles.saveBtn}
            onPress={() => {
              let startD = moment(startDate).format("YYYY/MM/DD");
              let EndD = moment(endDate).format("YYYY/MM/DD");
              let dStart = new Date(
                Number(_.split(startD, "/")[0]),
                Number(_.split(startD, "/")[1]) - 1,
                Number(_.split(startD, "/")[2]),
                startTime,
                0,
                0,
                0
              );
              let dEnd = new Date(
                Number(_.split(EndD, "/")[0]),
                Number(_.split(EndD, "/")[1]) - 1,
                Number(_.split(EndD, "/")[2]),
                endTime,
                0,
                0,
                0
              );
              onSubmit({
                fromDateTime: dStart,
                toDateTime: dEnd,
              });
            }}
          >
            <Text
              style={[
                FontStyle.urbanistBold,
                { color: Variables.Colors.darkBlack, fontSize: 16 },
              ]}
            >
              Save
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  headerInnerView: {
    width: "60%",
    alignSelf: "center",
    marginTop: 10,
  },
  buttonWrapper: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: Variables.Colors.greyBg,
    borderTopWidth: 1,
    borderColor: Variables.Colors.borderGrey,
    alignItems: "stretch",
  },
  amTxt: {
    color: Variables.Colors.darkYellow,
    fontSize: Measures.fontSize - 5,
    // paddingHorizontal: 3,
  },
  startTxt: {
    color: Variables.Colors.inputTxtColor,
  },
  saveBtn: {
    width: "98%",
    backgroundColor: Variables.Colors.darkYellow,
    height: 45,
    alignSelf: "center",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  startView: {
    width: "13%",
    justifyContent: "center",
    flex: 1,
    // backgroundColor: "red",
  },
  markerView: {
    minWidth: 80,
    height: 25,
    backgroundColor: Variables.Colors.yellowMarker,
    alignItems: "center",
    justifyContent: "center",
    borderColor: Variables.Colors.darkYellow,
    borderWidth: 1,
    borderRadius: 4,
    flexDirection: "row",
    marginLeft: 60,
  },
  headerView: {
    borderBottomWidth: 1,
    borderBottomColor: Variables.Colors.borderGrey,
    paddingBottom: 10,
    marginTop: Measures.StatusBarHeight,
  },
  bottomRowView: {
    flexDirection: "row",
    // justifyContent: "space-between",
    paddingHorizontal: 20,
    alignItems: "center",
  },
  startDateTxt: {
    color: Variables.Colors.white,
  },
  timeTxt: {
    color: Variables.Colors.white,
    textAlign: "center",
  },
});
export default Calender;

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { FontStyle, Variables } from "../Theme";
import { useTranslation } from "react-i18next";
import DashedLine from "react-native-dashed-line";
import DatePicker from "../components/NewDatePicker";

import CalendarSvg from "../assets/Images/CalendarModal.svg";
import PencilSvg from "../assets/Images/PencilSvg.svg";
import { Colors } from "../Theme/variables";

export interface DateProps {
  visibleModal: boolean;
  onOkPress?: (val: boolean) => void;
  onDatePress?: () => void;
  onCancelPress?: (val: boolean) => void;
  DateHeading?: string;
  datePlaceholder?: any;
  cancelTxt: string;
  okTxt: string;
  onDateChange?: (val: any) => void;
  openDatePicker?: boolean;
}

const DateModal: React.FC<DateProps> = ({
  visibleModal,
  onOkPress,
  onDatePress,
  onCancelPress,
  DateHeading,
  datePlaceholder,
  cancelTxt,
  okTxt,
  onDateChange,
  openDatePicker,
}) => {
  const { t } = useTranslation();

  const [date, setDate] = useState(null);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visibleModal}
      onRequestClose={() => {}}
    >
      <View style={styles.parentView}>
        <View style={styles.modalView}>
          <View style={styles.modalBorderView}>
            <Text style={[FontStyle.urbanistMedium, styles.modalDescTxt]}>
              {DateHeading}
            </Text>
            <View
              style={{
                marginTop: Variables.Measures.fontSize * 1.5,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <CalendarSvg height={40} width={40} />
              <View style={{ width: "75%" }}>
                <Text style={[FontStyle.urbanistMedium, styles.dateTxt]}>
                  Selected Date
                </Text>
              </View>
              {openDatePicker && (
                <View style={{ width: "10%", alignItems: "flex-end" }}>
                  <PencilSvg />
                </View>
              )}
            </View>
            <TouchableOpacity
              style={styles.dateAbsoluteView}
              onPress={() => onDatePress()}
            >
              <View
                style={{
                  width: "17%",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={[FontStyle.urbanistMedium, styles.btnTxt]}>
                  Date
                </Text>
              </View>
              <View style={{ justifyContent: "center", paddingHorizontal: 5 }}>
                <Text
                  style={[FontStyle.urbanistMedium, styles.datePlaceholderTxt]}
                >
                  {datePlaceholder}
                </Text>
              </View>
            </TouchableOpacity>
            {openDatePicker && (
              <View>
                <View style={{ height: 20 }} />
                <DashedLine
                  dashLength={5}
                  dashColor={Variables.Colors.borderGrey}
                  dashThickness={0.5}
                />
                <View style={{ height: 20 }} />
                {/* <DatePicker
                  date={date}
                  onDatesChange={({ date }: any) => {
                    setDate(date?._d);
                    onDateChange(date?._d);
                  }}
                  isDateBlocked={() => {}}
                /> */}
                <DatePicker
                  disabledDateColor={Colors.chocolate}
                  selectedDateColor={Colors.darkBlack}
                  weekendDateColor={Colors.white}
                  weekDateColor={Colors.white}
                  initialViewDate={date}
                  initialSelectedDate={date}
                  onChange={(date: any) => {
                    setDate(date);
                    onDateChange(date);
                  }}
                />
              </View>
            )}
          </View>
          <DashedLine
            dashLength={5}
            dashColor={Variables.Colors.borderGrey}
            dashThickness={0.5}
          />
          <View style={styles.btnOuterView}>
            <TouchableOpacity
              style={styles.btnInnerView}
              onPress={(val: any) => onCancelPress(val)}
            >
              <Text style={[FontStyle.urbanistBold, styles.btnTxt]}>
                {cancelTxt}
              </Text>
            </TouchableOpacity>
            <DashedLine
              dashLength={7}
              dashColor={Variables.Colors.borderGrey}
              axis="vertical"
              dashThickness={1}
            />
            <TouchableOpacity
              onPress={(val: any) => onOkPress(val)}
              style={styles.continueBtnView}
            >
              <Text style={[FontStyle.urbanistBold, styles.btnTxt]}>
                {okTxt}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  datePlaceholderTxt: {
    color: Variables.Colors.inputTxtColor,
    fontSize: 14,
  },
  dateAbsoluteView: {
    height: 50,
    width: "100%",
    backgroundColor: "rgba(37, 36, 36, 1)",
    marginTop: Variables.Measures.fontSize,
    borderRadius: 10,
    flexDirection: "row",
  },
  dateTxt: {
    color: Variables.Colors.white,
    fontSize: 14,
    marginLeft: Variables.Measures.unit * 1.8,
  },
  parentView: {
    backgroundColor: "rgba(13, 13, 13, .8)",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  modalView: {
    backgroundColor: Variables.Colors.carGrey,
    borderRadius: 15,
    width: "90%",
    alignSelf: "center",
  },
  modalBorderView: {
    paddingVertical: 25,
    width: "88%",
    alignSelf: "center",
  },
  continueBtnView: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  btnInnerView: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  btnOuterView: {
    width: "100%",
    flexDirection: "row",
    height: 50,
  },
  btnTxt: {
    color: Variables.Colors.darkYellow,
    fontSize: 14,
  },
  modalDescTxt: {
    color: Variables.Colors.white,
    fontSize: 14,
  },
});

export default DateModal;

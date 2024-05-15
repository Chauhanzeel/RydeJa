"use strict";
import React, { useEffect, useCallback, useState } from "react";
import PropTypes from "prop-types";
import { View, FlatList, StyleSheet, Text } from "react-native";
import Month from "./Month";
import { dayJsMod } from "../helper";
import { FontStyle, Variables } from "../../../Theme";
import { Colors } from "../../../Theme/variables";
import moment from "moment";

const RangeDatepicker = (props) => {
  const [startDate, setStartDate] = useState(
    props.startDate && dayJsMod(props.startDate, "DDMMYYYY")
  );
  const [untilDate, setUntilDate] = useState(
    props.untilDate && dayJsMod(props.untilDate, "DDMMYYYY")
  );
  const [availableDates, setAvailableDates] = useState(
    props.availableDates || null
  );

  useEffect(() => {
    setAvailableDates(props.availableDates);
  }, [props.availableDates]);

  const onSelectDate = (date) => {
    let tempStartDate = null;
    let tempUntilDate = null;

    if (startDate && !untilDate) {
      if (
        date.format("YYYYMMDD") < startDate.format("YYYYMMDD") ||
        isInvalidRange(date)
      ) {
        tempStartDate = date;
      } else if (date.format("YYYYMMDD") > startDate.format("YYYYMMDD")) {
        tempStartDate = startDate;
        tempUntilDate = date;
      } else {
        tempStartDate = null;
        tempUntilDate = null;
      }
    } else if (!isInvalidRange(date)) {
      tempStartDate = date;
    } else {
      tempStartDate = null;
      tempUntilDate = null;
    }

    setStartDate(tempStartDate);
    setUntilDate(tempUntilDate);
    props.onSelect(tempStartDate, tempUntilDate);
  };

  const isInvalidRange = (date) => {
    if (availableDates && availableDates.length > 0) {
      if (startDate && !untilDate) {
        for (
          let i = startDate.format("YYYYMMDD");
          i <= date.format("YYYYMMDD");
          i = dayJsMod(i, "YYYYMMDD").add(1, "days").format("YYYYMMDD")
        ) {
          if (
            availableDates.indexOf(i) == -1 &&
            startDate.format("YYYYMMDD") != i
          )
            return true;
        }
      } else if (availableDates.indexOf(date.format("YYYYMMDD")) == -1) {
        return true;
      }
    }

    return false;
  };

  const getMonthStack = () => {
    let res = [];
    const { maxMonth, initialMonth, isHistorical } = props;
    let initMonth = dayJsMod();
    if (initialMonth && initialMonth != "")
      initMonth = dayJsMod(initialMonth, "YYYYMM");

    for (let i = 0; i < maxMonth; i++) {
      res.push(
        !isHistorical
          ? initMonth.clone().add(i, "month").format("YYYYMM")
          : initMonth.clone().subtract(i, "month").format("YYYYMM")
      );
    }
    return res;
  };

  const onReset = () => {
    setStartDate(null);
    setUntilDate(null);

    props.onSelect(null, null);
  };

  const handleConfirmDate = () => {
    props.onConfirm && props.onConfirm(startDate, untilDate);
  };

  const handleRenderRow = (month, index) => {
    const {
      selectedBackgroundColor,
      selectedTextColor,
      todayColor,
      ignoreMinDate,
      minDate,
      maxDate,
    } = props;

    if (availableDates && availableDates.length > 0) {
      availableDates = availableDates.filter(function (d) {
        if (d.indexOf(month) >= 0) return true;
      });
    }

    return (
      <View style={{ marginTop: 10 }}>
        <Month
          onSelectDate={onSelectDate}
          startDate={startDate}
          untilDate={untilDate}
          availableDates={availableDates}
          titleFormat={"YYYY MMM"}
          minDate={minDate ? dayJsMod(minDate, "YYYYMMDD") : minDate}
          maxDate={maxDate ? dayJsMod(maxDate, "YYYYMMDD") : maxDate}
          ignoreMinDate={ignoreMinDate}
          dayProps={{
            selectedBackgroundColor,
            selectedTextColor,
            todayColor,
          }}
          month={month}
        />
      </View>
    );
  };

  return (
    <View
      style={{
        backgroundColor: Variables.Colors.darkBlack,
        // zIndex: 1000,
        alignSelf: "center",
        width: "100%",
        flex: 1,
      }}
    >
      {props.showClose || props.showReset ? (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingVertical: 10,
          }}
        >
          {props.showClose && (
            <Text
              style={{ fontSize: 20, color: Colors.yellow }}
              onPress={props.onClose}
            >
              Close
            </Text>
          )}
          {props.showReset && (
            <Text
              style={{ fontSize: 20, color: Colors.yellow }}
              onPress={onReset}
            >
              Reset
            </Text>
          )}
        </View>
      ) : null}

      <FlatList
        style={{ flex: 1 }}
        data={getMonthStack()}
        maxToRenderPerBatch={3}
        updateCellsBatchingPeriod={1000}
        initialNumToRender={1}
        removeClippedSubviews={true}
        renderItem={({ item, index }) => {
          return handleRenderRow(item, index);
        }}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={true}
      />
    </View>
  );
};

RangeDatepicker.propTypes = {
  initialMonth: PropTypes.string,
  dayHeadings: PropTypes.arrayOf(PropTypes.string),
  availableDates: PropTypes.arrayOf(PropTypes.string),
  maxMonth: PropTypes.number,
  buttonColor: PropTypes.string,
  buttonContainerStyle: PropTypes.object,
  startDate: PropTypes.string,
  untilDate: PropTypes.string,
  minDate: PropTypes.string,
  maxDate: PropTypes.string,
  showReset: PropTypes.bool,
  showClose: PropTypes.bool,
  ignoreMinDate: PropTypes.bool,
  isHistorical: PropTypes.bool,
  onClose: PropTypes.func,
  onSelect: PropTypes.func,
  onConfirm: PropTypes.func,
  placeHolderStart: PropTypes.string,
  placeHolderUntil: PropTypes.string,
  selectedBackgroundColor: PropTypes.string,
  selectedTextColor: PropTypes.string,
  todayColor: PropTypes.string,
  infoText: PropTypes.string,
  infoStyle: PropTypes.object,
  infoContainerStyle: PropTypes.object,
  showSelectionInfo: PropTypes.bool,
  showButton: PropTypes.bool,
};

RangeDatepicker.defaultProps = {
  initialMonth: "",
  dayHeadings: ["S", "M", "T", "W", "T", "F", "S"],
  maxMonth: 12,
  buttonColor: "green",
  buttonContainerStyle: {},
  showReset: true,
  showClose: true,
  ignoreMinDate: false,
  isHistorical: false,
  onClose: () => {},
  onSelect: () => {},
  onConfirm: () => {},
  placeHolderStart: "Start Date",
  placeHolderUntil: "Until Date",
  selectedBackgroundColor: "green",
  selectedTextColor: "white",
  todayColor: "green",
  startDate: "",
  untilDate: "",
  minDate: "",
  maxDate: "",
  infoText: "",
  infoStyle: { color: "#fff", fontSize: 13 },
  infoContainerStyle: {
    marginRight: 20,
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: "green",
    borderRadius: 20,
    alignSelf: "flex-end",
  },
  showSelectionInfo: true,
  showButton: true,
};

const styles = StyleSheet.create({
  dayHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    paddingBottom: 10,
    paddingTop: 10,
  },
  buttonWrapper: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: Variables.Colors.greyBg,
    borderTopWidth: 1,
    borderColor: Variables.Colors.borderGrey,
    alignItems: "stretch",
  },
});

export default React.memo(RangeDatepicker);

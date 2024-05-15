import React, { memo } from "react";
import { View, Text, TouchableWithoutFeedback, Dimensions } from "react-native";
import { Variables } from "../../../Theme";
import { dayJsMod } from "../helper";

const DEVICE_WIDTH = Dimensions.get("window").width;

const areEqual = (prevProps, nextProps) => {
  if (nextProps.day.type != prevProps.day.type) {
    return false;
  }

  if (nextProps.onSelectDate != prevProps.onSelectDate) {
    return false;
  }

  return true;
};

const Day = memo((props) => {
  const { day, dayProps } = props;

  const {
    dayBackgroundColor,
    pointBackgroundColor,
    selectedBackgroundColor,
    dayContainerOffset = 10,
  } = dayProps;

  const side = Math.floor(DEVICE_WIDTH / 7);
  const size = {
    width: side,
    height: side,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  };

  const dayWrapperStyle = {
    ...size,
    backgroundColor: "transparent",
  };

  const dayStyle = {
    width: side - dayContainerOffset,
    height: side - dayContainerOffset,
    backgroundColor: dayBackgroundColor || "transparent",
    position: "relative",
    borderRadius: side - dayContainerOffset,
  };

  const textDayStyle = { color: "white" };

  switch (day.type) {
    case "single":
      dayStyle.backgroundColor =
        pointBackgroundColor || selectedBackgroundColor;
      dayStyle.color = selectedBackgroundColor;
      dayWrapperStyle.backgroundColor = selectedBackgroundColor;
      dayWrapperStyle.borderRadius = side;
      textDayStyle.color = "#000";
    case "first":
      dayStyle.backgroundColor =
        pointBackgroundColor || selectedBackgroundColor;
      dayWrapperStyle.backgroundColor = selectedBackgroundColor;
      dayWrapperStyle.borderRadius = side;
      dayStyle.color = selectedBackgroundColor;
      textDayStyle.color = "#000";
      break;
    case "last":
      dayStyle.backgroundColor =
        pointBackgroundColor || selectedBackgroundColor;
      dayWrapperStyle.backgroundColor = selectedBackgroundColor;
      dayWrapperStyle.borderRadius = side;
      dayStyle.color = selectedBackgroundColor;
      textDayStyle.color = "#000";
      break;
    case "between":
      dayStyle.color = "#000";
      textDayStyle.color = "#fff";
      dayWrapperStyle.backgroundColor = "rgba(224, 186, 34, 0.3)";
      dayWrapperStyle.height = 40;
      dayWrapperStyle.marginTop = 9;
      break;
    case "disabled":
      textDayStyle.color = Variables.Colors.borderGrey;
    case "blockout":
      textDayStyle.color = "#000";
    default:
      break;
  }

  if (day.date) {
    if (day.type == "disabled")
      return (
        <TouchableWithoutFeedback activeOpacity={1}>
          <View style={dayWrapperStyle}>
            <View style={{ ...dayStyle, justifyContent: "center" }}>
              <Text
                style={{
                  ...textDayStyle,
                  textAlign: "center",
                  fontSize: Math.floor(DEVICE_WIDTH / 26),
                  color: Variables.Colors.borderGrey,
                }}
              >
                {dayJsMod(day.date, "YYYYMMDD").date()}
              </Text>
              {day.date == dayJsMod().format("YYYYMMDD") ? (
                <View
                  style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    justifyContent: "center",
                    backgroundColor: "transparent",
                  }}
                >
                  <Text
                    style={{
                      fontSize: Math.floor(DEVICE_WIDTH / 17),
                      fontWeight: "bold",
                      color: "#ccc",
                      textAlign: "center",
                    }}
                  >
                    __
                  </Text>
                </View>
              ) : null}
            </View>
          </View>
        </TouchableWithoutFeedback>
      );
    else if (day.type == "blockout") {
      const strikeTop = Math.floor(DEVICE_WIDTH / -22);
      return (
        <TouchableWithoutFeedback activeOpacity={1}>
          <View style={dayWrapperStyle}>
            <View style={{ ...dayStyle, justifyContent: "center" }}>
              <Text
                style={{
                  ...textDayStyle,
                  textAlign: "center",
                  backgroundColor: "transparent",
                  fontSize: Math.floor(DEVICE_WIDTH / 26),
                }}
              >
                {dayJsMod(day.date, "YYYYMMDD").date()}
              </Text>
              <View
                style={{
                  position: "absolute",
                  top: strikeTop,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  justifyContent: "center",
                  backgroundColor: "transparent",
                }}
              >
                <Text
                  style={{
                    fontSize: Math.floor(DEVICE_WIDTH / 17),
                    color: "#ccc",
                    textAlign: "center",
                  }}
                >
                  __
                </Text>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      );
    } else
      return (
        <TouchableWithoutFeedback
          activeOpacity={1}
          onPress={() => props.onSelectDate(dayJsMod(day.date, "YYYYMMDD"))}
        >
          <View style={[dayWrapperStyle]}>
            <View style={{ ...dayStyle, justifyContent: "center" }}>
              <Text
                style={{
                  ...textDayStyle,
                  textAlign: "center",
                  backgroundColor: "transparent",
                  fontSize: Math.floor(DEVICE_WIDTH / 26),
                  color: textDayStyle.color,
                  fontFamily: "Urbanist-SemiBold",
                }}
              >
                {dayJsMod(day.date, "YYYYMMDD").date()}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      );
  } else
    return (
      <TouchableWithoutFeedback activeOpacity={1}>
        <View style={dayWrapperStyle}>
          <View style={{ ...dayStyle, ...size, justifyContent: "center" }}>
            <Text
              style={{
                ...textDayStyle,
                textAlign: "center",
                fontSize: Math.floor(DEVICE_WIDTH / 26),
              }}
            >
              {null}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
}, areEqual);

export default Day;

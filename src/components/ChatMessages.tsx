import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Variables } from "../Theme";
import _ from "lodash";
import { useSelector } from "react-redux";
import { ReducerStateProps } from "../containers/Inbox/InterfaceProps";
import moment from "moment";

interface ChatProps {
  item?: {
    message: string;
    receiver: any;
    sender: any;
  };
}

const ChatMessages = (item: any) => {
  const [profileDetailsData] = useSelector((state: ReducerStateProps) => [
    state.user.profileDetailsData,
  ]);
  const [time, setTime] = useState(null);
  // useEffect(() => {
  //   // convertUTCToLocalTime();
  //   setTime(
  //     moment(
  //       _.get(item, "chatData.sendDateTime", null)
  //         ? _.get(item, "chatData.sendDateTime", null)
  //         : _.get(item, "chatData.createdAt.date", null)
  //     ).format("hh:mm")
  //   );
  // }, []);

  const convertUTCToLocalTime = () => {
    let date = new Date(
      _.get(item, "chatData.sendDateTime", null)
        ? _.get(item, "chatData.sendDateTime", null)
        : _.get(item, "chatData.createdAt.date", null)
    );
    const milliseconds = Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds()
    );
    const localTime = new Date(milliseconds);
    localTime.getDate(); // local date
    let time = localTime.getHours() + ":" + localTime.getMinutes(); // local hour

    setTime(time);
  };

  return (
    <>
      <View style={{ flex: 1 }}>
        {_.get(item, "chatData.sender_id", null) ==
        _.get(profileDetailsData, "verifiedInfo.id", null) ? (
          <View style={styles.leftMessageContainer}>
            <View style={styles.mesageBubble}>
              <View style={{ maxWidth: "77%" }}>
                <Text style={styles.leftText}>
                  {_.get(item, "chatData.message", null)}
                </Text>
              </View>
              <View
                style={{
                  paddingLeft: 10,
                }}
              >
                {_.get(item, "chatData.tempMgs", null) ? (
                  <Image
                    style={{ width: 10, height: 10 }}
                    source={require("../assets/Images/ChatTimer.png")}
                  />
                ) : (
                  <Text style={[styles.leftTimeTxt]}>
                    {moment(
                      _.get(item, "chatData.sendDateTime", null)
                        ? _.get(item, "chatData.sendDateTime", null)
                        : _.get(item, "chatData.createdAt", null)
                    ).format("hh:mm")}
                  </Text>
                )}
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.rightMessageContainer}>
            <View style={styles.rightMessageBubble}>
              <View style={{ maxWidth: "77%" }}>
                <Text style={styles.rightText}>
                  {_.get(item, "chatData.message", null)}
                </Text>
              </View>
              <View
                style={{
                  paddingLeft: 10,
                }}
              >
                <Text style={styles.rightTimeTxt}>
                  {moment(
                    _.get(item, "chatData.sendDateTime", null)
                      ? _.get(item, "chatData.sendDateTime", null)
                      : _.get(item, "chatData.createdAt", null)
                  ).format("hh:mm")}
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    height: 140,
    width: 150,
    borderRadius: 20,
  },
  leftMessageContainer: {
    flex: 1,
    alignItems: "flex-end",
    marginBottom: 7,
    marginTop: 7,
    marginRight: 20,
  },
  rightMessageContainer: {
    flex: 1,
    alignItems: "flex-start",
    marginVertical: 7,
    marginLeft: 5,
  },
  mesageBubble: {
    backgroundColor: Variables.Colors.yellow,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginLeft: 10,
    borderRadius: 5,
    maxWidth: "75%",
    flexDirection: "row",
    alignItems: "flex-end",
  },
  imageBubble: {
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  leftText: {
    color: Variables.Colors.blackBg,
    fontFamily: "Urbanist-Regular",
    fontSize: 16,
  },
  rightText: {
    color: Variables.Colors.white,
    fontFamily: "Urbanist-Regular",
    fontSize: 16,
  },
  rightMessageBubble: {
    backgroundColor: Variables.Colors.carGrey,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 0,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginLeft: 10,
    borderRadius: 5,
    maxWidth: "60%",
    flexDirection: "row",
    alignItems: "flex-end",
    flexShrink: 1,
  },
  rigthText: {
    color: Variables.Colors.chatWhite,
    fontFamily: "Urbanist-Regular",
    fontSize: 16,
  },
  rightTimeTxt: {
    color: Variables.Colors.locationGrey,
    fontFamily: "Urbanist-Regular",
    fontSize: 12,
  },
  leftTimeTxt: {
    color: Variables.Colors.activeTab,
    fontFamily: "Urbanist-Regular",
    fontSize: 13,
  },
});

export default ChatMessages;

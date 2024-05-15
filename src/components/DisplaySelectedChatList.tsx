import React from "react";

import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { FontStyle, Images, Variables } from "../Theme";
import moment from "moment";
import { navigate } from "../navigators/RootNavigation";
import _ from "lodash";
import FastImageView from "./FastImageView";

const DisplaySelectedChatList = ({ item }: any) => {
  const handleNavigation = (item: any) => {
    navigate("ChatScreen", { userData: item });
  };

  // const time = item.time;
  // const chatTime = moment(time).format('hh:mm A');

  // const messages = item.messages[item.messages.length - 1];

  return (
    <TouchableOpacity
      style={styles.rowView}
      onPress={() => handleNavigation(item)}
    >
      {_.get(item, "contactOwner", null) ? (
        <>
          <View style={styles.leftUserImg}>
            {_.find(item?.contactOwner?.profilePicture) ? (
              <FastImageView
                source={{
                  uri: _.get(item, "contactOwner.profilePicture", null),
                }}
                style={{ height: "100%", width: "100%", borderRadius: 5 }}
              />
            ) : (
              <Image
                source={Images.userPlaceholder}
                style={{
                  height: "100%",
                  width: "100%",
                  borderRadius: 5,
                }}
              />
            )}
          </View>
          <View style={styles.centerUserInfo}>
            <Text style={[styles.nameTxt, FontStyle.urbanistBold]}>
              {_.get(item, "contactOwner.fullName", null)}
            </Text>
            {/* <Text
          style={[styles.messageTxt, FontStyle.urbanistMedium]}
          numberOfLines={1}
        >
          I have booked your ryde
        </Text> */}
          </View>
        </>
      ) : (
        <>
          <View style={styles.leftUserImg}>
            {_.find(item?.contactCustomer?.profilePicture) ? (
              <FastImageView
                source={{
                  uri: _.get(item, "contactCustomer.profilePicture", null),
                }}
                style={{ height: "100%", width: "100%", borderRadius: 5 }}
              />
            ) : (
              <Image
                source={Images.userPlaceholder}
                style={{
                  height: "100%",
                  width: "100%",
                  borderRadius: 5,
                }}
              />
            )}
          </View>
          <View style={styles.centerUserInfo}>
            <Text style={[styles.nameTxt, FontStyle.urbanistBold]}>
              {_.get(item, "contactCustomer.fullName", null)}
            </Text>
            {/* <Text
          style={[styles.messageTxt, FontStyle.urbanistMedium]}
          numberOfLines={1}
        >
          I have booked your ryde
        </Text> */}
          </View>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  leftUserImg: {
    width: "18%",
    justifyContent: "center",
    height: "100%",
  },
  outerView: {
    flex: 1,
    width: "93%",
    alignSelf: "center",
    height: "100%",
  },
  rowView: {
    flexDirection: "row",
    width: "100%",
    marginTop: Variables.FontSize.regular,
    height: Variables.MetricsSizes.large * 2 + Variables.MetricsSizes.tiny,
  },
  nameTxt: {
    color: Variables.Colors.white,
    fontSize: 18,
  },
  messageTxt: {
    color: Variables.Colors.locationGrey,
    fontSize: 14,
    width: "90%",
    marginTop: 5,
  },
  centerUserInfo: {
    width: "82%",
    justifyContent: "center",
    paddingLeft: Variables.MetricsSizes.regular,
  },
  rightStatus: {
    width: "23%",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  dateTxt: {
    color: Variables.Colors.locationGrey,
    fontSize: 14,
  },
});

export default DisplaySelectedChatList;

import React from "react";

import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { CommonStyles, FontStyle, Images, Variables } from "../Theme";
import moment from "moment";
import { navigate } from "../navigators/RootNavigation";
import _ from "lodash";
import FastImageView from "./FastImageView";

const DisplayChatList = ({ item }: any) => {
  const handleNavigation = (item: any) => {
    navigate("ChatScreen", { userData: item });
  };

  return (
    <TouchableOpacity
      style={styles.rowView}
      onPress={() => handleNavigation(item)}
    >
      <View style={styles.leftUserImg}>
        {_.get(item, "profilePicture", null) !== null ? (
          <FastImageView
            source={{ uri: _.get(item, "profilePicture", null) }}
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
            resizeMode="contain"
          />
        )}
      </View>
      <View style={styles.centerUserInfo}>
        <Text
          style={[CommonStyles.smallCommonTxt, FontStyle.urbanistSemiBold]}
          numberOfLines={1}
        >
          {_.get(item, "fullName", null)}
        </Text>
        <Text
          style={[CommonStyles.descCommonTxt, FontStyle.urbanistMedium]}
          numberOfLines={1}
        >
          {_.get(item, "message", null)}
        </Text>
      </View>
      <View style={styles.rightStatus}>
        {_.get(item, "unReadCount", null) > 0 ? (
          <View
            style={{
              height: 22,
              width: 22,
              borderRadius: 15,
              backgroundColor: Variables.Colors.darkYellow,
              marginBottom: 10,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={[
                FontStyle.urbanistMedium,
                { color: Variables.Colors.white },
              ]}
            >
              {_.get(item, "unReadCount", null)}
            </Text>
          </View>
        ) : null}
        <Text style={[styles.dateTxt, FontStyle.urbanistMedium]}>
          {/* {chatTime.slice(0, 5)} */}
        </Text>
      </View>
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
    width: "57%",
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

export default DisplayChatList;

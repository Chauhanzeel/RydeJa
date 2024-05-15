import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Layout, Variables, FontStyle, CommonStyles } from "../Theme";
import { BottomTabProps } from "./types";

const BottomTabBar: React.FC<BottomTabProps> = ({
  iconFirstImg,
  iconSecondImg,
  iconThirdImg,
  iconForthImg,
  iconFifthImg,
  iconSixthImg,
  firstTabText,
  secondTabText,
  thirdTabText,
  forthTabText,
  fifthTabText,
  sixthTabText,
  onTabPress,
  firstTabColor,
  secondTabColor,
  thirdTabColor,
  forthTabColor,
  fifthTabColor,
  sixthTabColor,
}) => {
  return (
    <View style={styles.bottomView}>
      <View style={[Layout.fill, Layout.row]}>
        <TouchableOpacity
          style={Layout.container}
          onPress={() => {
            onTabPress("tab1");
          }}
        >
          <View style={styles.selectedTab}>
            <View>{iconFirstImg}</View>
            <Text
              style={[
                CommonStyles.extraSmallCommonTxt,
                FontStyle.urbanistBold,
                {
                  color: firstTabColor,
                },
              ]}
            >
              {firstTabText}
            </Text>
          </View>
        </TouchableOpacity>

        {iconSecondImg && (
          <TouchableOpacity
            style={Layout.container}
            onPress={() => {
              onTabPress("tab2");
            }}
          >
            <View style={styles.selectedTab}>
              <View>{iconSecondImg}</View>
              <Text
                style={[
                  CommonStyles.extraSmallCommonTxt,
                  FontStyle.urbanistBold,
                  {
                    color: secondTabColor,
                  },
                ]}
              >
                {secondTabText}
              </Text>
            </View>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={Layout.container}
          onPress={() => {
            onTabPress("tab3");
          }}
        >
          <View style={styles.selectedTab}>
            <View>{iconThirdImg}</View>
            <Text
              style={[
                CommonStyles.extraSmallCommonTxt,
                FontStyle.urbanistBold,
                {
                  color: thirdTabColor,
                },
              ]}
            >
              {thirdTabText}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={Layout.container}
          onPress={() => {
            onTabPress("tab4");
          }}
        >
          <View style={styles.selectedTab}>
            <View>{iconForthImg}</View>
            <Text
              style={[
                CommonStyles.extraSmallCommonTxt,
                FontStyle.urbanistBold,
                {
                  color: forthTabColor,
                },
              ]}
            >
              {forthTabText}
            </Text>
          </View>
        </TouchableOpacity>

        {iconSixthImg && (
          <TouchableOpacity
            style={Layout.container}
            onPress={() => {
              onTabPress("tab6");
            }}
          >
            <View style={styles.selectedTab}>
              <View>{iconSixthImg}</View>
              <Text
                style={[
                  CommonStyles.extraSmallCommonTxt,
                  FontStyle.urbanistBold,
                  {
                    color: sixthTabColor,
                  },
                ]}
              >
                {sixthTabText}
              </Text>
            </View>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={Layout.container}
          onPress={() => {
            onTabPress("tab5");
          }}
        >
          <View style={styles.selectedTab}>
            <View
              style={{
                height: 25,
                justifyContent: "flex-end",
              }}
            >
              {iconFifthImg}
            </View>
            <Text
              style={[
                CommonStyles.extraSmallCommonTxt,
                FontStyle.urbanistBold,
                {
                  color: fifthTabColor,
                },
              ]}
            >
              {fifthTabText}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomView: {
    backgroundColor: Variables.Colors.darkBlack,
    height: 80,
    width: "100%",
    // position: "absolute",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  tabText: {
    alignSelf: "center",
    justifyContent: "center",
    fontSize: 12,
    marginTop: 3,
  },
  iconStyle: {
    height: 16,
    width: 16,
  },
  selectedTab: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default BottomTabBar;

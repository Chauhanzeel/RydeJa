import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import { Variables, FontStyle, Layout, CommonStyles } from "../../Theme";
import { goBack, navigate } from "../../navigators/RootNavigation";

import Header from "../../components/Header";

import BackSvg from "../../assets/Images/BackArrow.svg";
import RightArrowSvg from "../../assets/Images/Right.svg";
import { ReducerStateProps } from "../Inbox/InterfaceProps";
import { useSelector } from "react-redux";
import _ from "lodash";
import moment from "moment";

interface CancelProps {}

const UnAvailableDates: React.FC<CancelProps> = ({}) => {
  const { t } = useTranslation();
  const [isLoading, getUnavailableDatesData] = useSelector(
    (state: ReducerStateProps) => [
      state.carOwner.isLoading,
      state.carOwner.getUnavailableDatesData,
    ]
  );

  const renderUnavailabilityData = (item: any, index: any) => {
    return (
      <View style={styles.outerView}>
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              height: 22,
              width: 22,
              borderRadius: 22,
              backgroundColor: Variables.Colors.darkYellow,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={[
                FontStyle.urbanistMedium,
                { color: Variables.Colors.darkBlack },
              ]}
            >
              {index + 1}
            </Text>
          </View>
          <Text
            style={[
              FontStyle.urbanistMedium,
              {
                width: "90%",
                color: Variables.Colors.white,
                fontSize: Variables.Measures.fontSize / 1.4,
              },
            ]}
          >
            {moment(item?.fromDateTime).format("MMM DD, hh:mm A") +
              " to " +
              moment(item?.toDateTime).format("MMM DD, hh:mm A")}
            {/* {item?.fromDateTime + " to " + item?.toDateTime} */}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeAreaStyle}>
      <Header
        leftSvg={<BackSvg height={25} width={25} />}
        onLeftPress={goBack}
        centerText="Unavailable dates"
      />
      <ScrollView>
        <View style={styles.outerWidthView}>
          <Text
            style={[
              FontStyle.urbanistMedium,
              CommonStyles.descCommonTxt,
              CommonStyles.justifyText,
            ]}
          >
            Make sure to set your available pick-up and return dates and mark
            the dates when your vehicle is unavailable. This helps prevent any
            confusion between hosts and guests regarding your car's
            availability.
          </Text>
          <View style={styles.availableView}>
            <Text
              style={[
                FontStyle.urbanistBold,
                CommonStyles.smallCommonTxt,
                styles.headingTxt,
              ]}
            >
              UPCOMING DATES
            </Text>
            <View style={styles.lineView} />
            <View style={styles.rightArrowView}>
              <Text
                style={[FontStyle.urbanistMedium, CommonStyles.descCommonTxt]}
              >
                Add dates
              </Text>
              <TouchableOpacity onPress={() => navigate("SelectDate")}>
                <RightArrowSvg />
              </TouchableOpacity>
            </View>
          </View>
          <FlatList
            data={_.get(getUnavailableDatesData, "items", null) || []}
            renderItem={({ item, index }) =>
              renderUnavailabilityData(item, index)
            }
            style={styles.flatListView}
            // ListEmptyComponent={() => (
            //   <View
            //     style={{
            //       width: "100%",
            //       alignItems: "center",
            //       flex: 1,
            //       backgroundColor: "red",
            //     }}
            //   >
            //     <Text style={[FontStyle.urbanistSemiBold, styles.tripsTxt]}>
            //       No dates found.
            //     </Text>
            //   </View>
            // )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  outerView: {
    flexDirection: "row",
    width: "100%",
    marginTop: Variables.Measures.fontSize,
  },
  flatListView: {
    width: Variables.Measures.width / 1.1,
    alignSelf: "center",
    marginVertical: Variables.FontSize.regular,
  },
  tripsTxt: {
    color: Variables.Colors.white,
    fontSize: 22,
  },
  rightArrowView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    alignItems: "center",
  },
  availableView: {
    width: "100%",
    borderWidth: 1,
    borderBottomColor: Variables.Colors.borderGrey,
    paddingVertical: 20,
    marginTop: 20,
  },
  lineView: {
    width: "100%",
    marginTop: Variables.Measures.fontSize,
    borderWidth: 1,
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
  infoTxt: {
    fontSize: 16,
    color: Variables.Colors.white,
    lineHeight: 22,
  },
  headingTxt: {
    color: Variables.Colors.inputTxtColor,
  },
});

export default UnAvailableDates;

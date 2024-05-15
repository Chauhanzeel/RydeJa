import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useTranslation } from "react-i18next";

import { CommonStyles, FontStyle, Layout, Variables } from "../../Theme";

import DashedLine from "react-native-dashed-line";

import InCompleteSvg from "../../assets/Images/InComplete.svg";
import CompleteSvg from "../../assets/Images/Complete.svg";
import AlertSvg from "../../assets/Images/Alert.svg";
import { navigate } from "../../navigators/RootNavigation";
import { useDispatch, useSelector } from "react-redux";
import { carListStart } from "../../actions/customerActions";
import { ReducerStateProps } from "../Inbox/InterfaceProps";
import FastImageView from "../../components/FastImageView";
import StripeAccountSetup from "../../components/StripeAccountSetup";

interface FavoritesProps {}

const Listings: React.FC<FavoritesProps> = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [profileDetailsData] = useSelector((state: ReducerStateProps) => [
    state.user.profileDetailsData,
  ]);
  const carsData = [
    {
      carImg: require("../../assets/Images/Car4.png"),
      carName: "Tesla Model S",
      carInfo: "Limited 4dr Limited AWD",
      status: "INCOMPLETE",
      completePer: "60% complete",
    },
    {
      carImg: require("../../assets/Images/BlackCar.png"),
      carName: "Tesla Model S",
      carInfo: "Limited 4dr Limited AWD",
      status: "COMPLETE",
      completePer: "100% complete",
    },
  ];

  useEffect(() => {
    dispatch(carListStart(null));
  }, []);

  const renderCars = (item: any, index: number) => {
    return (
      <View
        style={[
          styles.carView,
          { marginBottom: index % carsData.length !== 0 ? 50 : 0 },
        ]}
      >
        <View style={styles.carImgView}>
          <FastImageView source={item.carImg} style={styles.carImgStyle} />
          <View style={styles.carWidthView}>
            <View style={styles.carDescView}>
              <View style={styles.carNameView}>
                <Text style={[FontStyle.urbanistBold, styles.carNameTxt]}>
                  {item.carName}
                </Text>
                <Text style={[FontStyle.urbanistMedium, styles.ownerNameTxt]}>
                  {item.carInfo}
                </Text>
                <Text style={[FontStyle.urbanistMedium, styles.ownerNameTxt]}>
                  {item.completePer}
                </Text>
              </View>
              <DashedLine
                dashLength={6}
                dashColor={Variables.Colors.borderGrey}
                axis="vertical"
                dashThickness={0.7}
              />
              <View style={styles.ratingsView}>
                <Text style={[FontStyle.urbanistBold, styles.statusTxt]}>
                  {item.status}
                </Text>
                {item.status === "INCOMPLETE" ? (
                  <View style={{ marginTop: 5 }}>
                    <InCompleteSvg />
                  </View>
                ) : (
                  <View style={styles.completeView}>
                    <CompleteSvg />
                  </View>
                )}
              </View>
            </View>
            <DashedLine
              dashLength={6}
              dashColor={Variables.Colors.borderGrey}
              dashThickness={0.7}
            />
            <View style={[Layout.rowFlex]}>
              <View style={styles.leftWidthView} />
              <DashedLine
                dashLength={6}
                dashColor={Variables.Colors.borderGrey}
                axis="vertical"
                dashThickness={0.7}
              />
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <ScrollView nestedScrollEnabled style={{ flex: 1 }}>
      <View
        style={{
          marginBottom: Variables.Measures.fontSize * 4,
        }}
      >
        {!profileDetailsData?.verifiedInfo?.stripeId ||
        !profileDetailsData?.verifiedInfo?.isBankDetailsAddStatus ? (
          <StripeAccountSetup />
        ) : null}

        <FlatList
          data={carsData}
          renderItem={({ item, index }: any) => renderCars(item, index)}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  completeView: {
    height: 25,
    width: 25,
    backgroundColor: Variables.Colors.success,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  statusTxt: {
    fontSize: 12,
    color: Variables.Colors.white,
  },
  ownerNameTxt: {
    fontSize: 11,
    color: Variables.Colors.white,
    marginVertical: 1,
  },
  setUpTxt: {
    fontSize: 16,
    color: Variables.Colors.white,
  },
  carView: {
    backgroundColor: Variables.Colors.carGrey,
    width: "95%",
    alignSelf: "center",
    marginTop: Variables.Measures.fontSize,
    borderRadius: 10,
  },
  carImgView: {
    height: Variables.Measures.height / 3,
    width: "100%",
  },
  carImgStyle: {
    height: Variables.Measures.height / 4.5,
    width: Variables.Measures.width / 1.06,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  carNameTxt: {
    color: Variables.Colors.white,
    fontSize: 16,
  },
  carDescView: {
    flexDirection: "row",
    height: 70,
  },
  carNameView: {
    width: "65%",
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  ratingsView: {
    alignItems: "center",
    justifyContent: "center",
    width: "30%",
  },
  carWidthView: {
    flex: 1,
    width: "100%",
  },
  leftWidthView: {
    width: "65%",
  },
  safeAreaStyle: {
    flex: 1,
    backgroundColor: Variables.Colors.darkBlack,
  },
  alertView: {
    width: "92%",
    backgroundColor: Variables.Colors.greyBg,
    alignSelf: "center",
    marginTop: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Variables.Colors.darkYellow,
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 15,
  },
  infoTxt: {
    color: Variables.Colors.white,
    fontSize: 14,
    lineHeight: 20,
    marginVertical: 8,
  },
  setUpBtnTxt: {
    color: Variables.Colors.darkYellow,
  },
});

export default Listings;

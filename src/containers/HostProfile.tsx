import React from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import { Variables, FontStyle, Images, Layout } from "../Theme";
import FastImage from "react-native-fast-image";

import StarSvg from "../assets/Images/ModalIcons/StarRatingYellow.svg";
import HeartSvg from "../assets/Images/HeartBorderWhite.svg";
import BackSvg from "../assets/Images/ProfileLeft.svg";
import { UserReviewsData } from "./MockData/UserReviewsData";
import { carsData } from "./MockData/carsData";
// import { HostedBy } from "./HostCarProfile";

import DashedLine from "react-native-dashed-line";
import { navigate } from "../navigators/RootNavigation";

interface CancelProps {}

const HostProfile: React.FC<CancelProps> = () => {
  const { t } = useTranslation();

  const RatingsReviews = () => {
    return (
      <View>
        <View
          style={[
            styles.bgYellowView,
            {
              height: 6,
              marginTop: 20,
              width: Variables.Measures.width / 1.07,
            },
          ]}
        >
          <View style={styles.blackBgView} />
        </View>
        <View style={[styles.greyBgView, { width: Variables.Measures.width }]}>
          <View style={styles.rowView}>
            <View style={styles.rightView}>
              <Text style={[FontStyle.urbanistBold, styles.headingTxt]}>
                {t("labelConst.ratingsReviews")}
              </Text>
              <View style={styles.ratingsRowView}>
                <Text style={[FontStyle.urbanistMedium, styles.ratingsTxt]}>
                  4.97
                </Text>
                <View style={{ marginHorizontal: 3 }}>
                  <StarSvg height={15} width={15} />
                </View>
                <Text style={[FontStyle.urbanistMedium, styles.ratingsTxt]}>
                  25 ratings
                </Text>
              </View>
              <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={UserReviewsData}
                renderItem={({ item, index }) => renderReviews(item, index)}
                style={{ width: "100%" }}
              />
              <View style={styles.seeAllView}>
                <Text style={[FontStyle.urbanistBold, styles.reviewsTxt]}>
                  {t("labelConst.seeAllReviews")}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const renderCars = (item: any, index: number) => {
    return (
      <TouchableOpacity
        style={[
          styles.carView,
          { marginTop: index % UserReviewsData.length !== 0 ? 15 : 0 },
        ]}
        onPress={() => navigate("HostCarProfile")}
      >
        <View style={styles.carImgView}>
          <FastImage source={item.carImg} style={styles.carImgStyle} />
          <View>
            <View style={styles.carDescView}>
              <View style={styles.carNameView}>
                <Text style={[FontStyle.urbanistMedium, styles.ownerNameTxt]}>
                  {item.ownerName}
                </Text>
                <Text style={[FontStyle.urbanistBold, styles.carNameTxt]}>
                  {item.carName}
                </Text>
              </View>
              <DashedLine
                dashLength={8}
                dashColor={Variables.Colors.borderGrey}
                axis="vertical"
              />
              <View style={styles.ratingsView}>
                <Text
                  style={[
                    FontStyle.urbanistMedium,
                    styles.ratingsTxt,
                    { marginRight: 2 },
                  ]}
                >
                  {item.ratings}
                </Text>
                <StarSvg height={15} width={15} />
                <Text
                  style={[
                    FontStyle.urbanistMedium,
                    styles.ratingsTxt,
                    { marginLeft: 2 },
                  ]}
                >
                  {item.trip}
                </Text>
              </View>
              <DashedLine
                dashLength={8}
                dashColor={Variables.Colors.borderGrey}
                axis="vertical"
              />
              <TouchableOpacity style={[Layout.container]}>
                <HeartSvg height={17} width={17} />
              </TouchableOpacity>
            </View>
            <DashedLine
              dashLength={8}
              dashColor={Variables.Colors.borderGrey}
            />
          </View>
          <View style={[Layout.rowFlex]}>
            <View style={styles.leftWidthView} />
            <DashedLine
              dashLength={8}
              dashColor={Variables.Colors.borderGrey}
              axis="vertical"
            />
            <View style={styles.centerWidthView} />
            <DashedLine
              dashLength={8}
              dashColor={Variables.Colors.borderGrey}
              axis="vertical"
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderReviews = (item: any, index: number) => {
    return (
      <View
        style={[
          styles.ratedView,
          { marginLeft: index % carsData.length !== 0 ? 10 : 0 },
        ]}
      >
        <View style={{ width: "93%", alignSelf: "center" }}>
          <View style={styles.userRowView}>
            <View style={{ width: "22%" }}>
              <FastImage source={item.userImg} style={styles.userImgStyle} />
            </View>
            <View style={{ justifyContent: "center" }}>
              <View style={Layout.row}>
                <StarSvg height={12} width={12} />
                <StarSvg height={12} width={12} />
                <StarSvg height={12} width={12} />
                <StarSvg height={12} width={12} />
                <StarSvg height={12} width={12} />
              </View>
              <Text style={[FontStyle.urbanistMedium, styles.userNameTxt]}>
                {item.userName}
              </Text>
            </View>
          </View>
          <View style={styles.userDescView}>
            <Text
              style={[FontStyle.urbanistRegular, styles.descTxt]}
              numberOfLines={4}
            >
              {item.userDesc}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeAreaStyle}>
      <StatusBar translucent backgroundColor="transparent" />
      <ScrollView style={{ height: "100%" }}>
        <View style={styles.backSvgView}>
          <BackSvg height={25} width={25} />
        </View>
        <View style={{ marginTop: 10 }}>
          <FlatList
            data={carsData}
            renderItem={({ item, index }: any) => renderCars(item, index)}
          />
        </View>
        <RatingsReviews />
        <View style={styles.carAbsoluteView}>
          <FastImage
            source={Images.carBg}
            style={{ height: 250, width: "100%" }}
          />
        </View>
        <View style={styles.hostedByView}>{/* <HostedBy /> */}</View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backSvgView: {
    position: "absolute",
    top: 30,
    left: 30,
    zIndex: 1000,
  },
  hostedByView: {
    position: "absolute",
    bottom: 20,
    width: "98%",
    alignSelf: "center",
  },
  carAbsoluteView: {
    height: 250,
    width: "100%",
    backgroundColor: "red",
    marginBottom: 100,
    marginTop: Variables.Measures.unit * 2,
  },
  ownerNameTxt: {
    color: Variables.Colors.white,
    fontSize: 11,
    marginVertical: 5,
  },
  userDescView: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginBottom: 20,
  },
  userImgStyle: {
    height: 40,
    width: 40,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Variables.Colors.darkYellow,
  },
  userRowView: {
    flexDirection: "row",
    paddingHorizontal: 5,
    borderBottomColor: Variables.Colors.borderGrey,
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  seeAllView: {
    width: "100%",
    flex: 1,
    alignItems: "flex-end",
    marginTop: 15,
  },
  ratingsRowView: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    marginLeft: 15,
  },
  reviewsTxt: {
    color: Variables.Colors.darkYellow,
    fontSize: 12,
  },
  descTxt: {
    color: Variables.Colors.white,
    fontSize: 12,
    lineHeight: 17,
  },
  userNameTxt: {
    color: Variables.Colors.chatWhite,
    fontSize: 10,
    marginTop: 4,
  },
  ratedView: {
    borderRadius: 10,
    justifyContent: "center",
    width: Variables.Measures.width / 1.5,
    backgroundColor: Variables.Colors.carGrey,
    marginTop: 10,
  },
  rightView: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 7,
  },
  headingTxt: {
    color: Variables.Colors.inputTxtColor,
    fontSize: 12,
    marginLeft: 15,
  },
  greyBgView: {
    backgroundColor: Variables.Colors.darkBlack,
    width: "95%",
    alignSelf: "center",
  },
  rowView: {
    alignSelf: "center",
    flexDirection: "row",
    paddingVertical: 10,
    width: "93%",
  },
  bgYellowView: {
    width: "95%",
    alignSelf: "center",
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    backgroundColor: Variables.Colors.darkYellow,
  },
  blackBgView: {
    width: "100%",
    alignSelf: "center",
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    backgroundColor: Variables.Colors.darkBlack,
    position: "absolute",
    top: 3,
    height: "100%",
  },
  safeAreaStyle: {
    flex: 1,
    backgroundColor: Variables.Colors.darkBlack,
  },
  bgImgView: {
    height: Variables.Measures.height / 2.5,
    width: Variables.Measures.width,
    alignItems: "center",
    justifyContent: "center",
  },
  imgView: {
    height: Variables.Measures.height / 1.8,
    width: Variables.Measures.width * 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  headerView: {
    position: "absolute",
    top: 20,
    height: 30,
    width: "90%",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  carView: {
    backgroundColor: Variables.Colors.carGrey,
    width: "93%",
    alignSelf: "center",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  carImgView: {
    height: Variables.Measures.height / 2.2,
    width: "100%",
  },
  carImgStyle: {
    height: Variables.Measures.height / 3,
    width: Variables.Measures.width / 1.08,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  carNameTxt: {
    color: Variables.Colors.white,
    fontSize: 16,
  },
  carDescView: {
    flexDirection: "row",
    height: 65,
  },
  carNameView: {
    width: "50%",
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  ratingsView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "30%",
  },
  leftWidthView: {
    width: "50%",
  },
  centerWidthView: {
    width: "30%",
  },
  ratingsTxt: {
    fontSize: 12,
    color: Variables.Colors.chatWhite,
  },
});
export default HostProfile;

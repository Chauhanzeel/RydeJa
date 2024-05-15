import React, { useEffect } from "react";
import { CommonStyles, FontStyle, Variables, Images } from "../../Theme";
import {
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
  RefreshControl,
} from "react-native";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "../../components/Header";
import BackSvg from "../../assets/Images/BackArrow.svg";
import Calender from "../../assets/Images/CalenderWhite.svg";
import IconHistory from "../../assets/Images/iconHistory.svg";
import PricingSvg from "../../assets/Images/Pricing.svg";
import IconPreferences from "../../assets/Images/iconPreferences.svg";
import RightArrowGreySvg from "../../assets/Images/RightArrowGrey.svg";
import LocationWhiteSvg from "../../assets/Images/iconLocation.svg";
import GuestSvg from "../../assets/Images/iconGuest.svg";
import PhotoSvg from "../../assets/Images/iconPhotos.svg";
import DetailSvg from "../../assets/Images/iconDetails.svg";
import ExtraSvg from "../../assets/Images/iconExtras.svg";
import DistanceSvg from "../../assets/Images/iconDistance.svg";
import ProtectionSvg from "../../assets/Images/iconProtrction.svg";
import _ from "lodash";
import FastImageView from "../../components/FastImageView";
import { RouteProp } from "@react-navigation/native";
import { navigate } from "../../navigators/RootNavigation";
import { useSelector } from "react-redux";
import { ReducerStateProps } from "../Inbox/InterfaceProps";
import ContentLoader, { Rect, Circle } from "react-content-loader/native";

interface CreateProfileProps {
  onClick: (val: number) => void;
  routeData?: any;
}
const VehicleDetails: React.FC<CreateProfileProps> = ({ onClick }) => {
  const { t } = useTranslation();
  const [isLoading, ownerCarViewData] = useSelector(
    (state: ReducerStateProps) => [
      state.carOwner.isLoading,
      state.carOwner.ownerCarViewData,
    ]
  );

  const LoadingView = () => {
    return (
      <SafeAreaView style={CommonStyles.safeAreaStyle}>
        <StatusBar
          backgroundColor={Variables.Colors.blackBg}
          barStyle="light-content"
          translucent
        />
        <ScrollView
          style={{
            height: Variables.Measures.height,
          }}
        >
          <View
            style={{
              width: Variables.Measures.width,
              height: 50,
              marginTop: Variables.FontSize.regular,
            }}
          >
            <ContentLoader
              backgroundColor={Variables.Colors.absoluteBgGrey}
              foregroundColor={Variables.Colors.grey}
            >
              <Rect x="18" y="0" rx="4" ry="4" width="30" height="30" />
              <Rect x="65" y="0" rx="4" ry="4" width="150" height="30" />
            </ContentLoader>
          </View>

          <ContentLoader
            style={{
              alignSelf: "center",
            }}
            backgroundColor={Variables.Colors.absoluteBgGrey}
            foregroundColor={Variables.Colors.grey}
            width={Variables.Measures.width / 1.01}
            height={Variables.Measures.width / 2.2}
          >
            <Rect
              x="18"
              y="0"
              rx="12"
              ry="12"
              width={Variables.Measures.width / 1.12}
              height={Variables.Measures.width / 2.3}
            />
          </ContentLoader>

          <View
            style={{
              width: Variables.Measures.width,
              height: 60,
              marginTop: Variables.FontSize.small,
            }}
          >
            <ContentLoader
              backgroundColor={Variables.Colors.absoluteBgGrey}
              foregroundColor={Variables.Colors.grey}
            >
              <Rect
                x="18"
                y="0"
                rx="4"
                ry="4"
                width={Variables.FontSize.large * 4}
                height={Variables.FontSize.small}
              />
              <Rect
                x="18"
                y="20"
                rx="4"
                ry="4"
                width={Variables.FontSize.large * 3}
                height={Variables.FontSize.small}
              />

              <Rect
                x="18"
                y="40"
                rx="4"
                ry="4"
                width={Variables.FontSize.large * 2}
                height={Variables.FontSize.small}
              />
            </ContentLoader>
          </View>

          <View
            style={{
              width: Variables.Measures.width / 1.1,
              height: 50,
              marginTop: Variables.FontSize.small,
              alignSelf: "center",
            }}
          >
            <ContentLoader
              backgroundColor={Variables.Colors.absoluteBgGrey}
              foregroundColor={Variables.Colors.grey}
              width="100%"
              height={50}
            >
              <Rect x="0" y="10" rx="4" ry="4" width={30} height={30} />
              <Rect x="50" y="18" rx="4" ry="4" width={120} height={15} />
              <Rect x="0" y="48" rx="4" ry="4" width="100%" height={2} />
            </ContentLoader>
          </View>

          <View
            style={{
              width: Variables.Measures.width / 1.1,
              height: 50,
              alignSelf: "center",
            }}
          >
            <ContentLoader
              backgroundColor={Variables.Colors.absoluteBgGrey}
              foregroundColor={Variables.Colors.grey}
              width="100%"
              height={50}
            >
              <Rect x="0" y="10" rx="4" ry="4" width={30} height={30} />
              <Rect x="50" y="18" rx="4" ry="4" width={120} height={15} />
              <Rect x="0" y="48" rx="4" ry="4" width="100%" height={2} />
            </ContentLoader>
          </View>

          <View
            style={{
              width: Variables.Measures.width / 1.1,
              height: 50,
              alignSelf: "center",
            }}
          >
            <ContentLoader
              backgroundColor={Variables.Colors.absoluteBgGrey}
              foregroundColor={Variables.Colors.grey}
              width="100%"
              height={50}
            >
              <Rect x="0" y="10" rx="4" ry="4" width={30} height={30} />
              <Rect x="50" y="18" rx="4" ry="4" width={120} height={15} />
              <Rect x="0" y="48" rx="4" ry="4" width="100%" height={2} />
            </ContentLoader>
          </View>

          <View
            style={{
              width: Variables.Measures.width / 1.1,
              height: 50,
              alignSelf: "center",
            }}
          >
            <ContentLoader
              backgroundColor={Variables.Colors.absoluteBgGrey}
              foregroundColor={Variables.Colors.grey}
              width="100%"
              height={50}
            >
              <Rect x="0" y="10" rx="4" ry="4" width={30} height={30} />
              <Rect x="50" y="18" rx="4" ry="4" width={120} height={15} />
              <Rect x="0" y="48" rx="4" ry="4" width="100%" height={2} />
            </ContentLoader>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };
  return isLoading ? (
    <LoadingView />
  ) : (
    <>
      <StatusBar
        backgroundColor={Variables.Colors.blackBg}
        barStyle="light-content"
      />
      <SafeAreaView style={CommonStyles.safeAreaStyle}>
        <Header
          leftSvg={<BackSvg height={25} width={25} />}
          onLeftPress={() => onClick(2)}
          centerText={t("labelConst.yourCar")}
        />
        <ScrollView>
          <View style={styles.container}>
            {_.get(ownerCarViewData, "carAssets[0].image", null) ? (
              <FastImageView
                source={{
                  uri: _.get(ownerCarViewData, "carAssets[0].image", null),
                }}
                style={styles.carImgStyle}
              />
            ) : (
              <Image
                source={Images.CarPlaceHolder}
                style={styles.carImgStyle}
              />
            )}
            <Text style={[FontStyle.urbanistBold, styles.title]}>
              {
                // _.get(ownerCarViewData, "year", "") + " " +
                _.get(ownerCarViewData, "name", null)
                //+ " " + _.get(ownerCarViewData, "model", null)
              }
            </Text>
            {(_.get(ownerCarViewData, "style", null) ||
              _.get(ownerCarViewData, "style", null)) && (
              <Text style={[FontStyle.urbanistMedium, styles.desc]}>
                {_.get(ownerCarViewData, "style", null) +
                  " " +
                  _.get(ownerCarViewData, "trim", null)}
              </Text>
            )}
            {_.get(ownerCarViewData, "trip", null) > 0 ? (
              <Text style={[FontStyle.urbanistMedium, styles.desc]}>
                {_.get(ownerCarViewData, "trip", null) > 1
                  ? _.get(ownerCarViewData, "trip", null) + " trips"
                  : _.get(ownerCarViewData, "trip", null) + " trip"}
              </Text>
            ) : (
              <Text style={[FontStyle.urbanistMedium, styles.desc]}>
                NO trips
              </Text>
            )}
            <View style={styles.details}>
              {/* 1 */}
              {/* <View style={styles.row}>
                <View style={{ width: "8%" }}>
                  <Calender width={18} height={18} />
                </View>
                <View
                  style={{
                    width: "92%",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <Text
                    style={[
                      FontStyle.urbanistRegular,
                      { fontSize: 14, color: Variables.Colors.white },
                    ]}
                  >
                    Calendar
                  </Text>
                  <View
                    style={{
                      width: "5%",
                      alignItems: "center",
                    }}
                  >
                    <RightArrowGreySvg />
                  </View>
                </View>
              </View> */}
              {/* 2 */}
              <TouchableOpacity
                style={styles.row1}
                onPress={() => {
                  navigate("AboutCar1");
                }}
              >
                <View style={{ width: "8%" }}>
                  <PricingSvg width={18} height={18} />
                </View>
                <View
                  style={{
                    width: "92%",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <Text
                    style={[
                      FontStyle.urbanistRegular,
                      { fontSize: 14, color: Variables.Colors.white },
                    ]}
                  >
                    Pricing & discounts
                  </Text>
                  <View
                    style={{
                      width: "5%",
                      alignItems: "center",
                    }}
                  >
                    <RightArrowGreySvg />
                  </View>
                </View>
              </TouchableOpacity>
              {/* 3 */}
              <TouchableOpacity
                style={styles.row1}
                onPress={() => {
                  navigate("Address");
                }}
              >
                <View style={{ width: "8%" }}>
                  <LocationWhiteSvg width={18} height={18} />
                </View>
                <View
                  style={{
                    width: "92%",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <Text
                    style={[
                      FontStyle.urbanistRegular,
                      { fontSize: 14, color: Variables.Colors.white },
                    ]}
                  >
                    Location & delivery
                  </Text>
                  <View
                    style={{
                      width: "5%",
                      alignItems: "center",
                    }}
                  >
                    <RightArrowGreySvg />
                  </View>
                </View>
              </TouchableOpacity>
              {/* 4 */}
              {/* <View style={styles.row1}>
                <View style={{ width: "8%" }}>
                  <GuestSvg width={18} height={18} />
                </View>
                <View
                  style={{
                    width: "92%",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <Text
                    style={[
                      FontStyle.urbanistRegular,
                      { fontSize: 14, color: Variables.Colors.white },
                    ]}
                  >
                    Guest instructions
                  </Text>
                  <View
                    style={{
                      width: "5%",
                      alignItems: "center",
                    }}
                  >
                    <RightArrowGreySvg />
                  </View>
                </View>
              </View> */}
              {/* 5 */}
              <TouchableOpacity
                style={styles.row1}
                onPress={() => {
                  navigate("TakePhoto");
                }}
              >
                <View style={{ width: "8%" }}>
                  <PhotoSvg width={18} height={18} />
                </View>
                <View
                  style={{
                    width: "92%",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <Text
                    style={[
                      FontStyle.urbanistRegular,
                      { fontSize: 14, color: Variables.Colors.white },
                    ]}
                  >
                    Photos
                  </Text>
                  <View
                    style={{
                      width: "5%",
                      alignItems: "center",
                    }}
                  >
                    <RightArrowGreySvg />
                  </View>
                </View>
              </TouchableOpacity>
              {/* 6 */}
              <TouchableOpacity
                style={styles.row1}
                onPress={() => {
                  navigate("AboutCar1", { details: true });
                }}
              >
                <View style={{ width: "8%" }}>
                  <DetailSvg width={18} height={18} />
                </View>
                <View
                  style={{
                    width: "92%",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <Text
                    style={[
                      FontStyle.urbanistRegular,
                      { fontSize: 14, color: Variables.Colors.white },
                    ]}
                  >
                    Details
                  </Text>
                  <View
                    style={{
                      width: "5%",
                      alignItems: "center",
                    }}
                  >
                    <RightArrowGreySvg />
                  </View>
                </View>
              </TouchableOpacity>
              {/* 7 */}
              {/* <View style={styles.row1}>
                <View style={{ width: "8%" }}>
                  <ExtraSvg width={18} height={18} />
                </View>
                <View
                  style={{
                    width: "92%",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <Text
                    style={[
                      FontStyle.urbanistRegular,
                      { fontSize: 14, color: Variables.Colors.white },
                    ]}
                  >
                    Extras
                  </Text>
                  <View
                    style={{
                      width: "5%",
                      alignItems: "center",
                    }}
                  >
                    <RightArrowGreySvg />
                  </View>
                </View>
              </View> */}
              {/* 8 */}
              {/* <View style={styles.row1}>
                <View style={{ width: "8%" }}>
                  <DistanceSvg width={18} height={18} />
                </View>
                <View
                  style={{
                    width: "92%",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <Text
                    style={[
                      FontStyle.urbanistRegular,
                      { fontSize: 14, color: Variables.Colors.white },
                    ]}
                  >
                    Distance included
                  </Text>
                  <View
                    style={{
                      width: "5%",
                      alignItems: "center",
                    }}
                  >
                    <RightArrowGreySvg />
                  </View>
                </View>
              </View> */}
              {/* 9 */}
              {/* <TouchableOpacity
                style={styles.row1}
                onPress={() => {
                  navigate("ProtectionPlans");
                }}
              >
                <View style={{ width: "8%" }}>
                  <ProtectionSvg width={18} height={18} />
                </View>
                <View
                  style={{
                    width: "92%",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <Text
                    style={[
                      FontStyle.urbanistRegular,
                      { fontSize: 14, color: Variables.Colors.white },
                    ]}
                  >
                    Vehicle protection
                  </Text>
                  <View
                    style={{
                      width: "5%",
                      alignItems: "center",
                    }}
                  >
                    <RightArrowGreySvg />
                  </View>
                </View>
              </TouchableOpacity> */}
              {/* 10 */}
              {/* {_.get(ownerCarViewData, "trip", null) > 0 && ( */}
              <TouchableOpacity
                style={styles.row1}
                onPress={() => {
                  navigate("TripHistory");
                }}
              >
                <View style={{ width: "8%" }}>
                  <IconHistory width={18} height={18} />
                </View>
                <View
                  style={{
                    width: "92%",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <Text
                    style={[
                      FontStyle.urbanistRegular,
                      { fontSize: 14, color: Variables.Colors.white },
                    ]}
                  >
                    Trip History
                  </Text>
                  <View
                    style={{
                      width: "5%",
                      alignItems: "center",
                    }}
                  >
                    <RightArrowGreySvg />
                  </View>
                </View>
              </TouchableOpacity>
              {/* )} */}
              {/* 11 */}
              <TouchableOpacity
                style={styles.row2}
                onPress={() => {
                  navigate("AdvanceNotice");
                }}
              >
                <View style={{ width: "8%" }}>
                  <IconPreferences width={18} height={18} />
                </View>
                <View
                  style={{
                    width: "92%",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <Text
                    style={[
                      FontStyle.urbanistRegular,
                      { fontSize: 14, color: Variables.Colors.white },
                    ]}
                  >
                    Trip Preferences
                  </Text>
                  <View
                    style={{
                      width: "5%",
                      alignItems: "center",
                    }}
                  >
                    <RightArrowGreySvg />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Variables.Measures.width / 1.12,
    alignSelf: "center",
    marginTop: Variables.MetricsSizes.small,
  },
  carImgStyle: {
    height: Variables.Measures.height / 4,
    width: "100%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  title: {
    fontSize: 16,
    color: Variables.Colors.white,
    marginTop: Variables.MetricsSizes.regular,
  },
  desc: {
    fontSize: 11,
    color: Variables.Colors.white,
  },
  details: {
    marginTop: Variables.FontSize.regular,
    width: "100%",
    marginBottom: 80,
  },
  row: {
    width: "100%",
    flexDirection: "row",
    borderBottomColor: Variables.Colors.inputTxtColor,
    borderBottomWidth: 1,
    paddingBottom: 10,
    alignItems: "center",
  },
  row1: {
    width: "100%",
    flexDirection: "row",
    borderBottomColor: Variables.Colors.inputTxtColor,
    borderBottomWidth: 1,
    paddingBottom: 10,
    alignItems: "center",
    marginTop: Variables.MetricsSizes.regular,
  },
  row2: {
    width: "100%",
    flexDirection: "row",
    paddingBottom: 10,
    alignItems: "center",
    marginTop: Variables.MetricsSizes.regular,
  },
});

export default VehicleDetails;

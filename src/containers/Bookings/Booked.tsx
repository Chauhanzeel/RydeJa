import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
  Platform,
  FlatList,
  RefreshControl,
  ScrollView,
} from "react-native";
import { CommonStyles, FontStyle, Images, Variables } from "../../Theme";
import { useTranslation } from "react-i18next";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { ReducerStateProps } from "../Inbox/InterfaceProps";
import { useIsFocused } from "@react-navigation/native";
import { bookedTripListStart } from "../../actions/customerActions";
import { navigate } from "../../navigators/RootNavigation";
import ContentLoader, { Rect, Circle } from "react-content-loader/native";
import FastImageView from "../../components/FastImageView";
import PenSvg from "../../assets/Images/PencilSvg.svg";
import RightArrowSvg from "../../assets/Images/TransactionRightGrey.svg";
import RightYellowArrowSvg from "../../assets/Images/RightYellowArrow.svg";
import moment from "moment";
import ParishModal from "../../components/ParishModal";
import { Measures } from "../../Theme/variables";

interface BookingProps {}

const Booked: React.FC<BookingProps> = () => {
  const { t } = useTranslation();
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [searchModal, setSearchModal] = useState(false);
  const [item, setItem] = useState(null);

  const [isLoading, bookedTripListData, profileDetailsData, loginData] =
    useSelector((state: ReducerStateProps) => [
      state.customer.isLoading,
      state.customer.bookedTripListData,
      state.user.profileDetailsData,
      state.auth.loginData,
    ]);
  const userRole = _.get(profileDetailsData, "verifiedInfo.role", null);

  useEffect(() => {
    if (isFocused && loginData) {
      let params = {
        type: "booked",
      };
      dispatch(bookedTripListStart(params));
    }
  }, [isFocused, loginData]);

  const LoadingView = () => {
    return (
      <ScrollView
        style={styles.outerView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Variables.Colors.white}
          />
        }
      >
        <View style={{ marginTop: 20 }}>
          <ContentLoader
            backgroundColor={Variables.Colors.absoluteBgGrey}
            foregroundColor={Variables.Colors.grey}
            width={Variables.Measures.width}
            height={Variables.Measures.width / 1.9}
          >
            <Rect
              x="10"
              y="0"
              rx="4"
              ry="4"
              width={Variables.Measures.width / 1.06}
              height={Variables.Measures.width / 1.9}
            />
            <Rect
              x="10"
              y={Variables.Measures.width / 3}
              rx="4"
              ry="4"
              width={Variables.Measures.width / 1.06}
              height={3}
            />
            <Rect
              x="30"
              y={Variables.Measures.width / 2.5}
              rx="4"
              ry="4"
              width={Variables.Measures.width / 4.5}
              height={8}
            />

            <Rect
              x="30"
              y={Variables.Measures.width / 2.2}
              rx="4"
              ry="4"
              width={Variables.Measures.width / 4}
              height={8}
            />

            <Rect
              x={Variables.Measures.width / 2.3}
              y={Variables.Measures.width / 3}
              rx="4"
              ry="4"
              width={2}
              height={Variables.Measures.width / 2.5}
            />

            <Rect
              x={Variables.Measures.width / 2.1}
              y={Variables.Measures.width / 2.4}
              rx="4"
              ry="4"
              width={Variables.Measures.width / 4}
              height={8}
            />

            <Rect
              x={Variables.Measures.width / 1.3}
              y={Variables.Measures.width / 3}
              rx="4"
              ry="4"
              width={2}
              height={Variables.Measures.width / 2.5}
            />

            <Circle
              cx={Variables.Measures.width / 1.15}
              cy={Variables.Measures.width / 2.5}
              r="12"
            />

            <Rect
              x={Variables.Measures.width / 1.25}
              y={Variables.Measures.width / 2.2}
              rx="4"
              ry="4"
              width={Variables.Measures.width / 6.5}
              height={8}
            />
          </ContentLoader>

          <View style={{ marginTop: 15 }} />

          <ContentLoader
            backgroundColor={Variables.Colors.absoluteBgGrey}
            foregroundColor={Variables.Colors.grey}
            width={Variables.Measures.width}
            height={Variables.Measures.width / 1.9}
          >
            <Rect
              x="10"
              y="0"
              rx="4"
              ry="4"
              width={Variables.Measures.width / 1.06}
              height={Variables.Measures.width / 1.9}
            />
            <Rect
              x="10"
              y={Variables.Measures.width / 3}
              rx="4"
              ry="4"
              width={Variables.Measures.width / 1.06}
              height={3}
            />
            <Rect
              x="30"
              y={Variables.Measures.width / 2.5}
              rx="4"
              ry="4"
              width={Variables.Measures.width / 4.5}
              height={8}
            />

            <Rect
              x="30"
              y={Variables.Measures.width / 2.2}
              rx="4"
              ry="4"
              width={Variables.Measures.width / 4}
              height={8}
            />

            <Rect
              x={Variables.Measures.width / 2.3}
              y={Variables.Measures.width / 3}
              rx="4"
              ry="4"
              width={2}
              height={Variables.Measures.width / 2.5}
            />

            <Rect
              x={Variables.Measures.width / 2.1}
              y={Variables.Measures.width / 2.4}
              rx="4"
              ry="4"
              width={Variables.Measures.width / 4}
              height={8}
            />

            <Rect
              x={Variables.Measures.width / 1.3}
              y={Variables.Measures.width / 3}
              rx="4"
              ry="4"
              width={2}
              height={Variables.Measures.width / 2.5}
            />

            <Circle
              cx={Variables.Measures.width / 1.15}
              cy={Variables.Measures.width / 2.5}
              r="12"
            />

            <Rect
              x={Variables.Measures.width / 1.25}
              y={Variables.Measures.width / 2.2}
              rx="4"
              ry="4"
              width={Variables.Measures.width / 6.5}
              height={8}
            />
          </ContentLoader>
        </View>
      </ScrollView>
    );
  };

  const bookedItem = (carItem: any, index: any) => {
    const assetImage = _.first(_.get(carItem, "car.carAssets", null));

    return (
      <View style={styles.outerView}>
        <TouchableOpacity
          style={styles.carView}
          onPress={() => {
            navigate("UpdateBookingCar", {
              bookID: _.get(carItem, "id", null),
              status: _.get(carItem, "status", null),
            });
          }}
        >
          {_.get(assetImage, "image", null) ? (
            <FastImageView
              source={{
                uri: _.get(assetImage, "image", null),
              }}
              style={styles.carImgStyle}
            />
          ) : (
            <Image source={Images.CarPlaceHolder} style={styles.carImgStyle} />
          )}

          <View
            style={{
              width: "100%",
            }}
          >
            <View
              style={{
                width: "100%",
                alignSelf: "center",
                flexDirection: "row",
                borderBottomColor: Variables.Colors.carsBorderGrey,
                borderStyle: "dashed",
                borderBottomWidth: 1,
              }}
            >
              <View
                style={{
                  width: "90%",
                  justifyContent: "center",
                  flexWrap: "wrap",
                  padding: 10,
                }}
              >
                <Text
                  style={[
                    FontStyle.urbanistBold,
                    {
                      marginBottom: 3,
                    },
                    CommonStyles.titleCommonTxt,
                  ]}
                >
                  {_.get(carItem, "car.name", null)}
                </Text>

                <Text
                  style={[
                    FontStyle.urbanistMedium,
                    CommonStyles.smallCommonTxt,
                    { color: Variables.Colors.inputTxtColor },
                  ]}
                >
                  {_.get(carItem, "car.carType.name", null)}
                </Text>
              </View>

              {userRole != "ROLE_CAR_OWNER" ? (
                <TouchableOpacity
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flexShrink: 1,
                  }}
                  onPress={() => {
                    navigate("CarsByPerish4", {
                      data: carItem,
                    });
                    // setSearchModal(true), setItem(carItem);
                  }}
                >
                  <PenSvg />
                </TouchableOpacity>
              ) : null}
            </View>
            <View
              style={{
                width: "94%",
                paddingVertical: Measures.fontSize,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* <Text style={[FontStyle.urbanistMedium, styles.pickTxt]}>
                PICK YOUR DATE AND TIME
              </Text> */}
              <View
                style={{
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <View style={{ alignItems: "center" }}>
                  <Text
                    style={[
                      FontStyle.urbanistBold,
                      {
                        color: Variables.Colors.white,
                        fontSize: 14,
                        lineHeight: 22,
                      },
                    ]}
                  >
                    {moment(_.get(carItem, "fromDateTime", null)).format(
                      "ddd., MMM. DD"
                    )}
                  </Text>
                  <Text
                    style={[
                      FontStyle.urbanistMedium,
                      {
                        color: Variables.Colors.white,
                        fontSize: 12,
                        lineHeight: 19,
                      },
                    ]}
                  >
                    {moment(_.get(carItem, "fromDateTime", null)).format(
                      "hh:mm a"
                    )}
                  </Text>
                </View>

                <View
                  style={{
                    marginHorizontal: 13,
                  }}
                >
                  <RightYellowArrowSvg height={20} />
                </View>

                <View style={{ alignItems: "center" }}>
                  <Text
                    style={[
                      FontStyle.urbanistBold,
                      {
                        color: Variables.Colors.white,
                        fontSize: 14,
                        lineHeight: 22,
                      },
                    ]}
                  >
                    {moment(_.get(carItem, "toDateTime", null)).format(
                      "ddd., MMM. DD"
                    )}
                  </Text>
                  <Text
                    style={[
                      FontStyle.urbanistMedium,
                      {
                        color: Variables.Colors.white,
                        fontSize: 12,
                        lineHeight: 19,
                      },
                    ]}
                  >
                    {moment(_.get(carItem, "toDateTime", null)).format(
                      "hh:mm a"
                    )}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const onRefresh = () => {
    if (loginData) {
      let params = {
        type: "booked",
      };
      dispatch(bookedTripListStart(params));
      setRefreshing(true);
    } else {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (!isLoading) {
      setRefreshing(false);
    }
  }, [isLoading]);

  return !bookedTripListData && isLoading ? (
    <LoadingView />
  ) : (
    <View
      style={[
        styles.main,
        {
          paddingBottom:
            userRole == "ROLE_CAR_OWNER"
              ? Variables.MetricsSizes.small
              : Variables.MetricsSizes.large * 5,
        },
      ]}
    >
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Variables.Colors.white}
          />
        }
      >
        <ParishModal
          modalVisible={searchModal}
          onDismiss={() => setSearchModal(false)}
          filterPlug={false}
          onSuccess={(val) => {
            navigate("CarsByPerish4", {
              data: item,
              parish: val,
            });
          }}
        />

        {userRole == "ROLE_CAR_OWNER" ? null : (
          <View style={styles.topBox}>
            <View style={styles.insideBox}>
              <View style={{ width: "100%" }}>
                {_.get(bookedTripListData, "totalCount", null) < 1 ? (
                  <Text
                    style={[
                      FontStyle.urbanistBold,
                      CommonStyles.smallCommonTxt,
                    ]}
                  >
                    You have no upcoming trips
                  </Text>
                ) : (
                  <Text
                    style={[
                      FontStyle.urbanistBold,
                      CommonStyles.smallCommonTxt,
                    ]}
                  >
                    Book another Ryde
                  </Text>
                )}
                <TouchableOpacity
                  style={styles.reserveBtn}
                  onPress={() => navigate("Reserve")}
                >
                  <Text
                    style={[
                      FontStyle.urbanistMedium,
                      CommonStyles.smallCommonTxt,
                      { color: Variables.Colors.inputTxtColor },
                    ]}
                  >
                    Reserve your Ryde{" "}
                  </Text>

                  <RightArrowSvg />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        <FlatList
          style={styles.flatList}
          data={_.get(bookedTripListData, "items", null)}
          renderItem={({ item, index }) => bookedItem(item, index)}
          ListEmptyComponent={() =>
            userRole == "ROLE_CAR_OWNER" ? (
              <View style={styles.noTrip}>
                <Text
                  style={[
                    FontStyle.urbanistSemiBold,
                    CommonStyles.titleCommonTxt,
                  ]}
                >
                  No trips
                </Text>
              </View>
            ) : null
          }
        />
        <View style={{ height: 50 }} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  time: {
    color: Variables.Colors.white,
    fontSize: 13,
    lineHeight: 19,
  },
  date: {
    color: Variables.Colors.white,
    fontSize: 14,
    lineHeight: 22,
    fontWeight: "bold",
  },
  typeTxt: {
    color: Variables.Colors.white,
    fontSize: 14,
  },
  tv2: {
    width: "70%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  tv1: {
    width: "30%",
    justifyContent: "center",
  },
  txtView: {
    flexDirection: "row",
    width: "94%",
    paddingTop: Variables.FontSize.regular,
    paddingBottom: Variables.FontSize.small,
    alignSelf: "center",
  },
  main: {
    flex: 1,
  },
  topBox: {
    width: "94%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Variables.Colors.greyBg,
    alignSelf: "center",
    marginTop: Variables.FontSize.large,
    borderRadius: 8,
  },
  insideBox: {
    flex: 1,
    width: "94%",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    padding: Variables.MetricsSizes.small,
  },
  reserveBtn: {
    flexDirection: "row",
    marginTop: Variables.FontSize.small / 2,
  },
  flatList: {
    width: Variables.Measures.width,
    marginVertical: Variables.FontSize.regular,
    paddingBottom: 20,
  },
  noTrip: {
    width: "100%",
    height: Variables.Measures.height / 1.5,
    justifyContent: "center",
    alignItems: "center",
  },
  outerView: {
    width: "100%",
    alignSelf: "center",
  },
  tripsTxt: {
    color: Variables.Colors.white,
    fontSize: 14,
    lineHeight: 19,
  },
  tripsTxt1: {
    color: Variables.Colors.inputTxtColor,
    fontSize: 16,
    marginRight: 20,
  },
  tripsTxt3: {
    color: Variables.Colors.white,
    fontSize: 24,
  },

  ownerNameTxt: {
    fontSize: 11,
    color: Variables.Colors.inputTxtColor,
    marginBottom: 3,
  },
  availableTxt: {
    fontSize: 12,
    color: Variables.Colors.darkBlack,
  },
  filterTxt: {
    fontSize: 16,
    color: Variables.Colors.darkBlack,
    marginLeft: 5,
  },
  carsAvailableView: {
    width: "47%",
    backgroundColor: Variables.Colors.darkYellow,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  filterInnerView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  filterBtnView: {
    width: "90%",
    alignSelf: "center",
    alignItems: "center",
    marginVertical: 50,
    position: "absolute",
    bottom: 10,
  },
  filterView: {
    backgroundColor: Variables.Colors.darkYellow,
    width: "33%",
    height: 50,
    marginLeft: 1,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTxt: {
    marginLeft: 15,
    color: Variables.Colors.white,
    fontSize: 24,
  },
  headerView: {
    position: "absolute",
    top: 10,
    height: 70,
    width: "90%",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "red",
  },
  carView: {
    backgroundColor: Variables.Colors.carGrey,
    width: "95%",
    alignSelf: "center",
    marginTop: 20,
    borderRadius: 10,
  },

  carImgStyle: {
    height: Variables.Measures.height / 4.5,
    width: "94%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginTop: Measures.fontSize * 1.2,
    alignSelf: "center",
  },
  carNameTxt: {
    fontSize: 24,
    color: Variables.Colors.white,
    marginBottom: 3,
  },

  carDescView: {
    flexDirection: "row",
    height: 60,
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
  carWidthView: {
    flex: 1,
    width: "100%",
  },
  leftWidthView: {
    width: "50%",
  },
  centerWidthView: {
    width: "30%",
  },
  ratingsTxt: {
    fontSize: 12,
    color: Variables.Colors.white,
  },
  safeAreaStyle: {
    flex: 1,
    backgroundColor: Variables.Colors.darkBlack,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  pickTxt: {
    fontSize: Measures.fontSize - 5,
    color: Variables.Colors.white,
    paddingBottom: 15,
  },
});

export default Booked;

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  FlatList,
  Image,
  Platform,
  ScrollView,
  RefreshControl,
} from "react-native";
import { CommonStyles, FontStyle, Images, Variables } from "../../Theme";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { ReducerStateProps } from "../Inbox/InterfaceProps";
import { historyTripListStart } from "../../actions/customerActions";
import StarSvg from "../../assets/Images/ModalIcons/StarRatingYellow.svg";
import { Measures } from "../../Theme/variables";
import ContentLoader, { Rect, Circle } from "react-content-loader/native";
import FastImageView from "../../components/FastImageView";
import moment from "moment";

interface CompletedProps {}

const History: React.FC<CompletedProps> = () => {
  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch();

  const [isLoading, historyTripListData, profileDetailsData, loginData] =
    useSelector((state: ReducerStateProps) => [
      state.customer.isLoading,
      state.customer.historyTripListData,
      state.user.profileDetailsData,
      state.auth.loginData,
    ]);

  useEffect(() => {
    if (loginData) {
      let params = {
        type: "history",
      };
      dispatch(historyTripListStart(params));
    }
  }, [loginData]);

  const onRefresh = () => {
    if (loginData) {
      let params = {
        type: "history",
      };
      dispatch(historyTripListStart(params));
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

  const bookedItem = (carItem: any) => {
    const assetImage = _.first(_.get(carItem, "item.car.carAssets", null));

    return (
      <View style={styles.outerView}>
        <View style={styles.carView}>
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
            <View style={styles.innerItemView}>
              <Text style={[FontStyle.urbanistBold, styles.carTxt]}>
                {_.get(carItem, "item.car.name", null)}
              </Text>

              <View style={styles.tdView}>
                <View style={styles.timedateView}>
                  <Text style={[FontStyle.urbanistMedium, styles.date]}>
                    {moment(
                      _.get(carItem, "item.completeDataTime", null)
                    ).format("ddd DD. hh:mm A")}
                  </Text>
                  <View
                    style={{
                      marginLeft: Variables.MetricsSizes.regular,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    {_.get(carItem, "item.car.avgRating", null) && (
                      <>
                        <Text
                          style={[FontStyle.urbanistMedium, styles.ratingsTxt]}
                        >
                          {_.get(carItem, "item.car.avgRating", null)}
                        </Text>
                        <View style={{ marginHorizontal: 3 }}>
                          <StarSvg height={15} width={15} />
                        </View>
                      </>
                    )}
                    <Text style={[FontStyle.urbanistMedium, styles.ratingsTxt]}>
                      ({_.get(carItem, "item.car.trip")} trips)
                    </Text>
                  </View>
                </View>

                {_.get(carItem, "item.totalAmount", null) ? (
                  <View style={{ alignItems: "center" }}>
                    <Text style={[FontStyle.urbanistMedium, styles.total]}>
                      {"$" + _.get(carItem, "item.totalAmount", null)}
                    </Text>
                  </View>
                ) : null}
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return !historyTripListData && loginData ? (
    <LoadingView />
  ) : (
    <ScrollView
      nestedScrollEnabled
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={Variables.Colors.white}
        />
      }
      style={{ marginBottom: Variables.MetricsSizes.large * 2 }}
    >
      <View
        style={{
          flex: 1,
          paddingBottom:
            _.get(profileDetailsData, "verifiedInfo.role", null) ==
            "ROLE_CAR_OWNER"
              ? Variables.MetricsSizes.small
              : Variables.MetricsSizes.large * 5,
        }}
      >
        <FlatList
          style={{ flex: 1 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={Variables.Colors.white}
            />
          }
          data={
            _.filter(historyTripListData?.items, (item) => {
              if (item?.status == "completed") {
                return historyTripListData?.items;
              }
            }) || []
          }
          renderItem={(item) => bookedItem(item)}
          ListEmptyComponent={() => (
            <View style={styles.noTrip}>
              <Text
                style={[FontStyle.urbanistBold, CommonStyles.titleCommonTxt]}
              >
                No past trips
              </Text>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  date: {
    color: Variables.Colors.inputTxtColor,
    fontSize: 15,
    lineHeight: 22,
  },
  total: {
    color: Variables.Colors.inputTxtColor,
    fontSize: 16,
    lineHeight: 22,
  },
  timedateView: {
    alignItems: "center",
    flexDirection: "row",
  },
  tdView: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  carTxt: {
    fontSize: 24,
    color: Variables.Colors.white,
    marginBottom: 3,
  },
  innerItemView: {
    width: "94%",
    paddingTop: Variables.FontSize.regular,
    paddingBottom: Variables.FontSize.small,
    alignSelf: "center",
  },
  noTrip: {
    width: "100%",
    height: Measures.height / 1.5,
    justifyContent: "center",
    alignItems: "center",
  },
  outerView: {
    width: "100%",
    alignSelf: "center",
  },
  tripsTxt: {
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
  carImgView: {
    height: Variables.Measures.height / 3.1,
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
    fontSize: 13,
    color: Variables.Colors.white,
  },
  safeAreaStyle: {
    flex: 1,
    backgroundColor: Variables.Colors.darkBlack,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
});

export default History;

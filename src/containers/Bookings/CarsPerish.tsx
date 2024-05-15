import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { CommonStyles, FontStyle, Images, Variables } from "../../Theme";
import { goBack, navigate, replace } from "../../navigators/RootNavigation";
import DashedLine from "react-native-dashed-line";

import StarSvg from "../../assets/Images/ModalIcons/StarRatingYellow.svg";
import HeartSvg from "../../assets/Images/HeartBorderWhite.svg";
import HeartRedSvg from "../../assets/Images/HeartRed.svg";
import FilterSvg from "../../assets/Images/Filter.svg";
import Parish1Svg from "../../assets/Images/Parish1.svg";
import BackSvg from "../../assets/Images/BackArrow.svg";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import {
  carListStart,
  favouriteCarAddStart,
  favouriteCarRemoveStart,
} from "../../actions/customerActions";
import { ReducerStateProps } from "../Inbox/InterfaceProps";
import { useIsFocused } from "@react-navigation/native";
import ParishModal from "../../components/ParishModal";
import ContentLoader, { Rect, Circle } from "react-content-loader/native";
import FastImageView from "../../components/FastImageView";
import Header from "../../components/Header";
import { ownerCarListStart } from "../../actions/carOwnerActions";
import { CommonProps } from "../types";
import { Colors, Measures } from "../../Theme/variables";
import { getOr } from "../../constants/constants";
import FilterView from "../../components/FilterView";

const CarPerish: React.FC<CommonProps> = ({ route }) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = useState(false);

  const [dataItem, setDataItem] = useState(_.get(route, "params.data", null));

  const [searchModal, setSearchModal] = useState(false);
  const [headerName, setHeaderName] = useState(dataItem?.name);
  const [dataList, setData] = useState([]);

  const [
    profileDetailsData,
    parishListData,
    carListData,
    ownerCarListData,
    favouriteCarRemoveData,
    favouriteCarListData,
    carTypeListData,
    isLoadingCustomer,
    isLoadingOwner,
  ] = useSelector((state: ReducerStateProps) => [
    state.user.profileDetailsData,
    state.customer.parishListData,
    state.customer.carListData,
    state.carOwner.ownerCarListData,
    state.customer.favouriteCarRemoveData,
    state.customer.favouriteCarListData,
    state.customer.carTypeListData,
    state.customer.isLoadingCarList,
    state.carOwner.isLoadingCarList,
  ]);
  const userRole = _.get(profileDetailsData, "verifiedInfo.role", null);

  useEffect(() => {
    carlistfilter(dataItem);
  }, [favouriteCarListData, dataItem, favouriteCarRemoveData, isFocused]);

  const onRefresh = () => {
    carlistfilter(dataItem);
    setRefreshing(true);
  };

  useEffect(() => {
    setData(
      userRole == "ROLE_CAR_OWNER"
        ? _.get(ownerCarListData, "items", null) || []
        : _.get(carListData, "items", null) || []
    );
  }, [carListData, ownerCarListData]);

  useEffect(() => {
    if (!isLoadingCustomer || !isLoadingOwner) {
      setRefreshing(false);
    }
  }, [isLoadingCustomer, isLoadingOwner]);

  const carlistfilter = (item: any) => {
    let params = {
      parish: _.get(item, "id", null),
    };
    if (isFocused) {
      if (
        _.get(profileDetailsData, "verifiedInfo.role", null) == "ROLE_CAR_OWNER"
      ) {
        dispatch(ownerCarListStart(params));
      } else {
        dispatch(carListStart(params));
      }
    }
    setHeaderName(_.get(item, "name", null));
    setDataItem(item);
  };

  const toggleFavorite = (res: any) => {
    const updatedItems = dataList.map((item) =>
      item.id === res?.id ? { ...item, isFavourite: !item.isFavourite } : item
    );
    setData(updatedItems);

    let params = {
      car: res?.id,
    };
    if (res.isFavourite) {
      dispatch(favouriteCarRemoveStart(params));
    } else {
      dispatch(favouriteCarAddStart(params));
    }
  };

  const renderCars = (item: any, index: any) => {
    const assetImage = _.first(_.get(item, "carAssets", null));
    return (
      <TouchableOpacity
        style={{ marginTop: 12 }}
        onPress={() =>
          route?.params.rScreen === "HostCarProfile" ||
          _.get(profileDetailsData, "verifiedInfo.role") == "ROLE_CAR_OWNER"
            ? navigate("HostCarProfile", { carID: item.id })
            : navigate("CarsByPerish4", {
                data: item,
                parish: dataItem,
              })
        }
      >
        <View style={[styles.carsView]}>
          <View style={styles.leftWidthView}>
            <View style={styles.innerWidthView}>
              {_.get(assetImage, "image", null) ? (
                <FastImageView
                  source={{ uri: _.get(assetImage, "image", null) }}
                  style={styles.carImgView}
                />
              ) : (
                <Image
                  source={Images.CarPlaceHolder}
                  style={styles.carImgView}
                />
              )}
            </View>
          </View>

          <View style={styles.rightCarDescView}>
            <Text
              numberOfLines={1}
              style={[
                FontStyle.urbanistMedium,
                CommonStyles.extraSmallCommonTxt,
              ]}
            >
              {_.get(item, "carOwner.fullName", null)}
            </Text>
            <Text
              style={[FontStyle.urbanistBold, CommonStyles.buttonCommonTxt]}
              numberOfLines={1}
            >
              {item?.name}
            </Text>
            <View style={styles.avgView}>
              <Text style={[FontStyle.urbanistMedium, styles.ratingsTxt]}>
                {getOr(item, "avgRating", null)
                  ? parseFloat(getOr(item, "avgRating", null)).toFixed(1)
                  : null}
              </Text>
              {_.get(item, "avgRating", null) ? (
                <View style={{ marginHorizontal: 5 }}>
                  <StarSvg height={12} width={12} />
                </View>
              ) : null}

              {_.get(item, "trip", null) ? (
                <Text
                  style={[FontStyle.urbanistMedium, CommonStyles.descCommonTxt]}
                >
                  ( {_.get(item, "trip", null)} trips )
                </Text>
              ) : (
                <Text
                  style={[FontStyle.urbanistMedium, CommonStyles.descCommonTxt]}
                >
                  ( 0 trips )
                </Text>
              )}
            </View>

            <DashedLine
              dashLength={3.5}
              dashThickness={1}
              dashColor={Variables.Colors.borderGrey}
            />
          </View>
          {_.get(profileDetailsData, "verifiedInfo.role", null) ===
          "ROLE_CUSTOMER" ? (
            <TouchableOpacity
              style={styles.likedView}
              onPress={() => toggleFavorite(item)}
            >
              {item.isFavourite ? (
                <HeartRedSvg height={22} width={22} />
              ) : (
                <HeartSvg height={22} width={22} />
              )}
            </TouchableOpacity>
          ) : _.get(profileDetailsData, "verifiedInfo.role", null) ===
            "ROLE_CAR_OWNER" ? null : (
            <TouchableOpacity
              onPress={() => {
                replace("LoginSplash");
              }}
              style={styles.likedView}
            >
              <HeartSvg height={22} width={22} />
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const selectPerish = (item: any, index: number) => {
    return (
      <TouchableOpacity
        style={[
          styles.cityView,
          {
            marginRight:
              index % item.length !== 0 ? Variables.MetricsSizes.small : 0,
            // borderWidth: 1,
            // borderColor:
            //   headerName === _.get(item, "name", null)
            //     ? Colors.yellow
            //     : Colors.carGrey,
          },
        ]}
        onPress={() => {
          carlistfilter(item);
        }}
      >
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <View style={styles.carImgStyle}>
            <FastImageView
              style={{
                width: Measures.fontSize * 4,
                height: Measures.fontSize * 4,
              }}
              source={{ uri: _.get(item, "greyIcon", null) }}
            />
          </View>
          <Text
            style={[
              FontStyle.urbanistMedium,
              CommonStyles.smallCommonTxt,
              { paddingVertical: 5 },
            ]}
          >
            {_.get(item, "name", null)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const LoadingView = () => {
    return (
      <SafeAreaView style={styles.safeAreaStyle}>
        <StatusBar
          backgroundColor={Variables.Colors.blackBg}
          barStyle="light-content"
        />
        <ScrollView
          style={{
            height: Variables.Measures.height,
            marginTop: 10,
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <ContentLoader
            backgroundColor={Variables.Colors.absoluteBgGrey}
            foregroundColor={Variables.Colors.grey}
            height={80}
          >
            <Rect x="15" y="20" rx="4" ry="4" width="50" height="40" />
            <Rect x="80" y="20" rx="4" ry="4" width="150" height="40" />
          </ContentLoader>

          <ContentLoader
            backgroundColor={Variables.Colors.absoluteBgGrey}
            foregroundColor={Variables.Colors.grey}
            width={Variables.Measures.width}
            height={Variables.Measures.width / 3.5}
            style={{ marginTop: 20 }}
          >
            <Rect
              x="10"
              y="0"
              rx="4"
              ry="4"
              width={Variables.Measures.width / 1.06}
              height={Variables.Measures.width / 2}
            />

            <Rect
              x="20"
              y="10"
              rx="4"
              ry="4"
              width={Variables.Measures.width / 2.2}
              height={Variables.Measures.width / 4.2}
            />

            <Rect
              x="54%"
              y="30"
              rx="4"
              ry="4"
              width={Variables.Measures.width / 3.5}
              height="8"
            />

            <Rect
              x="54%"
              y="50"
              rx="4"
              ry="4"
              width={Variables.Measures.width / 3.5}
              height="8"
            />
            <Rect
              x="54%"
              y="70"
              rx="4"
              ry="4"
              width={Variables.Measures.width / 3.5}
              height="8"
            />

            <Rect
              x="52%"
              y="95"
              rx="4"
              ry="4"
              width={Variables.Measures.width / 2.3}
              height="2"
            />

            <Circle cx={Variables.Measures.width / 1.1} cy="20" r="12" />
          </ContentLoader>

          <View style={{ marginTop: 20 }}></View>

          <ContentLoader
            backgroundColor={Variables.Colors.absoluteBgGrey}
            foregroundColor={Variables.Colors.grey}
            width={Variables.Measures.width}
            height={Variables.Measures.width / 3.5}
          >
            <Rect
              x="10"
              y="0"
              rx="4"
              ry="4"
              width={Variables.Measures.width / 1.06}
              height={Variables.Measures.width / 2}
            />

            <Rect
              x="20"
              y="10"
              rx="4"
              ry="4"
              width={Variables.Measures.width / 2.2}
              height={Variables.Measures.width / 4.2}
            />

            <Rect
              x="54%"
              y="30"
              rx="4"
              ry="4"
              width={Variables.Measures.width / 3.5}
              height="8"
            />

            <Rect
              x="54%"
              y="50"
              rx="4"
              ry="4"
              width={Variables.Measures.width / 3.5}
              height="8"
            />
            <Rect
              x="54%"
              y="70"
              rx="4"
              ry="4"
              width={Variables.Measures.width / 3.5}
              height="8"
            />

            <Rect
              x="52%"
              y="95"
              rx="4"
              ry="4"
              width={Variables.Measures.width / 2.3}
              height="2"
            />

            <Circle cx={Variables.Measures.width / 1.1} cy="20" r="12" />
          </ContentLoader>

          <View style={{ marginTop: 10 }}></View>

          <ContentLoader
            backgroundColor={Variables.Colors.absoluteBgGrey}
            foregroundColor={Variables.Colors.grey}
            width={Variables.Measures.width}
            height={70}
          >
            <Rect x="10%" y="10" rx="4" ry="4" width="40%" height="50" />
            <Rect x="15%" y="25" rx="4" ry="4" width="30%" height="20" />

            <Rect x="51%" y="10" rx="4" ry="4" width="35%" height="50" />
            <Rect x="55%" y="22" rx="4" ry="4" width="10%" height="25" />
            <Rect x="68%" y="28" rx="4" ry="4" width="15%" height="10" />
          </ContentLoader>

          <View style={{ marginTop: 15 }}></View>

          <ContentLoader
            backgroundColor={Variables.Colors.absoluteBgGrey}
            foregroundColor={Variables.Colors.grey}
            width={Variables.Measures.width}
            height={Variables.Measures.width / 2}
          >
            <Rect
              x="10"
              y="0"
              rx="4"
              ry="4"
              width={Variables.Measures.width / 4}
              height="20"
            />

            <Rect
              x="10"
              y="40"
              rx="4"
              ry="4"
              width={Variables.Measures.width / 3}
              height={Variables.Measures.width / 3}
            />

            <Rect
              x="40%"
              y="40"
              rx="4"
              ry="4"
              width={Variables.Measures.width / 3}
              height={Variables.Measures.width / 3}
            />
          </ContentLoader>
        </ScrollView>
      </SafeAreaView>
    );
  };

  return (
    <SafeAreaView style={styles.safeAreaStyle}>
      <ParishModal
        modalVisible={searchModal}
        onDismiss={() => setSearchModal(false)}
        filterPlug={false}
        onSuccess={(item) => carlistfilter(item)}
      />
      <Header
        centerText={headerName}
        leftSvg={<BackSvg height={25} width={25} />}
        onLeftPress={goBack}
      />
      <ScrollView
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={{ marginTop: 5 }}>
          {(isLoadingCustomer || isLoadingOwner) === false ? (
            <>
              <FlatList
                data={dataList}
                renderItem={({ item, index }: any) => renderCars(item, index)}
                extraData={dataList}
                ListEmptyComponent={() => (
                  <View
                    style={{
                      width: "100%",
                      height: Variables.Measures.height / 1.7,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={[FontStyle.urbanistSemiBold, styles.tripsTxt]}>
                      No car found.
                    </Text>
                  </View>
                )}
              />
            </>
          ) : (
            <View style={{ flex: 1 }}>
              <ContentLoader
                backgroundColor={Variables.Colors.absoluteBgGrey}
                foregroundColor={Variables.Colors.grey}
                width={Variables.Measures.width}
                height={Variables.Measures.width / 4}
                style={{ marginTop: 20 }}
              >
                <Rect
                  x="10"
                  y="0"
                  rx="4"
                  ry="4"
                  width={Variables.Measures.width / 1.06}
                  height={Variables.Measures.width / 3}
                />

                <Rect
                  x="20"
                  y="10"
                  rx="4"
                  ry="4"
                  width={Variables.Measures.width / 2.2}
                  height={Variables.Measures.width / 5}
                />

                <Rect
                  x="54%"
                  y="25"
                  rx="4"
                  ry="4"
                  width={Variables.Measures.width / 3.5}
                  height="8"
                />

                <Rect
                  x="54%"
                  y="40"
                  rx="4"
                  ry="4"
                  width={Variables.Measures.width / 3.5}
                  height="8"
                />
                <Rect
                  x="54%"
                  y="60"
                  rx="4"
                  ry="4"
                  width={Variables.Measures.width / 3.5}
                  height="8"
                />

                <Rect
                  x="52%"
                  y="75"
                  rx="4"
                  ry="4"
                  width={Variables.Measures.width / 2.3}
                  height="2"
                />

                <Circle cx={Variables.Measures.width / 1.1} cy="20" r="12" />
              </ContentLoader>

              <ContentLoader
                backgroundColor={Variables.Colors.absoluteBgGrey}
                foregroundColor={Variables.Colors.grey}
                width={Variables.Measures.width}
                height={Variables.Measures.width / 4}
                style={{ marginTop: 20 }}
              >
                <Rect
                  x="10"
                  y="0"
                  rx="4"
                  ry="4"
                  width={Variables.Measures.width / 1.06}
                  height={Variables.Measures.width / 3}
                />

                <Rect
                  x="20"
                  y="10"
                  rx="4"
                  ry="4"
                  width={Variables.Measures.width / 2.2}
                  height={Variables.Measures.width / 5}
                />

                <Rect
                  x="54%"
                  y="25"
                  rx="4"
                  ry="4"
                  width={Variables.Measures.width / 3.5}
                  height="8"
                />

                <Rect
                  x="54%"
                  y="40"
                  rx="4"
                  ry="4"
                  width={Variables.Measures.width / 3.5}
                  height="8"
                />
                <Rect
                  x="54%"
                  y="60"
                  rx="4"
                  ry="4"
                  width={Variables.Measures.width / 3.5}
                  height="8"
                />

                <Rect
                  x="52%"
                  y="75"
                  rx="4"
                  ry="4"
                  width={Variables.Measures.width / 2.3}
                  height="2"
                />

                <Circle cx={Variables.Measures.width / 1.1} cy="20" r="12" />
              </ContentLoader>
            </View>
          )}
          <FilterView
            customStyle={styles.filterBtnView}
            count={_.size(dataList)}
            setSearchModal={() => setSearchModal(true)}
          />

          {/* <View style={{ width: "95%", alignSelf: "center" }}>
            <Text
              style={[FontStyle.urbanistMedium, CommonStyles.smallCommonTxt]}
            >
              Select Parish
            </Text>
            <View style={{ marginTop: 10, marginBottom: 40 }}>
              {_.size(_.get(parishListData, "items", null)) > 0 ? (
                <FlatList
                  horizontal={true}
                  initialNumToRender={10}
                  showsHorizontalScrollIndicator={false}
                  data={_.get(parishListData, "items", null)}
                  renderItem={({ item, index }) => selectPerish(item, index)}
                  style={{ width: "100%" }}
                />
              ) : null}
            </View>
          </View> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  avgView: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  tripsTxt: {
    color: Variables.Colors.white,
    fontSize: 22,
  },
  likedView: {
    position: "absolute",
    right: 8,
    top: 8,
  },
  carImgStyle: {
    width: Variables.Measures.width / 2.82,
    height: Variables.Measures.width / 3.5,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  carDescTxt: {
    color: Variables.Colors.white,
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 10,
  },
  cityView: {
    borderRadius: 20,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
    width: Variables.Measures.width / 2.8,
    backgroundColor: Variables.Colors.carGrey,
  },
  ratedView: {
    borderRadius: 20,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
    width: Variables.Measures.width / 3,
    height: Variables.Measures.width / 3,
  },
  listingTxt: {
    color: Variables.Colors.white,
    fontSize: 16,
    marginVertical: 10,
  },
  availableTxt: {
    fontSize: 13,
    color: Variables.Colors.darkBlack,
  },
  filterTxt: {
    fontSize: 16,
    color: Variables.Colors.darkBlack,
    marginLeft: 5,
  },
  carsAvailableView: {
    width: "40%",
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
    height: 50,
    width: "90%",
    alignSelf: "center",
    marginVertical: 20,
    alignItems: "center",
  },
  filterView: {
    backgroundColor: Variables.Colors.darkYellow,
    width: "30%",
    height: 50,
    marginLeft: 3,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  ratingsTxt: {
    fontSize: 13,
    color: Variables.Colors.white,
  },
  carNameTxt: {
    fontSize: 13,
    color: Variables.Colors.white,
    marginVertical: 5,
  },
  perishesTxt: {
    fontSize: 14,
    color: Variables.Colors.white,
    marginBottom: 15,
  },
  ownerNameTxt: {
    fontSize: 12,
    color: Variables.Colors.white,
  },
  rightCarDescView: {
    // height: "73%",
    alignSelf: "center",
    // paddingHorizontal: 5,
    paddingLeft: 5,
    justifyContent: "center",
    width: "45%",
  },
  headerView: {
    height: 55,
    width: "90%",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  headerTxt: {
    marginLeft: 15,
    color: Variables.Colors.white,
    fontSize: 24,
  },
  safeAreaStyle: {
    flex: 1,
    backgroundColor: Variables.Colors.darkBlack,
  },
  carsView: {
    height: 100,
    width: "95%",
    backgroundColor: Variables.Colors.greyBg,
    alignSelf: "center",
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    flexDirection: "row",
  },
  leftWidthView: {
    width: "55%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  innerWidthView: {
    width: "93%",
    alignSelf: "center",
    height: "85%",
  },
  carImgView: {
    height: "100%",
    width: "100%",
    borderTopLeftRadius: Variables.MetricsSizes.small,
    borderTopRightRadius: Variables.MetricsSizes.small,
  },
});

export default CarPerish;

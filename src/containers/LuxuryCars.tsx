import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  FlatList,
  Platform,
} from "react-native";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import { CommonStyles, FontStyle, Images, Layout, Variables } from "../Theme";
import { goBack, navigate } from "../navigators/RootNavigation";
import FastImage from "react-native-fast-image";
import StarSvg from "../assets/Images/ModalIcons/StarRatingYellow.svg";
import HeartWhiteSvg from "../assets/Images/HeartBorderWhite.svg";
import HeartRedSvg from "../assets/Images/HeartRed.svg";
import BackSvg from "../assets/Images/BackArrow.svg";
import { FilterModalProps } from "./types";
import DashedLine from "react-native-dashed-line";
import BlurViewUI from "../components/BlurView";
import { useDispatch, useSelector } from "react-redux";
import {
  carListLuxStart,
  favouriteCarAddStart,
  favouriteCarRemoveStart,
} from "../actions/customerActions";
import _ from "lodash";
import ParishModal from "../components/ParishModal";
import { ReducerStateProps } from "./Inbox/InterfaceProps";
import ContentLoader, { Rect, Circle } from "react-content-loader/native";
import FastImageView from "../components/FastImageView";
import { ownerCarListLuxStart } from "../actions/carOwnerActions";
import { Colors, Measures } from "../Theme/variables";
import { getOr } from "../constants/constants";
import { ActivityIndicator } from "react-native";
import FilterView from "../components/FilterView";
import CarCardView from "../components/CarCardView";

const LuxuryCars: React.FC<FilterModalProps> = ({ route }) => {
  const { t } = useTranslation();
  const [refreshing, setRefreshing] = useState(false);
  const dispatch = useDispatch();
  const carTypeId = route.params.carTypeId;
  const carTypeName = route.params.carTypeName;

  const searchModalOpen = route.params.searchModalOpen;
  const [searchModal, setSearchModal] = useState(searchModalOpen);
  const [dataList, setData] = useState([]);
  const [showButton, setShowButton] = useState(true);

  const [
    isLoadingCustomer,
    isCustLoadingCarList,
    isOwnLoadingCarList,
    profileDetailsData,
    ownerCarListLux,
    carListlux,
  ] = useSelector((state: ReducerStateProps) => [
    state.customer.isLoading,
    state.carOwner.isLoadingCarList,
    state.customer.isLoadingCarList,
    state.user.profileDetailsData,
    state.carOwner.ownerCarListLux,
    state.customer.carListlux,
  ]);
  const userRole = _.get(profileDetailsData, "verifiedInfo.role", null);
  useEffect(() => {
    getCarList(5);
  }, []);

  useEffect(() => {
    setData(
      userRole == "ROLE_CAR_OWNER"
        ? _.get(ownerCarListLux, "items", null) || []
        : _.get(carListlux, "items", null) || []
    );
  }, [carListlux, ownerCarListLux]);

  useEffect(() => {
    if (!isCustLoadingCarList || !isOwnLoadingCarList) {
      setRefreshing(false);
    }
  }, [isCustLoadingCarList, isOwnLoadingCarList]);

  const loadMoreData = () => {
    const currentDataLength = dataList?.length;
    getCarList(currentDataLength + 5);
  };

  const getCarList = (limit?: number) => {
    let params = {
      type: carTypeId,
      offset: 0,
      limit: limit,
    };
    if (carTypeName === "Luxury Cars") {
      if (userRole == "ROLE_CAR_OWNER") {
        dispatch(ownerCarListLuxStart(params));
      } else {
        dispatch(carListLuxStart(params));
      }
    }
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

  const HeaderView = () => {
    return (
      <View style={styles.headerView}>
        <TouchableOpacity onPress={goBack}>
          <BackSvg height={25} width={25} />
        </TouchableOpacity>
        <Text style={[FontStyle.urbanistBold, styles.headerTxt]}>
          {carTypeName ? carTypeName : "Luxury Cars"}
        </Text>
      </View>
    );
  };

  const listFooterComponent = () =>
    _.get(carListlux, "totalCount", null) > _.size(dataList) ||
    _.get(ownerCarListLux, "totalCount", null) > _.size(dataList) ? (
      <TouchableOpacity style={styles.viewStyle} onPress={loadMoreData}>
        {isOwnLoadingCarList || isCustLoadingCarList ? (
          <ActivityIndicator size={"small"} color={Colors.yellow} />
        ) : (
          <Text style={[styles.textStyle, FontStyle.urbanistBold]}>
            Load More
          </Text>
        )}
      </TouchableOpacity>
    ) : null;

  const onRefresh = () => {
    getCarList(5);
    setRefreshing(true);
  };

  const LoadingView = () => {
    return (
      <View style={styles.safeAreaStyle}>
        <StatusBar
          translucent
          barStyle="light-content"
          animated={true}
          backgroundColor="transparent"
        />
        <ScrollView
          style={{
            height: Variables.Measures.height,
            marginTop: 10,
          }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={Variables.Colors.white}
            />
          }
        >
          <ContentLoader
            backgroundColor={Variables.Colors.absoluteBgGrey}
            foregroundColor={Variables.Colors.grey}
            height={80}
          >
            <Rect x="15" y="20" rx="4" ry="4" width="30" height="30" />
            <Rect x="65" y="20" rx="4" ry="4" width="150" height="30" />
          </ContentLoader>

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
              cy={Variables.Measures.width / 2.3}
              r="12"
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
              cy={Variables.Measures.width / 2.3}
              r="12"
            />
          </ContentLoader>
        </ScrollView>
      </View>
    );
  };

  return _.size(dataList) == 0 &&
    (isOwnLoadingCarList || isCustLoadingCarList) ? (
    <LoadingView />
  ) : (
    <View style={styles.safeAreaStyle}>
      {Platform.OS == "ios" ? (
        <StatusBar
          translucent
          barStyle="light-content"
          animated={true}
          backgroundColor="transparent"
        />
      ) : (
        <StatusBar
          translucent
          barStyle="light-content"
          animated={true}
          backgroundColor={Variables.Colors.blackOpac85}
        />
      )}
      <ParishModal
        modalVisible={searchModal}
        onDismiss={() => setSearchModal(false)}
        filterPlug={true}
      />

      <FlatList
        style={{ marginBottom: 20 }}
        extraData={isLoadingCustomer}
        ListHeaderComponent={
          <View style={styles.bgImgView}>
            <FastImage source={Images.carBg} style={styles.imgView} />
          </View>
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Variables.Colors.white}
          />
        }
        onTouchEnd={() => setShowButton(false)}
        removeClippedSubviews={true}
        onScroll={() => setShowButton(true)}
        onEndReached={() => setShowButton(false)}
        keyExtractor={(item) => _.get(item, "id"?.toString(), null)}
        data={dataList}
        ListFooterComponent={listFooterComponent}
        renderItem={({ item, index }) => (
          <CarCardView
            carItem={item}
            index={index}
            userRole={userRole}
            toggleFavorite={(item) => toggleFavorite(item)}
          />
        )}
        ListEmptyComponent={() => (
          <View
            style={{
              width: "100%",
              height: Variables.Measures.height / 4.5,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={[FontStyle.urbanistSemiBold, styles.tripsTxt]}>
              No Cars found.
            </Text>
          </View>
        )}
      />
      <HeaderView />
      <BlurViewUI Type="light" />

      {_.size(dataList) > 0 && showButton ? (
        <FilterView
          count={_.size(dataList)}
          setSearchModal={() => setSearchModal(!searchModal)}
        />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: Measures.fontSize - 3,
    fontFamily: "Montserrat-Bold",
    color: Colors.yellow,
  },
  viewStyle: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },

  tripsTxt: {
    color: Variables.Colors.white,
    fontSize: 22,
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
    height: 50,
    alignSelf: "center",
    marginVertical: 20,
    alignItems: "center",
    position: "absolute",
    bottom: 30,
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
  nextBtnView: {
    alignSelf: "center",
    height: Variables.Measures.fontSize * 2.1,
  },
  nextBtnTextView: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    borderRadius: 17,
    width: Variables.Measures.width / 1.5,
    backgroundColor: Variables.Colors.darkYellow,
  },
  nextTxt: {
    fontSize: Variables.Measures.fontSize / 1.2,
    color: Variables.Colors.darkBlack,
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
  headerTxt: {
    marginLeft: 15,
    color: Variables.Colors.white,
    fontSize: 24,
  },
  headerView: {
    position: "absolute",
    top: Variables.Measures.StatusBarHeight + 10,
    height: 50,
    width: "90%",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  carView: {
    backgroundColor: Variables.Colors.carGrey,
    width: "93%",
    alignSelf: "center",
    marginTop: 20,
    borderRadius: 10,
  },
  carImgView: {
    height: Variables.Measures.height / 2.3,
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
    height: 50,
  },
  carNameView: {
    width: "50%",
    borderRightColor: Variables.Colors.carsBorderGrey,
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
  modalContainer: {
    width: Variables.Measures.width / 1.3,
    backgroundColor: Variables.Colors.carGrey,
    position: "absolute",
    top: 50,
    right: 13,
    zIndex: 1000,
    borderRadius: 7,
  },
  modalContent: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  locationTxt: {
    color: Variables.Colors.darkYellow,
    fontSize: 14,
  },
  dateTxt: {
    marginLeft: 10,
    color: Variables.Colors.inputTxtColor,
    fontSize: 12,
  },
  modalView: {
    backgroundColor: Variables.Colors.blackAbsolute,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: Variables.Measures.height * 2,
  },
  rowFlexView: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginTop: 10,
  },
  leftAbsoluteView: {
    position: "absolute",
    top: 70,
    height: 10,
    width: 10,
    left: 20,
  },
  cityTxt: {
    fontSize: 12,
    color: Variables.Colors.chatWhite,
  },
  searchDataView: {
    flexDirection: "row",
    marginTop: 17,
    alignItems: "center",
    width: "97%",
    alignSelf: "center",
    borderBottomColor: Variables.Colors.white,
  },
  parishesTxt: {
    fontSize: 14,
    color: Variables.Colors.darkYellow,
    marginVertical: 10,
  },
  inputView: {
    backgroundColor: Variables.Colors.carGrey,
    borderBottomColor: Variables.Colors.borderGrey,
    borderBottomWidth: 1,
    paddingHorizontal: 5,
    color: Variables.Colors.white,
  },
  searchView: {
    maxHeight: 400,
    paddingVertical: 10,
    borderBottomColor: Variables.Colors.borderGrey,
    borderBottomWidth: 1,
  },
  safeAreaStyle: {
    flex: 1,
    backgroundColor: Variables.Colors.darkBlack,
  },
});
export default LuxuryCars;

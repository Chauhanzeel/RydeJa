import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  FlatList,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  TouchableHighlight,
  RefreshControl,
  Platform,
} from "react-native";
import { CommonStyles, FontStyle, Images, Variables } from "../../Theme";
import AppIntroSlider from "react-native-app-intro-slider";
import { useTranslation } from "react-i18next";
import { useIsFocused } from "@react-navigation/native";
import FastImage from "react-native-fast-image";

import SearchSvg from "../../assets/Images/SearchOrange.svg";
import HeartYellow from "../../assets/Images/HeartYellow.svg";
import Parish1Svg from "../../assets/Images/Parish1.svg";
import Options from "../../assets/Images/Options.svg";
import Options2 from "../../assets/Images/Options2.svg";
import { SliderBox } from "../../components/SliderImages/SliderBox";

import { navigate } from "../../navigators/RootNavigation";
import BlurViewUI from "../../components/BlurView";
import { useDispatch, useSelector } from "react-redux";
import {
  carListLuxStart,
  carTypeListStart,
  parishListStart,
  recentlyViewCarListStart,
} from "../../actions/customerActions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import _, { set } from "lodash";
import { ReducerStateProps } from "../Inbox/InterfaceProps";
import ContentLoader, { Rect, Circle } from "react-content-loader/native";
import FastImageView from "../../components/FastImageView";
import { ownerCarListLuxStart } from "../../actions/carOwnerActions";
import { loginUserSuccess } from "../../actions/authActions";
import { Colors, Measures } from "../../Theme/variables";
import {
  countryListStart,
  profileDetailsStart,
} from "../../actions/userActions";

import Config from "react-native-config";
import CarCardView from "../../components/CarCardView";

interface SearchProps {}

const Search: React.FC<SearchProps> = () => {
  const { t } = useTranslation();
  // const isFocused = useIsFocused();

  const carImages = [
    require("../../assets/Images/Ryde_Carousel_img_1.jpg"),
    require("../../assets/Images/Ryde_Carousel_img_2.jpg"),
    require("../../assets/Images/Ryde_Carousel_img_3.jpg"),
    require("../../assets/Images/Ryde_Carousel_img_4.jpg"),
  ];

  const [
    isLoadingCusCarList,
    isLoadingOwnCarList,
    isLoadingAuth,
    loginData,
    carTypeListData,
    parishListData,
    carListlux,
    recentlyViewCarListData,
    ownerCarListLux,
    countryListData,
    profileDetailsData,
  ] = useSelector((state: ReducerStateProps) => [
    state.customer.isLoadingCarList,
    state.carOwner.isLoadingCarList,
    state.auth.isLoading,
    state.auth.loginData,
    state.customer.carTypeListData,
    state.customer.parishListData,
    state.customer.carListlux,
    state.customer.recentlyViewCarListData,
    state.carOwner.ownerCarListLux,
    state.user.countryListData,
    state.user.profileDetailsData,
  ]);

  const statusRef = useRef(null);

  const dispatch = useDispatch();

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getLoginStatus();
  }, []);

  useEffect(() => {
    if (carTypeListData && loginData) {
      carTypeID();
    } else {
      carTypeID();
    }
  }, [carTypeListData, _.get(loginData, "user.role", null)]);

  useEffect(() => {
    if (!isLoadingCusCarList && !isLoadingOwnCarList) {
      setRefreshing(false);
    }
  }, [isLoadingCusCarList, isLoadingOwnCarList]);

  const carTypeID = () => {
    const luxuryData = _.find(
      carTypeListData?.items,
      (item) => item.name === "Luxury Cars"
    );
    if (!_.get(luxuryData, "id", null)) {
      return;
    }
    let params = {
      type: _.get(luxuryData, "id", null),
      offset: 0,
    };

    if (_.get(loginData, "user.role", null) == "ROLE_CAR_OWNER") {
      dispatch(ownerCarListLuxStart(params));
    }
    if (_.get(loginData, "user.role", null) != "ROLE_CAR_OWNER") {
      dispatch(carListLuxStart(params));
    }
    if (loginData) {
      dispatch(profileDetailsStart());
    }
  };

  const getLoginStatus = async () => {
    carTypeListData == null && dispatch(carTypeListStart());
    countryListData == null && dispatch(countryListStart(null));
    parishListData == null && dispatch(parishListStart(null));
    if (loginData) {
      if (loginData?.user?.role === "ROLE_CUSTOMER") {
        dispatch(recentlyViewCarListStart());
      }
    } else {
      const login = await AsyncStorage.getItem("loginUserData");
      let access = JSON.parse(login);
      if (!loginData) {
        dispatch(loginUserSuccess(access));
      }
    }
  };

  const renderListing = (item: any, index: any) => {
    const assetImage = _.first(_.get(item, "carAssets", null));

    return (
      <TouchableOpacity
        onPress={() =>
          navigate("HostCarProfile", { carID: _.get(item, "id", null) })
        }
        style={[
          styles.ratedView,
          { marginRight: index % index.length !== 0 ? 8 : 0 },
        ]}
      >
        {_.get(assetImage, "image", null) ? (
          <Image
            source={{ uri: _.get(assetImage, "image", null) }}
            style={styles.fiView}
          />
        ) : (
          <Image
            source={Images.CarPlaceHolder}
            resizeMode="cover"
            style={styles.imageView}
          />
        )}
      </TouchableOpacity>
    );
  };

  const renderPerish = (item: any, index: any) => {
    return (
      <TouchableOpacity
        onPress={() => navigate("CarsPerish", { data: item })}
        style={[
          styles.cityView,
          { marginRight: index % index.length !== 0 ? 8 : 0 },
          // {marginLeft: 8},
        ]}
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
              CommonStyles.descCommonTxt,
              {
                marginBottom: 7,
              },
            ]}
          >
            {item?.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderRecently = (item: any, index: any) => {
    const assetImage = _.first(_.get(item, "car.carAssets", null));
    return (
      <TouchableOpacity
        onPress={() =>
          navigate("HostCarProfile", { carID: _.get(item, "car.id", null) })
        }
        style={[
          styles.recentView,
          { marginRight: index % index.length !== 0 ? 12 : 0 },
        ]}
      >
        <View style={{ flex: 1 }}>
          {_.get(assetImage, "image", null) ? (
            <FastImageView
              key={index}
              source={{ uri: _.get(assetImage, "image", null) }}
              style={styles.rrfiV}
              resizeMode={"cover"}
            />
          ) : (
            <Image
              key={index}
              source={Images?.CarPlaceHolder}
              style={styles.rriv}
            />
          )}
          <View style={{ width: "100%", padding: 5 }}>
            <Text
              style={[FontStyle.urbanistBold, CommonStyles.buttonCommonTxt]}
            >
              {item?.car?.name}
            </Text>
            <Text
              style={[
                FontStyle.urbanistMedium,
                CommonStyles.extraSmallCommonTxt,
              ]}
              numberOfLines={1}
            >
              {item?.car?.description}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const SearchBar = () => {
    return (
      <TouchableHighlight
        style={styles.searchBarView}
        onPress={() =>
          navigate("LuxuryCars", {
            searchModalOpen: true,
            carTypeId: _.get(carTypeListData, "items[1].id", null),
          })
        }
      >
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View style={styles.searchLeftView}>
            <SearchSvg height={18} width={18} />
          </View>
          <View style={styles.searchCenterView}>
            <Text
              style={[
                FontStyle.urbanistMedium,
                { color: Variables.Colors.inputTxtColor },
              ]}
            >
              {t("labelConst.inputCity")}
            </Text>
          </View>
          {_.get(loginData, "user.role", null) == "ROLE_CAR_OWNER" ? null : (
            <View style={styles.searchRightView}>
              <HeartYellow width={18} height={18} />
            </View>
          )}
        </View>
      </TouchableHighlight>
    );
  };

  const onRefresh = () => {
    getLoginStatus();
    carTypeID();
    setRefreshing(true);
  };

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
            width={Variables.Measures.width}
            height={Variables.Measures.width / 1.8}
          >
            <Rect
              x="0"
              y="0"
              rx="4"
              ry="4"
              width={Variables.Measures.width}
              height={Variables.Measures.width / 1.5}
            />

            <Circle
              cx={Variables.Measures.width / 2.25}
              cy={Variables.Measures.width / 2}
              r="6"
            />
            <Circle
              cx={Variables.Measures.width / 2}
              cy={Variables.Measures.width / 2}
              r="6"
            />
            <Circle
              cx={Variables.Measures.width / 1.8}
              cy={Variables.Measures.width / 2}
              r="6"
            />
            {/* <Rect
              x="150"
              y="200"
              rx="4"
              ry="4"
              width={Variables.Measures.width / 4}
              height="8"
            /> */}
          </ContentLoader>

          <View
            style={{
              width: Variables.Measures.width,
              marginTop: 10,
              height: 50,
            }}
          >
            <ContentLoader
              backgroundColor={Variables.Colors.absoluteBgGrey}
              foregroundColor={Variables.Colors.grey}
            >
              <Rect x="2%" y="0" rx="5" ry="5" width="48%" height="50" />
              <Rect x="52%" y="0" rx="5" ry="5" width="46%" height="50" />
            </ContentLoader>
          </View>

          <View
            style={{
              width: Variables.Measures.width,
              alignSelf: "center",
              marginTop: 20,
            }}
          >
            <ContentLoader
              height={380}
              backgroundColor={Variables.Colors.absoluteBgGrey}
              foregroundColor={Variables.Colors.grey}
              width={Variables.Measures.width}
            >
              <Rect x="10" y="0" rx="5" ry="5" width="40%" height="20" />
              <Rect
                x="2%"
                y="40"
                rx={Variables.MetricsSizes.small}
                ry={Variables.MetricsSizes.small}
                width={Variables.Measures.width / 3}
                height="120"
              />
              <Rect
                x={Variables.Measures.width / 2.6}
                y="40"
                rx={Variables.MetricsSizes.small}
                ry={Variables.MetricsSizes.small}
                width={Variables.Measures.width / 3}
                height="120"
              />
              <Rect x="10" y="190" rx="5" ry="5" width="40%" height="20" />
              <Rect x="10" y="230" rx="5" ry="5" width="58%" height="120" />
              <Rect x="64%" y="230" rx="5" ry="5" width="48%" height="120" />
            </ContentLoader>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };

  const data = Array.from({ length: 5 });
  const RectangularBoxLoader = () => {
    return (
      <View>
        <ContentLoader
          backgroundColor={Variables.Colors.absoluteBgGrey}
          foregroundColor={Variables.Colors.grey}
          height={Variables.Measures.width / 3}
          width={Variables.Measures.width / 3}
          style={{ marginHorizontal: 5 }}
        >
          <Rect
            x="0"
            y="0"
            rx={Variables.MetricsSizes.small}
            ry={Variables.MetricsSizes.small}
            width={Variables.Measures.width / 3}
            height={Variables.Measures.width / 3}
          />
        </ContentLoader>
      </View>
    );
  };

  return !carListlux && !ownerCarListLux ? (
    <LoadingView />
  ) : (
    <View style={[CommonStyles.safeAreaStyle]}>
      {Platform.OS == "ios" ? (
        <StatusBar
          ref={statusRef}
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
      <ScrollView
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Variables.Colors.white}
          />
        }
      >
        <View style={{ flex: 1 }}>
          <View style={{ width: "100%" }}>
            <SliderBox
              ImageComponent={FastImage}
              images={carImages}
              sliderBoxHeight={Measures.width / 1.2}
              dotColor="#FFF"
              inactiveDotColor="#ffffff00"
              paginationBoxStyle={styles.boxStyle}
              dotStyle={styles.activeDotStyles}
              ImageComponentStyle={{ width: "100%" }}
              imageLoadingColor={Colors.blackBg}
            />

            <SearchBar />
          </View>
          <View style={styles.rideView}>
            <Text
              style={[
                FontStyle.urbanistSemiBold,
                CommonStyles.titleCommonTxt,
                { color: Colors.yellow },
              ]}
            >
              {t("labelConst.findRide")}
            </Text>
          </View>
          {/* <View style={styles.luxuryCarsView1} /> */}

          <View style={styles.luxuryCarsView}>
            {_.size(_.get(carTypeListData, "items", null)) > 0 &&
              carTypeListData?.items.map((item: any, index: any) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={{
                      width:
                        _.get(carTypeListData, "totalCount", null) > 1
                          ? "50%"
                          : "100%",
                    }}
                    onPress={() => [
                      _.get(item, "name", null) === "Luxury Cars"
                        ? navigate("LuxuryCars", {
                            searchModalOpen: false,
                            carTypeId: _.get(item, "id", null),
                            carTypeName: _.get(item, "name", null),
                          })
                        : navigate("RydeCars", {
                            searchModalOpen: false,
                            carTypeId: _.get(item, "id", null),
                            carTypeName: _.get(item, "name", null),
                          }),
                    ]}
                  >
                    <View style={[styles.bgYellowView, { height: "100%" }]} />
                    <View style={[styles.blackAbsoluteView]}>
                      <Text
                        style={[
                          FontStyle.urbanistSemiBold,
                          CommonStyles.smallCommonTxt,
                        ]}
                      >
                        {_.get(item, "name", null)}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })}
          </View>

          <View
            style={{
              width: "96%",
              alignSelf: "center",
            }}
          >
            {_.get(loginData, "user.role", null) == "ROLE_CAR_OWNER" ? (
              <>
                {_.get(ownerCarListLux, "totalCount", null) > 0 ? (
                  <>
                    <View>
                      <Text
                        style={[
                          FontStyle.urbanistMedium,
                          CommonStyles.buttonCommonTxt,
                        ]}
                      >
                        {t("labelConst.luxuryListing")}
                      </Text>
                    </View>
                    <View style={{ marginTop: 15 }}>
                      <FlatList
                        horizontal={true}
                        initialNumToRender={5}
                        showsHorizontalScrollIndicator={false}
                        data={_.get(ownerCarListLux, "items", null) || []}
                        // renderItem={({ item, index }) =>
                        //   renderListing(item, index)
                        // }
                        renderItem={({ item, index }) => (
                          <CarCardView
                            carItem={item}
                            index={index}
                            customStyle={{
                              width: Measures.width - 25,
                              alignSelf: "center",
                              borderRadius: 10,
                              paddingRight: 10,
                            }}
                          />
                        )}
                        style={{ width: "100%" }}
                      />
                    </View>
                  </>
                ) : (
                  <View style={{ marginTop: 0 }}></View>
                )}
              </>
            ) : _.get(carListlux, "totalCount", null) > 0 ? (
              <>
                <View style={{ marginTop: 10 }}>
                  <Text
                    style={[
                      FontStyle.urbanistMedium,
                      CommonStyles.buttonCommonTxt,
                    ]}
                  >
                    {t("labelConst.luxuryListing")}
                  </Text>
                </View>
                <View style={{ marginTop: 15 }}>
                  <FlatList
                    horizontal={true}
                    initialNumToRender={5}
                    showsHorizontalScrollIndicator={false}
                    data={_.get(carListlux, "items", null) || []}
                    renderItem={({ item, index }) => (
                      <CarCardView
                        carItem={item}
                        index={index}
                        customStyle={{
                          width: Measures.width - 30,
                          alignSelf: "center",
                          borderRadius: 10,
                          paddingRight: 15,
                        }}
                      />
                    )}
                    style={{ width: "100%" }}
                  />
                </View>
              </>
            ) : (
              <View
                style={{ marginTop: Variables.Measures.fontSize * 1.5 }}
              ></View>
            )}

            {_.size(recentlyViewCarListData) > 0 ? (
              <>
                <View style={{ marginTop: Variables.Measures.fontSize * 2 }}>
                  <Text
                    style={[
                      FontStyle.urbanistMedium,
                      CommonStyles.buttonCommonTxt,
                    ]}
                  >
                    {t("labelConst.recentlyViewd")}
                  </Text>
                </View>
                <View style={styles.cityOuterView}>
                  {_.size(recentlyViewCarListData) > 0 && (
                    <FlatList
                      horizontal={true}
                      initialNumToRender={3}
                      showsHorizontalScrollIndicator={false}
                      data={recentlyViewCarListData}
                      renderItem={({ item, index }) =>
                        renderRecently(item, index)
                      }
                      style={{ width: "100%", marginTop: 5 }}
                    />
                  )}
                </View>
              </>
            ) : (
              <View style={{ marginTop: 0 }} />
            )}
            <View
              style={{
                marginTop: carListLuxStart ? Measures.fontSize : 0,
                marginBottom: 40,
              }}
            >
              <Text
                style={[FontStyle.urbanistMedium, CommonStyles.buttonCommonTxt]}
              >
                {t("labelConst.searchPerish")}
              </Text>
              <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                initialNumToRender={5}
                data={_.get(parishListData, "items", null) || []}
                renderItem={({ item, index }) => renderPerish(item, index)}
                style={{ width: "100%", marginTop: 15 }}
              />
            </View>
          </View>

          <View style={[styles.bgYellowView, { height: 6 }]}>
            <View style={styles.blackBgView} />
          </View>
          <View style={styles.greyBgView}>
            <View style={styles.rowView}>
              <View style={styles.leftView}>
                <Options2 />
              </View>
              <View style={styles.rightView}>
                <Text
                  style={[
                    FontStyle.urbanistBold,
                    CommonStyles.smallCommonTxt,
                    { color: Colors.yellow },
                  ]}
                >
                  {t("labelConst.gotBack")}
                </Text>
                <Text
                  style={[
                    FontStyle.urbanistMedium,
                    CommonStyles.descCommonTxtOnly,
                  ]}
                >
                  {t("labelConst.descTxt")}
                </Text>
              </View>
            </View>
          </View>
          <View style={[styles.greyBgView]}>
            <View style={styles.rowView}>
              <View style={styles.leftView}>
                <Options />
              </View>
              <View style={[styles.rightView]}>
                <Text
                  style={[
                    FontStyle.urbanistBold,
                    CommonStyles.smallCommonTxt,
                    { color: Colors.yellow },
                  ]}
                >
                  {t("labelConst.endlessOptions")}
                </Text>
                <Text
                  style={[
                    FontStyle.urbanistMedium,
                    CommonStyles.descCommonTxtOnly,
                  ]}
                >
                  {t("labelConst.desc2Txt")}
                </Text>
              </View>
            </View>
          </View>
          <Image
            style={{
              width: Measures.width,
              height: Measures.width / 1.6,
              marginVertical: 25,
            }}
            source={require("../../assets/Images/Bottom_group.jpg")}
            resizeMode={"cover"}
          />
        </View>
      </ScrollView>
      <BlurViewUI Type="light" />
    </View>
  );
};

const styles = StyleSheet.create({
  desc: {
    color: Variables.Colors.white,
    fontSize: 12,
    marginBottom: 7,
    marginLeft: 10,
  },
  carTxt: {
    color: Variables.Colors.chatWhite,
    fontSize: 14,
    marginTop: 7,
    marginLeft: 10,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  rriv: {
    width: Variables.Measures.width / 1.42,
    height: Variables.Measures.fontSize * 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  rrfiV: {
    width: Variables.Measures.width / 1.15,
    height: Variables.Measures.fontSize * 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  imageView: {
    height: "100%",
    width: "100%",
    borderRadius: 20,
  },
  fiView: {
    height: "100%",
    width: "100%",
    borderRadius: Variables.MetricsSizes.small,
  },
  statusBarStyle: {
    height: 35,
    backgroundColor: Variables.Colors.greyBg,
  },
  absolute: {
    position: "absolute",
    width: "100%",
    top: 0,
    height: Variables.Measures.StatusBarHeight + 10,
  },
  perishesTxt: {
    fontSize: 14,
    color: Variables.Colors.white,
    marginBottom: 15,
  },
  carImgStyle: {
    width: Variables.Measures.width / 2.82,
    height: Variables.Measures.width / 3.5,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  recentImgStyle: {
    width: Variables.Measures.width / 1.4,
    height: Variables.Measures.fontSize * 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  carDescTxt: {
    color: Variables.Colors.white,
    fontSize: 10,
    marginBottom: 7,
    marginLeft: 10,
  },
  luxuryCarsView1: {
    height: 30,
    width: "100%",
    position: "absolute",
    top: 280,
    alignSelf: "center",
    // flexDirection: "row",
    // justifyContent: "space-between",
    backgroundColor: "black",
    marginTop: 10,
  },
  luxuryCarsView: {
    height: 80,
    width: "98%",
    // position: "absolute",
    // top: 290,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    bottom: 0,
  },
  carsTxt: {
    color: Variables.Colors.white,
    fontSize: 20,
  },
  rideView: {
    // position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    width: "100%",
    backgroundColor: Colors.darkBlack,
    bottom: 20,
  },
  rydeTxt: {
    fontSize: 24,
    color: Variables.Colors.darkYellow,
  },
  introImageStyle: {
    width: Variables.Measures.width,
    height: 300,
  },
  boxStyle: {
    position: "absolute",
    bottom: 0,
    padding: 0,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  inActiveDotStyle: {
    height: 13,
    width: 13,
    borderWidth: 2,
    borderColor: Variables.Colors.white,
    borderRadius: 10,
    marginBottom: 50,
  },
  activeDotStyles: {
    height: 15,
    width: 15,
    backgroundColor: Variables.Colors.white,
    borderRadius: 10,
    borderWidth: 2,
    marginBottom: Measures.fontSize,
    borderColor: Variables.Colors.white,
  },
  bgYellowView: {
    width: "98%",
    alignSelf: "center",
    borderTopEndRadius: 15,
    borderTopStartRadius: 15,
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
  blackAbsoluteView: {
    width: "99%",
    alignSelf: "center",
    borderTopEndRadius: 15,
    borderTopStartRadius: 15,
    backgroundColor: Variables.Colors.darkBlack,
    position: "absolute",
    top: 3,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  ratedView: {
    borderRadius: Variables.MetricsSizes.small,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
    width: Variables.Measures.width / 3,
    height: Variables.Measures.width / 3,
  },
  cityView: {
    borderRadius: 15,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
    width: Variables.Measures.width / 2.8,
    backgroundColor: Variables.Colors.carGrey,
  },
  recentView: {
    borderRadius: 10,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
    width: Variables.Measures.width / 1.14,
    backgroundColor: Variables.Colors.carGrey,
    marginVertical: 10,
  },
  listingTxt: {
    color: Variables.Colors.white,
    fontSize: 16,
    marginVertical: 10,
  },
  carNameTxt: {
    color: Variables.Colors.chatWhite,
    fontSize: 12,
    marginTop: 7,
    marginLeft: 10,
  },
  leftView: {
    width: "15%",
    alignItems: "center",
    paddingTop: 5,
  },
  rightView: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 7,
  },
  headingTxt: {
    color: Variables.Colors.darkYellow,
    fontSize: 16,
  },
  descTxt: {
    color: Variables.Colors.white,
    fontSize: 14,
    marginTop: 5,
    lineHeight: 22,
  },
  greyBgView: {
    backgroundColor: Variables.Colors.darkGrey,
    width: "96%",
    alignSelf: "center",
  },
  rowView: {
    alignSelf: "center",
    flexDirection: "row",
    paddingVertical: 10,
  },
  cityOuterView: {
    marginBottom: 0,
  },
  searchLeftView: {
    width: "10%",
    alignItems: "center",
    justifyContent: "center",
  },
  searchCenterView: {
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
  },
  searchRightView: {
    width: "10%",
    alignItems: "center",
    justifyContent: "center",
  },
  searchBarView: {
    position: "absolute",
    top: Variables.Measures.StatusBarHeight + 20,
    backgroundColor: Variables.Colors.search,
    height: 40,
    width: "90%",
    alignSelf: "center",
    borderRadius: 15,
    flexDirection: "row",
    paddingHorizontal: 8,
  },
  inputView: {
    width: "95%",
    alignSelf: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
});

export default memo(Search);

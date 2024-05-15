import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  RefreshControl,
  Platform,
} from "react-native";
import { useTranslation } from "react-i18next";
import { Variables, FontStyle, Layout, Images, CommonStyles } from "../Theme";
import StarSvg from "../assets/Images/ModalIcons/StarRatingYellow.svg";
import HeartRedSvg from "../assets/Images/HeartRed.svg";
import HeartWhiteSvg from "../assets/Images/HeartBorderWhite.svg";
import DateSvg from "../assets/Images/DateSvg.svg";
import LocationSvg from "../assets/Images/LocationRound.svg";
import LeftSvg from "../assets/Images/BackArrow.svg";
import { goBack, navigate, replace } from "../navigators/RootNavigation";
import { CommonProps } from "./types";
import StarRating from "react-native-star-rating-widget";
import _ from "lodash";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  carViewStart,
  carViewSuccess,
  favouriteCarAddStart,
  favouriteCarRemoveStart,
} from "../actions/customerActions";
import { ReducerStateProps } from "./Inbox/InterfaceProps";
import ButtonView from "../components/ButtonView";
import BlurViewUI from "../components/BlurView";
import Calender from "./Calender";
import { SliderBox } from "../components/SliderImages/SliderBox";

import FastImageView from "../components/FastImageView";
import ParishModal from "../components/ParishModal";
import { Colors, Measures } from "../Theme/variables";

import ContentLoader, { Rect, Circle } from "react-content-loader/native";
import { getOr, MaxCharCount, toastConst } from "../constants/constants";
import ToastMessage from "../components/ToastMessage";

import {
  ownerCarViewStart,
  ownerCarViewSuccess,
} from "../actions/carOwnerActions";
import FastImage from "react-native-fast-image";
import DashedLine from "react-native-dashed-line";
import CustomRatingBar from "../components/CustomRatingBar";

const HostCarProfile: React.FC<CommonProps> = ({ route }) => {
  const carId = route.params?.carID;
  const dispatch = useDispatch();

  const [
    ownerCarViewData,
    carViewData,
    isLoading,
    isLoadingOwner,
    profileDetailsData,
  ] = useSelector((state: ReducerStateProps) => [
    state.carOwner.ownerCarViewData,
    state.customer.carViewData,
    state.customer.isLoading,
    state.carOwner.isLoading,
    state.user.profileDetailsData,
  ]);

  const [searchModal, setSearchModal] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);
  const [isCalendar, setCalendar] = useState(false);
  const [showFullText, setShowFullText] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [commanCarData, setCommanCarData] = useState(null);

  const [parish, setParish] = useState(null);
  const [TripDates, setTripDates] = useState({
    fromDateTime: moment(new Date()),
    toDateTime: moment(new Date()),
  });
  const { t } = useTranslation();

  const userRole = _.get(profileDetailsData, "verifiedInfo.role", null);

  useEffect(() => {
    let params = {
      carId: carId,
    };

    if (userRole === "ROLE_CAR_OWNER") {
      dispatch(ownerCarViewStart(params));
    } else {
      dispatch(carViewStart(params));
    }

    return () => {
      dispatch(carViewSuccess(null));
      dispatch(ownerCarViewSuccess(null));
    };
  }, []);

  useEffect(() => {
    setCommanCarData(
      userRole == "ROLE_CAR_OWNER" ? ownerCarViewData : carViewData
    );
  }, [ownerCarViewData, carViewData]);

  useEffect(() => {
    setIsFavourite(_.get(commanCarData, "isFavourite", null));
  }, [_.get(commanCarData, "isFavourite", null)]);

  useEffect(() => {
    if (_.get(commanCarData, "carAddress.parish.name", null)) {
      setParish(_.get(commanCarData, "carAddress.parish.name", null));
    }
  }, [_.get(commanCarData, "carAddress.parish.name", null)]);

  useEffect(() => {
    if (!isLoading || !isLoadingOwner) {
      setRefreshing(false);
    }
  }, [isLoading, isLoadingOwner]);

  const removeAddFavourite = () => {
    let params = {
      car: commanCarData?.id,
    };
    if (isFavourite) {
      dispatch(favouriteCarRemoveStart(params));
    } else {
      dispatch(favouriteCarAddStart(params));
    }
  };

  const renderCarInfo = (item: any, index: any) => {
    return (
      <View key={item.id} style={styles.renderCarInfoView}>
        <FastImageView
          source={{ uri: item.icon }}
          style={styles.fastIV}
          resizeMode={"contain"}
        />
        <Text style={[styles.carInfoTxt, CommonStyles.descCommonTxt]}>
          {item?.name}
        </Text>
      </View>
    );
  };

  const renderCarFeatures = (item: any, index: any) => {
    return (
      <View
        key={item.id}
        style={[styles.renderCarInfoView, { width: Measures.fontSize * 2.5 }]}
      >
        <FastImageView
          source={{ uri: item.icon }}
          style={styles.fastIV}
          resizeMode={"contain"}
        />
      </View>
    );
  };

  const CarsProfile = () => {
    return (
      <View style={{ flex: 1 }}>
        <ParishModal
          modalVisible={searchModal}
          onDismiss={() => setSearchModal(false)}
          filterPlug={false}
          onSuccess={(val) => {
            setParish(val), setSearchModal(false);
          }}
        />
        <View
          style={{
            height: 250,
          }}
        >
          {_.size(_.get(commanCarData, "carAssets", null)) > 0 ? (
            <SliderBox
              ImageComponent={FastImage}
              images={_.get(commanCarData, "carAssets", null)}
              sliderBoxHeight={250}
              dotColor="#FFF"
              inactiveDotColor="#ffffff00"
              paginationBoxStyle={styles.boxStyle}
              dotStyle={styles.activeDotStyles}
              ImageComponentStyle={{ width: "100%" }}
              imageLoadingColor={Colors.blackBg}
            />
          ) : _.size(_.get(commanCarData, "carAssets", null)) > 0 ? (
            <SliderBox
              ImageComponent={FastImage}
              images={_.get(commanCarData, "carAssets", null)}
              sliderBoxHeight={250}
              dotColor="#FFF"
              inactiveDotColor="#ffffff00"
              paginationBoxStyle={styles.boxStyle}
              dotStyle={styles.activeDotStyles}
              ImageComponentStyle={{ width: "100%" }}
              imageLoadingColor={Colors.blackBg}
            />
          ) : (
            <View
              style={{
                flex: 1,
                alignItems: "center",
              }}
            >
              <Image
                style={styles.introImageStyle}
                source={Images.CarPlaceHolder}
                resizeMode="cover"
              />
            </View>
          )}
          <TouchableOpacity style={styles.backPressView} onPress={goBack}>
            <LeftSvg />
          </TouchableOpacity>
        </View>
        <View style={styles.CarNameOuterView}>
          <View style={styles.CarNameView}>
            {_.get(commanCarData, "carOwner", null) ? (
              <Text
                style={[
                  FontStyle.urbanistMedium,
                  CommonStyles.extraSmallCommonTxt,
                ]}
              >
                {_.get(commanCarData, "carOwner.fullName", null)}
              </Text>
            ) : _.get(profileDetailsData, "verifiedInfo.fullName", null) ? (
              <Text
                style={[
                  FontStyle.urbanistMedium,
                  CommonStyles.extraSmallCommonTxt,
                ]}
              >
                {_.get(profileDetailsData, "verifiedInfo.fullName", null)}
              </Text>
            ) : null}

            <Text
              style={[FontStyle.urbanistBold, CommonStyles.buttonCommonTxt]}
            >
              {_.get(commanCarData, "name", null)}
            </Text>

            <View style={styles.ratingsView}>
              {_.get(commanCarData, "avgRating", null) ? (
                <>
                  <Text
                    style={[
                      FontStyle.urbanistMedium,
                      CommonStyles.extraSmallCommonTxt,
                    ]}
                  >
                    {_.get(commanCarData, "avgRating", null)
                      ? parseFloat(
                          _.get(commanCarData, "avgRating", null)
                        ).toFixed(1)
                      : null}
                  </Text>
                  <View style={{ marginHorizontal: 4 }}>
                    <StarSvg height={12} width={12} />
                  </View>
                </>
              ) : null}

              {_.get(commanCarData, "trip", null) ? (
                <Text
                  style={[
                    FontStyle.urbanistMedium,
                    CommonStyles.extraSmallCommonTxt,
                  ]}
                >
                  ({_.get(commanCarData, "trip", null)} trips)
                </Text>
              ) : null}
            </View>
          </View>
          {/* <DashedLine
            dashLength={1.5}
            dashColor={Variables.Colors.borderGrey}
            axis="vertical"
            style={{ height: "100%" }}
          />
          <View style={styles.shareImgView}>
            <Text
              style={[
                FontStyle.urbanistBold,
                CommonStyles.smallCommonTxt,
                ,
                { color: Colors.white, flexShrink: 1 },
              ]}
            >
              {`US $${parseFloat(
                getOr(commanCarData, "marketValue", "0")
              ).toFixed(2)}`}
            </Text>
          </View> */}
          {userRole === "ROLE_CUSTOMER" ? (
            <DashedLine
              dashLength={1.5}
              dashColor={Variables.Colors.borderGrey}
              axis="vertical"
              style={{ height: "100%" }}
            />
          ) : null}
          {userRole === "ROLE_CUSTOMER" ? (
            <TouchableOpacity
              onPress={() => {
                setIsFavourite(!isFavourite);
                removeAddFavourite();
              }}
              style={styles.likeImgView}
            >
              {isFavourite ? (
                <HeartRedSvg height={25} width={25} />
              ) : (
                <HeartWhiteSvg height={25} width={25} />
              )}
            </TouchableOpacity>
          ) : userRole === "ROLE_CAR_OWNER" ? null : (
            <TouchableOpacity
              onPress={() => {
                replace("LoginSplash");
              }}
              style={styles.likeImgView}
            >
              <HeartWhiteSvg height={25} width={25} />
            </TouchableOpacity>
          )}
        </View>

        {userRole !== "ROLE_CAR_OWNER" && (
          <View style={styles.paddingView}>
            <Text
              style={[
                FontStyle.urbanistBold,
                styles.dateTxt,
                CommonStyles.smallCommonTxt,
                { color: Variables.Colors.inputTxtColor },
              ]}
            >
              TRIP DATES
            </Text>

            <TouchableOpacity
              style={styles.tripDatesView}
              onPress={() => setCalendar(true)}
            >
              <View style={styles.dateImgView}>
                <DateSvg />
              </View>
              <View style={styles.dateCenterView}>
                <Text
                  style={[FontStyle.urbanistMedium, CommonStyles.descCommonTxt]}
                >
                  {moment(TripDates?.fromDateTime).format(
                    "ddd. MMM DD YYYY. hh:mm a"
                  )}
                </Text>
                <Text
                  style={[
                    FontStyle.urbanistMedium,
                    CommonStyles.descCommonTxt,
                    { marginTop: 3 },
                  ]}
                >
                  {moment(TripDates?.toDateTime).format(
                    "ddd. MMM DD YYYY. hh:mm a"
                  )}
                </Text>
              </View>
              <View style={styles.rightChangeView}>
                {userRole !== "ROLE_CAR_OWNER" ? (
                  <Text
                    style={[
                      FontStyle.urbanistBold,
                      CommonStyles.descCommonTxt,
                      { color: Variables.Colors.yellow },
                    ]}
                  >
                    CHANGE
                  </Text>
                ) : null}
              </View>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.paddingView}>
          <Text
            style={[
              FontStyle.urbanistBold,
              styles.dateTxt,
              CommonStyles.smallCommonTxt,
              { color: Variables.Colors.inputTxtColor },
            ]}
          >
            PICKUP & RETURN
          </Text>

          <TouchableOpacity
            disabled={userRole == "ROLE_CAR_OWNER"}
            style={styles.tripDatesView}
            onPress={() => setSearchModal(true)}
          >
            <View style={styles.dateImgView}>
              <LocationSvg />
            </View>

            <View style={styles.dateCenterView}>
              {userRole === "ROLE_CAR_OWNER" ? (
                <Text
                  style={[FontStyle.urbanistMedium, CommonStyles.descCommonTxt]}
                >
                  {_.get(commanCarData, "parish.name", null)}
                </Text>
              ) : (
                <Text style={[FontStyle.urbanistMedium, styles.perishAddress]}>
                  {_.get(parish, "name", null) ||
                    "Parish name and address of car"}
                </Text>
              )}
            </View>

            <View style={styles.rightChangeView}>
              {userRole !== "ROLE_CAR_OWNER" ? (
                <Text
                  style={[
                    FontStyle.urbanistBold,
                    CommonStyles.descCommonTxt,
                    { color: Variables.Colors.yellow },
                  ]}
                >
                  CHANGE
                </Text>
              ) : null}
            </View>
          </TouchableOpacity>
        </View>

        {_.size(_.get(commanCarData, "carInformation", null)) > 0 ? (
          <View style={styles.paddingView}>
            <Text
              style={[
                FontStyle.urbanistBold,
                styles.dateTxt,
                CommonStyles.smallCommonTxt,
                { color: Variables.Colors.inputTxtColor },
              ]}
            >
              CAR INFO
            </Text>
            <View style={[styles.carInfoView]}>
              <FlatList
                data={_.get(commanCarData, "carInformation", null)}
                renderItem={({ item, index }) => renderCarInfo(item, index)}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{ width: "100%" }}
              />
            </View>
          </View>
        ) : null}

        {_.size(_.get(commanCarData, "carFeature", null)) > 0 ? (
          <View style={styles.paddingView}>
            <Text
              style={[
                FontStyle.urbanistBold,
                styles.dateTxt,
                CommonStyles.smallCommonTxt,
                { color: Variables.Colors.inputTxtColor },
              ]}
            >
              FEATURES
            </Text>
            <TouchableOpacity
              style={[styles.carInfoView]}
              onPress={() =>
                navigate("Features", {
                  carFeature: _.get(commanCarData, "carFeature", null),
                })
              }
            >
              <FlatList
                data={
                  _.get(commanCarData, "carFeature", null)?.slice(0, 4) || []
                }
                renderItem={({ item, index }) => renderCarFeatures(item, index)}
                horizontal={true}
                keyExtractor={(item) => item?.id?.toString()}
                showsHorizontalScrollIndicator={false}
                style={{ width: "50%" }}
              />

              {_.get(commanCarData, "carFeature.length", null) > 3 && (
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={[
                      FontStyle.urbanistBold,
                      CommonStyles.descCommonTxt,
                      { color: Variables.Colors.yellow },
                    ]}
                  >
                    VIEW ALL
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        ) : null}

        <View style={styles.paddingView}>
          <Text
            style={[
              FontStyle.urbanistBold,
              styles.dateTxt,
              CommonStyles.smallCommonTxt,
              { color: Variables.Colors.inputTxtColor },
            ]}
          >
            DESCRIPTION
          </Text>
          <View style={styles.descView}>
            <Text
              style={[
                FontStyle.urbanistMedium,
                styles.descTxt1,
                CommonStyles.descCommonTxt,
                { lineHeight: 22, letterSpacing: 0.15 },
              ]}
            >
              {showFullText
                ? commanCarData?.description
                : _.slice(commanCarData?.description, 0, MaxCharCount)}
              {!showFullText &&
                _.size(commanCarData?.description) > MaxCharCount &&
                "..."}
            </Text>
            {_.size(commanCarData?.description) > MaxCharCount && (
              <TouchableOpacity
                style={styles.readView}
                onPress={() => setShowFullText(!showFullText)}
              >
                <Text style={[FontStyle.urbanistBold, styles.changeTxt]}>
                  {showFullText ? "READ LESS" : "READ MORE"}
                </Text>
              </TouchableOpacity>
            )}
            <View style={{ height: 10 }} />
          </View>
        </View>

        {_.find(_.get(commanCarData, "insuranceProtection", null)) && (
          <View style={styles.paddingView}>
            <Text
              style={[
                FontStyle.urbanistBold,
                styles.dateTxt,
                CommonStyles.smallCommonTxt,
                { color: Variables.Colors.inputTxtColor },
              ]}
            >
              INSURANCE & PROTECTION
            </Text>
            <View style={styles.descView}>
              <Text
                style={[
                  FontStyle.urbanistMedium,
                  styles.descTxt1,
                  CommonStyles.descCommonTxt,
                ]}
              >
                {showFullText
                  ? commanCarData?.insuranceProtection?.text
                  : _.slice(
                      commanCarData?.insuranceProtection?.text,
                      0,
                      MaxCharCount
                    )}
                {!showFullText &&
                  _.size(commanCarData?.insuranceProtection?.text) >
                    MaxCharCount &&
                  "..."}
              </Text>
              {_.size(commanCarData?.insuranceProtection?.text) >
                MaxCharCount &&
                userRole === "ROLE_CUSTOMER" && (
                  <TouchableOpacity
                    style={styles.readView}
                    onPress={() =>
                      navigate("Insurance", {
                        INSURANCE: commanCarData?.insuranceProtection?.text,
                      })
                    }
                  >
                    <Text style={[FontStyle.urbanistBold, styles.changeTxt]}>
                      {showFullText ? "READ LESS" : "READ MORE"}
                    </Text>
                  </TouchableOpacity>
                )}
              <View style={{ height: 10 }} />
            </View>
          </View>
        )}
      </View>
    );
  };

  const RatingsReviews = () => {
    return (
      <View style={{ flex: 1 }}>
        <View style={[styles.bgYellowView, { height: 6, marginTop: 10 }]}>
          <View style={styles.blackBgView} />
        </View>
        <View style={styles.greyBgView}>
          <View style={styles.rowView}>
            <Text
              style={[
                FontStyle.urbanistBold,
                styles.userNameTxt1,
                CommonStyles.descCommonTxt,
                { color: Variables.Colors.inputTxtColor },
              ]}
            >
              {t("labelConst.ratingsReviews")}
            </Text>
            <View style={styles.ratingsRowView}>
              <Text style={[FontStyle.urbanistMedium, styles.ratingsTxt]}>
                {_.get(commanCarData, "avgRating", null)
                  ? parseFloat(_.get(commanCarData, "avgRating", null)).toFixed(
                      1
                    )
                  : null}
              </Text>
              <View style={{ marginHorizontal: 3 }}>
                <StarSvg height={15} width={15} />
              </View>
              <Text style={[FontStyle.urbanistMedium, styles.ratingsTxt]}>
                {_.size(commanCarData?.reviews) + " ratings"}
              </Text>
            </View>

            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={_.get(commanCarData, "reviews", null) || []}
              renderItem={({ item, index }) => renderReviews(item, index)}
              style={{
                width: "100%",
              }}
            />

            <TouchableOpacity
              style={[styles.seeAllView, { width: "100%" }]}
              onPress={() => {
                userRole === "ROLE_CUSTOMER"
                  ? navigate("Reviews", {
                      reviewDatalist:
                        _.get(commanCarData, "reviews", null) || [],
                      avgRating: _.get(commanCarData, "avgRating", null),
                    })
                  : userRole === "ROLE_CAR_OWNER"
                  ? navigate("Reviews", {
                      reviewDatalist:
                        _.get(commanCarData, "reviews", null) || [],
                      avgRating: _.get(commanCarData, "avgRating", null),
                    })
                  : navigate("Reviews", {
                      // carId: carId
                      reviewDatalist:
                        _.get(commanCarData, "reviews", null) || [],
                      avgRating: _.get(commanCarData, "avgRating", null),
                    });
              }}
            >
              <Text style={[FontStyle.urbanistBold, styles.changeTxt]}>
                {t("labelConst.seeAllReviews")}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const renderReviews = (item: any, index: number) => {
    return (
      <View
        style={[
          styles.ratedView,
          { marginRight: index % item.length !== 0 ? 20 : 0 },
        ]}
      >
        <View style={styles.userRowView}>
          {_.find(item?.customer?.profilePicture) ? (
            <View style={{ width: "22%" }}>
              <FastImageView
                source={{ uri: _.get(item, "customer.profilePicture", null) }}
                style={styles.userImgStyle}
              />
            </View>
          ) : (
            <View style={{ width: "22%" }}>
              <Image
                source={Images.userPlaceholder}
                style={styles.userImgStyle}
              />
            </View>
          )}
          <View
            style={{
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <CustomRatingBar
              size={10}
              startingValue={item?.rating}
              totalStar={5}
              editable={false}
              readonly={true}
            />

            <View style={{ flexDirection: "row" }}>
              <Text
                style={[CommonStyles.tingCommonTxt, FontStyle.urbanistMedium]}
              >
                {_.get(item, "customer.fullName", null)}
              </Text>
              <Text
                style={[
                  CommonStyles.tingCommonTxt,
                  ,
                  FontStyle.urbanistMedium,
                  { marginLeft: 5 },
                ]}
              >
                {moment(item.createdDate, "YY-MM-DD HH:mm:ss").format(
                  "MMM DD YYYY"
                )}
              </Text>
            </View>
          </View>
        </View>
        <Text
          style={[
            FontStyle.urbanistRegular,
            CommonStyles.descCommonTxtOnly,
            { paddingVertical: 7 },
          ]}
          numberOfLines={3}
        >
          {_.get(item, "reviewText", null)}
        </Text>
      </View>
    );
  };

  const HostedBy = () => {
    const { t } = useTranslation();
    return (
      <View style={{ flex: 1 }}>
        <View style={[styles.bgYellowView, { height: 6, marginTop: 10 }]}>
          <View style={styles.blackBgView} />
        </View>
        <View style={styles.greyBgView}>
          <View
            style={{
              width: "94%",
              alignSelf: "center",
            }}
          >
            <Text
              style={[
                FontStyle.urbanistBold,
                styles.userNameTxt1,
                CommonStyles.descCommonTxt,
                { color: Variables.Colors.inputTxtColor },
              ]}
            >
              {t("labelConst.hostedBy")}
            </Text>
            <View style={[styles.userRowView1]}>
              <View
                style={{
                  width: "20%",
                  justifyContent: "center",
                }}
              >
                {_.find(commanCarData?.carOwner?.profilePicture) ? (
                  <TouchableOpacity
                    disabled={userRole !== "ROLE_CAR_OWNER"}
                    style={{ width: "22%" }}
                    onPress={() => {
                      userRole == "ROLE_CAR_OWNER"
                        ? navigate("UserProfile")
                        : null;
                    }}
                  >
                    <FastImageView
                      source={{
                        uri: _.get(
                          commanCarData,
                          "carOwner.profilePicture",
                          null
                        ),
                      }}
                      style={styles.userImgStyle1}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    disabled={userRole !== "ROLE_CAR_OWNER"}
                    style={{ width: "22%" }}
                    onPress={() => {
                      userRole == "ROLE_CAR_OWNER"
                        ? navigate("UserProfile")
                        : null;
                    }}
                  >
                    <Image
                      source={Images?.userPlaceholder}
                      style={styles.userImgStyle1}
                    />
                  </TouchableOpacity>
                )}
              </View>
              <View style={{ width: "80%" }}>
                <View style={styles.rowCenter}>
                  <Text
                    style={[
                      FontStyle.urbanistBold,
                      CommonStyles.smallCommonTxt,
                    ]}
                  >
                    {_.get(commanCarData, "carOwner.fullName", null)}
                  </Text>
                  <View style={{ flexDirection: "row" }}>
                    {_.get(commanCarData, "trip", null) > 0 && (
                      <Text
                        style={[
                          FontStyle.urbanistMedium,
                          styles.joinedTxt1,
                          CommonStyles.extraSmallCommonTxt,
                          { color: Variables.Colors.inputTxtColor },
                        ]}
                      >
                        {`${getOr(commanCarData, "trip", "0")} trips`}
                      </Text>
                    )}
                    <Text
                      style={[
                        FontStyle.urbanistMedium,
                        styles.joinedTxt,
                        CommonStyles.extraSmallCommonTxt,
                        { color: Variables.Colors.inputTxtColor },
                      ]}
                    >
                      Joined {_.get(commanCarData, "carOwner.joinDate", null)}
                    </Text>
                  </View>
                </View>
                <Text
                  style={[
                    FontStyle.urbanistBold,
                    CommonStyles.smallCommonTxt,
                    ,
                    {
                      color: Colors.white,
                      flexShrink: 1,
                      alignSelf: "flex-end",
                      marginTop: 5,
                    },
                  ]}
                >
                  {`US$${parseFloat(
                    getOr(commanCarData, "marketValue", "0")
                  ).toFixed(2)}`}
                </Text>
              </View>
            </View>

            {_.get(commanCarData, "carOwner.aboutYourself", null) !== null ? (
              <View style={{ width: "100%", marginBottom: 5 }}>
                <Text
                  style={[
                    FontStyle.urbanistRegular,
                    styles.descTxt1,
                    CommonStyles.descCommonTxt,
                  ]}
                >
                  {_.get(commanCarData, "carOwner.aboutYourself", null)}
                </Text>
              </View>
            ) : null}
          </View>
        </View>
      </View>
    );
  };

  const onRefresh = () => {
    setRefreshing(true);
    let params = {
      carId: carId,
    };
    if (
      _.get(profileDetailsData, "verifiedInfo.role", null) === "ROLE_CAR_OWNER"
    ) {
      dispatch(ownerCarViewStart(params));
    } else {
      dispatch(carViewStart(params));
    }
  };

  const LoadingView = () => {
    return (
      <View style={styles.safeAreaStyle}>
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
          <ContentLoader
            backgroundColor={Variables.Colors.absoluteBgGrey}
            foregroundColor={Variables.Colors.grey}
            height="250"
            width={Variables.Measures.width}
          >
            <Rect
              x="0"
              y="0"
              rx="0"
              ry="0"
              width={Variables.Measures.width}
              height="250"
            />
            <Rect x="15" y="40" rx="4" ry="4" width="30" height="30" />
          </ContentLoader>

          <View style={{ marginTop: 10 }}></View>

          <ContentLoader
            backgroundColor={Variables.Colors.absoluteBgGrey}
            foregroundColor={Variables.Colors.grey}
            width={Variables.Measures.width}
            height="70"
          >
            <Rect
              x="10"
              y="10"
              rx="4"
              ry="4"
              width={Variables.Measures.width / 3.5}
              height="8"
            />

            <Rect
              x="10"
              y="40"
              rx="4"
              ry="4"
              width={Variables.Measures.width / 3}
              height="8"
            />
            <Rect
              x="165"
              y="30"
              rx="4"
              ry="4"
              width={Variables.Measures.width / 3.5}
              height="8"
            />

            <Circle cx={Variables.Measures.width / 1.1} cy="30" r="12" />
          </ContentLoader>

          <ContentLoader
            backgroundColor={Variables.Colors.absoluteBgGrey}
            foregroundColor={Variables.Colors.grey}
            width={Variables.Measures.width}
            height="3"
          >
            <Rect
              x="0"
              y="0"
              rx="0"
              ry="0"
              width={Variables.Measures.width}
              height="1"
            />
          </ContentLoader>

          <ContentLoader
            backgroundColor={Variables.Colors.absoluteBgGrey}
            foregroundColor={Variables.Colors.grey}
            width={Variables.Measures.width}
            height="100"
          >
            <Rect
              x="10"
              y="10"
              rx="4"
              ry="4"
              width={Variables.Measures.width / 3.5}
              height="8"
            />
            <Circle cx="50" cy="60" r="30" />
            <Rect
              x="100"
              y="45"
              rx="4"
              ry="4"
              width={Variables.Measures.width / 3.5}
              height="8"
            />
            <Rect
              x="100"
              y="65"
              rx="4"
              ry="4"
              width={Variables.Measures.width / 3.5}
              height="8"
            />

            <Rect
              x={Variables.Measures.width / 1.25}
              y="55"
              rx="4"
              ry="4"
              width={Variables.Measures.width / 5.5}
              height="8"
            />
          </ContentLoader>

          <ContentLoader
            backgroundColor={Variables.Colors.absoluteBgGrey}
            foregroundColor={Variables.Colors.grey}
            width={Variables.Measures.width}
            height="20"
          >
            <Rect
              x="0"
              y="10"
              rx="0"
              ry="0"
              width={Variables.Measures.width}
              height="1"
            />
          </ContentLoader>

          <ContentLoader
            backgroundColor={Variables.Colors.absoluteBgGrey}
            foregroundColor={Variables.Colors.grey}
            width={Variables.Measures.width}
            height="100"
          >
            <Rect
              x="10"
              y="10"
              rx="4"
              ry="4"
              width={Variables.Measures.width / 3.5}
              height="8"
            />
            <Circle cx="50" cy="60" r="30" />
            <Rect
              x="100"
              y="50"
              rx="4"
              ry="4"
              width={Variables.Measures.width / 3.5}
              height="8"
            />

            <Rect
              x={Variables.Measures.width / 1.25}
              y="50"
              rx="4"
              ry="4"
              width={Variables.Measures.width / 5.5}
              height="8"
            />
          </ContentLoader>

          <ContentLoader
            backgroundColor={Variables.Colors.absoluteBgGrey}
            foregroundColor={Variables.Colors.grey}
            width={Variables.Measures.width}
            height="20"
          >
            <Rect
              x="0"
              y="10"
              rx="0"
              ry="0"
              width={Variables.Measures.width}
              height="1"
            />
          </ContentLoader>

          <ContentLoader
            backgroundColor={Variables.Colors.absoluteBgGrey}
            foregroundColor={Variables.Colors.grey}
            width={Variables.Measures.width}
            height="100"
          >
            <Rect
              x="10"
              y="10"
              rx="4"
              ry="4"
              width={Variables.Measures.width / 3.5}
              height="8"
            />

            <Rect
              x="20"
              y="30"
              rx="4"
              ry="4"
              width={Variables.Measures.width / 5.5}
              height="60"
            />

            <Rect
              x="120"
              y="30"
              rx="4"
              ry="4"
              width={Variables.Measures.width / 5.5}
              height="60"
            />

            <Rect
              x="220"
              y="30"
              rx="4"
              ry="4"
              width={Variables.Measures.width / 5.5}
              height="60"
            />
          </ContentLoader>

          <ContentLoader
            backgroundColor={Variables.Colors.absoluteBgGrey}
            foregroundColor={Variables.Colors.grey}
            width={Variables.Measures.width}
            height="20"
          >
            <Rect
              x="0"
              y="10"
              rx="0"
              ry="0"
              width={Variables.Measures.width}
              height="1"
            />
          </ContentLoader>

          <ContentLoader
            backgroundColor={Variables.Colors.absoluteBgGrey}
            foregroundColor={Variables.Colors.grey}
            width={Variables.Measures.width}
            height="100"
          >
            <Rect
              x="10"
              y="10"
              rx="4"
              ry="4"
              width={Variables.Measures.width / 3.5}
              height="8"
            />

            <Rect x="20" y="30" rx="4" ry="4" width="40" height="60" />

            <Rect x="120" y="30" rx="4" ry="4" width="40" height="60" />

            <Rect x="220" y="30" rx="4" ry="4" width="40" height="60" />

            <Rect
              x={Variables.Measures.width / 1.25}
              y="50"
              rx="4"
              ry="4"
              width={Variables.Measures.width / 5.5}
              height="8"
            />
          </ContentLoader>

          <ContentLoader
            backgroundColor={Variables.Colors.absoluteBgGrey}
            foregroundColor={Variables.Colors.grey}
            width={Variables.Measures.width}
            height="20"
          >
            <Rect
              x="0"
              y="10"
              rx="0"
              ry="0"
              width={Variables.Measures.width}
              height="1"
            />
          </ContentLoader>

          <ContentLoader
            backgroundColor={Variables.Colors.absoluteBgGrey}
            foregroundColor={Variables.Colors.grey}
            width={Variables.Measures.width}
            height="200"
          >
            <Rect
              x="10"
              y="10"
              rx="4"
              ry="4"
              width={Variables.Measures.width / 3.5}
              height="8"
            />

            <Rect
              x="10"
              y="30"
              rx="4"
              ry="4"
              width={Variables.Measures.width / 1.1}
              height="100"
            />

            <Rect
              x={Variables.Measures.width / 1.25}
              y="180"
              rx="4"
              ry="4"
              width={Variables.Measures.width / 5.5}
              height="8"
            />
          </ContentLoader>

          <ContentLoader
            backgroundColor={Variables.Colors.absoluteBgGrey}
            foregroundColor={Variables.Colors.grey}
            width={Variables.Measures.width}
            height="20"
          >
            <Rect
              x="0"
              y="10"
              rx="0"
              ry="0"
              width={Variables.Measures.width}
              height="1"
            />
          </ContentLoader>
        </ScrollView>
      </View>
    );
  };

  const nextScreen = () => {
    if (_.get(parish, "id", null) == null) {
      ToastMessage.set(toastConst.errorToast, "Please select pickup location");
      return;
    }
    if (
      moment(TripDates.fromDateTime).format("YYYY-MM-DD HH:mm:ss") >=
      moment(TripDates.toDateTime).format("YYYY-MM-DD HH:mm:ss")
    ) {
      ToastMessage.set(
        toastConst.errorToast,
        "To date time must be greater then from date time."
      );
      return;
    }

    navigate("GetApproved", {
      rentalCarObj: {
        car: _.get(carViewData, "id", null),
        pickupAddress: _.get(parish, "id", null),
        fromDateTime: TripDates.fromDateTime,
        toDateTime: TripDates.toDateTime,
        log: JSON.stringify({ carViewData }),
        fd: TripDates?.fromDateTime,
        td: TripDates?.toDateTime,
        ownerN: commanCarData?.carOwner?.fullName,
      },
    });
  };

  return !commanCarData ? (
    <LoadingView />
  ) : (
    <View style={styles.safeAreaStyle}>
      {Platform.OS == "ios" ? (
        <StatusBar translucent backgroundColor="transparent" />
      ) : (
        <StatusBar translucent backgroundColor={Variables.Colors.blackOpac85} />
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
          <CarsProfile />
          {_.size(commanCarData?.reviews) > 0 ? <RatingsReviews /> : null}
          {_.get(commanCarData, "carOwner.fullName", null) ? (
            <HostedBy />
          ) : null}

          {userRole === "ROLE_CAR_OWNER" ? null : (
            <View style={{ marginVertical: 20 }}>
              <ButtonView
                width={Variables.Measures.width / 2}
                btnTxt={t("labelConst.continueTxt")}
                backgroundColor={Variables.Colors.yellow}
                onBtnPress={() => {
                  {
                    userRole === "ROLE_CUSTOMER"
                      ? nextScreen()
                      : replace("LoginSplash");
                  }
                }}
                fontColor={Variables.Colors.blackBg}
              />
            </View>
          )}
        </View>
      </ScrollView>
      <Calender
        modalVisible={isCalendar}
        startOfDate={TripDates.fromDateTime}
        endOfDate={TripDates.toDateTime}
        onDismiss={() => setCalendar(false)}
        onSubmit={(res) => {
          setTripDates(res), setCalendar(false);
        }}
      />
      <BlurViewUI Type="light" />
    </View>
  );
};

const styles = StyleSheet.create({
  fastIV: {
    width: Measures.fontSize * 1.5,
    height: Measures.fontSize * 1.5,
  },
  renderCarInfoView: {
    alignItems: "center",
    justifyContent: "center",
    margin: Variables.MetricsSizes.tiny,
    paddingRight: Variables.FontSize.regular,
  },
  learnTxt: {
    fontSize: 10,
    color: Variables.Colors.darkYellow,
  },
  joinedTxt: {
    fontSize: 12,
    color: Variables.Colors.inputTxtColor,
    marginLeft: 5,
    marginTop: 5,
  },
  joinedTxt1: {
    fontSize: 12,
    color: Variables.Colors.inputTxtColor,
    marginLeft: 5,
    marginTop: 5,
    borderRightWidth: 1,
    borderRightColor: Variables.Colors.inputTxtColor,
    paddingRight: 5,
  },
  rating: {
    color: Variables.Colors.chatWhite,
    fontSize: 12,
    marginHorizontal: 5,
    marginTop: 2,
  },
  nextBtnView: {
    alignSelf: "center",
    height: Variables.Measures.fontSize * 2.5,
  },
  nextBtnTextView: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    borderRadius: 15,
    width: Variables.Measures.width / 1.8,
    backgroundColor: Variables.Colors.darkYellow,
  },
  nextTxt: {
    fontSize: Variables.Measures.fontSize / 1.2,
    color: Variables.Colors.blackBg,
  },
  userImgStyle: {
    height: Measures.fontSize * 2.2,
    width: Measures.fontSize * 2.2,
    borderRadius: Measures.fontSize * 2,
    borderWidth: 1,
    borderColor: Variables.Colors.darkYellow,
  },
  userImgStyle1: {
    height: 60,
    width: 60,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Variables.Colors.darkYellow,
  },
  userRowView: {
    flexDirection: "row",
    borderBottomColor: Variables.Colors.carsBorderGrey,
    borderStyle: "dashed",
    borderBottomWidth: 1,
    paddingVertical: 5,
  },
  userRowView1: {
    flexDirection: "row",
    paddingVertical: 10,
  },
  seeAllView: {
    alignItems: "flex-end",
    marginVertical: 15,
  },
  ratingsRowView: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  reviewsTxt: {
    color: Variables.Colors.darkYellow,
    fontSize: 12,
  },
  userNameTxt: {
    color: Variables.Colors.chatWhite,
    fontSize: 14,
  },
  userNameTxt1: {
    color: Variables.Colors.inputTxtColor,
    fontSize: 12,
    marginTop: 10,
  },
  ratedView: {
    borderRadius: 10,
    width: Variables.Measures.width / 1.5,
    height: Variables.Measures.width / 2.2,
    backgroundColor: Variables.Colors.carGrey,
    marginTop: 10,
    padding: 10,
  },
  rightView: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 7,
  },
  headingTxt: {
    color: Variables.Colors.inputTxtColor,
  },
  rowView: {
    width: "94%",
    alignSelf: "center",
  },
  bgYellowView: {
    width: "95%",
    alignSelf: "center",
    backgroundColor: Variables.Colors.darkYellow,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  blackBgView: {
    width: "100%",
    alignSelf: "center",
    borderTopEndRadius: 50,
    borderTopStartRadius: 50,
    backgroundColor: Variables.Colors.darkBlack,
    position: "absolute",
    top: 3,
    height: "100%",
  },
  greyBgView: {
    backgroundColor: "#0D0D0D",
    width: "94%",
    alignSelf: "center",
  },
  greyBgView1: {
    backgroundColor: Variables.Colors.darkBlack,
    width: "100%",
    alignSelf: "center",
  },
  safeAreaStyle: {
    flex: 1,
    backgroundColor: Variables.Colors.darkBlack,
  },
  ratingsTxt: {
    fontSize: 12,
    color: Variables.Colors.chatWhite,
  },
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    borderBottomColor: Variables.Colors.borderGrey,
    borderBottomWidth: 1,
    paddingBottom: 8,
    borderStyle: "dashed",
    flexWrap: "wrap",
  },

  bgImgView: {
    height: Variables.Measures.height / 2.5,
    width: Variables.Measures.width,
    alignItems: "center",
    justifyContent: "center",
  },
  imgView: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  introImageStyle: {
    width: Variables.Measures.width,
    height: 250,
  },
  inActiveDotStyle: {
    height: 13,
    width: 13,
    borderWidth: 2,
    borderColor: Variables.Colors.white,
    borderRadius: 10,
    marginTop: 30,
  },
  activeDotStyles: {
    height: 15,
    width: 15,
    backgroundColor: Variables.Colors.white,
    borderRadius: 10,
    borderWidth: 2,
    marginBottom: 20,
    borderColor: Variables.Colors.white,
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
  CarNameView: {
    justifyContent: "center",
    width: "85%",
  },
  shareImgView: {
    width: "40%",
    alignItems: "center",
    justifyContent: "center",
  },
  likeImgView: {
    width: "15%",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  CarNameOuterView: {
    minHeight: Measures.fontSize * 3.5,
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: Variables.Colors.borderGrey,
  },
  carNameTxt: {
    color: Variables.Colors.chatWhite,
    fontSize: 16,
  },
  ratingsView: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateTxt: {
    color: Variables.Colors.inputTxtColor,
    marginTop: 15,
    width: "100%",
  },
  tripDatesView: {
    flexDirection: "row",
    height: Measures.fontSize * 4.5,
    width: "100%",
  },
  carInfoView: {
    flexDirection: "row",
    height: Measures.fontSize * 4.5,
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  descView: {
    width: "100%",
    alignItems: "flex-start",
  },
  dateImgView: {
    width: "20%",
    alignItems: "flex-start",
    justifyContent: "center",
  },
  dateCenterView: {
    justifyContent: "center",
    width: "60%",
  },
  rightChangeView: {
    width: "20%",
    alignSelf: "center",
    alignItems: "flex-end",
  },
  timeTxt: {
    color: Variables.Colors.chatWhite,
    fontSize: 14,
  },
  changeTxt: {
    color: Variables.Colors.darkYellow,
  },
  carInfoTxt: {
    color: Variables.Colors.white,
    fontSize: 12,
    marginTop: 8,
  },
  viewTxt: {
    color: Variables.Colors.darkYellow,
    fontSize: 16,
  },
  descTxt: {
    color: Variables.Colors.white,
    fontSize: 14,
    width: "100%",
    alignItems: "center",
    lineHeight: 22,
  },
  descTxt1: {
    color: Variables.Colors.white,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  readView: {
    width: "100%",
    height: 20,
    alignItems: "flex-end",
    marginVertical: 10,
  },
  backPressView: {
    position: "absolute",
    top: Measures.StatusBarHeight + 20,
    left: 20,
  },
  perishAddress: {
    fontSize: 13,
    color: Variables.Colors.white,
  },
  paddingView: {
    borderBottomColor: Variables.Colors.borderGrey,
    borderBottomWidth: 1,
    width: "100%",
    paddingHorizontal: 15,
  },
});
export default HostCarProfile;

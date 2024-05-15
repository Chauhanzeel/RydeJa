import React, { useEffect, useRef, useState } from "react";
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
import LogoSvg from "../assets/Images/CarYellow.svg";
import HeartRedSvg from "../assets/Images/HeartRed.svg";
import HeartWhiteSvg from "../assets/Images/HeartBorderWhite.svg";
import ShareSvg from "../assets/Images/Share.svg";
import DateSvg from "../assets/Images/DateSvg.svg";
import LocationSvg from "../assets/Images/LocationRound.svg";
import LeftSvg from "../assets/Images/BackArrow.svg";
import { goBack, navigate } from "../navigators/RootNavigation";
import { FilterModalProps } from "./types";
import StarRating from "react-native-star-rating-widget";
import _ from "lodash";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  bookingCancelStart,
  bookingCancelSuccess,
  bookingCompleteStart,
  bookingCompleteSuccess,
  favouriteCarAddStart,
  favouriteCarRemoveStart,
  rentalCarChangeAddressStart,
  rentalCarChangeDatesStart,
  rentalCarViewStart,
  rentalCarViewSuccess,
  reviewStart,
} from "../actions/customerActions";
import { ReducerStateProps } from "./Inbox/InterfaceProps";
import ButtonView from "../components/ButtonView";
import BlurViewUI from "../components/BlurView";
import Calender from "./Calender";
import AppIntroSlider from "react-native-app-intro-slider";
import FastImageView from "../components/FastImageView";
import ParishModal from "../components/ParishModal";
import ContentLoader, { Rect, Circle } from "react-content-loader/native";
import { getOr, MaxCharCount } from "../constants/constants";
import { bookingCarCancel } from "../saga/customerSaga";
import { Colors, Measures } from "../Theme/variables";
import FastImage from "react-native-fast-image";
import { SliderBox } from "../components/SliderImages";
import RatingView from "../components/RatingView";
import CustomRatingBar from "../components/CustomRatingBar";
import DashedLine from "react-native-dashed-line";

const UpdateBookingCar: React.FC<FilterModalProps> = ({ route }) => {
  const { t } = useTranslation();

  const bookId = route.params?.bookID;
  const status = _.get(route, "params.status", null);
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);
  const [showFullText, setShowFullText] = useState(false);
  const [ratingModal, setRatingModal] = useState(false);
  const [parish, setParish] = useState("Parish name and address of car");
  const [TripDates, setTripDates] = useState(null);
  // const [isTodayAndSameTime, setIsTodayAndSameTime] = useState(false);

  const [
    profileDetailsData,
    rentalCarViewData,
    isLoading,
    bookingCancelData,
    completeBookingData,
    reviewData,
  ] = useSelector((state: ReducerStateProps) => [
    state.user?.profileDetailsData,
    state.customer.rentalCarViewData,
    state.customer.isLoading,
    state.customer.bookingCancelData,
    state.customer.completeBookingData,
    state.customer.reviewData,
  ]);
  const userRole = _.get(profileDetailsData, "verifiedInfo.role", null);

  useEffect(() => {
    setParish(
      _.get(rentalCarViewData, "pickupAddress.name", null) +
        ", " +
        _.get(rentalCarViewData, "address", null) +
        ", " +
        _.get(rentalCarViewData, "city", null)
    );
    setTripDates({
      fromDateTime: moment(_.get(rentalCarViewData, "fromDateTime", null)),
      toDateTime: moment(_.get(rentalCarViewData, "toDateTime", null)),
    });

    // const givenDate = new Date(_.get(rentalCarViewData, "toDateTime", null));

    // const today = new Date();

    // const isToday =
    //   givenDate.getDate() === today.getDate() &&
    //   givenDate.getMonth() === today.getMonth() &&
    //   givenDate.getFullYear() === today.getFullYear();

    // const isTodayTime =
    //   isToday &&
    //   givenDate.getHours() === today.getHours() &&
    //   givenDate.getMinutes() === today.getMinutes();
    // setIsTodayAndSameTime(isToday);
  }, [rentalCarViewData]);

  useEffect(() => {
    let params = {
      bookId: bookId,
    };
    dispatch(rentalCarViewStart(params));
    return () => {
      dispatch(rentalCarViewSuccess(null));
    };
  }, []);

  useEffect(() => {
    setIsFavourite(_.get(rentalCarViewData, "car.isFavourite", null));
  }, [_.get(rentalCarViewData, "car.isFavourite", null)]);

  useEffect(() => {
    if (!isLoading) {
      setRefreshing(false);
    }
  }, [isLoading]);

  useEffect(() => {
    if (_.get(completeBookingData, "success", null)) {
      setRatingModal(true);
      dispatch(bookingCompleteSuccess(null));
    }
  }, [_.get(completeBookingData, "success", null)]);

  useEffect(() => {
    if (reviewData?.success) {
      let params = {
        bookId: bookId,
      };
      dispatch(rentalCarViewStart(params));
      setRatingModal(false);
    }
  }, [reviewData]);

  const bookingComplete = () => {
    dispatch(bookingCompleteStart(null, _.get(rentalCarViewData, "id", null)));
  };

  const reviewComplete = (item: any) => {
    const params = {
      car: _.get(rentalCarViewData, "car.id", null),
      rating: `${item?.ratingStar}`,
      reviewText: item?.review,
    };
    dispatch(reviewStart(params));
  };

  const CarsProfile = () => {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            height: 250,
          }}
        >
          {_.size(_.get(rentalCarViewData, "car.carAssets", null)) > 0 ? (
            <SliderBox
              ImageComponent={FastImage}
              images={_.get(rentalCarViewData, "car.carAssets", null)}
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
            {_.get(rentalCarViewData, "carOwner.fullName", null) ? (
              <Text
                style={[
                  FontStyle.urbanistMedium,
                  CommonStyles.extraSmallCommonTxt,
                ]}
              >
                {_.get(rentalCarViewData, "carOwner.fullName", null)}
              </Text>
            ) : null}

            <Text style={[FontStyle.urbanistBold, CommonStyles.smallCommonTxt]}>
              {_.get(rentalCarViewData, "car.name", null)}
            </Text>

            <View style={styles.ratingsView}>
              {_.get(rentalCarViewData, "car.avgRating", null) ? (
                <>
                  <Text
                    style={[
                      FontStyle.urbanistMedium,
                      CommonStyles.extraSmallCommonTxt,
                    ]}
                  >
                    {_.get(rentalCarViewData, "car.avgRating", null)
                      ? parseFloat(
                          _.get(rentalCarViewData, "car.avgRating", null)
                        ).toFixed(1)
                      : null}
                  </Text>
                  <View style={{ marginHorizontal: 4 }}>
                    <StarSvg height={12} width={12} />
                  </View>
                </>
              ) : null}

              {_.get(rentalCarViewData, "car.trip", null) ? (
                <Text
                  style={[
                    FontStyle.urbanistMedium,
                    CommonStyles.extraSmallCommonTxt,
                  ]}
                >
                  ({_.get(rentalCarViewData, "car.trip", null)} trips)
                </Text>
              ) : null}
            </View>
          </View>

          {/* {userRole === "ROLE_CUSTOMER" ? (
            <DashedLine
              dashLength={1.5}
              dashColor={Variables.Colors.borderGrey}
              axis="vertical"
              style={{ height: "100%" }}
            />
          ) : null}
          {userRole === "ROLE_CUSTOMER" ? (
            <View style={styles.likeImgView}>
              {isFavourite ? (
                <HeartRedSvg height={25} width={25} />
              ) : (
                <HeartWhiteSvg height={25} width={25} />
              )}
            </View>
          ) : null} */}
        </View>

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
          <View style={styles.tripDatesView}>
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
            <View style={styles.rightChangeView}></View>
          </View>
        </View>

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
          <View style={styles.tripDatesView}>
            <View style={styles.dateImgView}>
              <LocationSvg />
            </View>

            <View style={styles.dateCenterView}>
              <Text
                style={[FontStyle.urbanistMedium, CommonStyles.descCommonTxt]}
              >
                {_.get(rentalCarViewData, "pickupAddress.name", null)}
              </Text>
            </View>

            <View style={styles.rightChangeView}></View>
          </View>
        </View>

        {_.size(_.get(rentalCarViewData, "car.carInformation", null)) > 0 ? (
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
                data={_.get(rentalCarViewData, "car.carInformation", null)}
                renderItem={({ item, index }) => renderCarInfo(item, index)}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={{ width: "100%" }}
              />
            </View>
          </View>
        ) : null}

        {_.size(_.get(rentalCarViewData, "car.carFeature", null)) > 0 ? (
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
                  carFeature: _.get(rentalCarViewData, "car.carFeature", null),
                })
              }
            >
              <FlatList
                data={
                  _.get(rentalCarViewData, "car.carFeature", null)?.slice(
                    0,
                    4
                  ) || []
                }
                renderItem={({ item, index }) => renderCarFeatures(item, index)}
                horizontal={true}
                keyExtractor={(item) => item?.id?.toString()}
                showsHorizontalScrollIndicator={false}
                style={{ width: "50%" }}
              />

              {_.get(rentalCarViewData, "car.carFeature.length", null) > 3 && (
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
                ? rentalCarViewData?.car?.description
                : _.slice(rentalCarViewData?.car?.description, 0, MaxCharCount)}
              {!showFullText &&
                _.size(rentalCarViewData?.car?.description) > MaxCharCount &&
                "..."}
            </Text>
            {_.size(rentalCarViewData?.car?.description) > MaxCharCount && (
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

        {_.find(_.get(rentalCarViewData, "car.insuranceProtection", null)) && (
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
                  ? rentalCarViewData?.car?.insuranceProtection?.text
                  : _.slice(
                      rentalCarViewData?.car?.insuranceProtection?.text,
                      0,
                      MaxCharCount
                    )}
                {!showFullText &&
                  _.size(rentalCarViewData?.car?.insuranceProtection?.text) >
                    MaxCharCount &&
                  "..."}
              </Text>
              {_.size(rentalCarViewData?.car?.insuranceProtection?.text) >
                MaxCharCount &&
                userRole === "ROLE_CUSTOMER" && (
                  <TouchableOpacity
                    style={styles.readView}
                    onPress={() =>
                      navigate("Insurance", {
                        INSURANCE:
                          rentalCarViewData?.car?.insuranceProtection?.text,
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
                {_.get(rentalCarViewData, "car.avgRating", null)
                  ? parseFloat(
                      _.get(rentalCarViewData, "car.avgRating", null)
                    ).toFixed(1)
                  : null}
              </Text>
              <View style={{ marginHorizontal: 3 }}>
                <StarSvg height={15} width={15} />
              </View>
              <Text style={[FontStyle.urbanistMedium, styles.ratingsTxt]}>
                {_.size(rentalCarViewData?.car?.reviews) + " ratings"}
              </Text>
            </View>

            <FlatList
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              data={_.get(rentalCarViewData, "car.reviews", null) || []}
              renderItem={({ item, index }) => renderReviews(item, index)}
              style={{
                width: "100%",
              }}
            />

            <TouchableOpacity
              style={[styles.seeAllView, { width: "100%" }]}
              onPress={() => {
                navigate("Reviews", {
                  reviewDatalist:
                    _.get(rentalCarViewData, "car.reviews", null) || [],
                  avgRating: _.get(rentalCarViewData, "car.avgRating", null),
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
                {_.find(rentalCarViewData?.carOwner?.profilePicture) ? (
                  <TouchableOpacity
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
                          rentalCarViewData,
                          "carOwner.profilePicture",
                          null
                        ),
                      }}
                      style={styles.userImgStyle1}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
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
                    {rentalCarViewData?.carOwner?.fullName}
                  </Text>
                  <View style={{ flexDirection: "row" }}>
                    {_.get(rentalCarViewData, "trip", null) > 0 && (
                      <Text
                        style={[
                          FontStyle.urbanistMedium,
                          styles.joinedTxt1,
                          CommonStyles.extraSmallCommonTxt,
                          { color: Variables.Colors.inputTxtColor },
                        ]}
                      >
                        {`${getOr(rentalCarViewData, "trip", "0")} trips`}
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
                      Joined{" "}
                      {_.get(rentalCarViewData, "carOwner.joinDate", null)}
                    </Text>
                  </View>
                </View>
                {/* <Text
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
                    getOr(rentalCarViewData, "marketValue", "0")
                  ).toFixed(2)}`}
                </Text> */}
              </View>
            </View>

            {_.get(rentalCarViewData, "carOwner.aboutYourself", null) !==
            null ? (
              <View style={{ width: "100%", marginBottom: 5 }}>
                <Text
                  style={[
                    FontStyle.urbanistRegular,
                    styles.descTxt1,
                    CommonStyles.descCommonTxt,
                  ]}
                >
                  {_.get(rentalCarViewData, "carOwner.aboutYourself", null)}
                </Text>
              </View>
            ) : null}
          </View>
        </View>
      </View>
    );
  };

  const BookedBy = () => {
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
              {status.toUpperCase() + " BY"}
            </Text>
            <View style={[styles.userRowView1]}>
              <View
                style={{
                  width: "20%",
                  justifyContent: "center",
                }}
              >
                {_.find(rentalCarViewData?.customer?.profilePicture) ? (
                  <TouchableOpacity
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
                          rentalCarViewData,
                          "customer.profilePicture",
                          null
                        ),
                      }}
                      style={styles.userImgStyle1}
                    />
                  </TouchableOpacity>
                ) : (
                  <View style={{ width: "22%" }}>
                    <Image
                      source={Images?.userPlaceholder}
                      style={styles.userImgStyle1}
                    />
                  </View>
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
                    {rentalCarViewData?.customer?.fullName}
                  </Text>
                  <View style={{ flexDirection: "row" }}>
                    <Text
                      style={[
                        FontStyle.urbanistMedium,
                        styles.joinedTxt,
                        CommonStyles.extraSmallCommonTxt,
                        { color: Variables.Colors.inputTxtColor },
                      ]}
                    >
                      Joined{" "}
                      {_.get(rentalCarViewData, "customer.joinDate", null)}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {_.get(rentalCarViewData, "carOwner.aboutYourself", null) !==
            null ? (
              <View style={{ width: "100%", marginBottom: 5 }}>
                <Text
                  style={[
                    FontStyle.urbanistRegular,
                    styles.descTxt1,
                    CommonStyles.descCommonTxt,
                  ]}
                >
                  {_.get(rentalCarViewData, "carOwner.aboutYourself", null)}
                </Text>
              </View>
            ) : null}
          </View>
        </View>
      </View>
    );
  };

  const onRefresh = () => {
    let params = {
      bookId: bookId,
    };
    dispatch(rentalCarViewStart(params));
    setRefreshing(true);
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
            <Rect x="15" y="50" rx="4" ry="4" width="30" height="30" />
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

  return !rentalCarViewData ? (
    <LoadingView />
  ) : (
    <View style={styles.safeAreaStyle}>
      {Platform.OS == "ios" ? (
        <StatusBar translucent backgroundColor="transparent" />
      ) : (
        <StatusBar translucent backgroundColor={Variables.Colors.blackOpac85} />
      )}
      <RatingView
        modalVisible={ratingModal}
        isLoading={isLoading}
        onOkPress={(item) => reviewComplete(item)}
        onRequestClose={() => setRatingModal(false)}
      />

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
        <View style={{ flex: 1, marginBottom: 25 }}>
          <CarsProfile />
          {_.size(rentalCarViewData?.car?.reviews) > 0 ? (
            <RatingsReviews />
          ) : null}

          {userRole == "ROLE_CAR_OWNER" ? (
            _.get(rentalCarViewData, "customer", null) ? (
              <BookedBy />
            ) : null
          ) : _.get(rentalCarViewData, "carOwner", null) ? (
            <HostedBy />
          ) : null}

          {userRole == "ROLE_CUSTOMER" &&
          _.get(rentalCarViewData, "status", null) === "booked" ? (
            // && isTodayAndSameTime
            <View style={{ marginVertical: 20 }}>
              <ButtonView
                width={Variables.Measures.width / 2}
                isLoading={isLoading}
                disablebtn={isLoading}
                btnTxt={"Booking Complete"}
                backgroundColor={Variables.Colors.yellow}
                onBtnPress={() => bookingComplete()}
                fontColor={Variables.Colors.blackBg}
              />
            </View>
          ) : null}
        </View>
      </ScrollView>

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
    width: "100%",
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
export default UpdateBookingCar;

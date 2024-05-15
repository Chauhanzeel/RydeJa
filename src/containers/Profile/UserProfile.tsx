import React, { useEffect, useState } from "react";
import {
  CommonStyles,
  FontStyle,
  Variables,
  Images,
  Layout,
} from "../../Theme";
import {
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Text,
  Image,
  FlatList,
  RefreshControl,
} from "react-native";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import { goBack, navigate } from "../../navigators/RootNavigation";
import { UserReviewsData } from "../MockData/UserReviewsData";
import FastImage from "react-native-fast-image";
import DashedLine from "react-native-dashed-line";
import StarRating from "react-native-star-rating-widget";

import Header from "../../components/Header";
import BackSvg from "../../assets/Images/BackArrow.svg";
import PenSvg from "../../assets/Images/PencilSvg.svg";
import StarSvg from "../../assets/Images/ModalIcons/StarRatingYellow.svg";
import VerifiedSvg from "../../assets/Images/verified.svg";
import FavoritesSvg from "../../assets/Images/TabBarIcons/HeartGrey.svg";
import ContentLoader, { Rect, Circle } from "react-content-loader/native";

import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { profileDetailsStart } from "../../actions/userActions";
import { ReducerStateProps } from "../Inbox/InterfaceProps";
import FastImageView from "../../components/FastImageView";
import CustomRatingBar from "../../components/CustomRatingBar";
import moment from "moment";
interface CreateProfileProps {
  // onClick: (val: number) => void;
}
const UserProfile: React.FC<CreateProfileProps> = () => {
  const { t } = useTranslation();
  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch();
  const [isLoading, profileDetailsData] = useSelector(
    (state: ReducerStateProps) => [
      state.user.isLoading,
      state.user.profileDetailsData,
    ]
  );
  useEffect(() => {
    if (!profileDetailsData) {
      dispatch(profileDetailsStart());
    }
  }, []);

  const onRefresh = () => {
    dispatch(profileDetailsStart());
    setRefreshing(true);
  };

  useEffect(() => {
    if (!isLoading) {
      setRefreshing(false);
    }
  }, [isLoading]);
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
            <View style={{ flexShrink: 1 }}>
              <FastImageView
                source={{ uri: _.get(item, "customer.profilePicture", null) }}
                style={styles.userImgStyle}
              />
            </View>
          ) : (
            <View style={{ flexShrink: 1 }}>
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
              marginLeft: 10,
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

  const RatingsReviews = () => {
    return (
      <View>
        <View
          style={[
            styles.greyBgView,
            {
              width: Variables.Measures.width,
              paddingBottom: Variables.MetricsSizes.small * 5,
            },
          ]}
        >
          <View style={styles.rowView}>
            <View style={styles.rightView}>
              <View style={styles.ratingsRowView}>
                <Text style={[FontStyle.urbanistMedium, styles.ratingsTxt]}>
                  {_.get(profileDetailsData, "avgRating", null)}
                </Text>
                <View style={{ marginHorizontal: 3 }}>
                  <StarSvg height={15} width={15} />
                </View>
                <Text style={[FontStyle.urbanistMedium, styles.ratingsTxt]}>
                  ( {_.size(profileDetailsData?.review)} ratings)
                </Text>
              </View>
              <FlatList
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={_.get(profileDetailsData, "review", null)}
                renderItem={({ item, index }) => renderReviews(item, index)}
                style={{ width: "100%" }}
              />
              <TouchableOpacity
                style={styles.seeAllView}
                onPress={() =>
                  navigate("Reviews", {
                    reviewDatalist:
                      _.get(profileDetailsData, "review", null) || [],
                    avgRating: _.get(profileDetailsData, "avgRating", null),
                  })
                }
              >
                <Text style={[FontStyle.urbanistBold, styles.reviewsTxt]}>
                  {t("labelConst.seeAllReviews")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const LoadingView = () => {
    return (
      <SafeAreaView style={CommonStyles.safeAreaStyle}>
        <StatusBar
          backgroundColor={Variables.Colors.blackBg}
          barStyle="light-content"
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
          <View
            style={{
              width: Variables.Measures.width,
              height: Variables.FontSize.large,
            }}
          >
            <ContentLoader
              backgroundColor={Variables.Colors.absoluteBgGrey}
              foregroundColor={Variables.Colors.grey}
            >
              <Rect x="20" y="15" rx="4" ry="4" width="25" height="25" />
            </ContentLoader>
          </View>

          <ContentLoader
            backgroundColor={Variables.Colors.absoluteBgGrey}
            foregroundColor={Variables.Colors.grey}
            width={Variables.Measures.width}
            height={Variables.FontSize.large * 2.5}
            style={{
              marginTop: Variables.FontSize.regular * 2,
            }}
          >
            <Circle
              cx={Variables.Measures.width / 3.6}
              cy={Variables.FontSize.large * 1.1}
              r={Variables.FontSize.regular * 2}
            />

            <Rect
              x={Variables.Measures.width / 2.5}
              y={Variables.FontSize.large / 2}
              rx="4"
              ry="4"
              width={Variables.FontSize.large * 3}
              height={Variables.MetricsSizes.regular * 1.5}
            />

            <Rect
              x={Variables.Measures.width / 2.25}
              y={Variables.FontSize.large * 1.3}
              rx="4"
              ry="4"
              width={Variables.FontSize.large * 2}
              height={Variables.MetricsSizes.small}
            />

            <Circle
              cx={Variables.Measures.width / 1.25}
              cy={Variables.MetricsSizes.small * 3}
              r={Variables.MetricsSizes.tiny * 3}
            />

            <Rect
              x="0"
              y={Variables.FontSize.large * 2.3}
              rx="4"
              ry="4"
              width="100%"
              height={2}
            />
          </ContentLoader>

          <View style={{ marginTop: 15 }} />

          <ContentLoader
            backgroundColor={Variables.Colors.absoluteBgGrey}
            foregroundColor={Variables.Colors.grey}
            width={Variables.Measures.width}
            height={Variables.Measures.width / 1.7}
          >
            <Rect
              x="10"
              y="0"
              rx="4"
              ry="4"
              width={Variables.Measures.width / 3}
              height={Variables.FontSize.regular}
            />
            <Rect
              x="10"
              y={Variables.FontSize.regular * 2.5}
              rx="4"
              ry="4"
              width={Variables.Measures.width / 3}
              height={Variables.FontSize.regular}
            />
            <Circle
              cx={Variables.Measures.width / 1.1}
              cy={Variables.FontSize.regular * 3}
              r={Variables.FontSize.small}
            />
            <Rect
              x="10"
              y={Variables.FontSize.large * 2.3}
              rx="4"
              ry="4"
              width={Variables.Measures.width / 3}
              height={Variables.FontSize.regular}
            />
            <Circle
              cx={Variables.Measures.width / 1.1}
              cy={Variables.FontSize.large * 2.5}
              r={Variables.FontSize.small}
            />
            <Rect
              x="10"
              y={Variables.FontSize.large * 3.3}
              rx="4"
              ry="4"
              width={Variables.Measures.width / 3}
              height={Variables.FontSize.regular}
            />
            <Circle
              cx={Variables.Measures.width / 1.1}
              cy={Variables.FontSize.large * 3.5}
              r={Variables.FontSize.small}
            />

            <Rect
              x="10"
              y={Variables.FontSize.large * 4.3}
              rx="4"
              ry="4"
              width={Variables.Measures.width / 3}
              height={Variables.FontSize.regular}
            />
            <Circle
              cx={Variables.Measures.width / 1.1}
              cy={Variables.FontSize.large * 4.5}
              r={Variables.FontSize.small}
            />
          </ContentLoader>

          <ContentLoader
            backgroundColor={Variables.Colors.absoluteBgGrey}
            foregroundColor={Variables.Colors.grey}
            width={Variables.Measures.width}
            height={Variables.FontSize.small}
            style={{
              marginTop: Variables.FontSize.regular,
            }}
          >
            <Rect x="0" y="0" rx="4" ry="4" width="100%" height="3" />
          </ContentLoader>
        </ScrollView>
      </SafeAreaView>
    );
  };

  return !profileDetailsData || isLoading ? (
    <LoadingView />
  ) : (
    <View style={{ flex: 1 }}>
      <StatusBar
        backgroundColor={Variables.Colors.blackBg}
        barStyle="light-content"
      />
      <SafeAreaView style={CommonStyles.safeAreaStyle}>
        <Header
          leftSvg={<BackSvg height={25} width={25} />}
          onLeftPress={goBack}
        />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={Variables.Colors.white}
            />
          }
        >
          <View style={styles.container}>
            <View style={{ flexDirection: "row", alignSelf: "center" }}>
              <View style={styles.userImgView}>
                {_.find(profileDetailsData?.verifiedInfo?.profilePicture) ? (
                  <FastImageView
                    source={{
                      uri: _.get(
                        profileDetailsData,
                        "verifiedInfo.profilePicture",
                        null
                      ),
                    }}
                    style={styles.profileImage}
                  />
                ) : (
                  <Image
                    source={Images.userPlaceholder}
                    style={styles.profileImage}
                  />
                )}
              </View>
              <View style={styles.joinTxtView}>
                <Text
                  style={[FontStyle.urbanistBold, CommonStyles.titleCommonTxt]}
                >
                  {_.get(profileDetailsData, "verifiedInfo.fullName", null)}
                </Text>
                <Text
                  style={[FontStyle.urbanistMedium, CommonStyles.descCommonTxt]}
                >
                  {"Joined " +
                    _.get(profileDetailsData, "verifiedInfo.joinDate", null)}
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  justifyContent: "center",
                  marginLeft: Variables.MetricsSizes.tiny,
                }}
                onPress={() => navigate("EditProfile")}
              >
                <PenSvg height={27} width={27} />
              </TouchableOpacity>
            </View>
            <View style={[styles.lineView, { marginTop: 20 }]} />
            <View style={styles.widthView}>
              <Text
                style={[
                  FontStyle.urbanistBold,
                  CommonStyles.smallCommonTxt,
                  styles.infoTxt,
                ]}
              >
                VERIFIED INFO
              </Text>
              <View style={[styles.emailView, { marginTop: 30 }]}>
                <Text
                  style={[FontStyle.urbanistMedium, CommonStyles.descCommonTxt]}
                >
                  Email Address
                </Text>
                <View>
                  {_.get(
                    profileDetailsData,
                    "verifiedInfo.isEmailVerified",
                    null
                  ) ? (
                    <VerifiedSvg />
                  ) : (
                    <Text
                      style={[
                        FontStyle.urbanistMedium,
                        CommonStyles.descCommonTxt,
                        styles.connectTxt,
                      ]}
                    >
                      Connect
                    </Text>
                  )}
                </View>
              </View>
              <View style={styles.emailView}>
                <Text
                  style={[FontStyle.urbanistMedium, CommonStyles.descCommonTxt]}
                >
                  Phone number
                </Text>
                <View>
                  {_.get(
                    profileDetailsData,
                    "verifiedInfo.isPhoneVerified",
                    null
                  ) ? (
                    <VerifiedSvg />
                  ) : (
                    <Text
                      style={[
                        FontStyle.urbanistMedium,
                        CommonStyles.descCommonTxt,
                        styles.connectTxt,
                      ]}
                    >
                      Connect
                    </Text>
                  )}
                </View>
              </View>
              <View style={styles.emailView}>
                <Text
                  style={[FontStyle.urbanistMedium, styles.emailHeadingTxt]}
                >
                  Facebook
                </Text>
                <View>
                  {_.get(
                    profileDetailsData,
                    "verifiedInfo.facebookId",
                    null
                  ) ? (
                    <VerifiedSvg />
                  ) : (
                    <Text
                      style={[
                        FontStyle.urbanistMedium,
                        CommonStyles.descCommonTxt,
                        styles.connectTxt,
                      ]}
                    >
                      Connect
                    </Text>
                  )}
                </View>
              </View>
              {/* <View style={styles.emailView}>
                  <Text
                    style={[FontStyle.urbanistMedium, styles.emailHeadingTxt]}
                  >
                    Apple
                  </Text>
                  <TouchableOpacity>
                    <Text
                      style={[FontStyle.urbanistMedium, styles.connectTxt]}
                    >
                      Connect
                    </Text>
                  </TouchableOpacity>
                </View> */}
              <View style={styles.emailView}>
                <Text
                  style={[FontStyle.urbanistMedium, styles.emailHeadingTxt]}
                >
                  Google
                </Text>
                <View>
                  {_.get(profileDetailsData, "verifiedInfo.googleId", null) ? (
                    <VerifiedSvg />
                  ) : (
                    <Text
                      style={[
                        FontStyle.urbanistMedium,
                        CommonStyles.descCommonTxt,
                        styles.connectTxt,
                      ]}
                    >
                      Connect
                    </Text>
                  )}
                </View>
              </View>
            </View>

            <View
              style={[
                styles.lineView,
                { marginTop: Variables.MetricsSizes.small * 5 },
              ]}
            />

            {_.size(profileDetailsData?.review) > 0 ? <RatingsReviews /> : null}

            {_.get(profileDetailsData, "verifiedInfo.role") ===
            "ROLE_CUSTOMER" ? (
              <TouchableOpacity
                onPress={() => {
                  navigate("TabNavigations", { navigationfrom: 1 });
                }}
                style={styles.favoritesView}
              >
                <FavoritesSvg height={20} width={20} />
                <Text
                  style={[
                    FontStyle.urbanistMedium,
                    styles.descTxt,
                    { marginLeft: 8 },
                  ]}
                >
                  Your favorites
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  joinTxtView: {
    alignItems: "flex-start",
    justifyContent: "center",
    marginLeft: 10,
  },
  profileImage: {
    height: Variables.Measures.fontSize * 2.7,
    width: Variables.Measures.fontSize * 2.7,
    borderRadius: Variables.Measures.fontSize * 2,
    borderWidth: 1,
    borderColor: Variables.Colors.darkYellow,
  },
  ownerNameTxt: {
    fontSize: 11,
    color: Variables.Colors.white,
    marginBottom: 3,
  },
  carView: {
    backgroundColor: Variables.Colors.carGrey,
    width: "93%",
    alignSelf: "center",
    marginTop: 20,
    borderRadius: 10,
  },
  carImgView: {
    height: Variables.Measures.height / 2.6,
    width: "100%",
  },
  carImgStyle: {
    height: Variables.Measures.height / 3.4,
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
  rightView: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 7,
  },
  carRatingsTxt: {
    fontSize: 12,
    color: Variables.Colors.chatWhite,
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
  container: {
    backgroundColor: Variables.Colors.blackBg,
    flex: 1,
    marginTop: Variables.Measures.fontSize,
  },
  userImgView: {
    alignItems: "center",
  },
  userImgStyle: {
    height: Variables.Measures.fontSize * 2.7,
    width: Variables.Measures.fontSize * 2.7,
    borderRadius: Variables.Measures.fontSize * 2,
    borderWidth: 1,
    borderColor: Variables.Colors.darkYellow,
  },
  reviewUserImg: {
    height: Variables.Measures.fontSize * 2,
    width: Variables.Measures.fontSize * 2,
    borderRadius: Variables.Measures.fontSize * 2,
    borderWidth: 1,
    borderColor: Variables.Colors.darkYellow,
  },
  nameTxt: {
    color: Variables.Colors.white,
    fontSize: Variables.Measures.fontSize,
    fontWeight: "bold",
  },
  joinedTxt: {
    color: Variables.Colors.white,
    fontSize: Variables.Measures.fontSize / 1.8,
    alignSelf: "center",
  },
  lineView: {
    borderWidth: 0.6,
    borderColor: Variables.Colors.borderGrey,
    marginBottom: 20,
  },
  widthView: {
    width: "90%",
    alignSelf: "center",
  },
  infoTxt: {
    color: Variables.Colors.carsBorderGrey,
    letterSpacing: 0.15,
    fontWeight: "bold",
  },
  emailView: {
    justifyContent: "space-between",
    width: "100%",
    flexDirection: "row",
    marginVertical: 8,
    alignItems: "center",
  },
  emailHeadingTxt: {
    color: Variables.Colors.white,
    fontSize: 14,
  },
  connectTxt: {
    color: Variables.Colors.darkYellow,
  },
  userDescView: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginBottom: 20,
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
  userNameTxt: {
    color: Variables.Colors.chatWhite,
    fontSize: 10,
    marginTop: 4,
  },
  ratedView: {
    borderRadius: 10,
    width: Variables.Measures.width / 1.5,
    height: Variables.Measures.width / 2.2,
    backgroundColor: Variables.Colors.carGrey,
    marginTop: 10,
    padding: 10,
  },
  descTxt: {
    color: Variables.Colors.white,
    fontSize: 14,
    lineHeight: 20,
  },
  reviewsTxt: {
    color: Variables.Colors.darkYellow,
    fontSize: 12,
  },
  ratingsRowView: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    marginLeft: 5,
  },
  favoritesView: {
    flexDirection: "row",
    width: "90%",
    alignSelf: "center",
    alignItems: "center",
    marginBottom: 20,
  },
});

export default UserProfile;

import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  RefreshControl,
  FlatList,
} from "react-native";
import { useTranslation } from "react-i18next";

import { CommonStyles, FontStyle, Images, Variables } from "../../Theme";
import StarSvg from "../../assets/Images/ModalIcons/StarRatingYellow.svg";
import { useDispatch, useSelector } from "react-redux";
import { ReducerStateProps } from "../Inbox/InterfaceProps";
import _ from "lodash";
import moment from "moment";
import ContentLoader, { Rect, Circle } from "react-content-loader/native";
import { ownerReviewListStart } from "../../actions/carOwnerActions";
import FastImageView from "../../components/FastImageView";
import CustomRatingBar from "../../components/CustomRatingBar";
import { Measures } from "../../Theme/variables";

interface FavoritesProps {}

const Reviews: React.FC<FavoritesProps> = () => {
  const [refreshing, setRefreshing] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [isLoading, reviewListData] = useSelector(
    (state: ReducerStateProps) => [
      state.carOwner.isLoading,
      state.carOwner.ownerReviewListData,
    ]
  );
  useEffect(() => {
    if (!isLoading) {
      setRefreshing(false);
    }
  }, [isLoading]);

  useEffect(() => {
    dispatch(ownerReviewListStart());
  }, []);

  const LoadingView = () => {
    return (
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
          <Rect
            x="15"
            y="20"
            rx="4"
            ry="4"
            width={Variables.Measures.width / 3}
            height="30"
          />
        </ContentLoader>

        <ContentLoader
          backgroundColor={Variables.Colors.absoluteBgGrey}
          foregroundColor={Variables.Colors.grey}
          width={Variables.Measures.width}
          height={Variables.Measures.width / 2}
        >
          <Rect
            x="20"
            y="0"
            rx="4"
            ry="4"
            width={Variables.Measures.width / 1.1}
            height={Variables.Measures.width / 2.2}
          />
          <Circle cx="60" cy="40" r="30" />

          <Rect
            x="25%"
            y="20"
            rx="4"
            ry="4"
            width={Variables.Measures.width / 3}
            height="15"
          />

          <Rect
            x="25%"
            y="40"
            rx="4"
            ry="4"
            width={Variables.Measures.width / 3}
            height="15"
          />

          <Rect
            x="30"
            y="80"
            rx="4"
            ry="4"
            width="85%"
            height={Variables.Measures.width / 5}
          />
        </ContentLoader>

        <View
          style={{
            marginTop: 20,
          }}
        ></View>

        <ContentLoader
          backgroundColor={Variables.Colors.absoluteBgGrey}
          foregroundColor={Variables.Colors.grey}
          width={Variables.Measures.width}
          height={Variables.Measures.width / 2}
        >
          <Rect
            x="20"
            y="0"
            rx="4"
            ry="4"
            width={Variables.Measures.width / 1.1}
            height={Variables.Measures.width / 2.2}
          />
          <Circle cx="60" cy="40" r="30" />

          <Rect
            x="25%"
            y="20"
            rx="4"
            ry="4"
            width={Variables.Measures.width / 3}
            height="15"
          />

          <Rect
            x="25%"
            y="40"
            rx="4"
            ry="4"
            width={Variables.Measures.width / 3}
            height="15"
          />

          <Rect
            x="30"
            y="80"
            rx="4"
            ry="4"
            width="85%"
            height={Variables.Measures.width / 5}
          />
        </ContentLoader>
      </ScrollView>
    );
  };

  const onRefresh = () => {
    dispatch(ownerReviewListStart());
    setRefreshing(true);
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
  return !reviewListData ? (
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
    >
      <View style={{ width: "90%", alignSelf: "center" }}>
        {_.get(reviewListData, "rating.avgRating", null) ? (
          <View style={styles.ratingsRowView}>
            <Text style={[FontStyle.urbanistMedium, styles.ratingsTxt]}>
              {_.get(reviewListData, "rating.avgRating", null)}
            </Text>
            <View style={{ marginHorizontal: 3 }}>
              <StarSvg height={15} width={15} />
            </View>
            <Text style={[FontStyle.urbanistMedium, styles.ratingsTxt]}>
              ({_.get(reviewListData, "rating.totalCount", null)} ratings)
            </Text>
          </View>
        ) : null}

        <FlatList
          showsHorizontalScrollIndicator={false}
          data={_.get(reviewListData, "review", null)}
          renderItem={({ item, index }) => renderReviews(item, index)}
          ListEmptyComponent={() => (
            <View
              style={{
                width: "100%",
                height: Variables.Measures.height / 1.5,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={[FontStyle.urbanistSemiBold, styles.tripsTxt]}>
                No Reviews Found
              </Text>
            </View>
          )}
          style={{
            width: "100%",
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  safeAreaStyle: {
    flex: 1,
    backgroundColor: Variables.Colors.darkBlack,
  },
  ratingsTxt: {
    fontSize: 15,
    color: Variables.Colors.chatWhite,
  },
  ratingsRowView: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  ratedView: {
    borderRadius: 10,
    width: "100%",
    height: Variables.Measures.width / 2.2,
    backgroundColor: Variables.Colors.carGrey,
    marginTop: 20,
    padding: 10,
  },
  userRowView: {
    flexDirection: "row",
    borderBottomColor: Variables.Colors.carsBorderGrey,
    borderStyle: "dashed",
    borderBottomWidth: 1,
    paddingVertical: 5,
  },
  userImgStyle: {
    height: Measures.fontSize * 2.5,
    width: Measures.fontSize * 2.5,
    borderRadius: Measures.fontSize * 2,
    borderWidth: 1,
    borderColor: Variables.Colors.darkYellow,
  },
  tripsTxt: {
    color: Variables.Colors.white,
    fontSize: 22,
  },
});
export default Reviews;

import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Variables, FontStyle, Images, Layout, CommonStyles } from "../Theme";
import { goBack } from "../navigators/RootNavigation";
import Header from "../components/Header";
import BackSvg from "../assets/Images/BackArrow.svg";
import _ from "lodash";
import moment from "moment";
import { ReviewProps } from "./types";
import FastImageView from "../components/FastImageView";
import CustomRatingBar from "../components/CustomRatingBar";
import StarSvg from "../assets/Images/ModalIcons/StarRatingYellow.svg";
import { Measures } from "../Theme/variables";

const Reviews: React.FC<ReviewProps> = ({ route }) => {
  const reviewDatalist = route?.params?.reviewDatalist;
  const avgRating = route?.params?.avgRating;

  const renderReviews = (item: any, index: number) => {
    return (
      <View style={[styles.ratedView]}>
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

  return (
    <SafeAreaView style={styles.safeAreaStyle}>
      <StatusBar translucent backgroundColor="transparent" />
      <Header
        centerText="Ratings and Reviews"
        leftSvg={<BackSvg height={25} width={25} />}
        onLeftPress={goBack}
      />

      <View
        style={{
          width: "90%",
          alignSelf: "center",
          marginBottom: Variables.Measures.width / 3.5,
        }}
      >
        {avgRating ? (
          <View style={styles.ratingsRowView}>
            <Text style={[FontStyle.urbanistMedium, styles.ratingsTxt]}>
              {avgRating}
            </Text>
            <View style={{ marginHorizontal: 3 }}>
              <StarSvg height={15} width={15} />
            </View>
            <Text style={[FontStyle.urbanistMedium, styles.ratingsTxt]}>
              ({_.size(reviewDatalist)} ratings)
            </Text>
          </View>
        ) : null}

        <FlatList
          showsHorizontalScrollIndicator={false}
          data={reviewDatalist}
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
            marginBottom: 20,
          }}
        />
      </View>
    </SafeAreaView>
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
    marginVertical: 12,
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
    height: Measures.fontSize * 2.2,
    width: Measures.fontSize * 2.2,
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

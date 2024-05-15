import React, { memo } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

import { CommonStyles, FontStyle, Images, Layout, Variables } from "../Theme";
import { navigate } from "../navigators/RootNavigation";
import FastImage from "react-native-fast-image";
import StarSvg from "../assets/Images/ModalIcons/StarRatingYellow.svg";
import HeartWhiteSvg from "../assets/Images/HeartBorderWhite.svg";
import HeartRedSvg from "../assets/Images/HeartRed.svg";
import DashedLine from "react-native-dashed-line";
import _ from "lodash";
import FastImageView from "../components/FastImageView";
import { Colors, Measures } from "../Theme/variables";
import { getOr } from "../constants/constants";

interface CarCardViewProps {
  carItem: any;
  index?: number;
  userRole?: string;
  toggleFavorite?: (item: any) => void;
  customStyle?: any;
}
const CarCardView: React.FC<CarCardViewProps> = ({
  carItem,
  index,
  userRole = "ROLE_CUSTOMER",
  toggleFavorite,
  customStyle,
}) => {
  const assetImage = _.first(_.get(carItem, "carAssets", null));

  return (
    <View style={customStyle ? customStyle : styles.carView01} key={index}>
      <View style={styles.carView}>
        <TouchableOpacity
          onPress={() => {
            navigate("HostCarProfile", { carID: carItem.id });
          }}
        >
          {_.get(assetImage, "image", null) ? (
            <FastImageView
              source={{ uri: _.get(assetImage, "image", null) }}
              style={styles.carImgStyle}
            />
          ) : (
            <FastImage
              source={Images.CarPlaceHolder}
              style={styles.carImgStyle}
            />
          )}
        </TouchableOpacity>

        <View style={{ width: "100%" }}>
          <View
            style={{ flexDirection: "row", minHeight: Measures.fontSize * 4 }}
          >
            <View
              style={{
                width: "55%",
                justifyContent: "center",
                borderRightColor: Variables.Colors.carsBorderGrey,
                paddingHorizontal: 20,
              }}
            >
              <Text
                style={[FontStyle.urbanistMedium, CommonStyles.descCommonTxt]}
              >
                {getOr(
                  carItem,
                  "carOwner.fullName",
                  getOr(carItem, "make", "---")
                )}
              </Text>
              <DashedLine
                dashLength={3}
                style={{ width: "100%", marginVertical: 2 }}
                dashColor={Variables.Colors.carGrey}
              />
              <Text
                style={[FontStyle.urbanistBold, CommonStyles.buttonCommonTxt]}
                numberOfLines={2}
              >
                {getOr(carItem, "name", "---")}
              </Text>
            </View>
            <DashedLine
              dashLength={3}
              dashColor={Variables.Colors.borderGrey}
              axis="vertical"
              style={{ height: "100%" }}
            />
            <View style={{ width: "45%", justifyContent: "center" }}>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "flex-end",
                  flexDirection: "row",
                  flex: 1,
                }}
              >
                <Text
                  style={[
                    FontStyle.urbanistMedium,
                    CommonStyles.extraSmallCommonTxt,
                  ]}
                >
                  {getOr(carItem, "avgRating", null)
                    ? parseFloat(getOr(carItem, "avgRating", null)).toFixed(1)
                    : null}{" "}
                </Text>
                {getOr(carItem, "avgRating", null) ? (
                  <StarSvg width={15} height={15} />
                ) : null}
                {getOr(carItem, "trip", null) ? (
                  <Text
                    style={[
                      FontStyle.urbanistMedium,
                      CommonStyles.extraSmallCommonTxt,
                    ]}
                  >
                    {` (${getOr(carItem, "trip", "0")} trips)`}
                  </Text>
                ) : (
                  <Text
                    style={[
                      FontStyle.urbanistMedium,
                      CommonStyles.extraSmallCommonTxt,
                    ]}
                  >
                    ( 0 trips )
                  </Text>
                )}

                {userRole === "ROLE_CUSTOMER" && toggleFavorite && (
                  <TouchableOpacity
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      position: "absolute",
                      right: 10,
                      top: 5,
                    }}
                    onPress={() => {
                      toggleFavorite(carItem);
                    }}
                  >
                    {getOr(carItem, "isFavourite", null) ? (
                      <HeartRedSvg width={20} height={20} />
                    ) : (
                      <HeartWhiteSvg width={20} height={20} />
                    )}
                  </TouchableOpacity>
                )}
              </View>
              <DashedLine
                dashLength={3}
                style={{ width: "98%", marginVertical: 5 }}
                dashColor={Variables.Colors.borderGrey}
              />
              <View style={{ width: "100%", flex: 1, alignItems: "center" }}>
                <Text
                  style={[
                    FontStyle.urbanistBold,
                    CommonStyles.buttonCommonTxt,
                    ,
                    { color: Colors.white, flexShrink: 1 },
                  ]}
                >
                  {`US$${parseFloat(getOr(carItem, "marketValue", "0")).toFixed(
                    2
                  )}`}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  carView: {
    backgroundColor: Variables.Colors.carGrey,
    borderRadius: 10,
  },
  carView01: {
    width: "95%",
    alignSelf: "center",
    marginVertical: 15,
  },
  carImgStyle: {
    height: Variables.Measures.width / 2,
    width: "100%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
});
export default memo(CarCardView);

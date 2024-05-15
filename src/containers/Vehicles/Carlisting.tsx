import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  StatusBar,
  RefreshControl,
} from "react-native";
import { useTranslation } from "react-i18next";

import {
  CommonStyles,
  FontStyle,
  Images,
  Layout,
  Variables,
} from "../../Theme";

import DashedLine from "react-native-dashed-line";

import InCompleteSvg from "../../assets/Images/InComplete.svg";
import CompleteSvg from "../../assets/Images/Complete.svg";
import PenSvg from "../../assets/Images/PencilSvg.svg";
import { navigate } from "../../navigators/RootNavigation";
import { useDispatch, useSelector } from "react-redux";
import { ReducerStateProps } from "../Inbox/InterfaceProps";
import _ from "lodash";
import { RouteProp, useIsFocused } from "@react-navigation/native";
import FastImageView from "../../components/FastImageView";
import FastImage from "react-native-fast-image";
import ContentLoader, { Rect, Circle } from "react-content-loader/native";
import {
  ownerCarListStart,
  ownerCarViewStart,
} from "../../actions/carOwnerActions";
import AlertSvg from "../../assets/Images/Alert.svg";
import StripeAccountSetup from "../../components/StripeAccountSetup";
import Tooltip from "rn-tooltip";

interface FavoritesProps {
  onClick?: (val: number, val01: number, route?: any) => void;
  route?: RouteProp<any, any>;
}

const Carlisting: React.FC<FavoritesProps> = ({ onClick }) => {
  const { t } = useTranslation();
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const [isLoading, carListData, profileDetailsData] = useSelector(
    (state: ReducerStateProps) => [
      state.carOwner.isLoading,
      state.carOwner.ownerCarListData,
      state.user.profileDetailsData,
    ]
  );

  useEffect(() => {
    if (isFocused) {
      dispatch(ownerCarListStart(null));
    }
  }, [isFocused]);

  const renderCars = (item: any, index: number) => {
    const assetImage = _.first(_.get(item, "carAssets", null));

    return (
      <TouchableOpacity
        onPress={() => {
          onClick(29, 0);
          dispatch(ownerCarViewStart({ carId: _.get(item, "id", null) }));
        }}
        style={[styles.carView]}
      >
        <View style={styles.carImgView}>
          {_.get(assetImage, "image", null) ? (
            <View>
              <FastImageView
                source={{ uri: _.get(assetImage, "image", null) }}
                style={styles.carImgStyle}
              />
            </View>
          ) : (
            <View>
              <FastImage
                source={Images.CarPlaceHolder}
                style={styles.carImgStyle}
              />
            </View>
          )}

          <View style={styles.carWidthView}>
            <View style={styles.carDescView}>
              <View style={styles.carNameView}>
                <Text
                  style={[FontStyle.urbanistBold, CommonStyles.descCommonTxt]}
                >
                  {_.get(item, "name", null)}
                </Text>
                <Text
                  style={[
                    FontStyle.urbanistMedium,
                    CommonStyles.extraSmallCommonTxt,
                  ]}
                >
                  {_.get(item, "model", null)}
                </Text>
                {/* <Text style={[FontStyle.urbanistMedium, styles.ownerNameTxt]}>
                  {item.completePer}
                </Text> */}
              </View>
              <DashedLine
                dashLength={6}
                dashColor={Variables.Colors.borderGrey}
                axis="vertical"
                dashThickness={0.7}
              />
              <View style={styles.ratingsView}>
                <Tooltip
                  height={Variables.Measures.width / 4}
                  width={Variables.Measures.width / 2}
                  actionType="press"
                  popover={
                    <Text
                      style={
                        (FontStyle.urbanistMedium,
                        CommonStyles.descCommonTxtOnly)
                      }
                    >
                      {_.get(item, "isCompleted", null)
                        ? "You car has been approved by admin."
                        : "Your car is under admin's approval."}
                    </Text>
                  }
                  backgroundColor={Variables.Colors.carGrey}
                  overlayColor={Variables.Colors.whiteOpa30}
                >
                  <View style={styles.approveTxt}>
                    <Text
                      style={[
                        FontStyle.urbanistBold,
                        CommonStyles.descCommonTxt,
                      ]}
                    >
                      {_.get(item, "isCompleted", null)
                        ? "COMPLETE"
                        : "INCOMPLETE"}
                    </Text>
                    {_.get(item, "isCompleted", null) ? (
                      <View style={styles.completeView}>
                        <CompleteSvg />
                      </View>
                    ) : (
                      <View style={{ marginTop: 5 }}>
                        <InCompleteSvg />
                      </View>
                    )}
                  </View>
                </Tooltip>
                {/* <Text
                  style={[FontStyle.urbanistBold, CommonStyles.descCommonTxt]}
                >
                  {_.get(item, "isCompleted", null) ? "COMPLETE" : "INCOMPLETE"}
                </Text> */}
                {/* {_.get(item, "isCompleted", null) ? (
                  <View style={styles.completeView}>
                    <CompleteSvg />
                  </View>
                ) : (
                  <View style={{ marginTop: 5 }}>
                    <InCompleteSvg />
                  </View>
                )} */}
              </View>
            </View>
            <DashedLine
              dashLength={6}
              dashColor={Variables.Colors.borderGrey}
              dashThickness={0.7}
            />
            <View
              style={[
                Layout.rowFlex,
                {
                  height: Variables.Measures.fontSize,
                  // backgroundColor: "red",
                },
              ]}
            >
              <View style={styles.leftWidthView} />
              <DashedLine
                dashLength={6}
                dashColor={Variables.Colors.borderGrey}
                axis="vertical"
                dashThickness={0.7}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const LoadingView = () => {
    return (
      <ScrollView
        style={{
          height: Variables.Measures.height,
          marginTop: 30,
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
            x={Variables.MetricsSizes.small}
            y="0"
            rx="4"
            ry="4"
            width={Variables.Measures.width / 1.06}
            height={Variables.Measures.width / 1.5}
          />

          <Rect
            x={Variables.MetricsSizes.large}
            y={Variables.Measures.width / 2.5}
            rx="4"
            ry="4"
            width={Variables.Measures.width / 3.5}
            height="8"
          />

          <Rect
            x={Variables.MetricsSizes.large}
            y={Variables.Measures.width / 2.2}
            rx="4"
            ry="4"
            width={Variables.Measures.width / 3}
            height="8"
          />
          <Rect
            x={Variables.Measures.width / 1.4}
            y={Variables.Measures.width / 2.5}
            rx="4"
            ry="4"
            width={Variables.Measures.width / 5}
            height="8"
          />

          <Circle
            cx={Variables.Measures.width / 1.23}
            cy={Variables.Measures.width / 2.1}
            r="12"
          />
        </ContentLoader>

        <View style={{ marginTop: 30 }}></View>

        <ContentLoader
          backgroundColor={Variables.Colors.absoluteBgGrey}
          foregroundColor={Variables.Colors.grey}
          width={Variables.Measures.width}
          height={Variables.Measures.width / 1.8}
        >
          <Rect
            x={Variables.MetricsSizes.small}
            y="0"
            rx="4"
            ry="4"
            width={Variables.Measures.width / 1.06}
            height={Variables.Measures.width / 1.5}
          />

          <Rect
            x={Variables.MetricsSizes.large}
            y={Variables.Measures.width / 2.5}
            rx="4"
            ry="4"
            width={Variables.Measures.width / 3.5}
            height="8"
          />

          <Rect
            x={Variables.MetricsSizes.large}
            y={Variables.Measures.width / 2.2}
            rx="4"
            ry="4"
            width={Variables.Measures.width / 3}
            height="8"
          />
          <Rect
            x={Variables.Measures.width / 1.4}
            y={Variables.Measures.width / 2.5}
            rx="4"
            ry="4"
            width={Variables.Measures.width / 5}
            height="8"
          />

          <Circle
            cx={Variables.Measures.width / 1.23}
            cy={Variables.Measures.width / 2.1}
            r="12"
          />
        </ContentLoader>
      </ScrollView>
    );
  };

  const onRefresh = () => {
    dispatch(ownerCarListStart(null));
    setRefreshing(true);
  };

  useEffect(() => {
    if (!isLoading) {
      setRefreshing(false);
    }
  }, [isLoading, carListData]);

  return !carListData ? (
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
      <View
        style={{
          marginBottom: Variables.Measures.fontSize * 4,
        }}
      >
        {!profileDetailsData?.verifiedInfo?.hostStripeId ||
        !profileDetailsData?.verifiedInfo?.isBankDetailsAddStatus ? (
          <StripeAccountSetup />
        ) : null}
        <FlatList
          initialNumToRender={3}
          data={_.get(carListData, "items", null) || []}
          renderItem={({ item, index }: any) => renderCars(item, index)}
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
                No lisitings found.
              </Text>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  approveTxt: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  completeView: {
    height: 25,
    width: 25,
    backgroundColor: Variables.Colors.success,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  statusTxt: {
    fontSize: 12,
    color: Variables.Colors.white,
  },
  ownerNameTxt: {
    fontSize: 11,
    color: Variables.Colors.white,
    marginVertical: 1,
  },
  setUpTxt: {
    fontSize: 16,
    color: Variables.Colors.white,
  },
  carView: {
    backgroundColor: Variables.Colors.carGrey,
    width: "95%",
    alignSelf: "center",
    marginTop: Variables.Measures.fontSize,
    borderRadius: 10,
  },
  carImgView: {
    minHeight: Variables.Measures.height / 3,
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
    height: 70,
  },
  carNameView: {
    width: "65%",
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  ratingsView: {
    alignItems: "center",
    justifyContent: "center",
    width: "30%",
  },
  carWidthView: {
    flex: 1,
    width: "100%",
  },
  leftWidthView: {
    width: "65%",
  },
  safeAreaStyle: {
    flex: 1,
    backgroundColor: Variables.Colors.darkBlack,
  },
  alertView: {
    width: "92%",
    backgroundColor: Variables.Colors.greyBg,
    alignSelf: "center",
    marginTop: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Variables.Colors.darkYellow,
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 15,
  },
  infoTxt: {
    color: Variables.Colors.white,
    fontSize: 14,
    lineHeight: 20,
    marginVertical: 8,
  },
  setUpBtnTxt: {
    color: Variables.Colors.darkYellow,
  },
  tripsTxt: {
    color: Variables.Colors.white,
    fontSize: 22,
  },
});

export default Carlisting;

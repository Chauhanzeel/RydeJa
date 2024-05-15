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
import { useTranslation } from "react-i18next";
import Header from "../components/Header";

import { FontStyle, Images, Variables } from "../Theme";
import BackSvg from "../assets/Images/BackArrow.svg";
import CarSvg from "../assets/Images/carSketch.svg";

import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";

import ContentLoader, { Rect, Circle } from "react-content-loader/native";
import { ReducerStateProps } from "./Inbox/InterfaceProps";
import { loadAndroidRawResource } from "react-native-svg/lib/typescript/LocalSvg";
import { goBack, navigate } from "../navigators/RootNavigation";
import { ownerTHListStart } from "../actions/carOwnerActions";
import moment from "moment";
import { SafeAreaView } from "react-native-safe-area-context";

interface TripHistoryProps {}

const TripHistory: React.FC<TripHistoryProps> = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, ownerCarViewData, ownerTHListData] = useSelector(
    (state: ReducerStateProps) => [
      state.carOwner.isLoading,
      state.carOwner.ownerCarViewData,
      state.carOwner.ownerTHListData,
    ]
  );

  useEffect(() => {
    let params = {
      carId: _.get(ownerCarViewData, "id", null),
    };
    dispatch(ownerTHListStart(params));
  }, []);

  const data = [
    {
      id: "1eb3479b-5965-48e3-91ea-81dcb88£6288",
      FromDateTime: "2023-08-11T08:15:30+00:00",
      toDateTime: "2023-08-11T09:15:30+00:00",
      amount: 60,
      totalAmount: 600.66,
      status: "completed",
      car_id: "926035de-9c5e-4658-66c7-91540£a2bc2d",
      customer_id: "1031ed69-6d94-4a38-82ec-4646f0642816",
      customer_fullName: "Behat User",
      customer_role: "ROLE CUSTOMER",
      customer_profilePicture:
        "https://drive.google.com/file/d/15PN3TYPuiAOFVAH7vkotkj8H84zna7Vu/view?usp=sharing",
    },
    {
      id: "1eb3479b-5965-48e3-91ea-81dcb88£6288",
      FromDateTime: "2023-08-11T08:15:30+00:00",
      toDateTime: "2023-08-11T09:15:30+00:00",
      amount: 60,
      totalAmount: 600.66,
      status: "completed",
      car_id: "926035de-9c5e-4658-66c7-91540£a2bc2d",
      customer_id: "1031ed69-6d94-4a38-82ec-4646f0642816",
      customer_fullName: "Behat User",
      customer_role: "ROLE CUSTOMER",
      customer_profilePicture:
        "https://drive.google.com/file/d/15PN3TYPuiAOFVAH7vkotkj8H84zna7Vu/view?usp=sharing",
    },
  ];

  useEffect(() => {
    if (!isLoading) {
      setRefreshing(false);
    }
  }, [isLoading]);

  const onRefresh = () => {
    if (!isLoading) {
      setRefreshing(true);
      let params = {
        carId: _.get(ownerCarViewData, "id", null),
      };
      dispatch(ownerTHListStart(params));
    } else {
      setRefreshing(false);
    }
  };

  const LoadingView = () => {
    return (
      <SafeAreaView style={styles.safeAreaStyle}>
        <StatusBar
          backgroundColor={Variables.Colors.blackBg}
          barStyle="light-content"
          translucent
        />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={Variables.Colors.white}
            />
          }
          style={{
            height: Variables.Measures.height,
          }}
        >
          <View
            style={{
              width: Variables.Measures.width,
              height: 60,
              marginTop: Variables.FontSize.regular,
            }}
          >
            <ContentLoader
              backgroundColor={Variables.Colors.absoluteBgGrey}
              foregroundColor={Variables.Colors.grey}
            >
              <Rect x="20" y="0" rx="4" ry="4" width="30" height="30" />
              <Rect x="65" y="0" rx="4" ry="4" width="150" height="30" />
            </ContentLoader>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: Variables.Measures.width / 1.05,
              alignSelf: "center",
              height: Variables.FontSize.large * 2.2,
            }}
          >
            <View
              style={{
                width: "25%",
                height: "100%",
              }}
            >
              <ContentLoader
                backgroundColor={Variables.Colors.absoluteBgGrey}
                foregroundColor={Variables.Colors.grey}
                width="100%"
                height="100%"
              >
                <Rect x="0" y="0" rx="4" ry="4" width="100%" height="100%" />
              </ContentLoader>
            </View>

            <View
              style={{
                width: "70%",
                height: "100%",
                borderBottomColor: Variables.Colors.absoluteBgGrey,
                borderBottomWidth: 5,
              }}
            >
              <ContentLoader
                backgroundColor={Variables.Colors.absoluteBgGrey}
                foregroundColor={Variables.Colors.grey}
                width="100%"
                height="100%"
              >
                <Rect
                  x="0"
                  y="20"
                  rx="4"
                  ry="4"
                  width="25%"
                  height={Variables.MetricsSizes.small}
                />

                <Rect
                  x="0"
                  y="40"
                  rx="4"
                  ry="4"
                  width="25%"
                  height={Variables.MetricsSizes.small}
                />
                <Rect
                  x="0"
                  y="60"
                  rx="4"
                  ry="4"
                  width="25%"
                  height={Variables.MetricsSizes.small}
                />
              </ContentLoader>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: Variables.Measures.width / 1.05,
              alignSelf: "center",
              height: Variables.FontSize.large * 2.2,
              marginTop: Variables.FontSize.regular,
            }}
          >
            <View
              style={{
                width: "25%",
                height: "100%",
              }}
            >
              <ContentLoader
                backgroundColor={Variables.Colors.absoluteBgGrey}
                foregroundColor={Variables.Colors.grey}
                width="100%"
                height="100%"
              >
                <Rect x="0" y="0" rx="4" ry="4" width="100%" height="100%" />
              </ContentLoader>
            </View>

            <View
              style={{
                width: "70%",
                height: "100%",
                borderBottomColor: Variables.Colors.absoluteBgGrey,
                borderBottomWidth: Variables.MetricsSizes.tiny,
              }}
            >
              <ContentLoader
                backgroundColor={Variables.Colors.absoluteBgGrey}
                foregroundColor={Variables.Colors.grey}
                width="100%"
                height="100%"
              >
                <Rect
                  x="0"
                  y="20"
                  rx="4"
                  ry="4"
                  width="25%"
                  height={Variables.MetricsSizes.small}
                />

                <Rect
                  x="0"
                  y="40"
                  rx="4"
                  ry="4"
                  width="25%"
                  height={Variables.MetricsSizes.small}
                />
                <Rect
                  x="0"
                  y="60"
                  rx="4"
                  ry="4"
                  width="25%"
                  height={Variables.MetricsSizes.small}
                />
              </ContentLoader>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: Variables.Measures.width / 1.05,
              alignSelf: "center",
              height: Variables.FontSize.large * 2.2,
              marginTop: Variables.FontSize.regular,
            }}
          >
            <View
              style={{
                width: "25%",
                height: "100%",
              }}
            >
              <ContentLoader
                backgroundColor={Variables.Colors.absoluteBgGrey}
                foregroundColor={Variables.Colors.grey}
                width="100%"
                height="100%"
              >
                <Rect x="0" y="0" rx="4" ry="4" width="100%" height="100%" />
              </ContentLoader>
            </View>

            <View
              style={{
                width: "70%",
                height: "100%",
                borderBottomColor: Variables.Colors.absoluteBgGrey,
                borderBottomWidth: Variables.MetricsSizes.tiny,
              }}
            >
              <ContentLoader
                backgroundColor={Variables.Colors.absoluteBgGrey}
                foregroundColor={Variables.Colors.grey}
                width="100%"
                height="100%"
              >
                <Rect
                  x="0"
                  y="20"
                  rx="4"
                  ry="4"
                  width="25%"
                  height={Variables.MetricsSizes.small}
                />

                <Rect
                  x="0"
                  y="40"
                  rx="4"
                  ry="4"
                  width="25%"
                  height={Variables.MetricsSizes.small}
                />
                <Rect
                  x="0"
                  y="60"
                  rx="4"
                  ry="4"
                  width="25%"
                  height={Variables.MetricsSizes.small}
                />
              </ContentLoader>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: Variables.Measures.width / 1.05,
              alignSelf: "center",
              height: Variables.FontSize.large * 2.2,
              marginTop: Variables.FontSize.regular,
            }}
          >
            <View
              style={{
                width: "25%",
                height: "100%",
              }}
            >
              <ContentLoader
                backgroundColor={Variables.Colors.absoluteBgGrey}
                foregroundColor={Variables.Colors.grey}
                width="100%"
                height="100%"
              >
                <Rect x="0" y="0" rx="4" ry="4" width="100%" height="100%" />
              </ContentLoader>
            </View>

            <View
              style={{
                width: "70%",
                height: "100%",
                borderBottomColor: Variables.Colors.absoluteBgGrey,
                borderBottomWidth: Variables.MetricsSizes.tiny,
              }}
            >
              <ContentLoader
                backgroundColor={Variables.Colors.absoluteBgGrey}
                foregroundColor={Variables.Colors.grey}
                width="100%"
                height="100%"
              >
                <Rect
                  x="0"
                  y="20"
                  rx="4"
                  ry="4"
                  width="25%"
                  height={Variables.MetricsSizes.small}
                />

                <Rect
                  x="0"
                  y="40"
                  rx="4"
                  ry="4"
                  width="25%"
                  height={Variables.MetricsSizes.small}
                />
                <Rect
                  x="0"
                  y="60"
                  rx="4"
                  ry="4"
                  width="25%"
                  height={Variables.MetricsSizes.small}
                />
              </ContentLoader>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: Variables.Measures.width / 1.05,
              alignSelf: "center",
              height: Variables.FontSize.large * 2.2,
              marginTop: Variables.FontSize.regular,
            }}
          >
            <View
              style={{
                width: "25%",
                height: "100%",
              }}
            >
              <ContentLoader
                backgroundColor={Variables.Colors.absoluteBgGrey}
                foregroundColor={Variables.Colors.grey}
                width="100%"
                height="100%"
              >
                <Rect x="0" y="0" rx="4" ry="4" width="100%" height="100%" />
              </ContentLoader>
            </View>

            <View
              style={{
                width: "70%",
                height: "100%",
                borderBottomColor: Variables.Colors.absoluteBgGrey,
                borderBottomWidth: Variables.MetricsSizes.tiny,
              }}
            >
              <ContentLoader
                backgroundColor={Variables.Colors.absoluteBgGrey}
                foregroundColor={Variables.Colors.grey}
                width="100%"
                height="100%"
              >
                <Rect
                  x="0"
                  y="20"
                  rx="4"
                  ry="4"
                  width="25%"
                  height={Variables.MetricsSizes.small}
                />

                <Rect
                  x="0"
                  y="40"
                  rx="4"
                  ry="4"
                  width="25%"
                  height={Variables.MetricsSizes.small}
                />
                <Rect
                  x="0"
                  y="60"
                  rx="4"
                  ry="4"
                  width="25%"
                  height={Variables.MetricsSizes.small}
                />
              </ContentLoader>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };

  const carItem = (carItem: any, i: any) => {
    return (
      <View
        style={{
          width: Variables.Measures.width / 1.05,
          height: Variables.MetricsSizes.large * 3,
          marginTop: Variables.FontSize.regular,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            width: "25%",
            height: "100%",
            backgroundColor: Variables.Colors.greyBg,
            borderRadius: Variables.MetricsSizes.small,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CarSvg />
        </View>
        <View
          style={{
            width: "70%",
            borderBottomColor: Variables.Colors.carsBorderGrey,
            borderBottomWidth: 1,
            justifyContent: "center",
          }}
        >
          <View>
            <Text
              style={[
                FontStyle.urbanistBold,
                { fontSize: 16, color: Variables.Colors.white },
              ]}
            >
              {carItem?.customer_fullName}
            </Text>

            <View style={{ flexDirection: "row" }}>
              <Text
                style={[
                  FontStyle.urbanistMedium,
                  { fontSize: 14, color: Variables.Colors.inputTxtColor },
                ]}
              >
                {moment(_.get(carItem, "fromDateTime", null)).format(
                  "MMM DD hh:mm A"
                )}
              </Text>
              <Text
                style={[
                  FontStyle.urbanistMedium,
                  {
                    fontSize: 14,
                    color: Variables.Colors.inputTxtColor,
                    marginHorizontal: 5,
                  },
                ]}
              >
                to
              </Text>
              <Text
                style={[
                  FontStyle.urbanistMedium,
                  { fontSize: 14, color: Variables.Colors.inputTxtColor },
                ]}
              >
                {moment(_.get(carItem, "toDateTime", null)).format(
                  "MMM DD hh:mm A"
                )}
              </Text>
            </View>
            <Text
              style={[
                FontStyle.urbanistMedium,
                { fontSize: 14, color: Variables.Colors.inputTxtColor },
              ]}
            >
              {"$" + carItem?.totalAmount}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return !ownerTHListData ? (
    <LoadingView />
  ) : (
    <SafeAreaView style={styles.safeAreaStyle}>
      <StatusBar
        backgroundColor={Variables.Colors.blackBg}
        barStyle="light-content"
        animated={true}
        translucent
      />
      <Header
        centerText={"Trip History"}
        leftSvg={<BackSvg height={25} width={25} />}
        onLeftPress={() => navigate("TabNavigations")}
      />

      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Variables.Colors.white}
          />
        }
        style={{ alignSelf: "center" }}
        onRefresh={onRefresh}
        initialNumToRender={5}
        refreshing={refreshing}
        data={_.get(ownerTHListData, "items", null) || []}
        renderItem={({ item, index }: any) => carItem(item, index)}
        ListEmptyComponent={() => (
          <View style={styles.noCar}>
            <Text style={[FontStyle.urbanistSemiBold, styles.tripsTxt]}>
              No history found.
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaStyle: {
    flex: 1,
    backgroundColor: Variables.Colors.darkBlack,
    // marginTop: Variables.Measures.StatusBarHeight,
  },
  noCar: {
    width: "100%",
    height: Variables.Measures.height / 1.5,
    justifyContent: "center",
    alignItems: "center",
  },
  tripsTxt: {
    color: Variables.Colors.white,
    fontSize: 22,
  },
});

export default TripHistory;

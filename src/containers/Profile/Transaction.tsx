import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import {
  FontStyle,
  Variables,
  Layout,
  CommonStyles,
  Images,
} from "../../Theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";

import { goBack } from "../../navigators/RootNavigation";

import ContentLoader, { Rect, Circle } from "react-content-loader/native";

import Header from "../../components/Header";

import BackSvg from "../../assets/Images/BackArrow.svg";
import Credit from "../../assets/Images/incomingBlue.svg";
import Debit from "../../assets/Images/OutgoingRed.svg";
import TopUp from "../../assets/Images/TopUp.svg";
import { useDispatch, useSelector } from "react-redux";
import { transactionListStart } from "../../actions/carOwnerActions";
import { ReducerStateProps } from "../Inbox/InterfaceProps";
import _ from "lodash";
import moment from "moment";
import FastImageView from "../../components/FastImageView";

interface BookingProps {}

const Transaction: React.FC<BookingProps> = () => {
  const { t } = useTranslation();
  const [refreshing, setRefreshing] = useState(false);

  const dispatch = useDispatch();
  const [isLoadingOwner, transactionListData, loginData] = useSelector(
    (state: ReducerStateProps) => [
      state.carOwner.isLoading,
      state.carOwner.transactionListData,
      state.auth.loginData,
    ]
  );

  useEffect(() => {
    if (!isLoadingOwner) {
      setRefreshing(false);
    }
  }, [isLoadingOwner]);

  useEffect(() => {
    if (loginData) {
      dispatch(transactionListStart());
    }
  }, [loginData]);

  const renderWalletData = (item: any) => {
    return (
      <View
        style={styles.outerView}
        // onPress={() => navigate("Ereceipt")}
      >
        <View style={styles.leftUserImg}>
          {_.get(item, "payer", null) ? (
            <>
              {_.get(item, "payer.profilePicture", null) ? (
                <FastImageView
                  source={{ uri: _.get(item, "payer.profilePicture", null) }}
                  style={{ height: "100%", width: "100%", borderRadius: 7 }}
                />
              ) : (
                <Image
                  source={Images.userPlaceholder}
                  style={{ height: "100%", width: "100%", borderRadius: 7 }}
                />
              )}
            </>
          ) : _.get(item, "receiver", null) ? (
            <>
              {_.get(item, "receiver.profilePicture", null) ? (
                <FastImageView
                  source={{
                    uri: _.get(item, "receiver.profilePicture", null),
                  }}
                  style={{ height: "100%", width: "100%", borderRadius: 7 }}
                />
              ) : (
                <Image
                  source={Images.userPlaceholder}
                  style={{ height: "100%", width: "100%", borderRadius: 7 }}
                  resizeMode="contain"
                />
              )}
            </>
          ) : (
            <>
              {/* <FastImageView
                source={}
                style={{ height: "100%", width: "100%", borderRadius: 7 }}
              /> */}
              <TopUp width={"100%"} height={"100%"} />
            </>
          )}
        </View>

        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            width: "80%",
          }}
        >
          <View style={styles.centerUserName}>
            {_.get(item, "payer", null) ? (
              <Text
                style={[FontStyle.urbanistBold, CommonStyles.smallCommonTxt]}
              >
                {_.get(item, "payer.fullName", null)}
              </Text>
            ) : _.get(item, "receiver", null) ? (
              <Text
                style={[FontStyle.urbanistBold, CommonStyles.smallCommonTxt]}
              >
                {_.get(item, "receiver.fullName", null)}
              </Text>
            ) : (
              <Text
                style={[FontStyle.urbanistBold, CommonStyles.smallCommonTxt]}
              >
                Top Up Wallet
              </Text>
            )}
            <View style={[Layout.row, { marginTop: 5 }]}>
              <Text
                style={[
                  styles.dateTxt,
                  FontStyle.urbanistMedium,
                  { marginRight: 5 },
                ]}
              >
                {moment(_.get(item, "date", null)).format(
                  "MMM DD, YYYY | hh:mm A"
                )}
              </Text>
            </View>
          </View>
          <View style={styles.rightAmountView}>
            <Text style={[FontStyle.urbanistBold, styles.amountTxt]}>
              ${_.get(item, "amount", null)}
            </Text>
            <View style={styles.rowView}>
              <Text style={[FontStyle.urbanistMedium, styles.typeTxt]}>
                {_.get(item, "type", null)}
              </Text>
              <View style={{ marginLeft: 5, marginTop: 5 }}>
                {_.get(item, "type", null) == "Top Up" ||
                _.get(item, "type", null) == "credit" ? (
                  <Credit />
                ) : (
                  <Debit />
                )}
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  const LoadingView = () => {
    return (
      <SafeAreaView style={[CommonStyles.safeAreaStyle, { paddingTop: 30 }]}>
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
              height: 60,
            }}
          >
            <ContentLoader
              backgroundColor={Variables.Colors.absoluteBgGrey}
              foregroundColor={Variables.Colors.grey}
            >
              <Rect x="15" y="0" rx="4" ry="4" width="40" height="30" />
              <Rect x="70" y="0" rx="4" ry="4" width="150" height="30" />
            </ContentLoader>
          </View>

          <ContentLoader
            backgroundColor={Variables.Colors.absoluteBgGrey}
            foregroundColor={Variables.Colors.grey}
            width={Variables.Measures.width}
            height={Variables.Measures.width / 3.5}
          >
            <Rect
              x="15"
              y="0"
              rx="4"
              ry="4"
              width={Variables.MetricsSizes.large * 2.5}
              height={Variables.MetricsSizes.large * 2.5}
            />

            <Rect
              x={Variables.FontSize.large * 2.8}
              y="10"
              rx="4"
              ry="4"
              width={Variables.Measures.width / 3.5}
              height={Variables.FontSize.regular}
            />

            <Rect
              x={Variables.FontSize.large * 2.8}
              y="50"
              rx="4"
              ry="4"
              width={Variables.Measures.width / 2.8}
              height={Variables.FontSize.regular}
            />
            <Rect
              x={Variables.Measures.width / 1.14}
              y="10"
              rx="4"
              ry="4"
              width={Variables.MetricsSizes.large}
              height={Variables.MetricsSizes.large}
            />

            <Rect
              x={Variables.Measures.width / 1.38}
              y="50"
              rx="4"
              ry="4"
              width={Variables.MetricsSizes.large * 3}
              height={Variables.FontSize.regular}
            />
          </ContentLoader>

          <ContentLoader
            backgroundColor={Variables.Colors.absoluteBgGrey}
            foregroundColor={Variables.Colors.grey}
            width={Variables.Measures.width}
            height={Variables.Measures.width / 3.5}
          >
            <Rect
              x="15"
              y="0"
              rx="4"
              ry="4"
              width={Variables.MetricsSizes.large * 2.5}
              height={Variables.MetricsSizes.large * 2.5}
            />

            <Rect
              x={Variables.FontSize.large * 2.8}
              y="10"
              rx="4"
              ry="4"
              width={Variables.Measures.width / 3.5}
              height={Variables.FontSize.regular}
            />

            <Rect
              x={Variables.FontSize.large * 2.8}
              y="50"
              rx="4"
              ry="4"
              width={Variables.Measures.width / 2.8}
              height={Variables.FontSize.regular}
            />
            <Rect
              x={Variables.Measures.width / 1.14}
              y="10"
              rx="4"
              ry="4"
              width={Variables.MetricsSizes.large}
              height={Variables.MetricsSizes.large}
            />

            <Rect
              x={Variables.Measures.width / 1.38}
              y="50"
              rx="4"
              ry="4"
              width={Variables.MetricsSizes.large * 3}
              height={Variables.FontSize.regular}
            />
          </ContentLoader>

          <ContentLoader
            backgroundColor={Variables.Colors.absoluteBgGrey}
            foregroundColor={Variables.Colors.grey}
            width={Variables.Measures.width}
            height={Variables.Measures.width / 3.5}
          >
            <Rect
              x="15"
              y="0"
              rx="4"
              ry="4"
              width={Variables.MetricsSizes.large * 2.5}
              height={Variables.MetricsSizes.large * 2.5}
            />

            <Rect
              x={Variables.FontSize.large * 2.8}
              y="10"
              rx="4"
              ry="4"
              width={Variables.Measures.width / 3.5}
              height={Variables.FontSize.regular}
            />

            <Rect
              x={Variables.FontSize.large * 2.8}
              y="50"
              rx="4"
              ry="4"
              width={Variables.Measures.width / 2.8}
              height={Variables.FontSize.regular}
            />
            <Rect
              x={Variables.Measures.width / 1.14}
              y="10"
              rx="4"
              ry="4"
              width={Variables.MetricsSizes.large}
              height={Variables.MetricsSizes.large}
            />

            <Rect
              x={Variables.Measures.width / 1.38}
              y="50"
              rx="4"
              ry="4"
              width={Variables.MetricsSizes.large * 3}
              height={Variables.FontSize.regular}
            />
          </ContentLoader>

          <ContentLoader
            backgroundColor={Variables.Colors.absoluteBgGrey}
            foregroundColor={Variables.Colors.grey}
            width={Variables.Measures.width}
            height={Variables.Measures.width / 3.5}
          >
            <Rect
              x="15"
              y="0"
              rx="4"
              ry="4"
              width={Variables.MetricsSizes.large * 2.5}
              height={Variables.MetricsSizes.large * 2.5}
            />

            <Rect
              x={Variables.FontSize.large * 2.8}
              y="10"
              rx="4"
              ry="4"
              width={Variables.Measures.width / 3.5}
              height={Variables.FontSize.regular}
            />

            <Rect
              x={Variables.FontSize.large * 2.8}
              y="50"
              rx="4"
              ry="4"
              width={Variables.Measures.width / 2.8}
              height={Variables.FontSize.regular}
            />
            <Rect
              x={Variables.Measures.width / 1.14}
              y="10"
              rx="4"
              ry="4"
              width={Variables.MetricsSizes.large}
              height={Variables.MetricsSizes.large}
            />

            <Rect
              x={Variables.Measures.width / 1.38}
              y="50"
              rx="4"
              ry="4"
              width={Variables.MetricsSizes.large * 3}
              height={Variables.FontSize.regular}
            />
          </ContentLoader>

          <ContentLoader
            backgroundColor={Variables.Colors.absoluteBgGrey}
            foregroundColor={Variables.Colors.grey}
            width={Variables.Measures.width}
            height={Variables.Measures.width / 3.5}
          >
            <Rect
              x="15"
              y="0"
              rx="4"
              ry="4"
              width={Variables.MetricsSizes.large * 2.5}
              height={Variables.MetricsSizes.large * 2.5}
            />

            <Rect
              x={Variables.FontSize.large * 2.8}
              y="10"
              rx="4"
              ry="4"
              width={Variables.Measures.width / 3.5}
              height={Variables.FontSize.regular}
            />

            <Rect
              x={Variables.FontSize.large * 2.8}
              y="50"
              rx="4"
              ry="4"
              width={Variables.Measures.width / 2.8}
              height={Variables.FontSize.regular}
            />
            <Rect
              x={Variables.Measures.width / 1.14}
              y="10"
              rx="4"
              ry="4"
              width={Variables.MetricsSizes.large}
              height={Variables.MetricsSizes.large}
            />

            <Rect
              x={Variables.Measures.width / 1.38}
              y="50"
              rx="4"
              ry="4"
              width={Variables.MetricsSizes.large * 3}
              height={Variables.FontSize.regular}
            />
          </ContentLoader>

          <ContentLoader
            backgroundColor={Variables.Colors.absoluteBgGrey}
            foregroundColor={Variables.Colors.grey}
            width={Variables.Measures.width}
            height={Variables.Measures.width / 3.5}
          >
            <Rect
              x="15"
              y="0"
              rx="4"
              ry="4"
              width={Variables.MetricsSizes.large * 2.5}
              height={Variables.MetricsSizes.large * 2.5}
            />

            <Rect
              x={Variables.FontSize.large * 2.8}
              y="10"
              rx="4"
              ry="4"
              width={Variables.Measures.width / 3.5}
              height={Variables.FontSize.regular}
            />

            <Rect
              x={Variables.FontSize.large * 2.8}
              y="50"
              rx="4"
              ry="4"
              width={Variables.Measures.width / 2.8}
              height={Variables.FontSize.regular}
            />
            <Rect
              x={Variables.Measures.width / 1.14}
              y="10"
              rx="4"
              ry="4"
              width={Variables.MetricsSizes.large}
              height={Variables.MetricsSizes.large}
            />

            <Rect
              x={Variables.Measures.width / 1.38}
              y="50"
              rx="4"
              ry="4"
              width={Variables.MetricsSizes.large * 3}
              height={Variables.FontSize.regular}
            />
          </ContentLoader>
        </ScrollView>
      </SafeAreaView>
    );
  };

  const onRefresh = () => {
    if (loginData) {
      dispatch(transactionListStart());
      setRefreshing(true);
    }
  };

  return !transactionListData && loginData ? (
    <LoadingView />
  ) : (
    <SafeAreaView style={CommonStyles.safeAreaStyle}>
      <StatusBar
        translucent
        backgroundColor={Variables.Colors.blackBg}
        barStyle="light-content"
      />
      <Header
        centerText="Transactions"
        leftSvg={<BackSvg height={25} width={25} />}
        onLeftPress={goBack}
      />

      <FlatList
        data={_.get(transactionListData, "items", null) || []}
        renderItem={({ item }) => renderWalletData(item)}
        style={styles.flatListView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Variables.Colors.white}
          />
        }
        ListEmptyComponent={() => (
          <View
            style={{
              width: "100%",
              height: Variables.Measures.height / 1.12,
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
            }}
          >
            <Text style={[FontStyle.urbanistSemiBold, styles.tripsTxt]}>
              No Transactions found.
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flatListView: {
    // marginBottom: 10,
    width: "93%",
    alignSelf: "center",
    marginVertical: Variables.MetricsSizes.regular,
  },
  flexAlignView: {
    width: "93%",
    alignSelf: "center",
  },
  leftUserImg: {
    width: "20%",
    justifyContent: "center",
    height: "100%",
  },
  centerUserName: {
    width: "65%",
    justifyContent: "center",
    paddingLeft: Variables.FontSize.regular,
  },
  rightAmountView: {
    width: "35%",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  userNameTxt: {
    color: Variables.Colors.white,
    fontSize: 18,
  },
  dateTxt: {
    color: Variables.Colors.locationGrey,
    fontSize: 14,
  },
  outerListView: {
    marginTop: 4,
    borderEndColor: Variables.Colors.locationGrey,
    borderEndWidth: 1,
    width: "45%",
  },
  outerView: {
    flexDirection: "row",
    width: "100%",
    marginTop: Variables.FontSize.regular,
    height: Variables.MetricsSizes.large * 2 + Variables.MetricsSizes.tiny,
  },
  amountTxt: {
    color: Variables.Colors.white,
    fontSize: Variables.Measures.fontSize / 1.2,
  },
  typeTxt: {
    color: Variables.Colors.locationGrey,
    fontSize: Variables.Measures.fontSize / 1.7,
  },
  rowView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },
  tripsTxt: {
    color: Variables.Colors.white,
    fontSize: 22,
  },
});
export default Transaction;

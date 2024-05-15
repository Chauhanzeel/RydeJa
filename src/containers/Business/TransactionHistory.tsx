import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import {
  Variables,
  FontStyle,
  Images,
  Layout,
  CommonStyles,
} from "../../Theme";

import { navigate } from "../../navigators/RootNavigation";

import Header from "../../components/Header";

import BackSvg from "../../assets/Images/BackArrow.svg";
import AlertSvg from "../../assets/Images/Alert.svg";
import TopUp from "../../assets/Images/incomingBlue.svg";
import UpRed from "../../assets/Images/OutgoingRed.svg";
import { useDispatch, useSelector } from "react-redux";
import { transactionListStart } from "../../actions/carOwnerActions";
import { ReducerStateProps } from "../Inbox/InterfaceProps";
import _ from "lodash";
import ContentLoader, { Rect, Circle } from "react-content-loader/native";
import moment from "moment";
import FastImageView from "../../components/FastImageView";
import StripeAccountSetup from "../../components/StripeAccountSetup";

interface CancelProps {
  onClick: (val: number) => void;
}

const TransactionHistory: React.FC<CancelProps> = ({ onClick }) => {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);

  const [
    isLoadingCustomer,
    isLoadingOwner,
    transactionListData,
    profileDetailsData,
    earningListData,
  ] = useSelector((state: ReducerStateProps) => [
    state.customer.isLoading,
    state.carOwner.isLoading,
    state.carOwner.transactionListData,
    state.user.profileDetailsData,
    state.carOwner.earningListData,
  ]);

  useEffect(() => {
    dispatch(transactionListStart());
  }, []);

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
                  resizeMode="contain"
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
              {_.get(item, "receiver.profilePicture", null) ? (
                <FastImageView
                  source={{ uri: _.get(item, "receiver.profilePicture", null) }}
                  style={{ height: "100%", width: "100%", borderRadius: 7 }}
                  resizeMode="contain"
                />
              ) : (
                <Image
                  source={Images.userPlaceholder}
                  style={{ height: "100%", width: "100%", borderRadius: 7 }}
                  resizeMode="contain"
                />
              )}
            </>
          )}
        </View>
        <View style={styles.centerUserName}>
          {_.get(item, "payer", null) ? (
            <Text
              style={[FontStyle.urbanistBold, styles.userNameTxt]}
              numberOfLines={1}
            >
              {_.get(item, "payer.fullName", null)}
            </Text>
          ) : (
            <Text
              style={[FontStyle.urbanistBold, styles.userNameTxt]}
              numberOfLines={1}
            >
              {_.get(item, "receiver.fullName", null)}
            </Text>
          )}
          <View style={[Layout.row, { marginTop: 5 }]}>
            <View style={styles.outerListView}>
              <Text
                style={[
                  styles.dateTxt,
                  FontStyle.urbanistMedium,
                  { marginRight: 5 },
                ]}
              >
                {moment(_.get(item, "date", null)).format("MMM DD, YYYY")}
              </Text>
            </View>
            <Text
              style={[
                styles.dateTxt,
                FontStyle.urbanistMedium,
                { marginLeft: 5, marginTop: 4 },
              ]}
            >
              {moment(_.get(item, "date", null)).format("hh:mm A")}
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
                <TopUp />
              ) : (
                <UpRed />
              )}
            </View>
          </View>
        </View>
      </View>
    );
  };

  const renderWalletData1 = (item: any) => {
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
          ) : (
            <>
              {_.get(item, "receiver.profilePicture", null) ? (
                <FastImageView
                  source={{ uri: _.get(item, "receiver.profilePicture", null) }}
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
            ) : (
              <Text
                style={[FontStyle.urbanistBold, CommonStyles.smallCommonTxt]}
              >
                {_.get(item, "receiver.fullName", null)}
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
                  <TopUp />
                ) : (
                  <UpRed />
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
          width={Variables.Measures.width}
          height={Variables.Measures.width / 3.5}
          style={{ marginTop: 20 }}
        >
          <Rect
            x="0"
            y="0"
            rx="4"
            ry="4"
            width={Variables.Measures.width}
            height={Variables.Measures.width / 2}
          />

          <Rect
            x="20"
            y={Variables.MetricsSizes.regular * 2}
            rx="4"
            ry="4"
            width={Variables.Measures.width / 1.2}
            height={Variables.FontSize.large}
          />

          <Rect
            x="20"
            y={Variables.MetricsSizes.regular * 5.5}
            rx="4"
            ry="4"
            width={Variables.Measures.width / 1.5}
            height={Variables.MetricsSizes.regular}
          />
        </ContentLoader>

        <View style={{ marginTop: Variables.FontSize.regular }} />

        <ContentLoader
          backgroundColor={Variables.Colors.absoluteBgGrey}
          foregroundColor={Variables.Colors.grey}
          width={Variables.Measures.width}
          height={Variables.Measures.width / 3.5}
        >
          <Rect
            x="15"
            y="10"
            rx="4"
            ry="4"
            width={Variables.MetricsSizes.large * 2.5}
            height={Variables.MetricsSizes.large * 2.5}
          />

          <Rect
            x={Variables.FontSize.large * 2.8}
            y="20"
            rx="4"
            ry="4"
            width={Variables.Measures.width / 3.5}
            height={Variables.FontSize.regular}
          />

          <Rect
            x={Variables.FontSize.large * 2.8}
            y="60"
            rx="4"
            ry="4"
            width={Variables.Measures.width / 2.5}
            height={Variables.FontSize.regular}
          />
          <Rect
            x={Variables.Measures.width / 1.12}
            y="15"
            rx="4"
            ry="4"
            width={Variables.MetricsSizes.large}
            height={Variables.MetricsSizes.large}
          />

          <Rect
            x={Variables.Measures.width / 1.35}
            y="60"
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
            width={Variables.Measures.width / 2.5}
            height={Variables.FontSize.regular}
          />
          <Rect
            x={Variables.Measures.width / 1.12}
            y="10"
            rx="4"
            ry="4"
            width={Variables.MetricsSizes.large}
            height={Variables.MetricsSizes.large}
          />

          <Rect
            x={Variables.Measures.width / 1.35}
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
            x={Variables.Measures.width / 1.4}
            y="0"
            rx="4"
            ry="4"
            width={Variables.FontSize.large * 2.5}
            height={Variables.FontSize.regular}
          />
        </ContentLoader>
      </ScrollView>
    );
  };

  useEffect(() => {
    if (!isLoadingCustomer && !isLoadingOwner) {
      setRefreshing(false);
    }
  }, [isLoadingCustomer, isLoadingOwner]);

  const onRefresh = () => {
    dispatch(transactionListStart());
    setRefreshing(true);
  };

  return !transactionListData ? (
    <View
      style={{
        height: Variables.Measures.height,
        width: Variables.Measures.width,
        backgroundColor: Variables.Colors.blackBg,
      }}
    >
      <LoadingView />
    </View>
  ) : (
    <ScrollView
      style={{ height: "100%" }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          tintColor={Variables.Colors.white}
        />
      }
    >
      <Header
        centerText="Transaction History"
        leftSvg={<BackSvg height={25} width={25} />}
        onLeftPress={() => onClick(0)}
      />
      {!_.get(profileDetailsData, "verifiedInfo.stripeId", null) && (
        <StripeAccountSetup />
      )}

      {/* {isLoadingCustomer || isLoadingOwner ? (
        <LoadingView />
      ) : (
        <> */}
      {_.size(_.get(transactionListData, "items", null)) > 0 ? (
        <>
          <View style={styles.cardView}>
            <View style={styles.txtView}>
              <Text style={[FontStyle.urbanistBold, styles.earnedTxt]}>
                {_.get(earningListData, "currentYearTotal", null) == 0
                  ? "00.00 earned in " + new Date().getFullYear()
                  : _.get(earningListData, "currentYearTotal", null) +
                    " " +
                    "earned in " +
                    new Date().getFullYear()}
              </Text>
              <Text style={[FontStyle.urbanistMedium, styles.includeTxt]}>
                All earnings adjusted included
              </Text>
            </View>
          </View>
          <FlatList
            data={_.get(transactionListData, "items", null).slice(0, 3) || []}
            renderItem={({ item }) => renderWalletData1(item)}
            style={styles.flatListView}
          />
          <TouchableOpacity style={styles.allBtn} onPress={() => onClick(3)}>
            <Text style={[FontStyle.urbanistBold, styles.reviewsTxt]}>
              SEE ALL TRANSACTIONS
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.noTrans}>
          <Text style={[FontStyle.urbanistSemiBold, styles.tripsTxt]}>
            No Transactions Found
          </Text>
        </View>
      )}
      {/* </>
      )} */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  txtView: {
    width: "91%",
    alignSelf: "center",
    paddingVertical: Variables.Measures.width / 8,
  },
  cardView: {
    width: "100%",
    backgroundColor: Variables.Colors.greyBg,
    marginTop: Variables.Measures.fontSize,
  },
  allBtn: {
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 50,
    marginTop: 20,
  },
  noTrans: {
    width: "100%",
    height: Variables.Measures.height / 1.5,
    justifyContent: "center",
    alignItems: "center",
  },
  tripsTxt: {
    color: Variables.Colors.white,
    fontSize: 22,
  },
  flatListView: {
    width: "93%",
    alignSelf: "center",
  },
  leftUserImg: {
    width: "20%",
    justifyContent: "center",
    height: "100%",
  },

  // centerUserName: {
  //   width: "55%",
  //   justifyContent: "center",
  //   marginLeft: Variables.FontSize.small,
  // },
  centerUserName: {
    width: "65%",
    justifyContent: "center",
    paddingLeft: Variables.FontSize.regular,
  },
  // rightAmountView: {
  //   width: "20%",
  //   justifyContent: "center",
  //   alignItems: "flex-end",
  // },
  rightAmountView: {
    width: "35%",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  userNameTxt: {
    color: Variables.Colors.white,
    fontSize: Variables.Measures.fontSize / 1.2,
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
  // outerView: {
  //   flexDirection: "row",
  //   width: "100%",
  //   marginTop: Variables.Measures.fontSize,
  //   justifyContent: "space-between",
  //   height: Variables.MetricsSizes.large * 2 + Variables.MetricsSizes.tiny,
  // },

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
  earnedTxt: {
    fontSize: 24,
    color: Variables.Colors.white,
  },
  setUpTxt: {
    fontSize: 16,
    color: Variables.Colors.white,
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
    fontSize: 12,
  },
  reviewsTxt: {
    color: Variables.Colors.darkYellow,
    fontSize: 14,
    marginRight: 15,
    fontWeight: "bold",
    letterSpacing: 0.15,
  },
  includeTxt: {
    color: Variables.Colors.inputTxtColor,
    fontSize: 16,
    lineHeight: 22,
    letterSpacing: 0.15,
  },
});

export default TransactionHistory;

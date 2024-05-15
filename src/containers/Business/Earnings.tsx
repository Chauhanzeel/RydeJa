import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  processColor,
} from "react-native";
import { useTranslation } from "react-i18next";
import { CommonStyles, FontStyle, Variables } from "../../Theme";
// import { LineChart } from "react-native-chart-kit";
import ContentLoader, { Rect } from "react-content-loader/native";

import RightArrowSvg from "../../assets/Images/Right.svg";
import TransactionSvg from "../../assets/Images/Transaction.svg";
import { useDispatch, useSelector } from "react-redux";
import { earningListStart } from "../../actions/carOwnerActions";
import { ReducerStateProps } from "../Inbox/InterfaceProps";
import _ from "lodash";
import { Colors, Measures } from "../../Theme/variables";
import { getOr } from "../../constants/constants";
import { LineChart } from "react-native-charts-wrapper";

interface FavoritesProps {
  onClick: (val: number) => void;
}

const Earnings: React.FC<FavoritesProps> = ({ onClick }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [label, setLabel] = useState([]);
  const [money, setMoney] = useState([0]);
  const [refreshing, setRefreshing] = useState(false);

  const [isLoading, earningListData] = useSelector(
    (state: ReducerStateProps) => [
      state.carOwner.isLoading,
      state.carOwner.earningListData,
    ]
  );

  useEffect(() => {
    dispatch(earningListStart());
  }, []);

  useEffect(() => {
    if (earningListData && _.size(label) == 0) {
      const month = _.get(earningListData, "lastOneYearEarning", null)?.map(
        (item: any) => item?.month
      );
      const convertedMonths = month?.map((num: any) => monthNames[num - 1]);
      // ?.reverse();
      setLabel(convertedMonths);

      const money = _.get(earningListData, "lastOneYearEarning", null)?.map(
        (item: any) => parseInt(item?.total)
      );
      // ?.reverse();

      setMoney(money);
    }
  }, [earningListData, money, label]);

  // Helper function to get the next month
  const getNextMonth = (currentMonth: any) => {
    if (currentMonth === "12") {
      return "1";
    } else {
      return (parseInt(currentMonth) + 1).toString();
    }
  };

  useEffect(() => {
    if (!isLoading) {
      setRefreshing(false);
    }
  }, [isLoading]);

  const onRefresh = () => {
    dispatch(earningListStart());
    setRefreshing(true);
  };

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

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
        <View style={styles.loadView}>
          <View
            style={{
              width: "100%",
              height: 60,
            }}
          >
            <ContentLoader
              backgroundColor={Variables.Colors.absoluteBgGrey}
              foregroundColor={Variables.Colors.grey}
            >
              <Rect
                x="0"
                y="0"
                rx="4"
                ry="4"
                width={Variables.Measures.width / 1.5}
                height="30"
              />
              <Rect
                x="0"
                y={Variables.MetricsSizes.tiny * 7}
                rx="4"
                ry="4"
                width={Variables.Measures.width / 2}
                height={Variables.FontSize.regular}
              />
            </ContentLoader>
          </View>
          <ContentLoader
            backgroundColor={Variables.Colors.absoluteBgGrey}
            foregroundColor={Variables.Colors.grey}
            height={Variables.Measures.width / 1.8}
            width="100%"
          >
            <Rect
              x="0"
              y={Variables.MetricsSizes.tiny}
              rx="4"
              ry="4"
              width="100%"
              height="95%"
            />
          </ContentLoader>

          <ContentLoader
            backgroundColor={Variables.Colors.absoluteBgGrey}
            foregroundColor={Variables.Colors.grey}
            height={Variables.FontSize.regular * 2}
            width="100%"
            style={{ marginTop: Variables.MetricsSizes.small }}
          >
            <Rect
              x="0"
              y="0"
              rx="4"
              ry="4"
              width={Variables.MetricsSizes.large}
              height={Variables.MetricsSizes.large}
            />
            <Rect
              x={Variables.MetricsSizes.small * 5}
              y="0"
              rx="4"
              ry="4"
              width={Variables.Measures.width / 2}
              height={Variables.MetricsSizes.large}
            />
          </ContentLoader>

          <ContentLoader
            backgroundColor={Variables.Colors.absoluteBgGrey}
            foregroundColor={Variables.Colors.grey}
            height={Variables.FontSize.regular * 2}
            width="100%"
            style={{ marginTop: Variables.MetricsSizes.small }}
          >
            <Rect
              x="0"
              y="0"
              rx="4"
              ry="4"
              width={Variables.MetricsSizes.large}
              height={Variables.MetricsSizes.large}
            />
            <Rect
              x={Variables.MetricsSizes.small * 5}
              y="0"
              rx="4"
              ry="4"
              width={Variables.Measures.width / 2}
              height={Variables.MetricsSizes.large}
            />
          </ContentLoader>

          <ContentLoader
            backgroundColor={Variables.Colors.absoluteBgGrey}
            foregroundColor={Variables.Colors.grey}
            height={Variables.FontSize.regular * 2}
            width="100%"
            style={{ marginTop: Variables.MetricsSizes.small }}
          >
            <Rect
              x="0"
              y="0"
              rx="4"
              ry="4"
              width={Variables.MetricsSizes.large}
              height={Variables.MetricsSizes.large}
            />
            <Rect
              x={Variables.MetricsSizes.small * 5}
              y="0"
              rx="4"
              ry="4"
              width={Variables.Measures.width / 2}
              height={Variables.MetricsSizes.large}
            />
          </ContentLoader>

          <ContentLoader
            backgroundColor={Variables.Colors.absoluteBgGrey}
            foregroundColor={Variables.Colors.grey}
            height={Variables.FontSize.regular * 2}
            width="100%"
            style={{ marginTop: Variables.MetricsSizes.small }}
          >
            <Rect
              x="0"
              y="0"
              rx="4"
              ry="4"
              width={Variables.MetricsSizes.large}
              height={Variables.MetricsSizes.large}
            />
            <Rect
              x={Variables.MetricsSizes.small * 5}
              y="0"
              rx="4"
              ry="4"
              width={Variables.Measures.width / 2}
              height={Variables.MetricsSizes.large}
            />
          </ContentLoader>

          <ContentLoader
            backgroundColor={Variables.Colors.absoluteBgGrey}
            foregroundColor={Variables.Colors.grey}
            height={Variables.MetricsSizes.tiny / 5}
            width="100%"
            style={{ marginTop: Variables.MetricsSizes.small }}
          >
            <Rect
              x="0"
              y="0"
              rx="4"
              ry="4"
              width="100%"
              height={Variables.MetricsSizes.tiny / 5}
            />
          </ContentLoader>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",

              height: Variables.FontSize.regular * 2,
              width: "100%",
            }}
          >
            <ContentLoader
              backgroundColor={Variables.Colors.absoluteBgGrey}
              foregroundColor={Variables.Colors.grey}
              height={Variables.FontSize.regular * 2}
              width="90%"
              style={{
                marginTop: Variables.MetricsSizes.small,
              }}
            >
              <Rect
                x="0"
                y="0"
                rx="4"
                ry="4"
                width={Variables.MetricsSizes.large}
                height={Variables.MetricsSizes.large}
              />
              <Rect
                x={Variables.MetricsSizes.small * 5}
                y="0"
                rx="4"
                ry="4"
                width={Variables.Measures.width / 2}
                height={Variables.MetricsSizes.large}
              />
            </ContentLoader>

            <ContentLoader
              backgroundColor={Variables.Colors.absoluteBgGrey}
              foregroundColor={Variables.Colors.grey}
              height={Variables.FontSize.regular * 2}
              width="10%"
              style={{
                marginTop: Variables.MetricsSizes.small,
              }}
            >
              <Rect
                x="0"
                y="0"
                rx="4"
                ry="4"
                width={Variables.MetricsSizes.large}
                height={Variables.MetricsSizes.large}
              />
            </ContentLoader>
          </View>

          <ContentLoader
            backgroundColor={Variables.Colors.absoluteBgGrey}
            foregroundColor={Variables.Colors.grey}
            height={Variables.MetricsSizes.tiny / 5}
            width="100%"
            style={{ marginTop: Variables.MetricsSizes.small }}
          >
            <Rect
              x="0"
              y="0"
              rx="4"
              ry="4"
              width="100%"
              height={Variables.MetricsSizes.tiny / 5}
            />
          </ContentLoader>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",

              height: Variables.FontSize.regular * 2,
              width: "100%",
              paddingBottom: Variables.FontSize.regular,
            }}
          >
            <ContentLoader
              backgroundColor={Variables.Colors.absoluteBgGrey}
              foregroundColor={Variables.Colors.grey}
              height={Variables.FontSize.regular * 2}
              width="90%"
              style={{
                marginTop: Variables.MetricsSizes.small,
              }}
            >
              <Rect
                x="0"
                y="0"
                rx="4"
                ry="4"
                width={Variables.MetricsSizes.large}
                height={Variables.MetricsSizes.large}
              />
              <Rect
                x={Variables.MetricsSizes.small * 5}
                y="0"
                rx="4"
                ry="4"
                width={Variables.Measures.width / 2}
                height={Variables.MetricsSizes.large}
              />
            </ContentLoader>

            <ContentLoader
              backgroundColor={Variables.Colors.absoluteBgGrey}
              foregroundColor={Variables.Colors.grey}
              height={Variables.FontSize.regular * 2}
              width="10%"
              style={{
                marginTop: Variables.MetricsSizes.small,
              }}
            >
              <Rect
                x="0"
                y="0"
                rx="4"
                ry="4"
                width={Variables.MetricsSizes.large}
                height={Variables.MetricsSizes.large}
              />
            </ContentLoader>
          </View>
        </View>
      </ScrollView>
    );
  };

  return !earningListData ? (
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
      <View style={styles.main}>
        <Text style={[FontStyle.urbanistBold, CommonStyles.titleCommonTxt]}>
          {_.get(earningListData, "currentYearTotal", null) == 0
            ? "00.00 earned in " + new Date().getFullYear()
            : parseFloat(
                getOr(earningListData, "currentYearTotal", "0")
              ).toFixed(2) +
              " " +
              "earned in " +
              new Date().getFullYear()}
        </Text>
        <Text
          style={[
            FontStyle.urbanistMedium,
            CommonStyles.descCommonTxt,
            styles.adjustedTxt,
          ]}
        >
          All earnings adjusted included
        </Text>
        {_.get(earningListData, "currentYearTotal", null) !== 0 ||
        _.get(earningListData, "currentYearTotal", null)! < 0 ? (
          <LineChart
            style={{
              width: Measures.width - 10,
              height: Measures.width / 1.12,
              alignSelf: "center",
            }}
            doubleTapToZoomEnabled={false}
            legend={{
              enabled: false,
            }}
            chartDescription={{
              text: "",
            }}
            xAxis={{
              position: "BOTTOM",
              valueFormatter: label,
              textColor: processColor(Colors.white),
              axisLineWidth: 3,
              gridColor: processColor(Colors.blackBg),
              axisLineColor: processColor("#616161"),
              textSize: Measures.fontSize - 7,
              granularityEnabled: true,
              granularity: 1,
              avoidFirstLastClipping: true,
            }}
            data={{
              dataSets: [
                {
                  values: money,
                  config: {
                    lineWidth: 3,
                    drawValues: false,
                    fillColor: processColor(Colors.white),
                    color: processColor(Colors.white),
                    circleColor: processColor(Colors.white),
                    drawVerticalHighlightIndicator: false,
                    drawHorizontalHighlightIndicator: false,
                    mode: "HORIZONTAL_BEZIER",
                    drawFilled: true,
                  },
                },
              ],
            }}
            yAxis={{
              right: {
                textColor: processColor(Colors.white),
                axisLineColor: processColor(Colors.blackBg),
                axisMinimum: 0,
                valueFormatter: "$",
                textSize: Measures.fontSize - 7,
              },
              left: {
                enabled: false,
                axisMinimum: 0,
              },
            }}
          />
        ) : // <LineChart
        //   data={{
        //     labels: label,
        //     datasets: [
        //       {
        //         data: money,
        //       },
        //     ],
        //   }}
        //   withHorizontalLabels={true}
        //   withVerticalLines={false}
        //   width={Measures.width - 10}
        //   height={Measures.width / 1.4}
        //   horizontalLabelRotation={0}
        //   verticalLabelRotation={-40}
        //   yAxisLabel="$"
        //   chartConfig={{
        //     decimalPlaces: 0,
        //     backgroundColor: "#000",
        //     color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        //     labelColor: (opacity = 1) => `rgba(255, 255, 255, 1)`,

        //     style: {
        //       borderRadius: 16,
        //       paddingLeft: 0,
        //     },
        //     propsForDots: {
        //       r: "4",
        //       strokeWidth: "2",
        //       stroke: "#000",
        //     },
        //     propsForHorizontalLabels: {
        //       fontSize: Measures.fontSize - 7,
        //       fontFamily: "Urbanist-Medium.ttf",
        //       fontStyle: "italic",
        //     },
        //     propsForVerticalLabels: {
        //       fontSize: Measures.fontSize - 7,
        //       fontFamily: "Urbanist-Medium.ttf",
        //       fontStyle: "italic",
        //     },
        //   }}
        //   bezier
        //   style={{
        //     marginVertical: 8,
        //     borderRadius: 16,
        //     alignSelf: "center",
        //   }}
        // />
        null}

        <View
          style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}
        >
          <View style={styles.leftView}>
            <View
              style={[
                styles.colorView,
                { backgroundColor: Variables.Colors.darkYellow },
              ]}
            />
          </View>
          <Text style={[FontStyle.urbanistMedium, CommonStyles.descCommonTxt]}>
            $
            {parseFloat(getOr(earningListData, "tripsEarning", "0")).toFixed(2)}{" "}
            Trips earnings
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: Variables.Measures.fontSize,
          }}
        >
          <View style={styles.leftView}>
            <View
              style={[
                styles.colorView,
                { backgroundColor: Variables.Colors.brown },
              ]}
            />
          </View>
          <Text style={[FontStyle.urbanistMedium, CommonStyles.descCommonTxt]}>
            $
            {parseFloat(getOr(earningListData, "upcomingEarning", "0")).toFixed(
              2
            )}{" "}
            Upcoming earnings
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: Variables.Measures.fontSize,
          }}
        >
          <View style={styles.leftView}>
            <View
              style={[
                styles.colorView,
                { backgroundColor: Variables.Colors.darkGreen },
              ]}
            />
          </View>
          <Text style={[FontStyle.urbanistMedium, CommonStyles.descCommonTxt]}>
            $
            {parseFloat(getOr(earningListData, "reimbursement", "0")).toFixed(
              2
            )}{" "}
            Reimbursements
          </Text>
        </View>
        <View style={styles.firstRowView}>
          <View style={styles.leftView}>
            <View
              style={[
                styles.colorView,
                { backgroundColor: Variables.Colors.darkRed },
              ]}
            />
          </View>
          <Text style={[FontStyle.urbanistMedium, CommonStyles.descCommonTxt]}>
            $
            {parseFloat(getOr(earningListData, "missedEarning", "0")).toFixed(
              2
            )}{" "}
            Missed earnings
          </Text>
        </View>
        <View style={[styles.lineView, { marginTop: 20 }]} />
        <View style={styles.rowView}>
          <View style={styles.leftTransactionView}>
            <TransactionSvg />
          </View>
          <View style={{ width: "80%" }}>
            <Text
              style={[
                FontStyle.urbanistMedium,
                CommonStyles.descCommonTxt,
                styles.historyTxt,
              ]}
            >
              Transaction history
            </Text>
          </View>
          <TouchableOpacity
            style={{ justifyContent: "flex-end", width: "7%" }}
            onPress={() => onClick(2)}
          >
            <RightArrowSvg />
          </TouchableOpacity>
        </View>
        <View style={styles.lineView} />
        {/* <View style={styles.rowView}>
          <View style={styles.leftTransactionView}>
            <TaxSvg />
          </View>
          <View style={{ width: "80%" }}>
            <Text style={[FontStyle.urbanistMedium, styles.historyTxt]}>
              Tax information
            </Text>
          </View>
          <TouchableOpacity style={{ justifyContent: "flex-end", width: "7%" }}>
            <RightArrowSvg />
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: 1,
            backgroundColor: Variables.Colors.borderGrey,
            width: "100%",
          }}
        /> */}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  loadView: {
    height: Variables.Measures.height - 50,
    marginTop: Variables.MetricsSizes.large,
    width: "95%",
    alignSelf: "center",
  },
  main: {
    marginBottom: 25,
    marginTop: Variables.Measures.fontSize,
    width: "95%",
    alignSelf: "center",
    flex: 1,
  },
  leftTransactionView: {
    justifyContent: "flex-end",
    width: "5%",
  },
  firstRowView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: Variables.Measures.fontSize,
  },
  rowView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  lineView: {
    height: 1,
    backgroundColor: Variables.Colors.borderGrey,
    width: "100%",
  },
  colorView: {
    height: 15,
    width: 15,
    borderRadius: 2,
  },
  earnedTxt: {
    color: Variables.Colors.white,
    fontSize: 24,
  },
  adjustedTxt: {
    color: Variables.Colors.inputTxtColor,
    marginBottom: 20,
  },
  leftView: {
    width: "8%",
  },
  earningsTxt: {
    fontSize: 14,
    color: Variables.Colors.white,
  },
  historyTxt: {
    color: Variables.Colors.white,
    paddingVertical: 20,
  },
});

export default Earnings;

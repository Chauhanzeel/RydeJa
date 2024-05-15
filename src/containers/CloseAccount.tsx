import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  StatusBar,
  ScrollView,
  View,
  Text,
  RefreshControl,
} from "react-native";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import { Variables, FontStyle, Layout } from "../Theme";
import { navigate, goBack } from "../navigators/RootNavigation";
import ContentLoader, { Rect, Circle } from "react-content-loader/native";
import Header from "../components/Header";
import CloseSvg from "../assets/Images/Close.svg";
import ButtonView from "../components/ButtonView";
import { useDispatch, useSelector } from "react-redux";
import { ReducerStateProps } from "./Inbox/InterfaceProps";
import _ from "lodash";
import { bookedTripListStart } from "../actions/customerActions";
import { useIsFocused } from "@react-navigation/native";

interface CancelProps {
  // onClick: (val: number) => void;
}

const CloseAccount: React.FC<CancelProps> = () =>
  // { onClick }
  {
    const { t } = useTranslation();
    const [refreshing, setRefreshing] = useState(false);

    const isFocused = useIsFocused();

    const dispatch = useDispatch();
    useEffect(() => {
      if (isFocused) {
        let params = {
          type: "booked",
        };
        dispatch(bookedTripListStart(params));
      }
    }, [isFocused]);

    const [isLoading, bookedTripListData] = useSelector(
      (state: ReducerStateProps) => [
        state.customer.isLoading,

        state.customer.bookedTripListData,
      ]
    );
    const LoadingView = () => {
      return (
        <SafeAreaView style={[styles.safeAreaStyle, { paddingTop: 20 }]}>
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
              height={Variables.Measures.width / 1.9}
            >
              <Rect
                x={Variables.MetricsSizes.small}
                y={Variables.FontSize.large}
                rx="4"
                ry="4"
                width={Variables.Measures.width / 1.5}
                height={Variables.MetricsSizes.large}
              />
              <Rect
                x={Variables.MetricsSizes.small}
                y={Variables.FontSize.large * 2}
                rx="4"
                ry="4"
                width={Variables.Measures.width / 1.2}
                height={Variables.MetricsSizes.large}
              />
              <Rect
                x={Variables.MetricsSizes.small}
                y={Variables.FontSize.large * 3.5}
                rx="4"
                ry="4"
                width={Variables.Measures.width / 1.05}
                height={8}
              />
              <Rect
                x={Variables.MetricsSizes.small}
                y={Variables.FontSize.large * 4}
                rx="4"
                ry="4"
                width={Variables.Measures.width / 1.05}
                height={8}
              />
              <Rect
                x={Variables.MetricsSizes.small}
                y={Variables.FontSize.large * 4.5}
                rx="4"
                ry="4"
                width={Variables.Measures.width / 1.05}
                height={8}
              />
            </ContentLoader>

            <ContentLoader
              backgroundColor={Variables.Colors.absoluteBgGrey}
              foregroundColor={Variables.Colors.grey}
              width={Variables.Measures.width}
              height={Variables.FontSize.large * 3}
            >
              <Circle
                cx={Variables.FontSize.regular}
                cy={Variables.FontSize.regular}
                r="6"
              />

              <Rect
                x={Variables.FontSize.regular * 2}
                y={Variables.FontSize.regular}
                rx="4"
                ry="4"
                width={Variables.Measures.width / 1.2}
                height={8}
              />
              <Rect
                x={Variables.FontSize.regular * 2}
                y={Variables.FontSize.regular * 2}
                rx="4"
                ry="4"
                width={Variables.Measures.width / 2.5}
                height={8}
              />

              <Circle
                cx={Variables.FontSize.regular}
                cy={Variables.Measures.width / 5}
                r="6"
              />

              <Rect
                x={Variables.FontSize.regular * 2}
                y={Variables.Measures.width / 5}
                rx="4"
                ry="4"
                width={Variables.Measures.width / 1.2}
                height={8}
              />
              <Rect
                x={Variables.FontSize.regular * 2}
                y={Variables.Measures.width / 4}
                rx="4"
                ry="4"
                width={Variables.Measures.width / 2.5}
                height={8}
              />
            </ContentLoader>

            <ContentLoader
              backgroundColor={Variables.Colors.absoluteBgGrey}
              foregroundColor={Variables.Colors.grey}
              width={Variables.Measures.width}
              height={Variables.FontSize.large * 4}
            >
              <Circle
                cx={Variables.FontSize.regular}
                cy={Variables.FontSize.regular}
                r="6"
              />

              <Rect
                x={Variables.FontSize.regular * 2}
                y={Variables.FontSize.regular}
                rx="4"
                ry="4"
                width={Variables.Measures.width / 1.2}
                height={8}
              />
              <Rect
                x={Variables.FontSize.regular * 2}
                y={Variables.FontSize.regular * 2}
                rx="4"
                ry="4"
                width={Variables.Measures.width / 2.5}
                height={8}
              />

              <Circle
                cx={Variables.FontSize.regular}
                cy={Variables.Measures.width / 5}
                r="6"
              />

              <Rect
                x={Variables.FontSize.regular * 2}
                y={Variables.Measures.width / 5}
                rx="4"
                ry="4"
                width={Variables.Measures.width / 1.2}
                height={8}
              />
              <Rect
                x={Variables.FontSize.regular * 2}
                y={Variables.Measures.width / 4}
                rx="4"
                ry="4"
                width={Variables.Measures.width / 2.5}
                height={8}
              />

              <Rect
                x={Variables.FontSize.regular}
                y={Variables.Measures.width / 3}
                rx="4"
                ry="4"
                width={Variables.Measures.width / 2}
                height={8}
              />
            </ContentLoader>
          </ScrollView>
          <View style={styles.btnView}>
            <ContentLoader
              backgroundColor={Variables.Colors.absoluteBgGrey}
              foregroundColor={Variables.Colors.grey}
              width={Variables.Measures.width}
              height={Variables.MetricsSizes.small * 5}
            >
              <Rect
                x={Variables.FontSize.regular}
                y="0"
                rx="4"
                ry="4"
                width={Variables.Measures.width / 1.12}
                height={Variables.MetricsSizes.small * 5}
              />
            </ContentLoader>
          </View>
        </SafeAreaView>
      );
    };
    useEffect(() => {
      if (!isLoading) {
        setRefreshing(false);
      }
    }, [isLoading]);

    const onRefresh = () => {
      let params = {
        type: "booked",
      };
      dispatch(bookedTripListStart(params));
      setRefreshing(true);
    };

    return !bookedTripListData || isLoading ? (
      <LoadingView />
    ) : (
      <SafeAreaView style={styles.safeAreaStyle}>
        <StatusBar translucent backgroundColor="transparent" />
        <Header
          centerText="Close Account"
          leftSvg={<CloseSvg />}
          onLeftPress={
            goBack
            // () => onClick(8)
          }
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
          <View
            style={{
              width: "92%",
              alignSelf: "center",
              marginTop: Variables.Measures.fontSize,
              marginBottom: Variables.FontSize.large,
            }}
          >
            <Text style={[FontStyle.urbanistBold, styles.headingTxt]}>
              What does closing your account means?
            </Text>
            <Text style={[FontStyle.urbanistMedium, styles.descTxt]}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </Text>
            <View style={Layout.row}>
              <View style={styles.pointView}>
                <View style={styles.leftPointView} />
              </View>
              <View style={styles.rightDescView}>
                <Text style={[FontStyle.urbanistMedium, styles.pointsDescTxt]}>
                  You will no longer be able to book trips or list your car on
                  Ryde.
                </Text>
              </View>
            </View>
            <View style={Layout.row}>
              <View style={styles.pointView}>
                <View style={styles.leftPointView} />
              </View>
              <View style={styles.rightDescView}>
                <Text style={[FontStyle.urbanistMedium, styles.pointsDescTxt]}>
                  Your vehicle listing(s) will be deleted.
                </Text>
              </View>
            </View>
            <View style={Layout.row}>
              <View style={styles.pointView}>
                <View style={styles.leftPointView} />
              </View>
              <View style={styles.rightDescView}>
                <Text style={[FontStyle.urbanistMedium, styles.pointsDescTxt]}>
                  Any information associated with your account will no longer be
                  publicly viewable on our app.
                </Text>
              </View>
            </View>
            <View style={Layout.row}>
              <View style={styles.pointView}>
                <View style={styles.leftPointView} />
              </View>
              <View style={styles.rightDescView}>
                <Text style={[FontStyle.urbanistMedium, styles.pointsDescTxt]}>
                  You will now longer be able to book trips or list your car on
                  Ryde.
                </Text>
              </View>
            </View>
            <View style={Layout.row}>
              <View style={styles.pointView}>
                <View style={styles.leftPointView} />
              </View>
              <View style={styles.rightDescView}>
                <Text style={[FontStyle.urbanistMedium, styles.pointsDescTxt]}>
                  Any booked or pending trips will be cancelled.
                </Text>
              </View>
            </View>
            <View style={Layout.row}>
              <View style={styles.pointView}>
                <View style={styles.leftPointView} />
              </View>
              <View style={styles.rightDescView}>
                <Text style={[FontStyle.urbanistMedium, styles.pointsDescTxt]}>
                  Currently you have{" "}
                  {_.get(bookedTripListData, "totalCount", null)} booked and/or
                  pending trips.
                </Text>
              </View>
            </View>
            <Text style={[FontStyle.urbanistRegular, styles.continueTxt]}>
              Do you want to continue?
            </Text>
          </View>
        </ScrollView>
        <View
          style={{
            marginVertical: Variables.FontSize.regular,
          }}
        >
          <ButtonView
            width={Variables.Measures.width / 1.12}
            btnTxt={t("labelConst.continueTxt")}
            backgroundColor={Variables.Colors.btnRed}
            onBtnPress={() => {
              // onClick(14);
              navigate("CloseAccountReason");
            }}
            fontColor={Variables.Colors.white}
          />
        </View>
      </SafeAreaView>
    );
  };

const styles = StyleSheet.create({
  btnView: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    width: Variables.Measures.width,
    height: 60,
    justifyContent: "flex-end",
  },
  safeAreaStyle: {
    flex: 1,
    backgroundColor: Variables.Colors.darkBlack,
  },
  ratingsTxt: {
    fontSize: 15,
    color: Variables.Colors.chatWhite,
  },
  headingTxt: {
    fontSize: Variables.Measures.fontSize * 1.5,
    color: Variables.Colors.white,
  },
  descTxt: {
    fontSize: Variables.Measures.fontSize / 1.6,
    color: Variables.Colors.white,
    marginVertical: Variables.Measures.fontSize,
    lineHeight: 22,
  },
  pointView: {
    width: "5%",
    marginLeft: 2,
    marginTop: 5,
  },
  leftPointView: {
    height: 8,
    width: 8,
    borderRadius: 8,
    backgroundColor: Variables.Colors.white,
  },
  rightDescView: {
    width: "90%",
  },
  pointsDescTxt: {
    fontSize: Variables.Measures.fontSize / 1.6,
    color: Variables.Colors.white,
    marginBottom: 15,
    lineHeight: 20,
  },
  continueTxt: {
    fontSize: 12,
    color: Variables.Colors.inputTxtColor,
  },
});

export default CloseAccount;

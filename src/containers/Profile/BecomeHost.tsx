import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { FontStyle, Variables, Images, CommonStyles } from "../../Theme";
import { useTranslation } from "react-i18next";
import DashedLine from "react-native-dashed-line";

import ButtonView from "../../components/ButtonView";
import { goBack, navigate, replace } from "../../navigators/RootNavigation";

import CloseSvg from "../../assets/Images/Close.svg";
import ShieldSvg from "../../assets/Images/Shield.svg";
import CallIcon from "../../assets/Images/CalliconYellow.svg";
import HowWorks from "../../assets/Images/Gear.svg";
import { ReducerStateProps } from "../Inbox/InterfaceProps";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
import { switchToOwnerStart } from "../../actions/customerActions";
import {
  logOutResetAll,
  loginUserSuccess,
  mapDataSuccess,
  refreshTokenStart,
} from "../../actions/authActions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { switchToOwner } from "../../saga/customerSaga";
import { LoginManager } from "react-native-fbsdk-next";
import { GOOGLE_CLIENT_ID } from "../../constants/constants";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

interface HostProps {
  // onClick: (val: number) => void;
}

const BecomeHost: React.FC<HostProps> = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [update, setUpdate] = useState(false);
  const [
    profileDetailsData,
    switchToOwnerData,
    isLoading,
    isLoadingOwn,
    isLoadingCust,
    loginData,
    refreshData,
  ] = useSelector((state: ReducerStateProps) => [
    state.user.profileDetailsData,
    state.customer.switchToOwnerData,
    state.auth.isLoading,
    state.carOwner.isLoading,
    state.customer.isLoading,
    state.auth.loginData,
    state.auth.refreshData,
  ]);

  const clearAsyncStorage = async () => {
    dispatch(logOutResetAll());
    AsyncStorage.clear();
    replace("LoginSplash");
  };

  const switchtoOwner = () => {
    dispatch(switchToOwnerStart());
    setUpdate(true);
  };

  useEffect(() => {
    if (_.get(switchToOwnerData, "success", null) === true && update) {
      setUpdate(false);
      if (loginData) {
        dispatch(
          refreshTokenStart({ email: _.get(loginData, "user.email", null) })
        );
        clearAsyncStorage1();
      }
    }
  }, [switchToOwnerData]);

  useEffect(() => {
    if (refreshData !== null) {
      dispatch(loginUserSuccess(refreshData));
      storeData(refreshData);
    }
  }, [refreshData]);

  const storeData = async (data: any) => {
    try {
      const loginUserDetails = JSON.stringify(data);
      await AsyncStorage.setItem("loginUserData", loginUserDetails);
      replace("TabNavigations");
    } catch (e) {
      console.log("error", e);
    }
    return;
  };

  const clearAsyncStorage1 = async () => {
    try {
      LoginManager.logOut();
    } catch (error) {
      console.error(error);
    }
    try {
      GoogleSignin.configure({
        webClientId: GOOGLE_CLIENT_ID,
      });
      await GoogleSignin.signOut();
      await GoogleSignin.revokeAccess();
    } catch (error) {
      console.error(error);
    }
    dispatch(logOutResetAll());
    AsyncStorage.clear();
  };

  const startedNext = () => {
    navigate("AboutCar1");
    dispatch(mapDataSuccess(null));
  };

  const HostCardView = () => {
    return (
      <View style={styles.cardView}>
        <View style={styles.cardOuterView}>
          <TouchableOpacity
            style={styles.cardRowView}
            onPress={() =>
              // onClick(4)
              goBack()
            }
          >
            <CloseSvg />
          </TouchableOpacity>
          <Image
            source={Images.userImg9}
            style={{ width: "100%", height: Variables.Measures.width / 2 }}
          />
          <View
            style={{
              // position: "absolute",
              width: "100%",
            }}
          >
            <View
              style={{
                alignSelf: "center",
                width: "96%",
              }}
            >
              <Text
                style={[
                  FontStyle.urbanistBold,
                  styles.hostTxt,
                  { paddingTop: 5 },
                  CommonStyles.titleCommonTxt,
                ]}
              >
                Become a Host
              </Text>
              <DashedLine
                dashLength={3}
                dashColor={Variables.Colors.borderGrey}
              />
              <Text
                style={[
                  FontStyle.urbanistRegular,
                  styles.descTxt,
                  { marginVertical: 7 },
                  CommonStyles.descCommonTxtOnly,
                  CommonStyles.justifyText,
                ]}
              >
                {t("labelConst.hostDesc")}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: Variables.Colors.blackBg }}
    >
      <StatusBar
        backgroundColor={Variables.Colors.darkBlack}
        barStyle="light-content"
      />
      <ScrollView
        style={{
          flex: 1,
          marginTop: 10,
        }}
      >
        <View style={styles.marginView}>
          <HostCardView />
          <View style={styles.greyBgView}>
            <View style={{ flexDirection: "row" }}>
              <View style={styles.leftView}></View>
              <View style={styles.rightView}>
                <Text
                  style={[
                    FontStyle.urbanistBold,
                    styles.subHeadingTxt,
                    { marginBottom: 7 },
                    CommonStyles.smallCommonTxt,
                  ]}
                >
                  How it works
                </Text>
                <DashedLine
                  dashLength={3}
                  dashColor={Variables.Colors.borderGrey}
                />
              </View>
            </View>
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <View style={styles.leftView}>
                <HowWorks />
              </View>
              <View style={styles.rightView}>
                <Text
                  style={[
                    FontStyle.urbanistRegular,
                    CommonStyles.descCommonTxtOnly,
                    CommonStyles.justifyText,
                  ]}
                >
                  Earn profits from your vehicles by making them accessible to a
                  large group of customers looking for convenient and enjoyable
                  Rydes.
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.learnView}
              onPress={() =>
                // onClick(10)
                navigate("HowWorks")
              }
            >
              <Text
                style={[
                  FontStyle.urbanistBold,
                  CommonStyles.extraSmallCommonTxt,
                  styles.learnTxt,
                ]}
              >
                Learn more
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={[
              styles.greyBgView,
              { marginTop: Variables.Measures.unit * 1.5 },
            ]}
          >
            <View style={{ flexDirection: "row" }}>
              <View style={styles.leftView}></View>
              <View style={styles.rightView}>
                <Text
                  style={[
                    FontStyle.urbanistBold,
                    styles.subHeadingTxt,
                    { marginBottom: 7 },
                  ]}
                >
                  You are covered
                </Text>
                <DashedLine
                  dashLength={3}
                  dashColor={Variables.Colors.borderGrey}
                />
              </View>
            </View>
            <View style={{ flexDirection: "row", marginVertical: 10 }}>
              <View style={styles.leftView}>
                <ShieldSvg />
              </View>
              <View style={styles.rightView}>
                <Text
                  style={[
                    FontStyle.urbanistRegular,
                    CommonStyles.descCommonTxtOnly,
                    CommonStyles.justifyText,
                  ]}
                >
                  Ensure the quality of your customer and maintenance of your
                  vehicles by the track record of a Guest prior transactions on
                  the Ryde platform.
                </Text>
              </View>
            </View>
            {/* <TouchableOpacity
              style={styles.learnView}
              onPress={() =>
                // onClick(11)
                navigate("Covered")
              }
            >
              <Text
                style={[
                  FontStyle.urbanistBold,
                  CommonStyles.extraSmallCommonTxt,
                  styles.learnTxt,
                ]}
              >
                Learn more
              </Text>
            </TouchableOpacity> */}
          </View>
          <View
            style={[
              styles.greyBgView,
              { marginTop: Variables.Measures.unit * 1.5 },
            ]}
          >
            <View style={{ flexDirection: "row" }}>
              <View style={styles.leftView}></View>
              <View style={styles.rightView}>
                <Text
                  style={[
                    FontStyle.urbanistBold,
                    styles.subHeadingTxt,
                    { marginBottom: 7 },
                  ]}
                >
                  We've get your back
                </Text>
                <DashedLine
                  dashLength={3}
                  dashColor={Variables.Colors.borderGrey}
                />
              </View>
            </View>
            <View style={{ flexDirection: "row", marginVertical: 10 }}>
              <View style={styles.leftView}>
                <CallIcon />
              </View>
              <View style={styles.rightView}>
                <Text
                  style={[
                    FontStyle.urbanistRegular,
                    CommonStyles.descCommonTxtOnly,
                    CommonStyles.justifyText,
                  ]}
                >
                  Leverage the Ryde platform to minimize the cost and time of
                  any risks arising from Guest ID verification and disputes that
                  occur by inappropriate vehicle use.
                </Text>
              </View>
            </View>
            {/* <TouchableOpacity
              style={styles.learnView}
              onPress={() =>
                // onClick(12)
                navigate("GotBack")
              }
            >
              <Text
                style={[
                  FontStyle.urbanistBold,
                  CommonStyles.extraSmallCommonTxt,
                  styles.learnTxt,
                ]}
              >
                Learn more
              </Text>
            </TouchableOpacity> */}
          </View>
          <View style={styles.conditionView}>
            <Text
              style={[
                FontStyle.urbanistRegular,
                CommonStyles.descCommonTxtOnly,
                CommonStyles.justifyText,
              ]}
            >
              Whether you want to make some extra money by renting out a few
              cars or create a small car rental business with multiple vehicles,
              begin with just one car and expand at your own pace.
            </Text>
          </View>
          <View style={{ marginVertical: Variables.Measures.unit }}>
            <ButtonView
              isLoading={isLoading || isLoadingOwn || isLoadingCust}
              width={Variables.Measures.width / 1.12}
              btnTxt={t("labelConst.getStarted")}
              backgroundColor={Variables.Colors.yellow}
              onBtnPress={() => {
                {
                  _.get(profileDetailsData, "verifiedInfo.role", null) ===
                  "ROLE_CAR_OWNER"
                    ? // onClick(21)
                      startedNext()
                    : // navigate("SubmitListing")

                    _.get(profileDetailsData, "verifiedInfo.role", null) ===
                      "ROLE_CUSTOMER"
                    ? switchtoOwner()
                    : clearAsyncStorage();
                }
              }}
              fontColor={Variables.Colors.darkBlack}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  subHeadingTxt: {
    color: Variables.Colors.white,
    fontSize: 16,
    marginTop: 5,
  },
  leftView: {
    width: "20%",
    alignItems: "center",
    justifyContent: "center",
  },
  rightView: {
    width: "76%",
  },
  greyBgView: {
    backgroundColor: Variables.Colors.carGrey,
    width: "94%",
    alignSelf: "center",
    borderRadius: 10,
    paddingVertical: Variables.Measures.unit,
  },
  cardOuterView: {
    width: "95%",
    alignSelf: "center",
  },
  cardView: {
    width: "95%",
    alignSelf: "center",
    borderRadius: 10,
    paddingVertical: 10,
    backgroundColor: Variables.Colors.carGrey,
    marginVertical: Variables.FontSize.small,
  },
  cardRowView: {
    width: "95%",
    marginBottom: Variables.MetricsSizes.large,
  },
  hostTxt: {
    marginVertical: 10,
    color: Variables.Colors.white,
    fontSize: Variables.FontSize.regular,
    lineHeight: 22,
  },
  descTxt: {
    color: Variables.Colors.white,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 5,
  },
  safeAreaStyle: {
    flex: 1,
    backgroundColor: Variables.Colors.darkBlack,
  },
  marginView: {
    marginVertical: 10,
  },
  subCartText: {
    fontSize: 12,
    lineHeight: 18,
    color: Variables.Colors.white,
  },
  learnTxt: {
    color: Variables.Colors.darkYellow,
    paddingVertical: 4,
  },
  learnView: {
    width: "100%",
    alignItems: "flex-end",
    marginVertical: 10,
    paddingRight: 15,
  },
  conditionstxt: {
    color: Variables.Colors.white,
    fontSize: 10,
    lineHeight: 12,
  },
  conditionView: {
    width: "90%",
    alignSelf: "center",
    marginVertical: Variables.Measures.unit * 2,
  },
});
export default BecomeHost;

import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Platform,
  RefreshControl,
} from "react-native";
import { FontStyle, Variables, Images, CommonStyles } from "../../Theme";
import { useTranslation } from "react-i18next";
import { goBack, navigate, replace } from "../../navigators/RootNavigation";
import TripGrey from "../../assets/Images/TabBarIcons/RoadGrey.svg";
import ProfilePhotoSvg from "../../assets/Images/ProfilePhoto.svg";
import GearSvg from "../../assets/Images/WhiteGear.svg";
import TaxSvg from "../../assets/Images/TaxInfo.svg";
import TransactionSvg from "../../assets/Images/TransactionHistory.svg";
import ContactSvg from "../../assets/Images/Contact.svg";
import LegalSvg from "../../assets/Images/Legal.svg";
import WalletSvg from "../../assets/Images/WalletYellow.svg";
import variables, { Colors, Measures } from "../../Theme/variables";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import {
  logOutResetAll,
  loginUserSuccess,
  mapDataSuccess,
  refreshTokenStart,
  refreshTokenSuccess,
} from "../../actions/authActions";
import { ReducerStateProps } from "../Inbox/InterfaceProps";
import {
  carListLuxStart,
  switchToOwnerStart,
} from "../../actions/customerActions";
import _ from "lodash";
import {
  ownerCarListStart,
  ownerCarViewSuccess,
  switchToCustomerStart,
} from "../../actions/carOwnerActions";
import ButtonView from "../../components/ButtonView";
import DashedLine from "react-native-dashed-line";
import FastImageView from "../../components/FastImageView";
import ContentLoader, { Rect, Circle } from "react-content-loader/native";
import { profileDetailsStart } from "../../actions/userActions";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { LoginManager } from "react-native-fbsdk-next";

var pkg = require("../../../package.json");
interface AccountProps {
  onClick: (val: number) => void;
}
import { GOOGLE_CLIENT_ID } from "../../constants/constants";

const Account: React.FC<AccountProps> = ({ onClick }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [update, setUpdate] = useState(false);

  const [
    ownerCarListLux,
    ownerCarListData,
    profileDetailsData,
    switchToOwnerData,
    switchToCustomerData,
    loginData,
    isLoadingOwn,
    isLoadingCust,
    isLoadingUser,
    refreshData,
  ] = useSelector((state: ReducerStateProps) => [
    state.carOwner.ownerCarListLux,
    state.carOwner.ownerCarListData,
    state.user.profileDetailsData,
    state.customer.switchToOwnerData,
    state.carOwner.switchToCustomerData,
    state.auth.loginData,
    state.carOwner.isLoading,
    state.customer.isLoading,
    state.user.isLoading,
    state.auth.refreshData,
  ]);

  useEffect(() => {
    if (loginData) {
      dispatch(profileDetailsStart());
    }
  }, []);
  useEffect(() => {
    if (
      _.get(profileDetailsData, "verifiedInfo.role", null) === "ROLE_CAR_OWNER"
    ) {
      dispatch(ownerCarListStart(null));
    }
  }, []);

  const CardView = () => {
    const switchToHostOrCustomer = () => {
      if (
        _.get(profileDetailsData, "verifiedInfo.role", null) ===
        "ROLE_CAR_OWNER"
      ) {
        dispatch(switchToCustomerStart());
        // dispatch(
        //   refreshTokenStart({
        //     email: _.get(profileDetailsData, "verifiedInfo.email", null),
        //   })
        // );
        setUpdate(true);
      } else {
        dispatch(switchToOwnerStart());
        // dispatch(
        //   refreshTokenStart({
        //     email: _.get(profileDetailsData, "verifiedInfo.email", null),
        //   })
        // );
        setUpdate(true);
      }
    };
    useEffect(() => {
      if (
        (_.get(switchToOwnerData, "success", null) === true && update) ||
        (_.get(switchToCustomerData, "success", null) === true && update)
      ) {
        setUpdate(false);
        // clearAsyncStorage();
        if (loginData) {
          dispatch(
            refreshTokenStart({ email: _.get(loginData, "user.email", null) })
          );
          // dispatch(loginUserSuccess(null));
          clearAsyncStorage1();
        }
      }
    }, [switchToOwnerData, switchToCustomerData]);

    return (
      <View style={styles.cardView}>
        <View style={styles.cardRowView}>
          <View
            style={{
              flexShrink: 1,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ width: "20%" }}>
              {profileDetailsData?.verifiedInfo.profilePicture ? (
                <FastImageView
                  source={{
                    uri: profileDetailsData?.verifiedInfo.profilePicture,
                  }}
                  style={styles.userImageView}
                />
              ) : (
                <Image
                  source={Images.userPlaceholder}
                  style={styles.userImageView}
                />
              )}
            </View>
            <View
              style={{
                flexShrink: 1,
                justifyContent: "center",
              }}
            >
              {profileDetailsData?.verifiedInfo?.fullName ? (
                <Text
                  style={[FontStyle.urbanistBold, CommonStyles.smallCommonTxt]}
                >
                  {_.get(profileDetailsData, "verifiedInfo.fullName", null)}
                </Text>
              ) : (
                <Text
                  style={[FontStyle.urbanistBold, CommonStyles.smallCommonTxt]}
                >
                  Welcome to Ryde
                </Text>
              )}

              <TouchableOpacity
                onPress={() => {
                  profileDetailsData?.verifiedInfo?.role == "ROLE_CUSTOMER" ||
                  profileDetailsData?.verifiedInfo?.role == "ROLE_CAR_OWNER"
                    ? navigate("UserProfile")
                    : clearAsyncStorage();
                }}
              >
                {profileDetailsData?.verifiedInfo?.role == "ROLE_CUSTOMER" ||
                profileDetailsData?.verifiedInfo?.role == "ROLE_CAR_OWNER" ? (
                  <Text
                    style={[
                      FontStyle.urbanistMedium,
                      CommonStyles.descCommonTxt,
                      { color: Colors.yellow },
                    ]}
                  >
                    {t("labelConst.viewEditProfile")}
                  </Text>
                ) : (
                  <Text
                    style={[
                      FontStyle.urbanistMedium,
                      CommonStyles.descCommonTxt,
                      { color: Colors.yellow },
                    ]}
                  >
                    Log in or Sign up
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>

          {_.get(profileDetailsData, "verifiedInfo.role", null) ===
          "ROLE_CUSTOMER" ? (
            <TouchableOpacity
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              onPress={() => navigate("MyWallet")}
            >
              <Text
                style={[FontStyle.urbanistBold, CommonStyles.descCommonTxt]}
              >
                Add wallet
              </Text>
              <WalletSvg height={28} width={30} />
            </TouchableOpacity>
          ) : _.get(profileDetailsData, "verifiedInfo.role", null) ===
            "ROLE_CAR_OWNER" ? null : (
            <TouchableOpacity
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
              onPress={() => clearAsyncStorage()}
            >
              <Text
                style={[FontStyle.urbanistBold, CommonStyles.descCommonTxt]}
              >
                Add wallet
              </Text>
              <WalletSvg height={28} width={30} />
            </TouchableOpacity>
          )}
        </View>
        <DashedLine
          dashLength={3}
          dashColor={Variables.Colors.borderGrey}
          style={{ width: "90%", alignSelf: "center", marginTop: 14 }}
        />
        {(_.get(profileDetailsData, "verifiedInfo.role", null) ==
          "ROLE_CUSTOMER" ||
          _.get(profileDetailsData, "verifiedInfo.role", null) ==
            "ROLE_CAR_OWNER") && (
          <View style={styles.hostModeView}>
            <ButtonView
              width={Variables.Measures.width / 1.15}
              btnTxt={
                _.get(profileDetailsData, "verifiedInfo.role", null) ==
                "ROLE_CAR_OWNER"
                  ? "Switch to customer mode"
                  : "Switch to host mode"
              }
              backgroundColor={Variables.Colors.darkYellow}
              onBtnPress={() => {
                switchToHostOrCustomer();
              }}
              fontColor={Variables.Colors.darkBlack}
              isLoading={(update && isLoadingOwn) || isLoadingCust}
            />
          </View>
        )}
        <View
          style={{
            width: "93%",
            alignSelf: "center",
            marginBottom: Measures.fontSize / 2,
          }}
        >
          {_.get(profileDetailsData, "verifiedInfo.role", null) ===
            "ROLE_CAR_OWNER" &&
          _.get(ownerCarListData, "totalCount", null) == 0 &&
          _.get(ownerCarListLux, "totalCount", null) == 0 ? (
            <>
              <Text
                style={[
                  FontStyle.urbanistBold,
                  CommonStyles.smallCommonTxt,

                  { paddingVertical: 5 },
                ]}
              >
                Create a Ryde for Customer
              </Text>
              <Text
                style={[
                  FontStyle.urbanistMedium,
                  CommonStyles.descCommonTxtOnly,
                  CommonStyles.justifyText,
                  { paddingVertical: 5 },
                ]}
              >
                {`By Creating a Ryde, become one of the many hosts building businesses and earning a substantial income.`}
              </Text>
            </>
          ) : null}

          {_.get(profileDetailsData, "verifiedInfo.role", null) ===
          "ROLE_CAR_OWNER" ? null : _.get(
              profileDetailsData,
              "verifiedInfo.isUserSwitched",
              null
            ) == true ? null : (
            <>
              <Image
                source={Images.userImg9}
                style={{
                  width: "100%",
                  height: Variables.Measures.width / 2.5,
                }}
              />

              <Text
                style={[
                  FontStyle.urbanistBold,
                  CommonStyles.smallCommonTxt,
                  { paddingVertical: 5 },
                ]}
              >
                {t("labelConst.becomeHost")}
              </Text>
              <Text
                style={[
                  FontStyle.urbanistMedium,
                  CommonStyles.descCommonTxtOnly,
                  CommonStyles.justifyText,
                  { paddingVertical: 5 },
                ]}
              >
                Join Ryde and become one of the many hosts building businesses
                and earning a substantial income.
              </Text>
            </>
          )}

          <View
            style={{
              marginTop: Variables.MetricsSizes.regular,
              flexWrap: "wrap",
            }}
          >
            {_.get(profileDetailsData, "verifiedInfo.role", null) ===
              "ROLE_CAR_OWNER" &&
            _.get(ownerCarListData, "totalCount", null) == 0 &&
            _.get(ownerCarListLux, "totalCount", null) == 0 ? (
              <TouchableOpacity
                style={[styles.btnView, { height: 45, width: "40%" }]}
                onPress={() => {
                  _.get(profileDetailsData, "verifiedInfo.role", null) ===
                  "ROLE_CAR_OWNER"
                    ? [
                        navigate("AboutCar1"),
                        dispatch(mapDataSuccess(null)),
                        dispatch(ownerCarViewSuccess(null)),
                      ]
                    : [
                        navigate("BecomeHost"),
                        dispatch(ownerCarViewSuccess(null)),
                      ];
                }}
              >
                <Text
                  style={[
                    FontStyle.urbanistBold,
                    CommonStyles.smallCommonTxt,
                    { color: Colors.darkBlack },
                  ]}
                >
                  {_.get(profileDetailsData, "verifiedInfo.role", null) ===
                  "ROLE_CAR_OWNER"
                    ? t("Create Ryde")
                    : t("labelConst.learnMore")}
                </Text>
              </TouchableOpacity>
            ) : null}

            {_.get(profileDetailsData, "verifiedInfo.role", null) !==
            "ROLE_CAR_OWNER" ? (
              _.get(profileDetailsData, "verifiedInfo.isUserSwitched", null) ==
              true ? null : (
                <TouchableOpacity
                  style={[styles.btnView, { height: 45, width: "40%" }]}
                  onPress={() => {
                    _.get(profileDetailsData, "verifiedInfo.role", null) ===
                    "ROLE_CAR_OWNER"
                      ? [navigate("AboutCar1"), dispatch(mapDataSuccess(null))]
                      : [
                          navigate("BecomeHost"),
                          dispatch(ownerCarViewSuccess(null)),
                        ];
                  }}
                >
                  <Text
                    style={[
                      FontStyle.urbanistBold,
                      CommonStyles.smallCommonTxt,
                      { color: Colors.darkBlack },
                    ]}
                  >
                    {_.get(profileDetailsData, "verifiedInfo.role", null) ===
                    "ROLE_CAR_OWNER"
                      ? t("Create Ryde")
                      : t("labelConst.learnMore")}
                  </Text>
                </TouchableOpacity>
              )
            ) : null}
          </View>
        </View>
      </View>
    );
  };

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

  const clearAsyncStorage = async () => {
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
    replace("LoginSplash");
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

  const LoadingView = () => {
    return (
      <SafeAreaView style={styles.safeAreaStyle}>
        <StatusBar
          backgroundColor={Variables.Colors.blackBg}
          barStyle="light-content"
          translucent
        />
        <ScrollView
          style={{
            flex: 1,
          }}
        >
          <ContentLoader
            backgroundColor={Variables.Colors.absoluteBgGrey}
            foregroundColor={Variables.Colors.grey}
            width={Variables.Measures.width}
            height={Variables.Measures.width * 1.25}
          >
            <Rect
              x={Variables.MetricsSizes.small}
              y="0"
              rx="4"
              ry="4"
              width={Variables.Measures.width / 1.06}
              height={Variables.Measures.width * 1.25}
            />
            <Circle
              cx={Variables.FontSize.regular * 3}
              cy={Variables.MetricsSizes.small * 5}
              r={Variables.MetricsSizes.tiny * 7}
            />
            <Rect
              x={Variables.Measures.width / 3.5}
              y={Variables.MetricsSizes.small * 3}
              rx="4"
              ry="4"
              width="60"
              height="15"
            />
            <Rect
              x={Variables.Measures.width / 3.5}
              y={Variables.MetricsSizes.small * 5}
              rx="4"
              ry="4"
              width="100"
              height="15"
            />
            <Rect
              x={Variables.Measures.width / 1.55}
              y={Variables.MetricsSizes.small * 4}
              rx="4"
              ry="4"
              width="80"
              height="15"
            />
            <Rect
              x={Variables.Measures.width / 1.15}
              y={Variables.MetricsSizes.small * 3.3}
              rx="4"
              ry="4"
              width="30"
              height="30"
            />
            <Rect
              x={Variables.FontSize.regular}
              y={Variables.MetricsSizes.small * 9}
              rx="4"
              ry="4"
              width="90%"
              height="2"
            />
            <Rect
              x={Variables.FontSize.regular}
              y={Variables.MetricsSizes.small * 10.5}
              rx={Variables.MetricsSizes.tiny * 3}
              ry={Variables.MetricsSizes.tiny * 3}
              width="90%"
              height="50"
            />
            <Rect
              x={Variables.FontSize.regular}
              y={Variables.MetricsSizes.small * 17}
              rx="0"
              ry="0"
              width="90%"
              height={variables.Measures.width / 2.25}
            />
            <Rect
              x={Variables.FontSize.regular}
              y={Variables.MetricsSizes.small * 36}
              rx="4"
              ry="4"
              width="90%"
              height="2"
            />
            <Rect
              x={Variables.FontSize.regular}
              y={Variables.MetricsSizes.small * 37.5}
              rx="4"
              ry="4"
              width="25%"
              height="15"
            />
            <Rect
              x={Variables.FontSize.regular}
              y={Variables.MetricsSizes.small * 40}
              rx="4"
              ry="4"
              width="70%"
              height="15"
            />
            <Rect
              x={Variables.FontSize.regular}
              y={Variables.MetricsSizes.small * 42}
              rx="4"
              ry="4"
              width="75%"
              height="15"
            />
            <Rect
              x={Variables.FontSize.regular}
              y={Variables.MetricsSizes.small * 45}
              rx={Variables.MetricsSizes.tiny * 3}
              ry={Variables.MetricsSizes.tiny * 3}
              width="40%"
              height="50"
            />
          </ContentLoader>

          <View style={{ marginTop: 50 }}>
            <ContentLoader
              backgroundColor={Variables.Colors.absoluteBgGrey}
              foregroundColor={Variables.Colors.grey}
              width={Variables.Measures.width}
              height={Variables.FontSize.large}
            >
              <Circle
                cx={Variables.FontSize.regular * 2}
                cy={Variables.MetricsSizes.small * 2}
                r={Variables.MetricsSizes.tiny * 4}
              />
              <Rect
                x={Variables.Measures.width / 5}
                y={Variables.MetricsSizes.small}
                rx="4"
                ry="4"
                width={Variables.FontSize.large * 2}
                height="15"
              />
            </ContentLoader>

            <ContentLoader
              backgroundColor={Variables.Colors.absoluteBgGrey}
              foregroundColor={Variables.Colors.grey}
              width={Variables.Measures.width}
              height={Variables.FontSize.large}
              style={{ marginTop: 10 }}
            >
              <Circle
                cx={Variables.FontSize.regular * 2}
                cy={Variables.MetricsSizes.small * 2}
                r={Variables.MetricsSizes.tiny * 4}
              />
              <Rect
                x={Variables.Measures.width / 5}
                y={Variables.MetricsSizes.small}
                rx="4"
                ry="4"
                width={Variables.FontSize.large * 2}
                height="15"
              />
            </ContentLoader>

            <ContentLoader
              backgroundColor={Variables.Colors.absoluteBgGrey}
              foregroundColor={Variables.Colors.grey}
              width={Variables.Measures.width}
              height={Variables.FontSize.large}
              style={{ marginTop: 10 }}
            >
              <Circle
                cx={Variables.FontSize.regular * 2}
                cy={Variables.MetricsSizes.small * 2}
                r={Variables.MetricsSizes.tiny * 4}
              />
              <Rect
                x={Variables.Measures.width / 5}
                y={Variables.MetricsSizes.small}
                rx="4"
                ry="4"
                width={Variables.FontSize.large * 2}
                height="15"
              />
            </ContentLoader>

            <ContentLoader
              backgroundColor={Variables.Colors.absoluteBgGrey}
              foregroundColor={Variables.Colors.grey}
              width={Variables.Measures.width}
              height={Variables.FontSize.large}
              style={{ marginTop: 10 }}
            >
              <Circle
                cx={Variables.FontSize.regular * 2}
                cy={Variables.MetricsSizes.small * 2}
                r={Variables.MetricsSizes.tiny * 4}
              />
              <Rect
                x={Variables.Measures.width / 5}
                y={Variables.MetricsSizes.small}
                rx="4"
                ry="4"
                width={Variables.FontSize.large * 2}
                height="15"
              />
            </ContentLoader>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };

  return (
    <SafeAreaView style={styles.safeAreaStyle}>
      <StatusBar
        backgroundColor={Variables.Colors.darkBlack}
        barStyle="light-content"
        animated={true}
        translucent
      />
      <ScrollView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <CardView />
          <TouchableOpacity
            style={styles.accountView}
            onPress={() => {
              loginData ? navigate("Account") : clearAsyncStorage();
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <ProfilePhotoSvg
                width={Measures.fontSize * 1.3}
                height={Measures.fontSize * 1.3}
              />
              <Text
                style={[
                  FontStyle.urbanistMedium,
                  CommonStyles.smallCommonTxt,
                  { marginLeft: 20 },
                ]}
              >
                {t("labelConst.accountTxt")}
              </Text>
            </View>
          </TouchableOpacity>
          {_.get(profileDetailsData, "verifiedInfo.role", null) ==
            "ROLE_CAR_OWNER" && (
            <TouchableOpacity
              style={styles.accountView}
              onPress={() => {
                navigate("Trips");
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TripGrey
                  width={Measures.fontSize * 1.3}
                  height={Measures.fontSize * 1.3}
                />
                <Text
                  style={[
                    FontStyle.urbanistMedium,
                    CommonStyles.smallCommonTxt,
                    { marginLeft: 20 },
                  ]}
                >
                  Trip
                </Text>
              </View>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.accountView}
            onPress={() => {
              // loginData ? navigate("Transaction") : clearAsyncStorage();
              navigate("Transaction");
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TransactionSvg
                width={Measures.fontSize * 1.3}
                height={Measures.fontSize * 1.3}
              />
              <Text
                style={[
                  FontStyle.urbanistMedium,
                  CommonStyles.smallCommonTxt,
                  { marginLeft: 20 },
                ]}
              >
                Transaction history
              </Text>
            </View>
          </TouchableOpacity>

          {/* <View style={styles.accountView}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TaxSvg width={25} height={28} />
              <Text
                style={[
                  FontStyle.urbanistMedium,
                  styles.descTxt,
                  { marginLeft: 20 },
                ]}
              >
                Tax infromation
              </Text>
            </View>
          </View> */}

          <TouchableOpacity
            style={styles.accountView}
            onPress={() => {
              navigate("HowRydeWorks");
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <GearSvg
                width={Measures.fontSize * 1.3}
                height={Measures.fontSize * 1.3}
              />
              <Text
                style={[
                  FontStyle.urbanistMedium,
                  CommonStyles.smallCommonTxt,
                  { marginLeft: 20 },
                ]}
              >
                How Ryde works
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.accountView}
            onPress={() => {
              navigate("ContactSupport");
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <ContactSvg
                width={Measures.fontSize * 1.3}
                height={Measures.fontSize * 1.3}
              />
              <Text
                style={[
                  FontStyle.urbanistMedium,
                  CommonStyles.smallCommonTxt,
                  { marginLeft: 20 },
                ]}
              >
                {t("labelConst.contactSupport")}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.accountView}
            onPress={() => {
              navigate("Legal");
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <LegalSvg
                width={Measures.fontSize * 1.3}
                height={Measures.fontSize * 1.3}
              />
              <Text
                style={[
                  FontStyle.urbanistMedium,
                  CommonStyles.smallCommonTxt,
                  { marginLeft: 20 },
                ]}
              >
                {t("labelConst.Legal")}
              </Text>
            </View>
          </TouchableOpacity>

          <View style={styles.lineCenterView}>
            <View style={styles.lineView}></View>
          </View>
          <View style={{ width: "85%", alignSelf: "center", marginBottom: 20 }}>
            {profileDetailsData && (
              <TouchableOpacity
                disabled={isLoadingUser}
                onPress={() => clearAsyncStorage()}
              >
                <Text
                  style={[FontStyle.urbanistBold, CommonStyles.smallCommonTxt]}
                >
                  {t("labelConst.logout")}
                </Text>
              </TouchableOpacity>
            )}
            <View style={{ height: 20 }} />

            <Text
              style={[
                FontStyle.urbanistMedium,
                CommonStyles.extraSmallCommonTxt,
              ]}
            >
              Version {pkg?.version}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  hostModeView: {
    width: "93%",
    alignSelf: "center",
    marginVertical: Measures.fontSize,
  },
  walletTxt: {
    fontSize: Measures.fontSize / 1.6,
    color: Variables.Colors.white,
    marginRight: 5,
  },
  nameTxt: {
    color: Variables.Colors.white,
    fontSize: Measures.fontSize / 1.4,
  },
  editTxt: {
    color: Variables.Colors.darkYellow,
    fontSize: Measures.fontSize / 1.5,
  },
  cardView: {
    backgroundColor: Variables.Colors.carGrey,
    width: "94%",
    alignSelf: "center",
    marginTop: 18,
    borderRadius: 15,
  },
  cardRowView: {
    flexDirection: "row",
    width: "93%",
    marginTop: 18,
    alignSelf: "center",
    justifyContent: "space-between",
  },
  userImageView: {
    height: 50,
    width: 50,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: Variables.Colors.darkYellow,
  },
  hostTxt: {
    marginVertical: 10,
    color: Variables.Colors.white,
    fontSize: Variables.Measures.fontSize / 1.2,
  },
  descTxt: {
    color: Variables.Colors.white,
    fontSize: Variables.Measures.fontSize / 1.4,
  },
  // descTxt: {
  //   color: Variables.Colors.white,
  //   fontSize: 14,
  //   lineHeight: 20,
  // },
  btnView: {
    backgroundColor: Variables.Colors.darkYellow,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  btnTxt: {
    color: Variables.Colors.darkBlack,
    fontSize: Variables.Measures.fontSize / 1.2,
  },
  accountView: {
    width: "87%",
    alignSelf: "center",
    marginTop: Variables.Measures.unit * 3,
  },
  safeAreaStyle: {
    flex: 1,
    backgroundColor: Variables.Colors.darkBlack,
    marginTop: Measures.StatusBarHeight,
  },
  lineCenterView: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  lineView: {
    height: 1,
    backgroundColor: Variables.Colors.borderGrey,
    width: "100%",
  },
  versionTxt: {
    color: Variables.Colors.carsBorderGrey,
    marginTop: Variables.FontSize.regular,
    fontSize: Variables.Measures.fontSize / 1.5,
  },
});
export default Account;

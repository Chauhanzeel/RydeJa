import React, { useEffect, useState } from "react";
import { View, BackHandler, Platform } from "react-native";
import { useTranslation } from "react-i18next";

import { Variables } from "../Theme";

import SearchYellow from "../assets/Images/TabBarIcons/SearchYellow.svg";
import SearchGrey from "../assets/Images/TabBarIcons/SearchGrey.svg";
import FavoritesGrey from "../assets/Images/TabBarIcons/HeartGrey.svg";
import FavoritesYellow from "../assets/Images/TabBarIcons/HeartYellow.svg";
import TripGrey from "../assets/Images/TabBarIcons/RoadGrey.svg";
import TripYellow from "../assets/Images/TabBarIcons/RoadYellow.svg";
import InboxGrey from "../assets/Images/TabBarIcons/InboxGrey.svg";
import InboxYellow from "../assets/Images/TabBarIcons/InboxYellow.svg";
import MoreGrey from "../assets/Images/TabBarIcons/MoreGrey.svg";
import MoreYellow from "../assets/Images/TabBarIcons/MoreYellow.svg";
import VehiclesWhite from "../assets/Images/TabBarIcons/VehiclesWhite.svg";
import VehiclesYellow from "../assets/Images/TabBarIcons/VehiclesYellow.svg";
import BusinessWhite from "../assets/Images/TabBarIcons/BusinessWhite.svg";
import BusinessYellow from "../assets/Images/TabBarIcons/BusinessYellow.svg";

import Inbox from "./Inbox/Inbox";
import BottomTabBar from "../components/BottomTabBar";
import Search from "./Home/Search";
import Favorites from "./Bookings/favorites";
import More from "./Profile/More";
import Trips from "./Bookings/Trips";
import Approved from "./Approved";
import Vehicles from "./Vehicles/Vehicles";
import Business from "./Business/Business";
import { useDispatch, useSelector } from "react-redux";
import { ReducerStateProps } from "./Inbox/InterfaceProps";
import {
  logOutResetAll,
  loginUserSuccess,
  refreshTokenSuccess,
} from "../actions/authActions";
import { PasswordOtpProps } from "./types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { navigate, replace } from "../navigators/RootNavigation";
import VehicleDetails from "./Vehicles/VehicleDetails";
import AboutCar1 from "./HostMode/AboutCar1";
import _ from "lodash";
import { profileDetailsStart } from "../actions/userActions";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { LoginManager } from "react-native-fbsdk-next";

import { GOOGLE_CLIENT_ID } from "../constants/constants";

const TabNavigations: React.FC<PasswordOtpProps> = ({ route }) => {
  const { t } = useTranslation();
  const isFocused = useIsFocused();
  const navigationValue = route.params?.navigationfrom;
  const [tabClicked, setTabClicked] = useState(0);
  const [routeData, setRoute] = useState(null);

  const [
    customerError,
    ownerError,
    authError,
    userError,
    loginData,
    refreshData,
  ] = useSelector((state: ReducerStateProps) => [
    state.customer.error,
    state.carOwner.error,
    state.auth.error,
    state.user.error,
    state.auth.loginData,
    state.auth.refreshData,
  ]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (refreshData !== null) {
      dispatch(refreshTokenSuccess(null));
    }
  }, []);

  const onClickHandler = (value: number, val?: number, routeData?: any) => {
    setTabClicked(value);
    setRoute(routeData);
  };

  useEffect(() => {
    if (navigationValue && isFocused) {
      setTabClicked(navigationValue);
      navigate("TabNavigations", { navigationfrom: 0 });
    }
  }, [isFocused]);

  useEffect(() => {
    if (
      customerError == "Expired JWT Token" ||
      ownerError == "Expired JWT Token" ||
      authError == "Expired JWT Token" ||
      userError == "Expired JWT Token"
    ) {
      clearAsyncStorage();
    }
  }, [customerError, ownerError, authError, userError]);

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

  useFocusEffect(
    React.useCallback(() => {
      const backAction = () => {
        if (tabClicked == 0) {
          BackHandler.exitApp();
        } else {
          onClickHandler(0);
        }
        return true;
      };

      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        backAction
      );

      return () => backHandler.remove();
    }, [])
  );

  const tabNavigations = (key: string) => {
    switch (key) {
      case "tab1":
        setTabClicked(0);
        break;
      case "tab2":
        setTabClicked(1);
        break;
      case "tab3":
        setTabClicked(2);
        break;
      case "tab4":
        setTabClicked(3);
        break;
      case "tab5":
        setTabClicked(4);
        break;
      case "tab6":
        setTabClicked(5);
        break;
      default:
        return key;
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Variables.Colors.darkBlack,
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      <View
        style={{
          flex: 1,
        }}
      >
        <View style={{ flex: 1 }}>
          {tabClicked === 0 && <Search />}
          {tabClicked === 1 &&
            (loginData?.user?.role === "ROLE_CAR_OWNER" ? null : (
              <Favorites onClick={onClickHandler} />
            ))}
          {tabClicked === 2 &&
            (loginData?.user?.role === "ROLE_CAR_OWNER" ? (
              <Vehicles onClick={onClickHandler} />
            ) : (
              <Trips onClick={onClickHandler} />
            ))}
          {tabClicked === 3 && <Inbox onClick={onClickHandler} />}
          {tabClicked === 4 && <More onClick={onClickHandler} />}
          {tabClicked === 5 && <Business />}
          {tabClicked === 19 && <Approved onClick={onClickHandler} />}
          {tabClicked === 21 && <AboutCar1 />}
          {tabClicked === 29 && (
            <VehicleDetails routeData={routeData} onClick={onClickHandler} />
          )}
        </View>
      </View>

      <BottomTabBar
        iconFirstImg={
          tabClicked === 0 ? (
            <SearchYellow height={20} width={20} />
          ) : (
            <SearchGrey height={25} width={25} />
          )
        }
        iconSecondImg={
          // access?.user?.role === "ROLE_CUSTOMER" ||
          // access?.data?.user?.role === "ROLE_CUSTOMER" ? (
          //   tabClicked === 1 ? (
          //     <FavoritesYellow height={18} width={18} />
          //   ) : (
          //     <FavoritesGrey height={23} width={23} />
          //   )
          // ) :
          loginData?.user?.role == "ROLE_CAR_OWNER" ? (
            tabClicked === 1 && null
          ) : tabClicked === 1 ? (
            <FavoritesYellow height={18} width={18} />
          ) : (
            <FavoritesGrey height={23} width={23} />
          )
        }
        iconThirdImg={
          // access?.user?.role === "ROLE_CUSTOMER" ||
          // access?.data?.user?.role === "ROLE_CUSTOMER" ? (
          //   tabClicked === 2 ? (
          //     <TripYellow height={25} width={25} />
          //   ) : (
          //     <TripGrey />
          //   )
          // ) :
          loginData?.user?.role == "ROLE_CAR_OWNER" ? (
            tabClicked === 2 ? (
              <VehiclesYellow height={25} width={25} />
            ) : (
              <VehiclesWhite height={25} width={25} />
            )
          ) : tabClicked === 2 ? (
            <TripYellow height={25} width={25} />
          ) : (
            <TripGrey />
          )
        }
        iconForthImg={
          // access?.user?.role === "ROLE_CUSTOMER" ? (
          tabClicked === 3 ? (
            <InboxYellow height={25} width={25} />
          ) : (
            <InboxGrey />
          )
          // ) : tabClicked === 3 ? (
          //   <BusinessYellow height={25} width={25} />
          // ) : (
          //   <BusinessWhite height={25} width={25} />
          // )
        }
        iconFifthImg={
          tabClicked === 4 ||
          tabClicked === 8 ||
          tabClicked === 9 ||
          tabClicked === 20 ||
          tabClicked === 13 ||
          tabClicked === 14 ||
          tabClicked === 15 ||
          tabClicked === 17 ||
          tabClicked === 18 ||
          tabClicked === 21 ||
          tabClicked === 22 ||
          tabClicked === 23 ||
          tabClicked === 24 ||
          tabClicked === 25 ||
          tabClicked === 26 ||
          tabClicked === 27 ? (
            <MoreYellow height={15} width={15} />
          ) : (
            <MoreGrey height={15} width={15} />
          )
        }
        iconSixthImg={
          loginData?.user?.role === "ROLE_CAR_OWNER" &&
          (tabClicked === 5 ? (
            <BusinessYellow height={25} width={25} />
          ) : (
            <BusinessWhite height={25} width={25} />
          ))
        }
        // iconSixthImg={
        //   tabClicked === 5 ? (
        //     <BusinessYellow height={25} width={25} />
        //   ) : (
        //     <BusinessWhite height={25} width={25} />
        //   )
        // }
        firstTabText={t("labelConst.searchTxt")}
        secondTabText={
          loginData?.user?.role === "ROLE_CAR_OWNER"
            ? t("labelConst.vehicleTxt")
            : t("labelConst.favorites")
        }
        thirdTabText={
          loginData?.user?.role === "ROLE_CAR_OWNER"
            ? t("labelConst.vehicleTxt")
            : t("labelConst.tripTxt")
        }
        forthTabText={t("labelConst.inboxTxt")}
        fifthTabText={t("labelConst.moreTxt")}
        sixthTabText={
          loginData?.user?.role === "ROLE_CUSTOMER"
            ? t("labelConst.businessTxt")
            : t("labelConst.businessTxt")
        }
        firstTabColor={
          tabClicked === 0
            ? Variables.Colors.darkYellow
            : Variables.Colors.white
        }
        secondTabColor={
          tabClicked === 1
            ? Variables.Colors.darkYellow
            : Variables.Colors.white
        }
        thirdTabColor={
          tabClicked === 2
            ? Variables.Colors.darkYellow
            : Variables.Colors.white
        }
        forthTabColor={
          tabClicked === 3
            ? Variables.Colors.darkYellow
            : Variables.Colors.white
        }
        fifthTabColor={
          tabClicked === 4 ||
          tabClicked === 8 ||
          tabClicked === 9 ||
          tabClicked === 20 ||
          tabClicked === 13 ||
          tabClicked === 14 ||
          tabClicked === 15 ||
          tabClicked === 17 ||
          tabClicked === 18 ||
          tabClicked === 21 ||
          tabClicked === 22 ||
          tabClicked === 23 ||
          tabClicked === 24 ||
          tabClicked === 25 ||
          tabClicked === 26 ||
          tabClicked === 27
            ? Variables.Colors.darkYellow
            : Variables.Colors.white
        }
        sixthTabColor={
          tabClicked === 5
            ? Variables.Colors.darkYellow
            : Variables.Colors.white
        }
        onTabPress={(key) => {
          tabNavigations(key);
        }}
      />
    </View>
  );
};

export default TabNavigations;

import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";

import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "react-native-splash-screen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { navigationRef } from "./RootNavigation";
import NetInfo from "@react-native-community/netinfo";

import IntroScreens from "../containers/Intro";
import LetsIn from "../containers/LetsIn";
import SignIn from "../containers/SignIn";
import CreatePin from "../containers/CreatePin";
import PasswordOtp from "../containers/PasswordOtp";
import CreatePassword from "../containers/CreatePassword";
import Notifications from "../containers/Notifications";
import ChatScreen from "../containers/Inbox/ChatScreen";
import TabNavigations from "../containers/TabNavigations";
import Profile from "../containers/Profile/Profile";
import PrivacyPolicy from "../containers/Profile/PrivacyPolicy";
import CarProfile from "../containers/CarProfile";
import Features from "../containers/Features";
import LuxuryCars from "../containers/LuxuryCars";
import RydeCars from "../containers/RydeCars";

import HostProfile from "../containers/HostProfile";
import HostCarProfile from "../containers/HostCarProfile";
import UpdateBookingCar from "../containers/UpdateBookingCar";

import GetApproved from "../containers/GetApproved";
import Reviews from "../containers/Reviews";
import DriverLicense from "../containers/DriverLicense";
import Favorites from "../containers/Bookings/favorites";
import EditProfile from "../containers/Profile/EditProfile";

import Call from "../containers/Inbox/Call";
import ForgotPassword from "../containers/ForgotPassword";
import CarPerish from "../containers/Bookings/CarsPerish";
import ProfilePhoto from "../containers/Bookings/ProfilePhoto";
import LoginSplash from "../containers/LoginSplash";

import AddWallet from "../containers/Profile/AddWallet";
import AddFunds from "../containers/Profile/AddFunds";
import MyWallet from "../containers/Profile/MyWallet";
import PaymentMethod from "../containers/Profile/PaymentMethod";
import AddPaymentCard from "../containers/Profile/AddPaymentCard";
import Transaction from "../containers/Profile/Transaction";
import Insurance from "../components/Insurance";

import CarInfo from "../containers/HostMode/CarInfo";
import AboutCarInfo from "../containers/HostMode/AboutCarInfo";
import EligibleCar from "../containers/HostMode/EllgibleCar";
import Questions from "../containers/HostMode/Questions";
import AdvanceNotice from "../containers/HostMode/AdvanceNotice";
import MaximumTrip from "../containers/HostMode/MaximumTrip";
import LicensePlate from "../containers/HostMode/LicensePlate";
import AddPhoto from "../containers/HostMode/AddPhoto";
import ReadyPhoto from "../containers/HostMode/ReadyPhoto";
import TakePhoto from "../containers/HostMode/TakePhoto";
import SetUpAccount from "../containers/HostMode/SetUpAccount";
import PickUpHours from "../containers/Vehicles/PickUpHours";
import UnAvailableDates from "../containers/Vehicles/UnAvaialableDates";
import SelectDate from "../containers/Vehicles/SelectDate";
import { Colors, Measures } from "../Theme/variables";
import { ReducerStateProps } from "../containers/Inbox/InterfaceProps";
import { useDispatch, useSelector } from "react-redux";
import { logOutResetAll } from "../actions/authActions";
import SignUp from "../containers/SignUp";
import VerifyEmail from "../containers/VerifyEmail";
import VerifyPhoneNumber from "../containers/Bookings/VerifyPhoneNumber";
import EnterPhoneNumber from "../containers/Bookings/EnterPhoneNumber";
import PaymentCard from "../containers/Bookings/PaymentCard";
import CurrentAddress from "../containers/Bookings/CurrentAddress";
import Checkout from "../containers/Bookings/Checkout";
import Reserve from "../containers/Bookings/Reserve";
import Extras from "../containers/Bookings/Extras";
import ProtectionPlans from "../containers/Bookings/ProtectionPlans";
import PaymentMethodCard from "../containers/Bookings/PaymentMethod";
import BookedSuccess from "../containers/Bookings/BookedSuccess";
import PromoCode from "../containers/Bookings/PromoCode";
import CarsByPerish4 from "../containers/Bookings/CarsByPerish4";
import CancelBookingReason from "../containers/Bookings/CancelBookingReason";
import BecomeHost from "../containers/Profile/BecomeHost";
import HowWorks from "../containers/Profile/HowWorks";
import Covered from "../containers/Profile/Covered";
import GotBack from "../containers/Profile/GotBack";
import AboutCar1 from "../containers/HostMode/AboutCar1";
import Address from "../containers/Address";
import MapScreen from "../containers/Home/MapScreen";
import YourCar from "../containers/YourCar";
import Car from "../containers/Car";
import ScanVin from "../containers/ScanVin";
import TypeVin from "../containers/TypeVin";
import CarFeatures from "../containers/HostMode/CarFeatures";
import VerifyStripe from "../containers/HostMode/VerifyStripe";
import Verified from "../containers/HostMode/Verified";
import DirectDeposit from "../containers/HostMode/DirectDeposit";
import SafetyStandards from "../containers/HostMode/SafetyStandards";
import SubmitListing from "../containers/HostMode/SubmitListing";
import Account from "../containers/Profile/Account";
import ChangePassword from "../containers/ChangePassword";
import ChangeNumber from "../containers/ChangeNumber";
import NotificationSettings from "../containers/NotificationSettings";
import CloseAccount from "../containers/CloseAccount";
import CloseAccountReason from "../containers/CloseAccountReason";
import CloseAccount2 from "../containers/CloseAccount2";
import UserProfile from "../containers/Profile/UserProfile";
import Trips from "../containers/Bookings/Trips";
import CarInformation from "../containers/HostMode/CarInformation";
import { FontStyle } from "../Theme";
import HowRydeWorks from "../containers/HowRydeWorks";
import Legal from "../containers/Legal";
import ContactSupport from "../containers/ContactSupport";
import TripHistory from "../containers/TripHistory";
import BankDetails from "../containers/HostMode/BankDetails";

const AppNavigator: React.FC = () => {
  const [login, setLogin] = useState(null);
  const [network, setNetwork] = useState(false);

  const dispatch = useDispatch();

  const [customerError, ownerError, authError, userError] = useSelector(
    (state: ReducerStateProps) => [
      state.customer.error,
      state.carOwner.error,
      state.auth.error,
      state.user.error,
    ]
  );

  useEffect(() => {
    if (
      customerError == "Expired JWT Token" ||
      ownerError == "Expired JWT Token" ||
      authError == "Expired JWT Token" ||
      userError == "Expired JWT Token"
    ) {
      dispatch(logOutResetAll());
      AsyncStorage.clear();
      setLogin(false);
    }
  }, [customerError, ownerError, authError, userError]);

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 10000);
    getLoginStatus();
    NetInfo.addEventListener((state) => {
      setNetwork(state.isConnected);
    });
  }, []);

  const getLoginStatus = async () => {
    const loginData = await AsyncStorage.getItem("loginUserData");
    if (loginData) {
      setLogin(true);
    } else {
      setLogin(false);
    }
  };

  const Stack = createNativeStackNavigator();
  return login === null ? (
    <View style={styles.indicatorView}>
      <ActivityIndicator size={"small"} color={Colors.yellow} />
    </View>
  ) : (
    <View style={{ flex: 1, backgroundColor: Colors.blackBg }}>
      {network == false && (
        <View style={styles.InternetConnectionView}>
          <Text style={styles.InternetText}>{"No Internet Connection"}</Text>
        </View>
      )}

      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            gestureEnabled: false,
          }}
          initialRouteName={login ? "TabNavigations" : "TabNavigations"}
        >
          <Stack.Screen name="TabNavigations" component={TabNavigations} />
          <Stack.Screen name="HostCarProfile" component={HostCarProfile} />
          <Stack.Screen name="UpdateBookingCar" component={UpdateBookingCar} />
          <Stack.Screen name="HostProfile" component={HostProfile} />
          <Stack.Screen name="CarProfile" component={CarProfile} />
          <Stack.Screen name="Intro" component={IntroScreens} />
          <Stack.Screen name="CreatePin" component={CreatePin} />
          <Stack.Screen name="LuxuryCars" component={LuxuryCars} />
          <Stack.Screen name="RydeCars" component={RydeCars} />
          <Stack.Screen name="Notifications" component={Notifications} />
          <Stack.Screen name="ChatScreen" component={ChatScreen} />
          <Stack.Screen name="UserProfile" component={UserProfile} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
          <Stack.Screen name="Features" component={Features} />
          <Stack.Screen name="GetApproved" component={GetApproved} />
          <Stack.Screen name="Reviews" component={Reviews} />
          <Stack.Screen name="EditProfile" component={EditProfile} />
          <Stack.Screen name="Call" component={Call} />
          <Stack.Screen name="DriverLicense" component={DriverLicense} />
          <Stack.Screen name="CarsPerish" component={CarPerish} />
          <Stack.Screen name="AddWallet" component={AddWallet} />
          <Stack.Screen name="AddFunds" component={AddFunds} />
          <Stack.Screen name="MyWallet" component={MyWallet} />
          <Stack.Screen name="PaymentMethod" component={PaymentMethod} />
          <Stack.Screen name="AddPaymentCard" component={AddPaymentCard} />
          <Stack.Screen name="Transaction" component={Transaction} />
          <Stack.Screen name="Insurance" component={Insurance} />
          <Stack.Screen name="CarInfo" component={CarInfo} />
          <Stack.Screen name="AboutCarInfo" component={AboutCarInfo} />
          <Stack.Screen name="EligibleCar" component={EligibleCar} />
          <Stack.Screen name="Questions" component={Questions} />
          <Stack.Screen name="AdvanceNotice" component={AdvanceNotice} />
          <Stack.Screen name="MaximumTrip" component={MaximumTrip} />
          <Stack.Screen name="CarFeatures" component={CarFeatures} />
          <Stack.Screen name="CarInformation" component={CarInformation} />
          <Stack.Screen name="LicensePlate" component={LicensePlate} />
          <Stack.Screen name="AddPhoto" component={AddPhoto} />
          <Stack.Screen name="ReadyPhoto" component={ReadyPhoto} />
          <Stack.Screen name="TakePhoto" component={TakePhoto} />
          <Stack.Screen name="SetUpAccount" component={SetUpAccount} />
          <Stack.Screen name="PickUpHours" component={PickUpHours} />
          <Stack.Screen name="UnAvailableDates" component={UnAvailableDates} />
          <Stack.Screen name="SelectDate" component={SelectDate} />
          <Stack.Screen name="ProfilePhoto" component={ProfilePhoto} />
          <Stack.Screen name="EnterPhoneNumber" component={EnterPhoneNumber} />
          <Stack.Screen name="ProtectionPlans" component={ProtectionPlans} />
          <Stack.Screen
            name="VerifyPhoneNumber"
            component={VerifyPhoneNumber}
          />
          <Stack.Screen
            name="PaymentMethodCard"
            component={PaymentMethodCard}
          />
          <Stack.Screen
            name="CancelBookingReason"
            component={CancelBookingReason}
          />
          <Stack.Screen name="BecomeHost" component={BecomeHost} />
          <Stack.Screen name="SafetyStandards" component={SafetyStandards} />
          <Stack.Screen name="Account" component={Account} />
          <Stack.Screen
            name="NotificationSettings"
            component={NotificationSettings}
          />
          <Stack.Screen name="CloseAccount" component={CloseAccount} />
          <Stack.Screen
            name="CloseAccountReason"
            component={CloseAccountReason}
          />
          <Stack.Screen name="CloseAccount2" component={CloseAccount2} />
          <Stack.Screen name="PaymentCard" component={PaymentCard} />
          <Stack.Screen name="CurrentAddress" component={CurrentAddress} />
          <Stack.Screen name="Checkout" component={Checkout} />
          <Stack.Screen name="Reserve" component={Reserve} />
          <Stack.Screen name="Extras" component={Extras} />
          <Stack.Screen name="BookedSuccess" component={BookedSuccess} />
          <Stack.Screen name="PromoCode" component={PromoCode} />
          <Stack.Screen name="CarsByPerish4" component={CarsByPerish4} />

          <Stack.Screen name="SubmitListing" component={SubmitListing} />
          <Stack.Screen name="ChangePassword" component={ChangePassword} />
          <Stack.Screen name="BankDetails" component={BankDetails} />

          <Stack.Screen name="ChangeNumber" component={ChangeNumber} />
          <Stack.Screen name="HowWorks" component={HowWorks} />
          <Stack.Screen name="Covered" component={Covered} />
          <Stack.Screen name="AboutCar1" component={AboutCar1} />
          <Stack.Screen name="Address" component={Address} />
          <Stack.Screen name="MapScreen" component={MapScreen} />
          <Stack.Screen name="Car" component={Car} />
          <Stack.Screen name="ScanVin" component={ScanVin} />
          <Stack.Screen name="TypeVin" component={TypeVin} />
          <Stack.Screen name="VerifyStripe" component={VerifyStripe} />
          <Stack.Screen name="Verified" component={Verified} />
          <Stack.Screen name="DirectDeposit" component={DirectDeposit} />
          <Stack.Screen name="Trips" component={Trips} />
          <Stack.Screen name="LoginSplash" component={LoginSplash} />
          <Stack.Screen name="VerifyEmail" component={VerifyEmail} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="LetsIn" component={LetsIn} />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="ForgotPass" component={ForgotPassword} />
          <Stack.Screen name="PasswordOtp" component={PasswordOtp} />
          <Stack.Screen name="CreatePassword" component={CreatePassword} />
          <Stack.Screen name="GotBack" component={GotBack} />
          <Stack.Screen name="HowRydeWorks" component={HowRydeWorks} />
          <Stack.Screen name="Legal" component={Legal} />
          <Stack.Screen name="ContactSupport" component={ContactSupport} />
          <Stack.Screen name="TripHistory" component={TripHistory} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  InternetConnectionView: {
    backgroundColor: Colors.darkBlack,
    width: "100%",
    marginTop: Measures.StatusBarHeight,
    minHeight: Measures.fontSize * 1.5,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    padding: Measures.unit,
  },
  InternetText: {
    color: Colors.white,
    fontFamily: FontStyle.urbanistBold.fontFamily,
    fontSize: Measures.fontSize / 1.3,
  },
  closeIcon: {
    width: Measures.fontSize,
    height: Measures.fontSize,
  },
  indicatorView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.white,
  },
});

export default AppNavigator;

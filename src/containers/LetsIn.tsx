import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Text,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Variables, Layout, FontStyle, CommonStyles } from "../Theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { goBack, navigate, replace } from "../navigators/RootNavigation";

import Header from "../components/Header";

import FacebookSvg from "../assets/Images/Social/Facebook.svg";
import AppleSvg from "../assets/Images/Social/Apple.svg";
import GoogleSvg from "../assets/Images/Social/Google.svg";
import BackSvg from "../assets/Images/BackArrow.svg";
import LoginModal from "../components/LoginModal";
import EmailSvg from "../assets/Images/EmailLogin.svg";
import GoogleBlackSvg from "../assets/Images/Social/GoogleBlack.svg";
import FacebookBlackSvg from "../assets/Images/Social/FacebookBlack.svg";
import AppleBlackSvg from "../assets/Images/Social/AppleBlack.svg";
import { GOOGLE_CLIENT_ID } from "../constants/constants";

import {
  Settings,
  LoginManager,
  Profile,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from "react-native-fbsdk-next";

import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import { useDispatch, useSelector } from "react-redux";
import {
  fbSignUpStart,
  googleSignUpStart,
  logOutResetAll,
} from "../actions/authActions";
import { ReducerStateProps } from "./Inbox/InterfaceProps";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { resendOtpStart } from "../actions/authActions";
import _ from "lodash";
import { FCM_TOKEN, alwaysBounceVertical } from "../constants/constants";
import messaging from "@react-native-firebase/messaging";
import { Measures } from "../Theme/variables";
import { RouteProp } from "@react-navigation/native";

interface LetsInProps {
  route: RouteProp<any, any>;
}

const LetsIn: React.FC<LetsInProps> = ({ route }) => {
  const dispatch = useDispatch();

  const headerName = route?.params?.header;

  const [loginFacebook, setLoginFacebook] = useState(false);
  const [loginGoogle, setLoginGoogle] = useState(false);
  const [loginApple, setLoginApple] = useState(false);
  const [fcmToken, setFCMToken] = useState("abc");
  const [update, setUpdate] = useState(false);

  const [clicked, setClicked] = useState(0);
  const [isLoading, loginData, resendOtpData, isGoogleLoading] = useSelector(
    (state: ReducerStateProps) => [
      state.auth.isLoading,
      state.auth.loginData,
      state.auth.resendOtpData,
      state.auth.isGoogleLoading,
    ]
  );
  useEffect(() => {
    if (_.get(resendOtpData, "success", null) && update) {
      navigate("VerifyEmail", { email: loginData?.user?.email });
      setUpdate(false);
    } else {
      GoogleSignin.configure({
        webClientId: GOOGLE_CLIENT_ID,
      });
      GoogleSignin.signOut(), GoogleSignin.revokeAccess();
      setUpdate(false);
    }
  }, [resendOtpData]);

  useEffect(() => {
    Settings.setAppID("639573274348296");
    Settings.initializeSDK();

    getFCMToken();
  }, []);

  const getFCMToken = async () => {
    messaging()
      .getToken()
      .then((fcmToken) => {
        setFCMToken(fcmToken);
        AsyncStorage.setItem(FCM_TOKEN, fcmToken);
      })
      .catch((error) => {
        let err = `FCm token get error${error}`;
        console.log(err);
      });
  };

  useEffect(() => {
    if (loginData) {
      if (loginData?.user?.isEmailVerified) {
        storeData(loginData);
      } else {
        dispatch(
          resendOtpStart({
            email: loginData?.user?.email,
            action: "EmailConfirmation",
          })
        );
        setUpdate(true);
      }
    }
  }, [loginData]);

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

  const googleLogin = async () => {
    await GoogleSignin.configure({
      webClientId: GOOGLE_CLIENT_ID,
    });
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      if (userInfo) {
        let params = {
          token: userInfo.idToken,
          deviceToken: fcmToken,
          deviceType: Platform.OS === "ios" ? "ios" : "android",
        };
        dispatch(googleSignUpStart(params));
      }
    } catch (error: any) {
      console.log("error", error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("error code 1", error.code);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log("error code 2", error.code);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log("error code 3", error.code);
      } else {
        console.log("error 4", error);
      }
    }
  };

  const fbLogin = () => {
    LoginManager.logInWithPermissions(["public_profile", "email"]).then(
      (result) => {
        if (result.isCancelled) {
          console.log("login is cancelled.");
        } else {
          result.grantedPermissions.toString();
          AccessToken.getCurrentAccessToken().then((currentProfile) => {
            console.log(currentProfile.accessToken.toString());
            // infRequest();
            if (currentProfile?.accessToken) {
              let params = {
                token: currentProfile?.accessToken,
                deviceToken: fcmToken,
                deviceType: Platform.OS === "ios" ? "ios" : "android",
              };
              dispatch(fbSignUpStart(params));
            }
          });
        }
      },
      function (error) {
        console.log("Login fail with error: " + error);
      }
    );
  };

  const infRequest = () => {
    const infoRequest = new GraphRequest(
      "/me?fields=name,email,picture.type(large)",
      null,
      callback
    );
    new GraphRequestManager().addRequest(infoRequest).start();
  };

  const callback = (error: string | any, data: string | any) => {
    console.log(data, error);
    if (error) {
      // Alert.alert(t("toastConst.errorFetchingData") + error.toString());
    } else {
      // if (data) {
      //   let firstName = _.get("", "name", data).split(" ")[0];
      //   let lastName = _.get("", "name", data).split(" ")[1];
      //   let params = {
      //     role_id: "2",
      //     first_name: firstName,
      //     last_name: lastName,
      //     email: _.get(data, "email", null),
      //     sso_facebook: "facebook",
      //     app_id: "1",
      //     client_name: "chrome",
      //     lang: "en",
      //   };
      // } else {
      //   Alert.alert(t("toastConst.infoNotFound"));
      // }
    }
  };

  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={{ height: "100%" }} bounces={alwaysBounceVertical}>
          <Header
            leftSvg={<BackSvg height={26} width={26} />}
            onLeftPress={goBack}
            centerText={headerName}
          />
          <View style={Layout.center}>
            {/* <TouchableOpacity
              style={[
                clicked === 1 ? styles.selectedView : styles.googleBtnView,
              ]}
              onPress={() => {
                setLoginApple(!loginApple), setClicked(1);
              }}
            >
              <View style={Layout.rowCenter}>
                {clicked === 1 ? (
                  <AppleBlackSvg width={22} height={22} />
                ) : (
                  <AppleSvg width={22} height={22} />
                )}
                <Text
                  style={[
                    styles.signInTxt,
                    {
                      color:
                        clicked === 1
                          ? Variables.Colors.darkBlack
                          : Variables.Colors.white,
                    },
                    FontStyle.urbanistBold,
                  ]}
                >
                  {t("labelConst.continueApple")}
                </Text>
              </View>
            </TouchableOpacity> */}
            <TouchableOpacity
              style={[
                clicked === 2 ? styles.selectedView : styles.googleBtnView,
              ]}
              onPress={() => {
                setLoginGoogle(!loginGoogle), setClicked(2);
              }}
            >
              {isGoogleLoading ? (
                <ActivityIndicator
                  style={{ position: "absolute", right: 0, left: 0 }}
                  color={Variables.Colors.darkYellow}
                  animating={isGoogleLoading}
                />
              ) : (
                <View style={Layout.rowCenter}>
                  {clicked === 2 ? (
                    <GoogleBlackSvg width={22} height={22} />
                  ) : (
                    <GoogleSvg width={22} height={22} />
                  )}
                  <Text
                    style={[
                      styles.signInTxt,
                      {
                        color:
                          clicked === 2
                            ? Variables.Colors.darkBlack
                            : Variables.Colors.white,
                      },
                      FontStyle.urbanistBold,
                      CommonStyles.descCommonTxt,
                    ]}
                  >
                    {t("labelConst.continueGoogle")}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                clicked === 3 ? styles.selectedView : styles.googleBtnView,
              ]}
              onPress={() => {
                setLoginFacebook(!loginFacebook), setClicked(3);
              }}
            >
              {isLoading ? (
                <ActivityIndicator
                  style={{ position: "absolute", right: 0, left: 0 }}
                  color={Variables.Colors.darkYellow}
                  animating={isLoading}
                />
              ) : (
                <View style={Layout.rowCenter}>
                  {clicked === 3 ? (
                    <FacebookBlackSvg width={22} height={22} />
                  ) : (
                    <FacebookSvg width={22} height={22} />
                  )}
                  <Text
                    style={[
                      styles.signInTxt,
                      {
                        color:
                          clicked === 3
                            ? Variables.Colors.darkBlack
                            : Variables.Colors.white,
                      },
                      FontStyle.urbanistBold,
                      CommonStyles.descCommonTxt,
                    ]}
                  >
                    {t("labelConst.continueFacebook")}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.googleBtnView}
              onPress={() => {
                headerName === "Log in"
                  ? navigate("SignIn")
                  : navigate("SignUp");
              }}
            >
              <View style={Layout.rowCenter}>
                <EmailSvg width={22} height={22} />
                <Text
                  style={[
                    styles.signInTxt,
                    {
                      color: Variables.Colors.white,
                    },
                    FontStyle.urbanistBold,
                    CommonStyles.descCommonTxt,
                  ]}
                >
                  Continue with Email
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <LoginModal
            modalVisible={loginApple}
            onOkPress={() => {
              setLoginApple(!loginApple), setClicked(0);
            }}
            onCancelPress={() => {
              setLoginApple(!loginApple), setClicked(0);
            }}
            headerTxt={'"RydeJa" Wants to Use "Apple.com" to Sign In'}
            descTxt={
              "This allows the app and website to share information about you"
            }
            okTxt={"Continue"}
            cancelTxt="Cancel"
          />
          <LoginModal
            modalVisible={loginGoogle}
            onCancelPress={() => {
              setLoginGoogle(!loginGoogle), setClicked(0);
            }}
            onOkPress={() => {
              setLoginGoogle(!loginGoogle), setClicked(0), googleLogin();
            }}
            headerTxt={'"RydeJa" Wants to Use "Google.com" to Sign In'}
            descTxt={
              "This allows the app and website to share information about you"
            }
            okTxt={"Continue"}
            cancelTxt="Cancel"
          />
          <LoginModal
            modalVisible={loginFacebook}
            onCancelPress={() => {
              setLoginFacebook(!loginFacebook), setClicked(0);
            }}
            onOkPress={() => {
              setLoginFacebook(!loginFacebook), setClicked(0), fbLogin();
            }}
            headerTxt={'"RydeJa" Wants to Use "Facebook.com" to Sign In'}
            descTxt={
              "This allows the app and website to share information about you"
            }
            okTxt={"Continue"}
            cancelTxt="Cancel"
          />
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};
const styles = StyleSheet.create({
  nextTxt: {
    color: Variables.Colors.blackBg,
    fontSize: Variables.Measures.unit * 2,
  },
  letsInTxt: {
    color: Variables.Colors.white,
    marginTop: Variables.Measures.fontSize / 2,
    fontSize: Variables.Measures.fontSize * 1.8,
  },
  container: {
    backgroundColor: Variables.Colors.blackBg,
    flex: 1,
  },
  selectedView: {
    width: "90%",
    alignSelf: "center",
    height: Variables.Measures.fontSize * 2.5,
    backgroundColor: Variables.Colors.darkYellow,
    borderRadius: 16,
    alignItems: "center",
    paddingLeft: Measures.width / 5,

    // justifyContent: "center",
    flexDirection: "row",
    marginTop: Variables.Measures.unit * 1.2,
  },
  googleBtnView: {
    width: "90%",
    alignSelf: "center",
    height: Variables.Measures.fontSize * 2.5,
    backgroundColor: Variables.Colors.darkBlack,
    borderRadius: 16,
    borderColor: "rgba(53, 56, 63, 1)",
    borderWidth: 1.5,
    alignItems: "center",
    paddingLeft: Measures.width / 5,
    // justifyContent: "center",
    flexDirection: "row",
    marginTop: Variables.Measures.unit * 1.2,
  },
  signInTxt: {
    marginLeft: Variables.Measures.unit,
    fontSize: Variables.Measures.fontSize / 1.4,
    fontFamily: "Urbanist-SemiBold",
  },
});
export default LetsIn;

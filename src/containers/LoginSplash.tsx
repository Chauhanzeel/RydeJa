import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import { Variables, FontStyle, CommonStyles } from "../Theme";
import images from "../Theme/images";

import Logo from "../assets/Images/RydeJaLogo.svg";
import CloseSvg from "../assets/Images/Close.svg";
import { navigate, replace } from "../navigators/RootNavigation";
import { RouteProp } from "@react-navigation/native";
import { alwaysBounceVertical } from "../constants/constants";

interface CancelProps {
  route: RouteProp<any, any>;
}

const LoginSplash: React.FC<CancelProps> = ({ route }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.safeAreaStyle}>
      <StatusBar
        backgroundColor="transparent"
        barStyle="light-content"
        translucent
      />
      <ScrollView style={{ flex: 1 }} bounces={alwaysBounceVertical}>
        <ImageBackground
          style={{
            height: Variables.Measures.height,
            width: Variables.Measures.width,
          }}
          // resizeMode={"contain"}
          source={images.carBgImg}
        >
          <View style={{ flex: 1, margin: 10 }}>
            <TouchableOpacity
              style={{ marginTop: Variables.Measures.StatusBarHeight }}
              onPress={() => replace("TabNavigations", { navigationfrom: 0 })}
            >
              <CloseSvg />
            </TouchableOpacity>
            <View style={{ alignItems: "center", marginTop: 50 }}>
              <Logo
                height={Variables.Measures.width / 2.5}
                width={Variables.Measures.width / 2}
              />
              <Text style={[FontStyle.urbanistBold, styles.letsRydeTxt]}>
                Let's Ryde
              </Text>
            </View>
            <View
              style={{
                position: "absolute",
                bottom: 20,
                width: "98%",
                alignSelf: "center",
              }}
            >
              <TouchableOpacity
                style={styles.signUpView}
                onPress={() => navigate("LetsIn", { header: "Sign up" })}
              >
                <Text
                  style={[
                    FontStyle.urbanistBold,
                    CommonStyles.smallCommonTxt,
                    styles.signUpTxt,
                  ]}
                >
                  Sign up
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.loginView}
                onPress={() => navigate("LetsIn", { header: "Log in" })}
              >
                <Text
                  style={[
                    FontStyle.urbanistBold,
                    CommonStyles.smallCommonTxt,
                    styles.loginTxt,
                  ]}
                >
                  Log in
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  safeAreaStyle: {
    flex: 1,
    backgroundColor: Variables.Colors.darkBlack,
  },
  letsRydeTxt: {
    color: Variables.Colors.white,
    fontSize: 55,
    textShadowColor: Variables.Colors.blackOpac70,
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  },
  signUpTxt: {
    color: Variables.Colors.darkBlack,
  },
  loginTxt: {
    color: Variables.Colors.darkYellow,
  },
  signUpView: {
    height: 40,
    width: "100%",
    alignSelf: "center",
    backgroundColor: Variables.Colors.darkYellow,
    marginTop: Variables.Measures.height / 4.2,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  loginView: {
    height: 45,
    width: "100%",
    alignSelf: "center",
    backgroundColor: Variables.Colors.darkBlack,
    marginTop: Variables.Measures.fontSize / 1.5,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LoginSplash;

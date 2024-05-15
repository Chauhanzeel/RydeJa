import React, { useEffect } from "react";
import { CommonStyles, FontStyle, Images, Variables } from "../../Theme";
import {
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { useTranslation } from "react-i18next";
import { goBack, navigate } from "../../navigators/RootNavigation";

import BackSvg from "../../assets/Images/Close.svg";

import ButtonView from "../../components/ButtonView";
import BlurViewUI from "../../components/BlurView";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RouteProp } from "@react-navigation/native";

interface CreateProfileProps {
  route?: RouteProp<any, any>;
}

const EligibleCar: React.FC<CreateProfileProps> = ({ route }) => {
  const { t } = useTranslation();

  return (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor="rgb(44,42,38)" />
      <ScrollView style={styles.scrollViewStyle}>
        <TouchableOpacity style={styles.headerView} onPress={goBack}>
          <BackSvg height={25} width={25} />
        </TouchableOpacity>
        <View
          style={{
            height: Variables.Measures.width / 3,
            backgroundColor: "red",
          }}
        >
          <Image source={Images.carBg2} style={styles.imageView} />
        </View>
        <View style={styles.container}>
          <View
            style={{
              marginTop: Variables.Measures.fontSize * 2,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              style={[
                FontStyle.urbanistBold,
                CommonStyles.headingCommonTxt,
                styles.carTxt,
              ]}
            >
              Your car is now eligible
            </Text>
            <Text
              style={[
                FontStyle.urbanistMedium,
                styles.subHeadingTxt,
                CommonStyles.descCommonTxt,
              ]}
            >
              We need more information to set up your car's listing.
            </Text>
          </View>
        </View>
      </ScrollView>
      <BlurViewUI Type="dark" />
      <View style={styles.btnView}>
        <ButtonView
          btnTxt={t("labelConst.continueTxt")}
          onBtnPress={() => {
            navigate("Questions");
          }}
          width={Variables.Measures.width / 1.09}
          backgroundColor={Variables.Colors.yellow}
          fontColor={Variables.Colors.darkBlack}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerView: {
    position: "absolute",
    top: Variables.Measures.StatusBarHeight + 20,
    left: 20,
    zIndex: 1000,
  },
  statusBarStyle: {
    height: 35,
    backgroundColor: Variables.Colors.statusBarColor,
  },
  scrollViewStyle: {
    flex: 1,
    height: "100%",
    backgroundColor: Variables.Colors.darkBlack,
  },
  btnView: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
  },
  imageView: {
    width: "100%",
    height: Variables.Measures.width * 2,
    alignSelf: "center",
    position: "absolute",
  },
  carTxt: {
    color: Variables.Colors.darkYellow,
  },
  subHeadingTxt: {
    marginVertical: Variables.Measures.fontSize,
    width: "90%",
    textAlign: "center",
  },
  container: {
    width: "100%",
    flex: 1,
    marginTop: Variables.Measures.width / 1.5,
  },
});

export default EligibleCar;

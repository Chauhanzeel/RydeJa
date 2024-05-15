import React, { useRef } from "react";
import { CommonStyles, FontStyle, Images, Variables } from "../../Theme";
import {
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useTranslation } from "react-i18next";
import { goBack, navigate } from "../../navigators/RootNavigation";

import CloseSvg from "../../assets/Images/CloseSvg.svg";

import ButtonView from "../../components/ButtonView";
import { RouteProp } from "@react-navigation/native";
import { Colors } from "../../Theme/variables";
import BlurViewUI from "../../components/BlurView";

interface CreateProfileProps {
  route?: RouteProp<any, any>;
}

const AddPhoto: React.FC<CreateProfileProps> = ({ route }) => {
  const { t } = useTranslation();
  const carData = route?.params?.carData;

  return (
    <>
      {/* <StatusBar barStyle="light-content" /> */}
      {Platform.OS == "ios" ? (
        <StatusBar
          translucent
          barStyle="light-content"
          animated={true}
          backgroundColor="transparent"
        />
      ) : (
        <StatusBar
          translucent
          barStyle="light-content"
          animated={true}
          backgroundColor={Variables.Colors.blackOpac85}
        />
      )}
      {/* <View style={styles.statusBarStyle} /> */}
      <ScrollView style={styles.scrollViewStyle}>
        <TouchableOpacity style={styles.headerView} onPress={goBack}>
          <CloseSvg height={25} width={25} />
        </TouchableOpacity>
        <View
          style={{
            height: Variables.Measures.width / Variables.MetricsSizes.small,
          }}
        >
          <Image source={Images.carBg3} style={styles.imageView} />
        </View>
        <View style={styles.container}>
          <View style={styles.addPhoto}>
            <Text
              style={[
                FontStyle.urbanistBold,
                CommonStyles.titleCommonTxt,
                { color: Colors.darkYellow },
              ]}
            >
              Now add some photos
            </Text>
            <View style={{ width: "85%", alignSelf: "center" }}>
              <Text
                style={[
                  FontStyle.urbanistMedium,
                  styles.subHeadingTxt,
                  CommonStyles.descCommonTxt,
                ]}
              >
                Boosting your earnings is within reach when you tap into the
                magic of outstanding photos. We're here to help you capture
                stunning shots and enhance your income potential.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <BlurViewUI Type="light" />
      <View style={styles.btnView}>
        <ButtonView
          btnTxt={t("labelConst.continueTxt")}
          onBtnPress={() => {
            navigate("ReadyPhoto", { caarData: carData });
          }}
          width={Variables.Measures.width / 1.09}
          backgroundColor={Variables.Colors.yellow}
          fontColor={Variables.Colors.darkBlack}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  addPhoto: {
    marginTop: Variables.Measures.fontSize * 2,
    alignItems: "center",
    justifyContent: "center",
  },
  headerView: {
    position: "absolute",
    top: 50,
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
    height: Variables.Measures.height / 1.3,
    // alignSelf: "center",
    // position: "absolute",
  },
  carTxt: {
    color: Variables.Colors.darkYellow,
    fontSize: 24,
  },
  subHeadingTxt: {
    color: Variables.Colors.white,
    fontSize: 14,
    marginVertical: Variables.Measures.fontSize,
    lineHeight: 22,
    alignSelf: "center",
    textAlign: "justify",
  },
  container: {
    width: "100%",
    flex: 1,
    marginTop: Variables.Measures.width / 1.5,
  },
});

export default AddPhoto;

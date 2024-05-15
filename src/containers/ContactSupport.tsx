import React from "react";
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { FontStyle, Variables, Images, CommonStyles } from "../Theme";
import { useTranslation } from "react-i18next";
import LinearGradient from "react-native-linear-gradient";
import DashedLine from "react-native-dashed-line";

import CloseSvg from "../assets/Images/Close.svg";
import Header from "../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { goBack } from "../navigators/RootNavigation";
import ContactSvg from "../assets/Images/Contact.svg";

interface HostProps {
  // onClick: (val: number) => void;
}

const ContactSupport: React.FC<HostProps> = () =>
  // { onClick }
  {
    const { t } = useTranslation();

    const { height } = Image.resolveAssetSource(Images.User12);

    return (
      <SafeAreaView style={{ backgroundColor: Variables.Colors.darkBlack }}>
        {/* <StatusBar
          // translucent
          backgroundColor={Variables.Colors.white}
          barStyle="light-content"
        /> */}

        <ScrollView>
          <View
            style={{
              marginBottom: 25,
              width: Variables.Measures.width,
            }}
          >
            <Header
              leftSvg={<CloseSvg />}
              onLeftPress={() => {
                goBack();
              }}
            />
            {/* <TouchableOpacity
              // onPress={() => onClick(9)}
              style={styles.closeBtn}
            >
              <CloseSvg />
            </TouchableOpacity> */}

            <Image
              source={Images.User12}
              style={styles.imageStyle}
              // resizeMode="cover"
            />

            <View style={[styles.outerView]}>
              <View style={styles.rowView}>
                <View style={{ width: "13%" }}>
                  <ContactSvg />
                </View>
                <Text
                  style={[FontStyle.urbanistBold, CommonStyles.titleCommonTxt]}
                >
                  Contact Support
                </Text>
              </View>
              <View
                style={{
                  marginTop: 15,
                }}
              >
                <DashedLine
                  dashLength={6}
                  dashColor={Variables.Colors.borderGrey}
                />
              </View>
              <View style={styles.subTitleView}>
                <Text
                  style={[
                    FontStyle.urbanistBold,
                    CommonStyles.smallCommonTxt,
                    { marginBottom: 5 },
                  ]}
                >
                  Subtitle 1
                </Text>
                <Text
                  style={[
                    FontStyle.urbanistRegular,
                    CommonStyles.descCommonTxtOnly,
                    CommonStyles.justifyText,
                  ]}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </Text>
              </View>
              <View style={styles.subTitleView}>
                <Text
                  style={[
                    FontStyle.urbanistBold,
                    CommonStyles.smallCommonTxt,
                    { marginBottom: 5 },
                  ]}
                >
                  Subtitle 2
                </Text>
                <Text
                  style={[
                    FontStyle.urbanistRegular,
                    CommonStyles.descCommonTxtOnly,
                    CommonStyles.justifyText,
                  ]}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </Text>
              </View>
              <View style={styles.subTitleView}>
                <Text
                  style={[
                    FontStyle.urbanistBold,
                    CommonStyles.smallCommonTxt,
                    { marginBottom: 5 },
                  ]}
                >
                  Subtitle 3
                </Text>
                <Text
                  style={[
                    FontStyle.urbanistRegular,
                    CommonStyles.descCommonTxtOnly,
                    CommonStyles.justifyText,
                  ]}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </Text>
              </View>
              <View style={styles.subTitleView}>
                <Text
                  style={[
                    FontStyle.urbanistBold,
                    CommonStyles.smallCommonTxt,
                    { marginBottom: 5 },
                  ]}
                >
                  Subtitle 4
                </Text>
                <Text
                  style={[
                    FontStyle.urbanistRegular,
                    CommonStyles.descCommonTxtOnly,
                    CommonStyles.justifyText,
                  ]}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };

const styles = StyleSheet.create({
  closeBtn: {
    // margin: 27,
    // height: 50,
    // marginTop: 20,
    // top: 10,
  },
  imageStyle: {
    width: Variables.Measures.width,
    height: Variables.Measures.width / 1.8,
  },
  rowView: {
    marginTop: Variables.Measures.unit * 2.5,
    flexDirection: "row",
  },
  headingTxt: {
    color: Variables.Colors.white,
    fontSize: Variables.Measures.fontSize / 1.3,
    marginTop: 5,
  },
  subTitleTxt: {
    fontSize: Variables.Measures.fontSize / 1.6,
    color: Variables.Colors.white,
  },
  subTitleView: {
    marginTop: Variables.Measures.unit * 2,
    alignSelf: "center",
  },
  outerView: {
    width: "95%",
    alignSelf: "center",
  },
});

export default ContactSupport;

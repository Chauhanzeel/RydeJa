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
import { FontStyle, Variables, Images, CommonStyles } from "../../Theme";
import { useTranslation } from "react-i18next";
import DashedLine from "react-native-dashed-line";
import ShieldSvg from "../../assets/Images/Shield.svg";
import CloseSvg from "../../assets/Images/Close.svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { goBack } from "../../navigators/RootNavigation";

interface HostProps {
  // onClick: (val: number) => void;
}

const Covered: React.FC<HostProps> = () =>
  // { onClick }
  {
    const { t } = useTranslation();

    const { height } = Image.resolveAssetSource(Images.User12);

    return (
      <SafeAreaView style={{ backgroundColor: Variables.Colors.darkBlack }}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={Variables.Colors.blackBg}
        />

        <ScrollView>
          <View
            style={{
              flex: 1,
              marginBottom: 25,
            }}
          >
            <TouchableOpacity
              onPress={() =>
                //   onClick(9)
                goBack()
              }
              style={styles.closeBtn}
            >
              <CloseSvg />
            </TouchableOpacity>
            <Image
              source={Images.userImg9}
              style={styles.imageStyle}
              resizeMode="cover"
            />

            <View style={[styles.outerView]}>
              <View style={styles.rowView}>
                <View style={{ width: "13%" }}>
                  <ShieldSvg />
                </View>
                <Text
                  style={[FontStyle.urbanistBold, CommonStyles.titleCommonTxt]}
                >
                  You are covered
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
    margin: 27,
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

export default Covered;

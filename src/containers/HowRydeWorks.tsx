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
import HowWorksSvg from "../assets/Images/Gear.svg";
import Header from "../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { goBack } from "../navigators/RootNavigation";

interface HostProps {
  // onClick: (val: number) => void;
}

const HowRydeWorks: React.FC<HostProps> = () =>
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
                  <HowWorksSvg />
                </View>
                <Text
                  style={[
                    FontStyle.urbanistBold,
                    CommonStyles.titleCommonTxt,
                    { marginBottom: 5 },
                  ]}
                >
                  How Ryde works
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
                  Start by making an account
                </Text>
                <Text
                  style={[
                    FontStyle.urbanistRegular,
                    CommonStyles.descCommonTxtOnly,
                    CommonStyles.justifyText,
                    { marginVertical: 20 },
                  ]}
                >
                  {`Go to your Account page and complete the steps to get approved to drive
                  \nAll guests have to be approved to drive before they can book a trip
                  \nExpect verification to take at least 1 business day (this can be longer if we need more information or photos)
                  \nYour approval status can be viewed on your Account page`}
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
                  Once you’ve been approved to Ryde, you’re ready to reserve the
                  perfect Ryde
                </Text>
                <Text
                  style={[
                    FontStyle.urbanistRegular,
                    CommonStyles.descCommonTxtOnly,
                    CommonStyles.justifyText,
                    // styles.mt,
                    { marginVertical: 20 },
                  ]}
                >
                  {`Choose your location and search for a car; you can change trip dates and times to suit your plans
                  \nYou can filter by type of vehicle`}
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
                  Check listings for badges or listing types
                </Text>
                <Text
                  style={[
                    FontStyle.urbanistRegular,
                    CommonStyles.descCommonTxtOnly,
                    CommonStyles.justifyText,
                    // styles.mt,
                    { marginVertical: 20 },
                  ]}
                >
                  {`Vehicles labeled “Book instantly” are vehicles available without waiting for the host to accept your trip request
                  \nVehicles labeled “All-Star Host” are managed by best-performing, top-quality host who have the highest ratings and fastest response times`}
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
                  Read the listing for full vehicle descriptions and associated
                  guidelines, FAQs, or additional instructions;
                </Text>
                <Text
                  style={[
                    FontStyle.urbanistRegular,
                    CommonStyles.descCommonTxtOnly,
                    CommonStyles.justifyText,
                    // styles.mt,
                    { marginVertical: 20 },
                  ]}
                >
                  {`You can’t message a host without submitting a trip request, but you might find your answer in the listing. When you’ve found the perfect Ryde, submit a trip request or book immediately if its “Book instantly” vehicleChoose the start and end dates of your trip; your trip’s cost is based on the trip’s length`}
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
                  You can only book or request to book one car at a time
                </Text>
                <Text
                  style={[
                    FontStyle.urbanistRegular,
                    CommonStyles.descCommonTxtOnly,
                    CommonStyles.justifyText,
                    // styles.mt,
                    { marginVertical: 20 },
                  ]}
                >
                  {`You can’t submit a request or booking for a trip which overlaps with any dates already booked or requested
                  \nChoose the vehicle location that you need
                  \nThis is where you’ll pick up and return the car
                  \nHosts may charge a fee for pick-up and return locations outside of their vehicle’s home location
                  \nReview the entire breakdown of costs for your trip before booking or submitting your request to book
                  \nRemember that you can cancel for free within our free cancellation period; see our Cancellation policy`}
                </Text>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };

const styles = StyleSheet.create({
  mt: { marginTop: Variables.MetricsSizes.small },
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
    alignSelf: "flex-start",
  },
  outerView: {
    width: "95%",
    alignSelf: "center",
  },
});

export default HowRydeWorks;

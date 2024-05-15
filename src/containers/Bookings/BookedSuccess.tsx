import React from "react";
import { CommonStyles, FontStyle, Layout, Variables } from "../../Theme";
import {
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  Text,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { goBack, navigate, replace } from "../../navigators/RootNavigation";

import Header from "../../components/Header";
import ButtonView from "../../components/ButtonView";

import CloseSvg from "../../assets/Images/Close.svg";
import { GetApprovedProps } from "../Inbox/InterfaceProps";
import { Colors, Measures } from "../../Theme/variables";
import _ from "lodash";

export interface ImageProps {
  didCancel?: string;
  errorCode?: string;
  errorMessage?: string;
  path: string;
  height?: number;
  mime?: string;
  size?: number;
  width?: number;
}

const Extras: React.FC<GetApprovedProps> = ({ route }) => {
  const rentalCarObj = route.params?.rentalCarObj;

  return (
    <SafeAreaView style={CommonStyles.safeAreaStyle}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.blackBg} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView style={{ flex: 1 }}>
          <Header
            leftSvg={<CloseSvg height={25} width={25} />}
            onLeftPress={() => {
              // goBack()
              navigate("TabNavigations", { navigationfrom: 2 });
            }}
          />
          <View
            style={{
              alignSelf: "center",
            }}
          >
            <Image
              style={styles.img}
              source={require("../../assets/Images/Booked/img_tripbooked.png")}
            />
          </View>
          <View style={styles.bookedTextView}>
            <Text style={[FontStyle.urbanistBold, styles.headingTxt]}>
              Your reservation is complete.
            </Text>
            <Text style={[FontStyle.urbanistRegular, styles.profileDescTxt]}>
              Ready to roll? Don't forget! 🚗✨
            </Text>
          </View>

          <View style={styles.cardView}>
            <View style={Layout.row}>
              <View style={styles.pointView}>
                <View style={styles.leftPointView} />
              </View>
              <View style={styles.rightDescView}>
                <Text style={[FontStyle.urbanistMedium, styles.boxDescTxt]}>
                  As the primary driver, please ensure you have your valid
                  driver's license to pick up the car.
                </Text>
              </View>
            </View>
            <View style={Layout.row}>
              <View style={styles.pointView}>
                <View style={styles.leftPointView} />
              </View>
              <View style={styles.rightDescView}>
                <Text style={[FontStyle.urbanistMedium, styles.boxDescTxt]}>
                  Your license must remain valid for the entirety of the trip.
                </Text>
              </View>
            </View>
            <View style={Layout.row}>
              <View style={styles.pointView}>
                <View style={styles.leftPointView} />
              </View>
              <View style={styles.rightDescView}>
                <Text style={[FontStyle.urbanistMedium, styles.boxDescTxt]}>
                  Additionally, kindly use the Rydeja mobile app for a seamless
                  check-in. Thank you for your cooperation and safe travels!
                </Text>
              </View>
            </View>
          </View>

          <View style={{ width: "93%", alignSelf: "center" }}>
            <Text
              style={[
                FontStyle.urbanistBold,
                styles.headingTxt,
                { fontSize: 15 },
              ]}
            >
              Final steps
            </Text>
            <Text style={[FontStyle.urbanistMedium, styles.profileDescTxt]}>
              Now message your host and arrange a pick location.
            </Text>
            <View style={{ marginVertical: Variables.Measures.fontSize * 2.5 }}>
              <ButtonView
                btnTxt={"Message your host"}
                onBtnPress={() => {
                  replace("ChatScreen", {
                    userData: {
                      userId: rentalCarObj?.id
                        ? _.get(rentalCarObj, "carOwner.id", null)
                        : _.get(rentalCarObj, "carViewData.carOwner.id", null),
                      phoneNumber: rentalCarObj?.id
                        ? _.get(rentalCarObj, "carOwner.phoneNumber", null)
                        : _.get(
                            rentalCarObj,
                            "carViewData.carOwner.phoneNumber",
                            null
                          ),
                      profilePicture: null,
                      fullName: rentalCarObj?.id
                        ? _.get(rentalCarObj, "carOwner.fullName", null)
                        : _.get(
                            rentalCarObj,
                            "carViewData.carOwner.fullName",
                            null
                          ),
                    },
                    status: route?.params?.status,
                  });
                }}
                width={Variables.Measures.width / 2}
                backgroundColor={Variables.Colors.yellow}
                fontColor={Variables.Colors.blackBg}
              />
              <TouchableOpacity
                onPress={() =>
                  navigate("TabNavigations", { navigationfrom: 2 })
                }
                style={styles.bookBtn}
              >
                <Text
                  style={[
                    FontStyle.urbanistBold,
                    styles.headingTxt,
                    {
                      fontSize: Variables.MetricsSizes.regular,
                      color: Colors.yellow,
                    },
                  ]}
                >
                  Go to Booking
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  pointsDescTxt: {
    fontSize: Variables.Measures.fontSize / 1.6,
    color: Variables.Colors.white,
    marginBottom: 15,
    lineHeight: 20,
  },
  rightDescView: {
    width: "90%",
  },
  leftPointView: {
    height: 8,
    width: 8,
    borderRadius: 8,
    backgroundColor: Variables.Colors.inputTxtColor,
  },
  pointView: {
    width: "5%",
    marginLeft: 2,
    marginTop: 5,
  },
  bookBtn: {
    marginVertical: 20,
    alignSelf: "center",
  },
  dotText: {
    width: 8,
    height: 8,
    borderRadius: 10,
    marginRight: 5,
    backgroundColor: Colors.inputTxtColor,
  },
  img: {
    width: Measures.width,
    height: Measures.width / 2,
    resizeMode: "center",
    alignSelf: "center",
  },
  bookedTextView: {
    width: "93%",
    alignSelf: "center",
    marginTop: Measures.fontSize,
  },
  inputTitleTxt: {
    color: Variables.Colors.inputTxtColor,
    fontSize: 12,
    marginTop: Variables.Measures.fontSize / 1.3,
  },
  inputView: {
    width: "100%",
    backgroundColor: Variables.Colors.carGrey,
    height: 50,
    alignSelf: "center",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginTop: 10,
    color: Variables.Colors.white,
  },
  headingTxt: {
    fontSize: Variables.Measures.fontSize * 1.3,
    color: Variables.Colors.white,
  },
  profileDescTxt: {
    fontSize: Variables.Measures.fontSize / 1.6,
    color: Variables.Colors.white,
    marginVertical: 5,
    lineHeight: 22,
  },
  changePicTxt: {
    fontSize: Variables.Measures.fontSize / 1.3,
    color: Variables.Colors.white,
  },
  changeProfileBtn: {
    width: "100%",
    alignSelf: "center",
    backgroundColor: Variables.Colors.greyBg,
    height: 55,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  stepToBook: {
    flexDirection: "row",
    marginVertical: Measures.fontSize,
    width: "93%",
    alignSelf: "center",
    justifyContent: "space-between",
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.grey,
    height: 50,
    alignItems: "center",
  },
  boxDescTxt: {
    fontSize: Variables.Measures.fontSize / 1.8,
    color: Variables.Colors.chocolate,
    lineHeight: 22,
  },
  cardView: {
    flexDirection: "column",
    marginVertical: Measures.fontSize / 1.8,
    marginHorizontal: 20,
    backgroundColor: Colors.carGrey,
    maxHeight: 200,
    padding: 15,
    borderRadius: 6,
  },
});

export default Extras;

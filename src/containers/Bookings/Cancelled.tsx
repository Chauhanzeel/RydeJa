import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { FontStyle, Variables, Images } from "../../Theme";
import { useTranslation } from "react-i18next";

import LocationGrey from "../../assets/Images/LocationGrey.svg";
import ClockSvg from "../../assets/Images/Time.svg";
import WalletGrey from "../../assets/Images/TabBarIcons/WalletGrey.svg";
import Vector from "../../assets/Images/Vector.svg";
import LocationSvg from "../../assets/Images/ModalIcons/NotificationLocation.svg";

interface CancelledProps {}

const Cancelled: React.FC<CancelledProps> = () => {
  const { t } = useTranslation();

  const [showDesc, setShowDesc] = useState(false);

  return (
    <>
      <StatusBar
        translucent
        backgroundColor={Variables.Colors.blackBg}
        barStyle="light-content"
      />
      <ScrollView style={{ height: "90%" }}>
        <View style={styles.outerView}>
          <View style={styles.cardView}>
            <View style={styles.cardInnerAlign}>
              <View style={styles.rowView}>
                <View style={styles.leftUserImg}>
                  <Image
                    source={Images.userImg2}
                    style={{ height: 50, width: 50 }}
                  />
                </View>
                <View style={styles.centerUserInfo}>
                  <Text style={[styles.nameTxt, FontStyle.urbanistBold]}>
                    Daniel Austin
                  </Text>
                  <Text style={[styles.carNameTxt, FontStyle.urbanistMedium]}>
                    Mercedes-Benz E-Cl..
                  </Text>
                </View>
                <View style={styles.rightStatus}>
                  <View style={styles.activeView}>
                    <Text
                      style={[styles.activeTxt, FontStyle.urbanistSemiBold]}
                    >
                      {t("labelConst.cancelled")}
                    </Text>
                  </View>
                  <Text
                    style={[styles.numPlateTxt, FontStyle.urbanistSemiBold]}
                  >
                    HSW 4736 XK
                  </Text>
                </View>
              </View>
              {showDesc && (
                <View>
                  <View style={styles.selectionView}>
                    <View style={[styles.innerDropDown]}>
                      <LocationGrey height={23} width={23} />
                      <Text style={[styles.kmTxt, FontStyle.urbanistSemiBold]}>
                        4.5 km
                      </Text>
                    </View>
                    <View style={styles.innerDropDown}>
                      <ClockSvg height={23} width={23} />
                      <Text style={[styles.kmTxt, FontStyle.urbanistSemiBold]}>
                        4 mins
                      </Text>
                    </View>
                    <View style={styles.innerDropDown}>
                      <WalletGrey height={23} width={23} />
                      <Text style={[styles.kmTxt, FontStyle.urbanistSemiBold]}>
                        $7.00
                      </Text>
                    </View>
                  </View>
                  <View style={styles.dateTimeView}>
                    <Text style={[styles.dateTxt, FontStyle.urbanistMedium]}>
                      {t("labelConst.dateAndTime")}
                    </Text>
                    <Text style={[styles.timeTxt, FontStyle.urbanistSemiBold]}>
                      Dec 20, 2024 | 10:00 AM
                    </Text>
                  </View>
                  <View>
                    <View style={{ flexDirection: "row", width: "100%" }}>
                      <View style={styles.leftDistanceView}>
                        <View style={styles.yellowCenter}>
                          <View style={styles.orangeInnerView}>
                            <Vector height={16} width={16} />
                          </View>
                        </View>
                      </View>
                      <View style={styles.centerDistanceView}>
                        <Text
                          style={[styles.currentLocTxt, FontStyle.urbanistBold]}
                        >
                          From
                        </Text>
                        <Text
                          style={[
                            styles.locationDetailsTxt,
                            FontStyle.urbanistMedium,
                          ]}
                        >
                          Address Information Details
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        width: "100%",
                      }}
                    >
                      <View style={styles.leftDistanceView}>
                        <View style={styles.yellowCenter}>
                          <View style={styles.orangeInnerView}>
                            <LocationSvg height={16} width={16} />
                          </View>
                        </View>
                      </View>
                      <View style={styles.centerDistanceView}>
                        <Text
                          style={[styles.currentLocTxt, FontStyle.urbanistBold]}
                        >
                          Destination
                        </Text>
                        <Text
                          style={[
                            styles.locationDetailsTxt,
                            FontStyle.urbanistMedium,
                          ]}
                        >
                          Address Information Details
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              )}
              <TouchableOpacity
                style={styles.arrowView}
                onPress={() => setShowDesc(!showDesc)}
              >
                <Image source={Images.downArrow} style={styles.arrowImg} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  cardView: {
    width: "100%",
    backgroundColor: Variables.Colors.greyBg,
    borderRadius: 15,
    marginTop: Variables.Measures.fontSize * 1.5,
  },
  cardInnerAlign: {
    width: "90%",
    alignSelf: "center",
    paddingVertical: 17,
    justifyContent: "center",
  },
  leftUserImg: {
    width: "20%",
  },
  centerUserInfo: {
    width: "50%",
    justifyContent: "center",
  },
  rightStatus: {
    width: "30%",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  rowView: {
    flexDirection: "row",
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: Variables.Colors.borderGrey,
    paddingBottom: 15,
  },
  nameTxt: {
    color: Variables.Colors.white,
    fontSize: 18,
  },
  carNameTxt: {
    color: Variables.Colors.locationGrey,
    fontSize: 12,
  },
  activeTxt: {
    color: Variables.Colors.white,
    fontSize: 9,
  },
  activeView: {
    backgroundColor: "rgba(247, 85, 85, 1)",
    width: "70%",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    height: 20,
    marginBottom: 5,
  },
  numPlateTxt: {
    color: Variables.Colors.white,
    fontSize: 12,
  },
  arrowView: {
    width: "90%",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 5,
  },
  arrowImg: {
    height: 30,
    width: 15,
  },
  selectionView: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingVertical: 10,
  },
  innerDropDown: {
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    flex: 1,
  },
  kmTxt: {
    color: Variables.Colors.locationGrey,
    fontSize: Variables.Measures.fontSize / 1.2,
    marginLeft: 7,
  },
  dateTxt: {
    color: Variables.Colors.locationGrey,
    fontSize: Variables.Measures.fontSize / 1.6,
  },
  timeTxt: {
    color: Variables.Colors.distanceGrey,
    fontSize: Variables.Measures.fontSize / 1.4,
  },
  leftDistanceView: {
    width: "18%",
    height: 60,
    justifyContent: "center",
    marginLeft: 5,
  },
  centerDistanceView: {
    justifyContent: "center",
    width: "80%",
  },
  yellowCenter: {
    height: 40,
    width: 40,
    borderRadius: 30,
    backgroundColor: "rgba(254, 187, 27, 0.25)",
    alignItems: "center",
    justifyContent: "center",
  },
  orangeInnerView: {
    height: 27,
    width: 27,
    borderRadius: 25,
    backgroundColor: Variables.Colors.yellow,
    alignItems: "center",
    justifyContent: "center",
  },
  currentLocTxt: {
    color: Variables.Colors.white,
    fontSize: 16,
  },
  locationDetailsTxt: {
    color: Variables.Colors.locationGrey,
    fontSize: 14,
    lineHeight: 20,
  },
  rightCenterView: {
    justifyContent: "center",
  },
  outerView: {
    flex: 1,
    width: "93%",
    alignSelf: "center",
  },
  dateTimeView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: Variables.Measures.fontSize / 1.5,
  },
});
export default Cancelled;

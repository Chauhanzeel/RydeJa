import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";
import { FilterModalProps } from "../types";
import { useTranslation } from "react-i18next";
import { FontStyle, Images, Variables } from "../../Theme";
import FastImage from "react-native-fast-image";
import BackSvg from "../../assets/Images/BackArrow.svg";
import LightCalendar from "../../assets/Images/lightCalendar.svg";
import SearchSvg from "../../assets/Images/SearchOrange.svg";
import PickupSvg from "../../assets/Images/Pickup.svg";
import CreditCard from "../../assets/Images/CreditCard.svg";
import Clock from "../../assets/Images/Clock.svg";
import { goBack } from "../../navigators/RootNavigation";
import ButtonView from "../../components/ButtonView";
import ParishModal from "../../components/ParishModal";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { ReducerStateProps } from "../Inbox/InterfaceProps";
import { Measures } from "../../Theme/variables";

const Reserve: React.FC<FilterModalProps> = ({ route }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [reserve, setReserve] = useState(false);
  const [searchModal, setSearchModal] = useState(false);

  const [bookedTripListData] = useSelector((state: ReducerStateProps) => [
    state.customer.bookedTripListData,
  ]);

  const HeaderView = () => {
    return (
      <View style={styles.headerView}>
        <TouchableOpacity
          onPress={() => {
            reserve ? setReserve(false) : goBack();
          }}
        >
          <BackSvg height={25} width={25} />
        </TouchableOpacity>
      </View>
    );
  };

  const renderAddress = (item: any, index: any) => {
    return (
      <TouchableOpacity
        style={[
          styles.itemView,
          { marginTop: index % index.length !== 0 ? 10 : 0 },
        ]}
      >
        <View style={{ width: "12%" }}>
          <PickupSvg />
        </View>

        <View style={styles.itemTxt}>
          <Text
            style={[
              FontStyle.urbanistMedium,
              { color: Variables.Colors.white, fontSize: 14 },
            ]}
          >
            {_.get(item, "pickupAddress.name", null)}
          </Text>
          {/* <Text
            style={[
              FontStyle.urbanistMedium,
              { color: Variables.Colors.white, fontSize: 14 },
            ]}
          ></Text> */}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.safeAreaStyle}>
      <StatusBar barStyle="light-content" />
      <ScrollView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <View style={styles.bgImgView}>
            <FastImage source={Images.carBg} style={styles.imgView} />
          </View>
          <ParishModal
            modalVisible={searchModal}
            onDismiss={() => setSearchModal(false)}
            rScreen={"Reserve"}
            filterPlug={true}
            onSuccess={(val) => {
              setSearchModal(false);
            }}
          />

          <View
            style={{
              width: Variables.Measures.width,
            }}
          >
            <View style={[styles.bgYellowView, { height: 6, marginTop: 20 }]}>
              <View style={styles.blackBgView} />
            </View>
          </View>
          {!reserve ? (
            <View style={styles.reserveView}>
              <Text style={[FontStyle.urbanistBold, styles.reserveTxt]}>
                Reserve
              </Text>
              <View
                style={{
                  marginTop: Variables.MetricsSizes.small * 5,
                  width: "100%",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                  }}
                >
                  <View style={{ width: "10%" }}>
                    <LightCalendar />
                  </View>

                  <View style={styles.chooseTxt}>
                    <Text style={[FontStyle.urbanistMedium, styles.rsvTxt]}>
                      Choose your exact pick-up location.
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: Variables.MetricsSizes.small,
                  }}
                >
                  <View style={{ width: "10%" }}>
                    <Clock width={22} height={22} />
                  </View>

                  <View style={styles.wtTxt}>
                    <Text style={[FontStyle.urbanistMedium, styles.rsvTxt]}>
                      Extra wait time included to meet your host.
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: Variables.MetricsSizes.small,
                  }}
                >
                  <View style={{ width: "10%" }}>
                    <CreditCard />
                  </View>

                  <View
                    style={{
                      height: Variables.MetricsSizes.tiny * 7,
                      width: "90%",
                    }}
                  >
                    <Text style={[FontStyle.urbanistMedium, styles.rsvTxt]}>
                      Cancel at no charge up to 60 minutes in advance.
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          ) : (
            <View style={styles.wv}>
              <Text style={[FontStyle.urbanistBold, styles.pickUpTxt]}>
                Where would you like to be picked up?
              </Text>

              <TouchableOpacity
                style={styles.nextBtnView}
                onPress={() => setSearchModal(true)}
              >
                <View
                  style={[
                    styles.nextBtnTextView,
                    {
                      width: Variables.Measures.width / 1.12,
                      backgroundColor: Variables.Colors.carGrey,
                    },
                  ]}
                >
                  <View style={styles.searchLeftView}>
                    <SearchSvg height={20} width={20} />
                  </View>
                  <Text style={[FontStyle.urbanistRegular, styles.pickTxt]}>
                    Pick Your Parish
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
          {!reserve ? (
            <View style={{ width: "100%", marginVertical: 20 }}>
              <ButtonView
                btnTxt={t("labelConst.reserveRide")}
                onBtnPress={() => {
                  setReserve(true);
                }}
                width={Variables.Measures.width / 1.12}
                backgroundColor={Variables.Colors.yellow}
                fontColor={Variables.Colors.darkBlack}
              />
            </View>
          ) : (
            _.get(bookedTripListData, "totalCount", null) > 0 && (
              <View style={styles.historyTxtView}>
                <Text style={[FontStyle.urbanistBold, styles.historyTxt]}>
                  History
                </Text>
                <View style={{ width: "100%", maxHeight: 250 }}>
                  <FlatList
                    style={{
                      marginVertical: Variables.MetricsSizes.small,
                    }}
                    data={_.get(bookedTripListData, "items", null)}
                    renderItem={({ item, index }) => renderAddress(item, index)}
                  />
                </View>
              </View>
            )
          )}
        </View>
      </ScrollView>
      <HeaderView />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  pickTxt: {
    color: Variables.Colors.white,
    fontSize: 16,
    marginLeft: Variables.FontSize.small / 2,
  },
  pickUpTxt: {
    color: Variables.Colors.white,
    fontSize: Measures.fontSize * 1.5,
  },
  rsvTxt: {
    color: Variables.Colors.white,
    fontSize: 14,
  },
  reserveTxt: {
    color: Variables.Colors.white,
    fontSize: Variables.MetricsSizes.large,
  },
  historyTxtView: {
    alignSelf: "center",
    width: "90%",
    paddingTop: 5,
    marginVertical: 50,
  },
  historyTxt: {
    color: Variables.Colors.white,
    fontSize: 12,
    lineHeight: 22,
  },
  wv: {
    width: "90%",
    alignSelf: "center",
    marginTop: Variables.FontSize.large,
  },
  wtTxt: {
    borderBottomColor: Variables.Colors.carsBorderGrey,
    borderBottomWidth: 1,
    height: Variables.MetricsSizes.tiny * 7,
    width: "90%",
  },
  chooseTxt: {
    borderBottomColor: Variables.Colors.carsBorderGrey,
    borderBottomWidth: 1,
    height: Variables.MetricsSizes.tiny * 7,
    width: "90%",
  },
  reserveView: {
    width: "90%",
    alignSelf: "center",
    marginTop: Variables.FontSize.large,
    flex: 1,
  },
  itemTxt: {
    borderBottomColor: Variables.Colors.carsBorderGrey,
    borderBottomWidth: 2,
    paddingBottom: 5,
    width: "90%",
  },
  itemView: {
    width: "100%",
    alignSelf: "center",
    borderRadius: 10,
    flexDirection: "row",
  },
  searchLeftView: {
    width: "15%",
    alignItems: "center",
    justifyContent: "center",
  },
  nextBtnTextView: {
    alignItems: "center",
    // justifyContent: "center",
    flex: 1,
    borderRadius: 12,
    flexDirection: "row",
  },
  nextBtnView: {
    alignSelf: "center",
    height: Variables.Measures.fontSize * 2.5,
    marginTop: Variables.Measures.fontSize,
  },
  safeAreaStyle: {
    flex: 1,
    backgroundColor: Variables.Colors.darkBlack,
  },
  bgImgView: {
    height: Variables.Measures.height / 3,
    width: Variables.Measures.width,
    alignItems: "center",
    justifyContent: "center",
  },
  imgView: {
    height: Variables.Measures.height / 2,
    width: Variables.Measures.width,
    alignItems: "center",
    justifyContent: "center",
  },
  headerView: {
    position: "absolute",
    top: Variables.Measures.StatusBarHeight + 10,
    height: 50,
    width: "90%",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  headerTxt: {
    marginLeft: 15,
    color: Variables.Colors.white,
    fontSize: 24,
  },
  bgYellowView: {
    width: "100%",
    alignSelf: "center",
    backgroundColor: Variables.Colors.darkYellow,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  blackBgView: {
    width: "100%",
    alignSelf: "center",
    borderTopEndRadius: 50,
    borderTopStartRadius: 50,
    backgroundColor: Variables.Colors.darkBlack,
    position: "absolute",
    top: 3,
    height: "100%",
  },
});

export default Reserve;

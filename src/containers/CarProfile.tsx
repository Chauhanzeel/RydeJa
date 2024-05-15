import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import { useTranslation } from "react-i18next";
import { FontStyle, Images, Layout, Variables } from "../Theme";
import AppIntroSlider from "react-native-app-intro-slider";

import HeartRedSvg from "../assets/Images/HeartRed.svg";
import HeartWhiteSvg from "../assets/Images/HeartBorderWhite.svg";
import ShareSvg from "../assets/Images/Share.svg";
import StarSvg from "../assets/Images/ModalIcons/StarRatingYellow.svg";
import DateSvg from "../assets/Images/DateSvg.svg";
import LocationSvg from "../assets/Images/LocationRound.svg";
import LeftSvg from "../assets/Images/BackArrow.svg";

import { goBack, navigate } from "../navigators/RootNavigation";

import _, { get } from "lodash";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import {
  favouriteCarAddStart,
  favouriteCarRemoveStart,
} from "../actions/customerActions";
import { CarInfoProps } from "./types";
import Calender from "./Calender";

interface CancelProps {}

const RenderImages = ({ item }: any) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
      }}
    >
      <Image
        style={styles.introImageStyle}
        source={{ uri: item?.image }}
        resizeMode="cover"
      />
    </View>
  );
};

export const CarsProfile = () => {
  const dispatch = useDispatch();

  const [carViewData] = useSelector(
    (state: {
      customer: {
        carViewData: any;
      };
    }) => [state.customer.carViewData]
  );

  const fav = carViewData?.isFavourite;

  const [isFavourite, setIsFavourite] = useState(fav);
  const [isCalendar, setCalendar] = useState(false);

  const removeAddFavourite = () => {
    let params = {
      car: carViewData?.id,
    };
    if (isFavourite) {
      dispatch(favouriteCarRemoveStart(params));
    } else {
      dispatch(favouriteCarAddStart(params));
    }
  };

  useEffect(() => {
    setIsFavourite(fav);
  }, [fav]);

  const renderCarInfo = (item: any, index: any) => {
    return (
      <View
        key={item.id}
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          marginLeft: index % item.length !== 0 ? 20 : 0,
          // padding: 20,
        }}
      >
        <Image source={{ uri: item.icon }} style={{ width: 30, height: 43 }} />
        <Text style={styles.carInfoTxt}>{item.name}</Text>
      </View>
    );
  };

  const renderCarFeatures = (item: any, index: any) => {
    return (
      <View
        key={item.id}
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          marginLeft: index % item.length !== 0 ? 20 : 0,
        }}
      >
        <Image source={{ uri: item.icon }} style={{ width: 30, height: 43 }} />
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Calender
        modalVisible={isCalendar}
        onDismiss={() => setCalendar(false)}
      />
      <View
        style={{
          height: 250,
          marginTop: Variables.Measures.StatusBarHeight - 10,
        }}
      >
        {_.size(_.get(carViewData, "carAssets", "null")) > 0 ? (
          <AppIntroSlider
            data={carViewData?.carAssets}
            renderItem={(item) => RenderImages(item)}
            showNextButton={false}
            showDoneButton={false}
            dotStyle={styles.inActiveDotStyle}
            activeDotStyle={styles.activeDotStyles}
          />
        ) : (
          <View
            style={{
              flex: 1,
              alignItems: "center",
            }}
          >
            <Image
              style={styles.introImageStyle}
              source={Images.CarPlaceHolder}
              resizeMode="cover"
            />
          </View>
        )}
        <TouchableOpacity style={styles.backPressView} onPress={goBack}>
          <LeftSvg />
        </TouchableOpacity>
      </View>
      <View style={styles.CarNameOuterView}>
        <View style={styles.CarNameView}>
          {_.get(carViewData, "carOwner", "null") && (
            <Text style={[FontStyle.urbanistRegular, styles.userNameTxt]}>
              {carViewData?.carOwner.fullName}
            </Text>
          )}

          <Text
            style={[
              FontStyle.urbanistSemiBold,
              styles.carNameTxt,
              { marginTop: 3 },
            ]}
          >
            {carViewData?.name}
          </Text>

          <View style={styles.ratingsView}>
            {carViewData?.avgRating && (
              <>
                <Text style={[FontStyle.urbanistRegular, styles.userNameTxt]}>
                  {carViewData?.avgRating}
                </Text>
                <View style={{ marginHorizontal: 4 }}>
                  <StarSvg height={12} width={12} />
                </View>
              </>
            )}
            {carViewData?.trip && (
              <View style={{ marginHorizontal: 4 }}>
                <Text style={[FontStyle.urbanistRegular, styles.userNameTxt]}>
                  ({carViewData?.trip} trips)
                </Text>
              </View>
            )}
          </View>
        </View>
        <View style={[{ height: "100%", width: 0.5, overflow: "hidden" }]}>
          <View
            style={[
              {
                height: "100%",
                width: 0.5,
                borderWidth: 0.5,
                borderColor: "#707070",
                borderStyle: "dashed",
              },
            ]}
          ></View>
        </View>
        <TouchableOpacity style={styles.shareImgView}>
          <ShareSvg height={26} width={24} />
        </TouchableOpacity>
        <View style={[{ height: "100%", width: 0.5, overflow: "hidden" }]}>
          <View
            style={[
              {
                height: "100%",
                width: 0.5,
                borderWidth: 0.5,
                borderColor: "#707070",
                borderStyle: "dashed",
              },
            ]}
          ></View>
        </View>

        <TouchableOpacity
          onPress={() => {
            setIsFavourite(!isFavourite);
            removeAddFavourite();
          }}
          style={styles.likeImgView}
        >
          {isFavourite ? (
            <HeartRedSvg height={25} width={25} />
          ) : (
            <HeartWhiteSvg height={25} width={25} />
          )}
        </TouchableOpacity>
      </View>
      <Text style={[FontStyle.urbanistBold, styles.dateTxt]}>TRIP DATES</Text>
      <View style={styles.tripDatesView}>
        <TouchableOpacity
          style={styles.dateImgView}
          onPress={() => setCalendar(true)}
        >
          <DateSvg />
        </TouchableOpacity>
        <View style={styles.dateCenterView}>
          <Text style={[FontStyle.urbanistRegular, styles.timeTxt]}>
            Sat, Oct 1, 10:00 am
          </Text>
          <Text
            style={[
              FontStyle.urbanistRegular,
              styles.timeTxt,
              { marginTop: 3 },
            ]}
          >
            Sat, Oct 1, 10:00 am
          </Text>
        </View>
        <View style={styles.rightChangeView}>
          <TouchableOpacity onPress={() => setCalendar(true)}>
            <Text style={[FontStyle.urbanistBold, styles.changeTxt]}>
              CHANGE
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={[FontStyle.urbanistBold, styles.dateTxt]}>
        PICKUP & RETURN
      </Text>
      <View style={styles.tripDatesView}>
        <View style={styles.dateImgView}>
          <LocationSvg />
        </View>
        <View style={styles.dateCenterView}>
          <Text style={[FontStyle.urbanistMedium, styles.perishAddress]}>
            Parish name and address of car
          </Text>
        </View>
        <View style={styles.rightChangeView}>
          <TouchableOpacity
            onPress={() => navigate("LuxuryCars", { searchModalOpen: false })}
          >
            <Text style={[FontStyle.urbanistBold, styles.changeTxt]}>
              CHANGE
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {_.size(_.get(carViewData, "carInformation", null)) > 0 && (
        <>
          <Text style={[FontStyle.urbanistBold, styles.dateTxt]}>CAR INFO</Text>
          <View
            style={[styles.carInfoView, { marginTop: 10, paddingBottom: 10 }]}
          >
            {/* <View style={Layout.container}>
          <Seatsvg />
          <Text style={[FontStyle.urbanistMedium, styles.carInfoTxt]}>
            4 Seats
          </Text>
        </View> */}
            <FlatList
              data={_.get(carViewData, "carInformation", null)}
              renderItem={({ item, index }) => renderCarInfo(item, index)}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={{ width: "100%", paddingLeft: 20 }}
            />
          </View>
        </>
      )}

      {_.size(get(carViewData, "carFeature", null)) > 0 && (
        <>
          <Text style={[FontStyle.urbanistBold, styles.dateTxt]}>FEATURES</Text>
          <View
            style={{
              flexDirection: "row",
              height: 90,
              borderBottomColor: Variables.Colors.borderGrey,
              borderBottomWidth: 1,
              alignItems: "center",
              justifyContent: "space-between",
              width: "98%",
              alignSelf: "center",
              marginTop: 10,
              paddingBottom: 10,
            }}
          >
            <FlatList
              data={carViewData?.carFeature}
              renderItem={({ item, index }) => renderCarFeatures(item, index)}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              style={{ width: "60%", paddingLeft: 20 }}
            />

            <TouchableOpacity
              onPress={() =>
                navigate("Features", { carFeature: carViewData?.carFeature })
              }
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "Urbanist-Bold",
                  color: Variables.Colors.darkYellow,
                  marginRight: 5,
                }}
              >
                VIEW ALL
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      <Text style={[FontStyle.urbanistBold, styles.dateTxt]}>DESCRIPTION</Text>
      <View style={styles.descView}>
        <View style={styles.descWidthView}>
          <Text
            style={[FontStyle.urbanistMedium, styles.descTxt]}
            numberOfLines={4}
          >
            {carViewData?.carBrand?.description}
          </Text>
          <TouchableOpacity style={styles.readView}>
            <Text style={[FontStyle.urbanistBold, styles.changeTxt]}>
              READ MORE
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Text style={[FontStyle.urbanistBold, styles.dateTxt]}>
        INSURANCE & PROTECTION
      </Text>
      <View style={styles.descView}>
        <View style={styles.descWidthView}>
          <TouchableOpacity
            style={styles.readView}
            onPress={() => navigate("Insurance")}
          >
            <Text style={[FontStyle.urbanistBold, styles.changeTxt]}>
              READ MORE
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const CarProfile = () => {
  const { t } = useTranslation();
  const [carViewData] = useSelector(
    (state: {
      customer: {
        carViewData: any;
      };
    }) => [state.customer.carViewData]
  );

  return (
    <View style={{ flex: 1, backgroundColor: Variables.Colors.darkBlack }}>
      <ScrollView style={{ height: "100%" }}>
        <View style={{ marginVertical: 20 }}>
          {/* <CarsProfile carInfo={carViewData} /> */}
          <View style={{ marginTop: 25 }}>
            <TouchableOpacity
              style={styles.nextBtnView}
              onPress={() => navigate("HostCarProfile")}
            >
              <View style={[styles.nextBtnTextView]}>
                <Text style={[styles.nextTxt, FontStyle.urbanistBold]}>
                  Continue
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  nextBtnView: {
    alignSelf: "center",
    height: Variables.Measures.fontSize * 2.5,
  },
  nextBtnTextView: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    borderRadius: 15,
    width: Variables.Measures.width / 1.1,
    backgroundColor: Variables.Colors.darkYellow,
  },
  nextTxt: {
    fontSize: Variables.Measures.fontSize / 1.2,
    color: Variables.Colors.blackBg,
  },
  bgImgView: {
    height: Variables.Measures.height / 2.5,
    width: Variables.Measures.width,
    alignItems: "center",
    justifyContent: "center",
  },
  imgView: {
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  introImageStyle: {
    width: Variables.Measures.width,
    height: 250,
  },
  inActiveDotStyle: {
    height: 13,
    width: 13,
    borderWidth: 2,
    borderColor: Variables.Colors.white,
    borderRadius: 10,
    marginTop: 30,
  },
  activeDotStyles: {
    height: 13,
    width: 13,
    backgroundColor: Variables.Colors.white,
    borderRadius: 10,
    marginTop: 30,
  },
  CarNameView: {
    width: "45%",
    justifyContent: "center",
    flex: 1,
    // borderRightWidth: 1,
    // borderRightColor: Variables.Colors.borderGrey,
    paddingLeft: 10,
  },
  shareImgView: {
    width: "25%",
    alignItems: "center",
    justifyContent: "center",
    // borderRightWidth: 1,
    // borderRightColor: Variables.Colors.borderGrey,
  },
  likeImgView: {
    width: "25%",
    alignItems: "center",
    justifyContent: "center",
  },
  CarNameOuterView: {
    height: 70,
    width: "100%",
    flexDirection: "row",
    borderBottomColor: Variables.Colors.greyBg,
    borderBottomWidth: 1,
  },
  userNameTxt: {
    color: Variables.Colors.chatWhite,
    fontSize: 10,
  },
  carNameTxt: {
    color: Variables.Colors.chatWhite,
    fontSize: 16,
  },
  ratingsView: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3,
  },
  dateTxt: {
    color: Variables.Colors.inputTxtColor,
    paddingLeft: 10,
    marginTop: 15,
    fontSize: 14,
  },
  tripDatesView: {
    flexDirection: "row",
    height: 90,
    borderBottomColor: Variables.Colors.borderGrey,
    borderBottomWidth: 1,
    alignItems: "center",
  },
  carInfoView: {
    flexDirection: "row",
    height: 90,
    borderBottomColor: Variables.Colors.borderGrey,
    borderBottomWidth: 1,
    alignItems: "center",
    justifyContent: "space-between",
    width: "98%",
    alignSelf: "center",
  },
  descView: {
    borderBottomColor: Variables.Colors.borderGrey,
    borderBottomWidth: 1,
    alignItems: "center",
  },
  dateImgView: {
    width: "20%",
    alignItems: "center",
    justifyContent: "center",
  },
  dateCenterView: {
    justifyContent: "center",
    width: "40%",
    flex: 1,
    paddingLeft: 5,
  },
  rightChangeView: {
    width: "20%",
  },
  timeTxt: {
    color: Variables.Colors.chatWhite,
    fontSize: 14,
  },
  changeTxt: {
    color: Variables.Colors.darkYellow,
  },
  carInfoTxt: {
    color: Variables.Colors.white,
    fontSize: 12,
    marginTop: 8,
  },
  viewTxt: {
    color: Variables.Colors.darkYellow,
    fontSize: 16,
  },
  descTxt: {
    color: Variables.Colors.white,
    fontSize: 14,
    width: "95%",
    alignItems: "center",
    lineHeight: 22,
  },
  readView: {
    width: "95%",
    height: 20,
    alignItems: "flex-end",
    marginVertical: 10,
  },
  descWidthView: {
    width: "98%",
    alignItems: "center",
    marginVertical: 10,
  },
  backPressView: {
    position: "absolute",
    top: 20,
    left: 20,
  },
  perishAddress: {
    fontSize: 12,
    color: Variables.Colors.white,
  },
});
export default CarProfile;

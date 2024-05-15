import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import { CommonProps } from "../types";
import { useTranslation } from "react-i18next";
import { FontStyle, Images, Variables } from "../../Theme";
import RightYellowArrowSvg from "../../assets/Images/RightYellowArrow.svg";
import Cancel from "../../assets/Images/MissedCall.svg";
import CloseSvg from "../../assets/Images/Close.svg";
import { goBack, navigate, replace } from "../../navigators/RootNavigation";
import ButtonView from "../../components/ButtonView";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { ReducerStateProps } from "../Inbox/InterfaceProps";
import DashedLine from "react-native-dashed-line";
import moment from "moment";
import FastImageView from "../../components/FastImageView";
import Calender from "../Calender";
import {
  amountDetailsStart,
  rentalCarChangeAddressStart,
  rentalCarChangeDatesStart,
  reserveCarStart,
  reserveCarSuccess,
} from "../../actions/customerActions";
import { toastConst } from "../../constants/constants";
import { Colors, Measures } from "../../Theme/variables";
import ToastMessage from "../../components/ToastMessage";
import { logOutResetAll } from "../../actions/authActions";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CarsByParish4: React.FC<CommonProps> = ({ route }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [isCalendar, setCalendar] = useState(false);
  const [TripDates, setTripDates] = useState({
    fromDateTime: _.get(route, "params.data.fromDateTime", null) || new Date(),
    toDateTime: _.get(route, "params.data.toDateTime", null) || new Date(),
  });
  const [parish, setParish] = useState(_.get(route, "params.parish", null));
  const [bookId, setBookId] = useState(_.get(route, "params.data.id", null));
  const [update, setUpdate] = useState(false);
  const [update1, setUpdate1] = useState(false);
  const [update2, setUpdate2] = useState(false);
  const [match, setmatch] = useState(false);

  const [
    isLoading,
    amountDetailsData,
    rentalCarAddressData,
    rentalCarDatesData,
    reservCarData,
    bookedTripListData,
    loginData,
  ] = useSelector((state: ReducerStateProps) => [
    state.customer.isLoading,
    state.customer.amountDetailsData,
    state.customer.rentalCarAddressData,
    state.customer.rentalCarDatesData,
    state.customer.reservCarData,
    state.customer.bookedTripListData,
    state.auth.loginData,
  ]);

  useEffect(() => {
    if (_.size(bookedTripListData?.items) > 0) {
      for (let i = 0; i < _.size(bookedTripListData?.items); i++) {
        if (bookId == bookedTripListData?.items[i]?.id) {
          setmatch(true);
          break;
        } else {
          setmatch(false);
        }
      }
    } else {
      setmatch(false);
    }
  }, [bookedTripListData]);

  useEffect(() => {
    if (
      moment(TripDates.fromDateTime).format("YYYY-MM-DD HH:mm:ss") <
      moment(TripDates.toDateTime).format("YYYY-MM-DD HH:mm:ss")
    ) {
      const params = {
        fromDateTime: _.get(TripDates, "fromDateTime", null),
        toDateTime: _.get(TripDates, "toDateTime", null),
        id: _.get(route, "params.data.id", null),
      };
      if (loginData && route?.params?.data?.status == "reserved") {
        dispatch(
          amountDetailsStart({
            carId:
              _.get(route, "params.data.car.id", null) ||
              _.get(route, "params.data.id", null),
            ...{ par: params },
          })
        );
      }
    }
  }, [TripDates]);

  useEffect(() => {
    if (update1 && _.get(rentalCarDatesData, "success", null) === true) {
      updatePickupAdd(parish);

      setUpdate1(false);
    }
  }, [rentalCarDatesData]);

  useEffect(() => {
    if (update && _.get(rentalCarAddressData, "success", null) === true) {
      ToastMessage.set(toastConst.successToast, "Booking Details Updated");
      setUpdate(false);
      goBack();
    }
  }, [rentalCarAddressData]);

  useEffect(() => {
    if (_.get(reservCarData, "success", null)) {
      ToastMessage.set(toastConst.successToast, "Car reserved successfully.");

      navigate("TabNavigations", { navigationfrom: 2 });
      dispatch(reserveCarSuccess(null));
    }
  }, [reservCarData]);

  const HeaderView = () => {
    return (
      <View style={styles.headerView}>
        <TouchableOpacity
          onPress={() => {
            goBack();
          }}
        >
          <CloseSvg height={25} width={25} />
        </TouchableOpacity>
      </View>
    );
  };

  const amountDetails = (res: any) => {
    setTripDates({
      fromDateTime: moment(
        res?.fromDateTime,
        "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (z)"
      ).toISOString(),
      toDateTime: moment(
        res?.toDateTime,
        "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (z)"
      ).toISOString(),
    }),
      setCalendar(false);
  };

  const updatePickupAdd = (val: string) => {
    const params = {
      pickupAddress: _.get(val, "id", null),
    };
    dispatch(
      rentalCarChangeAddressStart({ bookId: bookId, ...{ par: params } })
    );
    setUpdate(true);
  };

  const updateDateTrips = (res: any) => {
    const params = {
      fromDateTime: _.get(res, "fromDateTime", null),
      toDateTime: _.get(res, "toDateTime", null),
    };
    dispatch(rentalCarChangeDatesStart({ bookId: bookId, ...{ par: params } }));
    setUpdate1(true);
  };

  const reserveCar = () => {
    if (match) {
      updateDateTrips(TripDates);
    } else {
      if (
        moment(TripDates.fromDateTime).format("YYYY-MM-DD HH:mm:ss") >=
        moment(TripDates.toDateTime).format("YYYY-MM-DD HH:mm:ss")
      ) {
        ToastMessage.set(
          toastConst.errorToast,
          "To date time must be greater then from date time."
        );
        return;
      }

      const params = {
        car: _.get(route, "params.data.id", null),
        pickupAddress: _.get(route, "params.parish.id", null),
        fromDateTime: _.get(TripDates, "fromDateTime", null),
        toDateTime: _.get(TripDates, "toDateTime", null),
        rentAmount: _.get(amountDetailsData, "rentAmount", null),
        totalAmount: _.get(amountDetailsData, "totalAmount", null),
        // message: "",
      };
      dispatch(reserveCarStart(params));
    }
  };

  const clearAsyncStorage = async () => {
    dispatch(logOutResetAll());
    AsyncStorage.clear();
    replace("LoginSplash");
  };

  return (
    <SafeAreaView style={styles.safeAreaStyle}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.darkBlack} />
      <ScrollView style={{ flex: 1 }}>
        <Calender
          modalVisible={isCalendar}
          startOfDate={TripDates.fromDateTime}
          endOfDate={TripDates.toDateTime}
          onDismiss={() => setCalendar(false)}
          onSubmit={(res) => {
            amountDetails(res);
            setUpdate2(true);
          }}
        />
        <View style={styles.modalView}>
          <View style={styles.insideModal}>
            <View style={styles.outerView}>
              {_.get(route, "params.data.car.carAssets[0].image", null) ||
              _.get(route, "params.data.carAssets[0].image", null) ? (
                <FastImageView
                  source={{
                    uri:
                      _.get(
                        route,
                        "params.data.car.carAssets[0].image",
                        null
                      ) || _.get(route, "params.data.carAssets[0].image", null),
                  }}
                  style={styles.carImgStyle}
                />
              ) : (
                <Image
                  source={Images.CarPlaceHolder}
                  style={styles.carImgStyle}
                />
              )}

              <View style={styles.carNameView}>
                <Text style={[FontStyle.urbanistBold, styles.carNameTxt]}>
                  {_.get(route, "params.data.car.name", null) ||
                    _.get(route, "params.data.name", null)}
                </Text>
              </View>

              <DashedLine
                dashLength={3}
                dashColor={Variables.Colors.borderGrey}
                style={styles.dashedLine}
              />
              <View style={styles.pickDateView}>
                {!_.get(route, "params.data.status", null) && (
                  <Text style={[FontStyle.urbanistMedium, styles.pickTxt]}>
                    PICK YOUR DATE AND TIME
                  </Text>
                )}
                {!_.get(route, "params.data.status", null) ? (
                  <TouchableOpacity
                    style={styles.dateView}
                    onPress={() => setCalendar(true)}
                  >
                    <View style={{ alignItems: "center" }}>
                      <Text style={[FontStyle.urbanistBold, styles.date]}>
                        {moment(TripDates.fromDateTime).format("ddd., MMM. DD")}
                      </Text>
                      <Text style={[FontStyle.urbanistMedium, styles.time]}>
                        {moment(TripDates.fromDateTime).format("hh:mm a")}
                      </Text>
                    </View>

                    <View
                      style={{
                        marginHorizontal: 13,
                      }}
                    >
                      <RightYellowArrowSvg height={20} />
                    </View>

                    <View style={{ alignItems: "center" }}>
                      <Text style={[FontStyle.urbanistBold, styles.date]}>
                        {moment(TripDates.toDateTime).format("ddd., MMM. DD")}
                      </Text>
                      <Text style={[FontStyle.urbanistMedium, styles.time]}>
                        {moment(TripDates.toDateTime).format("hh:mm a")}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <View
                    style={styles.dateView}
                    // onPress={() => setCalendar(true)}
                  >
                    <View style={{ alignItems: "center" }}>
                      <Text style={[FontStyle.urbanistBold, styles.date]}>
                        {moment(TripDates.fromDateTime).format("ddd., MMM. DD")}
                      </Text>
                      <Text style={[FontStyle.urbanistMedium, styles.time]}>
                        {moment(TripDates.fromDateTime).format("hh:mm a")}
                      </Text>
                    </View>

                    <View
                      style={{
                        marginHorizontal: 13,
                      }}
                    >
                      <RightYellowArrowSvg height={20} />
                    </View>

                    <View style={{ alignItems: "center" }}>
                      <Text style={[FontStyle.urbanistBold, styles.date]}>
                        {moment(TripDates.toDateTime).format("ddd., MMM. DD")}
                      </Text>
                      <Text style={[FontStyle.urbanistMedium, styles.time]}>
                        {moment(TripDates.toDateTime).format("hh:mm a")}
                      </Text>
                    </View>
                  </View>
                )}
              </View>
            </View>
          </View>

          {match && (
            <TouchableOpacity
              style={styles.cancelBtnView}
              onPress={() => {
                navigate("CancelBookingReason", {
                  bookId: bookId,
                  match: match,
                  status: _.get(route, "params.data.status", null),
                });
              }}
            >
              <Cancel width={20} height={20} />
              <Text style={[FontStyle.urbanistMedium, styles.cancelText]}>
                {_.get(route, "params.data.status", null) == "reserved"
                  ? "Cancel Ryde Reservation"
                  : "Cancel Ryde Booking"}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        <View
          style={[
            styles.btnView,
            {
              marginVertical: match
                ? Measures.fontSize * 2
                : Measures.fontSize * 4,
            },
          ]}
        >
          {_.get(route, "params.data.status", null) == "booked" ||
          !amountDetailsData ? null : (
            <ButtonView
              isLoading={isLoading}
              btnTxt={
                _.get(route, "params.data.status", null) == "reserved"
                  ? //  &&
                    // !update2
                    "Book Now"
                  : // : _.get(route, "params.data.status", null) == "reserved" &&
                    //   update2
                    // ? "Update"
                    t("labelConst.save")
              }
              onBtnPress={() => {
                if (loginData) {
                  if (
                    _.get(route, "params.data.status", null) == "reserved"
                    // &&
                    // !update2
                  ) {
                    navigate("CurrentAddress", {
                      rentalCarObj: route?.params?.data,
                    });
                  } else {
                    reserveCar();
                  }
                } else {
                  clearAsyncStorage();
                }
              }}
              disablebtn={isLoading}
              width={Variables.Measures.width / 1.12}
              backgroundColor={Variables.Colors.yellow}
              fontColor={Variables.Colors.darkBlack}
            />
          )}

          {!loginData && (
            <ButtonView
              isLoading={isLoading}
              btnTxt={
                _.get(route, "params.data.status", null) == "reserved"
                  ? //  &&
                    // !update2
                    "Book Now"
                  : // : _.get(route, "params.data.status", null) == "reserved" &&
                    //   update2
                    // ? "Update"
                    t("labelConst.save")
              }
              onBtnPress={() => {
                if (loginData) {
                  if (
                    _.get(route, "params.data.status", null) == "reserved"
                    // &&
                    // !update2
                  ) {
                    navigate("CurrentAddress", {
                      rentalCarObj: route?.params?.data,
                    });
                  } else {
                    reserveCar();
                  }
                } else {
                  clearAsyncStorage();
                }
              }}
              disablebtn={isLoading}
              width={Variables.Measures.width / 1.12}
              backgroundColor={Variables.Colors.yellow}
              fontColor={Variables.Colors.darkBlack}
            />
          )}
        </View>
      </ScrollView>

      <HeaderView />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  time: {
    color: Variables.Colors.white,
    fontSize: 14,
    lineHeight: 19,
  },
  date: {
    color: Variables.Colors.white,
    fontSize: 16,
    lineHeight: 22,
  },
  pickTxt: {
    fontSize: 16,
    lineHeight: 22,
    color: Variables.Colors.white,
  },
  pickDateView: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  dashedLine: {
    height: Variables.MetricsSizes.small,
    width: "100%",
  },
  carTypeTxt: {
    color: Variables.Colors.white,
    fontSize: 14,
  },
  carNameTxt: {
    fontSize: 24,
    color: Variables.Colors.white,
    marginBottom: 3,
  },
  carNameView: {
    width: "100%",
    paddingTop: Variables.FontSize.regular,
    paddingBottom: Variables.FontSize.small / 2,
    alignSelf: "center",
  },
  insideModal: {
    width: "90%",
    backgroundColor: Variables.Colors.carGrey,
    alignSelf: "center",
    borderRadius: 7,
  },
  dateView: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingTop: Variables.MetricsSizes.small,
    paddingBottom: Variables.MetricsSizes.small * 2,
  },
  cancelBtnView: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: Variables.Measures.width / 5,
    width: "90%",
    alignSelf: "center",
  },
  cancelText: {
    fontSize: 14,
    color: Variables.Colors.white,
    lineHeight: 22,
    marginLeft: Variables.MetricsSizes.tiny,
  },
  btnView: {
    alignSelf: "center",
  },
  carImgStyle: {
    height: Variables.Measures.width / 3,
    width: "100%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  outerView: {
    width: "94%",
    alignSelf: "center",
    marginTop: Variables.FontSize.regular * 2,
  },
  modalView: {
    backgroundColor: Variables.Colors.darkBlack,
    justifyContent: "center",
    marginTop: Measures.width / 3,
  },
  searchLeftView: {
    width: "15%",
    alignItems: "center",
    justifyContent: "center",
  },
  nextBtnTextView: {
    alignItems: "center",
    flex: 1,
    borderRadius: 12,
    flexDirection: "row",
  },
  nextBtnView: {
    alignSelf: "center",
    height: Variables.Measures.fontSize * 2.5,
    marginTop: Variables.MetricsSizes.small * 5,
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

export default CarsByParish4;

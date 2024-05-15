import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { CommonStyles, FontStyle, Images, Variables } from "../../Theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";
import { goBack, navigate, replace } from "../../navigators/RootNavigation";

import Icon_Car from "../../assets/Images/Icon_Car.svg";
import StarSvg from "../../assets/Images/ModalIcons/StarRatingYellow.svg";
import BackSvg from "../../assets/Images/BackArrow.svg";
import Icon_RS_arows from "../../assets/Images/Icon_RS_arows.svg";
import Icon_thumbsup from "../../assets/Images/Icon_thumbs_up.svg";

import InputField from "../../components/InputField";
import ButtonView from "../../components/ButtonView";
import { useDispatch, useSelector } from "react-redux";

import { GetApprovedProps, ReducerStateProps } from "../Inbox/InterfaceProps";
import {
  amountDetailsStart,
  confirmPaymentStart,
  confirmPaymentSuccess,
  createRentalCarStart,
  createRentalCarSuccess,
  rentalCarPIStart,
  rentalCarPISuccess,
  reserveCarBookStart,
  reserveCarBookSuccess,
} from "../../actions/customerActions";
import _, { round } from "lodash";
import { Colors, Measures } from "../../Theme/variables";
import Header from "../../components/Header";
import FastImageView from "../../components/FastImageView";
import moment from "moment";
import "moment-timezone";
import {
  stripePaymentStart,
  stripePaymentSuccess,
} from "../../actions/paymentActions";
import Toast from "react-native-toast-message";
import { getOr, toastConst } from "../../constants/constants";
import ToastMessage from "../../components/ToastMessage";
import Calender from "../Calender";
import { log } from "console";
import {
  transactionListStart,
  transactionListSuccess,
} from "../../actions/carOwnerActions";

const Checkout: React.FC<GetApprovedProps> = ({ route }) => {
  const rentalCarObj = route.params?.rentalCarObj;

  const carDetails =
    JSON.parse(_.get(rentalCarObj, "log", null)) || rentalCarObj;

  const { t } = useTranslation();
  const [message, setMessage] = useState(null);
  const [nextCall, setNextCall] = useState(false);

  const [isCalendar, setCalendar] = useState(false);
  const [TripDates, setTripDates] = useState({
    fromDateTime: _.get(rentalCarObj, "fromDateTime", null) || new Date(),
    toDateTime: _.get(rentalCarObj, "toDateTime", null) || new Date(),
  });

  const dispatch = useDispatch();

  const [
    rentalCarData,
    amountDetailsData,
    custLoading,
    validationObj,
    stripePaymentData,
    isLoading,
    reserveCarBookData,
    rentalCarPIData,
    confirmPaymentData,
    saveCardList,
  ] = useSelector((state: ReducerStateProps) => [
    state.customer.rentalCarData,
    state.customer.amountDetailsData,
    state.customer.isLoading,
    state.customer.validationObj,
    state.payment.stripePaymentData,
    state.payment.isLoading,
    state.customer.reserveCarBookData,
    state.customer.rentalCarPIData,
    state.customer.confirmPaymentData,
    state.customer.saveCardList,
  ]);

  useEffect(() => {
    if (rentalCarObj) {
      setTripDates({
        fromDateTime:
          _.get(rentalCarObj, "fd", null) ||
          _.get(rentalCarObj, "fromDateTime", null),
        toDateTime:
          _.get(rentalCarObj, "td", null) ||
          _.get(rentalCarObj, "toDateTime", null),
      });
    }
  }, []);
  useEffect(() => {
    if (rentalCarObj?.id) {
      const params = {
        fromDateTime: moment(
          _.get(rentalCarObj, "fromDateTime", null)
        ).toISOString(),

        toDateTime: moment(
          _.get(rentalCarObj, "toDateTime", null)
        ).toISOString(),

        id: _.get(rentalCarObj, "car.id", null),
      };
      dispatch(
        amountDetailsStart({
          carId: _.get(rentalCarObj, "car.id", null),
          ...{ par: params },
        })
      );
    } else {
      const params = {
        fromDateTime: moment(
          _.get(TripDates, "fromDateTime", null),
          "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (z)"
        ).toISOString(),

        toDateTime: moment(
          _.get(TripDates, "toDateTime", null),
          "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (z)"
        ).toISOString(),

        id: _.get(rentalCarObj, "car", null),
      };
      dispatch(
        amountDetailsStart({
          carId: _.get(rentalCarObj, "car", null),
          ...{ par: params },
        })
      );
    }
  }, [TripDates]);

  const amountDetails = (res: any) => {
    setTripDates(res), setCalendar(false);
  };

  useEffect(() => {
    if (stripePaymentData && nextCall) {
      getCreateRentalCar();
      setNextCall(false);
    }
  }, [stripePaymentData, nextCall]);

  useEffect(() => {
    if (
      _.get(rentalCarData, "success", null) ||
      _.get(reserveCarBookData, "success", null)
    ) {
      let params = {
        card: _.get(saveCardList, "items[0].id", null),
        rentalCar: _.get(rentalCarData, "data.rentalCar", null),
      };
      dispatch(rentalCarPIStart(params));
    }
  }, [rentalCarData, reserveCarBookData]);

  useEffect(() => {
    let params = {
      paymentIntent: _.get(rentalCarPIData, "data.id", null),
      rentalCar: _.get(rentalCarData, "data.rentalCar", null),
      paymentMethod: _.get(rentalCarPIData, "data.source", null),
      log: JSON.stringify({
        paymentIntent: _.get(rentalCarPIData, "data.id", null),
        rentalCar: _.get(rentalCarData, "data.rentalCar", null),
        paymentMethod: _.get(rentalCarPIData, "data.source", null),
      }),
    };
    if (_.get(rentalCarPIData, "success", null)) {
      dispatch(confirmPaymentStart(params));
    }
  }, [rentalCarPIData]);

  useEffect(() => {
    if (_.get(confirmPaymentData, "success", null)) {
      replace("BookedSuccess", { rentalCarObj: carDetails, status: true });
      dispatch(reserveCarBookSuccess(null));
      dispatch(createRentalCarSuccess(null));
      dispatch(stripePaymentSuccess(null));
      dispatch(transactionListStart());
      dispatch(rentalCarPISuccess(null));
      dispatch(confirmPaymentSuccess(null));
    }
  }, [confirmPaymentData]);

  const getCreateRentalCar = () => {
    const params = {
      car: _.get(rentalCarObj, "car", null),
      pickupAddress: _.get(rentalCarObj, "pickupAddress", null),
      fromDateTime: moment(
        _.get(TripDates, "fromDateTime", null),
        "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (z)"
      ).toISOString(),
      toDateTime: moment(
        _.get(TripDates, "toDateTime", null),
        "ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (z)"
      ).toISOString(),
      offer: _.get(rentalCarObj, "promoId", null),
      country: _.get(rentalCarObj, "currentAddress.country", null),
      address: _.get(rentalCarObj, "currentAddress.address", null),
      city: _.get(rentalCarObj, "currentAddress.city", null),
      postalCode: _.get(rentalCarObj, "currentAddress.postalCode", null),
      rentAmount: _.get(amountDetailsData, "rentAmount", null),
      totalAmount: round(_.get(amountDetailsData, "totalAmount", null)),
      message: message,
      currency: "USD",
    };

    dispatch(createRentalCarStart(params));
  };

  const bookCar = () => {
    const params = {
      country: _.get(rentalCarObj, "currentAddress.country", null),
      address: _.get(rentalCarObj, "currentAddress.address", null),
      city: _.get(rentalCarObj, "currentAddress.city", null),
      postalCode: _.get(rentalCarObj, "currentAddress.postalCode", null),
      currency: "USD",
    };

    dispatch(
      reserveCarBookStart({
        id: _.get(rentalCarObj, "id", null),
        ...{ par: params },
      })
    );
  };

  const paymentMethod = () => {
    if (_.get(rentalCarObj, "paymentObj.id", null) == null) {
      ToastMessage.set(toastConst.errorToast, "First select payment details");
      return;
    }
    if (_.get(stripePaymentData, "id", null)) {
      getCreateRentalCar();
      return;
    }
    const params = {
      amount: Number(_.get(amountDetailsData, "totalAmount", null)).toFixed(0),
      currency: "USD",
      customer: _.get(validationObj, "stripeId", null),
      source: _.get(rentalCarObj, "paymentObj.id", null),
      description:
        "Car booked payment amount " +
        _.get(amountDetailsData, "totalAmount", null),
    };
    dispatch(stripePaymentStart(params));
    setNextCall(true);
  };

  return (
    <SafeAreaView style={styles.safeAreaStyle}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.blackBg} />
      <Calender
        modalVisible={isCalendar}
        startOfDate={TripDates.fromDateTime}
        endOfDate={TripDates.toDateTime}
        onDismiss={() => setCalendar(false)}
        onSubmit={(res) => {
          amountDetails(res);
        }}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
      >
        <ScrollView keyboardShouldPersistTaps="always">
          <Header
            centerText="Checkout"
            leftSvg={<BackSvg />}
            onLeftPress={() => goBack()}
          />
          <View style={{ flex: 1 }}>
            <View
              style={{
                flexDirection: "row",
                marginHorizontal: 20,
              }}
            >
              <View style={styles.CarNameOuterView}>
                <View style={styles.CarNameView}>
                  <Text
                    style={[
                      FontStyle.urbanistRegular,
                      CommonStyles.descCommonTxt,
                      styles.userNameTxt,
                    ]}
                  >
                    {_.get(carDetails, "carViewData.carOwner.fullName", null) ||
                      _.get(carDetails, "carOwner.fullName", null)}
                  </Text>
                  <Text
                    style={[
                      FontStyle.urbanistSemiBold,
                      CommonStyles.descCommonTxt,
                      { marginTop: 3 },
                    ]}
                  >
                    {_.get(carDetails, "carViewData.model", null) ||
                      _.get(carDetails, "car.model", null)}
                  </Text>

                  <View style={styles.ratingsView}>
                    {_.get(carDetails, "carViewData.avgRating", null) ||
                    _.get(carDetails, "car.avgRating", null) ? (
                      <Text
                        style={[
                          FontStyle.urbanistRegular,
                          CommonStyles.descCommonTxt,
                          styles.userNameTxt,
                        ]}
                      >
                        {_.get(carDetails, "carViewData.avgRating", null) ||
                          _.get(carDetails, "car.avgRating", null)}
                      </Text>
                    ) : null}
                    {_.get(carDetails, "carViewData.avgRating", null) ||
                    _.get(carDetails, "car.avgRating", null) ? (
                      <View
                        style={{
                          marginHorizontal: 4,
                          paddingTop: 5,
                          // alignSelf: "flex-end",
                          // justifyContent: "center",
                        }}
                      >
                        <StarSvg height={12} width={12} />
                      </View>
                    ) : null}
                    <View style={{ marginHorizontal: 4 }}>
                      {_.get(carDetails, "carViewData.trip", null) ||
                      _.get(carDetails, "car.trip", null) ? (
                        <Text
                          style={[
                            FontStyle.urbanistRegular,
                            CommonStyles.descCommonTxt,
                            styles.userNameTxt,
                          ]}
                        >
                          (
                          {_.get(carDetails, "carViewData.trip", null) ||
                            _.get(carDetails, "car.trip", null)}
                          ) trips
                        </Text>
                      ) : null}
                    </View>
                  </View>
                </View>

                <View style={styles.CarNameView}>
                  {_.get(carDetails, "carViewData.carAssets[0].image", null) ||
                  _.get(carDetails, "car.carAssets[0].image", null) ? (
                    <FastImageView
                      source={{
                        uri:
                          _.get(
                            carDetails,
                            "carViewData.carAssets[0].image",
                            null
                          ) ||
                          _.get(carDetails, "car.carAssets[0].image", null),
                      }}
                      style={styles.carImgView}
                    />
                  ) : (
                    <Image
                      source={Images.CarPlaceHolder}
                      style={styles.carImgView}
                    />
                  )}
                </View>
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: Measures.fontSize,
                marginHorizontal: 20,
              }}
            >
              {rentalCarObj?.id ? (
                <View style={[styles.CarNameOuterView]}>
                  <View style={styles.CarNameView}>
                    <Text
                      style={[
                        FontStyle.urbanistSemiBold,
                        CommonStyles.smallCommonTxt,
                      ]}
                    >
                      {moment(_.get(TripDates, "fromDateTime", null)).format(
                        "ddd. MMM DD YYYY"
                      )}
                    </Text>

                    <View style={styles.ratingsView}>
                      <Text
                        style={[
                          FontStyle.urbanistRegular,
                          styles.userNameTxt,
                          CommonStyles.descCommonTxt,
                        ]}
                      >
                        {moment(_.get(TripDates, "fromDateTime", null)).format(
                          "hh:mm a."
                        )}
                      </Text>
                    </View>
                  </View>

                  <Icon_RS_arows />

                  <View
                    style={[styles.CarNameView, { alignItems: "flex-end" }]}
                  >
                    <Text
                      style={[
                        FontStyle.urbanistSemiBold,
                        CommonStyles.smallCommonTxt,
                      ]}
                    >
                      {moment(_.get(TripDates, "toDateTime", null)).format(
                        "ddd. MMM DD YYYY"
                      )}
                    </Text>

                    <View style={styles.ratingsView}>
                      <Text
                        style={[
                          FontStyle.urbanistRegular,
                          CommonStyles.descCommonTxt,
                          styles.userNameTxt,
                        ]}
                      >
                        {moment(_.get(TripDates, "toDateTime", null)).format(
                          "hh:mm a."
                        )}
                      </Text>
                    </View>
                  </View>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.CarNameOuterView}
                  onPress={() => setCalendar(true)}
                >
                  <View style={styles.CarNameView}>
                    <Text
                      style={[
                        FontStyle.urbanistSemiBold,
                        CommonStyles.smallCommonTxt,
                      ]}
                    >
                      {moment(_.get(TripDates, "fromDateTime", null)).format(
                        "ddd. MMM DD YYYY"
                      )}
                    </Text>

                    <View style={styles.ratingsView}>
                      <Text
                        style={[
                          FontStyle.urbanistRegular,
                          styles.userNameTxt,
                          CommonStyles.descCommonTxt,
                        ]}
                      >
                        {moment(_.get(TripDates, "fromDateTime", null)).format(
                          "hh:mm a."
                        )}
                      </Text>
                    </View>
                  </View>

                  <Icon_RS_arows />

                  <View
                    style={[styles.CarNameView, { alignItems: "flex-end" }]}
                  >
                    <Text
                      style={[
                        FontStyle.urbanistSemiBold,
                        CommonStyles.smallCommonTxt,
                      ]}
                    >
                      {moment(_.get(TripDates, "toDateTime", null)).format(
                        "ddd. MMM DD YYYY"
                      )}
                    </Text>

                    <View style={styles.ratingsView}>
                      <Text
                        style={[
                          FontStyle.urbanistRegular,
                          CommonStyles.descCommonTxt,
                          styles.userNameTxt,
                        ]}
                      >
                        {moment(_.get(TripDates, "toDateTime", null)).format(
                          "hh:mm a."
                        )}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: Measures.fontSize,
                marginHorizontal: 20,
              }}
            >
              <Icon_Car />
              <Text
                style={[
                  FontStyle.urbanistMedium,
                  CommonStyles.buttonCommonTxt1,
                  { marginLeft: 10 },
                ]}
              >
                {_.get(carDetails, "carViewData.name", null) ||
                  _.get(carDetails, "car.name", null)}
                ,{" "}
                {_.get(carDetails, "carViewData.numberPlate", null) ||
                  _.get(carDetails, "car.numberPlate", null)}
              </Text>
            </View>
            {amountDetailsData && (
              <>
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: Measures.fontSize,
                    marginHorizontal: 20,
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={[
                      FontStyle.urbanistMedium,
                      CommonStyles.descCommonTxt,
                      styles.leftTxt,
                    ]}
                  >
                    {_.get(amountDetailsData, "rentPerDays", null)
                      ? `US$${parseFloat(
                          getOr(amountDetailsData, "rentPerDays", 0)
                        ).toFixed(2)}`
                      : 0}{" "}
                    x {_.get(amountDetailsData, "totalDays", null)}
                  </Text>

                  <Text
                    style={[
                      FontStyle.urbanistMedium,
                      CommonStyles.descCommonTxt,
                    ]}
                  >
                    {_.get(amountDetailsData, "rentAmount", null)
                      ? `US$${parseFloat(
                          getOr(amountDetailsData, "rentAmount", 0)
                        ).toFixed(2)}`
                      : 0}
                  </Text>
                </View>

                {/* <View
              style={{
                flexDirection: "row",
                marginTop: Measures.fontSize,
                marginHorizontal: 20,
                justifyContent: "space-between",
              }}
            >
              <Text style={[FontStyle.urbanistMedium, styles.leftTxt]}>
                Young driver fee
              </Text>

              <Text style={[FontStyle.urbanistMedium, styles.rightTxt]}>
                $62.70
              </Text>
            </View> */}

                <View
                  style={{
                    flexDirection: "row",
                    marginTop: Measures.fontSize,
                    marginHorizontal: 20,
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={[FontStyle.urbanistMedium, styles.leftTxt]}>
                    Service Charge
                  </Text>

                  <Text style={[FontStyle.urbanistMedium, styles.rightTxt]}>
                    {_.get(amountDetailsData, "tripFee", null)
                      ? `US$${parseFloat(
                          getOr(amountDetailsData, "tripFee", 0)
                        ).toFixed(2)}`
                      : 0}
                  </Text>
                </View>

                {/* <View
              style={{
                flexDirection: "row",
                marginTop: Measures.fontSize,
                marginHorizontal: 20,
                justifyContent: "space-between",
              }}
            >
              <Text style={[FontStyle.urbanistMedium, styles.leftTxt]}>
                400 total miles
              </Text>

              <Text
                style={[
                  FontStyle.urbanistMedium,
                  styles.rightTxt,
                  { color: Colors.yellow },
                ]}
              >
                Free
              </Text>
            </View> */}

                {/* <View
              style={{
                flexDirection: "row",
                marginTop: Measures.fontSize,
                marginHorizontal: 20,
                justifyContent: "space-between",
              }}
            >
              <Text style={[FontStyle.urbanistMedium, styles.leftTxt]}>
                Early bird discount
              </Text>

              <Text
                style={[
                  FontStyle.urbanistMedium,
                  styles.rightTxt,
                  { color: Colors.yellow },
                ]}
              >
                -$11.00
              </Text>
            </View> */}

                <View style={styles.totalView}>
                  <Text
                    style={[
                      FontStyle.urbanistBold,
                      styles.rightTxt,
                      CommonStyles.smallCommonTxt,
                    ]}
                  >
                    Total
                  </Text>

                  <Text
                    style={[
                      FontStyle.urbanistMedium,
                      CommonStyles.descCommonTxt,
                      styles.rightTxt,
                    ]}
                  >
                    {_.get(amountDetailsData, "totalAmount", null)
                      ? `US$${parseFloat(
                          getOr(amountDetailsData, "totalAmount", 0)
                        ).toFixed(2)}`
                      : 0}
                  </Text>
                </View>
              </>
            )}

            {/* <View style={styles.freeCancelView}>
              <Icon_thumbsup />

              <View style={{ width: "90%" }}>
                <Text
                  style={[
                    FontStyle.urbanistBold,
                    styles.rightTxt,
                    CommonStyles.smallCommonTxt,
                  ]}
                >
                  Free cancellation
                </Text>

                <Text
                  style={[FontStyle.urbanistMedium, CommonStyles.descCommonTxt]}
                >
                  Full refund before 1 hour in local time of the car booking.
                </Text>
              </View>
            </View> */}

            <View
              style={{
                flexDirection: "row",
                marginTop: Measures.fontSize,
                marginHorizontal: 20,
                justifyContent: "space-between",
              }}
            >
              <Text
                style={[FontStyle.urbanistMedium, CommonStyles.descCommonTxt]}
              >
                Wallet
              </Text>
              <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center" }}
                onPress={() =>
                  navigate("MyWallet", { rentalCarObj: rentalCarObj })
                }
              >
                <Text
                  style={[
                    FontStyle.urbanistMedium,
                    CommonStyles.descCommonTxt,
                    { color: Colors.yellow },
                  ]}
                >
                  View
                </Text>
                <Image
                  style={{ width: 13, height: 13, marginLeft: 5 }}
                  source={require("../../assets/Images/Next.png")}
                />
              </TouchableOpacity>
            </View>

            {/* <View
              style={{
                flexDirection: "row",
                marginTop: Measures.fontSize,
                marginHorizontal: 20,
                justifyContent: "space-between",
              }}
            >
              <Text
                style={[FontStyle.urbanistMedium, CommonStyles.descCommonTxt]}
              >
                Promo code
              </Text>
              <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center" }}
                onPress={() =>
                  navigate("PromoCode", { rentalCarObj: rentalCarObj })
                }
              >
                <Text
                  style={[
                    FontStyle.urbanistMedium,
                    CommonStyles.descCommonTxt,
                    { color: Colors.yellow },
                  ]}
                >
                  {_.get(rentalCarObj, "promocode", null)
                    ? _.get(rentalCarObj, "promocode", null)
                    : "Add"}
                </Text>
                <Image
                  style={{ width: 13, height: 13, marginLeft: 5 }}
                  source={require("../../assets/Images/Next.png")}
                />
              </TouchableOpacity>
            </View> */}

            {/* <View style={styles.stepToBook}>
              <Text style={[FontStyle.urbanistMedium, styles.leftTxt]}>
                STEPS TO BOOK
              </Text>
            </View> */}

            {/* <View
              style={{
                flexDirection: "row",
                marginTop: Measures.fontSize,
                marginHorizontal: 20,
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text style={[FontStyle.urbanistMedium, styles.rightTxt]}>
                  Extras
                </Text>
                <Text style={[FontStyle.urbanistMedium, styles.leftTxt]}>
                  Choose from: Prepaid refuel
                </Text>
              </View>

              <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center" }}
                onPress={() => navigate("Extras")}
              >
                <Text
                  style={[
                    FontStyle.urbanistMedium,
                    styles.rightTxt,
                    { color: Colors.yellow },
                  ]}
                >
                  View
                </Text>
                <Image
                  style={{ width: 13, height: 13, marginLeft: 5 }}
                  source={require("../../assets/Images/Next.png")}
                />
              </TouchableOpacity>
            </View> */}

            {/* <View
              style={{
                flexDirection: "row",
                marginTop: Measures.fontSize,
                marginHorizontal: 20,
                justifyContent: "space-between",
              }}
            >
              <Text style={[FontStyle.urbanistMedium, styles.rightTxt]}>
                Protection plans
              </Text>

              <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center" }}
                onPress={() => navigate("ProtectionPlans")}
              >
                <Text
                  style={[
                    FontStyle.urbanistMedium,
                    styles.rightTxt,
                    { color: Colors.yellow },
                  ]}
                >
                  Select
                </Text>
                <Image
                  style={{ width: 13, height: 13, marginLeft: 5 }}
                  source={require("../../assets/Images/Next.png")}
                />
              </TouchableOpacity>
            </View> */}

            {/* <View
              style={{
                flexDirection: "row",
                marginTop: Measures.fontSize,
                marginHorizontal: 20,
                justifyContent: "space-between",
              }}
            >
              <Text style={[FontStyle.urbanistMedium, styles.rightTxt]}>
                Payment info
              </Text>

              <TouchableOpacity
                style={{ flexDirection: "row", alignItems: "center" }}
                onPress={() =>
                  navigate("PaymentMethodCard", { rentalCarObj: rentalCarObj })
                }
              >
                <Text
                  style={[
                    FontStyle.urbanistMedium,
                    styles.rightTxt,
                    { color: Colors.yellow },
                  ]}
                >
                  {_.get(rentalCarObj, "paymentObj.brand", null)}{" "}
                  {_.get(rentalCarObj, "paymentObj.last4", null)}
                </Text>
                <Image
                  style={{ width: 13, height: 13, marginLeft: 5 }}
                  source={require("../../assets/Images/Next.png")}
                />
              </TouchableOpacity>
            </View> */}

            <View style={styles.msgView}>
              <Text
                style={[FontStyle.urbanistMedium, CommonStyles.descCommonTxt]}
              >
                {`Message to ${rentalCarObj?.ownerN}`}
              </Text>
            </View>

            <View style={styles.inputFieldView}>
              <TextInput
                editable={false}
                style={[FontStyle.urbanistRegular, styles.inputTxtView]}
                placeholderTextColor={Variables.Colors.inputTxtColor}
                multiline={true}
                value={message}
                onChangeText={(val: string) => {
                  setMessage(val);
                }}
                placeholder={"Let owner know when your trip details changes"}
                returnKeyType="next"
              />
            </View>
          </View>

          <View style={styles.checkoutTxt}>
            <Text
              style={[
                FontStyle.urbanistMedium,
                CommonStyles.descCommonTxt,
                styles.leftTxt,
              ]}
            >
              {`You'll be able to message ${rentalCarObj?.ownerN} after checkout.`}
            </Text>
          </View>

          {amountDetailsData ? (
            <View style={styles.btnView}>
              <ButtonView
                btnTxt={"Continue"}
                onBtnPress={() => {
                  rentalCarObj?.id ? bookCar() : getCreateRentalCar();
                }}
                isLoading={isLoading || custLoading}
                width={Variables.Measures.width / 2}
                backgroundColor={Variables.Colors.yellow}
                fontColor={Variables.Colors.blackBg}
              />
            </View>
          ) : null}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  error: {
    fontSize: 14,
    textAlign: "center",
    color: Variables.Colors.yellow,
  },
  inputTxtView: {
    width: "99%",
    height: 95,
    borderWidth: 1,
    alignSelf: "center",
    borderRadius: 11,
    color: Variables.Colors.white,
    textAlignVertical: "top",
    paddingHorizontal: 10,
    fontSize: 14,
    paddingVertical: 15,
    borderColor: Variables.Colors.activeTab,
  },
  inputFieldView: {
    flexDirection: "column",
    marginTop: 10,
    marginHorizontal: 20,
    justifyContent: "space-between",
  },
  msgView: {
    flexDirection: "column",
    marginTop: Measures.fontSize,
    marginHorizontal: 20,
    justifyContent: "space-between",
  },
  freeCancelView: {
    flexDirection: "row",
    marginTop: Measures.fontSize,
    marginHorizontal: 20,
    justifyContent: "space-between",
  },
  totalView: {
    flexDirection: "row",
    marginTop: Measures.fontSize,
    marginHorizontal: 20,
    height: 50,
    backgroundColor: Colors.carGrey,
    justifyContent: "space-between",
    borderRadius: 10,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  btnView: {
    marginVertical: Variables.Measures.fontSize * 2.5,
  },
  checkoutTxt: {
    flexDirection: "row",
    marginTop: Measures.fontSize,
    marginHorizontal: 20,
    justifyContent: "space-between",
  },
  learnTxt: {
    fontSize: 10,
    color: Variables.Colors.darkYellow,
  },
  stepToBook: {
    flexDirection: "row",
    marginTop: Measures.fontSize,
    marginHorizontal: 20,
    justifyContent: "space-between",
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderTopColor: Colors.grey,
    borderBottomColor: Colors.grey,
    height: 50,
    alignItems: "center",
  },
  joinedTxt: {
    fontSize: 9,
    color: Variables.Colors.inputTxtColor,
    marginLeft: 5,
    marginTop: 5,
  },
  rating: {
    color: Variables.Colors.chatWhite,
    fontSize: 12,
    marginHorizontal: 5,
    marginTop: 2,
  },
  userNameBold: {
    fontSize: 17,
    color: Variables.Colors.white,
  },
  nextBtnView: {
    alignSelf: "center",
    height: Variables.Measures.fontSize * 2.5,
  },
  nextBtnTextView: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    borderRadius: 15,
    width: Variables.Measures.width / 1.8,
    backgroundColor: Variables.Colors.darkYellow,
  },
  nextTxt: {
    fontSize: Variables.Measures.fontSize / 1.2,
    color: Variables.Colors.blackBg,
  },
  userDescView: {
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginBottom: 20,
  },
  userImgStyle: {
    height: 40,
    width: 40,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: Variables.Colors.darkYellow,
  },
  userRowView: {
    flexDirection: "row",
    paddingHorizontal: 5,
    borderBottomColor: Variables.Colors.borderGrey,
    borderBottomWidth: 1,
    paddingVertical: 10,
  },
  seeAllView: {
    flex: 1,
    alignItems: "flex-end",
    marginVertical: 15,
    paddingHorizontal: 15,
  },
  ratingsRowView: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    marginLeft: 15,
  },
  reviewsTxt: {
    color: Variables.Colors.darkYellow,
    fontSize: 12,
  },
  // descTxt: {
  //   color: Variables.Colors.white,
  //   fontSize: 12,
  //   lineHeight: 17,
  // },
  userNameTxt: {
    color: Variables.Colors.chatWhite,
    marginTop: 10,
  },
  leftTxt: {
    color: Variables.Colors.chocolate,
  },
  rightTxt: {
    color: Variables.Colors.chatWhite,
  },
  ratedView: {
    borderRadius: 10,
    justifyContent: "center",
    width: "45%",
    backgroundColor: Variables.Colors.carGrey,
    marginTop: 10,
  },
  rightView: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 7,
  },
  headingTxt: {
    color: Variables.Colors.inputTxtColor,
    fontSize: 12,
    marginLeft: 15,
  },
  rowView: {
    alignSelf: "center",
    flexDirection: "row",
    paddingVertical: 10,
    width: "100%",
  },
  bgYellowView: {
    width: "95%",
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
  greyBgView: {
    backgroundColor:
      // Variables.Colors.darkBlack,
      "#0D0D0D",
    width: "94%",
    alignSelf: "center",
  },
  greyBgView1: {
    backgroundColor: Variables.Colors.darkBlack,
    width: "100%",
    alignSelf: "center",
  },
  safeAreaStyle: {
    flex: 1,
    backgroundColor: Variables.Colors.darkBlack,
  },
  ratingsTxt: {
    fontSize: 12,
    color: Variables.Colors.chatWhite,
  },
  rowCenter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "70%",
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
    width: "50%",
    justifyContent: "center",
    flex: 1,
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
    alignItems: "center",
  },
  carNameTxt: {
    color: Variables.Colors.chatWhite,
    fontSize: 16,
  },
  ratingsView: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
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
    top: Measures.StatusBarHeight + 10,
    left: 20,
  },
  perishAddress: {
    fontSize: 12,
    color: Variables.Colors.white,
  },
  keyboardView: {
    flex: 1,
  },
  carImgView: {
    height: "100%",
    width: "100%",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
});
export default Checkout;

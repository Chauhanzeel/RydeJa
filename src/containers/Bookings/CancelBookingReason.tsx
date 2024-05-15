import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { FontStyle, Variables, CommonStyles } from "../../Theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";

import { goBack } from "../../navigators/RootNavigation";

import CheckSvg from "../../assets/Images/Authentication/check.svg";
import BackSvg from "../../assets/Images/BackArrow.svg";

import Header from "../../components/Header";
import ButtonView from "../../components/ButtonView";
import { FilterModalProps } from "../types";
import { useDispatch, useSelector } from "react-redux";
import {
  bookingCancelReasonStart,
  refundAmountStart,
} from "../../actions/customerActions";
import { ReducerStateProps } from "../Inbox/InterfaceProps";
import LoginModal from "../../components/LoginModal";
import ReservationCancelModal from "../../components/ReservationCancelModal";
import _ from "lodash";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { bookingCancelStart } from "../../actions/customerActions";
import ContentLoader, { Rect, Circle } from "react-content-loader/native";
import ToastMessage from "../../components/ToastMessage";
import { getOr, toastConst } from "../../constants/constants";
import {
  transactionListStart,
  transactionListSuccess,
} from "../../actions/carOwnerActions";
import { Colors, Measures } from "../../Theme/variables";

const CancelBookingReason: React.FC<FilterModalProps> = ({ route }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [selectedId, setSelectedId] = useState([]);
  const [cancelModal, setCancelModal] = useState(false);
  const [reservation, setReservation] = useState(false);
  const [otherReason, setOtherReason] = useState("");
  const [update, setUpdate] = useState(false);
  const [match, setmatch] = useState(route?.params?.match);

  const [
    isLoading,
    bookingCancelReasonList,
    bookingCancelData,
    refundAmountData,
  ] = useSelector((state: ReducerStateProps) => [
    state.customer.isLoading,
    state.customer.bookingCancelReasonList,
    state.customer.bookingCancelData,
    state.customer.refundAmountData,
  ]);

  useEffect(() => {
    dispatch(bookingCancelReasonStart());
    _.get(route, "params.status", null) == "booked" &&
      dispatch(refundAmountStart(null, _.get(route, "params.bookId", null)));
  }, []);

  const handleSelection = (id: any) => {
    let selectedIds = [...selectedId];
    if (selectedIds.includes(id)) {
      let temp = selectedIds.filter((list) => {
        return list !== id;
      });
      setSelectedId(temp);
    } else {
      selectedIds.push(id);
      setSelectedId(selectedIds);
    }
  };

  const [checkedItems, setCheckedItems] = useState([]);

  const handleCheck = (item: any) => {
    if (checkedItems.includes(item)) {
      setCheckedItems(
        checkedItems.filter((checkedItem) => checkedItem !== item)
      );
    } else {
      setCheckedItems([...checkedItems, item]);
    }
  };

  const cancelRyde = () => {
    if (_.size(selectedId) == 0 && _.size(otherReason) == 0) {
      ToastMessage.set(
        toastConst.errorToast,
        "Please select the reason to cancel the reservation."
      );
    } else {
      if (match) {
        let p = {
          id: _.get(route, "params.bookId", null),
          reasonIds: JSON.stringify(checkedItems),
          otherReason: otherReason,
          rydeCancelType: _.get(route, "params.status", null),
        };

        const params = {
          reasonIds: checkedItems,
          otherReason: otherReason,
          log: JSON.stringify(p),
          rydeCancelType: _.get(route, "params.status", null),
        };
        dispatch(
          bookingCancelStart({
            bookId: _.get(route, "params.bookId", null),
            ...{ par: params },
          })
        );
        setUpdate(true);
      } else {
        setReservation(true);
      }
    }
  };

  useEffect(() => {
    if (update && _.get(bookingCancelData, "success", null) === true) {
      setReservation(true);
      dispatch(transactionListStart());
    }
  }, [bookingCancelData]);

  const LoadingView = () => {
    return (
      <SafeAreaView style={styles.safeAreaStyle}>
        <StatusBar
          backgroundColor={Variables.Colors.blackBg}
          barStyle="light-content"
        />
        <ScrollView style={styles.scrollView}>
          <View style={styles.loadView}>
            <ContentLoader
              backgroundColor={Variables.Colors.absoluteBgGrey}
              foregroundColor={Variables.Colors.grey}
            >
              <Rect
                x={Variables.MetricsSizes.small}
                y="0"
                rx="4"
                ry="4"
                width="30"
                height="30"
              />
              <Rect
                x={Variables.MetricsSizes.small * 7}
                y="0"
                rx="4"
                ry="4"
                width={Variables.Measures.width / 2}
                height="30"
              />
            </ContentLoader>
          </View>

          <ContentLoader
            backgroundColor={Variables.Colors.absoluteBgGrey}
            foregroundColor={Variables.Colors.grey}
            width="100%"
            height={30}
          >
            <Rect
              x={Variables.MetricsSizes.small}
              y="0"
              rx="4"
              ry="4"
              width={Variables.MetricsSizes.large}
              height={30}
            />

            <Rect
              x={Variables.MetricsSizes.small * 7}
              y="0"
              rx="4"
              ry="4"
              width={Variables.Measures.width / 1.5}
              height={30}
            />
          </ContentLoader>

          <View style={{ marginTop: 20 }} />

          <ContentLoader
            backgroundColor={Variables.Colors.absoluteBgGrey}
            foregroundColor={Variables.Colors.grey}
            width="100%"
            height={30}
          >
            <Rect
              x={Variables.MetricsSizes.small}
              y="0"
              rx="4"
              ry="4"
              width={Variables.MetricsSizes.large}
              height={30}
            />

            <Rect
              x={Variables.MetricsSizes.small * 7}
              y="0"
              rx="4"
              ry="4"
              width={Variables.Measures.width / 1.5}
              height={30}
            />
          </ContentLoader>

          <View style={{ marginTop: 20 }} />

          <ContentLoader
            backgroundColor={Variables.Colors.absoluteBgGrey}
            foregroundColor={Variables.Colors.grey}
            width="100%"
            height={30}
          >
            <Rect
              x={Variables.MetricsSizes.small}
              y="0"
              rx="4"
              ry="4"
              width={Variables.MetricsSizes.large}
              height={30}
            />

            <Rect
              x={Variables.MetricsSizes.small * 7}
              y="0"
              rx="4"
              ry="4"
              width={Variables.Measures.width / 1.5}
              height={30}
            />
          </ContentLoader>

          <View style={{ marginTop: 40 }} />
          <ContentLoader
            backgroundColor={Variables.Colors.absoluteBgGrey}
            foregroundColor={Variables.Colors.grey}
            width="100%"
            height={Variables.Measures.width / 4}
          >
            <Rect
              x={Variables.MetricsSizes.small}
              y="0"
              rx="4"
              ry="4"
              width="93%"
              height={Variables.Measures.width / 4}
            />
          </ContentLoader>
        </ScrollView>
        <View
          style={{
            position: "absolute",
            alignSelf: "center",
            bottom: 20,
            width: "90%",
          }}
        >
          <ContentLoader
            backgroundColor={Variables.Colors.absoluteBgGrey}
            foregroundColor={Variables.Colors.grey}
            width="100%"
            height={60}
          >
            <Rect
              x={Variables.MetricsSizes.small}
              y="0"
              rx="4"
              ry="4"
              width="93%"
              height={60}
            />
          </ContentLoader>
        </View>
      </SafeAreaView>
    );
  };

  return !bookingCancelReasonList ? (
    <LoadingView />
  ) : (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={CommonStyles.safeAreaStyle}>
        <Header
          centerText={
            _.get(route, "params.status", null) == "reserved"
              ? "Cancel Reservation Reason"
              : "Cancel Booking Reason"
          }
          leftSvg={<BackSvg height={25} width={25} />}
          onLeftPress={goBack}
        />

        <KeyboardAwareScrollView>
          <View style={styles.main}>
            <LoginModal
              modalVisible={cancelModal}
              onCancelPress={() => {
                setCancelModal(false);
              }}
              onOkPress={() => {
                setCancelModal(false);
                cancelRyde();
              }}
              descTxt={
                _.get(route, "params.status", null) == "reserved"
                  ? "Are you sure you want to cancel reservation?"
                  : "Are you sure you want to cancel booking?"
              }
              okTxt={"Yes"}
              cancelTxt="CANCEL"
            />
            <ReservationCancelModal
              modalVisible={reservation}
              onCancelPress={() => {
                setCancelModal(false);
              }}
              onOkPress={() => {
                setCancelModal(false);
                setReservation(true);
              }}
              descTxt={
                _.get(route, "params.status", null) == "reserved"
                  ? "Reservation canceled"
                  : "Booking canceled"
              }
            />
            <View style={{ marginTop: Variables.FontSize.regular }}>
              {_.get(bookingCancelReasonList, "totalCount", null) > 0 &&
                _.get(bookingCancelReasonList, "items", null).map(
                  (item: any, i: any) => {
                    return (
                      <TouchableOpacity
                        key={i}
                        style={styles.discountMainView}
                        onPress={() => {
                          handleSelection(item.id);
                          handleCheck(item.id);
                        }}
                      >
                        <View style={styles.leftSelectionView}>
                          {selectedId.includes(item.id) ? (
                            <CheckSvg height={21} width={25} />
                          ) : (
                            <View style={styles.checkView} />
                          )}
                        </View>
                        <View style={styles.rigthSelectionView}>
                          <Text
                            style={[
                              CommonStyles.smallCommonTxt,
                              FontStyle.urbanistSemiBold,
                            ]}
                          >
                            {_.get(item, "reason", null)}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  }
                )}
            </View>

            <TextInput
              placeholder="Care to tell us more or any other reason?"
              style={[styles.inputTxtView, CommonStyles.descCommonTxt]}
              placeholderTextColor={Variables.Colors.inputTxtColor}
              multiline={true}
              value={otherReason}
              onChangeText={(otherReason) => setOtherReason(otherReason)}
            />

            {_.get(route, "params.status") == "booked" && (
              <View style={styles.totalView1}>
                <View style={styles.totalView}>
                  <Text
                    style={[
                      FontStyle.urbanistSemiBold,
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
                    {_.get(refundAmountData, "totalAmount", null)
                      ? `US $${parseFloat(
                          getOr(refundAmountData, "totalAmount", 0)
                        ).toFixed(2)}`
                      : 0}
                  </Text>
                </View>
                <View style={styles.totalView}>
                  <Text
                    style={[
                      FontStyle.urbanistSemiBold,
                      styles.rightTxt,
                      CommonStyles.smallCommonTxt,
                    ]}
                  >
                    Cancellation Charges
                  </Text>

                  <Text
                    style={[
                      FontStyle.urbanistMedium,
                      CommonStyles.descCommonTxt,
                      styles.rightTxt,
                    ]}
                  >
                    {_.get(refundAmountData, "cancellationCharge", null)
                      ? `US $${parseFloat(
                          getOr(refundAmountData, "cancellationCharge", 0)
                        ).toFixed(2)}`
                      : 0}
                  </Text>
                </View>
                <View style={styles.totalView}>
                  <Text
                    style={[
                      FontStyle.urbanistSemiBold,
                      styles.rightTxt,
                      CommonStyles.smallCommonTxt,
                    ]}
                  >
                    Refundable Amount
                  </Text>

                  <Text
                    style={[
                      FontStyle.urbanistMedium,
                      CommonStyles.descCommonTxt,
                      styles.rightTxt,
                    ]}
                  >
                    {_.get(refundAmountData, "refundableAmount", null)
                      ? `US $${parseFloat(
                          getOr(refundAmountData, "refundableAmount", 0)
                        ).toFixed(2)}`
                      : 0}
                  </Text>
                </View>
              </View>
            )}
          </View>
        </KeyboardAwareScrollView>
        <View style={styles.cancelBtn}>
          <ButtonView
            isLoading={isLoading}
            width={Variables.Measures.width / 1.12}
            btnTxt={t("labelConst.cancel")}
            backgroundColor={Variables.Colors.btnRed}
            onBtnPress={() => {
              setCancelModal(true);
            }}
            fontColor={Variables.Colors.white}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  rightTxt: {
    color: Variables.Colors.chatWhite,
  },
  totalView: {
    alignSelf: "center",
    width: "100%",
    flexDirection: "row",
    marginVertical: Measures.fontSize / 2,
    backgroundColor: Colors.carGrey,
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalView1: {
    alignSelf: "center",
    width: "95%",
    marginTop: Measures.fontSize,
    backgroundColor: Colors.carGrey,
    justifyContent: "space-between",
    borderRadius: 10,
    alignItems: "center",
    paddingHorizontal: 10,
  },
  main: {
    width: "93%",
    alignSelf: "center",
    paddingBottom: 200,
  },
  cancelBtn: {
    position: "absolute",
    alignSelf: "center",
    bottom: 20,
    zIndex: 0,
  },
  loadView: {
    width: "100%",
    height: 60,
    marginBottom: 30,
  },
  scrollView: {
    width: "93%",
    alignSelf: "center",
  },
  safeAreaStyle: {
    flex: 1,
    backgroundColor: Variables.Colors.darkBlack,
    marginTop: Variables.Measures.StatusBarHeight,
  },
  inputTxtView: {
    width: "95%",
    height: 95,
    borderWidth: 1,
    borderColor: Variables.Colors.borderGrey,
    alignSelf: "center",
    borderRadius: 10,
    color: Variables.Colors.white,
    textAlignVertical: "top",
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginTop: Variables.FontSize.large,
    zIndex: 1,
  },

  checkView: {
    height: 20,
    width: 20,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: Variables.Colors.inputTxtColor,
  },
  discountMainView: {
    flexDirection: "row",
    borderRadius: 12,
    marginTop: 20,
    paddingVertical: 5,
  },
  headingTxt: {
    color: Variables.Colors.white,
    marginTop: Variables.Measures.fontSize,
    fontSize: 16,
  },
  leftSelectionView: {
    justifyContent: "center",
    alignItems: "center",
    width: "10%",
  },
  rigthSelectionView: {
    width: "100%",
    flex: 1,
    paddingLeft: 10,
  },
  reasonTxt: {
    color: Variables.Colors.white,
    fontSize: 16,
  },
  otherView: {
    marginTop: Variables.Measures.fontSize * 1.5,
  },
  otherTxt: {
    color: Variables.Colors.white,
    fontSize: 18,
  },
  textInputStyle: {
    width: "93%",
    backgroundColor: Variables.Colors.greyBg,
    paddingHorizontal: 15,
    borderRadius: 10,
    color: Variables.Colors.inputTxtColor,
    height: 60,
  },
  textInputView: {
    alignItems: "center",
    marginTop: Variables.Measures.unit * 2,
  },
});
export default CancelBookingReason;

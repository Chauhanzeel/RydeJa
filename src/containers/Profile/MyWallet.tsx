import React, { useEffect, useState } from "react";
import { CommonStyles, FontStyle, Variables } from "../../Theme";
import {
  StyleSheet,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Modal,
  ActivityIndicator,
} from "react-native";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import { goBack, navigate } from "../../navigators/RootNavigation";
import { PaymentMode } from "../MockData/PaymentMode";

import DashedLine from "react-native-dashed-line";

import Header from "../../components/Header";
import RemoveMethod from "../../components/RemoveMethod";

import BackSvg from "../../assets/Images/ProfileLeft.svg";
import AddFundSvg from "../../assets/Images/FundPlus.svg";
import RightArrowSvg from "../../assets/Images/TransactionRight.svg";
import RemoveCardSvg from "../../assets/Images/removeCard.svg";
import LockSvg from "../../assets/Images/LockWhite.svg";
import MasterSvg from "../../assets/Images/Social/Master.svg";
import PaypalSvg from "../../assets/Images/Social/Paypal.svg";
import VisaTxtSvg from "../../assets/Images/VisaSvg.svg";
import DeleteConfirmationSvg from "../../assets/Images/Confirmation.svg";
import { Colors, Measures } from "../../Theme/variables";
import { useDispatch, useSelector } from "react-redux";
import { ReducerStateProps } from "../Inbox/InterfaceProps";
import { useIsFocused } from "@react-navigation/native";
import {
  deleteCardStart,
  saveCardListStart,
  stripeAccDetailsStart,
} from "../../actions/customerActions";
import _ from "lodash";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ContentLoader, { Rect, Circle } from "react-content-loader/native";
import { RefreshControl } from "react-native";
import { getOr } from "../../constants/constants";

interface CreateProfileProps {}

const MyWallet: React.FC<CreateProfileProps> = () => {
  const { t } = useTranslation();
  const isFocused = useIsFocused();
  const [selectedId, setSelectedId] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const [openRemoveModal, setOpenRemoveModal] = useState(false);
  const [paymentConfirmation, setPaymentConfirmation] = useState(false);

  const [isDeleteCard, setDeleteCard] = useState(false);
  const [cardId, setCardId] = useState(null);

  const [userDetails, setUserDetails] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const data = Array.from({ length: 3 });
  const dispatch = useDispatch();

  const [
    isLoading,
    saveCardList,
    viewCard,
    updateCard,
    deleteCard,
    stripeAccDetailsData,
  ] = useSelector((state: ReducerStateProps) => [
    state.customer.isLoading,
    state.customer.saveCardList,
    state.customer.viewCard,
    state.customer.updateCard,
    state.customer.deleteCard,
    state.customer.stripeAccDetailsData,
  ]);
  const cardDetails = _.head(saveCardList.items);

  useEffect(() => {
    if (isFocused) {
      dispatch(stripeAccDetailsStart());
      dispatch(saveCardListStart());
      userData();
    }
  }, [isFocused]);

  const userData = async () => {
    let loginUserData: string | any = await AsyncStorage.getItem(
      "loginUserData"
    );
    setUserDetails(JSON.parse(loginUserData));
  };

  const handleSelection = (item: any) => {
    setOpenRemoveModal(!openRemoveModal);
    let selectedItem = selectedId;
    if (selectedItem === item.id) {
      setSelectedId(null);
      setSelectedItem(null);
    } else {
      setSelectedId(item.id);
      setSelectedItem(item.paymentMethod);
    }
  };

  const renderOffers = (item: any) => {
    return (
      <TouchableOpacity
        style={styles.discountMainView}
        onPress={() => {
          handleSelection(item);
          setSelectedItem("Credit or debit card");
        }}
      >
        <View style={styles.leftView}>
          <View>{item.paymentImg}</View>
        </View>
        <View style={styles.rightView}>
          <Text style={[styles.offerTxt, FontStyle.urbanistMedium]}>
            {item.paymentMethod}
          </Text>
        </View>
        <View style={styles.forthView}>
          {/* {item.id === selectedId ? <SelectionView /> : <UnSelectionView />} */}
          {_.get(saveCardList, "totalCount", null) > 0 ? (
            <SelectionView />
          ) : (
            <UnSelectionView />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const SelectionView = () => {
    return (
      <View style={{ flexDirection: "row" }}>
        <View style={styles.unSelectionView}>
          <View style={styles.innerOrangeView} />
        </View>
      </View>
    );
  };

  const UnSelectionView = () => {
    return <View style={styles.unSelectionView} />;
  };

  const LoadingView = () => {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={CommonStyles.safeAreaStyle}>
          <ScrollView
            style={{
              height: Variables.Measures.height,
            }}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor={Variables.Colors.white}
              />
            }
          >
            <View
              style={{
                width: Variables.Measures.width,
                height: 60,
                marginTop: 20,
              }}
            >
              <ContentLoader
                backgroundColor={Variables.Colors.absoluteBgGrey}
                foregroundColor={Variables.Colors.grey}
              >
                <Rect x="15" y="0" rx="4" ry="4" width="30" height="30" />
                <Rect x="65" y="0" rx="4" ry="4" width="150" height="30" />
              </ContentLoader>
            </View>

            <ContentLoader
              backgroundColor={Variables.Colors.absoluteBgGrey}
              foregroundColor={Variables.Colors.grey}
              width={Variables.Measures.width}
              height={Variables.Measures.width / 1.7}
            >
              <Rect
                x="10"
                y="0"
                rx="4"
                ry="4"
                width={Variables.Measures.width / 1.06}
                height={Variables.Measures.width / 1.7}
              />
              <Rect
                x={Variables.Measures.width / 12}
                y={Variables.Measures.width / 2.3}
                rx="4"
                ry="4"
                width={Variables.Measures.width / 1.22}
                height={3}
              />
              <Rect
                x={Variables.Measures.width / 12}
                y={Variables.Measures.width / 2.05}
                rx="4"
                ry="4"
                width={Variables.Measures.width / 3}
                height={20}
              />

              <Rect
                x={Variables.Measures.width / 1.25}
                y={Variables.Measures.width / 2.1}
                rx="4"
                ry="4"
                width="40"
                height={35}
              />

              <Rect
                x="40"
                y="15"
                rx="4"
                ry="4"
                width={Variables.Measures.width / 3.5}
                height={20}
              />

              <Circle cx="45" cy="55" r="4" />
              <Circle cx="55" cy="55" r="4" />
              <Circle cx="65" cy="55" r="4" />
              <Circle cx="75" cy="55" r="4" />

              <Circle cx="90" cy="55" r="4" />
              <Circle cx="100" cy="55" r="4" />
              <Circle cx="110" cy="55" r="4" />
              <Circle cx="120" cy="55" r="4" />

              <Circle cx="135" cy="55" r="4" />
              <Circle cx="145" cy="55" r="4" />
              <Circle cx="155" cy="55" r="4" />
              <Circle cx="165" cy="55" r="4" />

              <Rect
                x={Variables.Measures.width / 1.6}
                y="15"
                rx="4"
                ry="4"
                width={Variables.Measures.width / 3.5}
                height={40}
              />

              <Rect
                x="40"
                y={Variables.Measures.width / 3.5}
                rx="4"
                ry="4"
                width={Variables.Measures.width / 3.5}
                height={40}
              />

              <Rect
                x={Variables.Measures.width / 1.6}
                y={Variables.Measures.width / 3.5}
                rx="4"
                ry="4"
                width={Variables.Measures.width / 3.5}
                height={40}
              />

              <Rect
                x={Variables.Measures.width / 1.55}
                y={Variables.Measures.width / 3.3}
                rx="4"
                ry="4"
                width={25}
                height={25}
              />

              <Rect
                x={Variables.Measures.width / 1.35}
                y={Variables.Measures.width / 3.1}
                rx="4"
                ry="4"
                width={50}
                height={10}
              />
            </ContentLoader>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: Variables.FontSize.large * 2,
                width: "95%",
                alignSelf: "center",
                height: Variables.FontSize.large,
              }}
            >
              <ContentLoader
                backgroundColor={Variables.Colors.absoluteBgGrey}
                foregroundColor={Variables.Colors.grey}
                width="45%"
                height={Variables.MetricsSizes.large * 2}
              >
                <Rect
                  x="5"
                  y="10"
                  rx="4"
                  ry="4"
                  width="150"
                  height={Variables.FontSize.regular}
                />
              </ContentLoader>

              <ContentLoader
                backgroundColor={Variables.Colors.absoluteBgGrey}
                foregroundColor={Variables.Colors.grey}
                width="50%"
                height={Variables.MetricsSizes.large * 2}
              >
                <Rect
                  x="5%"
                  y="0"
                  rx="4"
                  ry="4"
                  width="90%"
                  height={Variables.FontSize.large}
                />
              </ContentLoader>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: Variables.FontSize.large,
                width: "95%",
                alignSelf: "center",
                height: Variables.MetricsSizes.large * 2,
              }}
            >
              <ContentLoader
                backgroundColor={Variables.Colors.absoluteBgGrey}
                foregroundColor={Variables.Colors.grey}
                width="50%"
                height="100%"
              >
                <Rect x="5" y="5" rx="4" ry="4" width="20%" height="80%" />

                <Rect
                  x={Variables.MetricsSizes.small * 5}
                  y={Variables.FontSize.regular}
                  rx="4"
                  ry="4"
                  width="70%"
                  height={Variables.FontSize.regular}
                />
              </ContentLoader>

              <ContentLoader
                backgroundColor={Variables.Colors.absoluteBgGrey}
                foregroundColor={Variables.Colors.grey}
                width="50%"
                height={Variables.MetricsSizes.large * 2}
              >
                <Circle
                  cx={"85%"}
                  cy={Variables.FontSize.regular * 1.5}
                  r={15}
                />
              </ContentLoader>
            </View>

            {/* <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: Variables.FontSize.regular / 2,
                width: "95%",
                alignSelf: "center",
                height: Variables.MetricsSizes.large * 2,
              }}
            >
              <ContentLoader
                backgroundColor={Variables.Colors.absoluteBgGrey}
                foregroundColor={Variables.Colors.grey}
                width="50%"
                height="100%"
              >
                <Rect x="5" y="5" rx="4" ry="4" width="20%" height="80%" />

                <Rect
                  x={Variables.MetricsSizes.small * 5}
                  y={Variables.FontSize.regular}
                  rx="4"
                  ry="4"
                  width="70%"
                  height={Variables.FontSize.regular}
                />
              </ContentLoader>

              <ContentLoader
                backgroundColor={Variables.Colors.absoluteBgGrey}
                foregroundColor={Variables.Colors.grey}
                width="50%"
                height={Variables.MetricsSizes.large * 2}
              >
                <Circle
                  cx={"85%"}
                  cy={Variables.FontSize.regular * 1.5}
                  r={15}
                />
              </ContentLoader>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: Variables.FontSize.regular,
                width: "95%",
                alignSelf: "center",
                height: Variables.MetricsSizes.large * 2,
              }}
            >
              <ContentLoader
                backgroundColor={Variables.Colors.absoluteBgGrey}
                foregroundColor={Variables.Colors.grey}
                width="50%"
                height="100%"
              >
                <Rect x="5" y="5" rx="4" ry="4" width="20%" height="80%" />

                <Rect
                  x={Variables.MetricsSizes.small * 5}
                  y={Variables.FontSize.regular}
                  rx="4"
                  ry="4"
                  width="70%"
                  height={Variables.FontSize.regular}
                />
              </ContentLoader>

              <ContentLoader
                backgroundColor={Variables.Colors.absoluteBgGrey}
                foregroundColor={Variables.Colors.grey}
                width="50%"
                height={Variables.MetricsSizes.large * 2}
              >
                <Circle
                  cx={"85%"}
                  cy={Variables.FontSize.regular * 1.5}
                  r={15}
                />
              </ContentLoader>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: Variables.FontSize.regular,
                width: "95%",
                alignSelf: "center",
                height: Variables.MetricsSizes.large * 2,
              }}
            >
              <ContentLoader
                backgroundColor={Variables.Colors.absoluteBgGrey}
                foregroundColor={Variables.Colors.grey}
                width="50%"
                height="100%"
              >
                <Rect x="5" y="5" rx="4" ry="4" width="20%" height="80%" />

                <Rect
                  x={Variables.MetricsSizes.small * 5}
                  y={Variables.FontSize.regular}
                  rx="4"
                  ry="4"
                  width="70%"
                  height={Variables.FontSize.regular}
                />
              </ContentLoader>

              <ContentLoader
                backgroundColor={Variables.Colors.absoluteBgGrey}
                foregroundColor={Variables.Colors.grey}
                width="50%"
                height={Variables.MetricsSizes.large * 2}
              >
                <Circle
                  cx={"85%"}
                  cy={Variables.FontSize.regular * 1.5}
                  r={15}
                />
              </ContentLoader>
            </View> */}
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  };

  const cardItem = (item: any, index: any) => {
    return (
      <View
        style={[
          styles.cardView,
          { marginLeft: index % item.length !== 0 ? 8 : 0 },
        ]}
      >
        <View style={{ marginTop: 5 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <View style={{ width: "62%" }}>
              <Text style={[FontStyle.urbanistBold, styles.nameTxt]}>
                {_.get(item, "name", null)}
              </Text>
              <Text style={[FontStyle.urbanistSemiBold, styles.cardNumTxt]}>
                <View style={styles.dot} /> <View style={styles.dot} />{" "}
                <View style={styles.dot} />
                {"  "} <View style={styles.dot} /> <View style={styles.dot} />{" "}
                <View style={styles.dot} />
                {"  "}
                <View style={styles.dot} /> <View style={styles.dot} />{" "}
                <View style={styles.dot} />
                {"  "}
                {_.get(item, "last4", null)}
              </Text>
              {/* <Text style={[FontStyle.urbanistSemiBold, styles.balanceTxt]}>
                Your balance
              </Text> */}
            </View>
            {_.get(item, "brand", null) === "Visa" ? (
              <View>
                <VisaTxtSvg />
              </View>
            ) : (
              <View>
                <MasterSvg />
              </View>
            )}
          </View>
          <View
            style={[
              styles.amountView,
              // { height: Variables.Measures.width / 4 },
            ]}
          >
            {/* <Text
              style={[
                FontStyle.urbanistBold,
                CommonStyles.LargeCommonTxt,
                { marginBottom: 10 },
              ]}
            >
              {`$${parseFloat(
                getOr(stripeAccDetailsData, "balance", 0)
              ).toFixed(2)}`}
            </Text>
            <TouchableOpacity
              style={[styles.fundsView, { marginTop: 15, marginRight: 5 }]}
              onPress={() =>
                navigate("AddFunds", { id: _.get(item, "id", null) })
              }
            >
              <AddFundSvg />
              <View>
                <Text style={[FontStyle.urbanistSemiBold, styles.fundsTxt]}>
                  Add funds
                </Text>
              </View>
            </TouchableOpacity> */}
          </View>
          <View style={{ marginVertical: 20 }}>
            <DashedLine
              dashLength={4}
              dashColor={Variables.Colors.borderGrey}
            />
          </View>

          <TouchableOpacity
            style={styles.transactionView}
            onPress={() => {
              navigate("Transaction");
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Text style={[FontStyle.urbanistMedium, styles.transactionTxt]}>
                Transactions
              </Text>
            </View>
            <RightArrowSvg style={{ marginLeft: 10 }} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const deleteCardItem = () => {
    let params = {
      id: cardId,
    };

    dispatch(deleteCardStart(params));
  };

  useEffect(() => {
    setCardId(_.get(saveCardList, "items[0].id", null));
    if (!isLoading) {
      setRefreshing(false);
    }
  }, [saveCardList]);

  const onRefresh = () => {
    dispatch(stripeAccDetailsStart());
    dispatch(saveCardListStart());
    userData();
    setRefreshing(true);
  };

  const RectangularBoxLoader = () => {
    return (
      <View>
        <ContentLoader
          backgroundColor={Variables.Colors.absoluteBgGrey}
          foregroundColor={Variables.Colors.grey}
          width={Variables.Measures.width}
          height={Variables.Measures.width / 1.7}
        >
          <Rect
            x="10"
            y="0"
            rx="4"
            ry="4"
            width={Variables.Measures.width / 1.06}
            height={Variables.Measures.width / 1.7}
          />
          <Rect
            x={Variables.Measures.width / 12}
            y={Variables.Measures.width / 2.3}
            rx="4"
            ry="4"
            width={Variables.Measures.width / 1.22}
            height={3}
          />
          <Rect
            x={Variables.Measures.width / 12}
            y={Variables.Measures.width / 2.05}
            rx="4"
            ry="4"
            width={Variables.Measures.width / 3}
            height={20}
          />

          <Rect
            x={Variables.Measures.width / 1.25}
            y={Variables.Measures.width / 2.1}
            rx="4"
            ry="4"
            width="40"
            height={35}
          />

          <Rect
            x="40"
            y="15"
            rx="4"
            ry="4"
            width={Variables.Measures.width / 3.5}
            height={20}
          />

          <Circle cx="45" cy="55" r="4" />
          <Circle cx="55" cy="55" r="4" />
          <Circle cx="65" cy="55" r="4" />
          <Circle cx="75" cy="55" r="4" />

          <Circle cx="90" cy="55" r="4" />
          <Circle cx="100" cy="55" r="4" />
          <Circle cx="110" cy="55" r="4" />
          <Circle cx="120" cy="55" r="4" />

          <Circle cx="135" cy="55" r="4" />
          <Circle cx="145" cy="55" r="4" />
          <Circle cx="155" cy="55" r="4" />
          <Circle cx="165" cy="55" r="4" />

          <Rect
            x={Variables.Measures.width / 1.6}
            y="15"
            rx="4"
            ry="4"
            width={Variables.Measures.width / 3.5}
            height={40}
          />

          <Rect
            x="40"
            y={Variables.Measures.width / 3.5}
            rx="4"
            ry="4"
            width={Variables.Measures.width / 3.5}
            height={40}
          />

          <Rect
            x={Variables.Measures.width / 1.6}
            y={Variables.Measures.width / 3.5}
            rx="4"
            ry="4"
            width={Variables.Measures.width / 3.5}
            height={40}
          />

          <Rect
            x={Variables.Measures.width / 1.55}
            y={Variables.Measures.width / 3.3}
            rx="4"
            ry="4"
            width={25}
            height={25}
          />

          <Rect
            x={Variables.Measures.width / 1.35}
            y={Variables.Measures.width / 3.1}
            rx="4"
            ry="4"
            width={50}
            height={10}
          />
        </ContentLoader>
      </View>
    );
  };

  return !_.get(saveCardList, "items", null) ? (
    <LoadingView />
  ) : (
    <View style={{ flex: 1 }}>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={CommonStyles.safeAreaStyle}>
        <Header
          centerText="My Wallet"
          leftSvg={<BackSvg />}
          onLeftPress={goBack}
        />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={Variables.Colors.white}
            />
          }
          style={{ marginBottom: Variables.FontSize.large * 2 }}
        >
          <View
            style={{
              marginTop: Variables.Measures.fontSize,
            }}
          >
            <FlatList
              horizontal={true}
              style={{
                width: "96%",
                alignSelf: "center",
              }}
              data={_.get(saveCardList, "items", null) || []}
              renderItem={({ item, index }) => cardItem(item, index)}
              // ListEmptyComponent={() => (
              //   <View
              //     style={{
              //       width: Measures.width,
              //       height: Measures.width / 2.5,
              //       justifyContent: "center",
              //       alignItems: "center",
              //       alignSelf: "center",
              //     }}
              //   >
              //     <Text style={[FontStyle.urbanistSemiBold, styles.tripsTxt]}>
              //       No cards added.
              //     </Text>
              //   </View>
              // )}
            />

            <View style={styles.paymentMethodView}>
              <View style={{ flexShrink: 1 }}>
                <Text
                  style={[FontStyle.urbanistBold, CommonStyles.smallCommonTxt]}
                >
                  Payment Methods
                </Text>
              </View>
              {_.get(saveCardList, "totalCount", null) <= 0 ? (
                <TouchableOpacity
                  style={styles.paymentView}
                  onPress={() => navigate("PaymentMethod")}
                >
                  <Text
                    style={[
                      FontStyle.urbanistSemiBold,
                      CommonStyles.descCommonTxt,
                      styles.addPaymentTxt,
                    ]}
                  >
                    Add payment method
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
          {_.get(saveCardList, "totalCount", null) > 0 && (
            <View
              style={{
                marginTop: Variables.Measures.fontSize,
              }}
            >
              <FlatList
                data={PaymentMode}
                renderItem={({ item }: object | any) => renderOffers(item)}
                extraData={selectedId}
                keyExtractor={(index) => index.toString()}
              />
            </View>
          )}
        </ScrollView>
        <View style={styles.infoAbsoluteView}>
          <View style={styles.lockSvgView}>
            <LockSvg />
            <Text
              style={[
                FontStyle.urbanistMedium,
                CommonStyles.descCommonTxt,
                styles.secureTxt,
              ]}
            >
              Your information is stored securely
            </Text>
          </View>
        </View>

        {selectedItem !== "Credit or debit card" ? null : ( // /> //   }} //     setPaymentConfirmation(!paymentConfirmation); //     setOpenRemoveModal(!openRemoveModal); //   onClosePress={() => { //   paymentSvg={<PaypalSvg />} //   removeTxt="Remove payment method" //   paymentInfo="yourmail@gmail.com" //   paymentMethod="Paypal" //   onClose={() => setOpenRemoveModal(!openRemoveModal)} //   modalVisible={openRemoveModal} // <RemoveMethod
          <RemoveMethod
            id={_.get(saveCardList, "items[0].id")}
            modalVisible={openRemoveModal}
            onClose={() => setOpenRemoveModal(!openRemoveModal)}
            last4={_.get(saveCardList, "items[0].last4", null)}
            paymentInfo={
              "   Expire date - " +
              _.get(saveCardList, "items[0].exp_month", null) +
              "/" +
              _.get(saveCardList, "items[0].exp_year")
            }
            removeTxt="Remove payment method"
            visaCard={
              _.get(saveCardList, "items[0].brand") == "Visa" ? true : false
            }
            paymentSvg={
              _.get(saveCardList, "items[0].brand") == "Visa" ? (
                <VisaTxtSvg />
              ) : (
                <MasterSvg />
              )
            }
            onClosePress={() => {
              setOpenRemoveModal(!openRemoveModal);
              setPaymentConfirmation(!paymentConfirmation);
            }}
          />
        )}
        <Modal
          animationType="slide"
          transparent={true}
          visible={paymentConfirmation}
          onRequestClose={() => {}}
        >
          <View style={styles.parentView}>
            <View style={styles.modalView}>
              <View style={styles.modalBorderView}>
                <View
                  style={{
                    width: "80%",
                    alignSelf: "center",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <View style={{ marginBottom: 20 }}>
                    <DeleteConfirmationSvg />
                  </View>
                  <Text style={[styles.modalText, FontStyle.urbanistMedium]}>
                    Are you sure you want to delete this payment method?
                  </Text>
                </View>
              </View>
              <DashedLine
                dashLength={5}
                dashColor={Variables.Colors.carsBorderGrey}
                dashThickness={0.5}
              />
              <View style={styles.btnOuterView}>
                <TouchableOpacity
                  style={styles.btnInnerView}
                  onPress={(val: any) =>
                    setPaymentConfirmation(!paymentConfirmation)
                  }
                >
                  <Text style={[FontStyle.urbanistBold, styles.btnTxt]}>
                    CANCEL
                  </Text>
                </TouchableOpacity>
                <DashedLine
                  dashLength={7}
                  dashColor={Variables.Colors.borderGrey}
                  axis="vertical"
                />
                <TouchableOpacity
                  onPress={(val: any) => {
                    setPaymentConfirmation(!paymentConfirmation);

                    // setCardId(_.get(saveCardList, "items[0].id", null));
                    deleteCardItem();

                    // setDeleteCard(!isDeleteCard);
                  }}
                  style={styles.continueBtnView}
                >
                  <Text style={[FontStyle.urbanistBold, styles.btnTxt]}>
                    DELETE
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isDeleteCard}
          onRequestClose={() => {}}
        >
          <View style={styles.parentView}>
            <View style={styles.modalView}>
              <View style={styles.modalBorderView}>
                <View
                  style={{
                    width: "80%",
                    alignSelf: "center",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <View style={{ marginBottom: 20 }}>
                    <DeleteConfirmationSvg />
                  </View>
                  <Text style={[styles.modalText, FontStyle.urbanistMedium]}>
                    Are you sure you want to delete this card?
                  </Text>
                </View>
              </View>
              <DashedLine
                dashLength={5}
                dashColor={Variables.Colors.borderGrey}
              />
              <View style={styles.btnOuterView}>
                <TouchableOpacity
                  style={styles.btnInnerView}
                  onPress={(val: any) => setDeleteCard(!isDeleteCard)}
                >
                  <Text style={[FontStyle.urbanistBold, styles.btnTxt]}>
                    CANCEL
                  </Text>
                </TouchableOpacity>
                <DashedLine
                  dashLength={7}
                  dashColor={Variables.Colors.borderGrey}
                  axis="vertical"
                />
                <TouchableOpacity
                  onPress={(val: any) => {
                    deleteCardItem(), setDeleteCard(!isDeleteCard);
                  }}
                  style={styles.continueBtnView}
                >
                  <Text style={[FontStyle.urbanistBold, styles.btnTxt]}>
                    DELETE
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  tripsTxt: {
    color: Variables.Colors.white,
    fontSize: 22,
  },
  lockSvgView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  infoAbsoluteView: {
    // alignItems: "center",
    // height: Measures.fontSize * 3,
    // justifyContent: "center",
    // width: "100%",

    position: "absolute",
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: "center",
    width: "100%",
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 7,
    backgroundColor: Colors.white,
  },
  offerTxt: {
    color: Variables.Colors.white,
    fontSize: Variables.Measures.fontSize / 1.6,
  },
  discountMainView: {
    flexDirection: "row",
    borderRadius: 12,
  },
  leftView: {
    width: "13%",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 5,
    marginLeft: 5,
  },
  rightView: {
    width: "55%",
    paddingVertical: 20,
  },
  unSelectionView: {
    height: 22,
    width: 22,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: Variables.Colors.yellow,
    alignItems: "center",
    justifyContent: "center",
  },
  innerOrangeView: {
    height: 22,
    width: 22,
    backgroundColor: Variables.Colors.yellow,
    borderRadius: 15,
  },
  forthView: {
    marginRight: 15,
    alignItems: "flex-end",
    justifyContent: "center",
    flex: 1,
    width: "30%",
  },
  nameTxt: {
    color: Variables.Colors.white,
    fontSize: 20,
  },
  cardNumTxt: {
    color: Variables.Colors.white,
    fontSize: 14,
  },
  balanceTxt: {
    color: Variables.Colors.white,
    fontSize: Measures.fontSize - 3,
    marginTop: 20,
  },
  fundsTxt: {
    fontSize: 16,
    marginLeft: 5,
  },
  dollarTxt: {
    color: Variables.Colors.white,
    fontSize: 40,
  },
  transactionTxt: {
    color: Variables.Colors.inputTxtColor,
    fontSize: 16,
  },
  paymentTxt: {
    color: Variables.Colors.white,
    fontSize: 18,
  },
  paymentView: {
    height: 40,
    backgroundColor: Variables.Colors.greyBg,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  addPaymentTxt: {
    color: Variables.Colors.inputTxtColor,
  },
  fundsView: {
    backgroundColor: Variables.Colors.darkYellow,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    paddingHorizontal: 8,
    borderRadius: 8,
    paddingVertical: 5,
  },
  amountView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },
  cardView: {
    width: Variables.Measures.width / 1.1,
    backgroundColor: Variables.Colors.greyBg,
    alignSelf: "center",
    borderRadius: 10,
    padding: 20,
    // paddingVertical: 10,
  },
  transactionView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  paymentMethodView: {
    marginTop: Variables.Measures.fontSize,
    width: "90%",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  secureTxt: {
    color: Variables.Colors.white,
    marginLeft: 5,
  },
  modalBorderView: {
    paddingVertical: 25,
  },
  continueBtnView: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  btnInnerView: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
  },
  btnOuterView: {
    width: "100%",
    flexDirection: "row",
    height: 50,
  },
  btnTxt: {
    color: Variables.Colors.darkYellow,
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 0.15,
  },
  modalDescTxt: {
    color: Variables.Colors.white,
    fontSize: 14,
    lineHeight: 22,
    textAlign: "center",
    marginTop: 8,
  },
  parentView: {
    backgroundColor: "rgba(13, 13, 13, .8)",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  modalText: {
    color: Variables.Colors.white,
    fontSize: 16,
    textAlign: "center",
    lineHeight: 22,
  },
  modalView: {
    backgroundColor: Variables.Colors.carGrey,
    borderRadius: 5,
    width: "90%",
    alignSelf: "center",
  },
});

export default MyWallet;

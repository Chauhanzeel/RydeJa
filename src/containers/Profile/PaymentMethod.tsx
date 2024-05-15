import React, { useState, useRef, useEffect } from "react";
import { CommonStyles, FontStyle, Variables } from "../../Theme";
import {
  StyleSheet,
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import { goBack, navigate } from "../../navigators/RootNavigation";
import { PaymentMode } from "../MockData/PaymentMode";

import Header from "../../components/Header";

import BackSvg from "../../assets/Images/ProfileLeft.svg";
import LockSvg from "../../assets/Images/LockWhite.svg";
import { useSelector } from "react-redux";
import { ReducerStateProps } from "../Inbox/InterfaceProps";
import _ from "lodash";

interface CreateProfileProps {}

const PaymentMethod: React.FC<CreateProfileProps> = () => {
  const { t } = useTranslation();
  const [selectedId, setSelectedId] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);

  const [saveCardList] = useSelector((state: ReducerStateProps) => [
    state.customer.saveCardList,
  ]);

  const handleSelection = (item: any) => {
    let selectedItem = selectedId;
    if (selectedItem === item.id) {
      setSelectedId(null);
      setSelectedItem(null);
    } else {
      setSelectedId(item.id);
      setSelectedItem(item.paymentMethod);
    }
    if (item.paymentMethod === "Credit or debit card") {
      navigate("AddPaymentCard");
    }
  };

  const renderOffers = (item: any) => {
    return (
      <TouchableOpacity
        style={styles.discountMainView}
        onPress={() => {
          // handleSelection(item);
          navigate("AddPaymentCard");
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
          {_.get(saveCardList, "totalCount", null) > 0 ? (
            <SelectionView />
          ) : (
            <UnSelectionView />
          )}
          {/* {item.id === selectedId ?
            <SelectionView />
            : <UnSelectionView />} */}
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

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={CommonStyles.safeAreaStyle}>
        <Header
          centerText="Add payment method"
          leftSvg={<BackSvg />}
          onLeftPress={goBack}
        />
        <ScrollView>
          <View style={{ marginTop: Variables.Measures.fontSize }}>
            <FlatList
              data={PaymentMode}
              renderItem={({ item }: object | any) => renderOffers(item)}
              extraData={selectedId}
              keyExtractor={(index) => index.toString()}
            />
          </View>
        </ScrollView>
        <View style={styles.infoAbsoluteView}>
          <View style={styles.lockSvgView}>
            <LockSvg />
            <Text style={[FontStyle.urbanistMedium, styles.secureTxt]}>
              Your information is stored securely
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  lockSvgView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  infoAbsoluteView: {
    position: "absolute",
    bottom: 50,
    left: 0,
    right: 0,
    alignItems: "center",
    width: "100%",
  },
  offerTxt: {
    color: Variables.Colors.white,
    fontSize: 16,
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
    fontSize: 22,
  },
  balanceTxt: {
    color: Variables.Colors.white,
    fontSize: 13,
    marginVertical: 20,
  },
  fundsTxt: {
    fontSize: 15,
    marginLeft: 5,
  },
  dollarTxt: {
    color: Variables.Colors.white,
    fontSize: 40,
  },
  transactionTxt: {
    color: Variables.Colors.inputTxtColor,
    fontSize: 15,
  },
  paymentTxt: {
    color: Variables.Colors.white,
    fontSize: 15,
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
  },
  cardView: {
    width: "93%",
    backgroundColor: Variables.Colors.greyBg,
    alignSelf: "center",
    borderRadius: 10,
    paddingHorizontal: 25,
    paddingVertical: 10,
  },
  transactionView: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  paymentMethodView: {
    marginTop: Variables.Measures.fontSize * 2,
    width: "90%",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  secureTxt: {
    color: Variables.Colors.white,
    fontSize: 14,
    marginLeft: 5,
  },
});

export default PaymentMethod;

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { FontStyle, Variables, Images, CommonStyles } from "../../Theme";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";

import Header from "../../components/Header";
import ButtonView from "../../components/ButtonView";
import { goBack, navigate } from "../../navigators/RootNavigation";

import BackSvg from "../../assets/Images/BackArrow.svg";
import FundsAdd from "../../components/FundsAdd";
import _ from "lodash";
import ToastMessage from "../../components/ToastMessage";
import { useDispatch, useSelector } from "react-redux";
import { GetApprovedProps, ReducerStateProps } from "../Inbox/InterfaceProps";
import { addFundStart } from "../../actions/customerActions";
import {
  stripePaymentStart,
  stripePaymentSuccess,
} from "../../actions/paymentActions";
import { toastConst } from "../../constants/constants";
import {
  transactionListStart,
  transactionListSuccess,
} from "../../actions/carOwnerActions";

const AddFunds: React.FC<GetApprovedProps> = ({ route }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const cardId = route.params?.id;

  const [amount, setAmount] = useState("0");
  const [fundsModal, setFundsModal] = useState(false);
  const [nextCall, setNextCall] = useState(false);
  const [nextCall1, setNextCall1] = useState(false);

  const [
    isLoading,
    profileDetailsData,
    stripePaymentData,
    addFundData,
    isLoadingPay,
  ] = useSelector((state: ReducerStateProps) => [
    state.customer.isLoading,
    state.user.profileDetailsData,
    state.payment.stripePaymentData,
    state.customer.addFundData,
    state.payment.isLoading,
  ]);

  const validateNum = (val: string) => {
    const sanitizedText = val?.replace(/[^0-9.]/g, "");
    setAmount(sanitizedText);
  };

  useEffect(() => {
    if (nextCall1 && _.get(addFundData, "success", null)) {
      setFundsModal(true);
      dispatch(transactionListStart());
    }
  }, [addFundData]);

  useEffect(() => {
    if (stripePaymentData && nextCall) {
      let params = {
        amount: parseFloat(amount),
        currency: "USD",
      };
      dispatch(addFundStart(params));
      setNextCall1(true);
    }
  }, [stripePaymentData]);

  const paymentMethod = () => {
    if (parseFloat(amount) == 0) {
      ToastMessage.set(
        toastConst.errorToast,
        "Amount should be greater than 0."
      );
    } else {
      if (cardId == null) {
        ToastMessage.set(toastConst.errorToast, "First select payment details");
        goBack();
      } else {
        const params = {
          amount: parseFloat(amount) * 100,
          currency: "USD",
          customer: _.get(profileDetailsData, "verifiedInfo.stripeId", null),
          source: cardId,
          description: "Fund Add payment amount $" + parseFloat(amount),
        };
        dispatch(stripePaymentStart(params));
        setNextCall(true);
      }
    }
  };

  return (
    <SafeAreaView style={CommonStyles.safeAreaStyle}>
      <StatusBar barStyle="light-content" />

      <Header
        centerText="Add funds"
        leftSvg={<BackSvg height={25} width={25} />}
        onLeftPress={goBack}
      />

      <ScrollView>
        <View
          style={{
            alignItems: "center",
            marginTop: Variables.Measures.fontSize,
          }}
        >
          <Text style={[FontStyle.urbanistMedium, CommonStyles.smallCommonTxt]}>
            Enter the amount to top up
          </Text>
          <TextInput
            style={styles.inputView}
            placeholder="$0.00"
            keyboardType="numeric"
            value={"$" + amount}
            returnKeyType={"done"}
            onChangeText={(val) => validateNum(val)}
            maxLength={10}
          />
          <View style={{ marginTop: Variables.Measures.fontSize }}>
            <View style={styles.outerRowView}>
              <TouchableOpacity
                style={styles.firstTab}
                onPress={() => setAmount("10")}
              >
                <Text style={[FontStyle.urbanistSemiBold, styles.amountTxt]}>
                  $10
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.firstTab, { marginLeft: 15 }]}
                onPress={() => setAmount("20")}
              >
                <Text style={[FontStyle.urbanistSemiBold, styles.amountTxt]}>
                  $20
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.firstTab, { marginLeft: 15 }]}
                onPress={() => setAmount("50")}
              >
                <Text style={[FontStyle.urbanistSemiBold, styles.amountTxt]}>
                  $50
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ marginTop: Variables.Measures.fontSize / 2 }}>
            <View style={styles.outerRowView}>
              <TouchableOpacity
                style={styles.firstTab}
                onPress={() => setAmount("100")}
              >
                <Text style={[FontStyle.urbanistSemiBold, styles.amountTxt]}>
                  $100
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.firstTab, { marginLeft: 15 }]}
                onPress={() => setAmount("200")}
              >
                <Text style={[FontStyle.urbanistSemiBold, styles.amountTxt]}>
                  $200
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.firstTab, { marginLeft: 15 }]}
                onPress={() => setAmount("250")}
              >
                <Text style={[FontStyle.urbanistSemiBold, styles.amountTxt]}>
                  $250
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ marginTop: Variables.Measures.fontSize / 2 }}>
            <View style={styles.outerRowView}>
              <TouchableOpacity
                style={styles.firstTab}
                onPress={() => setAmount("500")}
              >
                <Text style={[FontStyle.urbanistSemiBold, styles.amountTxt]}>
                  $500
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.firstTab, { marginLeft: 15 }]}
                onPress={() => setAmount("750")}
              >
                <Text style={[FontStyle.urbanistSemiBold, styles.amountTxt]}>
                  $750
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.firstTab, { marginLeft: 15 }]}
                onPress={() => setAmount("1000")}
              >
                <Text style={[FontStyle.urbanistSemiBold, styles.amountTxt]}>
                  $1,000
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              marginVertical: Variables.Measures.fontSize,
            }}
          >
            <ButtonView
              isLoading={isLoading || isLoadingPay}
              width={Variables.Measures.width / 1.12}
              btnTxt="Confirm"
              backgroundColor={Variables.Colors.darkYellow}
              onBtnPress={() => {
                paymentMethod();
              }}
              fontColor={Variables.Colors.blackBg}
            />
          </View>
          {fundsModal && <FundsAdd modalVisible={fundsModal} />}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topupHeading: {
    color: Variables.Colors.white,
    fontSize: 16,
  },
  inputView: {
    width: "90%",
    height: 130,
    marginTop: Variables.Measures.fontSize,
    borderRadius: 10,
    borderColor: Variables.Colors.darkYellow,
    borderWidth: 1,
    color: Variables.Colors.white,
    fontFamily: "Urbanist-Bold",
    fontSize: 48,
    paddingHorizontal: 20,
    textAlign: "center",
    backgroundColor: Variables.Colors.greyBg,
  },
  firstTab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 9,
    borderWidth: 1,
    borderColor: Variables.Colors.darkYellow,
    borderRadius: 10,
    backgroundColor: Variables.Colors.greyBg,
  },
  outerRowView: {
    alignItems: "center",
    justifyContent: "center",
    width: Variables.Measures.width / 1.15,
    alignSelf: "center",
    flexDirection: "row",
    height: 50,
  },
  amountTxt: {
    color: Variables.Colors.darkYellow,
    fontSize: 16,
  },
});
export default AddFunds;

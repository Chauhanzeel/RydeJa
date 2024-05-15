import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  Platform,
} from "react-native";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";

import { FontStyle, Images, Variables } from "../../Theme";
import { goBack, navigate } from "../../navigators/RootNavigation";
import IconQuestionSvg from "../../assets/Images/iconQuestion.svg";
import ButtonView from "../../components/ButtonView";
import LeftSvg from "../../assets/Images/BackArrow.svg";
import Header from "../../components/Header";
import { FilterModalProps } from "../types";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { createBankAccountStart } from "../../actions/paymentActions";
import { ReducerStateProps } from "../Inbox/InterfaceProps";
import ToastMessage from "../../components/ToastMessage";
import { toastConst } from "../../constants/constants";
import { Dropdown } from "react-native-element-dropdown";
import DropDownWhite from "../../assets/Images/DropDownWhite.svg";

const DirectDeposit: React.FC<FilterModalProps> = ({ route }) => {
  const bankDetails = route?.params?.bankDetails;
  const { t } = useTranslation();
  const accountData = [
    {
      id: "savings",
      name: "Savings",
    },
    {
      id: "chequing",
      name: "Chequing",
    },
  ];

  const [accountType, setAccountType] = useState(null);
  const [accountTypeName, setAccountTypeName] = useState(null);
  const [routingNumberError, setRoutingNumberError] = useState(0);
  const [routingNumber, setRoutingNumber] = useState(null);
  const routingNumberRef = useRef(null);
  const bankNameRef = useRef(null);
  const branchRef = useRef(null);

  const [accountNumberError, setAccountNumberError] = useState(0);
  const [accountNumber, setAccountNumber] = useState(null);
  const [bankNameError, setBankNameError] = useState(0);
  const [bankName, setBankName] = useState(null);
  const [branchError, setBranchError] = useState(0);
  const [branch, setBranch] = useState(null);
  const [accountError, setAccountError] = useState(0);

  const [isLoading, createBankAcc, profileDetailsData] = useSelector(
    (state: ReducerStateProps) => [
      state.payment.isLoading,
      state.payment.createBankAcc,
      state.user.profileDetailsData,
    ]
  );
  const accountNumberRef = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (createBankAcc?.success === true) {
      bankDetails == "no"
        ? navigate("SafetyStandards")
        : navigate("TabNavigations", { navigationform: 2 });
    }
  }, [createBankAcc]);

  const deposit = () => {
    setRoutingNumberError(routingNumber ? 0 : 1);
    setAccountNumberError(accountNumber ? 0 : 1);
    setBankNameError(bankName ? 0 : 1);
    setBranchError(branch ? 0 : 1);
    setAccountError(accountType ? 0 : 1);

    if (
      !accountNumber ||
      !routingNumber ||
      !bankName ||
      !branch ||
      !accountType
    ) {
      ToastMessage.set(toastConst.errorToast, "Please fill all the details");
    } else {
      const data = {
        accountNumber: accountNumber,
        routingNumber: routingNumber,
        bankName: bankName,
        branch: branch,
        accountType: accountType,
      };
      dispatch(createBankAccountStart(data));
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaStyle}>
      <StatusBar translucent backgroundColor="transparent" />
      <Header
        leftSvg={<LeftSvg />}
        onLeftPress={goBack}
        centerText="Direct Deposit"
      />

      <ScrollView>
        <View
          style={{
            width: "90%",
            alignSelf: "center",
            marginTop: Variables.MetricsSizes.small,
          }}
        >
          <Text
            style={[
              FontStyle.urbanistMedium,
              {
                color: Variables.Colors.white,
                fontSize: 16,
              },
            ]}
          >
            Listing your car is optional, but setting it up is required to get
            your first payout.
          </Text>
          <View
            style={{
              flexDirection: "row",
              borderBottomColor: routingNumberError
                ? Variables.Colors.yellow
                : Variables.Colors.carsBorderGrey,
              borderBottomWidth: 1,
              marginTop: Variables.MetricsSizes.small,
              alignContent: "center",
            }}
          >
            <Text
              style={[
                FontStyle.urbanistMedium,
                styles.routingNumberInput,
                {
                  alignSelf: "center",
                  width: "40%",
                  color: Variables.Colors.white,
                },
              ]}
            >
              Routing number
            </Text>
            <TextInput
              maxLength={16}
              placeholder="111000000"
              placeholderTextColor={Variables.Colors.carsBorderGrey}
              value={routingNumber}
              onChangeText={(val) => {
                setRoutingNumber(val);
              }}
              onSubmitEditing={() => {
                accountNumberRef.current.focus();
              }}
              returnKeyType={Platform.OS == "android" ? "next" : "done"}
              ref={routingNumberRef}
              style={[
                FontStyle.urbanistMedium,
                styles.routingNumberInput,
                { width: "60%" },
              ]}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              borderBottomColor: routingNumberError
                ? Variables.Colors.yellow
                : Variables.Colors.carsBorderGrey,
              borderBottomWidth: 1,
              marginTop: Variables.MetricsSizes.small,
              alignContent: "center",
            }}
          >
            <Text
              style={[
                FontStyle.urbanistMedium,
                styles.routingNumberInput,
                {
                  alignSelf: "center",
                  width: "40%",
                  color: Variables.Colors.white,
                },
              ]}
            >
              Account number
            </Text>
            <TextInput
              maxLength={16}
              placeholder="123456"
              placeholderTextColor={Variables.Colors.carsBorderGrey}
              value={accountNumber}
              onChangeText={(val) => {
                setAccountNumber(val);
              }}
              onSubmitEditing={() => {
                bankNameRef.current.focus();
              }}
              ref={accountNumberRef}
              style={[
                FontStyle.urbanistMedium,
                styles.routingNumberInput,
                { width: "60%" },
              ]}
              keyboardType="numeric"
              returnKeyType={Platform.OS == "android" ? "next" : "done"}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              borderBottomColor: bankNameError
                ? Variables.Colors.yellow
                : Variables.Colors.carsBorderGrey,
              borderBottomWidth: 1,
              marginTop: Variables.MetricsSizes.small,
              alignContent: "center",
            }}
          >
            <Text
              style={[
                FontStyle.urbanistMedium,
                styles.routingNumberInput,
                {
                  alignSelf: "center",
                  width: "40%",
                  color: Variables.Colors.white,
                },
              ]}
            >
              Bank name
            </Text>
            <TextInput
              placeholderTextColor={Variables.Colors.carsBorderGrey}
              value={bankName}
              onChangeText={(val) => {
                setBankName(val);
              }}
              onSubmitEditing={() => {
                branchRef.current.focus();
              }}
              ref={bankNameRef}
              style={[
                FontStyle.urbanistMedium,
                styles.routingNumberInput,
                { width: "60%" },
              ]}
              returnKeyType={Platform.OS == "android" ? "next" : "done"}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              borderBottomColor: branchError
                ? Variables.Colors.yellow
                : Variables.Colors.carsBorderGrey,
              borderBottomWidth: 1,
              marginTop: Variables.MetricsSizes.small,
              alignContent: "center",
            }}
          >
            <Text
              style={[
                FontStyle.urbanistMedium,
                styles.routingNumberInput,
                {
                  alignSelf: "center",
                  width: "40%",
                  color: Variables.Colors.white,
                },
              ]}
            >
              Branch
            </Text>
            <TextInput
              placeholderTextColor={Variables.Colors.carsBorderGrey}
              value={branch}
              onChangeText={(val) => {
                setBranch(val);
              }}
              ref={branchRef}
              style={[
                FontStyle.urbanistMedium,
                styles.routingNumberInput,
                { width: "60%" },
              ]}
              returnKeyType={Platform.OS == "android" ? "next" : "done"}
            />
          </View>
          <View
            style={{
              marginTop: Variables.MetricsSizes.large,
            }}
          />
          {accountType && (
            <Text style={[FontStyle.urbanistMedium, styles.inputTitleTxt]}>
              Type of Account
            </Text>
          )}
          <Dropdown
            style={[
              styles.dropdown,
              {
                marginTop: accountType ? 10 : 0,
                borderColor: Variables.Colors.yellow,
                borderWidth: accountError ? 1 : 0,
              },
            ]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={[
              FontStyle.urbanistRegular,
              styles.selectedTextStyle,
            ]}
            iconStyle={styles.iconStyle}
            data={accountData}
            maxHeight={280}
            labelField="name"
            valueField={"id"}
            placeholder={"Type of Account"}
            value={accountType}
            onChange={(item) => {
              setAccountType(item.id);
              setAccountTypeName(item.name);
            }}
            renderRightIcon={() => <DropDownWhite />}
            dropdownPosition="bottom"
            containerStyle={{
              backgroundColor: Variables.Colors.greyBg,
              borderColor: Variables.Colors.greyBg,
              borderRadius: 8,
              marginTop: 0,
            }}
            showsVerticalScrollIndicator
            itemTextStyle={[
              FontStyle.urbanistRegular,
              {
                color: Variables.Colors.inputTxtColor,
                fontSize: 16,
              },
            ]}
            activeColor={Variables.Colors.greyBg}
          />

          {/* <View
            style={{
              flexDirection: "row",
              marginVertical: Variables.MetricsSizes.regular,
            }}
          >
            <Text
              style={[
                FontStyle.urbanistMedium,
                {
                  color: Variables.Colors.inputTxtColor,
                  fontSize: 12,
                  marginRight: Variables.MetricsSizes.tiny,
                },
              ]}
            >
              Powered by Stripe
            </Text>
            <IconQuestionSvg />
          </View> */}
        </View>
      </ScrollView>
      <View style={styles.btnView}>
        <ButtonView
          isLoading={isLoading}
          disablebtn={isLoading}
          borderColor={
            _.size(routingNumber) == 0 ||
            _.size(accountNumber) == 0 ||
            _.size(bankName) == 0 ||
            _.size(branch) == 0
              ? Variables.Colors.borderGrey
              : Variables.Colors.yellow
          }
          borderWidth={
            _.size(routingNumber) == 0 ||
            _.size(accountNumber) == 0 ||
            _.size(bankName) == 0 ||
            _.size(branch) == 0
              ? 1
              : 0
          }
          btnTxt={"Save"}
          onBtnPress={() => {
            {
              deposit();
            }
          }}
          width={Variables.Measures.width / 1.09}
          backgroundColor={
            _.size(routingNumber) == 0 ||
            _.size(accountNumber) == 0 ||
            _.size(bankName) == 0 ||
            _.size(branch) == 0
              ? Variables.Colors.activeTab
              : Variables.Colors.yellow
          }
          fontColor={
            _.size(routingNumber) == 0 ||
            _.size(accountNumber) == 0 ||
            _.size(bankName) == 0 ||
            _.size(branch) == 0
              ? Variables.Colors.borderGrey
              : Variables.Colors.darkBlack
          }
        />
        <TouchableOpacity
          style={{
            marginVertical: Variables.MetricsSizes.large,
            alignSelf: "center",
          }}
          onPress={() => {
            navigate("TabNavigations", { navigationform: 2 });
          }}
        >
          <Text
            style={[
              FontStyle.urbanistBold,
              {
                color: Variables.Colors.yellow,
                fontSize: 16,
              },
            ]}
          >
            Set up later
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  placeholderStyle: {
    fontSize: 16,
    color: Variables.Colors.inputTxtColor,
    paddingLeft: 8,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "white",
    paddingHorizontal: 10,
  },
  dropdown: {
    height: 50,
    backgroundColor: Variables.Colors.greyBg,
    borderRadius: 10,
    paddingLeft: 8,
    width: "100%",
    alignSelf: "center",
    paddingRight: 20,
  },
  inputTitleTxt: {
    color: Variables.Colors.white,
    fontSize: 14,
    width: "96%",
    alignSelf: "center",
  },
  safeAreaStyle: {
    flex: 1,
    backgroundColor: Variables.Colors.darkBlack,
  },
  btnView: {
    left: 0,
    right: 0,
    justifyContent: "center",
  },
  routingNumberInput: {
    color: Variables.Colors.white,
    fontSize: 16,
    paddingVertical: 10,
  },
});
export default DirectDeposit;

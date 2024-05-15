import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  FlatList,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { FontStyle, Variables, CommonStyles } from "../Theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";

import { cancelTaxi } from "../containers/MockData/CancelTaxi";

import { goBack, navigate, replace } from "../navigators/RootNavigation";

import CheckSvg from "../assets/Images/Authentication/check.svg";
import BackSvg from "../assets/Images/BackArrow.svg";

import Header from "../components/Header";
import ButtonView from "../components/ButtonView";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Colors } from "../Theme/variables";
import { useDispatch, useSelector } from "react-redux";
import { ReducerStateProps } from "./Inbox/InterfaceProps";
import { closeAccountStart } from "../actions/customerActions";
import { logOutResetAll } from "../actions/authActions";

interface CancelProps {
  // onClick: (val: number) => void;
}
interface itemProps {
  id: number;
  reason: string;
}

const CloseAccountReason: React.FC<CancelProps> = () =>
  // { onClick }
  {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const [selectedId, setSelectedId] = useState([]);
    const [next, setNext] = useState("Next");
    const [updateKey, setUpdateKey] = useState(false);

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

    useEffect(() => {
      if (selectedId.includes(10)) {
        setNext("Next");
      } else {
        setNext("Close my account");
      }
    }, [selectedId]);

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

    const [isLoadingCustomer, isLoadingOwner, closeAccountData] = useSelector(
      (state: ReducerStateProps) => [
        state.customer.isLoading,
        state.carOwner.isLoading,
        state.customer.closeAccountData,
      ]
    );

    const closeAccount = () => {
      let params = {
        reason: checkedItems,
      };

      dispatch(closeAccountStart(params));
      setUpdateKey(true);
    };

    useEffect(() => {
      if (closeAccountData?.success && updateKey) {
        dispatch(logOutResetAll());
        setUpdateKey(false);
        AsyncStorage.clear();
        replace("LoginSplash");
      }
    }, [closeAccountData]);
    return (
      <>
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={CommonStyles.safeAreaStyle}>
          <Header
            centerText="Close account"
            leftSvg={<BackSvg height={25} width={25} />}
            onLeftPress={goBack}
          />
          <ScrollView style={{ marginBottom: 20 }}>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <View
                style={{
                  width: "93%",
                  alignSelf: "center",
                  paddingBottom: Variables.FontSize.large,
                }}
              >
                {cancelTaxi.map((item, i) => {
                  return (
                    <TouchableOpacity
                      key={i}
                      style={styles.discountMainView}
                      onPress={() => {
                        handleSelection(item.id);
                        handleCheck(item.reason);
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
                          style={[styles.reasonTxt, FontStyle.urbanistMedium]}
                        >
                          {item.reason}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
          <View
            style={{
              marginVertical: Variables.FontSize.regular,
            }}
          >
            <ButtonView
              isLoading={isLoadingCustomer || isLoadingOwner}
              width={Variables.Measures.width / 1.12}
              btnTxt={next}
              backgroundColor={Variables.Colors.btnRed}
              onBtnPress={() => {
                // storeData(checkedItems);
                // onClick(15);
                if (next == "Close my account") {
                  closeAccount();
                } else {
                  navigate("CloseAccount2");
                }
              }}
              fontColor={Variables.Colors.white}
            />
          </View>
        </SafeAreaView>
      </>
    );
  };

const styles = StyleSheet.create({
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
    fontSize: 14,
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
export default CloseAccountReason;

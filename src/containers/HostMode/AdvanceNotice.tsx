import React, { useState, useRef, useEffect } from "react";
import { CommonStyles, FontStyle, Images, Variables } from "../../Theme";
import {
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import { goBack, navigate } from "../../navigators/RootNavigation";

import ButtonView from "../../components/ButtonView";
import Header from "../../components/Header";

import BackSvg from "../../assets/Images/BackArrow.svg";
import TaxiSvg from "../../assets/Images/Taxi.svg";
import SelectedSvg from "../../assets/Images/SelectedGrey.svg";
import UnSelectedSvg from "../../assets/Images/SelectedYellow.svg";
import AsyncStorageHelper from "../../components/AsyncStorageHelper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastVisibility, toastConst } from "../../constants/constants";
import ToastMessage from "../../components/ToastMessage";
import { RouteProp } from "@react-navigation/native";
import _ from "lodash";
import { useSelector } from "react-redux";
import { ReducerStateProps } from "../Inbox/InterfaceProps";

interface CreateProfileProps {
  route?: RouteProp<any, any>;
}

const AdvanceNotice: React.FC<CreateProfileProps> = ({ route }) => {
  const { t } = useTranslation();
  const [ownerCarViewData] = useSelector((state: ReducerStateProps) => [
    state.carOwner.ownerCarViewData,
  ]);
  const [optionId, setOptionId] = useState(null);
  const [reason, setReason] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (ownerCarViewData) {
      findFirstSelectedReason(_.get(ownerCarViewData, "advanceNotice", null));
      if (
        _.get(ownerCarViewData, "advanceNotice", null) == "1 day Recommended"
      ) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    }
  }, []);

  const findFirstSelectedReason = (answerText: any) => {
    const foundAnswer = options.find((item) => item.option === answerText);
    setReason(answerText);
    setOptionId(foundAnswer ? foundAnswer.id : null);
  };

  const options = [
    {
      id: 1,
      option: "12 hours",
    },
    {
      id: 2,
      option: "1 day Recommended",
    },
  ];

  const selectOption = (item: any) => {
    setReason(item.option);
    setOptionId(item.id);
    if (item.option == "1 day Recommended") {
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const DisplayOptions = (item: any) => {
    const isSelected = item.id === optionId;
    return (
      <View style={styles.answerView}>
        <TouchableOpacity
          style={styles.leftAnswerView}
          onPress={() => selectOption(item)}
        >
          <Text style={[FontStyle.urbanistRegular, CommonStyles.descCommonTxt]}>
            {item?.option}
          </Text>

          {isSelected ? (
            <UnSelectedSvg height={22} width={22} />
          ) : (
            <SelectedSvg height={22} width={22} />
          )}
        </TouchableOpacity>
      </View>
    );
  };

  const update = () => {
    if (!reason) {
      ToastMessage.set(toastConst.errorToast, "Please select any option.");
    } else {
      navigate("MaximumTrip", { advanceNotice: reason });
    }
  };

  const setData = async () => {
    if (!reason) {
      ToastMessage.set(toastConst.errorToast, "Please select any option.");
    } else {
      try {
        const existingData = await AsyncStorage.getItem("carDetails");
        const parsedData = JSON.parse(existingData);

        parsedData.advanceNotice = reason;
        await AsyncStorage.setItem("carDetails", JSON.stringify(parsedData));
        navigate("MaximumTrip");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={CommonStyles.safeAreaStyle}>
        <ScrollView style={styles.sv}>
          <Header
            centerText="Advance notice"
            leftSvg={<BackSvg height={22} width={22} />}
            onLeftPress={goBack}
          />
          <View
            style={{
              width: "90%",
              alignSelf: "center",
            }}
          >
            <Text
              style={[FontStyle.urbanistMedium, CommonStyles.smallCommonTxt]}
            >
              How much advance notice do you need before a trip starts?
            </Text>
            {visible && (
              <View style={styles.taxiView}>
                <View style={{ width: "20%" }}>
                  <TaxiSvg />
                </View>
                <View style={{ width: "70%" }}>
                  <Text
                    style={[
                      FontStyle.urbanistMedium,
                      CommonStyles.descCommonTxt,
                    ]}
                  >
                    51% of trips at home locations are booked on shorter notice
                    than your current requirement of 1 day
                  </Text>
                </View>
              </View>
            )}
            <View style={styles.answerView} />
            <FlatList
              data={options}
              renderItem={({ item }): any => DisplayOptions(item)}
            />
          </View>
        </ScrollView>
        <View style={styles.btnView}>
          <ButtonView
            btnTxt={t("labelConst.continueTxt")}
            onBtnPress={() => {
              ownerCarViewData ? update() : setData();
            }}
            width={Variables.Measures.width / 1.09}
            backgroundColor={Variables.Colors.yellow}
            fontColor={Variables.Colors.darkBlack}
          />
        </View>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  sv: {
    flex: 1,
    height: "100%",
    backgroundColor: Variables.Colors.darkBlack,
  },
  optionTxt: {
    fontSize: 14,
    color: Variables.Colors.white,
  },
  answerView: {
    width: "100%",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: Variables.Colors.inputTxtColor,
    paddingVertical: 10,
    justifyContent: "center",
  },
  leftAnswerView: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "space-between",
  },
  tripTxt: {
    color: Variables.Colors.white,
    fontSize: 16,
  },
  taxiTxt: {
    color: Variables.Colors.white,
    fontSize: 14,
    lineHeight: 24,
  },
  taxiView: {
    width: "100%",
    backgroundColor: Variables.Colors.carGrey,
    marginVertical: 20,
    borderRadius: 10,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 50,
  },
  btnView: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
  },
});

export default AdvanceNotice;

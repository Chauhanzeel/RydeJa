import React, { useEffect, useState } from "react";
import { CommonStyles, FontStyle, Variables } from "../../Theme";
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
import SelectedSvg from "../../assets/Images/SelectedGrey.svg";
import UnSelectedSvg from "../../assets/Images/SelectedYellow.svg";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { toastConst } from "../../constants/constants";
import ToastMessage from "../../components/ToastMessage";
import { RouteProp } from "@react-navigation/native";
import _, { forEach } from "lodash";

interface CreateProfileProps {
  route?: RouteProp<any, any>;
}

const Questions: React.FC<CreateProfileProps> = ({ route }) => {
  const { t } = useTranslation();

  const [firstSelectedId, setFirstSelectedId] = useState(null);
  const [secondSelectedId, setSecondSelectedId] = useState(null);
  const [firstSelectedReason, setFirstSelectedReason] = useState(null);
  const [secondSelectedReason, setSecondSelectedReason] = useState(null);

  const firstAnswer = [
    {
      id: 1,
      answer: "cover your car payment",
    },
    {
      id: 2,
      answer: "Generate side income",
    },
    {
      id: 3,
      answer: "Expand an existing business",
    },
    {
      id: 4,
      answer: "Build a primary source of income",
    },
    {
      id: 5,
      answer: "Not sure yet",
    },
  ];

  const secondAnswer = [
    {
      id: 1,
      answer: "Never",
    },
    {
      id: 2,
      answer: "Rarely: once a week or less",
    },
    {
      id: 3,
      answer: "Sometimes: a few days per week",
    },
    {
      id: 4,
      answer: "Often:: most days per week",
    },
  ];

  const singleSelection1 = (item: any) => {
    setFirstSelectedId(item.id);
    setFirstSelectedReason(item.answer);
  };

  const singleSelection2 = (item: any) => {
    setSecondSelectedId(item.id);
    setSecondSelectedReason(item.answer);
  };

  const displayFirstAnswers = (item: any) => {
    const isSelected = item.id === firstSelectedId;
    return (
      <TouchableOpacity
        style={styles.answerView}
        onPress={() => singleSelection1(item)}
      >
        <View style={styles.leftAnswerView}>
          <Text style={[FontStyle.urbanistRegular, CommonStyles.descCommonTxt]}>
            {item.answer}
          </Text>
          <View>
            {isSelected ? (
              <UnSelectedSvg height={22} width={22} />
            ) : (
              <SelectedSvg height={22} width={22} />
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const displaySecondAnswers = (item: any) => {
    const isSelected = item.id === secondSelectedId;
    return (
      <TouchableOpacity
        style={styles.answerView}
        onPress={() => singleSelection2(item)}
      >
        <View style={styles.leftAnswerView}>
          <Text style={[FontStyle.urbanistRegular, CommonStyles.descCommonTxt]}>
            {item?.answer}
          </Text>
          <View>
            {isSelected ? (
              <UnSelectedSvg height={22} width={22} />
            ) : (
              <SelectedSvg height={22} width={22} />
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const storeData = async () => {
    if (!firstSelectedReason || !secondSelectedReason) {
      ToastMessage.set(
        toastConst.errorToast,
        "Please select the options of above question."
      );
    } else {
      const existingData = await AsyncStorage.getItem("carDetails");
      const parsedData = JSON.parse(existingData);
      parsedData.financialGoal = firstSelectedReason;
      parsedData.carUseFrequency = secondSelectedReason;
      await AsyncStorage.setItem("carDetails", JSON.stringify(parsedData));
      navigate("AdvanceNotice");
    }
  };

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Variables.Colors.darkBlack}
      />
      <SafeAreaView style={CommonStyles.safeAreaStyle}>
        <Header
          leftSvg={<BackSvg height={25} width={25} />}
          onLeftPress={goBack}
        />
        <ScrollView style={{ height: "100%" }}>
          <View style={styles.outerView}>
            <Text
              style={[
                FontStyle.urbanistMedium,
                styles.questionTxt,
                CommonStyles.smallCommonTxt,
              ]}
            >
              What is your primary financial goal for sharing this car on Ryde?
            </Text>
            <FlatList
              data={firstAnswer}
              renderItem={({ item }) => displayFirstAnswers(item)}
            />
            <View style={{ height: Variables.Measures.fontSize * 2 }} />
            <Text
              style={[
                FontStyle.urbanistMedium,
                styles.questionTxt,
                CommonStyles.smallCommonTxt,
              ]}
            >
              How often do you or your family currently use this car?
            </Text>
            <FlatList
              data={secondAnswer}
              renderItem={({ item }) => displaySecondAnswers(item)}
            />
            <View
              style={{
                width: "100%",
                marginVertical: Variables.Measures.fontSize * 2,
              }}
            >
              <ButtonView
                btnTxt={t("labelConst.continueTxt")}
                onBtnPress={() => {
                  storeData();
                }}
                width={Variables.Measures.width / 1.09}
                backgroundColor={Variables.Colors.yellow}
                fontColor={Variables.Colors.darkBlack}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  imageView: {
    alignSelf: "center",
  },
  questionTxt: {
    color: "white",
    fontSize: 16,
    lineHeight: 20,
    textAlign: "justify",
    width: "90%",
  },
  optionTxt: {
    fontSize: 14,
    color: Variables.Colors.white,
  },
  outerView: {
    justifyContent: "center",
    width: "90%",
    alignSelf: "center",
  },
  answerView: {
    width: "100%",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: Variables.Colors.inputTxtColor,
    paddingVertical: 10,
  },
  leftAnswerView: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "space-between",
  },
});

export default Questions;

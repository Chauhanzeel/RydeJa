import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  TextInput,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { Variables, FontStyle, CommonStyles } from "../Theme";
import { useTranslation } from "react-i18next";
import FundsSvg from "../assets/Images/AddFunds.svg";
import { navigate } from "../navigators/RootNavigation";
import CustomRatingBar from "./CustomRatingBar";
import ButtonView from "./ButtonView";
import { Measures } from "../Theme/variables";

interface RatingViewModalProps {
  modalVisible: boolean;
  onOkPress?: (item: any) => void;
  isLoading?: boolean;
  onRequestClose?: () => void;
}

const RatingView: React.FC<RatingViewModalProps> = ({
  modalVisible,
  onOkPress,
  isLoading,
  onRequestClose,
}) => {
  const [reviewTxt, setReviewTxt] = useState(null);
  const [Rating, setRating] = useState(0);
  const { t } = useTranslation();

  return (
    <Modal
      animationType="fade"
      transparent={true}
      statusBarTranslucent={true}
      visible={modalVisible}
      onRequestClose={() => onRequestClose()}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View style={styles.parentView}>
          <View style={styles.modalView}>
            <Text
              style={[
                FontStyle.urbanistBold,
                CommonStyles.headingCommonTxt,
                styles.modalText,
              ]}
            >
              Give Rating !
            </Text>
            <CustomRatingBar
              size={Measures.fontSize * 1.5}
              startingValue={0}
              totalStar={5}
              starsMargin={2}
              onSubmit={(item) => setRating(item)}
            />
            <View style={{ marginVertical: 10 }} />

            <View style={styles.inputFieldView}>
              <TextInput
                style={[FontStyle.urbanistMedium, styles.inputTxtView]}
                placeholderTextColor={Variables.Colors.inputTxtColor}
                multiline={true}
                value={reviewTxt}
                onChangeText={(val: string) => {
                  setReviewTxt(val);
                }}
                placeholder={`What was your experience?\nPlease let us know.`}
                returnKeyType="next"
              />
            </View>
            <View style={{ marginVertical: 10 }} />

            <ButtonView
              width={Measures.width / 2}
              btnTxt={"Submit"}
              isLoading={isLoading}
              disablebtn={isLoading}
              backgroundColor={Variables.Colors.yellow}
              onBtnPress={() =>
                onOkPress({
                  ratingStar: Rating,
                  review: reviewTxt,
                })
              }
              fontColor={Variables.Colors.blackBg}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBorderView: {
    paddingVertical: 35,
  },
  inputTxtView: {
    width: "99%",
    minHeight: 100,
    borderWidth: 1,
    borderRadius: 11,
    color: Variables.Colors.white,
    textAlignVertical: "top",
    padding: 10,
    fontSize: 14,
    borderColor: Variables.Colors.activeTab,
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
    fontSize: 14,
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
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  modalText: {
    color: Variables.Colors.darkYellow,
    marginBottom: 20,
  },
  modalView: {
    backgroundColor: Variables.Colors.carGrey,
    borderRadius: 8,
    width: "90%",
    alignSelf: "center",
    alignItems: "center",
    paddingVertical: 20,
  },
  inputFieldView: {
    flexDirection: "column",
    width: "90%",
    justifyContent: "space-between",
  },
});

export default RatingView;

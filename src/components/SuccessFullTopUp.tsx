import React from "react";
import { View, Text, StyleSheet, Modal, TouchableOpacity } from "react-native";
import { FontStyle, Layout, Variables } from "../Theme";
import { useTranslation } from "react-i18next";

import WalletSvg from "../assets/Images/ModalIcons/WalletSuccessfull.svg";

export interface InternetModalProps {
  show: boolean;
  onClosePress: (val: boolean) => void;
}

const InternetModal: React.FC<InternetModalProps> = ({
  show,
  onClosePress,
}) => {
  const { t } = useTranslation();
  return (
    <Modal animationType="slide" transparent={true} visible={show}>
      <View style={styles.containerStyle}>
        <View style={styles.modalView}>
          <View style={Layout.center}>
            <WalletSvg height={130} width={130} />
          </View>
          <View style={styles.footer}>
            <Text style={[styles.headerText, FontStyle.urbanistBold]}>
              {t("labelConst.successFullTopUp")}
            </Text>
          </View>
          <View>
            <View style={styles.innerOptionView}>
              <Text
                style={[
                  styles.modalTxt,
                  Layout.center,
                  FontStyle.urbanistRegular,
                ]}
              >
                {t("labelConst.topUpDesc")}
              </Text>
            </View>
            <View style={{ marginTop: Variables.Measures.fontSize / 2 }}>
              <TouchableOpacity
                style={styles.nextBtnView}
                onPress={(val: any) => {
                  onClosePress(val);
                }}
              >
                <View style={[styles.nextBtnTextView]}>
                  <Text style={[styles.nextTxt, FontStyle.urbanistBold]}>
                    {t("labelConst.okText")}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Variables.Colors.absoluteBgGrey,
  },
  headerText: {
    alignSelf: "center",
    justifyContent: "center",
    fontSize: Variables.Measures.fontSize * 1.1,
    color: Variables.Colors.yellow,
  },
  footer: {
    height: Variables.Measures.height / 13,
    alignSelf: "center",
    justifyContent: "center",
    width: Variables.Measures.width,
  },
  modalTxt: {
    color: Variables.Colors.white,
    fontSize: Variables.Measures.fontSize / 1.3,
    textAlign: "center",
    lineHeight: 25,
    width: "80%",
    alignSelf: "center",
  },
  button: {
    backgroundColor: Variables.Colors.yellow,
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: "45%",
    alignSelf: "center",
    marginVertical: 13,
    borderRadius: 5,
  },
  buttonText: {
    color: Variables.Colors.white,
    fontSize: Variables.Measures.fontSize / 1.2,
    alignSelf: "center",
  },
  innerOptionView: {
    width: "95%",
    alignSelf: "center",
  },
  modalView: {
    width: "83%",
    borderRadius: Variables.Measures.fontSize,
    backgroundColor: Variables.Colors.blackBg,
    paddingVertical: Variables.Measures.fontSize * 1.5,
  },
  nextBtnView: {
    alignSelf: "center",
    height: Variables.Measures.fontSize * 2.2,
    marginTop: Variables.Measures.fontSize,
  },
  nextBtnTextView: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    borderRadius: 25,
    width: Variables.Measures.width / 1.4,
    backgroundColor: Variables.Colors.yellow,
  },
  nextTxt: {
    fontSize: Variables.Measures.fontSize / 1.2,
    color: Variables.Colors.greyBg,
  },
});
export default InternetModal;

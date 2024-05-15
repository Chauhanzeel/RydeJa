import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { Variables, FontStyle } from "../Theme";
import { useTranslation } from "react-i18next";
import DashedLine from "react-native-dashed-line";

interface UpdateDataModalProps {
  modalVisible: boolean;
  headerTxt?: string;
  descTxt?: string;
  cancelTxt?: string;
  okTxt?: string;
  onOkPress?: (val: boolean) => void;
  onCancelPress?: (val: boolean) => void;
}

const LoginModal: React.FC<UpdateDataModalProps> = ({
  modalVisible,
  headerTxt,
  descTxt,
  cancelTxt,
  okTxt,
  onOkPress,
  onCancelPress,
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {}}
    >
      <View style={styles.parentView}>
        <View style={styles.modalView}>
          <View style={styles.modalBorderView}>
            <View style={{ width: "50%", alignSelf: "center" }}>
              <Text style={[styles.modalText, FontStyle.urbanistBold]}>
                {headerTxt}
              </Text>
            </View>
            <View style={{ width: "60%", alignSelf: "center" }}>
              <Text style={[FontStyle.urbanistMedium, styles.modalDescTxt]}>
                {descTxt}
              </Text>
            </View>
          </View>
          <DashedLine
            dashLength={5}
            dashColor={Variables.Colors.borderGrey}
            dashThickness={0.5}
          />
          <View style={styles.btnOuterView}>
            <TouchableOpacity
              style={styles.btnInnerView}
              onPress={(val: any) => onCancelPress(val)}
            >
              <Text style={[FontStyle.urbanistBold, styles.btnTxt]}>
                {cancelTxt}
              </Text>
            </TouchableOpacity>
            <DashedLine
              dashLength={7}
              dashColor={Variables.Colors.borderGrey}
              axis="vertical"
              dashThickness={1}
            />
            <TouchableOpacity
              onPress={(val: any) => onOkPress(val)}
              style={styles.continueBtnView}
            >
              <Text style={[FontStyle.urbanistBold, styles.btnTxt]}>
                {okTxt}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBorderView: {
    paddingVertical: 35,
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
    // marginTop: Variables.Measures.fontSize * 5,
  },
});

export default LoginModal;

import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { Variables, FontStyle } from "../Theme";
import { useTranslation } from "react-i18next";
import DashedLine from "react-native-dashed-line";

import CloseSvg from "../assets/Images/CloseRed.svg";
import PenSvg from "../assets/Images/EditData.svg";
import { navigate } from "../navigators/RootNavigation";

interface UpdateDataModalProps {
  id?: string;
  modalVisible: boolean;
  onClose?: (val: boolean) => void;
  visaCard?: any;
  removeTxt?: string;
  last4?: string;
  paymentInfo?: string;
  paymentMethod?: string;
  paymentSvg?: any;
  onClosePress?: (val: boolean) => void;
}

const RemoveMethod: React.FC<UpdateDataModalProps> = ({
  id,
  modalVisible,
  onClose,
  visaCard,
  paymentMethod,
  last4,
  paymentInfo,
  removeTxt,
  paymentSvg,
  onClosePress,
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={(val: any) => {
        onClose(val);
      }}
    >
      <TouchableOpacity onPressOut={(val: any) => onClose(val)}>
        <View style={styles.parentView}>
          <View style={styles.modalView}>
            <View style={styles.modalHeaderView}>
              <View>{paymentSvg}</View>
              <Text style={[styles.modalText, FontStyle.urbanistBold]}>
                {paymentMethod}
              </Text>
            </View>
            <DashedLine
              dashLength={4}
              dashColor={Variables.Colors.borderGrey}
              dashThickness={1}
            />
            <View
              style={{
                marginVertical: 30,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={{ flexDirection: "row" }}>
                  <View style={styles.dot} />
                  <View style={styles.dot} />
                  <View style={styles.dot} />
                  <View style={styles.dot} />
                  <View style={styles.dot} />
                </View>

                <Text style={[FontStyle.urbanistMedium, styles.modalDescTxt1]}>
                  {last4}
                </Text>
                <Text style={[FontStyle.urbanistMedium, styles.modalDescTxt]}>
                  {paymentInfo}
                </Text>
              </View>

              <TouchableOpacity
                style={{ marginTop: 30 }}
                onPress={() => {
                  navigate("AddPaymentCard", { id: id });
                  onClose(false);
                }}
              >
                <PenSvg />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.removeView}
                onPress={(val: any) => onClosePress(val)}
              >
                <View>
                  <CloseSvg />
                </View>
                <Text style={[FontStyle.urbanistMedium, styles.removeTxt]}>
                  {removeTxt}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  dot: {
    width: 6,
    height: 6,
    borderRadius: 6,
    backgroundColor: Variables.Colors.white,
    marginHorizontal: 2,
  },
  removeView: {
    flexDirection: "row",
    marginTop: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  modalHeaderView: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
    flexDirection: "row",
  },
  modalDescTxt: {
    color: Variables.Colors.inputTxtColor,
    fontSize: 14,
  },
  modalDescTxt1: {
    color: Variables.Colors.white,
    fontSize: 14,
    marginLeft: Variables.MetricsSizes.tiny,
  },
  removeTxt: {
    color: Variables.Colors.white,
    fontSize: 16,
    marginLeft: 5,
  },
  parentView: {
    backgroundColor: "rgba(13, 13, 13, .8)",
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  modalText: {
    color: Variables.Colors.white,
    fontSize: 16,
    marginLeft: 5,
  },
  modalView: {
    backgroundColor: Variables.Colors.carGrey,
    borderRadius: 5,
    width: "90%",
    alignSelf: "center",
  },
});

export default RemoveMethod;

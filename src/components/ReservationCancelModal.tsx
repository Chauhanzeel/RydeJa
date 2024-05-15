import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { Variables, FontStyle } from "../Theme";
import { useTranslation } from "react-i18next";
import DashedLine from "react-native-dashed-line";
import CloseSvg from "../assets/Images/Close.svg";
import { navigate } from "../navigators/RootNavigation";

interface ReservationCancelModalProps {
  modalVisible: boolean;
  headerTxt?: string;
  descTxt?: string;
  cancelTxt?: string;
  okTxt?: string;
  onOkPress?: (val: boolean) => void;
  onCancelPress?: (val: boolean) => void;
}

const ReservationCancelModal: React.FC<ReservationCancelModalProps> = ({
  modalVisible,
  headerTxt,
  descTxt,
  cancelTxt,
  okTxt,
  onOkPress,
  onCancelPress,
}) => {
  const { t } = useTranslation();
  const HeaderView = () => {
    return (
      <View style={styles.headerView}>
        <TouchableOpacity
          onPress={() => {
            // goBack();
            navigate("TabNavigations");
          }}
        >
          <CloseSvg height={25} width={25} />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {}}
    >
      <TouchableOpacity
        style={styles.parentView}
        onPress={() => {
          navigate("TabNavigations");
        }}
      >
        <HeaderView />
        <View style={styles.modalView}>
          <View style={styles.modalBorderView}>
            <View style={{ width: "50%", alignSelf: "center" }}>
              <Text style={[styles.modalText, FontStyle.urbanistBold]}>
                {headerTxt}
              </Text>
            </View>
            <View
              style={{
                width: "60%",
                alignSelf: "center",
              }}
            >
              <Text style={[FontStyle.urbanistBold, styles.modalDescTxt]}>
                {descTxt}
              </Text>
            </View>
          </View>
          <DashedLine
            dashLength={5}
            dashColor={Variables.Colors.borderGrey}
            dashThickness={1}
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
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  headerView: {
    position: "absolute",
    top: Variables.Measures.StatusBarHeight - 15,
    height: 50,
    width: "90%",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
  },
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
    fontSize: 30,
    lineHeight: 30,
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
  },
});

export default ReservationCancelModal;

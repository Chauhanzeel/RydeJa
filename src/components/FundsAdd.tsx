import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { Variables, FontStyle } from "../Theme";
import { useTranslation } from "react-i18next";
import FundsSvg from "../assets/Images/AddFunds.svg";
import { navigate } from "../navigators/RootNavigation";

interface UpdateDataModalProps {
  modalVisible: boolean;
  onOkPress?: (val: boolean) => void;
}

const FundsAdd: React.FC<UpdateDataModalProps> = ({ modalVisible }) => {
  const [isOpen, setOpne] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    setTimeout(() => {
      setOpne(false);
      navigate("MyWallet");
    }, 2000);
  }, []);

  useEffect(() => {
    setOpne(modalVisible);
  }, [modalVisible]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isOpen}
      onRequestClose={() => setOpne(false)}
    >
      <View style={styles.parentView}>
        <View style={styles.modalView}>
          <View
            style={{
              marginVertical: Variables.Measures.fontSize * 2,
              alignItems: "center",
            }}
          >
            <FundsSvg />
          </View>
          <Text style={[styles.modalText, FontStyle.urbanistBold]}>
            Funds added successfully!
          </Text>
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
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  modalText: {
    color: Variables.Colors.darkYellow,
    fontSize: 18,
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
});

export default FundsAdd;

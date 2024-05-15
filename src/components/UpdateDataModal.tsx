import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import { Variables, FontStyle } from "../Theme";
import { useTranslation } from "react-i18next";

interface UpdateDataModalProps {
  modalVisible: boolean;
  headerTxt: string;
  descTxt: string;
  cancelTxt: string;
  okTxt: string;
  onOkPress: (val: boolean) => void;
  onCancelPress: (val: boolean) => void;
  placeholderTxt: string;
  onSubmit?: (val: string) => void;
}

const UpdateDataModal: React.FC<UpdateDataModalProps> = ({
  modalVisible,
  headerTxt,
  descTxt,
  cancelTxt,
  okTxt,
  onOkPress,
  onCancelPress,
  onSubmit,
  placeholderTxt,
}) => {
  const { t } = useTranslation();

  const [value, setValue] = useState(null);

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {}}
      >
        <View style={styles.parentView}>
          <View style={styles.modalView}>
            <Text style={[styles.modalText, FontStyle.urbanistBold]}>
              {headerTxt}
            </Text>
            <Text style={[FontStyle.urbanistMedium, styles.modalDescTxt]}>
              {descTxt}
            </Text>
            <TextInput
              placeholder={placeholderTxt}
              style={styles.inputTxt}
              placeholderTextColor="white"
              onChangeText={(val) => {
                setValue(val);
                onSubmit(val);
              }}
              value={value}
            />
            <View style={styles.btnOuterView}>
              <View style={styles.rowInnerView}>
                <TouchableOpacity onPress={(val: any) => onCancelPress(val)}>
                  <Text style={[FontStyle.urbanistBold, styles.btnTxt]}>
                    {cancelTxt}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={(val: any) => onOkPress(val)}>
                  <Text style={[FontStyle.urbanistBold, styles.btnTxt]}>
                    {okTxt}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  rowInnerView: {
    flexDirection: "row",
    width: "40%",
    justifyContent: "space-evenly",
  },
  btnOuterView: {
    width: "100%",
    alignItems: "flex-end",
    marginTop: 20,
    marginBottom: 10,
  },
  inputTxt: {
    width: "100%",
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: Variables.Colors.carsBorderGrey,
    borderRadius: 10,
    marginTop: 10,
    paddingHorizontal: 15,
    color: Variables.Colors.white,
    height: 50,
  },
  btnTxt: {
    color: Variables.Colors.darkYellow,
    fontSize: 11,
  },
  modalDescTxt: {
    color: Variables.Colors.white,
    fontSize: 14,
    marginTop: Variables.Measures.fontSize * 1.2,
    marginBottom: 5,
    lineHeight: 20,
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
    fontSize: 14,
  },
  modalView: {
    backgroundColor: Variables.Colors.carGrey,
    borderRadius: 5,
    width: "90%",
    alignSelf: "center",
    padding: 15,
  },
});

export default UpdateDataModal;

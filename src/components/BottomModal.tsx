import React from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import {Layout, Variables, Images, FontStyle} from '../Theme';
import variables from '../Theme/variables';
import {BottomModalProps} from './types';

const BottomModal: React.FC<BottomModalProps> = ({
  openModal,
  onModalClose,
  headerTxt,
  optionOneTxt,
  optionTwoTxt,
  onModalOptionPress,
  cancelTxt,
}) => {
  return (
    <>
      <View>
        <Modal animationType="slide" transparent={true} visible={openModal}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardView}>
            <View style={styles.parentView}>
              <View
                style={{
                  marginTop: 'auto',
                }}>
                <View style={styles.footer}>
                  <Text style={[styles.headerText, FontStyle.urbanistBold]}>
                    {headerTxt}
                  </Text>
                  <TouchableOpacity
                    style={styles.downBtnView}
                    onPress={onModalClose}
                  />
                </View>
                <View style={styles.optionsView}>
                  <TouchableOpacity
                    style={[styles.gallaryView, Layout.center]}
                    onPress={() => onModalOptionPress('modalOption1')}>
                    <Text
                      style={[
                        FontStyle.urbanistMedium,
                        Layout.center,
                        styles.optionTxt,
                      ]}>
                      {optionOneTxt}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.gallaryView, Layout.center]}
                    onPress={() => onModalOptionPress('modalOption2')}>
                    <Text
                      style={[
                        FontStyle.urbanistMedium,
                        Layout.center,
                        styles.optionTxt,
                      ]}>
                      {optionTwoTxt}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.gallaryView, Layout.center]}
                    onPress={onModalClose}>
                    <Text
                      style={[
                        FontStyle.urbanistMedium,
                        Layout.center,
                        styles.cancelTxt,
                      ]}>
                      {cancelTxt}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </Modal>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  parentView: {
    backgroundColor: Variables.Colors.absoluteBgGrey,
    position: 'absolute',
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
  },
  downBtnView: {
    position: 'absolute',
    top: 30,
    right: 10,
  },
  headerText: {
    padding: 25,
    alignSelf: 'center',
    fontSize: 20,
    color: variables.Colors.yellow,
  },
  footer: {
    backgroundColor: Variables.Colors.greyBg,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    borderBottomColor: Variables.Colors.borderGrey,
    borderBottomWidth: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  optionsView: {
    width: '100%',
    backgroundColor: Variables.Colors.greyBg,
  },
  gallaryView: {
    height: Variables.Measures.width / 7,
  },
  keyboardView: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  optionTxt: {
    fontSize: 16,
    color: Variables.Colors.white,
  },
  cancelTxt: {
    color: Variables.Colors.error,
    fontSize: 18,
  },
});

export default BottomModal;

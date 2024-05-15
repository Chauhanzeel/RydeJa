import React from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import { Variables, FontStyle } from "../Theme";
import { Measures } from "../Theme/variables";
import { InputFieldProps } from "./types";

const InputField: React.FC<InputFieldProps> = ({
  value,
  onChangeText,
  placeholder,
  onSubmitEditing = () => {},
  inputref,
  inputKeyboardType,
  inputReturnKeyType,
  multiline,
  placeholderTextColor,
  emptyField,
  labelTxt,
  secureTextEntry,
  maxLength,
  textInputHeight = 50,
  textAlignVertical = "center",
  editable = true,
}) => {
  return (
    <View>
      {labelTxt && (
        <Text style={[FontStyle.urbanistMedium, styles.inputTitleTxt]}>
          {labelTxt}
        </Text>
      )}
      <TextInput
        multiline={multiline}
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        textAlignVertical={textAlignVertical}
        editable={editable}
        style={[
          emptyField === 0
            ? styles.inputView
            : emptyField === 2
            ? styles.errorInputField
            : styles.emptyInputField,
          { height: textInputHeight },
          FontStyle.urbanistMedium,
        ]}
        // defaultValue={value}
        value={value}
        maxLength={maxLength}
        onChangeText={(val: string) => {
          onChangeText(val);
        }}
        onSubmitEditing={() => onSubmitEditing()}
        ref={inputref}
        returnKeyType={inputReturnKeyType}
        keyboardType={inputKeyboardType}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputView: {
    width: "100%",
    backgroundColor: Variables.Colors.carGrey,
    height: 50,
    alignSelf: "center",
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: Measures.fontSize / 1.4,
    marginTop: 8,
    color: Variables.Colors.white,
  },
  emptyInputField: {
    width: "100%",
    backgroundColor: Variables.Colors.carGrey,
    height: 50,
    alignSelf: "center",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginTop: 8,
    borderColor: Variables.Colors.darkYellow,
    borderWidth: 1,
    fontSize: Measures.fontSize / 1.4,
    color: Variables.Colors.white,
  },
  errorInputField: {
    width: "100%",
    backgroundColor: Variables.Colors.carGrey,
    height: 50,
    alignSelf: "center",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginTop: 8,
    borderColor: Variables.Colors.red,
    borderWidth: 1,
    fontSize: Measures.fontSize / 1.4,
    color: Variables.Colors.white,
  },
  inputTitleTxt: {
    color: Variables.Colors.inputTxtColor,
    fontSize: Measures.fontSize / 1.3,
    width: "90%",
    marginLeft: 3,
  },
});

export default InputField;

import { StyleSheet } from "react-native";
import { Variables } from "../Theme";
import { Measures } from "./variables";

const CommonStyles = StyleSheet.create({
  registerView: {
    marginTop: Variables.Measures.fontSize,
    marginBottom: Variables.Measures.fontSize,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  noAccTxt: {
    color: Variables.Colors.questionWhite,
    fontSize: Variables.Measures.fontSize / 1.5,
  },
  signUpTxt: {
    color: Variables.Colors.yellow,
    fontSize: Variables.Measures.fontSize / 1.5,
    marginLeft: 5,
  },
  lineCenterView: {
    height: 50,
    marginTop: 10,
    marginBottom: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  lineView: {
    borderWidth: 0.6,
    borderColor: Variables.Colors.borderGrey,
    flexDirection: "row",
    width: "100%",
    heigh: 0.5,
  },
  orView: {
    position: "absolute",
    borderRadius: 25,
    height: 50,
    backgroundColor: Variables.Colors.darkBlack,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  orTxt: {
    color: Variables.Colors.questionWhite,
    fontSize: Variables.Measures.fontSize / 1.3,
  },
  safeAreaStyle: {
    flex: 1,
    backgroundColor: Variables.Colors.blackBg,
  },
  errorTxt: {
    fontSize: 12,
    color: Variables.Colors.inputTxtColor,
  },
  errorView: {
    width: "88%",
    alignSelf: "center",
    marginTop: Variables.Measures.unit,
  },
  headingTxt: {
    color: Variables.Colors.white,
    textAlign: "left",
    fontSize: Variables.Measures.fontSize * 1.8,
    marginTop: Variables.Measures.fontSize,
    width: "95%",
  },
  socialSignIn: {
    height: Variables.Measures.fontSize * 2.7,
    width: Variables.Measures.fontSize * 4,
    backgroundColor: Variables.Colors.greyBg,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  descTxt: {
    fontSize: Variables.Measures.fontSize / 2,
    color: Variables.Colors.white,
    marginTop: Variables.Measures.unit / 1.2,
    lineHeight: 20,
  },
  plusView: {
    position: "absolute",
    bottom: Variables.Measures.fontSize,
    right: 0,
    height: 60,
    width: 60,
    borderRadius: 60,
    backgroundColor: Variables.Colors.yellow,
    alignItems: "center",
    justifyContent: "center",
    bottom: 10,
  },
  LargeCommonTxt: {
    color: Variables.Colors.white,
    fontSize: Variables.Measures.fontSize * 1.8,
  },
  headingCommonTxt: {
    color: Variables.Colors.white,
    fontSize: Variables.Measures.fontSize * 1.3,
  },
  titleCommonTxt: {
    color: Variables.Colors.white,
    fontSize: Variables.Measures.fontSize * 1.1,
  },
  smallCommonTxt: {
    color: Variables.Colors.white,
    fontSize: Variables.Measures.fontSize / 1.1,
  },
  buttonCommonTxt: {
    color: Variables.Colors.white,
    fontSize: Variables.Measures.fontSize / 1.2,
  },
  buttonCommonTxt1: {
    color: Variables.Colors.white,
    fontSize: Variables.Measures.fontSize / 1.3,
  },
  descCommonTxt: {
    fontSize: Variables.Measures.fontSize / 1.4,
    color: Variables.Colors.white,
    lineHeight: 15,
  },
  tingCommonTxt: {
    fontSize: Variables.Measures.fontSize / 1.8,
    color: Variables.Colors.white,
  },
  extraSmallCommonTxt: {
    fontSize: Variables.Measures.fontSize / 1.6,
    color: Variables.Colors.white,
    lineHeight: 15,
  },
  descCommonTxtOnly: {
    fontSize: Variables.Measures.fontSize / 1.4,
    color: Variables.Colors.white,
    lineHeight: 20,
  },
  justifyText: {
    textAlign: "left",
  },
});

export default CommonStyles;

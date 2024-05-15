import { StyleSheet } from "react-native";
import { Variables } from "../../Theme";

export default StyleSheet.create({
  cell: {
    width: 60,
    height: 60,
    lineHeight: 60,
    fontSize: 30,
    fontWeight: "900",
    textAlign: "center",
    borderRadius: 12,
    borderColor: "#35383F",
    backgroundColor: Variables.Colors.greyBg,
    borderWidth: 1,
    color: Variables.Colors.inputTxtColor,
    marginHorizontal: 7,
  },
  toggle: {
    width: 60,
    height: 60,
    lineHeight: 60,
    fontSize: 30,
    textAlign: "center",
  },
  focusCell: {
    borderColor: Variables.Colors.yellow,
  },
});

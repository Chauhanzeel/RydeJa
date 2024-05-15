import { Dimensions, StatusBar, Platform } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";

let screen = Dimensions.get("window");
import DeviceInfo from "react-native-device-info";

export const Colors = {
  lightgrey: "#0D0D0D",
  white: "#ffffff",
  startBtnColor: "rgba(31, 50, 128, 1)",
  yellow: "rgba(224, 186, 34, 1)",
  starYellow: "#febb1b",
  blackBg: "rgba(0, 0, 0, 1)",
  greyBg: "rgba(28, 28, 28, 1)",
  modalGreyBg: "rgba(31, 34, 42, 0.8)",
  borderGrey: "rgba(53, 56, 63, 1)",
  greyDots: "rgba(53, 56, 63, 1)",
  textWhite: "#ffffff",
  inputTxtColor: "rgba(158, 158, 158, 1)",
  locationGrey: "rgba(224, 224, 224, 1)",
  distanceGrey: "rgba(245, 245, 245, 1)",
  absoluteBgGrey: "rgba(9, 16, 29, 0.7)",
  activeTab: "rgba(97, 97, 97, 1)",
  chatWhite: "rgba(255, 255, 255, 1)",
  chatGrey: "rgba(254, 187, 27, 0.08)",
  lightYellow: "rgba(255, 199, 64, 1)",
  red: "rgba(247, 85, 85, 1)",
  searchGrey: "rgba(117, 117, 117, 1)",
  questionWhite: "rgba(250, 250, 250, 1)",
  lightyellow: "rgba(255, 228, 164, 1)",
  darkYellow: "rgba(224, 186, 34, 1)",
  darkBlack: "rgba(0, 0, 0, 1)",
  darkGrey: "rgba(13, 13, 13, 1)",
  carGrey: "rgba(28, 28, 28, 1)",
  carsBorderGrey: "rgba(112, 112, 112, 1)",
  blackAbsolute: "̉rgba(0, 0, 0, 0.8)",
  blackOpac85: "rgba(0,0,0,0.85)",
  blackOpac70: "rgba(0,0,0,0.7)",
  yellowMarker: "rgba(224, 186, 34, 0.2)",
  btnRed: "rgba(255, 35, 43, 1)",
  statusBarColor: "rgba(45, 42, 32, 1)",
  brown: "rgba(120, 97, 4, 1)",
  darkGreen: "rgba(67, 172, 37, 1)",
  darkRed: "rgba(253, 36, 36, 1)",

  success: "#46cc6b",
  error: "rgba(242, 66, 66, 1)",
  grey: "#C7D3E0",
  chocolate: "#9E9E9E",
  search: "rgba(31, 34, 42, 1)",
  toastBg: "#1C1C1C",
  whiteOpa30: "rgba(250, 250, 250, 0.3)",
};

export const NavigationColors = {
  primary: Colors.primary,
  grey: Colors.grey,
};

export const FontSize = {
  small: 16,
  regular: 20,
  large: 40,
};

const tiny = 5; // 5
const small = tiny * 2; // 10
const regular = tiny * 3; // 15
const large = regular * 2; // 30
export const MetricsSizes = {
  tiny,
  small,
  regular,
  large,
};

export const Measures = {
  width: screen.width,
  height: screen.height,
  unit: 8,
  fontSize: (screen.width / 100) * 5.34,
  fullScreenStatusBarHeight: Platform.select({
    ios:
      DeviceInfo.hasNotch() === true
        ? (screen.height = 5 / 100)
        : (screen.height = 3 / 100),
    android: StatusBar.currentHeight,
    default: 0,
  }),
  StatusBarHeight: Platform.select({
    ios: getStatusBarHeight(),
    android: StatusBar.currentHeight,
  }),
};

export default {
  Colors,
  NavigationColors,
  FontSize,
  MetricsSizes,
  Measures,
};

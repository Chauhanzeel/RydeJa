import { StyleSheet } from "react-native";
import { Variables } from ".";

const FontStyle = StyleSheet.create({
  textWhiteBoldSmall: {
    fontSize: Variables.FontSize.small,
    color: Variables.Colors.textWhite,
    fontFamily: "Montserrat-Bold",
  },
  textBlackBoldRegular: {
    color: Variables.Colors.black,
    fontSize: Variables.FontSize.regular,
    fontFamily: "Montserrat-Bold",
  },
  textWhiteSemiBoldRegular: {
    fontSize: Variables.FontSize.regular,
    color: Variables.Colors.textWhite,
    fontFamily: "Montserrat-SemiBold",
  },
  textWhiteSemiBoldSmall: {
    fontSize: Variables.FontSize.small,
    color: Variables.Colors.textWhite,
    fontFamily: "Montserrat-SemiBold",
  },
  textBlackRegularSmall: {
    fontSize: Variables.FontSize.small,
    color: Variables.Colors.textBlack,
    fontFamily: "Montserrat-SemiBold",
  },
  textWhiteRegularSmall: {
    fontSize: Variables.FontSize.small,
    color: Variables.Colors.textBlack,
    fontFamily: "Montserrat-Regular",
  },
  textWhiteSemiBoldSmall: {
    color: Variables.Colors.textWhite,
    fontSize: Variables.FontSize.small,
    fontFamily: "Montserrat-SemiBold",
  },
  textBlackSemiBoldRegular: {
    fontSize: Variables.FontSize.regular,
    color: Variables.Colors.black,
    fontFamily: "Montserrat-SemiBold",
  },
  textPrimaryBoldRegular: {
    fontSize: Variables.FontSize.regular * 1.5,
    color: Variables.Colors.primary,
    fontFamily: "Montserrat-Bold",
  },
  textPrimaryBoldSmall: {
    fontSize: Variables.FontSize.small,
    color: Variables.Colors.primary,
    fontFamily: "Montserrat-Bold",
  },
  textPrimaryBoldExtraSmall: {
    fontSize: Variables.FontSize.small - 3,
    color: Variables.Colors.primary,
    fontFamily: "Montserrat-Bold",
  },
  montBold: {
    fontFamily: "Montserrat-Bold",
  },
  montSemiBold: {
    fontFamily: "Montserrat-SemiBold",
  },
  montRegular: {
    fontFamily: "Montserrat-Regular",
  },
  montMedium: {
    fontFamily: "Montserrat-Medium",
  },
  montBlack: {
    fontFamily: "Montserrat-Black",
  },
  latoRegular: {
    fontFamily: "Lato-Regular",
  },
  urbanistBold: {
    fontFamily: "Urbanist-Bold",
  },
  urbanistLight: {
    fontFamily: "Urbanist-Light",
  },
  urbanistMedium: {
    fontFamily: "Urbanist-Medium",
  },
  urbanistRegular: {
    fontFamily: "Urbanist-Regular",
  },
  urbanistSemiBold: {
    fontFamily: "Urbanist-SemiBold",
  },
  urbanistThin: {
    fontFamily: "Urbanist-Thin",
  },
  urbanistBlack: {
    fontFamily: "Urbanist-Black",
  },
});

export default FontStyle;

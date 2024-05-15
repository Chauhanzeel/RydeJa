import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { CommonStyles, FontStyle, Layout, Variables } from "../Theme";
import AlertSvg from "../assets/Images/Alert.svg";
import { navigate } from "../navigators/RootNavigation";

interface StripeAccountSetupProps {}

const StripeAccountSetup: React.FC<StripeAccountSetupProps> = () => {
  return (
    <View style={styles.alertView}>
      <View style={{ width: "15%" }}>
        <AlertSvg />
      </View>
      <View style={{ width: "85%" }}>
        <Text style={[FontStyle.urbanistBold, styles.setUpTxt]}>
          Set up your Stripe account
        </Text>
        <Text
          style={[
            FontStyle.urbanistMedium,
            styles.infoTxt,
            CommonStyles.justifyText,
          ]}
        >
          {`To ensure you receive your payment within 2-3 business days after a trip, please provide the following banking information:

- Bank Name
- Branch Name 
- Account Number
`}
        </Text>
        <TouchableOpacity
          style={{ alignItems: "flex-end", marginRight: 5 }}
          onPress={() => navigate("SetUpAccount")}
        >
          <Text style={[FontStyle.urbanistBold, styles.setUpBtnTxt]}>
            Set up Stripe account
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  alertView: {
    width: "95%",
    backgroundColor: Variables.Colors.greyBg,
    alignSelf: "center",
    marginTop: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Variables.Colors.darkYellow,
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 15,
  },
  infoTxt: {
    color: Variables.Colors.white,
    fontSize: 14,
    lineHeight: 20,
    marginVertical: 8,
    marginRight: 5,
  },
  setUpBtnTxt: {
    color: Variables.Colors.darkYellow,
    fontSize: 12,
  },
  setUpTxt: {
    fontSize: 16,
    color: Variables.Colors.white,
  },
});
export default StripeAccountSetup;

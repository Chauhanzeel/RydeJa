import React from "react";
import { View, Text, StyleSheet, StatusBar, ScrollView } from "react-native";
import { FontStyle, Variables } from "../../Theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";

import Header from "../../components/Header";

import BackSvg from "../../assets/Images/BackArrow.svg";

import { goBack } from "../../navigators/RootNavigation";

interface PrivacyProps {}

const PrivacyPolicy: React.FC<PrivacyProps> = () => {
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.safeAreaStyle}>
      <StatusBar barStyle="light-content" />
      <Header
        centerText={t("labelConst.privacyPolicy")}
        leftSvg={<BackSvg height={25} width={25} />}
        onLeftPress={goBack}
      />
      <ScrollView style={{ height: "100%" }}>
        <View style={styles.outerView}>
          <Text style={[FontStyle.urbanistBold, styles.headingTxt]}>
            1. Types of Data We Collect
          </Text>
          <Text style={[FontStyle.urbanistRegular, styles.descTxt]}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </Text>
          <Text style={[FontStyle.urbanistBold, styles.headingTxt]}>
            2. Use of Your Personal Data
          </Text>
          <Text style={[FontStyle.urbanistRegular, styles.descTxt]}>
            Magna etiam tempor orci eu lobortis elementum nibh. Vulputate enim
            nulla aliquet porttitor lacus. Orci sagittis eu volutpat odio. Cras
            semper auctor neque vitae tempus quam pellentesque nec. Non quam
            lacus suspendisse faucibus interdum posuere lorem ipsum dolor.
            Commodo elit at imperdiet dui. Nisi vitae suscipit tellus mauris a
            diam. Erat pellentesque adipiscing commodo elit at imperdiet dui. Mi
            ipsum faucibus vitae aliquet nec ullamcorper. Pellentesque pulvinar
            pellentesque habitant morbi tristique senectus et.
          </Text>
          <Text style={[FontStyle.urbanistBold, styles.headingTxt]}>
            3. Disclosure of Your Personal Data
          </Text>
          <Text style={[FontStyle.urbanistRegular, styles.descTxt]}>
            Consequat id porta nibh venenatis cras sed. Ipsum nunc aliquet
            bibendum enim facilisis gravida neque. Nibh tellus molestie nunc non
            blandit massa. Quam pellentesque nec nam aliquam sem et tortor
            consequat id. Faucibus vitae aliquet nec ullamcorper sit amet risus.
            Nunc consequat interdum varius sit amet. Eget magna fermentum
            iaculis eu non diam phasellus vestibulum. Pulvinar pellentesque
            habitant morbi tristique senectus et. Lorem donec massa sapien
            faucibus et molestie. Massa tempor nec feugiat nisl pretium fusce
            id. Lacinia at quis risus sed vulputate odio. Integer vitae justo
            eget magna fermentum iaculis. Eget gravida cum sociis natoque
            penatibus et magnis.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headingTxt: {
    color: Variables.Colors.locationGrey,
    fontSize: Variables.Measures.fontSize * 1.1,
    marginTop: Variables.Measures.fontSize / 1.8,
  },
  descTxt: {
    color: Variables.Colors.locationGrey,
    fontSize: Variables.Measures.fontSize / 1.5,
    marginVertical: Variables.Measures.unit * 2.5,
    lineHeight: 20,
  },
  outerView: {
    width: "90%",
    alignSelf: "center",
    marginTop: Variables.Measures.unit,
  },
  safeAreaStyle: {
    flex: 1,
    backgroundColor: Variables.Colors.blackBg,
  },
});
export default PrivacyPolicy;

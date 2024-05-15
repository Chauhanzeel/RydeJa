import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
} from "react-native";
import { FontStyle, Variables, CommonStyles, Images } from "../Theme";
import { useTranslation } from "react-i18next";
import { goBack, navigate } from "../navigators/RootNavigation";

import BackSvg from "../assets/Images/BackArrow.svg";
import ButtonView from "../components/ButtonView";
import Header from "../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import { RouteProp } from "@react-navigation/native";

interface MapProps {
  // onClick: (val: number, val2: number) => void;
  route?: RouteProp<any, any>;
}
const { width, height } = Image.resolveAssetSource(Images.scanVin);

const ScanVin: React.FC<MapProps> = ({ route }) =>
  // { onClick }
  {
    const { t } = useTranslation();

    const HeaderView = () => {
      return (
        <View style={styles.headerContainer}>
          <TouchableOpacity
            style={styles.leftHeaderView}
            // onPress={() => onClick(0, 1)}
          >
            <BackSvg />
          </TouchableOpacity>
          <View style={{ width: "100%", justifyContent: "center" }}>
            <Text style={[FontStyle.urbanistBold, styles.headingTxt]}>
              Please scan your VIN barcode
            </Text>
          </View>
        </View>
      );
    };

    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar
          backgroundColor={Variables.Colors.blackBg}
          barStyle={"light-content"}
        />
        <ScrollView style={[CommonStyles.safeAreaStyle]}>
          <Header
            leftSvg={<BackSvg height={25} width={25} />}
            onLeftPress={() =>
              // onClick(27, 4)
              goBack()
            }
            centerText="Please scan your VIN barcode"
          />
          {/* <View style={styles.widthView}></View> */}
          <View style={styles.centerImgView}>
            <Image
              source={Images.scanVin}
              style={{ height: height, width: width }}
            />
          </View>
          <View style={{ width: "100%", marginVertical: 20 }}>
            <ButtonView
              btnTxt="Type VIN Instead"
              onBtnPress={() => {
                // onClick(18, 0);
                navigate("TypeVin");
              }}
              width={Variables.Measures.width / 1.12}
              backgroundColor={Variables.Colors.yellow}
              fontColor={Variables.Colors.darkBlack}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };

const styles = StyleSheet.create({
  headerContainer: {
    height: 60,
    width: "90%",
    alignSelf: "center",
    flexDirection: "row",
  },
  headingTxt: {
    color: Variables.Colors.white,
    fontSize: 22,
    width: "90%",
  },
  widthView: {
    width: "90%",
    alignSelf: "center",
  },
  leftHeaderView: {
    width: "10%",
    justifyContent: "center",
  },
  centerImgView: {
    flex: 1,
    width: "100%",
    marginTop: 6,
  },
});

export default ScanVin;

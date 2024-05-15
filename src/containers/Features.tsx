import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";

import { CommonStyles, FontStyle, Layout, Variables } from "../Theme";
import { goBack } from "../navigators/RootNavigation";

import LeftSvg from "../assets/Images/BackArrow.svg";
import { CarFeatureProps } from "./types";
import _ from "lodash";
import FastImageView from "../components/FastImageView";

interface CancelProps {}

const Features: React.FC<CarFeatureProps> = ({ route }) => {
  const { t } = useTranslation();
  const features = route.params?.carFeature;

  const renderFeaturesdata = (item: any) => {
    return (
      <View style={styles.rowView}>
        <View style={{ width: "14%" }}>
          <FastImageView
            source={{ uri: item.icon }}
            style={{ width: 30, height: 43 }}
            resizeMode={"contain"}
          />
        </View>
        <View>
          <Text style={[FontStyle.urbanistMedium, CommonStyles.descCommonTxt]}>
            {item.name}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeAreaStyle}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={styles.headerOuterView}>
        <TouchableOpacity style={styles.headerLeftView} onPress={goBack}>
          <LeftSvg />
        </TouchableOpacity>
        <Text style={[FontStyle.urbanistBold, CommonStyles.smallCommonTxt]}>
          {t("labelConst.fetauresTxt")}
        </Text>
      </View>
      <ScrollView style={{ height: "100%" }}>
        <View style={styles.featuresView}>
          {_.size(features) > 0 && (
            <FlatList
              data={features}
              renderItem={({ item }: any) => renderFeaturesdata(item)}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerTxt: {
    color: Variables.Colors.white,
    fontSize: 24,
  },
  headerOuterView: {
    height: 60,
    flexDirection: "row",
    width: "90%",
    alignSelf: "center",
    alignItems: "center",
  },
  headerLeftView: {
    width: "10%",
    justifyContent: "center",
  },
  rowView: {
    flexDirection: "row",
    marginTop: 18,
    alignItems: "center",
  },
  featuresView: {
    width: "90%",
    alignSelf: "center",
    paddingBottom: Variables.FontSize.regular,
  },
  featureTxt: {
    fontSize: 16,
    color: Variables.Colors.white,
  },
  safeAreaStyle: {
    flex: 1,
    backgroundColor: Variables.Colors.darkBlack,
  },
});
export default Features;

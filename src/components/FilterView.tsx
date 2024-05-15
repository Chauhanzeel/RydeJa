import React from "react";
import FastImage from "react-native-fast-image";
import { SvgUri } from "react-native-svg";
import _ from "lodash";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CommonStyles, FontStyle, Variables } from "../Theme";
import { useTranslation } from "react-i18next";
import FilterSvg from "../assets/Images/Filter.svg";

interface FastImageViewProps {
  count: any | object;
  setSearchModal: () => void;
  customStyle?: any;
}

const FilterView: React.FC<FastImageViewProps> = ({
  count,
  setSearchModal,
  customStyle,
}) => {
  const { t } = useTranslation();

  return (
    <View style={customStyle ? customStyle : styles.filterBtnView}>
      <TouchableOpacity
        style={styles.filterInnerView}
        onPress={() => setSearchModal()}
      >
        <View style={styles.carsAvailableView}>
          <Text
            style={[
              FontStyle.urbanistRegular,
              CommonStyles.descCommonTxt,
              { color: Variables.Colors.darkBlack },
            ]}
          >
            {count} cars available
          </Text>
        </View>
        <View style={styles.filterView}>
          <FilterSvg />
          <Text
            style={[
              FontStyle.urbanistBold,
              CommonStyles.smallCommonTxt,
              { color: Variables.Colors.darkBlack, marginLeft: 5 },
            ]}
          >
            {t("labelConst.filterTxt")}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  carsAvailableView: {
    width: "47%",
    backgroundColor: Variables.Colors.darkYellow,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  filterInnerView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  filterBtnView: {
    width: "90%",
    alignSelf: "center",
    alignItems: "center",
    marginVertical: 20,
    position: "absolute",
    bottom: 20,
  },
  filterView: {
    backgroundColor: Variables.Colors.darkYellow,
    width: "33%",
    height: 50,
    marginLeft: 1,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTxt: {
    marginLeft: 15,
    color: Variables.Colors.white,
    fontSize: 24,
  },
});

export default FilterView;

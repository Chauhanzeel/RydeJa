import React, { useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { FontStyle, Variables } from "../Theme";
import { goBack, navigate } from "../navigators/RootNavigation";

import { FilterModalProps } from "../containers/types";
import { useTranslation } from "react-i18next";
import { ParishesData } from "../containers/MockData/ParishesData";

const FilterModal: React.FC<FilterModalProps> = ({ route }) => {
  const { t } = useTranslation();
  const searchModalOpen = route.params.searchModalOpen;
  const tripDateModal = route.params.tripDateModal;

  const [openModal, setOpenModal] = useState(tripDateModal);
  const [searchModal, setSearchModal] = useState(searchModalOpen);

  const [data, setData] = useState([...ParishesData]);
  const [search, setSearch] = useState(null);
  const [serachedLength, setSearchedLength] = useState(0);

  const handleSearch = (text: string) => {
    let newData = ParishesData.filter((item) => {
      const itemData = `${item.cityName.toUpperCase()}`;
      const textData = text.toUpperCase();
      if (text.length > 0) {
        return itemData.indexOf(textData) > -1;
      }
    });
    if (text.length > 0) {
      setData(newData);
      setSearch(text);
      setSearchedLength(newData.length);
    } else {
      setSearch("No data Found");
      setSearchedLength(0);
    }
  };

  const renderSearchData = (item: any) => {
    return (
      <View style={styles.searchDataView}>
        <View style={{ width: "17%" }}>{item.perishImg}</View>
        <TouchableOpacity onPress={() => navigate("CarsPerish")}>
          <Text style={[FontStyle.urbanistMedium, styles.cityTxt]}>
            {item.cityName}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.modalView}>
      <View
        style={[styles.modalContainer, { paddingTop: 20, paddingBottom: 7 }]}
      >
        <View style={{ width: "93%", alignSelf: "center" }}>
          <TextInput
            placeholder={t("labelConst.inputCity")}
            placeholderTextColor={Variables.Colors.inputTxtColor}
            style={styles.inputView}
            onChangeText={(val: any) => handleSearch(val)}
            onSubmitEditing={() => {
              setSearchModal(!searchModal);
            }}
          />
          <Text style={[FontStyle.urbanistBold, styles.parishesTxt]}>
            {t("labelConst.parishes")}
          </Text>
          <View style={styles.searchView}>
            <FlatList
              data={data}
              renderItem={({ item }: object | any) => renderSearchData(item)}
              keyExtractor={(index) => index.toString()}
            />
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  imgView: {
    height: Variables.Measures.height / 1.8,
    width: Variables.Measures.width * 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  modalContainer: {
    width: Variables.Measures.width / 1.3,
    backgroundColor: Variables.Colors.carGrey,
    position: "absolute",
    top: 40,
    right: 13,
    zIndex: 1000,
    borderRadius: 7,
  },
  modalView: {
    backgroundColor: Variables.Colors.blackAbsolute,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: Variables.Measures.height,
  },
  cityTxt: {
    fontSize: 12,
    color: Variables.Colors.chatWhite,
  },
  searchDataView: {
    flexDirection: "row",
    marginTop: 17,
    alignItems: "center",
    width: "97%",
    alignSelf: "center",
    borderBottomColor: Variables.Colors.white,
  },
  parishesTxt: {
    fontSize: 14,
    color: Variables.Colors.darkYellow,
    marginVertical: 10,
  },
  inputView: {
    backgroundColor: Variables.Colors.carGrey,
    borderBottomColor: Variables.Colors.borderGrey,
    borderBottomWidth: 1,
    paddingHorizontal: 5,
    color: Variables.Colors.white,
  },
  searchView: {
    maxHeight: 400,
    paddingVertical: 10,
    borderBottomColor: Variables.Colors.borderGrey,
    borderBottomWidth: 1,
  },
  safeAreaStyle: {
    flex: 1,
    backgroundColor: Variables.Colors.darkBlack,
  },
});

export default FilterModal;

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  FlatList,
  TextInput,
} from "react-native";
import { Variables, FontStyle, CommonStyles } from "../Theme";
import { useTranslation } from "react-i18next";
import { navigate } from "../navigators/RootNavigation";

import CalendarSvg from "../assets/Images/CalendarModal.svg";
import RightArrowSvg from "../assets/Images/RightYellowArrow.svg";
import BackSvg from "../assets/Images/BackArrow.svg";
import CitySvg from "../assets/Images/City.svg";
import Parish1Svg from "../assets/Images/Parish1.svg";

import { useSelector } from "react-redux";
import DashedLine from "react-native-dashed-line";
import _ from "lodash";
import { Colors, Measures } from "../Theme/variables";
import FastImageView from "./FastImageView";
interface ParishModalProps {
  modalVisible: boolean;
  onDismiss?: () => void;
  _debounceObj?: any;
  filterPlug?: boolean;
  onSuccess?: (val: any) => void;
  rScreen?: string;
}

const ParishModal: React.FC<ParishModalProps> = ({
  modalVisible,
  onDismiss,
  onSuccess,
  _debounceObj,
  filterPlug,
  rScreen = "HostCarProfile",
}) => {
  const { t } = useTranslation();

  const [parishListData] = useSelector(
    (state: {
      customer: {
        carListData: any;
        favouriteCarListData: any;
        parishListData: any;
      };
    }) => [state?.customer?.parishListData]
  );

  const [data, setData] = useState(
    parishListData ? [...parishListData?.items] : []
  );
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState(null);
  const [selectParis, setSelectParis] = useState("Saint Catherine");

  const submit = (item: any) => {
    filterPlug
      ? navigate("CarsPerish", { data: item, rScreen: rScreen })
      : onSuccess(item);
    setSelectParis(item.name);
    onDismiss();
  };

  const renderSearchData = (item: any) => {
    return (
      <TouchableOpacity
        style={styles.searchDataView}
        onPress={() => submit(item)}
      >
        <View style={{ width: "17%" }}>
          <FastImageView
            style={{
              width: Measures.fontSize * 1.5,
              height: Measures.fontSize * 1.5,
            }}
            source={{ uri: _.get(item, "greyIcon", null) }}
          />
        </View>
        <View>
          <Text style={[FontStyle.urbanistMedium, CommonStyles.descCommonTxt]}>
            {item?.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const handleSearch = (text: string) => {
    if (_debounceObj != null) {
      _debounceObj.cancel();
    }
    _debounceObj = _.debounce(() => {
      let newData = _.filter(parishListData?.items, (item: any) => {
        const itemData = `${_.get(item, "name", null)?.toUpperCase()}`;
        const textData = text?.toUpperCase();
        if (text?.length > 0) {
          return itemData?.indexOf(textData) > -1;
        }
      });
      if (_.size(text) > 0) {
        setData(newData);
      } else {
        setData(parishListData?.items);
      }
    }, 500);

    _debounceObj();
    setSearch(text);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      statusBarTranslucent
      onRequestClose={onDismiss}
    >
      <TouchableWithoutFeedback onPressOut={() => onDismiss()}>
        <View style={{ flex: 1 }}>
          {openModal && (
            <View style={styles.modalView}>
              <View
                style={[
                  styles.modalContainer,
                  { paddingVertical: Measures.fontSize },
                ]}
              >
                <View style={styles.modalContent}>
                  <TouchableOpacity
                    onPress={() => {
                      // setSearchModal(!searchModal), setOpenModal(!openModal);
                    }}
                  >
                    <Text
                      style={[
                        FontStyle.urbanistBold,
                        CommonStyles.smallCommonTxt,
                        styles.locationTxt,
                      ]}
                    >
                      PARISHES
                    </Text>
                  </TouchableOpacity>
                  <View style={styles.rowFlexView}>
                    <CitySvg height={30} width={30} />
                    <Text style={[FontStyle.urbanistMedium, styles.dateTxt]}>
                      {selectParis}
                    </Text>
                  </View>
                </View>
                <DashedLine
                  dashLength={6}
                  dashColor={Variables.Colors.borderGrey}
                  dashThickness={0.7}
                />
                <View style={styles.modalContent}>
                  <TouchableOpacity onPress={() => navigate("Calender")}>
                    <Text style={[FontStyle.urbanistBold, styles.locationTxt]}>
                      TRIP DATE
                    </Text>
                  </TouchableOpacity>

                  <View style={styles.rowFlexView}>
                    <CalendarSvg height={40} width={40} />
                    <Text style={[FontStyle.urbanistMedium, styles.dateTxt]}>
                      Oct. 27. 10:a.m
                    </Text>
                    <View style={{ marginLeft: 10 }}>
                      <RightArrowSvg />
                    </View>
                    <Text style={[FontStyle.urbanistMedium, styles.dateTxt]}>
                      Oct 30. 12:00 p.m.
                    </Text>
                  </View>
                </View>
                <DashedLine
                  dashLength={6}
                  dashColor={Variables.Colors.borderGrey}
                  dashThickness={0.7}
                />
                <View style={{ marginVertical: 10 }}></View>
              </View>
            </View>
          )}
          {!openModal && (
            <View style={styles.modalView}>
              <TouchableWithoutFeedback>
                <View
                  style={[
                    styles.modalContainer,
                    {
                      marginTop: Measures.StatusBarHeight,
                      paddingBottom: 7,
                    },
                  ]}
                >
                  <View
                    style={{
                      width: "93%",
                      alignSelf: "center",
                    }}
                  >
                    <TextInput
                      placeholder={t("labelConst.inputCity")}
                      placeholderTextColor={Variables.Colors.inputTxtColor}
                      style={styles.inputView}
                      value={search}
                      onChangeText={(val: any) => handleSearch(val)}
                    />
                    <Text style={[FontStyle.urbanistBold, styles.parishesTxt]}>
                      {t("labelConst.parishes")}
                    </Text>
                    <View style={styles.searchView}>
                      <FlatList
                        data={data}
                        renderItem={({ item }: object | any) =>
                          renderSearchData(item)
                        }
                        keyExtractor={(index) => index.toString()}
                      />
                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
          )}
          {!openModal && (
            <TouchableOpacity
              style={styles.leftAbsoluteView}
              onPress={() => {
                onDismiss();
                // ? setOpenModal(!openModal) :
              }}
            >
              <BackSvg height={25} width={25} />
            </TouchableOpacity>
          )}
          {openModal && (
            <TouchableOpacity
              style={styles.leftAbsoluteView}
              onPress={() => {
                onDismiss(), setOpenModal(false);
              }}
            >
              <BackSvg height={25} width={25} />
            </TouchableOpacity>
          )}
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  availableTxt: {
    fontSize: 12,
    color: Variables.Colors.darkBlack,
  },
  filterTxt: {
    fontSize: 16,
    color: Variables.Colors.darkBlack,
    marginLeft: 5,
  },
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
    height: 50,
    alignSelf: "center",
    marginVertical: 20,
    alignItems: "center",
    position: "absolute",
    bottom: 30,
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
  nextBtnView: {
    alignSelf: "center",
    height: Variables.Measures.fontSize * 2.1,
  },
  nextBtnTextView: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    borderRadius: 17,
    width: Variables.Measures.width / 1.5,
    backgroundColor: Variables.Colors.darkYellow,
  },
  nextTxt: {
    fontSize: Variables.Measures.fontSize / 1.2,
    color: Variables.Colors.darkBlack,
  },
  bgImgView: {
    height: Variables.Measures.height / 2.5,
    width: Variables.Measures.width,
    alignItems: "center",
    justifyContent: "center",
  },
  imgView: {
    height: Variables.Measures.height / 1.8,
    width: Variables.Measures.width * 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTxt: {
    marginLeft: 15,
    color: Variables.Colors.white,
    fontSize: 24,
  },
  headerView: {
    position: "absolute",
    top: Variables.Measures.StatusBarHeight + 10,
    height: 55,
    width: "90%",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  carView: {
    backgroundColor: Variables.Colors.carGrey,
    width: "93%",
    alignSelf: "center",
    marginTop: 20,
    borderRadius: 10,
  },
  carImgView: {
    height: Variables.Measures.height / 2.3,
    width: "100%",
  },
  carImgStyle: {
    height: Variables.Measures.height / 3,
    width: Variables.Measures.width / 1.08,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  carNameTxt: {
    color: Variables.Colors.white,
    fontSize: 16,
  },
  carDescView: {
    flexDirection: "row",
    height: 50,
  },
  carNameView: {
    width: "50%",
    borderRightColor: Variables.Colors.carsBorderGrey,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  ratingsView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "30%",
  },
  carWidthView: {
    flex: 1,
    width: "100%",
  },
  leftWidthView: {
    width: "50%",
  },
  centerWidthView: {
    width: "30%",
  },
  ratingsTxt: {
    fontSize: 12,
    color: Variables.Colors.white,
  },
  modalContainer: {
    width: Variables.Measures.width / 1.3,
    backgroundColor: Variables.Colors.carGrey,
    position: "absolute",
    top: 20,
    right: 13,
    zIndex: 1000,
    borderRadius: 7,
  },
  modalContent: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  locationTxt: {
    color: Variables.Colors.darkYellow,
  },
  dateTxt: {
    marginLeft: 10,
    color: Variables.Colors.inputTxtColor,
    fontSize: 12,
  },
  modalView: {
    backgroundColor: Variables.Colors.blackAbsolute,
    height: "100%",
  },
  rowFlexView: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginTop: 10,
  },
  leftAbsoluteView: {
    position: "absolute",
    top: Measures.StatusBarHeight + 30,
    height: 10,
    width: 10,
    left: 20,
  },
  cityTxt: {
    fontSize: 14,
    color: Variables.Colors.chatWhite,
  },
  searchDataView: {
    flexDirection: "row",
    marginVertical: 10,
    alignItems: "center",
    width: "97%",
    alignSelf: "center",
    borderBottomColor: Variables.Colors.white,
  },
  parishesTxt: {
    fontSize: 14,
    color: Variables.Colors.darkYellow,
    marginTop: 10,
  },
  inputView: {
    backgroundColor: Variables.Colors.carGrey,
    borderBottomColor: Variables.Colors.borderGrey,
    borderBottomWidth: 1,
    paddingHorizontal: 5,
    color: Variables.Colors.white,
    height: Variables.MetricsSizes.small * 5,
  },
  searchView: {
    maxHeight: Variables.Measures.height / 1.5,
    paddingVertical: 15,
    borderBottomColor: Variables.Colors.borderGrey,
    borderBottomWidth: 1,
  },
  safeAreaStyle: {
    flex: 1,
    backgroundColor: Variables.Colors.darkBlack,
  },
});

export default ParishModal;

import React, { useState, useRef } from "react";
import { CommonStyles, FontStyle, Images, Variables } from "../Theme";
import { View, StyleSheet, StatusBar, ScrollView } from "react-native";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import { goBack, navigate } from "../navigators/RootNavigation";

import ButtonView from "../components/ButtonView";
import DropDownView from "../components/DropDownView";

import DropDownWhite from "../assets/Images/DropDownWhite.svg";
import Header from "../components/Header";
import BackSvg from "../assets/Images/BackArrow.svg";

interface CreateProfileProps {
  // onClick: (val: number) => void;
}

export interface ImageProps {
  didCancel?: string;
  errorCode?: string;
  errorMessage?: string;
  path: string;
  height?: number;
  mime?: string;
  size?: number;
  width?: number;
}

interface DropDownProps {
  label: string;
  value: string;
}

const YourCar: React.FC<CreateProfileProps> = () =>
  // { onClick }
  {
    const { t } = useTranslation();

    const [year, setYear] = useState(null);
    const [make, setMake] = useState(null);
    const [modal, setModal] = useState(null);

    const yearData = [
      { label: "2013", value: "2013" },
      { label: "2014", value: "2014" },
      { label: "2015", value: "2015" },
      { label: "2016", value: "2016" },
      { label: "2017", value: "2017" },
      { label: "2018", value: "2018" },
      { label: "2019", value: "2019" },
      { label: "2020", value: "2020" },
      { label: "2021", value: "2021" },
      { label: "2022", value: "2022" },
      { label: "2023", value: "2023" },
    ];

    const makeData = [
      { label: "Abarth", value: "Abarth" },
      { label: "Acura", value: "Acura" },
      { label: "Alfa-Romeo", value: "Alfa-Romeo" },
      { label: "Aston Martin", value: "Aston Martin" },
      { label: "Audi", value: "Audi" },
      { label: "Bentley", value: "Bentley" },
      { label: "BMW", value: "BMW" },
      { label: "Buick", value: "Buick" },
      { label: "Byd", value: "Byd" },
      { label: "Cadillac", value: "Cadillac" },
      { label: "Caterham", value: "Caterham" },
    ];

    const modalData = [
      { label: "A1", value: "A1" },
      { label: "A3", value: "A3" },
      { label: "A4 allroad", value: "A4 allroad" },
      { label: "A4 Avant", value: "A4 Avant" },
      { label: "A5", value: "A5" },
      { label: "A5 carriolot", value: "A5 carriolot" },
      { label: "A5 Sportsback", value: "A5 Sportsback" },
      { label: "A6 Allroad", value: "A6 Allroad" },
      { label: "A6 Avant", value: "A6 Avant" },
      { label: "A6 saloon", value: "A6 saloon" },
      { label: "A7", value: "A7" },
    ];

    const getYear = (val: DropDownProps) => {
      setYear(val.value);
    };

    const getMakeaData = (val: DropDownProps) => {
      setMake(val.value);
    };

    const getModal = (val: DropDownProps) => {
      setModal(val.value);
    };

    return (
      <>
        <StatusBar barStyle="light-content" />
        <SafeAreaView style={CommonStyles.safeAreaStyle}>
          <Header
            centerText={"Your cars"}
            leftSvg={<BackSvg height={25} width={25} />}
            // onLeftPress={() => onClick(21)}
          />
          <ScrollView nestedScrollEnabled>
            <View style={styles.container}>
              <View
                style={{
                  height: "100%",
                }}
              >
                <DropDownView
                  dropDownData={yearData}
                  value="Year"
                  bgcolor={Variables.Colors.greyBg}
                  font={"Urbanist-Regular"}
                  fsize={14}
                  tcolor={Variables.Colors.white}
                  itemhight={50}
                  cTextFont={"Urbanist-Regular"}
                  cTextSize={14}
                  cTextColor={Variables.Colors.locationGrey}
                  onItemSelect={(item: any) => {
                    getYear(item);
                  }}
                  dropDownSvg={<DropDownWhite />}
                  dropDownWidth={"100%"}
                  dropDownHeight={Variables.Measures.width / 1.5}
                  top={25}
                  zIndex={155}
                />
                <View style={{ height: 50 }} />
                <DropDownView
                  dropDownData={makeData}
                  value={"Make"}
                  bgcolor={Variables.Colors.greyBg}
                  font={"Urbanist-Regular"}
                  fsize={14}
                  tcolor={Variables.Colors.white}
                  itemhight={50}
                  cTextFont={"Urbanist-Regular"}
                  cTextSize={14}
                  cTextColor={Variables.Colors.inputTxtColor}
                  onItemSelect={(item: any) => {
                    getMakeaData(item);
                  }}
                  dropDownSvg={<DropDownWhite />}
                  dropDownWidth={"100%"}
                  dropDownHeight={Variables.Measures.width / 1.5}
                  top={90}
                  zIndex={5}
                />
                <View style={{ height: 90 }} />
                <DropDownView
                  dropDownData={modalData}
                  value={"Modal"}
                  bgcolor={Variables.Colors.greyBg}
                  font={"Urbanist-Regular"}
                  fsize={14}
                  tcolor={Variables.Colors.white}
                  itemhight={50}
                  cTextFont={"Urbanist-Regular"}
                  cTextSize={14}
                  cTextColor={Variables.Colors.inputTxtColor}
                  onItemSelect={(item: any) => {
                    getModal(item);
                  }}
                  dropDownSvg={<DropDownWhite />}
                  dropDownWidth={"100%"}
                  dropDownHeight={Variables.Measures.width / 1.6}
                  top={155}
                  zIndex={1}
                />
                <View
                  style={{
                    height: Variables.Measures.height / 2,
                  }}
                />
                <ButtonView
                  btnTxt={t("labelConst.continueTxt")}
                  onBtnPress={() => {
                    // onClick(23);
                  }}
                  width={Variables.Measures.width / 1.12}
                  backgroundColor={Variables.Colors.yellow}
                  fontColor={Variables.Colors.darkBlack}
                />
                <View style={{ height: 40 }} />
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  };

const styles = StyleSheet.create({
  imageHeadingTxt: {
    position: "absolute",
    top: Variables.Measures.width / 2.5,
    color: Variables.Colors.white,
    alignSelf: "center",
    fontSize: 24,
  },
  inputView: {
    width: "90%",
    backgroundColor: Variables.Colors.carGrey,
    height: 50,
    alignSelf: "center",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginTop: 10,
    color: Variables.Colors.white,
  },
  emptyInputField: {
    width: "90%",
    backgroundColor: Variables.Colors.carGrey,
    height: 50,
    alignSelf: "center",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginTop: 10,
    borderColor: Variables.Colors.darkYellow,
    borderWidth: 1,
    color: Variables.Colors.white,
  },
  inputTitleTxt: {
    color: Variables.Colors.inputTxtColor,
    fontSize: 12,
    width: "88%",
    alignSelf: "center",
  },
  headingTxt: {
    color: Variables.Colors.white,
    fontSize: 24,
    marginTop: 10,
    marginBottom: 20,
  },
  headerView: {
    width: "91%",
    alignSelf: "center",
    marginTop: 20,
  },
  subHeadingTxt: {
    color: Variables.Colors.white,
    fontSize: 12,
    lineHeight: 20,
    marginBottom: 10,
  },
  container: {
    backgroundColor: Variables.Colors.blackBg,
    marginTop: Variables.Measures.fontSize,
    flex: 1,
  },
  contentCenter: {
    alignItems: "center",
    justifyContent: "center",
  },
  numView: {
    width: "90%",
    borderWidth: 1,
    alignSelf: "center",
    justifyContent: "center",
    height: 50,
    borderRadius: 12,
    backgroundColor: Variables.Colors.greyBg,
    marginTop: 15,
    borderColor: Variables.Colors.greyBg,
    paddingLeft: 5,
  },
  inputTxt: {
    padding: -1,
    color: "white",
    marginBottom: -3,
  },
  uriImage: {
    height: Variables.Measures.fontSize * 5.5,
    width: Variables.Measures.fontSize * 6,
  },
  placeholderImage: {
    resizeMode: "contain",
    height: Variables.Measures.fontSize * 5,
  },
  imageOrangeView: {
    backgroundColor: Variables.Colors.yellow,
    height: 20,
    width: 20,
    position: "absolute",
    bottom: 5,
    right: Variables.Measures.width / 2.83,
    borderRadius: 3,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonView: {
    height: Variables.Measures.height / 3.7,
    justifyContent: "flex-end",
  },
  errorView: {
    width: "88%",
    alignSelf: "center",
    height: 30,
    marginTop: 5,
  },
  errorMes: {
    color: Variables.Colors.yellow,
    fontSize: Variables.Measures.fontSize / 1.4,
  },
  imageView: {
    width: "90%",
    height: Variables.Measures.width / 2,
    alignSelf: "center",
  },
});

export default YourCar;

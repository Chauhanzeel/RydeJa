import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Platform,
} from "react-native";
import { FontStyle, Variables } from "../../Theme";
import { useTranslation } from "react-i18next";
import Carlisting from "./Carlisting";
import HostSetting from "./HostSetting";
import Header from "../../components/Header";
import BackSvg from "../../assets/Images/BackArrow.svg";
import { Measures } from "../../Theme/variables";

interface BookingProps {
  onClick: (val: number) => void;
}

const Vehicles: React.FC<BookingProps> = ({ onClick }) => {
  const [clicked, setClicked] = useState(0);
  const { t } = useTranslation();

  return (
    <SafeAreaView style={styles.outerView}>
      <StatusBar
        backgroundColor={Variables.Colors.blackBg}
        barStyle="light-content"
        animated={true}
        translucent
      />
      {/* <Header
        centerText={"Vehicles"}
        onLeftPress={() => onClick(0)}
        leftSvg={<BackSvg height={25} width={25} />}
      /> */}
      <View style={styles.headerView}>
        <Text
          style={[
            FontStyle.urbanistBold,
            {
              fontSize: 24,
              color: Variables.Colors.white,
              textAlign: "right",
            },
          ]}
        >
          Vehicles
        </Text>
      </View>

      <View style={{ flex: 1 }}>
        <View style={styles.innerTabView}>
          <TouchableOpacity
            style={[
              styles.firstTab,
              {
                borderBottomColor:
                  clicked === 0
                    ? Variables.Colors.yellow
                    : Variables.Colors.activeTab,
              },
              { borderBottomWidth: clicked === 0 ? 2 : 1 },
            ]}
            onPress={() => setClicked(0)}
          >
            <Text
              style={[
                FontStyle.urbanistSemiBold,
                styles.tabTxt,
                {
                  color:
                    clicked === 0
                      ? Variables.Colors.yellow
                      : Variables.Colors.activeTab,
                },
              ]}
            >
              LISTINGS
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.firstTab,
              {
                borderBottomColor:
                  clicked === 1
                    ? Variables.Colors.yellow
                    : Variables.Colors.activeTab,
              },
              { borderBottomWidth: clicked === 1 ? 2 : 1 },
            ]}
            onPress={() => setClicked(1)}
          >
            <Text
              style={[
                FontStyle.urbanistSemiBold,
                styles.tabTxt,
                {
                  color:
                    clicked === 1
                      ? Variables.Colors.yellow
                      : Variables.Colors.activeTab,
                },
              ]}
            >
              HOST SETTINGS
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          {clicked === 0 && <Carlisting onClick={onClick} />}
          {clicked === 1 && <HostSetting />}
          {/* {clicked === 1 && <History />} */}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerView: {
    height: 60,
    width: "90%",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  headerTxt: {
    color: Variables.Colors.white,
    fontSize: 23,
  },
  leftHeader: {
    width: "12%",
    justifyContent: "center",
  },
  centerHeader: {
    width: "67%",
    justifyContent: "center",
  },
  rightHeader: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  alignHeaderView: {
    width: "93%",
    alignSelf: "center",
    flex: 1,
    flexDirection: "row",
  },
  innerTabView: {
    alignItems: "center",
    justifyContent: "center",
    width: Variables.Measures.width / 1.07,
    alignSelf: "center",
    flexDirection: "row",
  },
  firstTab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  tabTxt: {
    fontSize: 16,
  },
  outerView: {
    backgroundColor: Variables.Colors.blackBg,
    flex: 1,
    marginTop: Measures.StatusBarHeight,
  },
});
export default Vehicles;

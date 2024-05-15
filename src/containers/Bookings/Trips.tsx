import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { CommonStyles, FontStyle, Variables } from "../../Theme";
import Header from "../../components/Header";

import History from "./History";
import Booked from "./Booked";
import BackSvg from "../../assets/Images/BackArrow.svg";
import { Measures } from "../../Theme/variables";
import { useSelector } from "react-redux";
import { ReducerStateProps } from "../Inbox/InterfaceProps";
import _ from "lodash";
import { goBack } from "../../navigators/RootNavigation";
import { SafeAreaView } from "react-native-safe-area-context";

interface BookingProps {
  onClick?: (val: number) => void;
}

const Trips: React.FC<BookingProps> = ({ onClick }) => {
  const [clicked, setClicked] = useState(0);

  const [profileDetailsData] = useSelector((state: ReducerStateProps) => [
    state.user.profileDetailsData,
  ]);

  return (
    <SafeAreaView style={styles.outerView}>
      <StatusBar
        backgroundColor={Variables.Colors.blackBg}
        barStyle="light-content"
        animated={true}
        translucent
      />
      <Header
        centerText={"Trips"}
        leftSvg={<BackSvg height={25} width={25} />}
        onLeftPress={() => {
          {
            _.get(profileDetailsData, "verifiedInfo.role", null) ==
            "ROLE_CAR_OWNER"
              ? goBack()
              : onClick(0);
          }
        }}
      />
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
              { borderBottomWidth: clicked === 0 ? 3 : 1 },
            ]}
            onPress={() => setClicked(0)}
          >
            <Text
              style={[
                FontStyle.urbanistSemiBold,
                CommonStyles.smallCommonTxt,
                {
                  color:
                    clicked === 0
                      ? Variables.Colors.yellow
                      : Variables.Colors.activeTab,
                },
              ]}
            >
              History
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
              { borderBottomWidth: clicked === 1 ? 3 : 1 },
            ]}
            onPress={() => setClicked(1)}
          >
            <Text
              style={[
                FontStyle.urbanistSemiBold,
                CommonStyles.smallCommonTxt,
                {
                  color:
                    clicked === 1
                      ? Variables.Colors.yellow
                      : Variables.Colors.activeTab,
                },
              ]}
            >
              Booked
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: Variables.Measures.height - 70 }}>
          {clicked === 0 && <History />}
          {clicked === 1 && <Booked />}
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
    height: 50,
  },
  firstTab: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
  },
  tabTxt: {
    fontSize: 18,
  },
  outerView: {
    backgroundColor: Variables.Colors.blackBg,
    flex: 1,
    // marginTop: Measures.StatusBarHeight,
  },
});
export default Trips;

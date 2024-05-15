import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { FontStyle, Variables } from "../../Theme";
import Earnings from "./Earnings";
import Reviews from "./Reviews";
import TransactionHistory from "./TransactionHistory";
import Transactions from "./Transactions";
import { Measures } from "../../Theme/variables";

interface BookingProps {}

const Business: React.FC<BookingProps> = () => {
  const [clicked, setClicked] = useState(0);

  const onClickHandler = (value: number) => {
    setClicked(value);
  };

  return (
    <SafeAreaView style={styles.outerView}>
      <StatusBar
        backgroundColor={Variables.Colors.blackBg}
        barStyle="light-content"
        animated={true}
        translucent
      />

      {clicked === 0 || clicked === 1 ? (
        <View style={{ flex: 1 }}>
          <View style={styles.headerView}>
            <Text style={[FontStyle.urbanistBold, styles.headerTxt]}>
              Business
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
                  EARNINGS
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
                  REVIEWS
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
              {clicked === 0 && <Earnings onClick={onClickHandler} />}
              {clicked === 1 && <Reviews />}
            </View>
          </View>
        </View>
      ) : (
        <View>
          {clicked === 2 && <TransactionHistory onClick={onClickHandler} />}
          {clicked === 3 && <Transactions onClick={onClickHandler} />}
        </View>
      )}
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
    height: 50,
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
export default Business;

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { FontStyle, Variables, Images, CommonStyles } from "../Theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTranslation } from "react-i18next";

import Header from "../components/Header";

import DiscountHeader from "../assets/Images/DiscountHeader.svg";
import { goBack } from "../navigators/RootNavigation";
import { notificationDec, notificationToday } from "./MockData/notifications";

import LocationSvg from "../assets/Images/ModalIcons/NotificationLocation.svg";
import BackSvg from "../assets/Images/BackArrow.svg";

interface NotificationsProps {}
interface TodayProps {
  name: string;
  NotificationDesc: string;
  notificationImg: object | string | any;
}

const Notifications: React.FC<NotificationsProps> = () => {
  const { t } = useTranslation();

  const displayToday = (item: TodayProps) => {
    return (
      <TouchableOpacity style={styles.centerView}>
        <View style={styles.leftToday}>
          <View style={styles.yellowCircleView}>
            <View>{item.notificationImg}</View>
          </View>
        </View>
        <View style={styles.rightToday}>
          <Text style={[styles.todayName, FontStyle.urbanistBold]}>
            {item.name}
          </Text>
          <Text style={[styles.todayDescTxt, FontStyle.urbanistMedium]}>
            {item.NotificationDesc}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={CommonStyles.safeAreaStyle}>
        <Header
          centerText={t("labelConst.notification")}
          leftSvg={<BackSvg height={25} width={25} />}
          rightSvg={<DiscountHeader height={28} width={28} />}
          onLeftPress={goBack}
        />
        <ScrollView>
          <View style={styles.container}>
            <Text style={[styles.todayTxt, FontStyle.urbanistBold]}>
              {t("labelConst.todayTxt")}
            </Text>
            <FlatList
              data={notificationToday}
              renderItem={({ item }: object | any) => displayToday(item)}
            />
            <Text
              style={[
                styles.todayTxt,
                FontStyle.urbanistBold,
                { marginTop: 20 },
              ]}
            >
              {t("labelConst.yesterday")}
            </Text>
            <TouchableOpacity style={styles.centerView}>
              <View style={styles.leftToday}>
                <View style={styles.yellowCircleView}>
                  <LocationSvg />
                </View>
              </View>
              <View style={styles.rightToday}>
                <Text style={[styles.todayName, FontStyle.urbanistBold]}>
                  {t("labelConst.newService")}
                </Text>
                <Text style={[styles.todayDescTxt, FontStyle.urbanistMedium]}>
                  {t("labelConst.trackTime")}
                </Text>
              </View>
            </TouchableOpacity>
            <Text
              style={[
                styles.todayTxt,
                FontStyle.urbanistBold,
                { marginTop: 20 },
              ]}
            >
              December 22, 2024
            </Text>
            <FlatList
              data={notificationDec}
              renderItem={({ item }: object | any) => displayToday(item)}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "93%",
    alignSelf: "center",
  },
  leftToday: {
    width: "25%",
    alignItems: "center",
    justifyContent: "center",
  },
  yellowCircleView: {
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: Variables.Colors.yellow,
    alignItems: "center",
    justifyContent: "center",
  },
  todayTxt: {
    color: Variables.Colors.white,
    fontSize: Variables.Measures.fontSize / 1.12,
  },
  rightToday: {
    justifyContent: "center",
    width: "70%",
    flexWrap: "wrap",
    paddingVertical: 23,
  },
  todayName: {
    color: Variables.Colors.white,
    fontSize: Variables.Measures.fontSize / 1.15,
  },
  todayDescTxt: {
    color: Variables.Colors.locationGrey,
    lineHeight: 30,
    fontSize: Variables.Measures.fontSize / 1.5,
  },
  centerView: {
    flexDirection: "row",
    width: "97%",
    alignSelf: "center",
    backgroundColor: Variables.Colors.greyBg,
    marginTop: Variables.Measures.fontSize / 1.5,
    borderRadius: 15,
  },
});
export default Notifications;

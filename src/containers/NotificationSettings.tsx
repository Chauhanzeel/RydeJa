import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  Text,
  Modal,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { FontStyle, Variables, Layout } from "../Theme";
import { useTranslation } from "react-i18next";
import { goBack, navigate } from "../navigators/RootNavigation";
import ToggleSwitch from "toggle-switch-react-native";

import Header from "../components/Header";
import BackSvg from "../assets/Images/BackArrow.svg";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { ReducerStateProps } from "./Inbox/InterfaceProps";
import _ from "lodash";
import {
  notificationSettingsStart,
} from "../actions/userActions";

interface NotificationSettingsProps {
  // onClick: (val: number) => void;
}

const NotificationSettings: React.FC<NotificationSettingsProps> = (
  {
    // onClick,
  }
) => {
  const [isLoading, profileDetailsData] = useSelector(
    (state: ReducerStateProps) => [
      state.user.isLoading,
      state.user.profileDetailsData,
    ]
  );

  const [textNotification, setTextNotification] = useState(
    _.get(profileDetailsData, "verifiedInfo.isTextNotification", null)
  );
  const [emailNotification, setEmailNotification] = useState(
    _.get(profileDetailsData, "verifiedInfo.isEmailNotification", null)
  );
  const [refreshing, setRefreshing] = useState(false);

  const [visible, setVisible] = useState(false);

  const { t } = useTranslation();
  const dispatch = useDispatch();

  const onToggle = (isOn: boolean) => {
    setTextNotification(isOn);
  };

  useEffect(() => {
    if (isLoading) {
      setVisible(true);
    } else {
      setVisible(false);
      setRefreshing(false);
    }
  }, [isLoading]);

  const onRefresh = () => {
    setRefreshing(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor={Variables.Colors.blackBg}
        barStyle="light-content"
      />
      <Header
        centerText="Notification settings"
        leftSvg={<BackSvg height={24} width={24} />}
        onLeftPress={goBack}
      />
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        statusBarTranslucent
        onDismiss={() => {
          setVisible(false);
        }}
      >
        <View
          style={{
            flex: 1,
            width: Variables.Measures.width,
            height: Variables.Measures.height,
            backgroundColor: Variables.Colors.blackAbsolute,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" color={Variables.Colors.yellow} />
        </View>
      </Modal>
      <ScrollView
        style={{ height: "100%" }}
        // refreshControl={
        //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        // }
      >
        <View style={styles.containerView}>
          <View
            style={[
              styles.notificationView,
              { marginTop: Variables.Measures.fontSize * 2 },
            ]}
          >
            <Text style={[FontStyle.urbanistSemiBold, styles.headingTxt]}>
              {t("labelConst.mobileNotifications")}
            </Text>
          </View>
          <View style={styles.outerRowView}>
            <View style={{ width: "80%" }}>
              <Text style={[FontStyle.urbanistRegular, styles.notificationTxt]}>
                {t("labelConst.textMesNotification")}
              </Text>
            </View>
            <View
              style={{
                alignItems: "flex-end",
                flex: 1,
              }}
            >
              <ToggleSwitch
                onColor={Variables.Colors.yellow}
                offColor={Variables.Colors.borderGrey}
                isOn={textNotification}
                onToggle={(value) => {
                  setTextNotification(value);
                  dispatch(
                    notificationSettingsStart({
                      isTextNotification: value,
                      isEmailNotification: emailNotification,
                    })
                  );
                }}
              />
            </View>
          </View>
          <View style={styles.notificationView}>
            <Text style={[FontStyle.urbanistSemiBold, styles.headingTxt]}>
              {t("labelConst.emailNotification")}
            </Text>
          </View>
          <View style={styles.outerRowView}>
            <View style={{ width: "80%" }}>
              <Text style={[FontStyle.urbanistRegular, styles.notificationTxt]}>
                {t("labelConst.promotions")}
              </Text>
            </View>
            <View
              style={{
                alignItems: "flex-end",
                flex: 1,
              }}
            >
              <ToggleSwitch
                onColor={Variables.Colors.yellow}
                offColor={Variables.Colors.borderGrey}
                isOn={emailNotification}
                onToggle={(value) => {
                  setEmailNotification(value);
                  dispatch(
                    notificationSettingsStart({
                      isTextNotification: textNotification,
                      isEmailNotification: value,
                    })
                  );
                }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  outerRowView: {
    flexDirection: "row",
    marginVertical: 10,
    width: "90%",
    alignSelf: "center",
    height: 50,
    alignItems: "center",
  },
  notificationView: {
    borderBottomWidth: 1,
    borderBottomColor: Variables.Colors.carsBorderGrey,
  },
  notificationTxt: {
    color: Variables.Colors.white,
    fontSize: 12,
  },
  headingTxt: {
    color: Variables.Colors.white,
    fontSize: 14,
    width: "90%",
    alignSelf: "center",
    paddingBottom: 2,
  },
  container: {
    backgroundColor: Variables.Colors.blackBg,
    flex: 1,
  },
  containerView: {
    height: Variables.Measures.height - 100,
  },
});

export default NotificationSettings;

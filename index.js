import { name as appName } from "./app.json";
import React, { useState, useEffect } from "react";
import {
  AppRegistry,
  View,
  Text,
  TouchableOpacity,
  LogBox,
  Platform,
} from "react-native";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./src/store/store";
import Toast, { BaseToast } from "react-native-toast-message";
import { FCM_TOKEN, NOTIFICATION_CHANNEL_ID } from "./src/constants/constants";
import PushNotification, { Importance } from "react-native-push-notification";
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import messaging from "@react-native-firebase/messaging";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { openDatabase } from "react-native-sqlite-storage";
var db = openDatabase({ name: "ChatMessages.db" });
import { enableLatestRenderer } from "react-native-maps";
import { Settings } from "react-native-fbsdk-next";
import { Colors, Measures } from "./src/Theme/variables";
import { FontStyle } from "./src/Theme";

const TOPIC = "RydeJa";

const RydeJaApp = () => {
  const requestUserPermission = async () => {
    /**
     * On iOS, messaging permission must be requested by
     * the current application before messages can be
     * received or sent
     */
    const authStatus = await messaging().requestPermission();
    return (
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL
    );
  };

  useEffect(() => {
    enableLatestRenderer();
    Settings.initializeSDK();
  }, []);

  useEffect(() => {
    if (requestUserPermission()) {
      db.transaction(function (txn) {
        txn.executeSql(
          "SELECT name FROM sqlite_master WHERE type='table' AND name='chat_users'",
          [],
          function (tx, res) {
            if (res.rows.length == 0) {
              txn.executeSql("DROP TABLE IF EXISTS chat_users", []);
              txn.executeSql(
                "CREATE TABLE IF NOT EXISTS chat_users(chat_id VARCHAR(20), chat_messages VARCHAR)",
                []
              );
            }
          }
        );
      });

      PushNotification.createChannel(
        {
          channelId: NOTIFICATION_CHANNEL_ID, // (required)
          channelName: "RydeJa", // (required)
          importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
          playSound: true, // (optional) default: true
          vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
        },
        (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
      );
      /**
       * Returns an FCM token for this device
       */
      messaging()
        .getToken()
        .then((fcmToken) => {
          console.log("FCM =>", fcmToken);
          AsyncStorage.setItem(FCM_TOKEN, fcmToken);
        })
        .catch((error) => {
          let err = `FCm token get error${error}`;
          console.log(err);
        });
    } else {
      console.log("Not Authorization status:", authStatus);
    }

    /**
     * When a notification from FCM has triggered the application
     * to open from a quit state, this method will return a
     * `RemoteMessage` containing the notification data, or
     * `null` if the app was opened via another method.
     */
    messaging()
      .getInitialNotification()
      .then(async (remoteMessage) => {
        if (remoteMessage) {
          // console.log(
          //   'getInitialNotification:' +
          //   'Notification caused app to open from quit state',
          // );
          // console.log('getInitialNotification: ' + JSON.stringify(remoteMessage));
          // alert(
          //   'getInitialNotification: Notification caused app to' +
          //   ' open from quit state',
          // );
        }
      });
    /**
     * When the user presses a notification displayed via FCM,
     * this listener will be called if the app has opened from
     * a background state. See `getInitialNotification` to see
     * how to watch for when a notification opens the app from
     * a quit state.
     */
    messaging().onNotificationOpenedApp(async (remoteMessage) => {
      if (remoteMessage) {
        // console.log('onNotificationOpenedApp: ' + JSON.stringify(remoteMessage));
        console.log(remoteMessage);
        // alert(
        //   'onNotificationOpenedApp: Notification caused app to' +
        //   ' open from background state',
        // );
      }
    });

    /**
     * Set a message handler function which is called when
     * the app is in the background or terminated. In Android,
     * a headless task is created, allowing you to access the
     * React Native environment to perform tasks such as updating
     * local storage, or sending a network request.
     */
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      // console.log(
      //   'Message handled in the background!',
      //   remoteMessage
      // );
    });

    /**
     * When any FCM payload is received, the listener callback
     * is called with a `RemoteMessage`. Returns an unsubscribe
     * function to stop listening for new messages.
     */
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      if (Platform.OS === "ios") {
        PushNotificationIOS.addNotificationRequest({
          id: _.get(remoteMessage, "messageId", null),
          body: _.get(remoteMessage, "notification.body", null),
          title: _.get(remoteMessage, "notification.title", null),
          userInfo: _.get(remoteMessage, "data", null),
        });
      } else {
        console.log(
          "Notification remotemessage:",
          JSON.stringify(remoteMessage)
        );

        PushNotification.localNotification({
          channelId: NOTIFICATION_CHANNEL_ID,
          message: _.get(remoteMessage, "notification.body", null),
          title: _.get(remoteMessage, "notification.title", null),
          smallIcon: _.get(remoteMessage, "data.app_icon_url", null),
        });
      }
    });

    /**
     * Apps can subscribe to a topic, which allows the FCM
     * server to send targeted messages to only those devices
     * subscribed to that topic.
     */
    messaging()
      .subscribeToTopic(TOPIC)
      .then(() => {
        // console.log(`Topic: ${TOPIC} Suscribed`);
      });

    // LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
    LogBox.ignoreAllLogs(); //Ignore all log notifications

    return () => {
      unsubscribe;
      /**
       * Unsubscribe the device from a topic.
       */
      // messaging().unsubscribeFromTopic(TOPIC);
    };
  }, []);

  return (
    <Provider store={store}>
      <App />
      <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => RydeJaApp);

const toastConfig = {
  /* 
    overwrite 'success' type, 
    modifying the existing `BaseToast` component
  */
  success: ({ text1, props, ...rest }) => (
    <BaseToast
      {...rest}
      style={{ borderLeftColor: Colors.red, backgroundColor: Colors.toastBg }}
      contentContainerStyle={{
        paddingHorizontal: 15,
        backgroundColor: Colors.toastBg,
      }}
      text1Style={{
        fontSize: Measures.fontSize - 5,
        fontWeight: "400",
      }}
      text2Style={{
        fontSize: Measures.fontSize - 5,
        fontWeight: "400",
      }}
      text1={text1}
      text2={props.uuid}
    />
  ),

  /* 
    or create a completely new type - `my_custom_type`,
    building the layout from scratch
  */
  internet: ({ text1, props, ...rest }) => (
    <View
      style={{
        minHeight: Measures.fontSize * 3,
        width: "90%",
        backgroundColor: Colors.toastBg,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        borderLeftWidth: 3,
        borderColor: Colors.red,
        padding: 5,
      }}
    >
      <Text
        style={[
          {
            color: Colors.white,
            textAlign: "center",
            width: "100%",
          },
          FontStyle.urbanistBold,
        ]}
      >
        {text1}
      </Text>
    </View>
  ),
  error: ({ text1, props, ...rest }) => (
    <View
      style={{
        minHeight: Measures.fontSize * 3,
        width: "90%",
        backgroundColor: Colors.toastBg,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        borderLeftWidth: 3,
        borderColor: Colors.red,
        padding: 5,
      }}
    >
      <Text
        style={[
          {
            color: Colors.white,
            textAlign: "left",
            width: "100%",
          },
          FontStyle.urbanistBold,
        ]}
      >
        {text1}
      </Text>
    </View>
  ),
  success: ({ text1, props, ...rest }) => (
    <View
      style={{
        minHeight: Measures.fontSize * 3,
        width: "90%",
        backgroundColor: Colors.toastBg,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5,
        borderLeftWidth: 3,
        borderColor: Colors.yellow,
        padding: 5,
      }}
    >
      <Text
        style={[
          {
            color: Colors.white,
            textAlign: "left",
            width: "90%",
          },
          FontStyle.urbanistBold,
        ]}
      >
        {text1}
      </Text>
    </View>
  ),
};

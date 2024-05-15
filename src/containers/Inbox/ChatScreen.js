import React, { useState, useEffect } from "react";
import {
  StatusBar,
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
  Linking,
  PermissionsAndroid,
  RefreshControl,
  Modal,
} from "react-native";
import { check, PERMISSIONS, request, RESULTS } from "react-native-permissions";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontStyle, Variables } from "../../Theme";
import { useTranslation } from "react-i18next";
import ImagePicker from "react-native-image-crop-picker";

import { RouteProp } from "@react-navigation/native";
import { goBack, navigate, replace } from "../../navigators/RootNavigation";
import { useDispatch, useSelector } from "react-redux";

import SocketServices from "../../utils/socketServices";
import ChatMessages from "../../components/ChatMessages";

import GallaryGreySvg from "../../assets/Images/Chat/GallaryGrey.svg";
import VoiceSvg from "../../assets/Images/Chat/MicroPhone.svg";
import SendArrowSvg from "../../assets/Images/SendArrow.svg";
import BackSvg from "../../assets/Images/BackArrow.svg";
import CallWhiteSvg from "../../assets/Images/CallWhite.svg";
import DiscountHeader from "../../assets/Images/DiscountHeader.svg";
import DiscountHeaderYellow from "../../assets/Images/DiscountHeaderYellow.svg";

import ContentLoader, { Rect, Circle } from "react-content-loader/native";
import { ReducerStateProps } from "./InterfaceProps";
import _ from "lodash";
import {
  chathistoryStart,
  chathistorySuccess,
  chatMessageSendStart,
  chatMessageSendSuccess,
  navtabScreen,
} from "../../actions/userActions";
import { Colors, Measures } from "../../Theme/variables";
import { chatStart } from "../../actions/authActions";
import { URL, URLSearchParams } from "react-native-url-polyfill";
import { MeruceBaseUri } from "../../constants/constants";
import { EventSource } from "../../eventSource/RNEventSource";
import DashedLine from "react-native-dashed-line";

import { openDatabase } from "react-native-sqlite-storage";
import { blockCustomerStart } from "../../actions/carOwnerActions";
import moment from "moment";
var db = openDatabase({ name: "ChatMessages.db" });

const Chat = ({ route }) => {
  const userData = _.get(route, "params.userData", null);
  const name = _.get(userData, "fullName", null)
    ? userData?.fullName
    : _.get(userData, "contactOwner", null)
    ? userData?.contactOwner?.fullName
    : userData?.contactCustomer?.fullName;

  const recId = _.get(userData, "userId", null)
    ? userData?.userId
    : _.get(userData, "contactOwner", null)
    ? userData?.contactOwner?.id
    : userData?.contactCustomer?.id;

  const phoneNo = _.get(userData, "phoneNumber", null)
    ? userData?.phoneNumber
    : _.get(userData, "contactOwner", null)
    ? userData?.contactOwner?.phoneNumber
    : userData?.contactCustomer?.phoneNumber;

  const profilePicture = _.get(userData, "profilePicture", null)
    ? userData?.profilePicture
    : _.get(userData, "contactOwner", null)
    ? userData?.contactOwner?.profilePicture
    : userData?.contactCustomer?.profilePicture;

  const [
    isLoadingOwner,
    chatHistoryData,
    sendChatData,
    chatData,
    profileDetailsData,
    isLoading,
    storeData,
    blockCustomerData,
  ] = useSelector((state) => [
    state?.carOwner?.isLoading,
    state?.user?.chatHistoryData,
    state?.user?.sendChatData,
    state?.auth?.chatData,
    state?.user?.profileDetailsData,
    state?.user?.isLoading,
    state?.user?.storeData,
    state?.carOwner?.blockCustomerData,
  ]);

  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [typingText, setTypingText] = useState("");
  const [mesEmpty, setMesEmpty] = useState(false);
  const [firstTime, setFirstTime] = useState(false);
  const [messagesData, setMessagesData] = useState(
    _.get(chatHistoryData, "items", null) || []
  );
  const [chatSettings, setChatSettings] = useState(false);
  const [visible, setVisible] = useState(
    _.get(userData, "contactCustomer.statusIsBlock", false) ||
      _.get(userData, "statusIsBlock", false)
  );

  useEffect(() => {
    const param = {
      toUser: recId,
    };
    dispatch(chathistoryStart(param));
    getData();
    return () => {
      setMessagesData([]);
      dispatch(chathistorySuccess(null));
    };
  }, []); //<= remove sendChatData

  // useEffect(() => {
  //   _.remove(messagesData, { removeId: -1 });
  //   setMessagesData(_.get(chatHistoryData, "items", null));
  // }, [_.size(_.get(chatHistoryData, "items", null))]);

  useEffect(() => {
    if (_.get(chatHistoryData, "items", null)) {
      setMessagesData(_.get(chatHistoryData, "items", null));
      setFirstTime(false);
      deleteChat(recId);
      insertChat(recId, _.get(chatHistoryData, "items", null));
    }
  }, [chatHistoryData]);

  const checkSearch = (val) => {
    if (!val) {
      setMesEmpty(false);
      setTypingText(val);
    } else {
      setMesEmpty(true);
      setTypingText(val);
    }
  };

  useEffect(() => {
    try {
      const url = new URL(MeruceBaseUri);
      url.searchParams.append(
        "topic",
        "send-message-" + _.get(profileDetailsData, "verifiedInfo.id", null)
      );
      const eventSource = new EventSource(url);

      eventSource.addEventListener("open", (event) => {
        console.log("Open SSE connection.");
      });

      eventSource.addEventListener("message", (event) => {
        console.log("New message event:", event.data);
      });

      eventSource.addEventListener("error", (event) => {
        if (event.type === "error") {
          console.error("Connection error:", event.message);
        } else if (event.type === "exception") {
          console.error("Error:", event.message, event.error);
        }
      });

      eventSource.addEventListener("close", (event) => {
        console.log("Close SSE connection.");
      });

      eventSource.onmessage = (e) => {
        setMessagesData((messagesData) =>
          _.size(messagesData) > 0
            ? [JSON.parse(e.data), ...messagesData]
            : [JSON.parse(e.data)]
        );
        updateChat(
          console.log("data", e.data),
          recId,
          _.size(messagesData) > 0
            ? [JSON.parse(e.data), ...messagesData]
            : [JSON.parse(e.data)]
        );
      };
      return () => {
        eventSource.close();
      };
    } catch (error) {
      console.log(error);
    }
  }, [_.size(messagesData)]);

  const sendMessage = (typingText) => {
    if (typingText && _.size(typingText) > 0) {
      let params = {
        receiver: recId,
        message: typingText,
      };
      const tempMsg = {
        message: typingText,
        removeId: -1,
        receiver: {
          id: recId,
          fullName: name,
          phoneNumber: phoneNo,
          profilePicture: profilePicture,
        },
        tempMgs: false,
        sendDateTime: new Date(),
        sender_id: _.get(profileDetailsData, "verifiedInfo.id", null),
      };
      var newStatuses =
        _.size(messagesData) > 0 ? [tempMsg, ...messagesData] : [tempMsg];

      setMessagesData(newStatuses);
      updateChat(recId, newStatuses);
      dispatch(chatMessageSendStart(params));
      setMesEmpty(false);
      setTypingText(null);
    }
  };

  const insertChat = (key, chatData) => {
    try {
      db.transaction(function (tx) {
        tx.executeSql(
          "INSERT INTO chat_users (chat_id, chat_messages) VALUES (?,?)",
          [key, JSON.stringify(chatData)],
          (tx, results) => {
            if (results.rowsAffected > 0) {
              console.log("You are Insert Successfully");
            } else {
              console.log("Registration Failed");
            }
          }
        );
      });
    } catch (e) {
      console.log("error storing data");
      console.log(e);
    }
  };

  const updateChat = (key, chatData) => {
    try {
      db.transaction(function (tx) {
        tx.executeSql(
          "UPDATE chat_users set chat_messages=? where chat_id=?",
          [JSON.stringify(chatData), key],
          (tx, results) => {
            if (results.rowsAffected > 0) {
              console.log("User updated successfully");
            } else {
              console.log("Updation Failed");
            }
          }
        );
      });
    } catch (e) {
      console.log("error storing data");
      console.log(e);
    }
  };

  const deleteChat = (recId) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM  chat_users where chat_id=?",
        [recId],
        (tx, results) => {
          if (results.rowsAffected > 0) {
            console.log("User deleted successfully");
          } else {
            console.log("Please insert a valid User Id");
          }
        }
      );
    });
  };

  const getData = async () => {
    try {
      db.transaction((tx) => {
        tx.executeSql(
          "SELECT * FROM chat_users where chat_id = ?",
          [recId],
          (tx, results) => {
            var len = results.rows.length;
            if (len > 0) {
              let res = results.rows.item(0);
              if (res) {
                let datalist = [];
                datalist = JSON.parse(res.chat_messages);
                console.log(datalist);
                if (datalist?.length != 0) {
                  setMessagesData(datalist);
                }
              }
            } else {
              setFirstTime(true);
              console.log("No user found");
            }
          }
        );
      });
    } catch (e) {}
  };

  const HeaderView = () => {
    return (
      <View style={styles.headerView}>
        <View style={styles.alignHeaderView}>
          <TouchableOpacity
            style={styles.leftHeader}
            onPress={() => {
              dispatch(chatMessageSendSuccess(null));
              if (route?.params?.status == true) {
                navigate("TabNavigations", { navigationform: 2 });
              } else {
                goBack();
              }
            }}
          >
            <BackSvg height={25} width={25} />
          </TouchableOpacity>
          <View style={styles.centerHeader}>
            <Text
              numberOfLines={1}
              style={[styles.headerTxt, FontStyle.urbanistBold]}
            >
              {name}
            </Text>
          </View>
          <View style={styles.rightHeader}>
            <TouchableOpacity
              onPress={() =>
                // navigate("Call", {
                //   recId: recId,
                //   name: name,
                //   profilePicture: profilePicture,
                // })
                openDialer(phoneNo)
              }
            >
              <CallWhiteSvg />
            </TouchableOpacity>
            {_.get(profileDetailsData, "verifiedInfo.role", null) ==
              "ROLE_CAR_OWNER" && (
              <TouchableOpacity
                style={{ marginLeft: 10 }}
                onPress={() => setChatSettings(!chatSettings)}
              >
                {chatSettings ? <DiscountHeaderYellow /> : <DiscountHeader />}
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  };

  const LoadingView = () => {
    return (
      <SafeAreaView
        style={{ flex: 1, backgroundColor: Variables.Colors.darkBlack }}
      >
        <StatusBar
          backgroundColor={Variables.Colors.blackBg}
          barStyle="light-content"
        />
        <View style={{ flex: 1, alignItems: "flex-end" }}>
          <ContentLoader
            backgroundColor={Variables.Colors.absoluteBgGrey}
            foregroundColor={Variables.Colors.grey}
            height={Variables.Measures.height / 8}
            width={Variables.Measures.width}
          >
            <Rect x="15" y="20" rx="4" ry="4" width="40" height="40" />
            <Rect x="70" y="20" rx="4" ry="4" width="100" height="40" />
            <Rect x="360" y="20" rx="4" ry="4" width="40" height="40" />
          </ContentLoader>
          <View style={{ marginTop: 50 }}></View>
          <ContentLoader
            backgroundColor={Variables.Colors.absoluteBgGrey}
            foregroundColor={Variables.Colors.grey}
            width={Variables.Measures.width}
            height={Variables.Measures.height / 3}
          >
            <Rect x="50%" y="0" rx="4" ry="4" width="48%" height="40" />
            <Rect x="10" y="60" rx="4" ry="4" width="30%" height="40" />
            <Rect x="10" y="120" rx="4" ry="4" width="40%" height="40" />
            <Rect x="62%" y="180" rx="4" ry="4" width="35%" height="40" />
          </ContentLoader>

          <ContentLoader
            backgroundColor={Variables.Colors.absoluteBgGrey}
            foregroundColor={Variables.Colors.grey}
            width={Variables.Measures.width}
            height={Variables.Measures.height / 2}
          >
            <Rect
              x="10"
              y={Variables.Measures.width / 1.8}
              rx="4"
              ry="4"
              width="70%"
              height="50"
            />

            <Rect
              x="77%"
              y={Variables.Measures.width / 1.8}
              rx="4"
              ry="4"
              width="20%"
              height="50"
            />
          </ContentLoader>
        </View>
      </SafeAreaView>
    );
  };

  const openDialer = async (phoneNumber) => {
    const dialerUrl = `tel:${phoneNumber}`;

    if (Platform.OS === "android") {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CALL_PHONE,
        {
          title: "Phone Call Permission",
          message: "This app needs access to make phone calls.",
          buttonPositive: "Allow",
          buttonNegative: "Deny",
        }
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Linking.openURL(dialerUrl);
      } else {
        // Handle the case when the user denies the permission
        console.log("Phone call permission denied");
      }
    } else if (Platform.OS === "ios") {
      Linking.openURL(`tel:${dialerUrl}`);
    }
  };

  return firstTime ? (
    <LoadingView />
  ) : (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: Variables.Colors.darkBlack }}
    >
      <StatusBar barStyle="light-content" />
      <Modal
        animationType="slide"
        transparent={true}
        visible={chatSettings}
        onRequestClose={() => setChatSettings(!chatSettings)}
      >
        <TouchableOpacity
          style={styles.containerStyle}
          onPress={() => {
            setChatSettings(!chatSettings);
          }}
        >
          <View style={styles.modalView}>
            <DashedLine
              dashLength={2}
              dashColor={Variables.Colors.inputTxtColor}
              dashThickness={0.5}
            />
            <View
              style={{
                paddingHorizontal: 20,
              }}
            >
              {/* <TouchableOpacity
                onPress={() => {
                  setChatSettings(!chatSettings), setClicked(2);
                }}
              >
                <Text style={[styles.headerText, FontStyle.urbanistMedium]}>
                  View Contacts
                </Text>
              </TouchableOpacity>
             <TouchableOpacity>
                <Text
                  style={[
                    styles.headerText,
                    FontStyle.urbanistMedium,
                    { marginVertical: 20 },
                  ]}
                >
                  Report
                </Text>
              </TouchableOpacity> */}
              <TouchableOpacity
                onPress={() => {
                  setChatSettings(!chatSettings);
                  setVisible(!visible);
                  dispatch(
                    blockCustomerStart({
                      customer: recId,
                      isBlocked: !visible ? true : false,
                    })
                  );
                }}
              >
                <Text
                  style={[
                    styles.headerText,
                    FontStyle.urbanistMedium,
                    { marginVertical: 20 },
                  ]}
                >
                  {!visible ? "Block" : "UnBlock"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "android" ? 35 : 0}
        style={styles.container}
      >
        <HeaderView />
        <View style={{ flex: 1 }}>
          <FlatList
            data={messagesData}
            inverted
            initialNumToRender={15}
            removeClippedSubviews={true}
            maxToRenderPerBatch={15}
            renderItem={({ item }) => {
              return <ChatMessages chatData={item} />;
              // itemUser={item.user}
              // user={user}
            }}
            keyExtractor={(item) => item.id}
          />
        </View>
        {visible &&
          _.get(profileDetailsData, "verifiedInfo.role", null) ==
            "ROLE_CAR_OWNER" && (
            <View style={styles.outerInputView1}>
              <TouchableOpacity
                onPress={() => {
                  setVisible(!visible);
                  dispatch(
                    blockCustomerStart({
                      customer: recId,
                      isBlocked: false,
                    })
                  );
                }}
              >
                <Text style={styles.textInputView1}>
                  You blocked this contact. Tap to unblock.
                </Text>
              </TouchableOpacity>
            </View>
          )}

        {!visible && (
          <View style={styles.outerInputView}>
            <View style={[mesEmpty ? styles.yellowView : styles.inputView]}>
              <TextInput
                placeholder={t("labelConst.messages")}
                placeholderTextColor={Variables.Colors.inputTxtColor}
                returnKeyType={"send"}
                value={typingText}
                // blurOnSubmit={false}
                style={styles.textInputView}
                onChangeText={(val) => checkSearch(val)}
                onSubmitEditing={() => sendMessage(typingText)}
              />
              {/* <TouchableOpacity
                style={styles.galleryView}
                onPress={() => pickFromCamera("camera")}
              >
                <View>
                  {mesEmpty ? <GallaryYellowSvg /> : <GallaryGreySvg />}
                </View>
              </TouchableOpacity> */}
            </View>
            <TouchableOpacity
              style={styles.voiceView}
              onPress={() => {
                sendMessage(typingText);
              }}
            >
              <View style={styles.yellowSquareView}>
                <SendArrowSvg height={25} />
              </View>
            </TouchableOpacity>
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Chat;

const styles = StyleSheet.create({
  headerText: {
    justifyContent: "center",
    fontSize: Variables.Measures.fontSize / 1.5,
    color: Variables.Colors.white,
  },
  modalView: {
    width: "30%",
    borderRadius: 7,
    backgroundColor: Variables.Colors.greyBg,
    position: "absolute",
    right: 5,
    top: 50,
    paddingVertical: 20,
  },
  containerStyle: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(13, 13, 13, 0.5)",
    // marginTop: 50,
    height: Variables.Measures.height,
  },
  outerInputView: {
    width: "93%",
    alignSelf: "center",
    flexDirection: "row",
    minHeight: 55,
    marginVertical: 10,
  },
  outerInputView1: {
    width: "93%",
    alignSelf: "center",
    flexDirection: "row",
    minHeight: 55,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: Colors.darkBlack,
  },
  inputView: {
    backgroundColor: Variables.Colors.greyBg,
    width: "82%",
    borderRadius: 10,
    // flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  textInputView: {
    // width: "80%",
    width: "100%",
    paddingLeft: 14,
    paddingRight: 5,
    color: Variables.Colors.white,
  },
  textInputView1: {
    // width: "80%",
    width: "100%",
    paddingLeft: 14,
    paddingRight: 5,
    color: Variables.Colors.inputTxtColor,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
  },
  galleryView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  yellowRoundView: {
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: Variables.Colors.yellow,
    alignItems: "center",
    justifyContent: "center",
  },
  yellowSquareView: {
    height: 50,
    width: 50,
    borderRadius: 10,
    backgroundColor: Variables.Colors.yellow,
    alignItems: "center",
    justifyContent: "center",
  },
  headerView: {
    height: 55,
  },
  leftHeader: {
    width: "10%",
    justifyContent: "center",
  },
  centerHeader: {
    width: "75%",
    justifyContent: "center",
  },
  headerTxt: {
    color: Variables.Colors.white,
    fontSize: Measures.fontSize * 1.0,
  },
  rightHeader: {
    width: "15%",
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
  voiceView: {
    flex: 1,
    alignItems: "flex-end",
    justifyContent: "center",
  },
  yellowView: {
    backgroundColor: Variables.Colors.chatGrey,
    width: "82%",
    borderRadius: 10,
    // flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Variables.Colors.yellow,
  },
});

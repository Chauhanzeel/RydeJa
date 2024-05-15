import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Modal,
  TextInput,
  SafeAreaView,
  Platform,
  ScrollView,
  RefreshControl,
} from "react-native";
import { FontStyle, Layout, Variables } from "../../Theme";
import { useTranslation } from "react-i18next";

import DiscountHeader from "../../assets/Images/DiscountHeader.svg";
import DiscountHeaderYellow from "../../assets/Images/DiscountHeaderYellow.svg";
import SearchGrey from "../../assets/Images/Searchwhite.svg";
import SearchYellow from "../../assets/Images/SearchYellow.svg";
import BackSvg from "../../assets/Images/ProfileLeft.svg";

import CallList from "./CallList";
import ChatList from "../Inbox/ChatList";
import { goBack, navigate } from "../../navigators/RootNavigation";
import SelectContact from "./SelectContact";

import DashedLine from "react-native-dashed-line";
import SearchContact from "./SearchContact";

import { useDispatch, useSelector } from "react-redux";
import { customerContactListStart } from "../../actions/customerActions";
import { ReducerStateProps } from "./InterfaceProps";
import _ from "lodash";
import { useIsFocused } from "@react-navigation/native";
import ContentLoader, { Rect, Circle } from "react-content-loader/native";
import { Measures } from "../../Theme/variables";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface BookingProps {
  onClick: (val: number) => void;
}

const Inbox: React.FC<BookingProps> = ({ onClick }) => {
  // const [chatMesData] = useSelector((state: { auth: { chatRooms: any } }) => [
  //   state.auth.chatRooms,
  // ]);

  const [clicked, setClicked] = useState(0);
  const [chatSettings, setChatSettings] = useState(false);
  const [searchContact, setSearchContact] = useState(false);

  const [data, setData] = useState([]);
  const [search, setSearch] = useState(null);
  const [serachedLength, setSearchedLength] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const { t } = useTranslation();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const [isLoading, customerContactListData, loginData, profileDetailsData] =
    useSelector((state: ReducerStateProps) => [
      state.customer.isLoading,
      state.customer.customerContactListData,
      state.auth.loginData,
      state.user.profileDetailsData,
    ]);

  useEffect(() => {
    if (isFocused && loginData) {
      dispatch(customerContactListStart());
    }
  }, [isFocused, loginData]);

  const onClickHandler = (value: number, val?: number) => {
    setClicked(value);
  };

  useEffect(() => {
    if (!isLoading) {
      setRefreshing(false);
    }
  }, [isLoading]);

  const onRefresh = () => {
    dispatch(customerContactListStart());
    setRefreshing(true);
  };

  const handleSearch = (text: string) => {
    let newData =
      _.get(profileDetailsData, "verifiedInfo.role", null) == "ROLE_CUSTOMER"
        ? customerContactListData?.items?.filter((item: any) => {
            const itemData = `${item?.contactOwner?.fullName?.toUpperCase()}`;
            const textData = text.toUpperCase();
            if (text.length > 0) {
              return itemData.indexOf(textData) > -1;
            }
          })
        : customerContactListData?.items?.filter((item: any) => {
            const itemData = `${item?.contactCustomer?.fullName?.toUpperCase()}`;
            const textData = text.toUpperCase();
            if (text.length > 0) {
              return itemData.indexOf(textData) > -1;
            }
          });
    if (_.size(text) > 0) {
      setData(newData);
      setSearch(text);
      setSearchedLength(_.size(newData));
    } else {
      setSearch("");
      setSearchedLength(0);
      setData(null);
    }
  };

  const HeaderView = () => {
    return (
      <View style={styles.headerView}>
        <View style={styles.alignHeaderView}>
          <TouchableOpacity
            style={[styles.leftHeader]}
            onPress={() => (clicked > 0 ? setClicked(0) : onClick(0))}
          >
            <BackSvg />
          </TouchableOpacity>
          {!searchContact ? (
            <View style={styles.centerHeader}>
              <Text style={[styles.headerTxt, FontStyle.urbanistBold]}>
                {chatSettings
                  ? "Settings"
                  : clicked === 0 || clicked === 1
                  ? "Inbox"
                  : "Select contact"}
              </Text>
              {clicked === 2 && !chatSettings && (
                <Text style={[FontStyle.urbanistSemiBold, styles.contactsTxt]}>
                  {_.get(customerContactListData, "totalCount") > 0
                    ? _.get(customerContactListData, "totalCount", null) +
                      " contacts"
                    : "0 contacts"}
                </Text>
              )}
            </View>
          ) : (
            <View style={styles.centerSearchchHeader}>
              <Text style={[styles.headerTxt, FontStyle.urbanistBold]}>
                Search
              </Text>
              <View>
                <TextInput
                  style={styles.placeholder}
                  placeholder={"Search name ..."}
                  placeholderTextColor={Variables.Colors.white}
                  value={search}
                  onChangeText={(val) => handleSearch(val)}
                />
              </View>
            </View>
          )}
          <View style={styles.rightHeader}>
            <TouchableOpacity
              onPress={() => {
                {
                  setSearchContact(!searchContact), setClicked(3);
                }
              }}
            >
              {searchContact ? <SearchYellow /> : <SearchGrey />}
            </TouchableOpacity>
            <TouchableOpacity
              style={{ marginLeft: 10 }}
              onPress={() => {
                setChatSettings(!chatSettings), setClicked(4);
              }}
            >
              {chatSettings ? <DiscountHeaderYellow /> : <DiscountHeader />}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const LoadingView = () => {
    return (
      <ScrollView
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Variables.Colors.white}
          />
        }
      >
        <ContentLoader
          backgroundColor={Variables.Colors.absoluteBgGrey}
          foregroundColor={Variables.Colors.grey}
          height="65"
          width={Variables.Measures.width}
        >
          <Rect x="15" y="20" rx="4" ry="4" width="30" height="30" />
          <Rect x="60" y="20" rx="4" ry="4" width="100" height="30" />
          <Rect
            x={Variables.Measures.width / 1.35}
            y="20"
            rx="4"
            ry="4"
            width="30"
            height="30"
          />
          <Rect
            x={Variables.Measures.width / 1.17}
            y="20"
            rx="4"
            ry="4"
            width="30"
            height="30"
          />
        </ContentLoader>

        <ContentLoader
          backgroundColor={Variables.Colors.absoluteBgGrey}
          foregroundColor={Variables.Colors.grey}
          width={Variables.Measures.width}
          height={80}
        >
          <Rect
            x="15"
            y="10"
            rx="4"
            ry="4"
            width={Variables.Measures.width / 5}
            height="65"
          />
          <Rect
            x={Variables.Measures.width / 3.5}
            y="20"
            rx="4"
            ry="4"
            width={Variables.Measures.width / 3.5}
            height="15"
          />
          <Rect
            x={Variables.Measures.width / 3.5}
            y="50"
            rx="4"
            ry="4"
            width={Variables.Measures.width / 3.5}
            height="15"
          />

          <Circle cx={Variables.Measures.width / 1.13} cy="30" r="15" />
          <Rect
            x={Variables.Measures.width / 1.2}
            y="55"
            rx="4"
            ry="4"
            width="40"
            height="15"
          />
        </ContentLoader>

        <ContentLoader
          backgroundColor={Variables.Colors.absoluteBgGrey}
          foregroundColor={Variables.Colors.grey}
          width={Variables.Measures.width}
          height={80}
        >
          <Rect
            x="15"
            y="10"
            rx="4"
            ry="4"
            width={Variables.Measures.width / 5}
            height="65"
          />
          <Rect
            x={Variables.Measures.width / 3.5}
            y="20"
            rx="4"
            ry="4"
            width={Variables.Measures.width / 3.5}
            height="15"
          />
          <Rect
            x={Variables.Measures.width / 3.5}
            y="50"
            rx="4"
            ry="4"
            width={Variables.Measures.width / 3.5}
            height="15"
          />

          <Circle cx={Variables.Measures.width / 1.13} cy="30" r="15" />
          <Rect
            x={Variables.Measures.width / 1.2}
            y="55"
            rx="4"
            ry="4"
            width="40"
            height="15"
          />
        </ContentLoader>

        <ContentLoader
          backgroundColor={Variables.Colors.absoluteBgGrey}
          foregroundColor={Variables.Colors.grey}
          width={Variables.Measures.width}
          height={80}
        >
          <Rect
            x="15"
            y="10"
            rx="4"
            ry="4"
            width={Variables.Measures.width / 5}
            height="65"
          />
          <Rect
            x={Variables.Measures.width / 3.5}
            y="20"
            rx="4"
            ry="4"
            width={Variables.Measures.width / 3.5}
            height="15"
          />
          <Rect
            x={Variables.Measures.width / 3.5}
            y="50"
            rx="4"
            ry="4"
            width={Variables.Measures.width / 3.5}
            height="15"
          />

          <Circle cx={Variables.Measures.width / 1.13} cy="30" r="15" />
          <Rect
            x={Variables.Measures.width / 1.2}
            y="55"
            rx="4"
            ry="4"
            width="40"
            height="15"
          />
        </ContentLoader>

        <ContentLoader
          backgroundColor={Variables.Colors.absoluteBgGrey}
          foregroundColor={Variables.Colors.grey}
          width={Variables.Measures.width}
          height={80}
        >
          <Rect
            x="15"
            y="10"
            rx="4"
            ry="4"
            width={Variables.Measures.width / 5}
            height="65"
          />
          <Rect
            x={Variables.Measures.width / 3.5}
            y="20"
            rx="4"
            ry="4"
            width={Variables.Measures.width / 3.5}
            height="15"
          />
          <Rect
            x={Variables.Measures.width / 3.5}
            y="50"
            rx="4"
            ry="4"
            width={Variables.Measures.width / 3.5}
            height="15"
          />

          <Circle cx={Variables.Measures.width / 1.13} cy="30" r="15" />
          <Rect
            x={Variables.Measures.width / 1.2}
            y="55"
            rx="4"
            ry="4"
            width="40"
            height="15"
          />
        </ContentLoader>
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.outerView}>
      <StatusBar
        backgroundColor={Variables.Colors.blackBg}
        barStyle="light-content"
        animated={true}
        translucent
      />
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
                padding: 20,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setChatSettings(!chatSettings), setClicked(2);
                }}
              >
                <Text style={[styles.headerText, FontStyle.urbanistMedium]}>
                  View Contacts
                </Text>
              </TouchableOpacity>
              {/* <TouchableOpacity>
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
              {/* {_.get(profileDetailsData, "verifiedInfo.role", null) ==
                "ROLE_CAR_OWNER" && (
                <TouchableOpacity>
                  <Text
                    style={[
                      styles.headerText,
                      FontStyle.urbanistMedium,
                      { marginVertical: 20 },
                    ]}
                  >
                    Blocked Contacts
                  </Text>
                </TouchableOpacity>
              )} */}
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
      <View style={{ flex: 1 }}>
        <HeaderView />
        <View
          style={{
            flex: 1,
          }}
        >
          {(clicked === 0 || clicked === 1) && (
            <View
              style={{
                flex: 1,
                backgroundColor: Variables.Colors.blackBg,
              }}
            >
              {/* <View style={styles.innerTabView}>
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
                      CHAT
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
                      CALLS
                    </Text>
                  </TouchableOpacity>
                </View> */}
              <View style={{ flex: 1 }}>
                {clicked === 0 && <ChatList onClick={onClickHandler} />}
                {clicked === 1 && <CallList onClick={onClickHandler} />}
              </View>
            </View>
          )}
          {clicked === 2 && <SelectContact search={searchContact} />}
          {clicked === 3 && <SearchContact searchedData={data} />}
        </View>
      </View>

      {/* <Modal
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
                paddingVertical: 20,
              }}
            >
              <TouchableOpacity
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
              </TouchableOpacity> 
              <TouchableOpacity>
                <Text
                  style={[
                    styles.headerText,
                    FontStyle.urbanistMedium,
                    { marginVertical: 20 },
                  ]}
                >
                  Blocked Contacts
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  placeholder: {
    height: "100%",
    flex: 1,
    width: "100%",
    justifyContent: "center",
    paddingVertical: 0,
    fontSize: 12,
    paddingHorizontal: 15,
    color: "white",
  },
  tripsTxt: {
    color: Variables.Colors.white,
    fontSize: 22,
    textAlignVertical: "center",
    textAlign: "center",
    flex: 1,
  },
  innerOptionView: {
    width: "95%",
    alignSelf: "center",
  },
  containerStyle: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(13, 13, 13, .5)",
    marginTop: 65,
    height: Variables.Measures.height,
  },
  modalView: {
    width: "50%",
    borderRadius: 7,
    backgroundColor: Variables.Colors.greyBg,
    position: "absolute",
    right: 5,
    top: 10,
    paddingVertical: 20,
  },
  headerText: {
    justifyContent: "center",
    fontSize: Variables.Measures.fontSize / 1.5,
    color: Variables.Colors.white,
  },
  footer: {
    height: Variables.Measures.height / 13,
    alignSelf: "center",
    justifyContent: "center",
    width: Variables.Measures.width,
  },
  modalTxt: {
    color: Variables.Colors.white,
    fontSize: Variables.Measures.fontSize / 1.3,
    textAlign: "center",
  },
  contactsTxt: {
    color: Variables.Colors.white,
    fontSize: 12,
    marginTop: 5,
  },
  outerView: {
    backgroundColor: Variables.Colors.blackBg,
    flex: 1,
    marginTop: Measures.StatusBarHeight,
  },
  headerView: {
    height: 60,
    width: "100%",
    backgroundColor: Variables.Colors.darkBlack,
  },
  leftHeader: {
    width: "10%",
    justifyContent: "center",
  },
  centerHeader: {
    width: "70%",
    justifyContent: "center",
  },
  centerSearchchHeader: {
    width: "70%",
    flexDirection: "row",
    alignItems: "center",
  },
  headerTxt: {
    color: Variables.Colors.white,
    fontSize: Variables.Measures.fontSize * 1.0,
  },
  rightHeader: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  alignHeaderView: {
    width: "90%",
    alignSelf: "center",
    flex: 1,
    flexDirection: "row",
  },
  innerTabView: {
    alignItems: "center",
    justifyContent: "center",
    width: Variables.Measures.width / 1.1,
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
});

export default Inbox;

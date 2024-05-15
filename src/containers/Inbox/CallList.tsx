import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { CommonStyles, FontStyle, Images, Variables } from "../../Theme";
import { useTranslation } from "react-i18next";
import { CallsData } from "../MockData/Calls";
import { useDispatch, useSelector } from "react-redux";

import CallYellowSvg from "../../assets/Images/CallYellow.svg";
import IncomingView from "../../assets/Images/incomingGreen.svg";
import OutgoingView from "../../assets/Images/OutgoingGreen.svg";
import MissedView from "../../assets/Images/MissedCall.svg";
import PlusSvg from "../../assets/Images/PlusBlack.svg";
import { navigate } from "../../navigators/RootNavigation";
import { ReducerStateProps } from "./InterfaceProps";
import { callListStart } from "../../actions/customerActions";
import _ from "lodash";
import { Measures } from "../../Theme/variables";

import ContentLoader, { Rect, Circle } from "react-content-loader/native";

import { useIsFocused } from "@react-navigation/native";
import FastImageView from "../../components/FastImageView";

interface CancelledProps {
  onClick: (val: number) => void;
}

interface itemProps {
  [x: string]: any;
  name: string;
  userImg: object;
  type: string;
  date: number;
}

const CallList: React.FC<CancelledProps> = ({ onClick }) => {
  const { t } = useTranslation();
  const isFocused = useIsFocused();
  const dispatch = useDispatch();

  const [callListData, isLoading, profileDetailsData] = useSelector(
    (state: ReducerStateProps) => [
      state.customer.callListData,
      state.customer.isLoading,
      state.user.profileDetailsData,
    ]
  );
  useEffect(() => {
    if (isFocused) {
      dispatch(callListStart());
    }
  }, [isFocused]);

  const convertUTCToLocalTime = (utcTime: string) => {
    let date = new Date(utcTime);
    const milliseconds = Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds()
    );

    const localTime = new Date(milliseconds);

    const d = new Date(localTime);
    const formattedDate = d.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });

    return formattedDate;
  };

  const renderCalls = (item: itemProps) => {
    return (
      <>
        {_.get(item, "receiver.id", null) !==
        _.get(profileDetailsData, "verifiedInfo.id", null) ? (
          <View style={styles.flexView}>
            <View style={styles.leftUserImg}>
              {_.find(item?.receiver?.profilePicture) ? (
                <Image
                  source={{ uri: _.get(item, "receiver.profilePicture", null) }}
                  style={{ height: 50, width: 50, borderRadius: 5 }}
                />
              ) : (
                <Image
                  source={Images.userPlaceholder}
                  style={{
                    height: 50,
                    width: 50,
                    borderRadius: 5,
                  }}
                  resizeMode="contain"
                />
              )}
            </View>
            <View style={styles.centerUserDesc}>
              <Text style={[FontStyle.urbanistBold, styles.nameTxt]}>
                {_.get(item, "receiver.fullName", null)}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 5,
                }}
              >
                <View style={styles.itemView}>
                  <OutgoingView />
                  <Text style={[styles.typeTxt, FontStyle.urbanistMedium]}>
                    outgoing
                  </Text>
                </View>
                <Text
                  style={[
                    styles.typeTxt,
                    FontStyle.urbanistMedium,
                    { paddingLeft: 1 },
                  ]}
                >
                  {convertUTCToLocalTime(_.get(item, "CallDateTime", null))}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.rightCallView}
              onPress={() =>
                navigate("Call", {
                  recId: _.get(item, "receiver.id", null),
                  profilePicture: _.get(item, "receiver.profilePicture", null),
                  name: _.get(item, "receiver.fullName", null),
                  time: new Date().toLocaleTimeString(),
                })
              }
            >
              <CallYellowSvg height={33} width={33} />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.flexView}>
            <View style={styles.leftUserImg}>
              {_.find(item?.caller?.profilePicture) ? (
                <Image
                  source={{ uri: _.get(item, "caller.profilePicture", null) }}
                  resizeMode="contain"
                  style={{ height: 50, width: 50, borderRadius: 5 }}
                />
              ) : (
                <Image
                  source={Images.userPlaceholder}
                  style={{
                    height: 50,
                    width: 50,
                    borderRadius: 5,
                  }}
                  resizeMode="contain"
                />
              )}
            </View>
            <View style={styles.centerUserDesc}>
              <Text style={[FontStyle.urbanistBold, styles.nameTxt]}>
                {_.get(item, "caller.fullName", null)}
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  marginTop: 5,
                }}
              >
                <View style={styles.itemView}>
                  {item?.duration == 0 ? (
                    <MissedView height={13} width={13} />
                  ) : (
                    <IncomingView />
                  )}

                  <Text style={[styles.typeTxt, FontStyle.urbanistMedium]}>
                    {item?.duration == 0 ? "missed" : "incoming"}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.typeTxt,
                    FontStyle.urbanistMedium,
                    { paddingLeft: 1 },
                  ]}
                >
                  {convertUTCToLocalTime(_.get(item, "CallDateTime", null))}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.rightCallView}
              onPress={() =>
                navigate("Call", {
                  recId: _.get(item, "caller.id", null),
                  profilePicture: _.get(item, "caller.profilePicture", null),
                  name: _.get(item, "caller.fullName", null),
                  time: new Date().toLocaleTimeString(),
                })
              }
            >
              <CallYellowSvg height={33} width={33} />
            </TouchableOpacity>
          </View>
        )}
      </>
    );
  };

  const LoadingView = () => {
    return (
      <View>
        <ContentLoader
          backgroundColor={Variables.Colors.absoluteBgGrey}
          foregroundColor={Variables.Colors.grey}
          width={Variables.Measures.width}
          height={100}
        >
          <Rect
            x="10"
            y="10"
            rx="4"
            ry="4"
            width={Variables.Measures.width / 4.5}
            height="80"
          />
          <Rect
            x="110"
            y="25"
            rx="4"
            ry="4"
            width={Variables.Measures.width / 3.5}
            height="20"
          />
          <Rect
            x="110"
            y="55"
            rx="4"
            ry="4"
            width={Variables.Measures.width / 3.5}
            height="20"
          />

          <Rect x="360" y="25" rx="4" ry="4" width="40" height="40" />
        </ContentLoader>

        <ContentLoader
          backgroundColor={Variables.Colors.absoluteBgGrey}
          foregroundColor={Variables.Colors.grey}
          width={Variables.Measures.width}
          height={100}
        >
          <Rect
            x="10"
            y="10"
            rx="4"
            ry="4"
            width={Variables.Measures.width / 4.5}
            height="80"
          />
          <Rect
            x="110"
            y="25"
            rx="4"
            ry="4"
            width={Variables.Measures.width / 3.5}
            height="20"
          />
          <Rect
            x="110"
            y="55"
            rx="4"
            ry="4"
            width={Variables.Measures.width / 3.5}
            height="20"
          />

          <Rect x="360" y="25" rx="4" ry="4" width="40" height="40" />
        </ContentLoader>
        <ContentLoader
          backgroundColor={Variables.Colors.absoluteBgGrey}
          foregroundColor={Variables.Colors.grey}
          width={Variables.Measures.width}
          height={100}
        >
          <Rect
            x="10"
            y="10"
            rx="4"
            ry="4"
            width={Variables.Measures.width / 4.5}
            height="80"
          />
          <Rect
            x="110"
            y="25"
            rx="4"
            ry="4"
            width={Variables.Measures.width / 3.5}
            height="20"
          />
          <Rect
            x="110"
            y="55"
            rx="4"
            ry="4"
            width={Variables.Measures.width / 3.5}
            height="20"
          />

          <Rect x="360" y="25" rx="4" ry="4" width="40" height="40" />
        </ContentLoader>
        <ContentLoader
          backgroundColor={Variables.Colors.absoluteBgGrey}
          foregroundColor={Variables.Colors.grey}
          width={Variables.Measures.width}
          height={100}
        >
          <Rect
            x="10"
            y="10"
            rx="4"
            ry="4"
            width={Variables.Measures.width / 4.5}
            height="80"
          />
          <Rect
            x="110"
            y="25"
            rx="4"
            ry="4"
            width={Variables.Measures.width / 3.5}
            height="20"
          />
          <Rect
            x="110"
            y="55"
            rx="4"
            ry="4"
            width={Variables.Measures.width / 3.5}
            height="20"
          />

          <Rect x="360" y="25" rx="4" ry="4" width="40" height="40" />
        </ContentLoader>
      </View>
    );
  };

  return !callListData ? (
    <LoadingView />
  ) : (
    <View style={styles.outerView}>
      <FlatList
        style={{ width: "100%", flex: 1 }}
        data={_.get(callListData, "items", null) || []}
        renderItem={({ item }: any) => renderCalls(item)}
        ListEmptyComponent={() => (
          <View
            style={{
              width: "100%",
              height: Measures.height / 1.5,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={[FontStyle.urbanistSemiBold, styles.tripsTxt]}>
              No Calls found
            </Text>
          </View>
        )}
      />
      <TouchableOpacity
        style={CommonStyles.plusView}
        onPress={() => {
          onClick(2);
        }}
      >
        <PlusSvg height={22} width={22} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollStyle: {
    backgroundColor: Variables.Colors.blackBg,
    height: Variables.Measures.height - 100,
  },
  flexView: {
    flexDirection: "row",
    width: "100%",
    marginTop: 18,
  },
  leftUserImg: {
    width: "20%",
    justifyContent: "center",
  },
  centerUserDesc: {
    width: "55%",
    justifyContent: "center",
    paddingLeft: 5,
  },
  rightCallView: {
    width: "25%",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  nameTxt: {
    color: Variables.Colors.white,
    fontSize: 18,
  },
  typeTxt: {
    color: Variables.Colors.locationGrey,
    marginLeft: 5,
  },
  itemView: {
    borderRightWidth: 1,
    borderRightColor: Variables.Colors.locationGrey,
    paddingRight: 5,
    flexDirection: "row",
    alignItems: "center",
    width: 85,
  },
  outerView: {
    flex: 1,
    width: "90%",
    alignSelf: "center",
  },
  tripsTxt: {
    color: Variables.Colors.white,
    fontSize: 22,
  },
});

export default CallList;

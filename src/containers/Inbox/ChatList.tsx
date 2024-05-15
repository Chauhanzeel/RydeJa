import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Text,
  RefreshControl,
  ScrollView,
} from "react-native";
import { CommonStyles, FontStyle, Variables } from "../../Theme";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import PlusSvg from "../../assets/Images/PlusBlack.svg";
import DisplayChatList from "../../components/DisplayChatList";
import { chatListStart } from "../../actions/customerActions";
import { ReducerStateProps } from "./InterfaceProps";
import _ from "lodash";
import { Measures } from "../../Theme/variables";
import { useIsFocused } from "@react-navigation/native";
import ContentLoader, { Rect, Circle } from "react-content-loader/native";

interface CancelledProps {
  onClick: (val: number) => void;
}

const ChatList: React.FC<CancelledProps> = ({ onClick }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [refreshing, setRefreshing] = useState(false);

  const [chatListData, isLoading, chatHistoryData, loginData] = useSelector(
    (state: ReducerStateProps) => [
      state.customer.chatListData,
      state.customer.isLoading,
      state.user.chatHistoryData,
      state.auth.loginData,
    ]
  );
  useEffect(() => {
    if (isFocused && loginData) {
      dispatch(chatListStart());
    }
  }, [isFocused, chatHistoryData, loginData]);

  useEffect(() => {
    if (!isLoading) {
      setRefreshing(false);
    }
  }, [isLoading]);

  const onRefresh = () => {
    if (loginData) {
      dispatch(chatListStart());
      setRefreshing(true);
    } else {
      setRefreshing(false);
    }
  };

  const LoadingView = () => {
    return (
      <ScrollView
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

          <Circle cx="380" cy="30" r="15" />
          <Rect x="360" y="55" rx="4" ry="4" width="40" height="15" />
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

          <Circle cx="380" cy="30" r="15" />
          <Rect x="360" y="55" rx="4" ry="4" width="40" height="15" />
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

          <Circle cx="380" cy="30" r="15" />
          <Rect x="360" y="55" rx="4" ry="4" width="40" height="15" />
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

          <Circle cx="380" cy="30" r="15" />
          <Rect x="360" y="55" rx="4" ry="4" width="40" height="15" />
        </ContentLoader>
      </ScrollView>
    );
  };

  return !chatListData && loginData ? (
    <LoadingView />
  ) : (
    <View style={styles.outerView}>
      <FlatList
        data={_.get(chatListData, "items", null) || []}
        renderItem={({ item }: any) => <DisplayChatList item={item} />}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Variables.Colors.white}
          />
        }
        ListEmptyComponent={() => (
          <View
            style={{
              width: "100%",
              height: Measures.height / 1.5,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={[FontStyle.urbanistSemiBold, CommonStyles.titleCommonTxt]}
            >
              No Chat found
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

export default ChatList;

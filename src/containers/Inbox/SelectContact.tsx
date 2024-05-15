import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Modal,
  TouchableOpacity,
} from "react-native";
import { CommonStyles, FontStyle, Variables } from "../../Theme";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";

import DisplaySelectedChatList from "../../components/DisplaySelectedChatList";
import { ReducerStateProps } from "./InterfaceProps";
import _ from "lodash";

interface CancelledProps {
  search: boolean;
}

const SelectContact: React.FC<CancelledProps> = ({ search }) => {
  const { t } = useTranslation();
  const [customerContactListData] = useSelector((state: ReducerStateProps) => [
    state.customer.customerContactListData,
  ]);

  // const [chatMesData] = useSelector((state: { auth: { chatRooms: any } }) => [
  //   state.auth.chatRooms,
  // ]);

  return (
    <View
    // style={{ flex: 1 }}
    >
      <View
        style={{
          width: "90%",
          alignSelf: "center",
        }}
      >
        {_.get(customerContactListData, "totalCount", null) > 0 && (
          <FlatList
            data={_.get(customerContactListData, "items", null) || []}
            renderItem={({ item }: any) => (
              <DisplaySelectedChatList item={item} />
            )}
            // style={{ marginBottom: 150 }}
          />
        )}
      </View>
      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={search}
        onRequestClose={() => {}}
      >
        <View style={styles.parentView}></View>
      </Modal> */}
    </View>
  );
};

const styles = StyleSheet.create({
  parentView: {
    backgroundColor: "rgba(13, 13, 13, .8)",
    // top: 90,
    // left: 0,
    // right: 0,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    width: "100%",
    marginTop: 60,
  },
  contactsTxt: {
    color: Variables.Colors.white,
    fontSize: 10,
    marginTop: 5,
  },
  outerView: {
    flex: 1,
    width: "90%",
    alignSelf: "center",
    height: "100%",
  },
  headerView: {
    marginTop: Variables.Measures.fontSize,
    height: 60,
  },
  leftHeader: {
    width: "10%",
    justifyContent: "center",
  },
  centerHeader: {
    width: "70%",
    justifyContent: "center",
    marginTop: 20,
  },
  headerTxt: {
    color: Variables.Colors.white,
    fontSize: 24,
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

export default SelectContact;

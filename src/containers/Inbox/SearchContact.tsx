import React, { useState } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";
import { CommonStyles, FontStyle, Variables } from "../../Theme";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import DisplaySelectedChatList from "../../components/DisplaySelectedChatList";

interface CancelledProps {
  searchedData: any;
}

const SearchContact: React.FC<CancelledProps> = ({ searchedData }) => {
  const { t } = useTranslation();

  return (
    <View
      style={{
        width: "90%",
        alignSelf: "center",
      }}
    >
      {/* <Text style={{color: 'white'}}>Search screen</Text> */}
      {searchedData ? (
        <FlatList
          data={searchedData}
          renderItem={({ item }: any) => (
            <DisplaySelectedChatList item={item} />
          )}
          // style={{ marginBottom: 150 }}
        />
      ) : (
        <View>
          <Text style={{ color: "white" }}>No contacts found</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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

export default SearchContact;

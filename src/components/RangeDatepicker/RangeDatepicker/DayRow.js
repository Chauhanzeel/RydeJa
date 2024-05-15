import React from "react";
import { FlatList, View } from "react-native";
import Day from "./Day";

const DayRow = (props) => {
  return (
    <View
      style={{
        // flexDirection: "row",
        flex: 1,
        justifyContent: "center",
      }}
    >
      <FlatList
        data={props.days}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        initialNumToRender={1}
        removeClippedSubviews={true}
        renderItem={({ item, index }) => (
          <Day
            key={index}
            dayProps={props.dayProps}
            onSelectDate={props.onSelectDate}
            day={item}
          />
        )}
      />
    </View>
  );
};

export default DayRow;

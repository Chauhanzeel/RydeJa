import _ from "lodash";
import React, { memo, useCallback } from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import Swiper from "react-native-swiper";
import { Measures } from "../Theme/variables";

// const slides = [
//   {
//     key: "1",
//     title: "Welcome to My App",
//     text: "This is the best app ever!",
//     image: require("./images/slide1.png"),
//   },
//   {
//     key: "2",
//     title: "Explore Awesome Features",
//     text: "Discover the amazing features of our app.",
//     image: require("./images/slide2.png"),
//   },
//   {
//     key: "3",
//     title: "Get Started",
//     text: "Let's get started and enjoy!",
//     image: require("./images/slide3.png"),
//   },
// ];
interface AppIntroProps {
  sliderList: any;
}
const AppIntroSlider: React.FC<AppIntroProps> = ({ sliderList }) => {
  const RenderImages = (item: any) => {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
        }}
      >
        <Image
          style={[styles.introImageStyle]}
          source={item.carImg}
          resizeMode="cover"
        />
      </View>
    );
  };

  return (
    <Swiper loop={false} showsButtons={false} dotStyle={styles.dot}>
      <FlatList
        data={sliderList}
        renderItem={({ item }) => RenderImages(item)}
      />
    </Swiper>
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    textAlign: "center",
  },
  dot: {
    backgroundColor: "gray",
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 4,
  },
  introImageStyle: {
    width: Measures.width,
    height: 300,
  },
});

export default memo(AppIntroSlider);

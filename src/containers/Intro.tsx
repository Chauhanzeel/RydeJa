import React, { useState, useRef } from "react";

import { StyleSheet, View, Text, StatusBar, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FastImage from "react-native-fast-image";

import { FontStyle, Images, Layout, Variables } from "../Theme";
import { useTranslation } from "react-i18next";
import ButtonView from "../components/ButtonView";
import { navigate } from "../navigators/RootNavigation";

interface IntroScreensProps {}

export interface ScrollProps {
  nativeEvent: { contentOffset: { x: string | number } };
}

const IntroScreens: React.FC<IntroScreensProps> = () => {
  const [currentScrollIndex, setCurrentScrollIndex] = useState(0);
  const scrollViewRef = useRef(null);

  const { t } = useTranslation();

  // for display the next and skip button
  const _renderNextButton = () => {
    return (
      <ButtonView
        btnTxt={
          currentScrollIndex === 0 || currentScrollIndex === 1
            ? t("labelConst.nextTxt")
            : t("labelConst.getStarted")
        }
        width={Variables.Measures.width / 1.15}
        onBtnPress={() => navigateTo()}
        backgroundColor={Variables.Colors.yellow}
        fontColor={Variables.Colors.blackBg}
      />
    );
  };

  const navigateTo = () => {
    currentScrollIndex === 0 || currentScrollIndex === 1
      ? toNextPage()
      : navigate("welcome");
  };

  //calls when user clicks on next button
  const toNextPage = () => {
    switch (currentScrollIndex) {
      case 0:
        scrollViewRef.current?.scrollTo({
          x: Variables.Measures.width,
          animated: true,
        });
        break;
      case 1:
        scrollViewRef.current?.scrollTo({
          x: Variables.Measures.width * 2,
          animated: true,
        });
        break;
      case 2:
        scrollViewRef.current?.scrollTo({
          x: Variables.Measures.width * 3,
          animated: true,
        });
        break;
      default:
        break;
    }
  };

  //calls when user scroll the screen
  const handleScroll = (event: ScrollProps) => {
    const leftOffSetValue: any = event.nativeEvent.contentOffset.x;
    const offSetValue = leftOffSetValue / Variables.Measures.width;
    if (offSetValue > 1.5) {
      setCurrentScrollIndex(2);
    } else if (offSetValue < 1.5 && offSetValue > 0) {
      setCurrentScrollIndex(1);
    } else {
      setCurrentScrollIndex(0);
    }
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView
        style={[Layout.fill, { backgroundColor: Variables.Colors.blackBg }]}
      >
        <View style={styles.outerView}>
          <ScrollView
            horizontal={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            ref={scrollViewRef}
            onScroll={(event) => handleScroll(event)}
            scrollEventThrottle={25}
          >
            <View style={{ width: Variables.Measures.width }}>
              <View style={styles.introScreenImage1}>
                <FastImage
                  source={Images.introImg1}
                  style={styles.imag1Style}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.introScreen1Container}>
                <Text style={[styles.intro1Text, FontStyle.urbanistBold]}>
                  {t("labelConst.introTxt1")}
                </Text>
              </View>
            </View>
            <View style={{ width: Variables.Measures.width }}>
              <View style={styles.introScreenImage1}>
                <FastImage
                  source={Images.introImg2}
                  style={styles.imag2Style}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.introScreen1Container}>
                <Text style={[styles.intro1Text, FontStyle.urbanistBold]}>
                  {t("labelConst.introTxt2")}
                </Text>
              </View>
            </View>
            <View style={{ width: Variables.Measures.width }}>
              <View style={styles.introScreenImage1}>
                <FastImage
                  source={Images.introImg3}
                  style={styles.imag3Style}
                  resizeMode="contain"
                />
              </View>
              <View style={styles.introScreen1Container}>
                <Text style={[styles.intro1Text, FontStyle.urbanistBold]}>
                  {t("labelConst.introTxt3")}
                </Text>
              </View>
            </View>
          </ScrollView>
          <View style={styles.paginationContainer}>
            <View style={styles.paginationWrapper}>
              {Array.from(Array(3).keys()).map((index) => (
                <View
                  style={
                    currentScrollIndex === index
                      ? styles.activeScroll
                      : styles.inActiveScroll
                  }
                  key={index}
                />
              ))}
            </View>
            <View style={styles.nextBtnContainer}>
              <_renderNextButton />
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default IntroScreens;

const styles = StyleSheet.create({
  imag1Style: {
    height: Variables.Measures.width / 1.8,
    marginTop: Variables.Measures.width / 5,
  },
  imag2Style: {
    height: Variables.Measures.width / 1.6,
    marginTop: Variables.Measures.width / 7,
  },
  imag3Style: {
    height: Variables.Measures.width / 1.5,
    marginTop: Variables.Measures.width / 10,
  },
  introSlider3: {
    position: "absolute",
    alignSelf: "center",
    justifyContent: "center",
    height: "100%",
    marginTop: Variables.Measures.width / 2.9,
  },
  paginationWrapper: {
    position: "absolute",
    bottom: Variables.Measures.width / 4.3,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  activeScroll: {
    height: 6,
    width: 27,
    borderRadius: 5,
    backgroundColor: Variables.Colors.yellow,
    margin: 4,
  },
  inActiveScroll: {
    height: 6,
    width: 6,
    borderRadius: 4,
    backgroundColor: Variables.Colors.greyDots,
    margin: 4,
  },
  introScreenImage1: {
    height: "53%",
    alignItems: "center",
    width: Variables.Measures.width,
    // marginTop: Variables.Measures.fontSize,
  },
  introScreen1Container: {
    alignItems: "center",
    justifyContent: "center",
    width: Variables.Measures.width,
    height: "25%",
    marginTop: Variables.Measures.fontSize * 2,
  },
  intro1Text: {
    color: Variables.Colors.white,
    fontSize: Variables.Measures.fontSize * 1.7,
    textAlign: "center",
    width: "90%",
  },
  introScreenImage2: {
    height: "60%",
    justifyContent: "center",
    alignItems: "center",
  },
  nextBtnContainer: {
    width: "100%",
    position: "absolute",
    bottom: Variables.Measures.fontSize * 1.2,
  },
  outerView: {
    backgroundColor: Variables.Colors.blackBg,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  paginationContainer: {
    flex: 1,
    alignItems: "center",
    height: "25%",
    backgroundColor: "red",
  },
});

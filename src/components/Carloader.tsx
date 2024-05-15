import React from "react";
import ContentLoader, { Rect, Circle } from "react-content-loader/native";
import { ScrollView, StyleSheet, View } from "react-native";
import { Colors, Measures } from "../Theme/variables";
interface CarloaderProps {
  isloading?: boolean;
}
const Carloader: React.FC<CarloaderProps> = ({ isloading }) => {
  return isloading ? (
    <ScrollView style={styles.main}>
      <ContentLoader
        height={Measures.height / 3.8}
        speed={1}
        backgroundColor={"#333"}
        foregroundColor={"#999"}
        // viewBox="100 10 200 200"
      >
        <Rect
          x="10"
          y="10"
          rx={10}
          ry={10}
          width={Measures.width - 15}
          height={Measures.height / 4}
        />
      </ContentLoader>
      <ContentLoader
        height={Measures.height / 3.8}
        speed={1}
        backgroundColor={"#333"}
        foregroundColor={"#999"}
        // viewBox="100 10 200 200"
      >
        <Rect
          x="10"
          y="10"
          rx={10}
          ry={10}
          width={Measures.width - 15}
          height={Measures.height / 4}
        />
      </ContentLoader>
      <ContentLoader
        height={Measures.height / 3.8}
        speed={1}
        backgroundColor={"#333"}
        foregroundColor={"#999"}
        // viewBox="100 10 200 200"
      >
        <Rect
          x="10"
          y="10"
          rx={10}
          ry={10}
          width={Measures.width - 15}
          height={Measures.height / 4}
        />
      </ContentLoader>
    </ScrollView>
  ) : (
    <View />
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: Colors.darkBlack,
  },
});
export default Carloader;

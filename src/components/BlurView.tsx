import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import { BlurView } from "@react-native-community/blur";
import { Variables } from "../Theme";
interface BlurViewProps {
  Type?: "dark" | "light" | "xlight";
}

const BlurViewUI: React.FC<BlurViewProps> = ({ Type }) => {
  return (
    <View style={styles.absolute}>
      {Platform.OS === "android" ? (
        <View style={{ width: "100%" }} />
      ) : (
        <BlurView
          style={styles.blurView}
          blurType={Type}
          blurAmount={10}
          reducedTransparencyFallbackColor="white"
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  absolute: {
    position: "absolute",
    width: "100%",
    top: 0,
    height: Variables.Measures.StatusBarHeight + 10,
    bottom: 0,
    left: 0,
    right: 0,
  },
  blurView: {
    width: "100%",
    height: Variables.Measures.StatusBarHeight + 10,
  },
});
export default BlurViewUI;

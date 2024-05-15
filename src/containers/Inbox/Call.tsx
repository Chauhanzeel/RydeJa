import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  StatusBar,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontStyle, Variables, Images } from "../../Theme";
import { useTranslation } from "react-i18next";

import CallEndSvg from "../../assets/Images/CallEnd.svg";
import BackSvg from "../../assets/Images/ProfileLeft.svg";

import { goBack } from "../../navigators/RootNavigation";
import DashedLine from "react-native-dashed-line";
import { FilterModalProps } from "../types";
import { Measures } from "../../Theme/variables";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import {
  callListStart,
  customerCallEndStart,
  customerCallStart,
} from "../../actions/customerActions";
import { ReducerStateProps } from "./InterfaceProps";

const Call: React.FC<FilterModalProps> = ({ route }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const name = route.params?.callsData
    ? route.params?.callsData?.receiver?.fullName
    : route.params?.name;

  const profilePicture = route.params?.callsData
    ? route.params?.callsData?.receiver?.profilePicture
    : route.params?.profilePicture;

  const recId = route.params?.callsData
    ? route.params?.callsData?.receiver?.id
    : route.params?.recId;

  const time = route.params?.time;

  useEffect(() => {
    let params = {
      receiver: recId,
    };
    dispatch(customerCallStart(params));
  }, [recId]);

  const [customerCallData, customerCallEndData] = useSelector(
    (state: ReducerStateProps) => [
      state.customer.customerCallData,
      state.customer.customerCallEndData,
    ]
  );

  const endCall = () => {
    var ctime = new Date().toLocaleTimeString();
    // Convert the time strings to Date objects
    const time1 = new Date(`01/01/1970 ${time}`);
    const time2 = new Date(`01/01/1970 ${ctime}`);

    // Get the time difference in milliseconds
    const timeDiff = time2.getTime() - time1.getTime();

    // Convert the time difference to seconds
    const timeDiffInSeconds = timeDiff / 1000;
    // Convert the time difference to minutes
    const timeDiffInMinutes = timeDiffInSeconds / 60;

    let params = {
      id: _.get(customerCallData, "id", null),
      receiver: recId,
      receivedAt: _.get(customerCallData, "CallDateTime", null),
      duration: timeDiffInMinutes.toFixed(4).toString(),
    };

    dispatch(customerCallEndStart(params));
  };

  return (
    <SafeAreaView style={styles.safeAreaStyle}>
      <StatusBar
        backgroundColor="transparent"
        barStyle="light-content"
        translucent
      />
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.userView}>
          <View style={{ alignItems: "center" }}>
            {profilePicture ? (
              <Image source={{ uri: profilePicture }} style={styles.imgStyle} />
            ) : (
              <Image source={Images.userPlaceholder} style={styles.imgStyle} />
            )}
            <Text style={[FontStyle.urbanistBold, styles.nameTxt]}>{name}</Text>
            <Text style={[FontStyle.urbanistMedium, styles.callingTxt]}>
              Calling
            </Text>
          </View>
          <TouchableOpacity style={styles.backbutton} onPress={goBack}>
            <BackSvg />
          </TouchableOpacity>
        </View>
        <View style={styles.bottomView}>
          <View style={{ marginTop: 45 }}>
            <DashedLine
              dashLength={6}
              dashColor={Variables.Colors.borderGrey}
              dashThickness={1}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              endCall();
            }}
            style={{
              alignItems: "center",
              justifyContent: "center",
              alignSelf: "center",
              width: "18%",
            }}
          >
            <CallEndSvg />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaStyle: {
    flex: 1,
    backgroundColor: Variables.Colors.greyBg,
  },
  backbutton: {
    position: "absolute",
    top: Measures.StatusBarHeight + 10,
    left: Measures.StatusBarHeight,
  },
  nameTxt: {
    color: "white",
    marginVertical: 15,
    fontSize: Variables.Measures.fontSize,
  },
  callingTxt: {
    color: Variables.Colors.white,
    fontSize: 12,
    marginTop: 15,
  },
  userView: {
    width: "100%",
    justifyContent: "flex-start",
    alignContent: "center",
    height: Variables.Measures.height / 1.7,
    backgroundColor: Variables.Colors.darkBlack,
  },
  bottomView: {
    backgroundColor: Variables.Colors.greyBg,
    width: "100%",
    height: Variables.Measures.height / 3,
  },
  imgStyle: {
    borderRadius: Variables.Measures.width / 2,
    borderWidth: 1,
    borderColor: Variables.Colors.darkYellow,
    marginTop: Measures.StatusBarHeight + 10,
    width: Variables.Measures.fontSize * 5,
    height: Variables.Measures.fontSize * 5,
  },
});

export default Call;

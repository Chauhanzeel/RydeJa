import React, { useEffect } from "react";
import {
  StyleSheet,
  StatusBar,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import { Variables, FontStyle, CommonStyles } from "../Theme";

import CloseSvg from "../assets/Images/CloseSvg.svg";
import ProfilePhotoSvg from "../assets/Images/ProfilePhoto.svg";
import CallWhiteSvg from "../assets/Images/CallWhite.svg";
import LicenseSvg from "../assets/Images/License.svg";
import PaymentCardsvg from "../assets/Images/PaymentCard.svg";
import ButtonView from "../components/ButtonView";
import { goBack, navigate } from "../navigators/RootNavigation";
import { useDispatch, useSelector } from "react-redux";
import {
  createRentalCarStart,
  createRentalCarSuccess,
  validationCheckStart,
} from "../actions/customerActions";
import { GetApprovedProps, ReducerStateProps } from "./Inbox/InterfaceProps";
import _ from "lodash";
import BookingValidation from "../components/BookedValidation";

const GetApproved: React.FC<GetApprovedProps> = ({ route }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const rentalCarObj = route.params?.rentalCarObj;

  const [isLoading, validationObj] = useSelector((state: ReducerStateProps) => [
    state.customer.isLoading,
    state.customer.validationObj,
  ]);
  useEffect(() => {
    dispatch(validationCheckStart(null));
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaStyle}>
      <StatusBar barStyle="light-content" />

      <ScrollView style={{ height: "100%" }}>
        <TouchableOpacity style={styles.headerView} onPress={goBack}>
          <CloseSvg />
        </TouchableOpacity>
        <View style={styles.outerView}>
          <Text style={[FontStyle.urbanistBold, CommonStyles.headingCommonTxt]}>
            Get approved to Ryde
          </Text>
          <Text
            style={[
              FontStyle.urbanistMedium,
              CommonStyles.descCommonTxt,
              { marginTop: 15 },
            ]}
          >
            Since this is your first trip, you'll need to provide us with some
            information before you can check out.
          </Text>
          <View style={styles.greyBgView}>
            <View style={styles.cardWidthView}>
              <View style={{ flexDirection: "row" }}>
                <View style={styles.leftImgView}>
                  <ProfilePhotoSvg />
                </View>
                <View style={{ width: "80%" }}>
                  <Text
                    style={[
                      FontStyle.urbanistBold,
                      CommonStyles.smallCommonTxt,
                    ]}
                  >
                    Profile photo
                  </Text>
                  <Text
                    style={[
                      FontStyle.urbanistMedium,
                      CommonStyles.extraSmallCommonTxt,
                      { marginTop: 4 },
                    ]}
                  >
                    Since this is your first trip, you'll need to provide us
                    with some information before you can check out.
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: "row", marginVertical: 20 }}>
                <View style={styles.leftImgView}>
                  <CallWhiteSvg height={35} width={35} />
                </View>
                <View style={{ width: "80%" }}>
                  <Text
                    style={[
                      FontStyle.urbanistBold,
                      CommonStyles.smallCommonTxt,
                    ]}
                  >
                    Phone number
                  </Text>
                  <Text
                    style={[
                      FontStyle.urbanistMedium,
                      CommonStyles.extraSmallCommonTxt,
                      { marginTop: 4 },
                    ]}
                  >
                    We'll send you a verification code to help secure your
                    account.
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: "row" }}>
                <View style={styles.leftImgView}>
                  <LicenseSvg />
                </View>
                <View style={{ width: "80%" }}>
                  <Text
                    style={[
                      FontStyle.urbanistBold,
                      CommonStyles.smallCommonTxt,
                    ]}
                  >
                    Driver's License
                  </Text>
                  <Text
                    style={[
                      FontStyle.urbanistMedium,
                      CommonStyles.extraSmallCommonTxt,
                      { marginTop: 4 },
                    ]}
                  >
                    Since this is your first trip, you'll need to provide us
                    with some information before you can check out.
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: "row", marginTop: 20 }}>
                <View style={styles.leftImgView}>
                  <PaymentCardsvg />
                </View>
                <View style={{ width: "80%" }}>
                  <Text
                    style={[
                      FontStyle.urbanistBold,
                      CommonStyles.smallCommonTxt,
                    ]}
                  >
                    Payment method
                  </Text>
                  <Text
                    style={[
                      FontStyle.urbanistMedium,
                      CommonStyles.extraSmallCommonTxt,
                      { marginTop: 4 },
                    ]}
                  >
                    You won't be charged until you book your trip.
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{ marginVertical: Variables.Measures.unit * 3 }}>
            <ButtonView
              width={Variables.Measures.width / 2}
              btnTxt={t("labelConst.continueTxt")}
              isLoading={isLoading}
              disablebtn={isLoading}
              backgroundColor={Variables.Colors.yellow}
              onBtnPress={() =>
                BookingValidation.Check(validationObj, rentalCarObj)
              }
              fontColor={Variables.Colors.blackBg}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaStyle: {
    flex: 1,
    backgroundColor: Variables.Colors.darkBlack,
  },
  headerView: {
    width: "91%",
    alignSelf: "center",
    marginTop: 20,
  },
  outerView: {
    width: "91%",
    alignSelf: "center",
    height: "100%",
    marginTop: 20,
  },
  headingTxt: {
    color: Variables.Colors.white,
    fontSize: 24,
  },
  subHeadingTxt: {
    color: Variables.Colors.white,
    fontSize: 12,
    lineHeight: 20,
  },
  greyBgView: {
    width: "100%",
    alignSelf: "center",
    backgroundColor: Variables.Colors.greyBg,
    borderRadius: 8,
    marginTop: 30,
    paddingVertical: Variables.Measures.unit * 4,
  },
  cardHeaderTxt: {
    fontSize: 16,
    color: Variables.Colors.white,
  },
  cardWidthView: {
    width: "95%",
    alignSelf: "center",
  },
  leftImgView: {
    width: "15%",
    alignItems: "center",
  },
});
export default GetApproved;

import React, { useState, useRef, useEffect } from "react";
import { CommonStyles, FontStyle, Images, Variables } from "../../Theme";
import {
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  Text,
  TouchableOpacity,
  RefreshControl,
  FlatList,
} from "react-native";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import { goBack, navigate } from "../../navigators/RootNavigation";
import ImagePicker from "react-native-image-crop-picker";

import Header from "../../components/Header";
import ButtonView from "../../components/ButtonView";
import ContentLoader, { Rect, Circle } from "react-content-loader/native";
import CloseSvg from "../../assets/Images/Close.svg";
import InputField from "../../components/InputField";
import BottomModal from "../../components/BottomModal";
import { useDispatch, useSelector } from "react-redux";
import { updateProfileStart } from "../../actions/userActions";
import { GetApprovedProps, ReducerStateProps } from "../Inbox/InterfaceProps";
import FastImageView from "../../components/FastImageView";
import { Colors, Measures } from "../../Theme/variables";
import CheckBox from "../../components/CheckBox";
import { promoListStart } from "../../actions/customerActions";
import _ from "lodash";
import DashedLine from "react-native-dashed-line";

export interface ImageProps {
  didCancel?: string;
  errorCode?: string;
  errorMessage?: string;
  path: string;
  height?: number;
  mime?: string;
  size?: number;
  width?: number;
}

const PromoCode: React.FC<GetApprovedProps> = ({ route }) => {
  const rentalCarObj = route.params?.rentalCarObj;

  const { t } = useTranslation();

  const dispatch = useDispatch();

  const [numberError, setNumberError] = useState(0);
  const numberRef = useRef(null);
  const [pramo, setPromo] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const [isLoading, promoListData] = useSelector((state: ReducerStateProps) => [
    state.customer.isLoading,
    state.customer.promoListData,
  ]);

  useEffect(() => {
    dispatch(promoListStart());
  }, []);

  const renderPromoListData = (item: any, index: any) => {
    return (
      <View style={styles.promoCard}>
        <View style={styles.verticalTextView}>
          {_.get(item, "promoCode", null)
            .split("")
            .map((char: any, index: any) => (
              <Text
                key={index}
                style={[FontStyle.montBold, styles.verticalText]}
              >
                {char}
              </Text>
            ))}
        </View>
        <View style={{ flex: 1 }}>
          <View style={styles.applyView}>
            <Text style={[FontStyle.urbanistBold, styles.name]}>
              {_.get(item, "name", null)}
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigate("Checkout", {
                  rentalCarObj: {
                    ...rentalCarObj,
                    ...{
                      promocode: _.get(item, "promoCode", null),
                      promoId: _.get(item, "id", null),
                    },
                  },
                });
              }}
            >
              <Text style={[FontStyle.montBold, styles.applyText]}>APPLY</Text>
            </TouchableOpacity>
          </View>

          <DashedLine
            dashLength={4}
            dashColor={Variables.Colors.inputTxtColor}
            dashThickness={1}
            style={styles.offView}
          />

          <Text
            numberOfLines={3}
            style={[FontStyle.urbanistMedium, styles.desc]}
          >
            {_.get(item, "description", null)}
          </Text>
        </View>
      </View>
    );
  };

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(promoListStart());
  };

  useEffect(() => {
    if (!isLoading) {
      setRefreshing(false);
    }
  }, [isLoading]);

  const LoadingView = () => {
    return (
      <SafeAreaView style={CommonStyles.safeAreaStyle}>
        <StatusBar
          backgroundColor={Variables.Colors.blackBg}
          barStyle="light-content"
          translucent
        />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={Variables.Colors.white}
            />
          }
        >
          <View style={styles.l1}>
            <ContentLoader
              backgroundColor={Variables.Colors.absoluteBgGrey}
              foregroundColor={Variables.Colors.grey}
            >
              <Circle
                cx={Variables.MetricsSizes.tiny * 5}
                cy={Variables.MetricsSizes.tiny * 5}
                r="18"
              />
            </ContentLoader>
          </View>

          <ContentLoader
            backgroundColor={Variables.Colors.absoluteBgGrey}
            foregroundColor={Variables.Colors.grey}
            width={Variables.Measures.width}
            height={Variables.FontSize.large * 3}
          >
            <Rect
              x={Variables.MetricsSizes.small}
              y="0"
              rx="4"
              ry="4"
              width={Variables.Measures.width / 2}
              height={Variables.FontSize.regular * 2}
            />

            <Rect
              x={Variables.MetricsSizes.small}
              y={Variables.FontSize.regular * 3}
              rx="4"
              ry="4"
              width={Variables.Measures.width / 1.06}
              height={Variables.MetricsSizes.small}
            />

            <Rect
              x={Variables.MetricsSizes.small}
              y={Variables.FontSize.regular * 4}
              rx="4"
              ry="4"
              width={Variables.Measures.width / 2}
              height={Variables.MetricsSizes.small}
            />
          </ContentLoader>

          <ContentLoader
            backgroundColor={Variables.Colors.absoluteBgGrey}
            foregroundColor={Variables.Colors.grey}
            width={Variables.Measures.width}
            height={Variables.Measures.width / 2.3}
          >
            <Rect
              x={Variables.MetricsSizes.small}
              y="0"
              rx="15"
              ry="15"
              width={Variables.Measures.width / 1.06}
              height={Variables.Measures.width / 2.3}
            />
          </ContentLoader>
          <View style={{ marginVertical: 10 }} />
          <ContentLoader
            backgroundColor={Variables.Colors.absoluteBgGrey}
            foregroundColor={Variables.Colors.grey}
            width={Variables.Measures.width}
            height={Variables.Measures.width / 2.3}
          >
            <Rect
              x={Variables.MetricsSizes.small}
              y="0"
              rx="15"
              ry="15"
              width={Variables.Measures.width / 1.06}
              height={Variables.Measures.width / 2.3}
            />
          </ContentLoader>
          <View style={{ marginVertical: 10 }} />
          <ContentLoader
            backgroundColor={Variables.Colors.absoluteBgGrey}
            foregroundColor={Variables.Colors.grey}
            width={Variables.Measures.width}
            height={Variables.Measures.width / 2.3}
          >
            <Rect
              x={Variables.MetricsSizes.small}
              y="0"
              rx="15"
              ry="15"
              width={Variables.Measures.width / 1.06}
              height={Variables.Measures.width / 2.3}
            />
          </ContentLoader>
          <View style={{ marginVertical: 10 }} />
        </ScrollView>
      </SafeAreaView>
    );
  };

  return !promoListData ? (
    <LoadingView />
  ) : (
    <SafeAreaView style={CommonStyles.safeAreaStyle}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.blackBg} />
      <Header
        leftSvg={<CloseSvg height={25} width={25} />}
        onLeftPress={goBack}
      />
      <View style={{ width: "93%", alignSelf: "center" }}>
        <Text style={[FontStyle.urbanistBold, styles.headingTxt]}>
          Add promo code
        </Text>
        {_.size(_.get(promoListData, "items", null)) > 0 ? (
          <Text style={[FontStyle.urbanistMedium, styles.profileDescTxt]}>
            Only one promo code can be applied per trip. If multiple codes are
            added, only the last one will apply.
          </Text>
        ) : null}
      </View>

      <View style={styles.inputOuterView}>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={Variables.Colors.white}
            />
          }
          data={_.get(promoListData, "items", null) || []}
          renderItem={({ item, index }) => renderPromoListData(item, index)}
          style={styles.flatListView}
          ListEmptyComponent={() => (
            <View style={styles.noOffers}>
              <Text style={[FontStyle.urbanistSemiBold, styles.tripsTxt]}>
                No Offers Available.
              </Text>
            </View>
          )}
        />
        {/* <InputField
          placeholderTextColor={Variables.Colors.inputTxtColor}
          value={pramo}
          onChangeText={(val: string) => {
            setPromo(val);
            if (val.length >= 1) {
              setNumberError(1);
            } else {
              setNumberError(0);
            }
          }}
          onSubmitEditing={() => {}}
          emptyField={numberError}
          placeholder="Enter promo code"
          inputref={numberRef}
        /> */}
      </View>
      {/* <View style={{ marginVertical: Variables.Measures.fontSize * 2.5 }}>
        <ButtonView
          btnTxt={"Apply"}
          onBtnPress={() =>
            navigate("Checkout", {
              rentalCarObj: { ...rentalCarObj, ...{ promocode: pramo } },
            })
          }
          width={Variables.Measures.width / 2}
          backgroundColor={Variables.Colors.yellow}
          fontColor={Variables.Colors.blackBg}
        />
     
      </View> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  l1: {
    width: Variables.Measures.width,
    height: 60,
    marginTop: Variables.FontSize.regular,
  },
  noOffers: {
    width: "100%",
    flex: 1,
    height: Variables.Measures.height / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  tripsTxt: {
    color: Variables.Colors.white,
    fontSize: 22,
  },
  offView: {
    alignSelf: "center",
    width: "90%",
  },
  desc: {
    color: Variables.Colors.inputTxtColor,
    padding: 15,
    textAlign: "justify",
    fontSize: 12,
  },
  name: {
    color: Variables.Colors.white,
    fontSize: 16,
  },
  applyText: {
    color: Variables.Colors.yellow,
    fontWeight: "bold",
  },
  applyView: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
  },
  verticalText: {
    fontSize: 14,
    color: Variables.Colors.white,
  },
  verticalTextView: {
    width: "15%",
    backgroundColor: Variables.Colors.darkYellow,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 20,
    borderTopLeftRadius: 17,
    borderBottomLeftRadius: 17,
  },
  promoCard: {
    width: "100%",
    backgroundColor: Variables.Colors.carGrey,
    borderRadius: 17,
    flexDirection: "row",
  },
  flatListView: {
    width: Variables.Measures.width / 1.1,
    alignSelf: "center",
    marginVertical: Variables.FontSize.regular,
  },
  inputTitleTxt: {
    color: Variables.Colors.inputTxtColor,
    fontSize: 12,
    marginTop: Variables.Measures.fontSize / 1.3,
  },
  inputOuterView: {
    width: "93%",
    alignSelf: "center",
  },
  inputView: {
    width: "100%",
    backgroundColor: Variables.Colors.carGrey,
    height: 50,
    alignSelf: "center",
    borderRadius: 10,
    paddingHorizontal: 15,
    marginTop: 10,
    color: Variables.Colors.white,
  },
  headingTxt: {
    fontSize: Variables.Measures.fontSize,
    color: Variables.Colors.white,
  },
  profileDescTxt: {
    fontSize: Variables.Measures.fontSize / 1.8,
    color: Variables.Colors.white,
    marginVertical: 5,
    lineHeight: 22,
  },
  changePicTxt: {
    fontSize: Variables.Measures.fontSize / 1.3,
    color: Variables.Colors.white,
  },
  changeProfileBtn: {
    width: "100%",
    alignSelf: "center",
    backgroundColor: Variables.Colors.greyBg,
    height: 55,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  stepToBook: {
    flexDirection: "row",
    marginVertical: Measures.fontSize,
    width: "100%",
    alignSelf: "center",
    justifyContent: "space-between",
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.grey,
    height: 50,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  extraTxt: {
    fontSize: Variables.Measures.fontSize / 1.5,
    color: Variables.Colors.chocolate,
    marginVertical: 20,
    alignSelf: "center",
  },
});

export default PromoCode;

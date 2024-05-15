import React, { useState, useRef, useEffect } from "react";
import { CommonStyles, FontStyle, Images, Variables } from "../../Theme";
import {
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  Text,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { goBack, navigate, replace } from "../../navigators/RootNavigation";
import Header from "../../components/Header";
import CloseSvg from "../../assets/Images/Close.svg";
import CreaditCard from "../../assets/Images/CreaditCard.svg";
import Lock from "../../assets/Images/Lock.svg";

import { useDispatch, useSelector } from "react-redux";
import { Colors, Measures } from "../../Theme/variables";
import RadioView from "../../components/Radiobutton";
import { saveCardListStart } from "../../actions/customerActions";
import { GetApprovedProps, ReducerStateProps } from "../Inbox/InterfaceProps";
import _ from "lodash";
import ContentLoader, { Rect, Circle } from "react-content-loader/native";

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

const PaymentMethodCard: React.FC<GetApprovedProps> = ({ route }) => {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const rentalCarObj = route.params?.rentalCarObj;

  const [cardId, setCardId] = useState(null);

  const [saveCardList, isLoading] = useSelector((state: ReducerStateProps) => [
    state.customer.saveCardList,
    state.customer.isLoading,
  ]);

  useEffect(() => {
    dispatch(saveCardListStart());
    setCardId(_.get(rentalCarObj, "paymentObj.id", null));
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setRefreshing(false);
    }
  }, [isLoading]);

  const refreshControl = () => {
    dispatch(saveCardListStart());
    setCardId(_.get(rentalCarObj, "paymentObj.id", null));
    setRefreshing(true);
  };

  const cardItem = (item: { id: number; brand: string; last4: number }) => {
    return (
      <TouchableOpacity
        style={styles.cardView}
        onPress={() => {
          setCardId(_.get(item, "id", null)),
            navigate("Checkout", {
              rentalCarObj: { ...rentalCarObj, ...{ paymentObj: item } },
            });
        }}
      >
        <View style={{ width: "12%" }}>
          <CreaditCard />
        </View>

        <View
          style={{
            width: "80%",
            alignItems: "flex-start",
          }}
        >
          <Text
            style={[
              FontStyle.urbanistMedium,
              styles.headingTxt,
              { fontSize: 15 },
            ]}
          >
            {item.brand} {item.last4}
          </Text>
          <TouchableOpacity
            onPress={() => {
              replace("AddPaymentCard", {
                id: _.get(item, "id", null),
                checkout: true,
              });
            }}
          >
            <Text
              style={[
                FontStyle.urbanistMedium,
                styles.profileDescTxt,
                { color: Colors.yellow },
              ]}
            >
              Update card
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            setCardId(item.id),
              navigate("Checkout", {
                rentalCarObj: { ...rentalCarObj, ...{ paymentObj: item } },
              });
          }}
        >
          <RadioView isCheck={cardId === item.id} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  const LoadingView = () => {
    return (
      <ScrollView
        style={{ backgroundColor: Colors.darkBlack, flex: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refreshControl}
            tintColor={Variables.Colors.white}
          />
        }
      >
        <View style={{ width: Variables.Measures.width }}>
          <ContentLoader
            backgroundColor={Variables.Colors.absoluteBgGrey}
            foregroundColor={Variables.Colors.grey}
            height={Variables.FontSize.large * 2.5}
          >
            <Circle cx="35" cy="50" r="14" />
            <Rect
              x="15"
              y="80"
              rx="4"
              ry="4"
              width={Variables.Measures.width / 2}
              height="20"
            />
          </ContentLoader>
        </View>

        <View style={{ marginTop: Variables.MetricsSizes.tiny }} />

        <ContentLoader
          backgroundColor={Variables.Colors.absoluteBgGrey}
          foregroundColor={Variables.Colors.grey}
          height={Variables.FontSize.large * 2.2}
        >
          <Rect
            x="15"
            y="40"
            rx="4"
            ry="4"
            width={Variables.MetricsSizes.small * 3}
            height="22.5"
          />

          <Rect
            x="65"
            y="30"
            rx="4"
            ry="4"
            width={Variables.FontSize.large * 2}
            height="20"
          />

          <Rect
            x="65"
            y="60"
            rx="4"
            ry="4"
            width={Variables.FontSize.large * 2}
            height="15"
          />
          <Circle cx={Variables.Measures.width / 1.11} cy="55" r="12" />

          <Rect x="0" y="85" rx="4" ry="4" width="100%" height="2" />
        </ContentLoader>
        <View style={{ marginTop: Variables.MetricsSizes.tiny }} />

        <ContentLoader
          backgroundColor={Variables.Colors.absoluteBgGrey}
          foregroundColor={Variables.Colors.grey}
          height={Variables.FontSize.large * 2.2}
        >
          <Rect
            x="15"
            y="40"
            rx="4"
            ry="4"
            width={Variables.MetricsSizes.small * 3}
            height="22.5"
          />

          <Rect
            x="65"
            y="30"
            rx="4"
            ry="4"
            width={Variables.FontSize.large * 2}
            height="20"
          />

          <Rect
            x="65"
            y="60"
            rx="4"
            ry="4"
            width={Variables.FontSize.large * 2}
            height="15"
          />
          <Circle cx={Variables.Measures.width / 1.11} cy="55" r="12" />

          <Rect x="0" y="85" rx="4" ry="4" width="100%" height="2" />
        </ContentLoader>
      </ScrollView>
    );
  };
  return !saveCardList || isLoading ? (
    <LoadingView />
  ) : (
    <SafeAreaView style={CommonStyles.safeAreaStyle}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.blackBg} />
      <Header
        leftSvg={<CloseSvg height={25} width={25} />}
        onLeftPress={goBack}
      />
      <ScrollView
        nestedScrollEnabled
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refreshControl}
            tintColor={Variables.Colors.white}
          />
        }
      >
        <Text
          style={[
            FontStyle.urbanistBold,
            styles.headingTxt,
            { marginBottom: 40, paddingHorizontal: 15, fontSize: 24 },
          ]}
        >
          Payment method
        </Text>
        <View style={styles.flatListView}>
          <FlatList
            data={_.get(saveCardList, "items", null)}
            renderItem={({ item }) => cardItem(item)}
          />
        </View>
      </ScrollView>
      <View style={styles.absoluteView}>
        <View style={styles.infoTxtView}>
          <Lock />
          <Text style={[FontStyle.urbanistMedium, styles.infoTxt]}>
            Your information is stored securely
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flatListView: {
    width: "100%",
    alignSelf: "center",
    paddingBottom: 40,
  },

  absoluteView: {
    position: "absolute",
    bottom: 0,
    width: Variables.Measures.width,
    height: Variables.FontSize.large,
  },
  infoTxtView: {
    flexDirection: "row",
    alignSelf: "center",
    justifyContent: "center",
  },
  infoTxt: {
    fontSize: 12,
    color: Variables.Colors.white,
    textAlignVertical: "center",
  },
  inputTitleTxt: {
    color: Variables.Colors.inputTxtColor,
    fontSize: 12,
    marginTop: Variables.Measures.fontSize / 1.3,
  },
  cardView: {
    flexDirection: "row",
    height: 60,
    alignItems: "center",
    borderBottomColor: Colors.chocolate,
    borderWidth: 0.5,
    paddingHorizontal: 15,
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
    width: "93%",
    alignSelf: "center",
    justifyContent: "space-between",
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.grey,
    height: 50,
    alignItems: "center",
  },
});

export default PaymentMethodCard;

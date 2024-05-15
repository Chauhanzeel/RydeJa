import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { useTranslation } from "react-i18next";
import {
  Variables,
  FontStyle,
  Layout,
  Images,
  CommonStyles,
} from "../../Theme";

import { WalletData } from "../MockData/WalletData";

import Header from "../../components/Header";

import BackSvg from "../../assets/Images/BackArrow.svg";
import TopUp from "../../assets/Images/incomingBlue.svg";
import UpRed from "../../assets/Images/OutgoingRed.svg";
import { useDispatch, useSelector } from "react-redux";
import { ReducerStateProps } from "../Inbox/InterfaceProps";
import _ from "lodash";
import moment from "moment";
import { goBack } from "../../navigators/RootNavigation";
import FastImageView from "../../components/FastImageView";

interface CancelProps {
  onClick: (val: number) => void;
}

const Transactions: React.FC<CancelProps> = ({ onClick }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [transactionListData] = useSelector((state: ReducerStateProps) => [
    state.carOwner.transactionListData,
  ]);

  const renderWalletData = (item: any) => {
    return (
      <View
        style={styles.outerView}
        // onPress={() => navigate("Ereceipt")}
      >
        <View style={styles.leftUserImg}>
          {_.get(item, "payer", null) ? (
            <>
              {_.get(item, "payer.profilePicture", null) ? (
                <Image
                  source={{ uri: _.get(item, "payer.profilePicture", null) }}
                  style={{ height: "100%", width: "100%", borderRadius: 7 }}
                  resizeMode="contain"
                />
              ) : (
                <Image
                  source={Images.userPlaceholder}
                  style={{ height: "100%", width: "100%", borderRadius: 7 }}
                  resizeMode="contain"
                />
              )}
            </>
          ) : (
            <>
              {_.get(item, "receiver.profilePicture", null) ? (
                <Image
                  source={{ uri: _.get(item, "receiver.profilePicture", null) }}
                  style={{ height: "100%", width: "100%", borderRadius: 7 }}
                  resizeMode="contain"
                />
              ) : (
                <Image
                  source={Images.userPlaceholder}
                  style={{ height: "100%", width: "100%", borderRadius: 7 }}
                  resizeMode="contain"
                />
              )}
            </>
          )}
        </View>
        <View style={styles.centerUserName}>
          {_.get(item, "payer", null) ? (
            <Text
              style={[FontStyle.urbanistBold, styles.userNameTxt]}
              numberOfLines={1}
            >
              {_.get(item, "payer.fullName", null)}
            </Text>
          ) : (
            <Text
              style={[FontStyle.urbanistBold, styles.userNameTxt]}
              numberOfLines={1}
            >
              {_.get(item, "receiver.fullName", null)}
            </Text>
          )}
          <View style={[Layout.row, { marginTop: 5 }]}>
            <View style={styles.outerListView}>
              <Text
                style={[
                  styles.dateTxt,
                  FontStyle.urbanistMedium,
                  { marginRight: 5 },
                ]}
              >
                {moment(_.get(item, "date", null)).format("MMM DD, YYYY")}
              </Text>
            </View>
            <Text
              style={[
                styles.dateTxt,
                FontStyle.urbanistMedium,
                { marginLeft: 10, marginTop: 4 },
              ]}
            >
              {moment(_.get(item, "date", null)).format("hh:mm A")}
            </Text>
          </View>
        </View>
        <View style={styles.rightAmountView}>
          <Text style={[FontStyle.urbanistBold, styles.userNameTxt]}>
            ${_.get(item, "amount", null)}
          </Text>
          <View style={styles.rowView}>
            <Text style={[FontStyle.urbanistMedium, styles.dateTxt]}>
              {_.get(item, "type", null)}
            </Text>
            <View style={{ marginLeft: 5, marginTop: 5 }}>
              {_.get(item, "type", null) == "Top Up" ||
              _.get(item, "type", null) == "credit" ? (
                <TopUp />
              ) : (
                <UpRed />
              )}
            </View>
          </View>
        </View>
      </View>
    );
  };

  const renderWalletData1 = (item: any) => {
    return (
      <View
        style={styles.outerView}
        // onPress={() => navigate("Ereceipt")}
      >
        <View style={styles.leftUserImg}>
          {_.get(item, "payer", null) ? (
            <>
              {_.get(item, "payer.profilePicture", null) ? (
                <FastImageView
                  source={{ uri: _.get(item, "payer.profilePicture", null) }}
                  style={{ height: "100%", width: "100%", borderRadius: 7 }}
                />
              ) : (
                <Image
                  source={Images.userPlaceholder}
                  style={{ height: "100%", width: "100%", borderRadius: 7 }}
                />
              )}
            </>
          ) : (
            <>
              {_.get(item, "receiver.profilePicture", null) ? (
                <FastImageView
                  source={{ uri: _.get(item, "receiver.profilePicture", null) }}
                  style={{ height: "100%", width: "100%", borderRadius: 7 }}
                />
              ) : (
                <Image
                  source={Images.userPlaceholder}
                  style={{ height: "100%", width: "100%", borderRadius: 7 }}
                  resizeMode="contain"
                />
              )}
            </>
          )}
        </View>
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            width: "80%",
          }}
        >
          <View style={styles.centerUserName}>
            {_.get(item, "payer", null) ? (
              <Text
                style={[FontStyle.urbanistBold, CommonStyles.smallCommonTxt]}
              >
                {_.get(item, "payer.fullName", null)}
              </Text>
            ) : (
              <Text
                style={[FontStyle.urbanistBold, CommonStyles.smallCommonTxt]}
              >
                {_.get(item, "receiver.fullName", null)}
              </Text>
            )}
            <View style={[Layout.row, { marginTop: 5 }]}>
              <Text
                style={[
                  styles.dateTxt,
                  FontStyle.urbanistMedium,
                  { marginRight: 5 },
                ]}
              >
                {moment(_.get(item, "date", null)).format(
                  "MMM DD, YYYY | hh:mm A"
                )}
              </Text>
            </View>
          </View>
          <View style={styles.rightAmountView}>
            <Text style={[FontStyle.urbanistBold, styles.amountTxt]}>
              ${_.get(item, "amount", null)}
            </Text>
            <View style={styles.rowView}>
              <Text style={[FontStyle.urbanistMedium, styles.typeTxt]}>
                {_.get(item, "type", null)}
              </Text>
              <View style={{ marginLeft: 5, marginTop: 5 }}>
                {_.get(item, "type", null) == "Top Up" ||
                _.get(item, "type", null) == "credit" ? (
                  <TopUp />
                ) : (
                  <UpRed />
                )}
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={{ height: "100%" }}>
      <Header
        centerText="Transaction History"
        leftSvg={<BackSvg height={25} width={25} />}
        onLeftPress={() => onClick(0)}
      />
      <View style={{ marginBottom: 50 }}>
        <FlatList
          data={_.get(transactionListData, "items", null) || []}
          renderItem={({ item }) => renderWalletData1(item)}
          style={styles.flatListView}
          ListEmptyComponent={() => (
            <View style={styles.fl}>
              <Text style={[FontStyle.urbanistSemiBold, styles.tripsTxt]}>
                No Transactions found.
              </Text>
            </View>
          )}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  typeTxt: {
    color: Variables.Colors.locationGrey,
    fontSize: Variables.Measures.fontSize / 1.7,
  },
  amountTxt: {
    color: Variables.Colors.white,
    fontSize: Variables.Measures.fontSize / 1.2,
  },
  fl: {
    width: "100%",
    height: Variables.Measures.height / 1.4,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  flatListView: {
    width: "93%",
    alignSelf: "center",
  },
  // leftUserImg: {
  //   width: "20%",
  //   justifyContent: "center",
  //   height: Variables.MetricsSizes.large * 2 + Variables.MetricsSizes.tiny,
  // },
  leftUserImg: {
    width: "20%",
    justifyContent: "center",
    height: "100%",
  },
  // centerUserName: {
  //   width: "55%",
  //   justifyContent: "center",
  //   marginLeft: Variables.FontSize.small,
  // },

  centerUserName: {
    width: "70%",
    justifyContent: "center",
    paddingLeft: Variables.FontSize.regular,
  },
  // rightAmountView: {
  //   width: "20%",
  //   justifyContent: "center",
  //   alignItems: "flex-end",
  // },
  rightAmountView: {
    width: "30%",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  userNameTxt: {
    color: Variables.Colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  dateTxt: {
    color: Variables.Colors.locationGrey,
    fontSize: 14,
    letterSpacing: 0.2,
  },
  outerListView: {
    marginTop: 4,
    borderEndColor: Variables.Colors.locationGrey,
    borderEndWidth: 1,
    width: "45%",
  },
  // outerView: {
  //   flexDirection: "row",
  //   width: Variables.Measures.width / 1.1,
  //   marginTop: Variables.Measures.fontSize,
  //   justifyContent: "space-between",
  //   height: Variables.MetricsSizes.large * 2 + Variables.MetricsSizes.tiny,
  // },
  outerView: {
    flexDirection: "row",
    width: "100%",
    marginTop: Variables.FontSize.regular,
    height: Variables.MetricsSizes.large * 2 + Variables.MetricsSizes.tiny,
  },

  rowView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
  },
  tripsTxt: {
    color: Variables.Colors.white,
    fontSize: 22,
  },
});

export default Transactions;

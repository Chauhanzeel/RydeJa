import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  RefreshControl,
} from "react-native";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";

import { CommonStyles, FontStyle, Layout, Variables } from "../../Theme";

import LeftSvg from "../../assets/Images/BackArrow.svg";
import { featuresData } from "../MockData/features";
import ButtonView from "../../components/ButtonView";
import { goBack, navigate } from "../../navigators/RootNavigation";
import { useSelector, useDispatch } from "react-redux";
import { ReducerStateProps } from "../Inbox/InterfaceProps";
import _ from "lodash";
import { featuresListStart } from "../../actions/carOwnerActions";
import AsyncStorageHelper from "../../components/AsyncStorageHelper";
import Favorites from "../Bookings/favorites";
import FastImageView from "../../components/FastImageView";
import Header from "../../components/Header";
import BackSvg from "../../assets/Images/BackArrow.svg";
import ContentLoader, { Rect, Circle } from "react-content-loader/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ToastMessage from "../../components/ToastMessage";
import { toastConst } from "../../constants/constants";
import { RouteProp } from "@react-navigation/native";

interface CancelProps {
  route?: RouteProp<any, any>;
}

const CarFeatures: React.FC<CancelProps> = ({ route }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const details = route?.params?.details;

  const [isLoading, featuresListData, ownerCarViewData] = useSelector(
    (state: ReducerStateProps) => [
      state.carOwner.isLoading,
      state.carOwner.featuresListData,
      state.carOwner.ownerCarViewData,
    ]
  );
  const [refreshing, setRefreshing] = useState(false);
  const [selectedId, setSelectedId] = useState([]);

  useEffect(() => {
    if (ownerCarViewData) {
      const id = _.get(ownerCarViewData, "carFeature", []).map(
        (item: { id: any }) => item.id
      );
      setSelectedId(id);
    }
  }, []);

  useEffect(() => {
    if (!isLoading) {
      setRefreshing(false);
    }
  }, [isLoading]);

  useEffect(() => {
    dispatch(featuresListStart());
  }, []);

  const onRefresh = () => {
    dispatch(featuresListStart());
    setRefreshing(true);
  };

  const handleSelection = (id: any) => {
    let selectedIds = [...selectedId];
    if (selectedIds.includes(id)) {
      let temp = selectedIds.filter((list) => {
        return list !== id;
      });
      setSelectedId(temp);
    } else {
      selectedIds.push(id);
      setSelectedId(selectedIds);
    }
  };

  const renderFeaturesdata = (item: any, i: any) => {
    return (
      <View style={styles.itemView}>
        <TouchableOpacity
          style={styles.featuresOuterView}
          onPress={() => handleSelection(item.id)}
        >
          {_.get(item, "icon", null) && (
            <FastImageView
              source={{ uri: _.get(item, "icon", null) }}
              style={{ width: "20%", height: 50 }}
              resizeMode={"contain"}
            />
          )}
          {_.get(item, "name", null) && (
            <View style={{ width: "55%", marginLeft: 10 }}>
              <Text
                style={[
                  FontStyle.urbanistMedium,
                  CommonStyles.descCommonTxt,
                  selectedId.includes(item.id)
                    ? styles.selectedFeatureTxt
                    : styles.featureTxt,
                ]}
              >
                {_.get(item, "name", null)}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  const storeData = async () => {
    if (_.size(selectedId) > 0) {
      const existingData = await AsyncStorage.getItem("carDetails");
      const parsedData = JSON.parse(existingData);
      parsedData.carFeatures = selectedId;
      await AsyncStorage.setItem("carDetails", JSON.stringify(parsedData));
      navigate("CarInformation");
    } else {
      ToastMessage.set(
        toastConst.errorToast,
        "Please select your car features."
      );
    }
  };

  const LoadingView = () => {
    return (
      <SafeAreaView style={styles.safeAreaStyle}>
        <StatusBar
          backgroundColor={Variables.Colors.blackBg}
          barStyle="light-content"
        />
        <ScrollView
          style={{
            height: Variables.Measures.height,
            marginTop: 10,
          }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={Variables.Colors.white}
            />
          }
        >
          <ContentLoader
            backgroundColor={Variables.Colors.absoluteBgGrey}
            foregroundColor={Variables.Colors.grey}
            height={80}
          >
            <Rect x="15" y="20" rx="4" ry="4" width="30" height="30" />
            <Rect x="65" y="20" rx="4" ry="4" width="150" height="30" />
          </ContentLoader>

          <ContentLoader
            backgroundColor={Variables.Colors.absoluteBgGrey}
            foregroundColor={Variables.Colors.grey}
            width={Variables.Measures.width}
            height={Variables.MetricsSizes.large}
          >
            <Rect
              x="15"
              y="0"
              rx="4"
              ry="4"
              width={Variables.Measures.width / 1.3}
              height={Variables.MetricsSizes.large}
            />
          </ContentLoader>

          <View style={{ marginTop: 15 }} />

          <View
            style={{
              width: "92%",
              justifyContent: "space-between",
              flexDirection: "row",
              alignSelf: "center",
            }}
          >
            <ContentLoader
              backgroundColor={Variables.Colors.absoluteBgGrey}
              foregroundColor={Variables.Colors.grey}
              width="49%"
              height={Variables.FontSize.small * 5}
            >
              <Rect
                x="0"
                y="0"
                rx="4"
                ry="4"
                width={Variables.Measures.width / 2.25}
                height={Variables.FontSize.small * 5}
              />
            </ContentLoader>
            <ContentLoader
              backgroundColor={Variables.Colors.absoluteBgGrey}
              foregroundColor={Variables.Colors.grey}
              width="49%"
              height={Variables.FontSize.small * 5}
            >
              <Rect
                x="0"
                y="0"
                rx="4"
                ry="4"
                width={Variables.Measures.width / 2.25}
                height={Variables.FontSize.small * 5}
              />
            </ContentLoader>
          </View>
          <View
            style={{
              width: "92%",
              justifyContent: "space-between",
              flexDirection: "row",
              alignSelf: "center",
              marginVertical: Variables.FontSize.small,
            }}
          >
            <ContentLoader
              backgroundColor={Variables.Colors.absoluteBgGrey}
              foregroundColor={Variables.Colors.grey}
              width="49%"
              height={Variables.FontSize.small * 5}
            >
              <Rect
                x="0"
                y="0"
                rx="4"
                ry="4"
                width={Variables.Measures.width / 2.25}
                height={Variables.FontSize.small * 5}
              />
            </ContentLoader>
            <ContentLoader
              backgroundColor={Variables.Colors.absoluteBgGrey}
              foregroundColor={Variables.Colors.grey}
              width="49%"
              height={Variables.FontSize.small * 5}
            >
              <Rect
                x="0"
                y="0"
                rx="4"
                ry="4"
                width={Variables.Measures.width / 2.25}
                height={Variables.FontSize.small * 5}
              />
            </ContentLoader>
          </View>
          <View
            style={{
              width: "92%",
              justifyContent: "space-between",
              flexDirection: "row",
              alignSelf: "center",
              marginBottom: Variables.FontSize.small,
            }}
          >
            <ContentLoader
              backgroundColor={Variables.Colors.absoluteBgGrey}
              foregroundColor={Variables.Colors.grey}
              width="49%"
              height={Variables.FontSize.small * 5}
            >
              <Rect
                x="0"
                y="0"
                rx="4"
                ry="4"
                width={Variables.Measures.width / 2.25}
                height={Variables.FontSize.small * 5}
              />
            </ContentLoader>
            <ContentLoader
              backgroundColor={Variables.Colors.absoluteBgGrey}
              foregroundColor={Variables.Colors.grey}
              width="49%"
              height={Variables.FontSize.small * 5}
            >
              <Rect
                x="0"
                y="0"
                rx="4"
                ry="4"
                width={Variables.Measures.width / 2.25}
                height={Variables.FontSize.small * 5}
              />
            </ContentLoader>
          </View>
          <View
            style={{
              width: "92%",
              justifyContent: "space-between",
              flexDirection: "row",
              alignSelf: "center",
              marginBottom: Variables.FontSize.small,
            }}
          >
            <ContentLoader
              backgroundColor={Variables.Colors.absoluteBgGrey}
              foregroundColor={Variables.Colors.grey}
              width="49%"
              height={Variables.FontSize.small * 5}
            >
              <Rect
                x="0"
                y="0"
                rx="4"
                ry="4"
                width={Variables.Measures.width / 2.25}
                height={Variables.FontSize.small * 5}
              />
            </ContentLoader>
            <ContentLoader
              backgroundColor={Variables.Colors.absoluteBgGrey}
              foregroundColor={Variables.Colors.grey}
              width="49%"
              height={Variables.FontSize.small * 5}
            >
              <Rect
                x="0"
                y="0"
                rx="4"
                ry="4"
                width={Variables.Measures.width / 2.25}
                height={Variables.FontSize.small * 5}
              />
            </ContentLoader>
          </View>
        </ScrollView>
        <View
          style={{
            position: "absolute",
            bottom: 30,
            alignSelf: "center",
          }}
        >
          <ContentLoader
            backgroundColor={Variables.Colors.absoluteBgGrey}
            foregroundColor={Variables.Colors.grey}
            width={Variables.Measures.width / 1.12}
            height={Variables.MetricsSizes.small * 6}
          >
            <Rect
              x="0"
              y="0"
              rx="4"
              ry="4"
              width={Variables.Measures.width / 1.12}
              height={Variables.MetricsSizes.small * 6}
            />
          </ContentLoader>
        </View>
      </SafeAreaView>
    );
  };
  const LoadingView1 = () => {
    return (
      <ScrollView
        style={{
          height: Variables.Measures.height,
          marginTop: 10,
        }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Variables.Colors.white}
          />
        }
      >
        <View style={{ marginTop: 15 }} />

        <View style={styles.lv1}>
          <ContentLoader
            backgroundColor={Variables.Colors.absoluteBgGrey}
            foregroundColor={Variables.Colors.grey}
            width="49%"
            height={Variables.FontSize.small * 5}
          >
            <Rect
              x="0"
              y="0"
              rx="4"
              ry="4"
              width={Variables.Measures.width / 2.25}
              height={Variables.FontSize.small * 5}
            />
          </ContentLoader>
          <ContentLoader
            backgroundColor={Variables.Colors.absoluteBgGrey}
            foregroundColor={Variables.Colors.grey}
            width="49%"
            height={Variables.FontSize.small * 5}
          >
            <Rect
              x="0"
              y="0"
              rx="4"
              ry="4"
              width={Variables.Measures.width / 2.25}
              height={Variables.FontSize.small * 5}
            />
          </ContentLoader>
        </View>
        <View
          style={{
            width: "92%",
            justifyContent: "space-between",
            flexDirection: "row",
            alignSelf: "center",
            marginVertical: Variables.FontSize.small,
          }}
        >
          <ContentLoader
            backgroundColor={Variables.Colors.absoluteBgGrey}
            foregroundColor={Variables.Colors.grey}
            width="49%"
            height={Variables.FontSize.small * 5}
          >
            <Rect
              x="0"
              y="0"
              rx="4"
              ry="4"
              width={Variables.Measures.width / 2.25}
              height={Variables.FontSize.small * 5}
            />
          </ContentLoader>
          <ContentLoader
            backgroundColor={Variables.Colors.absoluteBgGrey}
            foregroundColor={Variables.Colors.grey}
            width="49%"
            height={Variables.FontSize.small * 5}
          >
            <Rect
              x="0"
              y="0"
              rx="4"
              ry="4"
              width={Variables.Measures.width / 2.25}
              height={Variables.FontSize.small * 5}
            />
          </ContentLoader>
        </View>
        <View
          style={{
            width: "92%",
            justifyContent: "space-between",
            flexDirection: "row",
            alignSelf: "center",
            marginBottom: Variables.FontSize.small,
          }}
        >
          <ContentLoader
            backgroundColor={Variables.Colors.absoluteBgGrey}
            foregroundColor={Variables.Colors.grey}
            width="49%"
            height={Variables.FontSize.small * 5}
          >
            <Rect
              x="0"
              y="0"
              rx="4"
              ry="4"
              width={Variables.Measures.width / 2.25}
              height={Variables.FontSize.small * 5}
            />
          </ContentLoader>
          <ContentLoader
            backgroundColor={Variables.Colors.absoluteBgGrey}
            foregroundColor={Variables.Colors.grey}
            width="49%"
            height={Variables.FontSize.small * 5}
          >
            <Rect
              x="0"
              y="0"
              rx="4"
              ry="4"
              width={Variables.Measures.width / 2.25}
              height={Variables.FontSize.small * 5}
            />
          </ContentLoader>
        </View>
        <View
          style={{
            width: "92%",
            justifyContent: "space-between",
            flexDirection: "row",
            alignSelf: "center",
            marginBottom: Variables.FontSize.small,
          }}
        >
          <ContentLoader
            backgroundColor={Variables.Colors.absoluteBgGrey}
            foregroundColor={Variables.Colors.grey}
            width="49%"
            height={Variables.FontSize.small * 5}
          >
            <Rect
              x="0"
              y="0"
              rx="4"
              ry="4"
              width={Variables.Measures.width / 2.25}
              height={Variables.FontSize.small * 5}
            />
          </ContentLoader>
          <ContentLoader
            backgroundColor={Variables.Colors.absoluteBgGrey}
            foregroundColor={Variables.Colors.grey}
            width="49%"
            height={Variables.FontSize.small * 5}
          >
            <Rect
              x="0"
              y="0"
              rx="4"
              ry="4"
              width={Variables.Measures.width / 2.25}
              height={Variables.FontSize.small * 5}
            />
          </ContentLoader>
        </View>
      </ScrollView>
    );
  };

  return !featuresListData ? (
    <LoadingView />
  ) : (
    <SafeAreaView style={styles.safeAreaStyle}>
      <StatusBar translucent backgroundColor="transparent" />
      <ScrollView
        style={{ flex: 1 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Variables.Colors.white}
          />
        }
      >
        <View style={{ flex: 1 }}>
          <Header
            centerText={"Car Features"}
            leftSvg={<BackSvg height={25} width={25} />}
            onLeftPress={() =>
              // onClick(25, 4)
              goBack()
            }
          />
          <View style={styles.featuresView}>
            <Text
              style={[
                FontStyle.urbanistBold,
                styles.questionTxt,
                CommonStyles.smallCommonTxt,
              ]}
            >
              What features make your this Ryde great?
            </Text>
            {!isLoading ? (
              <>
                {_.size(_.get(featuresListData, "items", null)) > 0 && (
                  <View
                    style={{
                      marginTop: Variables.Measures.fontSize * 1.5,
                      marginBottom: Variables.Measures.fontSize,
                    }}
                  >
                    <FlatList
                      data={_.get(featuresListData, "items", null) || []}
                      renderItem={({ item, i }: any) =>
                        renderFeaturesdata(item, i)
                      }
                      numColumns={2}
                      nestedScrollEnabled
                    />
                  </View>
                )}
              </>
            ) : (
              <LoadingView1 />
            )}
          </View>
        </View>
      </ScrollView>
      <View style={{ marginBottom: 20 }}>
        <ButtonView
          btnTxt={t("labelConst.continueTxt")}
          onBtnPress={() => {
            storeData();
          }}
          width={Variables.Measures.width / 1.09}
          backgroundColor={Variables.Colors.yellow}
          fontColor={Variables.Colors.darkBlack}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  lv1: {
    width: "92%",
    justifyContent: "space-between",
    flexDirection: "row",
    alignSelf: "center",
  },
  itemView: {
    flex: 1,
    marginHorizontal: 5,
    marginVertical: 5,
  },
  featuresOuterView: {
    justifyContent: "center",
    alignItems: "center",
    height: 75,
    backgroundColor: Variables.Colors.carGrey,
    borderRadius: 5,
    flexDirection: "row",
  },

  selectedFeatureTxt: {
    color: Variables.Colors.darkYellow,
  },
  headerTxt: {
    color: Variables.Colors.white,
    fontSize: 24,
  },
  headerOuterView: {
    height: 60,
    flexDirection: "row",
    width: "90%",
    alignSelf: "center",
    alignItems: "center",
  },
  headerLeftView: {
    width: "10%",
    justifyContent: "center",
  },
  rowView: {
    flexDirection: "row",
    marginTop: 18,
    alignItems: "center",
    justifyContent: "space-between",
  },
  featuresView: {
    width: "95%",
    alignSelf: "center",
  },
  featureTxt: {
    color: Variables.Colors.white,
  },
  safeAreaStyle: {
    flex: 1,
    backgroundColor: Variables.Colors.darkBlack,
  },
  questionTxt: {
    color: Variables.Colors.white,
    fontSize: 16,
    marginVertical: 10,
    paddingHorizontal: 5,
  },
});
export default CarFeatures;

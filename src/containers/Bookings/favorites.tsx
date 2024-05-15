import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  RefreshControl,
} from "react-native";
import { useTranslation } from "react-i18next";
import Header from "../../components/Header";
import { CommonStyles, FontStyle, Variables } from "../../Theme";
import BackSvg from "../../assets/Images/BackArrow.svg";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import {
  favouriteCarAddStart,
  favouriteCarListStart,
  favouriteCarRemoveStart,
} from "../../actions/customerActions";
import ParishModal from "../../components/ParishModal";
import ContentLoader, { Rect, Circle } from "react-content-loader/native";
import { ReducerStateProps } from "../Inbox/InterfaceProps";
import { Measures } from "../../Theme/variables";
import FilterView from "../../components/FilterView";
import CarCardView from "../../components/CarCardView";

interface FavoritesProps {
  onClick: (val: number) => void;
}

const Favorites: React.FC<FavoritesProps> = ({ onClick }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [searchModal, setSearchModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [showButton, setShowButton] = useState(true);

  const [isLoading, favouriteCarListData, favouriteCarRemoveData, loginData] =
    useSelector((state: ReducerStateProps) => [
      state.customer.isLoading,
      state.customer.favouriteCarListData,
      state.customer.favouriteCarRemoveData,
      state.auth.loginData,
    ]);

  useEffect(() => {
    if (favouriteCarListData) {
      setDataList(_.get(favouriteCarListData, "items", null));
    }
  }, [_.size(_.get(favouriteCarListData, "items", null))]);

  useEffect(() => {
    if (!isLoading) {
      setRefreshing(false);
    }
  }, [isLoading]);

  useEffect(() => {
    if (loginData) {
      dispatch(favouriteCarListStart());
    }
  }, [loginData, favouriteCarRemoveData]);

  const toggleFavorite = (res: any) => {
    const updatedItems = _.map(dataList, (item) =>
      item.id === res?.id ? { ...item, isFavourite: !item.isFavourite } : item
    );
    setDataList(updatedItems);

    let params = {
      car: res?.id,
    };
    if (res.isFavourite) {
      dispatch(favouriteCarRemoveStart(params));
    } else {
      dispatch(favouriteCarAddStart(params));
    }
  };

  const onRefresh = () => {
    if (loginData) {
      setRefreshing(true);
      dispatch(favouriteCarListStart());
    } else {
      setRefreshing(false);
    }
  };

  const LoadingView = () => {
    return (
      <SafeAreaView style={styles.safeAreaStyle}>
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
          style={{
            height: Variables.Measures.height,
          }}
        >
          <View
            style={{
              width: Variables.Measures.width,
              height: 60,
              marginTop: Variables.FontSize.regular,
            }}
          >
            <ContentLoader
              backgroundColor={Variables.Colors.absoluteBgGrey}
              foregroundColor={Variables.Colors.grey}
            >
              <Rect x="15" y="0" rx="4" ry="4" width="40" height="30" />
              <Rect x="70" y="0" rx="4" ry="4" width="150" height="30" />
            </ContentLoader>
          </View>

          <ContentLoader
            backgroundColor={Variables.Colors.absoluteBgGrey}
            foregroundColor={Variables.Colors.grey}
            width={Variables.Measures.width}
            height={Variables.Measures.width / 1.9}
          >
            <Rect
              x="10"
              y="0"
              rx="4"
              ry="4"
              width={Variables.Measures.width / 1.06}
              height={Variables.Measures.width / 1.9}
            />
            <Rect
              x="10"
              y={Variables.Measures.width / 3}
              rx="4"
              ry="4"
              width={Variables.Measures.width / 1.06}
              height={3}
            />
            <Rect
              x="30"
              y={Variables.Measures.width / 2.5}
              rx="4"
              ry="4"
              width={Variables.Measures.width / 4.5}
              height={8}
            />

            <Rect
              x="30"
              y={Variables.Measures.width / 2.2}
              rx="4"
              ry="4"
              width={Variables.Measures.width / 4}
              height={8}
            />

            <Rect
              x={Variables.Measures.width / 2.3}
              y={Variables.Measures.width / 3}
              rx="4"
              ry="4"
              width={2}
              height={Variables.Measures.width / 2.5}
            />

            <Rect
              x={Variables.Measures.width / 2.1}
              y={Variables.Measures.width / 2.4}
              rx="4"
              ry="4"
              width={Variables.Measures.width / 4}
              height={8}
            />

            <Rect
              x={Variables.Measures.width / 1.3}
              y={Variables.Measures.width / 3}
              rx="4"
              ry="4"
              width={2}
              height={Variables.Measures.width / 2.5}
            />

            <Circle
              cx={Variables.Measures.width / 1.15}
              cy={Variables.Measures.width / 2.3}
              r="12"
            />
          </ContentLoader>

          <View style={{ marginTop: 15 }} />

          <ContentLoader
            backgroundColor={Variables.Colors.absoluteBgGrey}
            foregroundColor={Variables.Colors.grey}
            width={Variables.Measures.width}
            height={Variables.Measures.width / 1.9}
          >
            <Rect
              x="10"
              y="0"
              rx="4"
              ry="4"
              width={Variables.Measures.width / 1.06}
              height={Variables.Measures.width / 1.9}
            />
            <Rect
              x="10"
              y={Variables.Measures.width / 3}
              rx="4"
              ry="4"
              width={Variables.Measures.width / 1.06}
              height={3}
            />
            <Rect
              x="30"
              y={Variables.Measures.width / 2.5}
              rx="4"
              ry="4"
              width={Variables.Measures.width / 4.5}
              height={8}
            />

            <Rect
              x="30"
              y={Variables.Measures.width / 2.2}
              rx="4"
              ry="4"
              width={Variables.Measures.width / 4}
              height={8}
            />

            <Rect
              x={Variables.Measures.width / 2.3}
              y={Variables.Measures.width / 3}
              rx="4"
              ry="4"
              width={2}
              height={Variables.Measures.width / 2.5}
            />

            <Rect
              x={Variables.Measures.width / 2.1}
              y={Variables.Measures.width / 2.4}
              rx="4"
              ry="4"
              width={Variables.Measures.width / 4}
              height={8}
            />

            <Rect
              x={Variables.Measures.width / 1.3}
              y={Variables.Measures.width / 3}
              rx="4"
              ry="4"
              width={2}
              height={Variables.Measures.width / 2.5}
            />

            <Circle
              cx={Variables.Measures.width / 1.15}
              cy={Variables.Measures.width / 2.3}
              r="12"
            />
          </ContentLoader>
        </ScrollView>
      </SafeAreaView>
    );
  };

  return !favouriteCarListData && loginData ? (
    <LoadingView />
  ) : (
    <SafeAreaView style={styles.safeAreaStyle}>
      <StatusBar
        backgroundColor={Variables.Colors.blackBg}
        barStyle="light-content"
        animated={true}
        translucent
      />
      <Header
        centerText={t("labelConst.favorites")}
        leftSvg={<BackSvg height={25} width={25} />}
        onLeftPress={() => onClick(0)}
      />
      <ParishModal
        modalVisible={searchModal}
        onDismiss={() => setSearchModal(false)}
        filterPlug={true}
      />

      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={Variables.Colors.white}
          />
        }
        onTouchEnd={() => setShowButton(false)}
        removeClippedSubviews={true}
        onScroll={() => setShowButton(true)}
        onEndReached={() => setShowButton(false)}
        refreshing={refreshing}
        onRefresh={onRefresh}
        initialNumToRender={5}
        data={dataList || []}
        renderItem={({ item, index }: any) => (
          <CarCardView
            carItem={item?.car}
            index={index}
            toggleFavorite={(item) => toggleFavorite(item)}
          />
        )}
        ListEmptyComponent={() => (
          <View style={styles.noCar}>
            <Text
              style={[FontStyle.urbanistSemiBold, CommonStyles.titleCommonTxt]}
            >
              No Favourite car's found.
            </Text>
          </View>
        )}
      />

      {!isLoading ? (
        <>
          {_.get(favouriteCarListData, "totalCount", null) > 0 && showButton ? (
            <FilterView
              count={_.size(_.get(favouriteCarListData, "items", null))}
              setSearchModal={() => setSearchModal(true)}
            />
          ) : null}
        </>
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  favBtn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  avgTxt: {
    color: Variables.Colors.white,
    fontSize: 12,
    marginLeft: 2,
  },
  ratingView: {
    width: "30%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  nameTxt: {
    fontSize: 12,
    color: Variables.Colors.white,
    marginBottom: 3,
  },
  noCar: {
    width: "100%",
    height: Measures.height / 1.5,
    justifyContent: "center",
    alignItems: "center",
  },
  tripsTxt: {
    color: Variables.Colors.white,
    fontSize: 22,
  },
  ownerNameTxt: {
    fontSize: 11,
    color: Variables.Colors.inputTxtColor,
    marginBottom: 3,
  },
  availableTxt: {
    fontSize: 14,
    color: Variables.Colors.darkBlack,
  },
  filterTxt: {
    fontSize: 16,
    color: Variables.Colors.darkBlack,
    marginLeft: 5,
  },
  carsAvailableView: {
    width: "47%",
    backgroundColor: Variables.Colors.darkYellow,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  filterInnerView: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  filterBtnView: {
    width: "90%",
    alignSelf: "center",
    alignItems: "center",
    marginVertical: 10,
    position: "absolute",
    bottom: 0,
    // position: "absolute",
    // bottom: 10,
  },
  filterView: {
    backgroundColor: Variables.Colors.darkYellow,
    width: "33%",
    height: 50,
    marginLeft: 1,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTxt: {
    marginLeft: 15,
    color: Variables.Colors.white,
    fontSize: 24,
  },
  headerView: {
    position: "absolute",
    top: 10,
    height: 70,
    width: "90%",
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "red",
  },
  carView: {
    backgroundColor: Variables.Colors.carGrey,
    width: "95%",
    alignSelf: "center",
    marginTop: 20,
    borderRadius: 10,
  },
  carImgView: {
    height: Variables.Measures.height / 3.1,
    width: "100%",
  },
  carImgStyle: {
    height: Variables.Measures.height / 4.5,
    width: Variables.Measures.width / 1.06,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  carNameTxt: {
    color: Variables.Colors.white,
    fontSize: 18,
  },
  carDescView: {
    flexDirection: "row",
    height: 60,
  },
  carNameView: {
    width: "50%",
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  ratingsView: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "30%",
  },
  carWidthView: {
    flex: 1,
    width: "100%",
  },
  leftWidthView: {
    width: "50%",
  },
  centerWidthView: {
    width: "30%",
  },
  ratingsTxt: {
    fontSize: 12,
    color: Variables.Colors.white,
  },
  safeAreaStyle: {
    flex: 1,
    backgroundColor: Variables.Colors.darkBlack,
    marginTop: Measures.StatusBarHeight,
  },

  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  box: {
    width: 50,
    height: 50,
    borderRadius: 5,
    backgroundColor: "#E0E0E0",
    marginHorizontal: 8,
  },
  line: {
    width: 2,
    height: 50,
    backgroundColor: "#E0E0E0",
    marginHorizontal: 8,
  },
});

export default Favorites;

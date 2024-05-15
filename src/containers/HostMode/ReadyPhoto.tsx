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
  Alert,
} from "react-native";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  CommonStyles,
  FontStyle,
  Images,
  Layout,
  Variables,
} from "../../Theme";
import { goBack, navigate } from "../../navigators/RootNavigation";

import ButtonView from "../../components/ButtonView";
import Header from "../../components/Header";

import LeftSvg from "../../assets/Images/BackArrow.svg";
import SunlightSvg from "../../assets/Images/Sunlight.svg";
import Feature2 from "../../assets/Images/Feature2.svg";
import Feature3 from "../../assets/Images/Feature3.svg";
import Feature4 from "../../assets/Images/Feature4.svg";
import CameraSvg from "../../assets/Images/CameraBlack.svg";
import ImagePicker from "react-native-image-crop-picker";
import { RouteProp } from "@react-navigation/native";
import { Measures } from "../../Theme/variables";

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
interface CancelProps {
  route?: RouteProp<any, any>;
}

const readyPhoto = [
  {
    id: 1,
    featureTxt: "Shoot during the daytimes.",
    featureImg: <SunlightSvg height={40} width={40} />,
  },
  {
    id: 1,
    featureTxt: "Take pictures in beautiful, open areas.",
    featureImg: <Feature2 height={40} width={43} />,
  },
  {
    id: 1,
    featureTxt: "Look out for moving cars",
    featureImg: <Feature3 />,
  },
  {
    id: 1,
    featureTxt: "Make sure photos are clear.",
    featureImg: <Feature4 />,
  },
];

const ReadyPhoto: React.FC<CancelProps> = ({ route }) => {
  const { t } = useTranslation();
  const carData = route?.params?.carData;

  const [selectedId, setSelectedId] = useState([]);
  const [imageUri, setImageUri] = useState(null);
  useEffect(() => {
    if (imageUri != null) {
      navigate("TakePhoto", { image: imageUri, carData: carData });
    }
  }, [imageUri]);

  const handleSelection = (id: number) => {
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

  const renderFeaturesdata = (item: {
    featureImg: string;
    featureTxt: string;
    selectedImg: string;
    id: number;
  }) => {
    return (
      <View
        style={{
          flex: 1,
          marginHorizontal: 5,
          marginVertical: 5,
        }}
      >
        <View
          style={styles.featuresOuterView}
          // onPress={() => handleSelection(item.id)}
        >
          <View style={{ width: "20%" }}>{item.featureImg}</View>
          <View style={{ width: "85%" }}>
            <Text
              style={[
                FontStyle.urbanistMedium,
                styles.featureTxt,
                { textAlign: "center" },
                CommonStyles.descCommonTxt,
              ]}
            >
              {item.featureTxt}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const pickFromCamera = () => {
    ImagePicker.openCamera({
      cropping: true,
      mediaType: "photo",
      compressImageQuality: 0.5,
    }).then((image: ImageProps) => {
      if (image.didCancel) {
        Alert.alert(t("toastConst.cancelCameraPermisison"));
        return;
      } else if (image.errorCode == "camera_unavailable") {
        Alert.alert(t("toastConst.cameraNotAvailable"));
        return;
      } else if (image.errorCode == "permission") {
        Alert.alert(t("toastConst.permissionNotSatisfied"));
        return;
      } else if (image.errorCode == "others") {
        Alert.alert(image.errorMessage);
        return;
      }
      if (image?.path) {
        setImageUri({
          uri: image.path,
          type: image.mime,
          name: image.path.substring(
            image.path.lastIndexOf("/") + 1,
            image.path.length
          ),
        });
      }
    });
  };
  return (
    <SafeAreaView style={styles.safeAreaStyle}>
      <StatusBar translucent backgroundColor="transparent" />
      <ScrollView>
        <Header
          centerText="Get ready"
          leftSvg={<LeftSvg />}
          onLeftPress={goBack}
        />
        <View style={styles.featuresView}>
          <View style={{ width: "90%", alignSelf: "center" }}>
            <Text
              style={[
                FontStyle.urbanistMedium,
                styles.featureTxt,
                CommonStyles.descCommonTxt,
              ]}
            >
              Utilizing high-quality photos can enhance your revenue potential
              by attracting a larger number of prospective guests.
            </Text>
          </View>
          <View style={styles.exampleView}>
            <Text
              style={[
                FontStyle.urbanistBold,
                CommonStyles.smallCommonTxt,
                styles.exampleTxt,
              ]}
            >
              Use these tools to take better photos.
            </Text>
          </View>
          <View
            style={{
              marginTop: Variables.Measures.fontSize * 2,
              marginBottom: Variables.Measures.fontSize,
            }}
          >
            <FlatList
              data={readyPhoto}
              renderItem={({ item }: any) => renderFeaturesdata(item)}
              numColumns={2}
            />
          </View>
        </View>
        <TouchableOpacity
          style={styles.btnView}
          onPress={() => {
            pickFromCamera();
          }}
        >
          <Image source={Images.camera} style={{ height: 25, width: 30 }} />
          <Text style={[FontStyle.urbanistBold, styles.btnTxt]}>
            Take photo
          </Text>
        </TouchableOpacity>
        <ButtonView
          style={{ marginBottom: Variables.MetricsSizes.small * 5 }}
          btnTxt="Add from gallery"
          onBtnPress={() => {
            navigate("TakePhoto", { carData: carData });
          }}
          width={Variables.Measures.width / 1.09}
          backgroundColor={Variables.Colors.darkBlack}
          fontColor={Variables.Colors.darkYellow}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  btnView: {
    width: "90%",
    alignSelf: "center",
    height: 55,
    backgroundColor: Variables.Colors.darkYellow,
    borderRadius: 10,
    marginVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  btnTxt: {
    fontSize: Measures.fontSize / 1.3,
    color: Variables.Colors.darkBlack,
    marginLeft: 10,
  },
  featuresOuterView: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Variables.Colors.carGrey,
    borderRadius: 10,
    height: Variables.Measures.width / 3.2,
  },
  featuresTxt: {
    color: Variables.Colors.white,
    fontSize: 12,
  },
  featuresView: {
    width: "95%",
    alignSelf: "center",
  },
  featureTxt: {
    color: Variables.Colors.white,
    lineHeight: 22,
    marginTop: 15,
  },
  safeAreaStyle: {
    flex: 1,
    backgroundColor: Variables.Colors.darkBlack,
  },
  exampleTxt: {
    color: Variables.Colors.darkYellow,
  },
  exampleView: {
    width: "80%",
    alignSelf: "center",
    marginTop: 10,
    alignItems: "center",
  },
});

export default ReadyPhoto;

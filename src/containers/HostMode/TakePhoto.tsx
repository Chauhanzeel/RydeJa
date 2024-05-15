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

import { FontStyle, Images, Layout, Variables } from "../../Theme";
import { goBack, navigate } from "../../navigators/RootNavigation";
import DashedLine from "react-native-dashed-line";

import ButtonView from "../../components/ButtonView";

import LeftSvg from "../../assets/Images/BackArrow.svg";

import GallarySvg from "../../assets/Images/Photo.svg";
import PenSVg from "../../assets/Images/PencilSvg.svg";
import Header from "../../components/Header";
// import ImagePicker, { ImageLibraryOptions } from "react-native-image-picker";
// import ImagePicker from "react-native-image-crop-picker";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import FastImageView from "../../components/FastImageView";
import { uploadCarImages } from "../../saga/carOwnerSaga";
import { useDispatch, useSelector } from "react-redux";
import {
  carOwnerUpdateCarStart,
  uploadCarImagesStart,
  uploadCarImagesSuccess,
} from "../../actions/carOwnerActions";
import { FilterModalProps } from "../types";
import ImagePicker from "react-native-image-crop-picker";
import { ReducerStateProps } from "../Inbox/InterfaceProps";
import _ from "lodash";
import { use } from "i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ToastMessage from "../../components/ToastMessage";
import { toastConst } from "../../constants/constants";
import * as mime from "react-native-mime-types";
import { Colors } from "../../Theme/variables";

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

const TakePhoto: React.FC<FilterModalProps> = ({ route }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [
    isLoading,
    ownerCarViewData,
    uploadCarImagesData,
    loginData,
    profileDetailsData,
  ] = useSelector((state: ReducerStateProps) => [
    state.carOwner.isLoading,
    state.carOwner.ownerCarViewData,
    state.carOwner.uploadCarImagesData,
    state.auth.loginData,
    state.user.profileDetailsData,
  ]);

  const [selectedImages, setSelectedImages] = useState([]);
  const [updated, setUpdated] = useState(false);
  const camImage = route?.params?.image;

  useEffect(() => {
    if (ownerCarViewData) {
      const processedData = ownerCarViewData?.carAssets.map((item: any) => {
        const imageUrlParts = item.image.split("/");
        const imageNameWithExtension = imageUrlParts[imageUrlParts.length - 1];
        const imageExtension = imageNameWithExtension.split(".")[1];

        return {
          uri: item.image,
          type: `image/${imageExtension}`,
          name: imageNameWithExtension,
        };
      });

      setSelectedImages(processedData);
    }
  }, []);

  useEffect(() => {
    if (_.get(uploadCarImagesData, "success", null) && updated) {
      navigate("TabNavigations", { navigationfrom: 2 });
    }
  }, [uploadCarImagesData]);

  useEffect(() => {
    if (camImage?.uri) {
      setSelectedImages([camImage]);
    }
  }, []);

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
        setSelectedImages([
          ...selectedImages,
          {
            uri: image.path,
            type: image.mime,
            name: image.path.substring(
              image.path.lastIndexOf("/") + 1,
              image.path.length
            ),
          },
        ]);
      }
    });
  };

  const selectImages = () => {
    ImagePicker.openPicker({
      width: 200,
      height: 200,
      compressImageMaxHeight: 400,
      compressImageMaxWidth: 400,
      compressImageQuality: 0.5,
      cropping: true,
      multiple: true,
    }).then((response) => {
      const ImageList = response.map((image, index) => ({
        uri: image?.path,
        type: mime.lookup(image?.path?.replace(/^.*[\\\/]/, "")),
        name: image?.path?.replace(/^.*[\\\/]/, ""),
      }));

      setSelectedImages([...selectedImages, ...ImageList]);
    });
  };
  const removeImage = (uri: any) => {
    const newArray = _.filter(selectedImages, (currentObject) => {
      return currentObject.uri !== uri;
    });

    setSelectedImages(newArray);
  };

  const renderFeaturesdata = (item: any) => {
    return (
      <View
        style={{
          flex: 1,
          marginHorizontal: 5,
          marginVertical: 2,
        }}
      >
        <View style={styles.featuresOuterView}>
          <FastImageView source={{ uri: item?.uri }} style={styles.imgView} />

          <TouchableOpacity
            style={styles.closeView}
            onPress={() => removeImage(item?.uri)}
          >
            <Image
              style={{ width: 20, height: 20 }}
              source={require("../../assets/Images/Delete.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const uploadImages = () => {
    let params = {
      car: _.get(ownerCarViewData, "id", null),
      files: selectedImages,
    };
    dispatch(uploadCarImagesStart(params));
    setUpdated(true);
  };

  const storeData = async () => {
    const existingData = await AsyncStorage.getItem("carDetails");
    const parsedData = JSON.parse(existingData);
    parsedData.carImages = selectedImages;
    await AsyncStorage.setItem("carDetails", JSON.stringify(parsedData));

    if (
      !_.get(loginData, "user.hostStripeId", null) &&
      !_.get(profileDetailsData, "verifiedInfo.hostStripeId", null)
    ) {
      navigate("SetUpAccount", { bankDetails: "no" });
      return;
    }
    if (
      _.get(profileDetailsData, "verifiedInfo.isBankDetailsAddStatus") == false
    ) {
      navigate("SetUpAccount", { bankDetails: "no" });
      return;
    }

    if (
      !_.get(loginData, "user.hostStripeId", null) &&
      _.get(profileDetailsData, "verifiedInfo.hostStripeId", null)
    ) {
      navigate("SafetyStandards");
      return;
    }

    if (_.size(selectedImages) > 0) {
      navigate("SafetyStandards");
    } else if (_.size(selectedImages) == 0 && ownerCarViewData) {
      navigate("SafetyStandards");
    } else {
      ToastMessage.set(toastConst.errorToast, "Please select car photo!");
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaStyle}>
      <StatusBar translucent backgroundColor="transparent" />
      <Header
        centerText="Upload Car Images"
        leftSvg={<LeftSvg />}
        onLeftPress={goBack}
      />

      <ScrollView>
        <View style={styles.greyOuterView}>
          <View style={styles.featuresView}>
            <View
              style={{
                marginBottom: Variables.Measures.fontSize,
                marginTop: Variables.Measures.fontSize,
              }}
            >
              <FlatList
                data={selectedImages}
                renderItem={({ item }: any) => renderFeaturesdata(item)}
                numColumns={2}
              />
            </View>
          </View>
          <DashedLine dashLength={5} dashColor={Variables.Colors.borderGrey} />
          <View style={styles.buttonView}>
            <TouchableOpacity
              style={styles.btnView}
              onPress={() => {
                selectImages();
              }}
            >
              <GallarySvg height={25} width={27} />
              <Text style={[FontStyle.urbanistBold, styles.btnTxt]}>
                Add photos
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.btnView, { backgroundColor: Colors.darkYellow }]}
              onPress={() => {
                pickFromCamera();
              }}
            >
              <Image source={Images.camera} style={{ height: 23, width: 27 }} />
              <Text
                style={[
                  FontStyle.urbanistBold,
                  styles.btnTxt,
                  { color: Colors.darkBlack },
                ]}
              >
                Take photo
              </Text>
            </TouchableOpacity>
          </View>

          <ButtonView
            isLoading={isLoading}
            btnTxt={ownerCarViewData ? "Update" : "Next"}
            onBtnPress={() => {
              ownerCarViewData ? uploadImages() : storeData();
            }}
            width={Variables.Measures.width / 1.15}
            backgroundColor={Variables.Colors.darkYellow}
            fontColor={Variables.Colors.darkBlack}
          />
          <View style={{ height: 25 }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  imgView: {
    height: Variables.Measures.width / 3,
    width: "100%",
    borderRadius: 10,
  },
  headerView: {
    height: 50,
    width: "90%",
    alignSelf: "center",
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  closeView: {
    position: "absolute",
    top: 20,
    right: 10,
  },
  absoluteTxt: {
    position: "absolute",
    top: Variables.Measures.width / 2.4,
    alignItems: "center",
    width: "100%",
  },
  carImgStyle: {
    width: "100%",
    height: Variables.Measures.width / 2,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  greyOuterView: {
    width: "95%",
    backgroundColor: Variables.Colors.greyBg,
    alignSelf: "center",
    borderRadius: 15,
    paddingBottom: 30,
  },
  headingTxt: {
    color: "white",
    fontSize: 18,
  },
  btnView: {
    width: "45%",
    alignSelf: "center",
    height: 50,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderWidth: 1,
    borderColor: Variables.Colors.darkYellow,
  },
  buttonView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    alignSelf: "center",
    marginVertical: 20,
  },

  btnTxt: {
    fontSize: 15,
    color: Variables.Colors.white,
    marginLeft: 10,
  },
  featuresOuterView: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Variables.Colors.carGrey,
    height: Variables.Measures.width / 2.5,
  },
  featuresView: {
    width: "95%",
    alignSelf: "center",
  },
  safeAreaStyle: {
    flex: 1,
    backgroundColor: Variables.Colors.darkBlack,
  },
});
export default TakePhoto;

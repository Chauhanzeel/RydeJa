import React, { useState, useEffect } from "react";
import { CommonStyles, FontStyle, Variables } from "../../Theme";
import {
  View,
  StyleSheet,
  StatusBar,
  Text,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import ImagePicker from "react-native-image-crop-picker";

import Header from "../../components/Header";
import ButtonView from "../../components/ButtonView";
import AddProfile from "../../assets/Images/Profile/Add_Profile.svg";
import PlusAdd from "../../assets/Images/PlusAdd.svg";

import BottomModal from "../../components/BottomModal";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProfileStart,
  updateProfileSuccess,
} from "../../actions/userActions";
import { GetApprovedProps, ReducerStateProps } from "../Inbox/InterfaceProps";
import BackSvg from "../../assets/Images/BackArrow.svg";
import { goBack } from "../../navigators/RootNavigation";
import _ from "lodash";
import BookingValidation from "../../components/BookedValidation";
import { validationCheckStart } from "../../actions/customerActions";
import ToastMessage from "../../components/ToastMessage";
import { toastConst } from "../../constants/constants";

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

const ProfilePhoto: React.FC<GetApprovedProps> = ({ route }) => {
  const rentalCarObj = route.params?.rentalCarObj;

  const { t } = useTranslation();
  const [imageModal, setImageModal] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  const dispatch = useDispatch();
  const modalSelection = (key: string) => {
    switch (key) {
      case "modalOption1":
        pickFromGallary("gallary");
        break;
      case "modalOption2":
        pickFromCamera("camera");
        break;
      default:
        return key;
    }
  };
  const [isLoading, updateProfileData, validationObj, custLoading] =
    useSelector((state: ReducerStateProps) => [
      state.user.isLoading,
      state.user.updateProfileData,
      state.customer.validationObj,
      state.customer.isLoading,
    ]);

  useEffect(() => {
    if (_.get(validationObj, "profilePicture", null)) {
      BookingValidation.Check(validationObj, rentalCarObj);
    }
  }, [validationObj]);

  useEffect(() => {
    if (_.get(updateProfileData, "success", null)) {
      dispatch(validationCheckStart(null));
      dispatch(updateProfileSuccess(null));
    }
  }, [updateProfileData]);

  const updateProfile = () => {
    if (imageUri) {
      const param = {
        file: imageUri,
      };

      dispatch(updateProfileStart(param));
    } else {
      ToastMessage.set(toastConst.errorToast, "Please add profile photo.");
    }
  };

  const pickFromGallary = (type: string | any) => {
    ImagePicker.openPicker({
      cropping: true,
      mediaType: type,
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
      setImageUri({
        uri: image.path,
        type: image.mime,
        name: image.path.substring(
          image.path.lastIndexOf("/") + 1,
          image.path.length
        ),
      });
      setImageModal(false);
    });
  };

  const pickFromCamera = (type: string | any) => {
    ImagePicker.openCamera({
      cropping: true,
      compressImageQuality: 0.5,
      mediaType: type,
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

      setImageUri({
        uri: image.path,
        type: image.mime,
        name: image.path.substring(
          image.path.lastIndexOf("/") + 1,
          image.path.length
        ),
      });
      setImageModal(!imageModal);
    });
  };

  return (
    <SafeAreaView style={CommonStyles.safeAreaStyle}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Variables.Colors.darkBlack}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <Header
          centerText={t("Profile Photo")}
          leftSvg={<BackSvg height={25} width={25} />}
          onLeftPress={() => goBack()}
        />
        <View style={styles.demoTxt}>
          <Text style={[FontStyle.urbanistMedium, styles.profileDescTxt]}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </Text>

          <TouchableOpacity
            style={{
              alignItems: "center",
              marginVertical: 20,
            }}
            onPress={() => setImageModal(!imageModal)}
          >
            {imageUri ? (
              <Image
                source={imageUri}
                style={styles.img}
                resizeMode="contain"
              />
            ) : (
              <AddProfile />
            )}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 15,
              }}
            >
              <PlusAdd style={{ marginRight: Variables.MetricsSizes.tiny }} />
              <Text style={[FontStyle.urbanistBold, styles.changePicTxt]}>
                Profile Photo
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ marginVertical: Variables.Measures.fontSize * 2 }}>
          <ButtonView
            width={Variables.Measures.width / 1.12}
            btnTxt="Save and Continue"
            backgroundColor={Variables.Colors.yellow}
            isLoading={isLoading || custLoading}
            onBtnPress={() => {
              updateProfile();
            }}
            fontColor={Variables.Colors.darkBlack}
          />
        </View>
        {imageModal && (
          <BottomModal
            openModal={imageModal}
            headerTxt={t("labelConst.selectImage")}
            optionOneTxt={t("labelConst.selectFromgallary")}
            optionTwoTxt={t("labelConst.selectFromCamera")}
            cancelTxt={t("labelConst.cancel")}
            onModalOptionPress={(key: string) => {
              modalSelection(key);
            }}
            onModalClose={() => setImageModal(false)}
          />
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  plusTxt: {
    color: Variables.Colors.yellow,
  },
  img: {
    marginTop: 15,
    height: Variables.Measures.width / 4.5,
    width: Variables.Measures.width / 4.5,
    borderRadius: Variables.Measures.fontSize * 4.5,
    borderWidth: 1,
    borderColor: Variables.Colors.darkYellow,
  },
  demoTxt: {
    width: "93%",
    alignSelf: "center",
    flex: 1,
  },
  inputTitleTxt: {
    color: Variables.Colors.inputTxtColor,
    fontSize: 12,
    marginTop: Variables.Measures.fontSize / 1.3,
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
    fontSize: Variables.Measures.fontSize / 1.3,
    color: Variables.Colors.white,
  },
  profileDescTxt: {
    fontSize: Variables.Measures.fontSize / 1.6,
    color: Variables.Colors.white,
    marginVertical: 15,
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
});
export default ProfilePhoto;

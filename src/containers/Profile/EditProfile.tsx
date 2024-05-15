import React, { useState, useRef, useEffect } from "react";
import { CommonStyles, FontStyle, Images, Variables } from "../../Theme";
import {
  View,
  StyleSheet,
  StatusBar,
  ScrollView,
  Text,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { useTranslation } from "react-i18next";
import { SafeAreaView } from "react-native-safe-area-context";
import { goBack, navigate } from "../../navigators/RootNavigation";
import ImagePicker from "react-native-image-crop-picker";

import Header from "../../components/Header";
import ButtonView from "../../components/ButtonView";

import CloseSvg from "../../assets/Images/Close.svg";
import InputField from "../../components/InputField";
import BottomModal from "../../components/BottomModal";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProfileStart,
  updateProfileSuccess,
} from "../../actions/userActions";
import { ReducerStateProps } from "../Inbox/InterfaceProps";
import FastImageView from "../../components/FastImageView";
import _ from "lodash";
import ToastMessage from "../../components/ToastMessage";
import { toastConst } from "../../constants/constants";

interface EditProfileProps {}

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

const EditProfile: React.FC<EditProfileProps> = () => {
  const { t } = useTranslation();

  const [info, setInfo] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [language, setLanguage] = useState("");

  const [imageModal, setImageModal] = useState(false);
  const [imageUri, setImageUri] = useState(null);

  const [infoError, setInfoError] = useState(0);
  const [countryError, setCountryError] = useState(0);
  const [stateError, setStateError] = useState(0);
  const [cityError, setCityError] = useState(0);
  const [languageError, setLanguageError] = useState(0);
  const [update, setUpdate] = useState(false);

  const infoRef = useRef(null);
  const countryRef = useRef(null);
  const stateRef = useRef(null);
  const cityRef = useRef(null);
  const languageRef = useRef(null);
  const dispatch = useDispatch();

  const modalSelection = (key: string) => {
    switch (key) {
      case "modalOption1":
        pickFromGallary("gallary");
        break;
      case "modalOption2":
        pickFromCamera();
        break;
      default:
        return key;
    }
  };

  const [isLoading, updateProfileData, profileDetailsData] = useSelector(
    (state: ReducerStateProps) => [
      state.user.isLoading,
      state.user.updateProfileData,
      state.user.profileDetailsData,
    ]
  );

  useEffect(() => {
    setInfo(_.get(profileDetailsData, "verifiedInfo.aboutYourself", null));
    setCountry(_.get(profileDetailsData, "verifiedInfo.torontoOnCanada", null));
    setCity(_.get(profileDetailsData, "verifiedInfo.city", null));
    setState(_.get(profileDetailsData, "verifiedInfo.toronto", null));
    setLanguage(_.get(profileDetailsData, "verifiedInfo.english", null));
  }, []);

  useEffect(() => {
    if (_.get(updateProfileData, "success", null) && update) {
      goBack();
      setUpdate(false);
    }
  }, [updateProfileData]);

  const updateProfile = () => {
    {
      setInfoError(info ? 0 : 1);
      setCountryError(country ? 0 : 1);
      setCityError(city ? 0 : 1);
      setStateError(state ? 0 : 1);
      setLanguageError(language ? 0 : 1);
    }
    if (!info || !country || !city || !state || !language) {
      ToastMessage.set(
        toastConst.errorToast,
        "Please fill out all the required fields."
      );
    } else {
      const param = {
        aboutYourself: info,
        torontoOnCanada: country,
        city: city,
        toronto: state,
        english: language,
        file: imageUri,
      };
      dispatch(updateProfileStart(param));
      setUpdate(true);
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

  const pickFromCamera = () => {
    ImagePicker.openCamera({
      cropping: true,
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

  return (
    <SafeAreaView style={CommonStyles.safeAreaStyle}>
      <StatusBar barStyle="light-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView>
          <Header
            leftSvg={<CloseSvg height={25} width={25} />}
            onLeftPress={goBack}
          />
          <View style={{ width: "93%", alignSelf: "center" }}>
            <Text style={[FontStyle.urbanistBold, CommonStyles.smallCommonTxt]}>
              Profile photo
            </Text>

            {imageUri ? (
              <Image
                source={imageUri}
                style={styles.profileImage}
                resizeMode="contain"
              />
            ) : null}
            <Text
              style={[
                FontStyle.urbanistMedium,
                styles.profileDescTxt,
                CommonStyles.descCommonTxt,
                CommonStyles.justifyText,
              ]}
            >
              Please upload a recent profile picture that clearly shows your
              face. This makes it easier for both hosts and guests to identify
              you when the trip begins.
            </Text>
            <TouchableOpacity
              style={styles.changeProfileBtn}
              onPress={() => setImageModal(!imageModal)}
            >
              <Text
                style={[FontStyle.urbanistBold, CommonStyles.smallCommonTxt]}
              >
                Change Profile Photo
              </Text>
            </TouchableOpacity>
            <Text
              style={[
                FontStyle.urbanistBold,
                CommonStyles.smallCommonTxt,
                { marginTop: 30 },
              ]}
            >
              About
            </Text>
            <Text
              style={[
                FontStyle.urbanistMedium,
                CommonStyles.descCommonTxt,
                styles.profileDescTxt,
                { marginBottom: 30 },
                CommonStyles.justifyText,
              ]}
            >
              Introduce yourself to hosts and guests. Share why you're
              responsible and trustworthy. Talk about your favorite travel
              experiences, hobbies, dream car, or driving background. You can
              also provide links to your LinkedIn, Twitter, or Facebook profiles
              to help them get to know you better.
            </Text>
            <InputField
              placeholderTextColor={Variables.Colors.inputTxtColor}
              multiline
              value={info}
              onChangeText={(val: string) => {
                setInfo(val);
                if (val.length >= 1) {
                  setInfoError(1);
                } else {
                  setInfoError(0);
                }
              }}
              labelTxt="Tell people about yourself"
              emptyField={infoError}
              placeholder="Tell people about yourself"
              inputref={infoRef}
              onSubmitEditing={() => {
                setInfoError(0), countryRef.current.focus();
              }}
              inputReturnKeyType="next"
            />
            <View style={{ marginTop: 15 }} />
            <InputField
              placeholderTextColor={Variables.Colors.inputTxtColor}
              value={country}
              onChangeText={(val: string) => {
                setCountry(val);
                if (val.length >= 1) {
                  setCountryError(1);
                } else {
                  setCountryError(0);
                }
              }}
              labelTxt="Toronto ON Canada"
              emptyField={countryError}
              placeholder="Country"
              inputref={countryRef}
              onSubmitEditing={() => {
                setCountryError(0), cityRef.current.focus();
              }}
              inputReturnKeyType="next"
            />
            <View style={{ marginTop: 15 }} />

            <InputField
              placeholderTextColor={Variables.Colors.inputTxtColor}
              value={city}
              onChangeText={(val: string) => {
                setCity(val);
                if (val.length >= 1) {
                  setCityError(1);
                } else {
                  setCityError(0);
                }
              }}
              labelTxt={"City"}
              emptyField={cityError}
              placeholder="City"
              inputref={cityRef}
              onSubmitEditing={() => {
                setCityError(0), stateRef.current.focus();
              }}
              inputReturnKeyType="next"
            />
            <View style={{ marginTop: 15 }} />
            <InputField
              placeholderTextColor={Variables.Colors.inputTxtColor}
              value={state}
              onChangeText={(val: string) => {
                setState(val);
                if (val.length >= 1) {
                  setStateError(1);
                } else {
                  setStateError(0);
                }
              }}
              labelTxt="Toronto"
              emptyField={stateError}
              placeholder="Toronto"
              inputref={stateRef}
              onSubmitEditing={() => {
                setStateError(0), languageRef.current.focus();
              }}
              inputReturnKeyType="next"
            />
            <View style={{ marginTop: 15 }} />
            <InputField
              placeholderTextColor={Variables.Colors.inputTxtColor}
              value={language}
              onChangeText={(val: string) => {
                setLanguage(val);
                if (val.length >= 1) {
                  setLanguageError(1);
                } else {
                  setLanguageError(0);
                }
              }}
              labelTxt="Language"
              emptyField={languageError}
              placeholder="Language"
              inputref={languageRef}
              onSubmitEditing={() => setLanguageError(0)}
              inputReturnKeyType="done"
            />
            <View style={{ marginVertical: Variables.Measures.fontSize * 1.5 }}>
              <ButtonView
                width={Variables.Measures.width / 1.12}
                btnTxt="Save"
                backgroundColor={Variables.Colors.yellow}
                isLoading={isLoading}
                disablebtn={isLoading}
                onBtnPress={() => {
                  updateProfile();
                }}
                fontColor={Variables.Colors.darkBlack}
              />
            </View>
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
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  profileImage: {
    marginVertical: 15,
    height: Variables.Measures.width / 3,
    width: Variables.Measures.width / 3,
    borderRadius: Variables.Measures.fontSize * 2,
    borderWidth: 1,
    borderColor: Variables.Colors.darkYellow,
    alignSelf: "center",
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
  },
});

export default EditProfile;

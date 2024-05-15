import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert, Platform } from "react-native";
import { FontStyle, Variables, Layout } from "../../Theme";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import MarkerSvg from "../../assets/Images/YellowLocation.svg";
import BackSvg from "../../assets/Images/BackArrow.svg";
import { LightMapStyle } from "./MapStyles";
import Header from "../../components/Header";
import ButtonView from "../../components/ButtonView";
import { PermissionsAndroid } from "react-native";
import Geolocation from "react-native-geolocation-service";

import { goBack, navigate } from "../../navigators/RootNavigation";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import _ from "lodash";
import { getOr } from "../../constants/constants";
import { RouteProp } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { mapDataSuccess } from "../../actions/authActions";
import { ReducerStateProps } from "../Inbox/InterfaceProps";
var debouncedFetchLocationData: any = null;
interface MapProps {
  route?: RouteProp<any, any>;
}
let reg = {
  latitude: 21.177085990238385,
  longitude: 72.81848603859544,
  latitudeDelta: 0.07060002701623347,
  longitudeDelta: 0.040803439915180206,
};
const MapScreen: React.FC<MapProps> = ({ route }) => {
  const [addressData, setAddress] = useState("Location...");
  const [granted, setGranted] = useState(false);
  const [region, setRegion] = useState(reg);
  const [latitude, setlatitude] = useState(21.177085990238385);
  const [longitude, setlongitude] = useState(72.81848603859544);
  const dispatch = useDispatch();
  const [mapData] = useSelector((state: ReducerStateProps) => [
    state.auth.mapData,
  ]);

  useEffect(() => {
    requestLocationPermission();
    if (granted) {
      getCurrentLocation();
    }
  }, [granted]);

  useEffect(() => {
    if (debouncedFetchLocationData) {
      debouncedFetchLocationData.cancel();
    }

    debouncedFetchLocationData = _.debounce(async (lat, lon) => {
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`
        );
        setAddress(response.data);
        dispatch(mapDataSuccess(response.data));
      } catch (error) {
        console.error(error);
      }
    }, 3000); // Debounce time in milliseconds

    debouncedFetchLocationData(latitude, longitude);
  }, [latitude, longitude]);

  const requestLocationPermission = async () => {
    try {
      if (Platform.OS === "ios") {
        setGranted(true);
        return;
      }
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setGranted(true);
        return true;
      } else if (granted === PermissionsAndroid.RESULTS.DENIED) {
        setGranted(false);
        Alert.alert(
          "Permission Denied",
          "You have denied location permission. Please enable it in your device settings to continue.",
          [{ text: "OK" }]
        );
        setGranted(false);
        return false;
      } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        Alert.alert(
          "Permission Denied",
          'You have denied location permission and selected "Never ask again". Please enable it in your device settings to continue.',
          [{ text: "OK" }]
        );
        setGranted(false);
        return false;
      } else {
        setGranted(false);
        return false;
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const getCurrentLocation = async () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        let reg = {
          latitude: _.get(position, "coords.latitude", null),
          longitude: _.get(position, "coords.latitude", null),
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        };
        setRegion(reg);
        setlatitude(latitude);
        setlongitude(longitude);
      },
      (error) => {
        console.warn(error.message);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  const onRegionChangeComplete = (newRegion: any) => {
    setRegion(newRegion);
    setlatitude(newRegion?.latitude);
    setlongitude(newRegion?.longitude);
  };

  return (
    <SafeAreaView style={styles.safeAreaStyle}>
      <Header
        leftSvg={<BackSvg height={25} width={25} />}
        centerText="Car location"
        onLeftPress={() => {
          goBack();
        }}
      />
      <View style={styles.widthView}>
        <Text style={[FontStyle.urbanistSemiBold, styles.addressTxt]}>
          {getOr(addressData, "display_name", "Location Searching ...")}
        </Text>
        <Text style={[FontStyle.urbanistSemiBold, styles.pickupTxt]}>
          Guest will pick up your car here
        </Text>
      </View>
      <View style={Layout.fullHeight}>
        <MapView
          customMapStyle={LightMapStyle}
          style={styles.darkMapStyle}
          initialRegion={region}
          onRegionChangeComplete={onRegionChangeComplete}
          showsUserLocation={true}
          zoomEnabled={true}
          pitchEnabled={true}
          showsMyLocationButton={true}
          showsCompass={true}
          showsIndoors={true}
          provider={PROVIDER_GOOGLE}
        >
          {region && (
            <Marker
              draggable
              coordinate={{
                latitude: region?.latitude,
                longitude: region?.longitude,
              }}
            >
              <MarkerSvg />
            </Marker>
          )}
        </MapView>
      </View>
      <View style={styles.btnView}>
        <ButtonView
          btnTxt={granted ? "Confirm location" : "Allow Location Permission"}
          onBtnPress={() => {
            granted ? navigate("Address") : requestLocationPermission();
          }}
          width={Variables.Measures.width / 1.12}
          backgroundColor={Variables.Colors.yellow}
          fontColor={Variables.Colors.darkBlack}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  btnView: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
  },
  safeAreaStyle: {
    flex: 1,
    backgroundColor: Variables.Colors.blackBg,
  },
  addressTxt: {
    fontSize: 14,
    color: Variables.Colors.white,
    marginTop: 10,
  },
  pickupTxt: {
    fontSize: 14,
    color: Variables.Colors.inputTxtColor,
    marginVertical: 10,
  },
  widthView: {
    width: "90%",
    alignSelf: "center",
  },
  ratedView: {
    width: Variables.Measures.width / 1.7,
  },
  darkMapStyle: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  itemView: {
    position: "absolute",
    width: Variables.Measures.width,
    bottom: 0,
    backgroundColor: Variables.Colors.darkBlack,
    alignItems: "center",
    justifyContent: "center",
  },
  carTxt: {
    fontSize: 12,
    color: Variables.Colors.white,
  },
  carDescTxt: {
    fontSize: 11,
    color: Variables.Colors.carsBorderGrey,
  },
  yellowAbsoluteView: {
    height: 40,
    width: Variables.Measures.width / 1.8,
    position: "absolute",
    bottom: Variables.Measures.height / 4.2,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  mapView: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    backgroundColor: Variables.Colors.darkYellow,
    justifyContent: "center",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  filterView: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    marginLeft: 3,
    backgroundColor: Variables.Colors.darkYellow,
    justifyContent: "center",
    borderBottomRightRadius: 10,
    borderTopRightRadius: 10,
    flexDirection: "row",
    paddingHorizontal: 20,
  },
  mapTxt: {
    color: Variables.Colors.darkBlack,
    fontSize: 16,
    marginLeft: 5,
  },
  searchTxt: {
    fontSize: 14,
    color: Variables.Colors.darkBlack,
  },
  searchView: {
    position: "absolute",
    top: 10,
    backgroundColor: Variables.Colors.darkYellow,
    height: 30,
    alignSelf: "center",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10,
    borderRadius: 7,
  },
  carImgStyle: {
    height: Variables.Measures.width / 4,
    width: "100%",
    marginTop: 10,
  },
  carListView: {
    width: "95%",
    alignSelf: "center",
  },
});

export default MapScreen;

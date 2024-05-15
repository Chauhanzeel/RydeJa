import countryListApi from "../api/countryListApi";
import langListApi from "../api/langListApi";
import userEndPointApi from "../api/userEndPointApi";

interface serviceInterface {
  payload: any;
}

export const languageListService = (params: serviceInterface) => {
  let languageListapi = new langListApi("language/list");
  return languageListapi
    .get(params.payload)
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

export const countryListService = (params: serviceInterface) => {
  let countryListapi = new countryListApi("country/list");
  return countryListapi
    .get(params.payload)
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

export const profileDetailsService = () => {
  let profileDetailsapi = new userEndPointApi("user/profile-details");
  return profileDetailsapi
    .get()
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

export const updatePhoneNumberService = (params: serviceInterface) => {
  let updatePhoneNumberapi = new userEndPointApi("user/update-phone-number");
  return updatePhoneNumberapi
    .post(params.payload)
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

export const updateProfileService = (params: serviceInterface) => {
  let updateProfileapi = new userEndPointApi("user/update-profile");
  return updateProfileapi
    .postImage(params.payload)
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

export const changeEmailService = (params: serviceInterface) => {
  let changeEmailapi = new userEndPointApi("user/change-email");
  return changeEmailapi
    .post(params.payload)
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

export const changeTransmissionService = (params: serviceInterface) => {
  let changeTransmissionApi = new userEndPointApi(
    "user/change-manual-transmission"
  );
  return changeTransmissionApi
    .post(params.payload)
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

export const changePasswordService = (params: serviceInterface) => {
  let changePasswordApi = new userEndPointApi("user/change-password");
  return changePasswordApi
    .post(params.payload)
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

export const notificationSettingsService = (params: serviceInterface) => {
  let notificationSettingsApi = new userEndPointApi(
    "user/notification-settings"
  );
  return notificationSettingsApi
    .post(params.payload)
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

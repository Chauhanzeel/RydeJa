import { Action } from "../constantActions/index";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const navtabScreen = (payload: object) => {
  return {
    type: Action.NAVIGATE_TAB_SCREEN,
    storeData: payload,
  };
};

/////////////PROFILE DETAILS///////////////////
export const profileDetailsStart = () => {
  return {
    type: Action.PROFILE_DETAILS_START,
  };
};
export const profileDetailsSuccess = (payload: object) => {
  return {
    type: Action.PROFILE_DETAILS_SUCCESS,
    profileDetailsData: payload,
  };
};
export const profileDetailsFail = (error?: string) => {
  return {
    type: Action.PROFILE_DETAILS_FAIL,
    payload: error,
  };
};

/////////////COUNTRY LIST///////////////////
export const countryListStart = (params: object) => {
  return {
    type: Action.COUNTRY_LIST_START,
    payload: params,
  };
};
export const countryListSuccess = (payload: object) => {
  return {
    type: Action.COUNTRY_LIST_SUCCESS,
    countryListData: payload,
  };
};
export const countryListFail = (error?: string) => {
  return {
    type: Action.COUNTRY_LIST_FAIL,
    payload: error,
  };
};

/////////////CHANGE MANUAL TRANSMISSION///////////////////
export const changeManualTransmissionStart = (params: object) => {
  return {
    type: Action.CHANGE_MANUAL_TRANSMISSION_START,
    payload: params,
  };
};
export const changeManualTransmissionSuccess = (payload: object) => {
  return {
    type: Action.CHANGE_MANUAL_TRANSMISSION_SUCCESS,
    changeManualTransmissionData: payload,
  };
};
export const changeManualTransmissionFail = (error?: string) => {
  return {
    type: Action.CHANGE_MANUAL_TRANSMISSION_FAIL,
    payload: error,
  };
};

/////////////LANGUAGE LIST///////////////////
export const languageListStart = (params: object) => {
  return {
    type: Action.LANGUAGE_LIST_START,
    payload: params,
  };
};
export const languageListSuccess = (payload: object) => {
  return {
    type: Action.LANGUAGE_LIST_SUCCESS,
    languageListData: payload,
  };
};
export const languageListFail = (error?: string) => {
  return {
    type: Action.LANGUAGE_LIST_FAIL,
    payload: error,
  };
};

/////////////UPDATE PHONE NUMBER///////////////////
export const updatePhoneNumberStart = (params: object) => {
  return {
    type: Action.UPDATE_PHONE_NUMBER_START,
    payload: params,
  };
};
export const updatePhoneNumberSuccess = (payload: object) => {
  return {
    type: Action.UPDATE_PHONE_NUMBER_SUCCESS,
    updatePhoneNumberData: payload,
  };
};
export const updatePhoneNumberFail = (error?: string) => {
  return {
    type: Action.UPDATE_PHONE_NUMBER_FAIL,
    payload: error,
  };
};

/////////////UPDATE PROFILE ///////////////////
export const updateProfileStart = (params: object) => {
  return {
    type: Action.UPDATE_PROFILE_START,
    payload: params,
  };
};
export const updateProfileSuccess = (payload: object) => {
  return {
    type: Action.UPDATE_PROFILE_SUCCESS,
    updateProfileData: payload,
  };
};
export const updateProfileFail = (error?: string) => {
  return {
    type: Action.UPDATE_PROFILE_FAIL,
    payload: error,
  };
};

////////////////CHANGE EMAIL///////////////
export const changeEmailStart = (params: object) => {
  return {
    type: Action.CHANGE_EMAIL_START,
    payload: params,
  };
};
export const changeEmailSuccess = (payload: object) => {
  return {
    type: Action.CHANGE_EMAIL_SUCCESS,
    changeEmailData: payload,
  };
};
export const changeEmailFail = (error?: string) => {
  return {
    type: Action.CHANGE_EMAIL_FAIL,
    payload: error,
  };
};

/////////////chat Message Send///////////////////
export const chatMessageSendStart = (params: object) => {
  return {
    type: Action.CHAT_MESSAGE_SEND_START,
    payload: params,
  };
};
export const chatMessageSendSuccess = (payload: object) => {
  return {
    type: Action.CHAT_MESSAGE_SEND_SUCCESS,
    sendChatData: payload,
  };
};
export const chatMessageSendFail = (error?: string) => {
  return {
    type: Action.CHAT_MESSAGE_SEND_FAIL,
    payload: error,
  };
};

/////////////chat Message Send///////////////////
export const chathistoryStart = (params: object) => {
  return {
    type: Action.CHAT_MESSAGE_HISTORY_START,
    payload: params,
  };
};
export const chathistorySuccess = (payload: object) => {
  return {
    type: Action.CHAT_MESSAGE_HISTORY_SUCCESS,
    chatHistoryData: payload,
  };
};
export const chathistorySendFail = (error?: string) => {
  return {
    type: Action.CHAT_MESSAGE_HISTORY_FAIL,
    payload: error,
  };
};

/////////////CHANGE PASSWORD///////////////////
export const changePasswordStart = (params: object) => {
  return {
    type: Action.CHANGE_PASSWORD_START,
    payload: params,
  };
};
export const changePasswordSuccess = (payload: object) => {
  return {
    type: Action.CHANGE_PASSWORD_SUCCESS,
    changePasswordData: payload,
  };
};
export const changePasswordFail = (error?: string) => {
  return {
    type: Action.CHANGE_PASSWORD_FAIL,
    payload: error,
  };
};

/////////////NOTIFICATION SETTINGS///////////////////
export const notificationSettingsStart = (params: object) => {
  return {
    type: Action.NOTIFICATION_SETTINGS_START,
    payload: params,
  };
};
export const notificationSettingsSuccess = (payload: object) => {
  return {
    type: Action.NOTIFICATION_SETTINGS_SUCCESS,
    notificationSettingsData: payload,
  };
};
export const notificationSettingsFail = (error?: string) => {
  return {
    type: Action.NOTIFICATION_SETTINGS_FAIL,
    payload: error,
  };
};

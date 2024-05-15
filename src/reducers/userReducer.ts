import { Action } from "../constantActions/index";
import { UserInterface, UserStateProps } from "./interface";

const initialState: UserStateProps = {
  isLoading: false,
  error: null,
  countryListData: null,
  languageListData: null,
  profileDetailsData: null,
  updatePhoneNumberData: null,
  updateProfileData: null,
  changeEmailData: null,
  changeManualTransmissionData: null,
  storeData: 0,
  changePasswordData: null,
  notificationSettingsData: null,
};

const userReducer = (state = initialState, action: UserInterface) => {
  switch (action.type) {
    case Action.RESET_ALL:
      return {
        ...initialState,
      };
      break;
    case Action.NAVIGATE_TAB_SCREEN:
      return {
        ...state,
        storeData: action.storeData,
      };
      break;
    case Action.COUNTRY_LIST_START:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case Action.COUNTRY_LIST_SUCCESS:
      return {
        ...state,
        countryListData: action.countryListData,
        isLoading: false,
      };
      break;
    case Action.COUNTRY_LIST_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      break;

    case Action.NOTIFICATION_SETTINGS_START:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case Action.NOTIFICATION_SETTINGS_SUCCESS:
      return {
        ...state,
        notificationSettingsData: action.notificationSettingsData,
        isLoading: false,
      };
      break;
    case Action.NOTIFICATION_SETTINGS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      break;

    case Action.LANGUAGE_LIST_START:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case Action.LANGUAGE_LIST_SUCCESS:
      return {
        ...state,
        languageListData: action.languageListData,
        isLoading: false,
      };
      break;
    case Action.LANGUAGE_LIST_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      break;

    case Action.PROFILE_DETAILS_START:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case Action.PROFILE_DETAILS_SUCCESS:
      return {
        ...state,
        profileDetailsData: action.profileDetailsData,
        isLoading: false,
      };
      break;
    case Action.PROFILE_DETAILS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      break;

    case Action.UPDATE_PHONE_NUMBER_START:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case Action.UPDATE_PHONE_NUMBER_SUCCESS:
      return {
        ...state,
        updatePhoneNumberData: action.updatePhoneNumberData,
        isLoading: false,
      };
      break;
    case Action.UPDATE_PHONE_NUMBER_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      break;

    case Action.UPDATE_PROFILE_START:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case Action.UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        updateProfileData: action.updateProfileData,
        isLoading: false,
      };
      break;
    case Action.UPDATE_PROFILE_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      break;

    case Action.CHANGE_EMAIL_START:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case Action.CHANGE_EMAIL_SUCCESS:
      return {
        ...state,
        changeEmailData: action.changeEmailData,
        isLoading: false,
      };
      break;
    case Action.CHANGE_EMAIL_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      break;

    case Action.CHANGE_MANUAL_TRANSMISSION_START:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case Action.CHANGE_MANUAL_TRANSMISSION_SUCCESS:
      return {
        ...state,
        changeManualTransmissionData: action.changeManualTransmissionData,
        isLoading: false,
      };
      break;
    case Action.CHANGE_MANUAL_TRANSMISSION_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      break;

    case Action.CHANGE_PASSWORD_START:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case Action.CHANGE_PASSWORD_SUCCESS:
      return {
        ...state,
        changePasswordData: action.changePasswordData,
        isLoading: false,
      };
      break;
    case Action.CHANGE_PASSWORD_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      break;

    case Action.CHAT_MESSAGE_SEND_START:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case Action.CHAT_MESSAGE_SEND_SUCCESS:
      return {
        ...state,
        sendChatData: action.sendChatData,
        isLoading: false,
      };
      break;
    case Action.CHAT_MESSAGE_SEND_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      break;

    case Action.CHAT_MESSAGE_HISTORY_START:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case Action.CHAT_MESSAGE_HISTORY_SUCCESS:
      return {
        ...state,
        chatHistoryData: action.chatHistoryData,
        isLoading: false,
      };
      break;
    case Action.CHAT_MESSAGE_HISTORY_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      break;

    default:
      return state;
  }
};
export default userReducer;

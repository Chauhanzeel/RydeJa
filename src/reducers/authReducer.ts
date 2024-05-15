import { Action } from "../constantActions/index";
import images from "../Theme/images";
import { AuthInterface, AuthStateProps } from "./interface";

const initialState: AuthStateProps = {
  isLoading: false,
  isGoogleLoading: false,
  error: null,
  userData: null,
  loginData: null,
  refreshData: null,
  logoutUser: null,
  signupData: null,
  switchMode: false,
  chatRooms: [],
  chatData: null,
  googleSignUpData: null,
  fbSignUpData: null,
  forgotPassData: null,
  verifyOtpData: null,
  resendOtpData: null,
  resetPassData: null,
  mapData: null,
};

const authReducer = (state = initialState, action: AuthInterface) => {
  switch (action.type) {
    case Action.RESET_ALL:
      return {
        ...initialState,
      };
      break;
    case Action.GOOGLE_SIGNUP_START:
      return {
        ...state,
        isGoogleLoading: true,
      };
      break;
    case Action.GOOGLE_SIGNUP_SUCCESS:
      return {
        ...state,
        loginData: action.loginData,
        isGoogleLoading: false,
      };
      break;
    case Action.GOOGLE_SIGNUP_FAIL:
      return {
        ...state,
        isGoogleLoading: false,
        error: action.payload,
      };
      break;

    case Action.FORGOT_PASS_START:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case Action.FORGOT_PASS_SUCCESS:
      return {
        ...state,
        forgotPassData: action.forgotPassData,
        isLoading: false,
      };
      break;
    case Action.FORGOT_PASS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      break;

    case Action.RESET_PASS_START:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case Action.RESET_PASS_SUCCESS:
      return {
        ...state,
        resetPassData: action.resetPassData,
        isLoading: false,
      };
      break;
    case Action.RESET_PASS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      break;

    case Action.VERIFY_OTP_START:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case Action.VERIFY_OTP_SUCCESS:
      return {
        ...state,
        verifyOtpData: action.verifyOtpData,
        isLoading: false,
      };
      break;
    case Action.VERIFY_OTP_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      break;

    case Action.RESEND_OTP_START:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case Action.RESEND_OTP_SUCCESS:
      return {
        ...state,
        resendOtpData: action.resendOtpData,
        isLoading: false,
      };
      break;
    case Action.RESEND_OTP_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      break;

    case Action.FB_SIGNUP_START:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case Action.FB_SIGNUP_SUCCESS:
      return {
        ...state,
        loginData: action.loginData,
        isLoading: false,
      };
      break;
    case Action.FB_SIGNUP_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      break;

    case Action.SIGNUP_START:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case Action.SIGNUP_SUCCESS:
      return {
        ...state,
        userData: action.userData,
        isLoading: false,
      };
      break;
    case Action.SIGNUP_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      break;

    case Action.LOGIN_USER_START:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case Action.LOGIN_USER_SUCCESS:
      return {
        ...state,
        loginData: action.loginData,
        isLoading: false,
      };
      break;
    case Action.LOGIN_USER_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      break;

    case Action.REFRESH_TOKEN_START:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case Action.REFRESH_TOKEN_SUCCESS:
      return {
        ...state,
        refreshData: action.refreshData,
        isLoading: false,
      };
      break;
    case Action.REFRESH_TOKEN_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      break;

    case Action.LOGOUT_USER_START:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case Action.LOGOUT_USER_SUCCESS:
      return {
        ...state,
        logoutUser: action.logoutData,
        isLoading: false,
      };
      break;
    case Action.LOGOUT_USER_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      break;
    case Action.SIGNUP_USER_START:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case Action.SIGNUP_USER_SUCCESS:
      return {
        ...state,
        signupData: action.signupData,
        isLoading: false,
      };
      break;
    case Action.SIGNUP_USER_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      break;

    case Action.SAVE_CHAT_START:
      return {
        ...state,
      };
      break;
    case Action.SAVE_CHAT_SUCCESS:
      return {
        ...state,
        chatData: action.chatData,
      };
      break;
    case Action.SAVE_CHAT_FAIL:
      return {
        ...state,
        error: action.payload,
      };
      break;
    case Action.SWITCH_MODE_START:
      return {
        ...state,
      };
      break;
    case Action.SWITCH_MODE_SUCCESS:
      return {
        ...state,
        switchMode: action.payload,
      };
    case Action.MAP_START:
      return {
        ...state,
      };
      break;
    case Action.MAP_SUCCESS:
      return {
        ...state,
        mapData: action.mapData,
      };
      break;
    case Action.MAP_FAIL:
      return {
        ...state,
        error: action.payload,
      };
      break;
    default:
      return state;
  }
};
export default authReducer;

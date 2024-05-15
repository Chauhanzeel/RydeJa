import { Action } from "../constantActions/index";

interface SignupInterface {
  data: object;
}

/////////////google signup///////////////////
export const googleSignUpStart = (params: object) => {
  return {
    type: Action.GOOGLE_SIGNUP_START,
    payload: params,
  };
};
export const googleSignUpSuccess = (payload: object) => {
  return {
    type: Action.GOOGLE_SIGNUP_SUCCESS,
    loginData: payload,
  };
};
export const googleSignUpFail = (error?: string) => {
  return {
    type: Action.GOOGLE_SIGNUP_FAIL,
    payload: error,
  };
};

/////////////facebook signup///////////////////
export const fbSignUpStart = (params: object) => {
  return {
    type: Action.FB_SIGNUP_START,
    payload: params,
  };
};
export const fbSignUpSuccess = (payload: object) => {
  return {
    type: Action.FB_SIGNUP_SUCCESS,
    loginData: payload,
  };
};
export const fbSignUpFail = (error?: string) => {
  return {
    type: Action.FB_SIGNUP_FAIL,
    payload: error,
  };
};

/////////////manual signup///////////////////
export const signUpStart = (params: object) => {
  return {
    type: Action.SIGNUP_START,
    payload: params,
  };
};
export const signUpSuccess = (payload: object) => {
  return {
    type: Action.SIGNUP_SUCCESS,
    userData: payload,
  };
};
export const signUpFail = (error?: string) => {
  return {
    type: Action.SIGNUP_FAIL,
    payload: error,
  };
};

////////////////user login///////////////
export const loginUserStart = (params: object) => {
  return {
    type: Action.LOGIN_USER_START,
    payload: params,
  };
};
export const loginUserSuccess = (payload: object) => {
  return {
    type: Action.LOGIN_USER_SUCCESS,
    loginData: payload,
  };
};
export const loginUserFail = (error?: string) => {
  return {
    type: Action.LOGIN_USER_FAIL,
    payload: error,
  };
};

//////////////logout user///////////////
export const logoutUserStart = (params: object) => {
  return {
    type: Action.LOGOUT_USER_START,
    payload: params,
  };
};

export const logoutUserSuccess = (payload: object) => {
  return {
    type: Action.LOGOUT_USER_SUCCESS,
    logoutData: payload,
  };
};

export const logoutUserFail = (error: string) => {
  return {
    type: Action.LOGOUT_USER_FAIL,
    payload: error,
  };
};

////////////sign up user/////////////////
export const signupUserStart = (params: object) => {
  return {
    type: Action.SIGNUP_USER_START,
    payload: params,
  };
};

export const signupUserSuccess = (payload: SignupInterface) => {
  return {
    type: Action.SIGNUP_USER_SUCCESS,
    signupData: payload,
  };
};

export const signupUserFail = (error: string) => {
  return {
    type: Action.SIGNUP_USER_FAIL,
    payload: error,
  };
};

/////////////forgot password//////////////////

export const forgotPassStart = (params: object) => {
  return {
    type: Action.FORGOT_PASS_START,
    payload: params,
  };
};

export const forgotPassSuccess = (payload: object) => {
  return {
    type: Action.FORGOT_PASS_SUCCESS,
    forgotPassData: payload,
  };
};

export const forgotPassFail = (error?: string) => {
  return {
    type: Action.FORGOT_PASS_FAIL,
    payload: error,
  };
};

/////////////VERIFY OTP//////////////////

export const verifyOtpStart = (params: object) => {
  return {
    type: Action.VERIFY_OTP_START,
    payload: params,
  };
};

export const verifyOtpSuccess = (payload: object) => {
  return {
    type: Action.VERIFY_OTP_SUCCESS,
    verifyOtpData: payload,
  };
};

export const verifyOtpFail = (error?: string) => {
  return {
    type: Action.VERIFY_OTP_FAIL,
    payload: error,
  };
};

/////////////RESEND OTP//////////////////

export const resendOtpStart = (params: object) => {
  return {
    type: Action.RESEND_OTP_START,
    payload: params,
  };
};

export const resendOtpSuccess = (payload: object) => {
  return {
    type: Action.RESEND_OTP_SUCCESS,
    resendOtpData: payload,
  };
};

export const resendOtpFail = (error?: string) => {
  return {
    type: Action.RESEND_OTP_FAIL,
    payload: error,
  };
};

/////////////reset password//////////////////

export const resetPassStart = (params: object) => {
  return {
    type: Action.RESET_PASS_START,
    payload: params,
  };
};

export const resetPassSuccess = (payload: object) => {
  return {
    type: Action.RESET_PASS_SUCCESS,
    resetPassData: payload,
  };
};

export const resetPassFail = (error?: string) => {
  return {
    type: Action.RESET_PASS_FAIL,
    payload: error,
  };
};

/////////////chat Save////////////////////

export const chatStart = (params: object | any) => {
  return {
    type: Action.SAVE_CHAT_START,
    data: params,
  };
};

export const chatSuccess = (payload: object | any) => {
  return {
    type: Action.SAVE_CHAT_SUCCESS,
    chatData: payload,
  };
};

export const chatFail = (error: string) => {
  return {
    type: Action.SAVE_CHAT_FAIL,
    payload: error,
  };
};

/////////////SWITCH MODE////////////////////

export const switchModeStart = (params: any) => {
  return {
    type: Action.SWITCH_MODE_START,
    data: params,
  };
};

export const switchModeSuccess = (mode: any) => {
  return {
    type: Action.SWITCH_MODE_SUCCESS,
    payload: mode,
  };
};

export const logOutResetAll = () => {
  return {
    type: Action.RESET_ALL,
  };
};

/////////////Map data////////////////////

export const mapDataStart = (params: any) => {
  return {
    type: Action.MAP_START,
    data: params,
  };
};

export const mapDataSuccess = (payload: object | any) => {
  return {
    type: Action.MAP_SUCCESS,
    mapData: payload,
  };
};

export const mapDataFail = (error?: string) => {
  return {
    type: Action.SAVE_CHAT_FAIL,
    payload: error,
  };
};

////////////////REFRESH TOKEN///////////////
export const refreshTokenStart = (params: object) => {
  return {
    type: Action.REFRESH_TOKEN_START,
    payload: params,
  };
};
export const refreshTokenSuccess = (payload: object) => {
  return {
    type: Action.REFRESH_TOKEN_SUCCESS,
    refreshData: payload,
  };
};
export const refreshTokenFail = (error?: string) => {
  return {
    type: Action.REFRESH_TOKEN_FAIL,
    payload: error,
  };
};

import { put, takeLatest } from "redux-saga/effects";
import { Action } from "../constantActions/index";
import {
  googleSignUpSuccess,
  googleSignUpFail,
  loginUserSuccess,
  loginUserFail,
  forgotPassSuccess,
  forgotPassFail,
  switchModeSuccess,
  signUpSuccess,
  signUpFail,
  fbSignUpSuccess,
  fbSignUpFail,
  resetPassSuccess,
  resetPassFail,
  verifyOtpSuccess,
  verifyOtpFail,
  resendOtpSuccess,
  resendOtpFail,
  mapDataSuccess,
  mapDataFail,
  refreshTokenSuccess,
  refreshTokenFail,
} from "../actions/authActions";
import {
  loginUserService,
  refreshTokenService,
  googleSignUpService,
  signUpUserService,
  forgotPassService,
  topicSendMessageService,
  fbSignUpService,
  resetPassService,
  verifyOtpService,
  resendOtpService,
  mapLocationService,
} from "../services/authService";
import { toastConst, ToastVisibility } from "../constants/constants";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { responseInterface } from "./interfaceType";
import * as Effects from "redux-saga/effects";
import { navigate } from "../navigators/RootNavigation";
import ToastMessage from "../components/ToastMessage";
import { Platform } from "react-native";

import { GOOGLE_CLIENT_ID } from "../constants/constants";
import { profileDetailsStart } from "../actions/userActions";

const call: any = Effects.call;
const wentWrong = "Something went wrong! Please try again later.";

export function* googleSignUp(payload: object) {
  try {
    const response: responseInterface = yield call(
      googleSignUpService,
      payload
    );
    if (response.success) {
      yield put(googleSignUpSuccess(response.data));
    } else {
      yield put(googleSignUpFail(response.message || response.error.message));
      ToastMessage.set(
        toastConst.errorToast,
        response.message || response.error.message
      );
      GoogleSignin.configure({
        webClientId: GOOGLE_CLIENT_ID,
      });
      GoogleSignin.signOut();
      GoogleSignin.revokeAccess();
    }
  } catch (error) {
    console.log(error);
    yield put(googleSignUpFail());
    ToastMessage.set(toastConst.errorToast, wentWrong);
    GoogleSignin.configure({
      webClientId: GOOGLE_CLIENT_ID,
    });
    GoogleSignin.signOut();
    GoogleSignin.revokeAccess();
  }
}

export function* fbSignUp(payload: object) {
  try {
    const response: responseInterface = yield call(fbSignUpService, payload);
    if (response.success) {
      yield put(fbSignUpSuccess(response.data));
    } else {
      yield put(fbSignUpFail(response.message || response.error.message));
      ToastMessage.set(
        toastConst.errorToast,
        response.message || response.error.message
      );
    }
  } catch (error) {
    console.log(error);
    yield put(fbSignUpFail());
    ToastMessage.set(toastConst.errorToast, wentWrong);
  }
}

export function* signUp(payload: object) {
  try {
    const response: responseInterface = yield call(signUpUserService, payload);

    if (response.success) {
      yield put(signUpSuccess(response.data));
    } else {
      yield put(signUpFail(response.message || response.error.message));
      ToastMessage.set(
        toastConst.errorToast,
        response.message || response.error.message
      );
    }
  } catch (error) {
    console.log(error);
    yield put(signUpFail());
    ToastMessage.set(toastConst.errorToast, wentWrong);
  }
}

export function* loginUser(payload: object) {
  try {
    const response: responseInterface = yield call(loginUserService, payload);
    if (response.success) {
      yield put(loginUserSuccess(response.data));
    } else {
      yield put(loginUserFail(response.message || response.error.message));
      ToastMessage.set(
        toastConst.errorToast,
        response.message || response.error.message
      );
    }
  } catch (error) {
    console.log(error);
    yield put(loginUserFail());
    ToastMessage.set(toastConst.errorToast, wentWrong);
  }
}

export function* refreshToken(payload: object) {
  try {
    const response: responseInterface = yield call(
      refreshTokenService,
      payload
    );
    if (response.success) {
      yield put(refreshTokenSuccess(response.data));
      yield put(profileDetailsStart());
    } else {
      yield put(refreshTokenFail(response.message || response.error.message));
      ToastMessage.set(
        toastConst.errorToast,
        response.message || response.error.message
      );
    }
  } catch (error) {
    console.log(error);
    yield put(refreshTokenFail());
    ToastMessage.set(toastConst.errorToast, wentWrong);
  }
}

export function* forgotPassword(payload: object) {
  try {
    const response: responseInterface = yield call(forgotPassService, payload);
    if (response.success) {
      yield put(forgotPassSuccess(response));
    } else {
      yield put(forgotPassFail(response.message || response.error.message));
      ToastMessage.set(
        toastConst.errorToast,
        response.message || response.error.message
      );
    }
  } catch (error) {
    console.log(error);
    yield put(forgotPassFail());
    ToastMessage.set(toastConst.errorToast, wentWrong);
  }
}

export function* resetPassword(payload: object) {
  try {
    const response: responseInterface = yield call(resetPassService, payload);
    if (response.success) {
      yield put(resetPassSuccess(response));
      ToastMessage.set(
        toastConst.successToast,
        "Password Changed Successfully."
      );
    } else {
      yield put(resetPassFail(response.message || response.error.message));
      ToastMessage.set(toastConst.errorToast, wentWrong);
    }
  } catch (error) {
    console.log(error);
    yield put(resetPassFail());
    ToastMessage.set(toastConst.errorToast, wentWrong);
  }
}

export function* verifyOtp(payload: object) {
  try {
    const response: responseInterface = yield call(verifyOtpService, payload);
    if (response.success) {
      yield put(verifyOtpSuccess(response));
      ToastMessage.set(toastConst.successToast, "OTP Verified.");
    } else {
      yield put(verifyOtpFail(response.message || response.error.message));
      ToastMessage.set(toastConst.errorToast, wentWrong);
    }
  } catch (error) {
    console.log(error);
    yield put(verifyOtpFail());
    ToastMessage.set(toastConst.errorToast, wentWrong);
  }
}

export function* resendOtp(payload: object) {
  try {
    const response: responseInterface = yield call(resendOtpService, payload);
    if (response.success) {
      yield put(resendOtpSuccess(response));
    } else {
      yield put(resendOtpFail(response.message || response.error.message));
      ToastMessage.set(
        toastConst.errorToast,
        response.message || response.error.message
      );
    }
  } catch (error) {
    console.log(error);
    yield put(resendOtpFail());
    ToastMessage.set(toastConst.errorToast, wentWrong);
  }
}

export function* mapDetails(payload: object) {
  try {
    const response: responseInterface = yield call(mapLocationService, payload);

    if (response.success) {
      yield put(mapDataSuccess(response));
    } else {
      yield put(mapDataFail(response.message || response.error.message));

      ToastMessage.set(
        toastConst.errorToast,
        response.message || response.error.message
      );
    }
  } catch (error) {
    console.log(error);
    yield put(mapDataFail());
    ToastMessage.set(toastConst.errorToast, wentWrong);
  }
}

export function* storeChatMessages(payload: any) {
  try {
    const response: responseInterface = yield call(
      topicSendMessageService,
      payload
    );
    // if (response.success) {
    //   yield put(chatSuccess(response.data));

    // } else {
    //   yield put(chatFail(response.message || response.error.message));
    //   Toast.show({
    //     type: toastConst.errorToast,
    //     text1: response.message || response.error.message,
    //     position: toastConst.toastBottom,
    //     visibilityTime: ToastVisibility,
    //   });
    // }
  } catch (error) {
    console.log(error);
  }
}

export function* switchModeFunc(payload: any) {
  try {
    if (payload !== null) {
      yield put(switchModeSuccess(payload.data));
    }
  } catch (error) {}
}

function* authSaga() {
  yield takeLatest(Action.GOOGLE_SIGNUP_START, googleSignUp);
  yield takeLatest(Action.FB_SIGNUP_START, fbSignUp);
  yield takeLatest(Action.SIGNUP_START, signUp);
  yield takeLatest(Action.LOGIN_USER_START, loginUser);
  yield takeLatest(Action.REFRESH_TOKEN_START, refreshToken);
  yield takeLatest(Action.FORGOT_PASS_START, forgotPassword);
  yield takeLatest(Action.VERIFY_OTP_START, verifyOtp);
  yield takeLatest(Action.RESEND_OTP_START, resendOtp);
  yield takeLatest(Action.RESET_PASS_START, resetPassword);
  yield takeLatest(Action.SAVE_CHAT_START, storeChatMessages);
  yield takeLatest(Action.SWITCH_MODE_START, switchModeFunc);
  yield takeLatest(Action.MAP_START, mapDetails);
}

export default authSaga;

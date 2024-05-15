import { put, takeLatest } from "redux-saga/effects";
import { Action } from "../constantActions/index";
import {
  countryListSuccess,
  countryListFail,
  languageListSuccess,
  languageListFail,
  profileDetailsSuccess,
  profileDetailsFail,
  updatePhoneNumberSuccess,
  updatePhoneNumberFail,
  updateProfileSuccess,
  updateProfileFail,
  profileDetailsStart,
  changeEmailSuccess,
  changeEmailFail,
  changeManualTransmissionSuccess,
  changeManualTransmissionFail,
  changePasswordSuccess,
  changePasswordFail,
  notificationSettingsSuccess,
  notificationSettingsFail,
} from "../actions/userActions";
import {
  countryListService,
  languageListService,
  profileDetailsService,
  updatePhoneNumberService,
  updateProfileService,
  changeEmailService,
  changeTransmissionService,
  changePasswordService,
  notificationSettingsService,
} from "../services/userService";
import { toastConst, ToastVisibility } from "../constants/constants";
import { responseInterface } from "./interfaceType";
import * as Effects from "redux-saga/effects";
import ToastMessage from "../components/ToastMessage";

const call: any = Effects.call;
const wentWrong = "Something went wrong! Please try again later.";

export function* countryTypeList(payload: object) {
  try {
    const response: responseInterface = yield call(countryListService, payload);

    if (response.success) {
      yield put(countryListSuccess(response.data));
    } else {
      yield put(countryListFail(response.message || response.error.message));
      ToastMessage.set(
        toastConst.errorToast,
        response.message || response.error.message
      );
    }
  } catch (error) {
    console.log(error);
    yield put(countryListFail());
    ToastMessage.set(toastConst.errorToast, wentWrong);
  }
}

export function* languageList(payload: object) {
  try {
    const response: responseInterface = yield call(
      languageListService,
      payload
    );

    if (response.success) {
      yield put(languageListSuccess(response.data));
    } else {
      yield put(languageListFail(response.message || response.error.message));
      ToastMessage.set(
        toastConst.errorToast,
        response.message || response.error.message
      );
    }
  } catch (error) {
    console.log(error);
    yield put(languageListFail());
    ToastMessage.set(toastConst.errorToast, wentWrong);
  }
}

export function* profileDetails() {
  try {
    const response: responseInterface = yield call(profileDetailsService);
    if (response.success) {
      yield put(profileDetailsSuccess(response.data));
    } else {
      yield put(profileDetailsFail(response.message || response.error.message));
      ToastMessage.set(
        toastConst.errorToast,
        response.message || response.error.message
      );
    }
  } catch (error) {
    console.log(error);
    yield put(profileDetailsFail(wentWrong));
    ToastMessage.set(toastConst.errorToast, wentWrong);
  }
}

export function* updatephoneNumber(payload: object) {
  try {
    const response: responseInterface = yield call(
      updatePhoneNumberService,
      payload
    );

    if (response.success) {
      yield put(updatePhoneNumberSuccess(response));
    } else {
      yield put(
        updatePhoneNumberFail(response.message || response.error.message)
      );
      ToastMessage.set(
        toastConst.errorToast,
        response.message || response.error.message
      );
    }
  } catch (error) {
    console.log(error);
    yield put(updatePhoneNumberFail());
    ToastMessage.set(toastConst.errorToast, wentWrong);
  }
}

export function* changeTransmission(payload: object) {
  try {
    const response: responseInterface = yield call(
      changeTransmissionService,
      payload
    );

    if (response.success) {
      yield put(changeManualTransmissionSuccess(response));
      yield put(profileDetailsStart());

      ToastMessage.set(
        toastConst.successToast,
        "Manual Transmission Changed Successfully"
      );
    } else {
      yield put(
        changeManualTransmissionFail(response.message || response.error.message)
      );
      ToastMessage.set(
        toastConst.errorToast,
        response.message || response.error.message
      );
    }
  } catch (error) {
    console.log(error);
    yield put(changeManualTransmissionFail());
    ToastMessage.set(toastConst.errorToast, wentWrong);
  }
}

export function* updateProfile(payload: object) {
  try {
    const response: responseInterface = yield call(
      updateProfileService,
      payload
    );

    if (response.success) {
      yield put(updateProfileSuccess(response));

      ToastMessage.set(toastConst.successToast, "Profile Updated Successfully");
      yield put(profileDetailsStart());
    } else {
      yield put(updateProfileFail(response.message || response.error.message));
      ToastMessage.set(
        toastConst.errorToast,
        response.message || response.error.message
      );
    }
  } catch (error) {
    console.log(error);
    yield put(updateProfileFail());
    ToastMessage.set(toastConst.errorToast, wentWrong);
  }
}

export function* changeEmail(payload: object) {
  try {
    const response: responseInterface = yield call(changeEmailService, payload);
    if (response.success) {
      yield put(changeEmailSuccess(response.success));
      ToastMessage.set(
        toastConst.successToast,
        "Email Changed Successfully, Please Re-login"
      );
    } else {
      yield put(changeEmailFail(response.message || response.error.message));
      ToastMessage.set(
        toastConst.errorToast,
        response.message || response.error.message
      );
    }
  } catch (error) {
    console.log(error);
    yield put(changeEmailFail());
    ToastMessage.set(toastConst.errorToast, wentWrong);
  }
}

export function* changePassword(payload: object) {
  try {
    const response: responseInterface = yield call(
      changePasswordService,
      payload
    );
    if (response.success) {
      yield put(changePasswordSuccess(response));

      ToastMessage.set(
        toastConst.successToast,
        "Password Changed Successfully."
      );
    } else {
      yield put(changePasswordFail(response.message || response.error.message));
      ToastMessage.set(
        toastConst.errorToast,
        response.message || response.error.message
      );
    }
  } catch (error) {
    console.log(error);
    yield put(changePasswordFail());
    ToastMessage.set(toastConst.errorToast, wentWrong);
  }
}

export function* notificationSettings(payload: object) {
  try {
    const response: responseInterface = yield call(
      notificationSettingsService,
      payload
    );
    if (response.success) {
      yield put(notificationSettingsSuccess(response));
      yield put(profileDetailsStart());
    } else {
      yield put(
        notificationSettingsFail(response.message || response.error.message)
      );
      ToastMessage.set(
        toastConst.errorToast,
        response.message || response.error.message
      );
    }
  } catch (error) {
    console.log(error);
    yield put(notificationSettingsFail());
    ToastMessage.set(toastConst.errorToast, wentWrong);
  }
}

function* userSaga() {
  yield takeLatest(Action.COUNTRY_LIST_START, countryTypeList);
  yield takeLatest(Action.LANGUAGE_LIST_START, languageList);
  yield takeLatest(Action.PROFILE_DETAILS_START, profileDetails);
  yield takeLatest(Action.UPDATE_PHONE_NUMBER_START, updatephoneNumber);
  yield takeLatest(Action.UPDATE_PROFILE_START, updateProfile);
  yield takeLatest(Action.CHANGE_EMAIL_START, changeEmail);
  yield takeLatest(Action.CHANGE_MANUAL_TRANSMISSION_START, changeTransmission);
  yield takeLatest(Action.CHANGE_PASSWORD_START, changePassword);
  yield takeLatest(Action.NOTIFICATION_SETTINGS_START, notificationSettings);
}

export default userSaga;

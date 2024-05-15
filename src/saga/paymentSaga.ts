import { put, takeLatest } from "redux-saga/effects";
import { Action } from "../constantActions/index";
import { toastConst, ToastVisibility } from "../constants/constants";
import { responseInterface } from "./interfaceType";
import * as Effects from "redux-saga/effects";
import {
  cardAccessTokenFail,
  cardAccessTokenSuccess,
  cardUpdateFail,
  cardUpdateSuccess,
  createBankAccountFail,
  createBankAccountSuccess,
  createStripeAccountFail,
  createStripeAccountSuccess,
  stripeBalanceFail,
  stripeBalanceSuccess,
  stripePaymentFail,
  stripePaymentSuccess,
  updateBankDetailsFail,
  updateBankDetailsSuccess,
} from "../actions/paymentActions";
import {
  cardAcessTokenService,
  cardUpdateService,
  createBankAccountService,
  createStripeAccountService,
  stripeBalanceService,
  stripePaymentService,
  updateBankDetailsService,
} from "../services/paymentService";
import { navigate } from "../navigators/RootNavigation";
import { profileDetailsStart } from "../actions/userActions";
import ToastMessage from "../components/ToastMessage";

const call: any = Effects.call;

export function* createStripeAccount(payload: object) {
  try {
    const response: responseInterface = yield call(
      createStripeAccountService,
      payload
    );
    if (!response.error) {
      yield put(createStripeAccountSuccess(response));
    } else {
      yield put(
        createStripeAccountFail(response.message || response.error.message)
      );

      ToastMessage.set(
        toastConst.errorToast,
        response.message || response.error.message
      );
    }
  } catch (error) {
    console.log(error);
  }
}

export function* createBankAccount(payload: object) {
  try {
    const response: responseInterface = yield call(
      createBankAccountService,
      payload
    );
    if (!response.error) {
      yield put(createBankAccountSuccess(response));
      yield put(profileDetailsStart());

      ToastMessage.set(toastConst.successToast, "Account Created Successfully");
    } else {
      yield put(
        createBankAccountFail(response.message || response.error.message)
      );
      ToastMessage.set(
        toastConst.errorToast,
        response.message || response.error.message
      );
    }
  } catch (error) {
    console.log(error);
  }
}

export function* updateBankAccount(payload: object) {
  try {
    const response: responseInterface = yield call(
      updateBankDetailsService,
      payload
    );
    if (!response.error) {
      yield put(updateBankDetailsSuccess(response));
      yield put(profileDetailsStart());

      ToastMessage.set(toastConst.successToast, "Bank Details Updated");
    } else {
      yield put(
        updateBankDetailsFail(response.message || response.error.message)
      );
      ToastMessage.set(
        toastConst.errorToast,
        response.message || response.error.message
      );
    }
  } catch (error) {
    console.log(error);
  }
}

export function* cardAcessToken(payload: object) {
  try {
    const response: responseInterface = yield call(
      cardAcessTokenService,
      payload
    );
    if (!response.error) {
      yield put(cardAccessTokenSuccess(response));
    } else {
      yield put(
        cardAccessTokenFail(response.message || response.error.message)
      );
      ToastMessage.set(
        toastConst.errorToast,
        response.message || response.error.message
      );
    }
  } catch (error) {
    console.log(error);
  }
}

export function* stripePayment(payload: object) {
  try {
    const response: responseInterface = yield call(
      stripePaymentService,
      payload
    );
    if (!response.error) {
      yield put(stripePaymentSuccess(response));
    } else {
      yield put(stripePaymentFail(response.message || response.error.message));
      ToastMessage.set(
        toastConst.errorToast,
        response.message || response.error.message
      );
    }
  } catch (error) {
    console.log(error);
  }
}

export function* cardUpdate(payload: object) {
  try {
    const response: responseInterface = yield call(cardUpdateService, payload);
    if (!response.error) {
      yield put(cardUpdateSuccess(response));
    } else {
      yield put(cardUpdateFail(response.message || response.error.message));
      ToastMessage.set(
        toastConst.errorToast,
        response.message || response.error.message
      );
    }
  } catch (error) {
    console.log(error);
  }
}

export function* stripeBalance() {
  try {
    const response: responseInterface = yield call(stripeBalanceService);
    if (!response.error) {
      yield put(stripeBalanceSuccess(response));
    } else {
      yield put(stripeBalanceFail(response.message || response.error.message));
      ToastMessage.set(
        toastConst.errorToast,
        response.message || response.error.message
      );
    }
  } catch (error) {
    console.log(error);
  }
}

function* userSaga() {
  yield takeLatest(Action.CREATE_STRIPE_ACCOUNT_START, createStripeAccount);
  yield takeLatest(Action.CARD_ACCESS_TOKEN_START, cardAcessToken);
  yield takeLatest(Action.STRIPE_PAYMENT_START, stripePayment);
  yield takeLatest(Action.CARD_UPDATE_START, cardUpdate);
  yield takeLatest(Action.STRIPE_BALANCE_START, stripeBalance);
  yield takeLatest(Action.CREATE_BANKACC_START, createBankAccount);
  yield takeLatest(Action.UPDATE_BANK_DETAILS_START, updateBankAccount);
}

export default userSaga;

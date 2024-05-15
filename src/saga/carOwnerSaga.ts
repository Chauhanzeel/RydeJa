import { put, takeLatest } from "redux-saga/effects";
import { Action } from "../constantActions/index";
import {
  carBrandListSuccess,
  carBrandListFail,
  carOwnerCreateCarSuccess,
  carOwnerCreateCarFail,
  switchToCustomerSuccess,
  switchToCustomerFail,
  featuresListSuccess,
  featuresListFail,
  carInfoListSuccess,
  carInfoListFail,
  uploadCarImagesStart,
  uploadCarImagesSuccess,
  uploadCarImagesFail,
  transactionListSuccess,
  transactionListFail,
  ownerReviewListSuccess,
  ownerReviewListFail,
  ownerCarListSuccess,
  ownerCarListFail,
  earningListSuccess,
  earningListFail,
  ownerCarViewSuccess,
  ownerCarViewFail,
  addUnavailableDatesSuccess,
  addUnavailableDatesFail,
  getUnavailableDatesSuccess,
  getUnavailableDatesFail,
  getUnavailableDatesStart,
  ownerCarListLuxSuccess,
  ownerCarListLuxFail,
  carOwnerUpdateCarSuccess,
  carOwnerUpdateCarFail,
  ownerTHListSuccess,
  ownerTHListFail,
  blockCustomerSuccess,
  blockCustomerFail,
} from "../actions/carOwnerActions";
import {
  carBrandListService,
  carOwnerCreateCarService,
  switchToCustomerService,
  featuresListService,
  carInfoListService,
  uploadCarImagesService,
  transactionListService,
  ownerReviewListService,
  ownerCarListService,
  earningListService,
  ownerCarViewService,
  addUnavailableDatesService,
  getUnavailableDatesService,
  carOwnerUpdateCarService,
  ownerTHListService,
  blockCustomerService,
} from "../services/carOwnerService";
import { toastConst, ToastVisibility } from "../constants/constants";
import { responseInterface } from "./interfaceType";

import * as Effects from "redux-saga/effects";
import ToastMessage from "../components/ToastMessage";

const call: any = Effects.call;
const wentWrong = "Something went wrong! Please try again later.";

export function* carBrandList() {
  try {
    const response: responseInterface = yield call(carBrandListService);

    if (response.success) {
      yield put(carBrandListSuccess(response.data));
    } else {
      yield put(carBrandListFail(response.message || response.error.message));
      ToastMessage.set(
        toastConst.errorToast,
        response.message || response.error.message
      );
    }
  } catch (error) {
    console.log(error);
    yield put(carBrandListFail());
    ToastMessage.set(toastConst.errorToast, wentWrong);
  }
}

export function* featuresList() {
  try {
    const response: responseInterface = yield call(featuresListService);

    if (response.success) {
      yield put(featuresListSuccess(response.data));
    } else {
      yield put(featuresListFail(response.message || response.error.message));
      ToastMessage.set(
        toastConst.errorToast,
        response.message || response.error.message
      );
    }
  } catch (error) {
    console.log(error);
    yield put(featuresListFail());
    ToastMessage.set(toastConst.errorToast, wentWrong);
  }
}

export function* carInfoList() {
  try {
    const response: responseInterface = yield call(carInfoListService);

    if (response.success) {
      yield put(carInfoListSuccess(response.data));
    } else {
      yield put(carInfoListFail(response.message || response.error.message));
      ToastMessage.set(
        toastConst.errorToast,
        response.message || response.error.message
      );
    }
  } catch (error) {
    console.log(error);
    yield put(carInfoListFail());
    ToastMessage.set(toastConst.errorToast, wentWrong);
  }
}

export function* carOwnerCreateCar(payload: object) {
  try {
    const response: responseInterface = yield call(
      carOwnerCreateCarService,
      payload
    );

    if (response.success) {
      yield put(carOwnerCreateCarSuccess(response));
      ToastMessage.set(
        toastConst.successToast,
        "Car created successfully. Wait for admin's approval."
      );
    } else {
      yield put(
        carOwnerCreateCarFail(response.message || response.error.message)
      );
      ToastMessage.set(
        toastConst.errorToast,
        response.message || response.error.message
      );
    }
  } catch (error) {
    console.log(error);
    yield put(carOwnerCreateCarFail());
    ToastMessage.set(toastConst.errorToast, wentWrong);
  }
}

export function* carOwnerUpdateCar(payload: object) {
  try {
    const response: responseInterface = yield call(
      carOwnerUpdateCarService,
      payload
    );

    if (response.success) {
      yield put(carOwnerUpdateCarSuccess(response));

      ToastMessage.set(toastConst.successToast, "Updated successfully.");
    } else {
      yield put(
        carOwnerUpdateCarFail(response.message || response.error.message)
      );
      ToastMessage.set(
        toastConst.errorToast,
        response.message || response.error.message
      );
    }
  } catch (error) {
    console.log(error);
    yield put(carOwnerUpdateCarFail());
    ToastMessage.set(toastConst.errorToast, wentWrong);
  }
}

export function* switchToCustomer() {
  try {
    const response: responseInterface = yield call(switchToCustomerService);

    if (response.success) {
      yield put(switchToCustomerSuccess(response));
      ToastMessage.set(toastConst.successToast, "Switched to Customer.");
    } else {
      yield put(
        switchToCustomerFail(response.message || response.error.message)
      );
      ToastMessage.set(
        toastConst.errorToast,
        response.message || response.error.message
      );
    }
  } catch (error) {
    console.log(error);
    yield put(switchToCustomerFail());
    ToastMessage.set(toastConst.errorToast, wentWrong);
  }
}

export function* uploadCarImages(payload: object) {
  try {
    const response: responseInterface = yield call(
      uploadCarImagesService,
      payload
    );

    if (response.success) {
      yield put(uploadCarImagesSuccess(response));

      ToastMessage.set(toastConst.successToast, "Updated successfully.");
    } else {
      yield put(
        uploadCarImagesFail(response.message || response.error.message)
      );
      ToastMessage.set(
        toastConst.errorToast,
        response.message || response.error.message
      );
    }
  } catch (error) {
    console.log(error);
    yield put(uploadCarImagesFail());
    ToastMessage.set(toastConst.errorToast, wentWrong);
  }
}

export function* transactionList() {
  try {
    const response: responseInterface = yield call(transactionListService);

    if (response.success) {
      yield put(transactionListSuccess(response.data));
    } else {
      yield put(
        transactionListFail(response.message || response.error.message)
      );
      ToastMessage.set(
        toastConst.errorToast,
        response.message || response.error.message
      );
    }
  } catch (error) {
    console.log(error);
    yield put(transactionListFail());
    ToastMessage.set(toastConst.errorToast, wentWrong);
  }
}

export function* reviewList(payload: object) {
  try {
    const response: responseInterface = yield call(
      ownerReviewListService,
      payload
    );

    if (response.success) {
      yield put(ownerReviewListSuccess(response.data));
    } else {
      yield put(
        ownerReviewListFail(response.message || response.error.message)
      );
      ToastMessage.set(
        toastConst.errorToast,
        response.message || response.error.message
      );
    }
  } catch (error) {
    console.log(error);
    yield put(ownerReviewListFail());
    ToastMessage.set(toastConst.errorToast, wentWrong);
  }
}

export function* ownerCarList(payload: object) {
  try {
    const response: responseInterface = yield call(
      ownerCarListService,
      payload
    );
    if (response.success) {
      yield put(ownerCarListSuccess(response.data));
    } else {
      yield put(ownerCarListFail(response.message || response.error.message));
      ToastMessage.set(
        toastConst.errorToast,
        response.message || response.error.message
      );
    }
  } catch (error) {
    console.log(error);
    yield put(ownerCarListFail());
    ToastMessage.set(toastConst.errorToast, wentWrong);
  }
}

export function* ownerCarLuxList(payload: object) {
  try {
    const response: responseInterface = yield call(
      ownerCarListService,
      payload
    );
    if (response.success) {
      yield put(ownerCarListLuxSuccess(response.data));
    } else {
      yield put(
        ownerCarListLuxFail(response.message || response.error.message)
      );
      ToastMessage.set(
        toastConst.errorToast,
        response.message || response.error.message
      );
    }
  } catch (error) {
    console.log(error);
    yield put(ownerCarListLuxFail());
    ToastMessage.set(toastConst.errorToast, wentWrong);
  }
}

export function* earningList() {
  try {
    const response: responseInterface = yield call(earningListService);
    if (response.success) {
      yield put(earningListSuccess(response.data));
    } else {
      yield put(earningListFail(response.message || response.error.message));
      ToastMessage.set(
        toastConst.errorToast,
        response.message || response.error.message
      );
    }
  } catch (error) {
    console.log(error);
    yield put(earningListFail());
    ToastMessage.set(toastConst.errorToast, wentWrong);
  }
}

export function* carView(payload: object) {
  try {
    const response: responseInterface = yield call(
      ownerCarViewService,
      payload
    );

    if (response.success) {
      yield put(ownerCarViewSuccess(response.data));
    } else {
      yield put(ownerCarViewFail(response.message || response.error.message));
      ToastMessage.set(
        toastConst.errorToast,
        response.message || response.error.message
      );
    }
  } catch (error) {
    console.log(error);
    yield put(ownerCarViewFail());
    ToastMessage.set(toastConst.errorToast, wentWrong);
  }
}

export function* addUnavailableDates(payload: object) {
  try {
    const response: responseInterface = yield call(
      addUnavailableDatesService,
      payload
    );

    if (response.success) {
      yield put(addUnavailableDatesSuccess(response));
      yield put(getUnavailableDatesStart());
    } else {
      yield put(
        addUnavailableDatesFail(response.message || response.error.message)
      );
      ToastMessage.set(
        toastConst.errorToast,
        response.message || response.error.message
      );
    }
  } catch (error) {
    console.log(error);
    yield put(addUnavailableDatesFail());
    ToastMessage.set(toastConst.errorToast, wentWrong);
  }
}

export function* getUnavailableDates() {
  try {
    const response: responseInterface = yield call(getUnavailableDatesService);

    if (response.success) {
      yield put(getUnavailableDatesSuccess(response.data));
    } else {
      yield put(
        getUnavailableDatesFail(response.message || response.error.message)
      );
      ToastMessage.set(
        toastConst.errorToast,
        response.message || response.error.message
      );
    }
  } catch (error) {
    console.log(error);
    yield put(getUnavailableDatesFail());
    ToastMessage.set(toastConst.errorToast, wentWrong);
  }
}

export function* ownerTHList(payload: object) {
  try {
    const response: responseInterface = yield call(ownerTHListService, payload);
    if (response.success) {
      yield put(ownerTHListSuccess(response.data));
    } else {
      yield put(ownerTHListFail(response.message || response.error.message));
      ToastMessage.set(
        toastConst.errorToast,
        response.message || response.error.message
      );
    }
  } catch (error) {
    console.log(error);
    yield put(ownerTHListFail());
    ToastMessage.set(toastConst.errorToast, wentWrong);
  }
}
export function* blockCustomer(payload: object) {
  try {
    const response: responseInterface = yield call(
      blockCustomerService,
      payload
    );
    if (response.success) {
      yield put(blockCustomerSuccess(response));
    } else {
      yield put(blockCustomerFail(response.message || response.error.message));
      ToastMessage.set(
        toastConst.errorToast,
        response.message || response.error.message
      );
    }
  } catch (error) {
    console.log(error);
    yield put(blockCustomerFail());
    ToastMessage.set(toastConst.errorToast, wentWrong);
  }
}

function* carSaga() {
  yield takeLatest(Action.OWNER_CAR_LIST_START, ownerCarList);
  yield takeLatest(Action.OWNER_CARLUX_LIST_START, ownerCarLuxList);
  yield takeLatest(Action.OWNER_CAR_VIEW_START, carView);
  yield takeLatest(Action.CAR_BRAND_LIST_START, carBrandList);
  yield takeLatest(Action.FEATURE_LIST_START, featuresList);
  yield takeLatest(Action.CAR_INFO_LIST_START, carInfoList);
  yield takeLatest(Action.CAR_OWNER_CREATE_CAR_START, carOwnerCreateCar);
  yield takeLatest(Action.CAR_OWNER_UPDATE_CAR_START, carOwnerUpdateCar);
  yield takeLatest(Action.SWITCH_TO_CUSTOMER_START, switchToCustomer);
  yield takeLatest(Action.UPLOAD_CAR_IMAGES_START, uploadCarImages);
  yield takeLatest(Action.OWNER_TRANSACTION_LIST_START, transactionList);
  yield takeLatest(Action.OWNER_REVIEW_LIST_START, reviewList);
  yield takeLatest(Action.EARNING_LIST_START, earningList);
  yield takeLatest(Action.ADD_UNAVAILABLEDATES_START, addUnavailableDates);
  yield takeLatest(Action.GET_UNAVAILABLEDATES_START, getUnavailableDates);
  yield takeLatest(Action.OWNER_TH_LIST_START, ownerTHList);
  yield takeLatest(Action.BLOCK_CUSTOMER_START, blockCustomer);
}

export default carSaga;

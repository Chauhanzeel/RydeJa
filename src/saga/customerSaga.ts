import { put, takeLatest } from "redux-saga/effects";
import { Action } from "../constantActions/index";
import {
  recentlyViewCarListSuccess,
  recentlyViewCarListFail,
  carListSuccess,
  carListFail,
  parishListSuccess,
  parishListFail,
  carTypeListSuccess,
  carTypeListFail,
  reviewListSuccess,
  reviewListFail,
  favouriteCarAddStart,
  favouriteCarAddFail,
  favouriteCarRemoveStart,
  favouriteCarRemoveFail,
  favouriteCarListSuccess,
  favouriteCarListFail,
  favouriteCarRemoveSuccess,
  favouriteCarListStart,
  favouriteCarAddSuccess,
  driverLicenseCreateSuccess,
  driverLicenseCreateFail,
  closeAccountSuccess,
  closeAccountFail,
  chatListSuccess,
  chatListFail,
  callListSuccess,
  callListFail,
  customerContactListSuccess,
  customerContactListFail,
  carViewSuccess,
  carViewFail,
  createRentalCarSuccess,
  createRentalCarFail,
  historyTripListSuccess,
  historyTripListFail,
  bookedTripListSuccess,
  bookedTripListFail,
  switchToOwnerSuccess,
  switchToOwnerFail,
  rentalCarViewSuccess,
  rentalCarViewFail,
  rentalCarChangeAddressSuccess,
  rentalCarChangeAddressFail,
  rentalCarChangeDatesSuccess,
  rentalCarChangeDatesFail,
  saveCardSuccess,
  saveCardFail,
  saveCardListSuccess,
  saveCardListFail,
  viewCardSuccess,
  viewCardFail,
  deleteCardSuccess,
  deleteCardFail,
  updateCardSuccess,
  updateCardFail,
  insuranceProtectionSuccess,
  insuranceProtectionFail,
  customerCallSuccess,
  customerCallFail,
  customerCallEndSuccess,
  customerCallEndFail,
  bookingCancelSuccess,
  bookingCancelFail,
  bookingCancelReasonSuccess,
  bookingCancelReasonFail,
  saveCardListStart,
  validationCheckSuccess,
  validationCheckFail,
  reserveCarSuccess,
  reserveCarFail,
  amountDetailsSuccess,
  amountDetailsFail,
  promoListFail,
  promoListSuccess,
  carListLuxSuccess,
  carListLuxFail,
  stripeAccDetailsSuccess,
  stripeAccDetailsFail,
  addFundSuccess,
  addFundFail,
  stripeAccDetailsStart,
  bookingCompleteSuccess,
  bookingCompleteFail,
  reviewSuccess,
  reserveCarBookSuccess,
  reserveCarBookFail,
  refundAmountSuccess,
  refundAmountFail,
  rentalCarPIStart,
  rentalCarPISuccess,
  rentalCarPIFail,
  confirmPaymentSuccess,
  confirmPaymentFail,
} from "../actions/customerActions";
import {
  recentlyViewCarListService,
  carListService,
  parishListService,
  carTypeListService,
  reviewListService,
  favouriteCarAddService,
  favouriteCarRemoveService,
  favouriteCarListService,
  driverLicenseCreateService,
  closeAccountService,
  chatListService,
  callListService,
  customerContactListService,
  carViewService,
  sendChatService,
  GetChatHistoryService,
  createRentalCarService,
  historyTripListService,
  bookedTripListService,
  switchToOwnerService,
  rentalCarViewService,
  rentalCarChangeDatesService,
  rentalCarChangeAddressService,
  saveCardService,
  saveCardListService,
  insuranceProtectionService,
  customerCallService,
  customerCallEndService,
  bookingCancelService,
  bookingCancelReasonService,
  deleteCardService,
  updateCardService,
  validationServiceService,
  reserveCarService,
  amountDetailsService,
  viewCardService,
  promoListService,
  stripeAccDetailsService,
  addFundService,
  completeBookingService,
  reviewService,
  reserveCarBookService,
  refundAmountService,
  rentalCarPIService,
  confirmPaymentService,
} from "../services/customerService";
import { toastConst, ToastVisibility } from "../constants/constants";
import { responseInterface } from "./interfaceType";

import * as Effects from "redux-saga/effects";
import { goBack, navigate } from "../navigators/RootNavigation";
import {
  chathistorySendFail,
  chathistorySuccess,
  chatMessageSendFail,
  chatMessageSendSuccess,
} from "../actions/userActions";
import ToastMessage from "../components/ToastMessage";

const call: any = Effects.call;
const wentWrong = "Something went wrong! Please try again later.";

export function* carTypeList() {
  try {
    const response: responseInterface = yield call(carTypeListService);

    if (response.success) {
      yield put(carTypeListSuccess(response.data));
    } else {
      yield put(carTypeListFail(response.message || response.error.message));
      ToastMessage.set(
        toastConst.errorToast,
        response.message || response.error.message
      );
    }
  } catch (error) {
    console.log(error);
    yield put(carTypeListFail());
    ToastMessage.set(toastConst.errorToast, wentWrong);
  }
}

export function* carList(payload: object) {
  try {
    const response: responseInterface = yield call(carListService, payload);
    if (response.success) {
      yield put(carListSuccess(response.data));
    } else {
      yield put(carListFail(response.message || response.error.message));
      ToastMessage.set(
        toastConst.errorToast,
        response.message || response.error.message
      );
    }
  } catch (error) {
    console.log(error);
    yield put(carListFail());
    ToastMessage.set(toastConst.errorToast, wentWrong);
  }
}

export function* carListLux(payload: object) {
  try {
    const response: responseInterface = yield call(carListService, payload);

    if (response.success) {
      yield put(carListLuxSuccess(response.data));
    } else {
      yield put(carListLuxFail(response.message || response.error.message));
      ToastMessage.set(
        toastConst.errorToast,
        response.message || response.error.message
      );
    }
  } catch (error) {
    console.log(error);
    yield put(carListLuxFail());
    ToastMessage.set(toastConst.errorToast, wentWrong);
  }
}

export function* carView(payload: object) {
  try {
    const response: responseInterface = yield call(carViewService, payload);

    if (response.success) {
      yield put(carViewSuccess(response.data));
    } else {
      yield put(carViewFail(response.message || response.error.message));
      ToastMessage.set(
        toastConst.errorToast,
        response.message || response.error.message
      );
    }
  } catch (error) {
    console.log(error);
    yield put(carViewFail());
    ToastMessage.set(toastConst.errorToast, wentWrong);
  }
}

export function* rentalCarView(payload: object) {
  try {
    const response: responseInterface = yield call(
      rentalCarViewService,
      payload
    );
    if (response.success) {
      yield put(rentalCarViewSuccess(response.data));
    } else {
      yield put(rentalCarViewFail(response.message || response.error.message));
      ToastMessage.set(
        toastConst.errorToast,
        response.message || response.error.message
      );
    }
  } catch (error) {
    console.log(error);
    yield put(rentalCarViewFail());
    ToastMessage.set(toastConst.errorToast, wentWrong);
  }
}

export function* rentalCarAddress(payload: object) {
  try {
    const response: responseInterface = yield call(
      rentalCarChangeAddressService,
      payload
    );
    if (response.success) {
      yield put(rentalCarChangeAddressSuccess(response));
    } else {
      yield put(
        rentalCarChangeAddressFail(response.message || response.error.message)
      );
      ToastMessage.set(
        toastConst.errorToast,
        response.message || response.error.message
      );
    }
  } catch (error) {
    console.log(error);
    yield put(rentalCarChangeAddressFail());
    ToastMessage.set(toastConst.errorToast, wentWrong);
  }
}

export function* rentalCarDates(payload: object) {
  try {
    const response: responseInterface = yield call(
      rentalCarChangeDatesService,
      payload
    );
    if (response.success) {
      yield put(rentalCarChangeDatesSuccess(response));
    } else {
      yield put(
        rentalCarChangeDatesFail(response.message || response.error.message)
      );
      ToastMessage.set(
        toastConst.errorToast,
        response.message || response.error.message
      );
    }
  } catch (error) {
    console.log(error);
    yield put(rentalCarChangeDatesFail());
    ToastMessage.set(toastConst.errorToast, wentWrong);
  }
}

export function* recentlyViewCarList() {
  try {
    const response: responseInterface = yield call(recentlyViewCarListService);

    if (response.success) {
      yield put(recentlyViewCarListSuccess(response.data));
    } else {
      yield put(
        recentlyViewCarListFail(response.message || response.error.message)
      );
      ToastMessage.set(
        toastConst.errorToast,
        response.message || response.error.message
      );
    }
  } catch (error) {
    console.log(error);
    yield put(recentlyViewCarListFail());
    ToastMessage.set(toastConst.errorToast, wentWrong);
  }
}

export function* parishList(payload: object) {
  try {
    const response: responseInterface = yield call(parishListService, payload);

    if (response.success) {
      yield put(parishListSuccess(response.data));
    } else {
      yield put(parishListFail(response.message || response.error.message));
      ToastMessage.set(
        toastConst.errorToast,
        response.message || response.error.message
      );
    }
  } catch (error) {
    console.log(error);
    yield put(parishListFail());
    ToastMessage.set(toastConst.errorToast, wentWrong);
  }
}

export function* reviewList(payload: object) {
  try {
    const response: responseInterface = yield call(reviewListService, payload);

    if (response.success) {
      yield put(reviewListSuccess(response.data));
    } else {
      yield put(reviewListFail(response.message || response.error.message));
      ToastMessage.set(
        toastConst.errorToast,
        response.message || response.error.message
      );
    }
  } catch (error) {
    console.log(error);
    yield put(reviewListFail());
    ToastMessage.set(toastConst.errorToast, wentWrong);
  }
}

export function* favouriteCarAdd(payload: object) {
  try {
    const response: responseInterface = yield call(
      favouriteCarAddService,
      payload
    );

    if (response.success) {
      yield put(favouriteCarAddSuccess(response.data));

      ToastMessage.set(toastConst.successToast, "Added to favourites.");
      // yield put(favouriteCarListStart());
    } else {
      yield put(
        favouriteCarAddFail(response.message || response.error.message)
      );
      ToastMessage.set(
        toastConst.errorToast,
        response.message || response.error.message
      );
    }
  } catch (error) {
    console.log(error);
    yield put(favouriteCarAddFail());
    ToastMessage.set(toastConst.errorToast, wentWrong);
  }
}

export function* favouriteCarRemove(payload: object) {
  try {
    const response: responseInterface = yield call(
      favouriteCarRemoveService,
      payload
    );

    if (response.success) {
      yield put(favouriteCarRemoveSuccess(response));

      ToastMessage.set(toastConst.successToast, "Removed from favourites.");
      // yield put(favouriteCarListStart());
    } else {
      yield put(
        favouriteCarRemoveFail(response.message || response.error.message)
      );
      ToastMessage.set(
        toastConst.errorToast,
        response.message || response.error.message
      );
    }
  } catch (error) {
    console.log(error);
    yield put(favouriteCarRemoveFail());
    ToastMessage.set(toastConst.errorToast, wentWrong);
  }
}

export function* favouriteCarList() {
  try {
    const response: responseInterface = yield call(favouriteCarListService);

    if (response.success) {
      yield put(favouriteCarListSuccess(response.data));
    } else {
      yield put(
        favouriteCarListFail(response.message || response.error.message)
      );
      ToastMessage.set(
        toastConst.errorToast,
        response.message || response.error.message
      );
    }
  } catch (error) {
    console.log(error);
    yield put(favouriteCarListFail());
    ToastMessage.set(toastConst.errorToast, wentWrong);
  }
}

export function* driverLicenseCreate(payload: object) {
  try {
    const response: responseInterface = yield call(
      driverLicenseCreateService,
      payload
    );
    if (response.success) {
      yield put(driverLicenseCreateSuccess(response));

      ToastMessage.set(
        toastConst.successToast,
        "Driving licence successfully saved."
      );
    } else {
      yield put(
        driverLicenseCreateFail(response.message || response.error.message)
      );
      ToastMessage.set(
        toastConst.errorToast,
        response.message || response.error.message
      );
    }
  } catch (error) {
    console.log(error);
    yield put(driverLicenseCreateFail());
    ToastMessage.set(toastConst.errorToast, wentWrong);
  }
}

export function* closeAccount(payload: object) {
  try {
    const response: responseInterface = yield call(
      closeAccountService,
      payload
    );
    if (response.success) {
      yield put(closeAccountSuccess(response));
      ToastMessage.set(toastConst.successToast, "Account Closed Successfully");
    } else {
      yield put(closeAccountFail(response.message || response.error.message));
      ToastMessage.set(
        toastConst.errorToast,
        response.message || response.error.message
      );
    }
  } catch (error) {
    console.log(error);
    yield put(closeAccountFail());
    ToastMessage.set(toastConst.errorToast, wentWrong);
  }
}

export function* chatlist() {
  try {
    const response: responseInterface = yield call(chatListService);

    if (response.success) {
      yield put(chatListSuccess(response.data));
    } else {
      yield put(chatListFail(response.message || response.error.message));
      ToastMessage.set(
        toastConst.errorToast,
        response.message || response.error.message
      );
    }
  } catch (error) {
    console.log(error);
    yield put(chatListFail());
    ToastMessage.set(toastConst.errorToast, wentWrong);
  }
}

export function* callList(payload: object) {
  try {
    const response: responseInterface = yield call(callListService);

    if (response.success) {
      yield put(callListSuccess(response.data));
    } else {
      yield put(callListFail(response.message || response.error.message));
      ToastMessage.set(
        toastConst.errorToast,
        response.message || response.error.message
      );
    }
  } catch (error) {
    console.log(error);
    yield put(callListFail());
    ToastMessage.set(toastConst.errorToast, wentWrong);
  }
}

export function* customerContactList() {
  try {
    const response: responseInterface = yield call(customerContactListService);

    if (response.success) {
      yield put(customerContactListSuccess(response.data));
    } else {
      yield put(
        customerContactListFail(response.message || response.error.message)
      );
      ToastMessage.set(
        toastConst.errorToast,
        response.message || response.error.message
      );
    }
  } catch (error) {
    console.log(error);
    yield put(customerContactListFail());
    ToastMessage.set(toastConst.errorToast, wentWrong);
  }
}

export function* SendChatMesssage(payload: object) {
  try {
    const response: responseInterface = yield call(sendChatService, payload);

    if (response.success) {
      yield put(chatMessageSendSuccess(response.data));
    } else {
      yield put(
        chatMessageSendFail(response.message || response.error.message)
      );
      ToastMessage.set(
        toastConst.errorToast,
        response.message || response.error.message
      );
    }
  } catch (error) {
    console.log(error);
    yield put(chatMessageSendFail());
    ToastMessage.set(toastConst.errorToast, wentWrong);
  }
}

export function* GetChatHistory(payload: object) {
  try {
    const response: responseInterface = yield call(
      GetChatHistoryService,
      payload
    );

    if (response.success) {
      yield put(chathistorySuccess(response.data));
    } else {
      yield put(
        chathistorySendFail(response.message || response.error.message)
      );
      ToastMessage.set(
        toastConst.errorToast,
        response.message || response.error.message
      );
    }
  } catch (error) {
    console.log(error);
    yield put(chathistorySendFail());
    ToastMessage.set(toastConst.errorToast, wentWrong);
  }
}

export function* createRentalCar(payload: object) {
  try {
    const response: responseInterface = yield call(
      createRentalCarService,
      payload
    );

    if (response.success) {
      yield put(createRentalCarSuccess(response));
    } else {
      yield put(
        createRentalCarFail(response.message || response.error.message)
      );
      ToastMessage.set(
        toastConst.errorToast,
        response.message || response.error.message
      );
    }
  } catch (error) {
    console.log(error);
    yield put(createRentalCarFail());
    ToastMessage.set(toastConst.errorToast, wentWrong);
  }
}

export function* reserveCarBook(payload: object) {
  try {
    const response: responseInterface = yield call(
      reserveCarBookService,
      payload
    );

    if (response.success) {
      yield put(reserveCarBookSuccess(response));
    } else {
      yield put(reserveCarBookFail(response.message || response.error.message));
      ToastMessage.set(
        toastConst.errorToast,
        response.message || response.error.message
      );
    }
  } catch (error) {
    console.log(error);
    yield put(reserveCarBookFail());
    ToastMessage.set(toastConst.errorToast, wentWrong);
  }
}

export function* rentalCarPI(payload: object) {
  try {
    const response: responseInterface = yield call(rentalCarPIService, payload);

    if (response.success) {
      yield put(rentalCarPISuccess(response));
    } else {
      yield put(rentalCarPIFail(response.message || response.error.message));
      ToastMessage.set(
        toastConst.errorToast,
        response.message || response.error.message
      );
    }
  } catch (error) {
    console.log(error);
    yield put(rentalCarPIFail());
    ToastMessage.set(toastConst.errorToast, wentWrong);
  }
}

export function* confirmPayment(payload: object) {
  try {
    const response: responseInterface = yield call(
      confirmPaymentService,
      payload
    );

    if (response.success) {
      yield put(confirmPaymentSuccess(response));
    } else {
      yield put(confirmPaymentFail(response.message || response.error.message));
      ToastMessage.set(
        toastConst.errorToast,
        response.message || response.error.message
      );
    }
  } catch (error) {
    console.log(error);
    yield put(confirmPaymentFail());
    ToastMessage.set(toastConst.errorToast, wentWrong);
  }
}

export function* historyTripList(payload: object) {
  try {
    const response: responseInterface = yield call(
      historyTripListService,
      payload
    );

    if (response.success) {
      yield put(historyTripListSuccess(response.data));
    } else {
      yield put(
        historyTripListFail(response.message || response.error.message)
      );
      ToastMessage.set(
        toastConst.errorToast,
        response.message || response.error.message
      );
    }
  } catch (error) {
    console.log(error);
    yield put(historyTripListFail());
    ToastMessage.set(toastConst.errorToast, wentWrong);
  }
}

export function* bookedTripList(payload: object) {
  try {
    const response: responseInterface = yield call(
      bookedTripListService,
      payload
    );

    if (response.success) {
      yield put(bookedTripListSuccess(response.data));
    } else {
      yield put(bookedTripListFail(response.message || response.error.message));
      ToastMessage.set(
        toastConst.errorToast,
        response.message || response.error.message
      );
    }
  } catch (error) {
    console.log(error);
    yield put(bookedTripListFail());
    ToastMessage.set(toastConst.errorToast, wentWrong);
  }
}

export function* saveCard(payload: object) {
  try {
    const response: responseInterface = yield call(saveCardService, payload);

    if (response.success) {
      yield put(saveCardSuccess(response));
      ToastMessage.set(toastConst.successToast, "Card successfully saved.");
    } else {
      yield put(saveCardFail(response.message || response.error.message));
      ToastMessage.set(
        toastConst.errorToast,
        response.message || response.error.message
      );
    }
  } catch (error) {
    console.log(error);
    yield put(saveCardFail());
    ToastMessage.set(toastConst.errorToast, wentWrong);
  }
}

export function* viewCard(payload: object) {
  try {
    const response: responseInterface = yield call(viewCardService, payload);

    if (response.success) {
      yield put(viewCardSuccess(response.data));
    } else {
      yield put(viewCardFail(response.message || response.error.message));
      ToastMessage.set(
        toastConst.errorToast,
        response.message || response.error.message
      );
    }
  } catch (error) {
    console.log(error);
    yield put(viewCardFail());
    ToastMessage.set(toastConst.errorToast, wentWrong);
  }
}

export function* deleteCard(payload: object) {
  try {
    const response: responseInterface = yield call(deleteCardService, payload);

    if (response.success) {
      yield put(deleteCardSuccess(response));

      ToastMessage.set(toastConst.successToast, "Card Deleted Successfully");
      yield put(saveCardListStart());
    } else {
      yield put(deleteCardFail(response.message || response.error.message));
      ToastMessage.set(
        toastConst.errorToast,
        response.message || response.error.message
      );
    }
  } catch (error) {
    console.log(error);
    yield put(deleteCardFail());
    ToastMessage.set(toastConst.errorToast, wentWrong);
  }
}

export function* updateCard(payload: object) {
  try {
    const response: responseInterface = yield call(updateCardService, payload);

    if (response.success) {
      yield put(updateCardSuccess(response.data));
    } else {
      yield put(updateCardFail(response.message || response.error.message));
      ToastMessage.set(
        toastConst.errorToast,
        response.message || response.error.message
      );
    }
  } catch (error) {
    console.log(error);
    yield put(updateCardFail());
    ToastMessage.set(toastConst.errorToast, wentWrong);
  }
}

export function* saveCardList() {
  try {
    const response: responseInterface = yield call(saveCardListService);

    if (response.success) {
      yield put(saveCardListSuccess(response.data));
    } else {
      yield put(saveCardListFail(response.message || response.error.message));
      ToastMessage.set(
        toastConst.errorToast,
        response.message || response.error.message
      );
    }
  } catch (error) {
    console.log(error);
    yield put(saveCardListFail());
    ToastMessage.set(toastConst.errorToast, wentWrong);
  }
}

export function* switchToOwner() {
  try {
    const response: responseInterface = yield call(switchToOwnerService);

    if (response.success) {
      yield put(switchToOwnerSuccess(response));
      ToastMessage.set(toastConst.successToast, "Switched to Host.");
    } else {
      yield put(switchToOwnerFail(response.message || response.error.message));
      ToastMessage.set(
        toastConst.errorToast,
        response.message || response.error.message
      );
    }
  } catch (error) {
    console.log(error);
    yield put(switchToOwnerFail());
    ToastMessage.set(toastConst.errorToast, wentWrong);
  }
}

export function* insuranceProtection(payload: object) {
  try {
    const response: responseInterface = yield call(
      insuranceProtectionService,
      payload
    );

    if (response.success) {
      yield put(insuranceProtectionSuccess(response.data));
    } else {
      yield put(insuranceProtectionFail(response.message));
      ToastMessage.set(
        toastConst.errorToast,
        response.message || response.error.message
      );
    }
  } catch (error) {
    console.log(error);
    yield put(insuranceProtectionFail());
    ToastMessage.set(toastConst.errorToast, wentWrong);
  }
}

export function* customerCallStart(payload: object) {
  try {
    const response: responseInterface = yield call(
      customerCallService,
      payload
    );

    if (response.success) {
      yield put(customerCallSuccess(response.data));
    } else {
      yield put(customerCallFail(response.message));
      ToastMessage.set(
        toastConst.errorToast,
        response.message || response.error.message
      );
    }
  } catch (error) {
    console.log(error);
    yield put(customerCallFail());
    ToastMessage.set(toastConst.errorToast, wentWrong);
  }
}

export function* customerCallEndStart(payload: object) {
  try {
    const response: responseInterface = yield call(
      customerCallEndService,
      payload
    );

    if (response.success) {
      yield put(customerCallEndSuccess(response));
      goBack();
    } else {
      yield put(customerCallEndFail(response.message));
      ToastMessage.set(
        toastConst.errorToast,
        response.message || response.error.message
      );
    }
  } catch (error) {
    console.log(error);
    yield put(customerCallEndFail());
    ToastMessage.set(toastConst.errorToast, wentWrong);
  }
}

export function* bookingCarCancel(payload: object) {
  try {
    const response: responseInterface = yield call(
      bookingCancelService,
      payload
    );
    if (response.success) {
      yield put(bookingCancelSuccess(response));
    } else {
      yield put(bookingCancelFail(response.error.message));
      ToastMessage.set(
        toastConst.errorToast,
        response.message || response.error.message
      );
    }
  } catch (error) {
    console.log(error);
    yield put(bookingCancelFail());
    ToastMessage.set(toastConst.errorToast, wentWrong);
  }
}

export function* bookingCancelReason() {
  try {
    const response: responseInterface = yield call(bookingCancelReasonService);

    if (response.success) {
      yield put(bookingCancelReasonSuccess(response.data));
    } else {
      yield put(
        bookingCancelReasonFail(response.message || response.error.message)
      );
      ToastMessage.set(
        toastConst.errorToast,
        response.message || response.error.message
      );
    }
  } catch (error) {
    console.log(error);
    yield put(bookingCancelReasonFail());
    ToastMessage.set(toastConst.errorToast, wentWrong);
  }
}

export function* validationCheck() {
  try {
    const response: responseInterface = yield call(validationServiceService);
    if (response.success) {
      yield put(validationCheckSuccess(response.data));
    } else {
      yield put(
        validationCheckFail(response.message || response.error.message)
      );
      ToastMessage.set(
        toastConst.errorToast,
        response.message || response.error.message
      );
    }
  } catch (error) {
    console.log(error);

    yield put(validationCheckFail());
    ToastMessage.set(toastConst.errorToast, wentWrong);
  }
}

export function* reserveCar(payload: object) {
  try {
    const response: responseInterface = yield call(reserveCarService, payload);
    if (response.success) {
      yield put(reserveCarSuccess(response));
    } else {
      yield put(reserveCarFail(response.message || response.error.message));
      ToastMessage.set(
        toastConst.errorToast,
        response.message || response.error.message
      );
    }
  } catch (error) {
    console.log(error);
    yield put(reserveCarFail());
    ToastMessage.set(toastConst.errorToast, wentWrong);
  }
}

export function* amountDetails(payload: object) {
  try {
    const response: responseInterface = yield call(
      amountDetailsService,
      payload
    );
    if (response.success) {
      yield put(amountDetailsSuccess(response.data));
    } else {
      yield put(amountDetailsFail(response.message || response.error.message));
      ToastMessage.set(
        toastConst.errorToast,
        response.message || response.error.message
      );
    }
  } catch (error) {
    console.log(error);
    yield put(amountDetailsFail());
    ToastMessage.set(toastConst.errorToast, wentWrong);
  }
}

export function* refundAmount(payload: object) {
  try {
    const response: responseInterface = yield call(
      refundAmountService,
      payload
    );

    if (response.success) {
      yield put(refundAmountSuccess(response.data));
    } else {
      yield put(refundAmountFail(response.message || response.error.message));
      ToastMessage.set(
        toastConst.errorToast,
        response.message || response.error.message
      );
    }
  } catch (error) {
    console.log(error);
    yield put(refundAmountFail());
    ToastMessage.set(toastConst.errorToast, wentWrong);
  }
}

export function* promoList() {
  try {
    const response: responseInterface = yield call(promoListService);

    if (response.success) {
      yield put(promoListSuccess(response));
    } else {
      yield put(promoListFail(response.message || response.error.message));
      ToastMessage.set(
        toastConst.errorToast,
        response.message || response.error.message
      );
    }
  } catch (error) {
    console.log(error);
    yield put(promoListFail());
    ToastMessage.set(toastConst.errorToast, wentWrong);
  }
}

export function* stripeAccDetails() {
  try {
    const response: responseInterface = yield call(stripeAccDetailsService);

    if (!response.error) {
      yield put(stripeAccDetailsSuccess(response.data));
    } else {
      yield put(
        stripeAccDetailsFail(response.message || response.error.message)
      );
      ToastMessage.set(
        toastConst.errorToast,
        response.message || response.error.message
      );
    }
  } catch (error) {
    console.log(error);
    yield put(stripeAccDetailsFail());
    ToastMessage.set(toastConst.errorToast, wentWrong);
  }
}

export function* addFund(payload: object) {
  try {
    const response: responseInterface = yield call(addFundService, payload);

    if (response.success) {
      yield put(addFundSuccess(response));
    } else {
      yield put(addFundFail(response.message || response.error.message));
      ToastMessage.set(
        toastConst.errorToast,
        response.message || response.error.message
      );
    }
  } catch (error) {
    console.log(error);
    yield put(addFundFail());
    ToastMessage.set(toastConst.errorToast, wentWrong);
  }
}

export function* completeBooking(payload: object) {
  try {
    const response: responseInterface = yield call(
      completeBookingService,
      payload
    );

    if (response.success) {
      yield put(bookingCompleteSuccess(response));
    } else {
      yield put(
        bookingCompleteFail(response.message || response.error.message)
      );
      ToastMessage.set(
        toastConst.errorToast,
        response.message || response.error.message
      );
    }
  } catch (error) {
    console.log(error);
    yield put(bookingCompleteFail());
    ToastMessage.set(toastConst.errorToast, wentWrong);
  }
}

export function* givereview(payload: object) {
  try {
    const response: responseInterface = yield call(reviewService, payload);

    if (response.success) {
      yield put(reviewSuccess(response));
    } else {
      yield put(reviewListFail(response.message || response.error.message));
      ToastMessage.set(
        toastConst.errorToast,
        response.message || response.error.message
      );
    }
  } catch (error) {
    console.log(error);
    yield put(reviewListFail());
    ToastMessage.set(toastConst.errorToast, wentWrong);
  }
}

function* carSaga() {
  yield takeLatest(Action.CAR_TYPE_LIST_START, carTypeList);
  yield takeLatest(Action.CAR_LIST_START, carList);
  yield takeLatest(Action.RECENT_VIEW_CAR_LIST_START, recentlyViewCarList);
  yield takeLatest(Action.PARISH_LIST_START, parishList);
  yield takeLatest(Action.REVIEW_LIST_START, reviewList);
  yield takeLatest(Action.FAVOURITE_CAR_ADD_START, favouriteCarAdd);
  yield takeLatest(Action.FAVOURITE_CAR_REMOVE_START, favouriteCarRemove);
  yield takeLatest(Action.FAVOURITE_CAR_LIST_START, favouriteCarList);
  yield takeLatest(Action.DRIVER_LICENSE_CREATE_START, driverLicenseCreate);
  yield takeLatest(Action.CLOSE_ACCOUNT_START, closeAccount);
  yield takeLatest(Action.CHAT_LIST_START, chatlist);
  yield takeLatest(Action.CALL_LIST_START, callList);
  yield takeLatest(Action.CUSTOMER_CONTACT_LIST_START, customerContactList);
  yield takeLatest(Action.CAR_VIEW_START, carView);

  yield takeLatest(Action.RENTALCAR_VIEW_START, rentalCarView);
  yield takeLatest(Action.RENTALCAR_ADDRESS_START, rentalCarAddress);
  yield takeLatest(Action.RENTALCAR_DATES_START, rentalCarDates);

  yield takeLatest(Action.CHAT_MESSAGE_SEND_START, SendChatMesssage);
  yield takeLatest(Action.CUSTOMER_CALL_START, customerCallStart);
  yield takeLatest(Action.CUSTOMER_CALLEND_START, customerCallEndStart);
  yield takeLatest(Action.CHAT_MESSAGE_HISTORY_START, GetChatHistory);
  yield takeLatest(Action.CREATE_RENTAL_CAR_START, createRentalCar);
  yield takeLatest(Action.HISTORY_TRIP_LIST_START, historyTripList);
  yield takeLatest(Action.BOOKED_TRIP_LIST_START, bookedTripList);
  yield takeLatest(Action.SWITCH_TO_OWNER_START, switchToOwner);
  yield takeLatest(Action.SAVE_CARD_START, saveCard);
  yield takeLatest(Action.VIEW_CARD_START, viewCard);
  yield takeLatest(Action.UPDATE_CARD_START, updateCard);
  yield takeLatest(Action.DELETE_CARD_START, deleteCard);
  yield takeLatest(Action.SAVE_CARDLIST_START, saveCardList);
  yield takeLatest(Action.INSURANCEPROTECTION_START, insuranceProtection);

  yield takeLatest(Action.BOOKING_CANCEL_REASON_START, bookingCancelReason);
  yield takeLatest(Action.BOOKING_CANCEL_START, bookingCarCancel);
  yield takeLatest(Action.VALIDATION_CHECK_START, validationCheck);
  yield takeLatest(Action.RESERVE_CAR_START, reserveCar);
  yield takeLatest(Action.AMOUNT_DETAILS_START, amountDetails);
  yield takeLatest(Action.PROMO_LIST_START, promoList);
  yield takeLatest(Action.CARLUX_LIST_START, carListLux);
  yield takeLatest(Action.STRIPE_ACC_DETAILS_START, stripeAccDetails);
  yield takeLatest(Action.ADD_FUND_START, addFund);

  yield takeLatest(Action.REVIEW_START, givereview);
  yield takeLatest(Action.COMPLETE_BOOKING_START, completeBooking);
  yield takeLatest(Action.RESERVECAR_BOOK_START, reserveCarBook);
  yield takeLatest(Action.REFUND_AMOUNT_START, refundAmount);
  yield takeLatest(Action.RENTALCAR_PI_START, rentalCarPI);
  yield takeLatest(Action.CONFIRM_PAYMENT_START, confirmPayment);
}

export default carSaga;

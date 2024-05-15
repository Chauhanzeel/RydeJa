import { Action } from "../constantActions/index";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface SignupInterface {
  data: object;
}

/////////////CAR TYPE LIST///////////////////
export const carTypeListStart = () => {
  return {
    type: Action.CAR_TYPE_LIST_START,
  };
};
export const carTypeListSuccess = (payload: object) => {
  return {
    type: Action.CAR_TYPE_LIST_SUCCESS,
    carTypeListData: payload,
  };
};
export const carTypeListFail = (error?: string) => {
  return {
    type: Action.CAR_TYPE_LIST_FAIL,
    payload: error,
  };
};

/////////////CAR LIST///////////////////
export const carListStart = (params: object) => {
  return {
    type: Action.CAR_LIST_START,
    payload: params,
  };
};
export const carListSuccess = (payload: object) => {
  return {
    type: Action.CAR_LIST_SUCCESS,
    carListData: payload,
  };
};
export const carListFail = (error?: string) => {
  return {
    type: Action.CAR_LIST_FAIL,
    payload: error,
  };
};

/////////////CAR LIST///////////////////
export const carListLuxStart = (params: object) => {
  return {
    type: Action.CARLUX_LIST_START,
    payload: params,
  };
};
export const carListLuxSuccess = (payload: object) => {
  return {
    type: Action.CARLUX_LIST_SUCCESS,
    carListlux: payload,
  };
};
export const carListLuxFail = (error?: string) => {
  return {
    type: Action.CARLUX_LIST_FAIL,
    payload: error,
  };
};

/////////////CAR VIEW///////////////////
export const carViewStart = (params: object) => {
  return {
    type: Action.CAR_VIEW_START,
    payload: params,
  };
};
export const carViewSuccess = (payload: object) => {
  return {
    type: Action.CAR_VIEW_SUCCESS,
    carViewData: payload,
  };
};
export const carViewFail = (error?: string) => {
  return {
    type: Action.CAR_VIEW_FAIL,
    payload: error,
  };
};

/////////////Rental CAR VIEW///////////////////
export const rentalCarViewStart = (params: object) => {
  return {
    type: Action.RENTALCAR_VIEW_START,
    payload: params,
  };
};
export const rentalCarViewSuccess = (payload: object) => {
  return {
    type: Action.RENTALCAR_VIEW_SUCCESS,
    rentalCarViewData: payload,
  };
};
export const rentalCarViewFail = (error?: string) => {
  return {
    type: Action.RENTALCAR_VIEW_CAR_FAIL,
    payload: error,
  };
};

/////////////Rental CAR adresss///////////////////
export const rentalCarChangeAddressStart = (params: object) => {
  return {
    type: Action.RENTALCAR_ADDRESS_START,
    payload: params,
  };
};
export const rentalCarChangeAddressSuccess = (payload: object) => {
  return {
    type: Action.RENTALCAR_ADDRESS_SUCCESS,
    rentalCarAddressData: payload,
  };
};
export const rentalCarChangeAddressFail = (error?: string) => {
  return {
    type: Action.RENTALCAR_ADDRESS_FAIL,
    payload: error,
  };
};

/////////////Rental CAR dats///////////////////
export const rentalCarChangeDatesStart = (params: object) => {
  return {
    type: Action.RENTALCAR_DATES_START,
    payload: params,
  };
};
export const rentalCarChangeDatesSuccess = (payload: object) => {
  return {
    type: Action.RENTALCAR_DATES_SUCCESS,
    rentalCarDatesData: payload,
  };
};
export const rentalCarChangeDatesFail = (error?: string) => {
  return {
    type: Action.RENTALCAR_DATES_FAIL,
    payload: error,
  };
};

/////////////RECENTLY VIEW CAR LIST///////////////////
export const recentlyViewCarListStart = () => {
  return {
    type: Action.RECENT_VIEW_CAR_LIST_START,
  };
};
export const recentlyViewCarListSuccess = (payload: object) => {
  return {
    type: Action.RECENT_VIEW_CAR_LIST_SUCCESS,
    recentlyViewCarListData: payload,
  };
};
export const recentlyViewCarListFail = (error?: string) => {
  return {
    type: Action.RECENT_VIEW_CAR_LIST_FAIL,
    payload: error,
  };
};

/////////////PARISH LIST///////////////////
export const parishListStart = (params: object) => {
  return {
    type: Action.PARISH_LIST_START,
    payload: params,
  };
};
export const parishListSuccess = (payload: object) => {
  return {
    type: Action.PARISH_LIST_SUCCESS,
    parishListData: payload,
  };
};
export const parishListFail = (error?: string) => {
  return {
    type: Action.PARISH_LIST_FAIL,
    payload: error,
  };
};

/////////////REVIEW LIST///////////////////
export const reviewListStart = (params: object) => {
  return {
    type: Action.REVIEW_LIST_START,
    payload: params,
  };
};
export const reviewListSuccess = (payload: object) => {
  return {
    type: Action.REVIEW_LIST_SUCCESS,
    reviewListData: payload,
  };
};
export const reviewListFail = (error?: string) => {
  return {
    type: Action.REVIEW_LIST_FAIL,
    payload: error,
  };
};

/////////////FAVOURITE CAR LIST///////////////////
export const favouriteCarListStart = () => {
  return {
    type: Action.FAVOURITE_CAR_LIST_START,
  };
};
export const favouriteCarListSuccess = (payload: object) => {
  return {
    type: Action.FAVOURITE_CAR_LIST_SUCCESS,
    favouriteCarListData: payload,
  };
};
export const favouriteCarListFail = (error?: string) => {
  return {
    type: Action.FAVOURITE_CAR_LIST_FAIL,
    payload: error,
  };
};

/////////////FAVOURITE CAR ADD///////////////////
export const favouriteCarAddStart = (params: object) => {
  return {
    type: Action.FAVOURITE_CAR_ADD_START,
    payload: params,
  };
};
export const favouriteCarAddSuccess = (payload: object) => {
  return {
    type: Action.FAVOURITE_CAR_ADD_SUCCESS,
    favouriteCarAddData: payload,
  };
};
export const favouriteCarAddFail = (error?: string) => {
  return {
    type: Action.FAVOURITE_CAR_ADD_FAIL,
    payload: error,
  };
};

/////////////FAVOURITE REMOVE ADD///////////////////
export const favouriteCarRemoveStart = (params: object) => {
  return {
    type: Action.FAVOURITE_CAR_REMOVE_START,
    payload: params,
  };
};
export const favouriteCarRemoveSuccess = (payload: object) => {
  return {
    type: Action.FAVOURITE_CAR_REMOVE_SUCCESS,
    favouriteCarRemoveData: payload,
  };
};
export const favouriteCarRemoveFail = (error?: string) => {
  return {
    type: Action.FAVOURITE_CAR_REMOVE_FAIL,
    payload: error,
  };
};

/////////////DRIVER LICENSE CREATE///////////////////
export const driverLicenseCreateStart = (params: object) => {
  return {
    type: Action.DRIVER_LICENSE_CREATE_START,
    payload: params,
  };
};
export const driverLicenseCreateSuccess = (payload: object) => {
  return {
    type: Action.DRIVER_LICENSE_CREATE_SUCCESS,
    driverLicenseCreateData: payload,
  };
};
export const driverLicenseCreateFail = (error?: string) => {
  return {
    type: Action.DRIVER_LICENSE_CREATE_FAIL,
    payload: error,
  };
};

/////////////CUSTOMER CONTACT LIST ///////////////////
export const customerContactListStart = () => {
  return {
    type: Action.CUSTOMER_CONTACT_LIST_START,
  };
};
export const customerContactListSuccess = (payload: object) => {
  return {
    type: Action.CUSTOMER_CONTACT_LIST_SUCCESS,
    customerContactListData: payload,
  };
};
export const customerContactListFail = (error?: string) => {
  return {
    type: Action.CUSTOMER_CONTACT_LIST_FAIL,
    payload: error,
  };
};

/////////////CLOSE ACCOUNT ///////////////////
export const closeAccountStart = (params: object) => {
  return {
    type: Action.CLOSE_ACCOUNT_START,
    payload: params,
  };
};
export const closeAccountSuccess = (payload: object) => {
  return {
    type: Action.CLOSE_ACCOUNT_SUCCESS,
    closeAccountData: payload,
  };
};
export const closeAccountFail = (error?: string) => {
  return {
    type: Action.CLOSE_ACCOUNT_FAIL,
    payload: error,
  };
};

/////////////CHAT LIST ///////////////////
export const chatListStart = () => {
  return {
    type: Action.CHAT_LIST_START,
  };
};
export const chatListSuccess = (payload: object) => {
  return {
    type: Action.CHAT_LIST_SUCCESS,
    chatListData: payload,
  };
};
export const chatListFail = (error?: string) => {
  return {
    type: Action.CHAT_LIST_FAIL,
    payload: error,
  };
};

/////////////CALL LIST ///////////////////
export const callListStart = () => {
  return {
    type: Action.CALL_LIST_START,
  };
};
export const callListSuccess = (payload: object) => {
  return {
    type: Action.CALL_LIST_SUCCESS,
    callListData: payload,
  };
};
export const callListFail = (error?: string) => {
  return {
    type: Action.CALL_LIST_FAIL,
    payload: error,
  };
};

/////////////Rental car ///////////////////
export const createRentalCarStart = (params: object) => {
  return {
    type: Action.CREATE_RENTAL_CAR_START,
    payload: params,
  };
};
export const createRentalCarSuccess = (payload: object) => {
  return {
    type: Action.CREATE_RENTAL_CAR_SUCCESS,
    rentalCarData: payload,
  };
};
export const createRentalCarFail = (error?: string) => {
  return {
    type: Action.CREATE_RENTAL_CAR_FAIL,
  };
};

/////////////ReserveCar Booking ///////////////////
export const reserveCarBookStart = (params: object) => {
  return {
    type: Action.RESERVECAR_BOOK_START,
    payload: params,
  };
};
export const reserveCarBookSuccess = (payload: object) => {
  return {
    type: Action.RESERVECAR_BOOK_SUCCESS,
    reserveCarBookData: payload,
  };
};
export const reserveCarBookFail = (error?: string) => {
  return {
    type: Action.RESERVECAR_BOOK_FAIL,
  };
};

///////////// BOOKED TRIP LIST ///////////////////
export const bookedTripListStart = (params: object) => {
  return {
    type: Action.BOOKED_TRIP_LIST_START,
    payload: params,
  };
};
export const bookedTripListSuccess = (payload: object) => {
  return {
    type: Action.BOOKED_TRIP_CAR_LIST_SUCCESS,
    bookedTripListData: payload,
  };
};
export const bookedTripListFail = (error?: string) => {
  return {
    type: Action.BOOKED_TRIP_CAR_LIST_FAIL,
    payload: error,
  };
};

///////////// MAKE PAYMENT ///////////////////
export const makePaymentStart = (params: object) => {
  return {
    type: Action.MAKE_PAYMENT_START,
    payload: params,
  };
};
export const makePaymentSuccess = (payload: object) => {
  return {
    type: Action.MAKE_PAYMENT_SUCCESS,
    makePaymentData: payload,
  };
};
export const makePaymentFail = (error?: string) => {
  return {
    type: Action.MAKE_PAYMENT_FAIL,
    payload: error,
  };
};

///////////// cancel trip ///////////////////
export const cancleTripStart = (params: object) => {
  return {
    type: Action.CANCEL_TRIP_START,
    payload: params,
  };
};
export const cancleTripSuccess = (payload: object) => {
  return {
    type: Action.CANCEL_TRIP_SUCCESS,
    cancleTripData: payload,
  };
};
export const cancleTripFail = (error?: string) => {
  return {
    type: Action.CANCEL_TRIP_FAIL,
    payload: error,
  };
};

///////////// HISTORY TRIP LIST ///////////////////
export const historyTripListStart = (params: object) => {
  return {
    type: Action.HISTORY_TRIP_LIST_START,
    payload: params,
  };
};
export const historyTripListSuccess = (payload: object) => {
  return {
    type: Action.HISTORY_TRIP_LIST_SUCCESS,
    historyTripListData: payload,
  };
};
export const historyTripListFail = (error?: string) => {
  return {
    type: Action.HISTORY_TRIP_LIST_FAIL,
    payload: error,
  };
};

///////////// SWITCH TO OWNER///////////////////
export const switchToOwnerStart = () => {
  return {
    type: Action.SWITCH_TO_OWNER_START,
  };
};
export const switchToOwnerSuccess = (payload: object) => {
  return {
    type: Action.SWITCH_TO_OWNER_SUCCESS,
    switchToOwnerData: payload,
  };
};
export const switchToOwnerFail = (error?: string) => {
  return {
    type: Action.SWITCH_TO_OWNER_FAIL,
    payload: error,
  };
};

///////////// Save Card///////////////////
export const saveCardStart = (params: object) => {
  return {
    type: Action.SAVE_CARD_START,
    payload: params,
  };
};
export const saveCardSuccess = (payload: object) => {
  return {
    type: Action.SAVE_CARD_SUCCESS,
    saveCard: payload,
  };
};
export const saveCardFail = (error?: string) => {
  return {
    type: Action.SAVE_CARD_FAIL,
    payload: error,
  };
};

///////////// list Card///////////////////
export const saveCardListStart = () => {
  return {
    type: Action.SAVE_CARDLIST_START,
  };
};
export const saveCardListSuccess = (payload: object) => {
  return {
    type: Action.SAVE_CARDLIST_SUCCESS,
    saveCardList: payload,
  };
};
export const saveCardListFail = (error?: string) => {
  return {
    type: Action.SAVE_CARDLIST_FAIL,
    payload: error,
  };
};

///////////// View Card///////////////////
export const viewCardStart = (params: object) => {
  return {
    type: Action.VIEW_CARD_START,
    payload: params,
  };
};
export const viewCardSuccess = (payload: object) => {
  return {
    type: Action.VIEW_CARD_SUCCESS,
    viewCard: payload,
  };
};
export const viewCardFail = (error?: string) => {
  return {
    type: Action.VIEW_CARD_FAIL,
    payload: error,
  };
};

///////////// INSURANCE PROTECTION  ///////////////////
export const insuranceProtectionStart = (params: object) => {
  return {
    type: Action.INSURANCEPROTECTION_START,
    payload: params,
  };
};
export const insuranceProtectionSuccess = (payload: object) => {
  return {
    type: Action.INSURANCEPROTECTION_SUCCESS,
    insuranceProtectionData: payload,
  };
};
export const insuranceProtectionFail = (error?: string) => {
  return {
    type: Action.INSURANCEPROTECTION_FAIL,
    payload: error,
  };
};

///////////// update Card///////////////////
export const updateCardStart = (params: object) => {
  return {
    type: Action.UPDATE_CARD_START,
    payload: params,
  };
};
export const updateCardSuccess = (payload: object) => {
  return {
    type: Action.UPDATE_CARD_SUCCESS,
    viewCard: payload,
  };
};
export const updateCardFail = (error?: string) => {
  return {
    type: Action.UPDATE_CARD_FAIL,
    payload: error,
  };
};

///////////// delete Card///////////////////
export const deleteCardStart = (params: object) => {
  return {
    type: Action.DELETE_CARD_START,
    payload: params,
  };
};
export const deleteCardSuccess = (payload: object) => {
  return {
    type: Action.DELETE_CARD_SUCCESS,
    viewCard: payload,
  };
};
export const deleteCardFail = (error?: string) => {
  return {
    type: Action.DELETE_CARD_FAIL,
    payload: error,
  };
};

/////////////call Start///////////////////
export const customerCallStart = (params: object) => {
  return {
    type: Action.CUSTOMER_CALL_START,
    payload: params,
  };
};
export const customerCallSuccess = (payload: object) => {
  return {
    type: Action.CUSTOMER_CALL_SUCCESS,
    customerCallData: payload,
  };
};
export const customerCallFail = (error?: string) => {
  return {
    type: Action.CUSTOMER_CALL_FAIL,
    payload: error,
  };
};

/////////////call End///////////////////
export const customerCallEndStart = (params: object) => {
  return {
    type: Action.CUSTOMER_CALLEND_START,
    payload: params,
  };
};
export const customerCallEndSuccess = (payload: object) => {
  return {
    type: Action.CUSTOMER_CALLEND_SUCCESS,
    customerCallEndData: payload,
  };
};
export const customerCallEndFail = (error?: string) => {
  return {
    type: Action.CUSTOMER_CALLEND_FAIL,
    payload: error,
  };
};

/////////////booking Cancel///////////////////
export const bookingCancelStart = (params: object) => {
  return {
    type: Action.BOOKING_CANCEL_START,
    payload: params,
  };
};
export const bookingCancelSuccess = (payload: object) => {
  return {
    type: Action.BOOKING_CANCEL_SUCCESS,
    bookingCancelData: payload,
  };
};
export const bookingCancelFail = (error?: string) => {
  return {
    type: Action.BOOKING_CANCEL_FAIL,
    payload: error,
  };
};

/////////////booking Cancel reason///////////////////
export const bookingCancelReasonStart = () => {
  return {
    type: Action.BOOKING_CANCEL_REASON_START,
  };
};
export const bookingCancelReasonSuccess = (payload: object) => {
  return {
    type: Action.BOOKING_CANCEL_REASON_SUCCESS,
    bookingCancelReasonList: payload,
  };
};
export const bookingCancelReasonFail = (error?: string) => {
  return {
    type: Action.BOOKING_CANCEL_REASON_FAIL,
    payload: error,
  };
};

/////////////Validation API///////////////////
export const validationCheckStart = (params: object) => {
  return {
    type: Action.VALIDATION_CHECK_START,
    payload: params,
  };
};
export const validationCheckSuccess = (payload: object) => {
  return {
    type: Action.VALIDATION_CHECK_SUCCESS,
    validationObj: payload,
  };
};
export const validationCheckFail = (error?: string) => {
  return {
    type: Action.VALIDATION_CHECK_FAIL,
    payload: error,
  };
};

/////////////Reserve API///////////////////
export const reserveCarStart = (params: object) => {
  return {
    type: Action.RESERVE_CAR_START,
    payload: params,
  };
};
export const reserveCarSuccess = (payload: object) => {
  return {
    type: Action.RESERVE_CAR_SUCCESS,
    reservCarData: payload,
  };
};
export const reserveCarFail = (error?: string) => {
  return {
    type: Action.RESERVE_CAR_FAIL,
    payload: error,
  };
};

/////////////Amout Details View///////////////////
export const amountDetailsStart = (params: object) => {
  return {
    type: Action.AMOUNT_DETAILS_START,
    payload: params,
  };
};
export const amountDetailsSuccess = (payload: object) => {
  return {
    type: Action.AMOUNT_DETAILS_SUCCESS,
    amountDetailsData: payload,
  };
};
export const amountDetailsFail = (error?: string) => {
  return {
    type: Action.AMOUNT_DETAILS_FAIL,
    payload: error,
  };
};

///////////// PROMO LIST///////////////////
export const promoListStart = () => {
  return {
    type: Action.PROMO_LIST_START,
  };
};
export const promoListSuccess = (payload: object) => {
  return {
    type: Action.PROMO_LIST_SUCCESS,
    promoListData: payload,
  };
};
export const promoListFail = (error?: string) => {
  return {
    type: Action.PROMO_LIST_FAIL,
    payload: error,
  };
};

///////////// STRIPE ACCOUNT DETAILS  ///////////////////
export const stripeAccDetailsStart = () => {
  return {
    type: Action.STRIPE_ACC_DETAILS_START,
  };
};
export const stripeAccDetailsSuccess = (payload: object) => {
  return {
    type: Action.STRIPE_ACC_DETAILS_SUCCESS,
    stripeAccDetailsData: payload,
  };
};
export const stripeAccDetailsFail = (error?: string) => {
  return {
    type: Action.STRIPE_ACC_DETAILS_FAIL,
    payload: error,
  };
};

///////////// ADD FUND///////////////////
export const addFundStart = (params: object) => {
  return {
    type: Action.ADD_FUND_START,
    payload: params,
  };
};
export const addFundSuccess = (payload: object) => {
  return {
    type: Action.ADD_FUND_SUCCESS,
    addFundData: payload,
  };
};
export const addFundFail = (error?: string) => {
  return {
    type: Action.ADD_FUND_FAIL,
    payload: error,
  };
};

///////////// Booking  Complete///////////////////
export const bookingCompleteStart = (params: object, id: any) => {
  return {
    type: Action.COMPLETE_BOOKING_START,
    payload: params,
    Id: id,
  };
};

/////////////Refund Amount View///////////////////
export const refundAmountStart = (params: object, id: any) => {
  return {
    type: Action.REFUND_AMOUNT_START,
    payload: params,
    Id: id,
  };
};
export const refundAmountSuccess = (payload: object) => {
  return {
    type: Action.REFUND_AMOUNT_SUCCESS,
    refundAmountData: payload,
  };
};
export const refundAmountFail = (error?: string) => {
  return {
    type: Action.REFUND_AMOUNT_FAIL,
    payload: error,
  };
};

export const bookingCompleteSuccess = (payload: object) => {
  return {
    type: Action.COMPLETE_BOOKING_SUCCESS,
    completeBookingData: payload,
  };
};
export const bookingCompleteFail = (error?: string) => {
  return {
    type: Action.COMPLETE_BOOKING_FAIL,
    payload: error,
  };
};

///////////// Review ///////////////////
export const reviewStart = (params: object) => {
  return {
    type: Action.REVIEW_START,
    payload: params,
  };
};
export const reviewSuccess = (payload: object) => {
  return {
    type: Action.REVIEW_SUCCESS,
    reviewData: payload,
  };
};
export const reviewFail = (error?: string) => {
  return {
    type: Action.REVIEW_FAIL,
    payload: error,
  };
};

/////////// RENTAL CAR PAYMENT INTENT ///////
export const rentalCarPIStart = (params: object) => {
  return {
    type: Action.RENTALCAR_PI_START,
    payload: params,
  };
};
export const rentalCarPISuccess = (payload: object) => {
  return {
    type: Action.RENTALCAR_PI_SUCCESS,
    rentalCarPIData: payload,
  };
};
export const rentalCarPIFail = (error?: string) => {
  return {
    type: Action.RENTALCAR_PI_FAIL,
    payload: error,
  };
};

//////////  CONFIRM PAYMENT ///////////////
export const confirmPaymentStart = (params: object) => {
  return {
    type: Action.CONFIRM_PAYMENT_START,
    payload: params,
  };
};
export const confirmPaymentSuccess = (payload: object) => {
  return {
    type: Action.CONFIRM_PAYMENT_SUCCESS,
    confirmPaymentData: payload,
  };
};
export const confirmPaymentFail = (error?: string) => {
  return {
    type: Action.CONFIRM_PAYMENT_FAIL,
    payload: error,
  };
};

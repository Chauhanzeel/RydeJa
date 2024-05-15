import { Action } from "../constantActions/index";
import { CustomerInterface, CustomerStateProps } from "./interface";

const initialState: CustomerStateProps = {
  isLoading: false,
  isLoadingCarList: false,
  error: null,
  carListData: null,
  carListlux: null,
  carTypeListData: null,
  recentlyViewCarListData: null,
  parishListData: null,
  reviewListData: null,
  favouriteCarListData: null,
  favouriteCarAddData: null,
  favouriteCarRemoveData: null,
  driverLicenseCreateData: null,
  closeAccountData: null,
  chatListData: null,
  callListData: null,
  customerContactListData: null,
  carViewData: null,
  bookedTripListData: null,
  historyTripListData: null,
  switchToOwnerData: null,
  rentalCarViewData: null,
  rentalCarDatesData: null,
  rentalCarAddressData: null,
  saveCard: null,
  saveCardList: [],
  viewCard: null,
  deleteCard: null,
  updateCard: null,
  makePaymentData: null,
  cancleTripData: null,
  insuranceProtectionData: null,
  customerCallData: null,
  customerCallEndData: null,
  bookingCancelData: null,
  bookingCancelReasonList: null,
  validationObj: null,
  reservCarData: null,
  amountDetailsData: null,
  promoListData: null,
  stripeAccDetailsData: null,
  addFundData: null,
  completeBookingData: null,
  reviewData: null,
  reserveCarBookData: null,
  refundAmountData: null,
  rentalCarPIData: null,
  confirmPaymentData: null,
};

const customerReducer = (state = initialState, action: CustomerInterface) => {
  switch (action.type) {
    case Action.RESET_ALL:
      return {
        ...initialState,
      };
      break;
    case Action.CAR_TYPE_LIST_START:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case Action.CAR_TYPE_LIST_SUCCESS:
      return {
        ...state,
        carTypeListData: action.carTypeListData,
        isLoading: false,
      };
      break;
    case Action.CAR_TYPE_LIST_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      break;

    case Action.RECENT_VIEW_CAR_LIST_START:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case Action.RECENT_VIEW_CAR_LIST_SUCCESS:
      return {
        ...state,
        recentlyViewCarListData: action.recentlyViewCarListData,
        isLoading: false,
      };
      break;
    case Action.RECENT_VIEW_CAR_LIST_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      break;

    case Action.CAR_LIST_START:
      return {
        ...state,
        isLoadingCarList: true,
      };
      break;
    case Action.CAR_LIST_SUCCESS:
      return {
        ...state,
        carListData: action?.carListData,
        isLoadingCarList: false,
      };
      break;
    case Action.CAR_LIST_FAIL:
      return {
        ...state,
        isLoadingCarList: false,
        error: action.payload,
      };
      break;

    case Action.CARLUX_LIST_START:
      return {
        ...state,
        isLoadingCarList: true,
      };
      break;
    case Action.CARLUX_LIST_SUCCESS:
      return {
        ...state,
        carListlux: action.carListlux,
        isLoadingCarList: false,
      };
      break;
    case Action.CARLUX_LIST_FAIL:
      return {
        ...state,
        isLoadingCarList: false,
        error: action.payload,
      };
      break;

    case Action.CAR_VIEW_START:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case Action.CAR_VIEW_SUCCESS:
      return {
        ...state,
        carViewData: action.carViewData,
        isLoading: false,
      };
      break;
    case Action.CAR_VIEW_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      break;

    case Action.PARISH_LIST_START:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case Action.PARISH_LIST_SUCCESS:
      return {
        ...state,
        parishListData: action.parishListData,
        isLoading: false,
      };
      break;
    case Action.PARISH_LIST_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      break;

    case Action.REVIEW_LIST_START:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case Action.REVIEW_LIST_SUCCESS:
      return {
        ...state,
        reviewListData: action.reviewListData,
        isLoading: false,
      };
      break;
    case Action.REVIEW_LIST_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      break;

    case Action.FAVOURITE_CAR_LIST_START:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case Action.FAVOURITE_CAR_LIST_SUCCESS:
      return {
        ...state,
        favouriteCarListData: action.favouriteCarListData,
        isLoading: false,
      };
      break;
    case Action.FAVOURITE_CAR_LIST_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      break;

    case Action.FAVOURITE_CAR_ADD_START:
      return {
        ...state,
        isLoading: false, // Set false for stop content loader
      };
      break;
    case Action.FAVOURITE_CAR_ADD_SUCCESS:
      return {
        ...state,
        favouriteCarAddData: action.favouriteCarAddData,
        isLoading: false,
      };
      break;
    case Action.FAVOURITE_CAR_ADD_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      break;

    case Action.FAVOURITE_CAR_REMOVE_START:
      return {
        ...state,
        isLoading: false, // Set false for stop content loader
      };
      break;
    case Action.FAVOURITE_CAR_REMOVE_SUCCESS:
      return {
        ...state,
        favouriteCarRemoveData: action.favouriteCarRemoveData,
        isLoading: false,
      };
      break;
    case Action.FAVOURITE_CAR_REMOVE_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      break;

    case Action.DRIVER_LICENSE_CREATE_START:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case Action.DRIVER_LICENSE_CREATE_SUCCESS:
      return {
        ...state,
        driverLicenseCreateData: action.driverLicenseCreateData,
        isLoading: false,
      };
      break;
    case Action.DRIVER_LICENSE_CREATE_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      break;

    case Action.CLOSE_ACCOUNT_START:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case Action.CLOSE_ACCOUNT_SUCCESS:
      return {
        ...state,
        closeAccountData: action.closeAccountData,
        isLoading: false,
      };
      break;
    case Action.CLOSE_ACCOUNT_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      break;

    case Action.CHAT_LIST_START:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case Action.CHAT_LIST_SUCCESS:
      return {
        ...state,
        chatListData: action.chatListData,
        isLoading: false,
      };
      break;
    case Action.CHAT_LIST_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      break;

    case Action.CALL_LIST_START:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case Action.CALL_LIST_SUCCESS:
      return {
        ...state,
        callListData: action.callListData,
        isLoading: false,
      };
      break;
    case Action.CALL_LIST_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      break;

    case Action.CUSTOMER_CALL_START:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case Action.CUSTOMER_CALL_SUCCESS:
      return {
        ...state,
        customerCallData: action.customerCallData,
        isLoading: false,
      };
      break;
    case Action.CUSTOMER_CALL_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      break;

    case Action.CUSTOMER_CALLEND_START:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case Action.CUSTOMER_CALLEND_SUCCESS:
      return {
        ...state,
        customerCallEndData: action.customerCallEndData,
        isLoading: false,
      };
      break;
    case Action.CUSTOMER_CALLEND_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      break;

    case Action.CUSTOMER_CONTACT_LIST_START:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case Action.CUSTOMER_CONTACT_LIST_SUCCESS:
      return {
        ...state,
        customerContactListData: action.customerContactListData,
        isLoading: false,
      };
      break;
    case Action.CUSTOMER_CONTACT_LIST_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      break;

    case Action.CREATE_RENTAL_CAR_START:
      return {
        ...state,
        isLoading: true,
      };
      break;

    case Action.CREATE_RENTAL_CAR_SUCCESS:
      return {
        ...state,
        rentalCarData: action.rentalCarData,
        isLoading: false,
      };
      break;
    case Action.CREATE_RENTAL_CAR_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      break;

    case Action.RENTALCAR_PI_START:
      return {
        ...state,
        isLoading: true,
      };
      break;

    case Action.RENTALCAR_PI_SUCCESS:
      return {
        ...state,
        rentalCarPIData: action.rentalCarPIData,
        isLoading: false,
      };
      break;
    case Action.RENTALCAR_PI_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      break;

    case Action.CONFIRM_PAYMENT_START:
      return {
        ...state,
        isLoading: true,
      };
      break;

    case Action.CONFIRM_PAYMENT_SUCCESS:
      return {
        ...state,
        confirmPaymentData: action.confirmPaymentData,
        isLoading: false,
      };
      break;
    case Action.CONFIRM_PAYMENT_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      break;

    case Action.RESERVECAR_BOOK_START:
      return {
        ...state,
        isLoading: true,
      };
      break;

    case Action.RESERVECAR_BOOK_SUCCESS:
      return {
        ...state,
        reserveCarBookData: action.reserveCarBookData,
        isLoading: false,
      };
      break;
    case Action.RESERVECAR_BOOK_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      break;

    case Action.BOOKED_TRIP_LIST_START:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case Action.BOOKED_TRIP_CAR_LIST_SUCCESS:
      return {
        ...state,
        bookedTripListData: action.bookedTripListData,
        isLoading: false,
      };
      break;
    case Action.BOOKED_TRIP_CAR_LIST_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      break;
    case Action.HISTORY_TRIP_LIST_START:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case Action.HISTORY_TRIP_LIST_SUCCESS:
      return {
        ...state,
        historyTripListData: action.historyTripListData,
        isLoading: false,
      };
      break;
    case Action.HISTORY_TRIP_LIST_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      break;

    case Action.SWITCH_TO_OWNER_START:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case Action.SWITCH_TO_OWNER_SUCCESS:
      return {
        ...state,
        switchToOwnerData: action.switchToOwnerData,
        isLoading: false,
      };
      break;
    case Action.SWITCH_TO_OWNER_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      break;

    case Action.RENTALCAR_VIEW_START:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case Action.RENTALCAR_VIEW_SUCCESS:
      return {
        ...state,
        rentalCarViewData: action.rentalCarViewData,
        isLoading: false,
      };
      break;
    case Action.RENTALCAR_VIEW_CAR_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      break;

    case Action.RENTALCAR_ADDRESS_START:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case Action.RENTALCAR_ADDRESS_SUCCESS:
      return {
        ...state,
        rentalCarAddressData: action.rentalCarAddressData,
        isLoading: false,
      };
      break;
    case Action.RENTALCAR_ADDRESS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      break;

    case Action.RENTALCAR_DATES_START:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case Action.RENTALCAR_DATES_SUCCESS:
      return {
        ...state,
        rentalCarDatesData: action.rentalCarDatesData,
        isLoading: false,
      };
      break;
    case Action.RENTALCAR_DATES_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      break;

    case Action.SAVE_CARD_START:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case Action.INSURANCEPROTECTION_START:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case Action.SAVE_CARD_SUCCESS:
      return {
        ...state,
        saveCard: action.saveCard,
        isLoading: false,
      };
      break;
    case Action.SAVE_CARD_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      break;

    case Action.SAVE_CARDLIST_START:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case Action.SAVE_CARDLIST_SUCCESS:
      return {
        ...state,
        saveCardList: action.saveCardList,
        isLoading: false,
      };
      break;
    case Action.SAVE_CARDLIST_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      break;
    case Action.INSURANCEPROTECTION_SUCCESS:
      return {
        ...state,
        insuranceProtectionData: action.insuranceProtectionData,
        isLoading: false,
      };
      break;
    case Action.INSURANCEPROTECTION_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      break;

    case Action.UPDATE_CARD_START:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case Action.UPDATE_CARD_SUCCESS:
      return {
        ...state,
        updateCard: action.updateCard,
        isLoading: false,
      };
      break;
    case Action.UPDATE_CARD_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      break;

    case Action.DELETE_CARD_START:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case Action.DELETE_CARD_SUCCESS:
      return {
        ...state,
        deleteCard: action.deleteCard,
        isLoading: false,
      };
      break;
    case Action.DELETE_CARD_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      break;

    case Action.VIEW_CARD_START:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case Action.VIEW_CARD_SUCCESS:
      return {
        ...state,
        viewCard: action.viewCard,
        isLoading: false,
      };
      break;
    case Action.VIEW_CARD_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      break;

    case Action.CANCEL_TRIP_START:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case Action.CANCEL_TRIP_SUCCESS:
      return {
        ...state,
        cancleTripData: action.cancleTripData,
        isLoading: false,
      };
      break;
    case Action.CANCEL_TRIP_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      break;

    case Action.MAKE_PAYMENT_START:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case Action.MAKE_PAYMENT_SUCCESS:
      return {
        ...state,
        makePaymentData: action.makePaymentData,
        isLoading: false,
      };
      break;
    case Action.MAKE_PAYMENT_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      break;

    case Action.BOOKING_CANCEL_START:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case Action.BOOKING_CANCEL_SUCCESS:
      return {
        ...state,
        bookingCancelData: action.bookingCancelData,
        isLoading: false,
      };
      break;
    case Action.BOOKING_CANCEL_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      break;

    case Action.BOOKING_CANCEL_REASON_START:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case Action.BOOKING_CANCEL_REASON_SUCCESS:
      return {
        ...state,
        bookingCancelReasonList: action.bookingCancelReasonList,
        isLoading: false,
      };
      break;
    case Action.BOOKING_CANCEL_REASON_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };

    case Action.VALIDATION_CHECK_START:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case Action.VALIDATION_CHECK_SUCCESS:
      return {
        ...state,
        validationObj: action.validationObj,
        isLoading: false,
      };
      break;
    case Action.VALIDATION_CHECK_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      break;

    case Action.RESERVE_CAR_START:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case Action.RESERVE_CAR_SUCCESS:
      return {
        ...state,
        reservCarData: action.reservCarData,
        isLoading: false,
      };
      break;
    case Action.RESERVE_CAR_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      break;

    case Action.AMOUNT_DETAILS_START:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case Action.AMOUNT_DETAILS_SUCCESS:
      return {
        ...state,
        amountDetailsData: action.amountDetailsData,
        isLoading: false,
      };
      break;
    case Action.AMOUNT_DETAILS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        amountDetailsData: null,
      };
      break;

    case Action.REFUND_AMOUNT_START:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case Action.REFUND_AMOUNT_SUCCESS:
      return {
        ...state,
        refundAmountData: action.refundAmountData,
        isLoading: false,
      };
      break;
    case Action.REFUND_AMOUNT_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      break;

    case Action.PROMO_LIST_START:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case Action.PROMO_LIST_SUCCESS:
      return {
        ...state,
        promoListData: action.promoListData,
        isLoading: false,
      };
      break;
    case Action.PROMO_LIST_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      break;

    case Action.STRIPE_ACC_DETAILS_START:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case Action.STRIPE_ACC_DETAILS_SUCCESS:
      return {
        ...state,
        stripeAccDetailsData: action.stripeAccDetailsData,
        isLoading: false,
      };
      break;
    case Action.STRIPE_ACC_DETAILS_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      break;

    case Action.ADD_FUND_START:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case Action.ADD_FUND_SUCCESS:
      return {
        ...state,
        addFundData: action.addFundData,
        isLoading: false,
      };
      break;
    case Action.ADD_FUND_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      break;

    case Action.COMPLETE_BOOKING_START:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case Action.COMPLETE_BOOKING_SUCCESS:
      return {
        ...state,
        completeBookingData: action.completeBookingData,
        isLoading: false,
      };
      break;
    case Action.COMPLETE_BOOKING_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      break;

    case Action.REVIEW_START:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case Action.REVIEW_SUCCESS:
      return {
        ...state,
        reviewData: action.reviewData,
        isLoading: false,
      };
      break;
    case Action.REVIEW_FAIL:
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

export default customerReducer;

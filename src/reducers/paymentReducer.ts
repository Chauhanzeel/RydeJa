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
  stripeAccount: null,
  cardToken: null,
  stripePaymentData: null,
  cardUpdateData: null,
  stripeBalanceData: null,
  createBankAcc: null,
  updateBankDetailsData: null,
};

const userReducer = (state = initialState, action: UserInterface) => {
  switch (action.type) {
    case Action.RESET_ALL:
      return {
        ...initialState,
      };
      break;
    case Action.CREATE_STRIPE_ACCOUNT_START:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case Action.CREATE_STRIPE_ACCOUNT_SUCCESS:
      return {
        ...state,
        stripeAccount: action.stripeAccount,
        isLoading: false,
      };
      break;
    case Action.CREATE_STRIPE_ACCOUNT_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      break;
    case Action.CARD_ACCESS_TOKEN_START:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case Action.CARD_ACCESS_TOKEN_SUCCESS:
      return {
        ...state,
        cardToken: action.cardToken,
        isLoading: false,
      };
      break;
    case Action.CARD_ACCESS_TOKEN_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      break;

    case Action.CARD_UPDATE_START:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case Action.CARD_UPDATE_SUCCESS:
      return {
        ...state,
        cardUpdateData: action.cardUpdateData,
        isLoading: false,
      };
      break;
    case Action.CARD_UPDATE_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      break;

    case Action.STRIPE_PAYMENT_START:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case Action.STRIPE_PAYMENT_SUCCESS:
      return {
        ...state,
        stripePaymentData: action.stripePaymentData,
        isLoading: false,
      };
      break;
    case Action.STRIPE_PAYMENT_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      break;

    case Action.STRIPE_BALANCE_START:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case Action.STRIPE_BALANCE_SUCCESS:
      return {
        ...state,
        stripeBalanceData: action.stripeBalanceData,
        isLoading: false,
      };
      break;
    case Action.STRIPE_BALANCE_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      break;

    case Action.CREATE_BANKACC_START:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case Action.CREATE_BANKACC_SUCCESS:
      return {
        ...state,
        createBankAcc: action.createBankAcc,
        isLoading: false,
      };
      break;
    case Action.CREATE_BANKACC_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      break;

    case Action.UPDATE_BANK_DETAILS_START:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case Action.UPDATE_BANK_DETAILS_SUCCESS:
      return {
        ...state,
        updateBankDetailsData: action.updateBankDetailsData,
        isLoading: false,
      };
      break;
    case Action.UPDATE_BANK_DETAILS_FAIL:
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

import { Action } from "../constantActions/index";

///////////// Create Stripe Account ///////////////////
export const createStripeAccountStart = (params: object) => {
  return {
    type: Action.CREATE_STRIPE_ACCOUNT_START,
    payload: params,
  };
};
export const createStripeAccountSuccess = (payload: object) => {
  return {
    type: Action.CREATE_STRIPE_ACCOUNT_SUCCESS,
    stripeAccount: payload,
  };
};
export const createStripeAccountFail = (error: string) => {
  return {
    type: Action.CREATE_STRIPE_ACCOUNT_FAIL,
    payload: error,
  };
};

///////////// Card Access Token  ///////////////////
export const cardAccessTokenStart = (params: object) => {
  return {
    type: Action.CARD_ACCESS_TOKEN_START,
    payload: params,
  };
};
export const cardAccessTokenSuccess = (payload: object) => {
  return {
    type: Action.CARD_ACCESS_TOKEN_SUCCESS,
    cardToken: payload,
  };
};
export const cardAccessTokenFail = (error: string) => {
  return {
    type: Action.CARD_ACCESS_TOKEN_FAIL,
    payload: error,
  };
};

///////////// Stripe Payment ///////////////////
export const stripePaymentStart = (params: object) => {
  return {
    type: Action.STRIPE_PAYMENT_START,
    payload: params,
  };
};
export const stripePaymentSuccess = (payload: object) => {
  return {
    type: Action.STRIPE_PAYMENT_SUCCESS,
    stripePaymentData: payload,
  };
};
export const stripePaymentFail = (error: string) => {
  return {
    type: Action.STRIPE_PAYMENT_FAIL,
    payload: error,
  };
};

///////////// Create Bank ///////////////////
export const createBankAccountStart = (params: object) => {
  return {
    type: Action.CREATE_BANKACC_START,
    payload: params,
  };
};
export const createBankAccountSuccess = (payload: object) => {
  return {
    type: Action.CREATE_BANKACC_SUCCESS,
    createBankAcc: payload,
  };
};
export const createBankAccountFail = (error: string) => {
  return {
    type: Action.CREATE_BANKACC_FAIL,
    payload: error,
  };
};

/////////////UPDATE BANK DETAILS///////////////////
export const updateBankDetailsStart = (params: object, id: any) => {
  return {
    type: Action.UPDATE_BANK_DETAILS_START,
    payload: params,
    id: id,
  };
};
export const updateBankDetailsSuccess = (payload: object) => {
  return {
    type: Action.UPDATE_BANK_DETAILS_SUCCESS,
    updateBankDetailsData: payload,
  };
};
export const updateBankDetailsFail = (error?: string) => {
  return {
    type: Action.UPDATE_BANK_DETAILS_FAIL,
    payload: error,
  };
};

//////////// Card Update Token  ///////////////////
export const cardUpdateStart = (params: object) => {
  return {
    type: Action.CARD_UPDATE_START,
    payload: params,
  };
};
export const cardUpdateSuccess = (payload: object) => {
  return {
    type: Action.CARD_UPDATE_SUCCESS,
    cardUpdateData: payload,
  };
};
export const cardUpdateFail = (error: string) => {
  return {
    type: Action.CARD_UPDATE_FAIL,
    payload: error,
  };
};

//////////// GET STIRPE ADMIN ACC BALANCE ///////////////////
export const stripeBalanceStart = () => {
  return {
    type: Action.STRIPE_BALANCE_START,
  };
};
export const stripeBalanceSuccess = (payload: object) => {
  return {
    type: Action.STRIPE_BALANCE_SUCCESS,
    stripeBalanceData: payload,
  };
};
export const stripeBalanceFail = (error: string) => {
  return {
    type: Action.STRIPE_BALANCE_FAIL,
    payload: error,
  };
};

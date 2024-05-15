import StripeApi from "../api/stripeApi";
import CommonApi from "../api/Api";

interface serviceInterface {
  payload: any;
}
// let stripeApi = new CommonApi("v1/accounts");

export const createStripeAccountService = (params: serviceInterface) => {
  let stripeApi = new CommonApi("stripe-account/create");
  return stripeApi
    .post(params.payload)
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

export const createBankAccountService = (params: serviceInterface) => {
  let stripeApi = new CommonApi("bank-details/create");
  return stripeApi
    .post(params.payload)
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

export const updateBankDetailsService = (params: serviceInterface | any) => {
  let stripeApi = new CommonApi("bank-details/" + params?.id + "/update");
  return stripeApi
    .post(params.payload)
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

export const cardAcessTokenService = (params: serviceInterface) => {
  let stripeApi = new StripeApi("v1/tokens");
  return stripeApi
    .post01(params.payload)
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

export const stripePaymentService = (params: serviceInterface) => {
  let stripeApi = new StripeApi("v1/payment_intents");
  return stripeApi
    .post(params.payload)
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

export const stripeBalanceService = () => {
  let stripeBalanceApi = new StripeApi("v1/balance");
  return stripeBalanceApi
    .get1()
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

export const cardUpdateService = (params: serviceInterface | any) => {
  let stripeApi = new StripeApi(
    "v1/customers/" +
      params?.payload?.cusId +
      // params.payload.cusId
      "/sources/" +
      params?.payload?.cardId
  );
  return stripeApi
    .post(params?.payload?.par)
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

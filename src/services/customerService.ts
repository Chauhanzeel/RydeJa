import callListApi from "../api/callListApi";
import chatListApi from "../api/chatListApi";

import endPointApi from "../api/endPointApi";
import commonEndPointApi from "../api/commonEndPointApi";

interface serviceInterface {
  payload: any;
  Id: any;
}

export const carTypeListService = () => {
  let carTypeListapi = new commonEndPointApi("car/type");
  return carTypeListapi
    .get()
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const carListService = (params: serviceInterface) => {
  let carListapi = new commonEndPointApi("car/list");
  return carListapi
    .get(params.payload)
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

export const rentalCarViewService = (params: serviceInterface | any) => {
  let carViewapi = new endPointApi(
    "rental-car/" + params.payload.bookId + "/view"
  );
  return carViewapi
    .get()
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

export const rentalCarChangeDatesService = (params: serviceInterface | any) => {
  let carViewapi = new endPointApi(
    "rental-car/" + params.payload.bookId + "/update/trip-date"
  );
  return carViewapi
    .post(params.payload.par)
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

export const rentalCarChangeAddressService = (
  params: serviceInterface | any
) => {
  let carViewapi = new endPointApi(
    "rental-car/" + params.payload.bookId + "/update/pickup-return"
  );
  return carViewapi
    .post(params.payload.par)
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

export const recentlyViewCarListService = () => {
  let recentlyViewCarListapi = new endPointApi("recently-view-car/list");
  return recentlyViewCarListapi
    .get()
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

export const parishListService = (params: serviceInterface) => {
  let parishListapi = new commonEndPointApi("parish/list");
  return parishListapi
    .get(params.payload)
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

export const reviewListService = (params: serviceInterface) => {
  let reviewListapi = new commonEndPointApi("review/list");
  return reviewListapi
    .get(params.payload)
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

export const favouriteCarListService = () => {
  let favouriteCarListapi = new endPointApi("favourite-car/list");
  return favouriteCarListapi
    .get()
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

export const favouriteCarAddService = (params: serviceInterface) => {
  let favouriteCarAddapi = new endPointApi("favourite-car/add");
  return favouriteCarAddapi
    .post(params.payload)
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

export const favouriteCarRemoveService = (params: serviceInterface) => {
  let favouriteCarRemoveapi = new endPointApi("favourite-car/remove");
  return favouriteCarRemoveapi
    .post(params.payload)
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

export const driverLicenseCreateService = (params: serviceInterface) => {
  let driverLicenseCreateapi = new endPointApi("driver-license/create");
  return driverLicenseCreateapi
    .post(params.payload)
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

export const closeAccountService = (params: serviceInterface) => {
  let closeAccountapi = new endPointApi("close-account");
  return closeAccountapi
    .post(params.payload)
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

export const chatListService = () => {
  let chatListapi = new chatListApi("chat-messages/list");
  return chatListapi
    .get()
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

export const callListService = () => {
  let callListapi = new callListApi("call/list");
  return callListapi
    .get()
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

export const customerContactListService = () => {
  let customerContactListapi = new endPointApi("contact/list");
  return customerContactListapi
    .get()
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

export const sendChatService = (params: serviceInterface) => {
  let endPointapi = new endPointApi("chat-messages/send");
  return endPointapi
    .post(params.payload)
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

export const GetChatHistoryService = (params: serviceInterface) => {
  let endPointapi = new endPointApi("chat-messages/get-chat-history");
  return endPointapi
    .get(params.payload)
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

export const createRentalCarService = (params: serviceInterface) => {
  let endPointapi = new endPointApi("rental-car/create");
  return endPointapi
    .post(params.payload)
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

export const rentalCarPIService = (params: serviceInterface) => {
  let endPointapi = new endPointApi("payment/card/payment-intent");
  return endPointapi
    .post(params.payload)
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

export const confirmPaymentService = (params: serviceInterface) => {
  let endPointapi = new endPointApi("payment/card/confirm-payment-intent");
  return endPointapi
    .post(params.payload)
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

export const reserveCarBookService = (params: serviceInterface | any) => {
  let endPointapi = new endPointApi(
    "rental-car/" + params.payload.id + "/reserve-payment"
  );
  return endPointapi
    .post(params?.payload?.par)
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

export const historyTripListService = (params: serviceInterface) => {
  let historyTripListapi = new endPointApi("rental-car/list");
  return historyTripListapi
    .get(params.payload)
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

export const bookedTripListService = (params: serviceInterface) => {
  let bookedTripListapi = new endPointApi("rental-car/list");
  return bookedTripListapi
    .get(params.payload)
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

export const switchToOwnerService = () => {
  let switchToOwnerapi = new endPointApi("user/switch-to-owner");
  return switchToOwnerapi
    .get()
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

export const saveCardService = (params: serviceInterface) => {
  let endPointapi = new endPointApi("payment/card/save");
  return endPointapi
    .post(params.payload)
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

export const saveCardListService = () => {
  let endPointapi = new endPointApi("payment/card/list");
  return endPointapi
    .get()
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

export const viewCardService = (params: serviceInterface | any) => {
  let endPointapi = new endPointApi(
    "payment/card/" + params.payload.id + "/view"
  );
  return endPointapi
    .get()
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

export const carViewService = (params: serviceInterface | any) => {
  let carViewapi = new commonEndPointApi(
    "car/" + params.payload.carId + "/view"
  );
  return carViewapi
    .get()
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

export const updateCardService = (params: serviceInterface) => {
  let endPointapi = new endPointApi(
    "payment/card/" + params.payload.id + "/update"
  );
  return endPointapi
    .post(params.payload)
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

export const deleteCardService = (params: serviceInterface | any) => {
  let endPointapi = new endPointApi(
    "payment/card/" + params.payload.id + "/delete"
  );
  return endPointapi
    .delete(params.payload)
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

export const cancelTripService = (params: serviceInterface) => {
  let endPointapi = new endPointApi(
    "rental-car/" + params.payload.id + "/cancel"
  );
  return endPointapi
    .post(params.payload)
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

export const makePaymentService = (params: serviceInterface) => {
  let endPointapi = new endPointApi(
    "rental-car/" + params.payload.id + "/make-payment"
  );
  return endPointapi
    .post(params.payload)
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

export const insuranceProtectionService = (params: serviceInterface) => {
  let insuranceProtectionApi = new commonEndPointApi(
    "insurance-protection/list"
  );
  return insuranceProtectionApi
    .get(params.payload)
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

export const customerCallService = (params: serviceInterface) => {
  let customerCallApi = new endPointApi("call/start");
  return customerCallApi
    .post(params.payload)
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

export const customerCallEndService = (params: serviceInterface | any) => {
  let customerCallEndApi = new endPointApi(
    "call/" + params.payload.id + "/end"
  );
  return customerCallEndApi
    .post(params.payload)
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

export const bookingCancelService = (params: serviceInterface) => {
  let customerCallApi = new endPointApi(
    "rental-car/" + params.payload.bookId + "/cancel"
  );
  return customerCallApi
    .post(params?.payload?.par)
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

export const bookingCancelReasonService = () => {
  let customerCallApi = new endPointApi("rental-car-cancel-reason/list");
  return customerCallApi
    .get()
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

export const validationServiceService = () => {
  let customerCallApi = new endPointApi("user/profile-details");
  return customerCallApi
    .get()
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

export const reserveCarService = (params: serviceInterface) => {
  let customerCallApi = new endPointApi("rental-car/reserve");
  return customerCallApi
    .post(params.payload)
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

export const amountDetailsService = (params: serviceInterface) => {
  let customerCallApi = new endPointApi(
    "car/" + params.payload.carId + "/amount-details-view"
  );
  return customerCallApi
    .get(params?.payload?.par)
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

export const promoListService = () => {
  let promoListapi = new endPointApi("offer/list");
  return promoListapi
    .get()
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

export const stripeAccDetailsService = () => {
  let endPointapi = new endPointApi("payment/account-details");
  return endPointapi
    .get()
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

export const addFundService = (params: serviceInterface) => {
  let addFundApi = new endPointApi("payment/add-funds");
  return addFundApi
    .post(params.payload)
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

export const completeBookingService = (params: serviceInterface) => {
  let endPointapi = new endPointApi(
    "rental-car/" + params?.Id + "/trip-complete"
  );
  return endPointapi
    .post()
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

export const refundAmountService = (params: serviceInterface) => {
  let endPointapi = new endPointApi(
    "rental-car/" + params?.Id + "/cancellation-amount-details-view"
  );
  return endPointapi
    .get()
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

export const reviewService = (params: serviceInterface) => {
  let addFundApi = new endPointApi("review");
  return addFundApi
    .post(params.payload)
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

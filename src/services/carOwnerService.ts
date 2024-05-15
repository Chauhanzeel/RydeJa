import endPointApi from "../api/endPointApi";

interface serviceInterface {
  payload: any;
}

export const carTypeListService = () => {
  let carTypeListapi = new endPointApi("car/type");
  return carTypeListapi
    .get()
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

export const carBrandListService = () => {
  let carBrandListapi = new endPointApi("car-brand/list");

  return carBrandListapi
    .get()
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.log("error :", error);
      return JSON.parse(error);
    });
};

export const featuresListService = () => {
  let featuresListApi = new endPointApi("car-feature/list");
  return featuresListApi
    .get()
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

export const carInfoListService = () => {
  let carInfoListApi = new endPointApi("car-information/list");
  return carInfoListApi
    .get()
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

export const carOwnerCreateCarService = (params: serviceInterface) => {
  let carownerCreateCarApi = new endPointApi("car/create");
  return carownerCreateCarApi
    .postImage1(params.payload)
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

export const carOwnerUpdateCarService = (params: serviceInterface | any) => {
  let carownerCreateCarApi = new endPointApi("car/" + params.id + "/update");
  return carownerCreateCarApi
    .postImage1(params.payload)
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

export const ownerCarViewService = (params: serviceInterface | any) => {
  let carViewapi = new endPointApi("car/" + params.payload.carId + "/view");
  return carViewapi
    .get()
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

export const parishListService = (params: serviceInterface) => {
  let parishListapi = new endPointApi("parish/list");
  return parishListapi
    .get(params.payload)
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

export const switchToCustomerService = () => {
  let switchToCustomerapi = new endPointApi("switch-to-customer");
  return switchToCustomerapi
    .get()
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

export const uploadCarImagesService = (params: serviceInterface) => {
  let uploadCarImagesApi = new endPointApi("car/image-upload");
  return uploadCarImagesApi
    .postImage(params.payload)
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

export const transactionListService = () => {
  let transactionListapi = new endPointApi("transaction/list");
  return transactionListapi
    .get()
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

export const ownerReviewListService = () => {
  let reviewListapi = new endPointApi("review/list");
  return reviewListapi
    .get()
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

export const ownerCarListService = (params: serviceInterface) => {
  let carListapi = new endPointApi("car/list");

  return carListapi
    .get(params.payload)
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

export const earningListService = () => {
  let earningListapi = new endPointApi("earning/list");

  return earningListapi
    .get()
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

export const addUnavailableDatesService = (params: serviceInterface) => {
  let earningListapi = new endPointApi("car-unavailability/create");

  return earningListapi
    .post(params.payload)
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

export const getUnavailableDatesService = () => {
  let earningListapi = new endPointApi("car-unavailability/list");

  return earningListapi
    .get()
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

export const ownerTHListService = (params: serviceInterface | any) => {
  let thListapi = new endPointApi(
    "car/" + params.payload.carId + "/trip-history"
  );
  return thListapi
    .get()
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

export const blockCustomerService = (params: serviceInterface | any) => {
  let blockCustomerApi = new endPointApi("block-customer");
  return blockCustomerApi
    .post(params.payload)
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

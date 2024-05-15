import { Action } from "../constantActions/index";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface SignupInterface {
  data: object;
}

/////////////CAR BRAND LIST///////////////////
export const carBrandListStart = () => {
  return {
    type: Action.CAR_BRAND_LIST_START,
  };
};
export const carBrandListSuccess = (payload: object) => {
  return {
    type: Action.CAR_BRAND_LIST_SUCCESS,
    carBrandListData: payload,
  };
};
export const carBrandListFail = (error?: string) => {
  return {
    type: Action.CAR_BRAND_LIST_FAIL,
    payload: error,
  };
};

/////////////CAR CREATE///////////////////
export const carOwnerCreateCarStart = (params: object) => {
  return {
    type: Action.CAR_OWNER_CREATE_CAR_START,
    payload: params,
  };
};
export const carOwnerCreateCarSuccess = (payload: object) => {
  return {
    type: Action.CAR_OWNER_CREATE_CAR_SUCCESS,
    carOwnerCreateCarData: payload,
  };
};
export const carOwnerCreateCarFail = (error?: string) => {
  return {
    type: Action.CAR_OWNER_CREATE_CAR_FAIL,
    payload: error,
  };
};

/////////////CAR UPDATE///////////////////
export const carOwnerUpdateCarStart = (params: object, id: any) => {
  return {
    type: Action.CAR_OWNER_UPDATE_CAR_START,
    payload: params,
    id: id,
  };
};
export const carOwnerUpdateCarSuccess = (payload: object) => {
  return {
    type: Action.CAR_OWNER_UPDATE_CAR_SUCCESS,
    carOwnerUpdateCarData: payload,
  };
};
export const carOwnerUpdateCarFail = (error?: string) => {
  return {
    type: Action.CAR_OWNER_UPDATE_CAR_FAIL,
    payload: error,
  };
};

/////////////OWNER CAR VIEW///////////////////
export const ownerCarViewStart = (params: object) => {
  return {
    type: Action.OWNER_CAR_VIEW_START,
    payload: params,
  };
};
export const ownerCarViewSuccess = (payload: object) => {
  return {
    type: Action.OWNER_CAR_VIEW_SUCCESS,
    ownerCarViewData: payload,
  };
};
export const ownerCarViewFail = (error?: string) => {
  return {
    type: Action.OWNER_CAR_VIEW_FAIL,
    payload: error,
  };
};

///////////// SWITCH TO CUSTOMER///////////////////
export const switchToCustomerStart = () => {
  return {
    type: Action.SWITCH_TO_CUSTOMER_START,
  };
};
export const switchToCustomerSuccess = (payload: object) => {
  return {
    type: Action.SWITCH_TO_CUSTOMER_SUCCESS,
    switchToCustomerData: payload,
  };
};
export const switchToCustomerFail = (error?: string) => {
  return {
    type: Action.SWITCH_TO_CUSTOMER_FAIL,
    payload: error,
  };
};

///////////// FEATURES LIST///////////////////
export const featuresListStart = () => {
  return {
    type: Action.FEATURE_LIST_START,
  };
};
export const featuresListSuccess = (payload: object) => {
  return {
    type: Action.FEATURE_LIST_SUCCESS,
    featuresListData: payload,
  };
};
export const featuresListFail = (error?: string) => {
  return {
    type: Action.FEATURE_LIST_FAIL,
    payload: error,
  };
};

///////////// CAR INFORMATION LIST///////////////////
export const carInfoListStart = () => {
  return {
    type: Action.CAR_INFO_LIST_START,
  };
};
export const carInfoListSuccess = (payload: object) => {
  return {
    type: Action.CAR_INFO_LIST_SUCCESS,
    carInfoListData: payload,
  };
};
export const carInfoListFail = (error?: string) => {
  return {
    type: Action.CAR_INFO_LIST_FAIL,
    payload: error,
  };
};

///////////// UPLOAD CAR IMAGES///////////////////
export const uploadCarImagesStart = (params: object) => {
  return {
    type: Action.UPLOAD_CAR_IMAGES_START,
    payload: params,
  };
};
export const uploadCarImagesSuccess = (payload: object) => {
  return {
    type: Action.UPLOAD_CAR_IMAGES_SUCCESS,
    uploadCarImagesData: payload,
  };
};
export const uploadCarImagesFail = (error?: string) => {
  return {
    type: Action.UPLOAD_CAR_IMAGES_FAIL,
    payload: error,
  };
};

///////////// TRANSACTION LIST///////////////////
export const transactionListStart = () => {
  return {
    type: Action.OWNER_TRANSACTION_LIST_START,
  };
};
export const transactionListSuccess = (payload: object) => {
  return {
    type: Action.OWNER_TRANSACTION_LIST_SUCCESS,
    transactionListData: payload,
  };
};
export const transactionListFail = (error?: string) => {
  return {
    type: Action.OWNER_TRANSACTION_LIST_FAIL,
    payload: error,
  };
};

/////////////REVIEW LIST///////////////////
export const ownerReviewListStart = () => {
  return {
    type: Action.OWNER_REVIEW_LIST_START,
  };
};
export const ownerReviewListSuccess = (payload: object) => {
  return {
    type: Action.OWNER_REVIEW_LIST_SUCCESS,
    ownerReviewListData: payload,
  };
};
export const ownerReviewListFail = (error?: string) => {
  return {
    type: Action.OWNER_REVIEW_LIST_FAIL,
    payload: error,
  };
};

/////////////CAR LIST///////////////////
export const ownerCarListStart = (params: object) => {
  return {
    type: Action.OWNER_CAR_LIST_START,
    payload: params,
  };
};
export const ownerCarListSuccess = (payload: object) => {
  return {
    type: Action.OWNER_CAR_LIST_SUCCESS,
    ownerCarListData: payload,
  };
};
export const ownerCarListFail = (error?: string) => {
  return {
    type: Action.OWNER_CAR_LIST_FAIL,
    payload: error,
  };
};

/////////////CAR LIST///////////////////
export const ownerCarListLuxStart = (params: object) => {
  return {
    type: Action.OWNER_CARLUX_LIST_START,
    payload: params,
  };
};
export const ownerCarListLuxSuccess = (payload: object) => {
  return {
    type: Action.OWNER_CARLUX_LIST_SUCCESS,
    ownerCarListLux: payload,
  };
};
export const ownerCarListLuxFail = (error?: string) => {
  return {
    type: Action.OWNER_CARLUX_LIST_FAIL,
    payload: error,
  };
};

/////////////EARNING LIST///////////////////
export const earningListStart = () => {
  return {
    type: Action.EARNING_LIST_START,
  };
};
export const earningListSuccess = (payload: object) => {
  return {
    type: Action.EARNING_LIST_SUCCESS,
    earningListData: payload,
  };
};
export const earningListFail = (error?: string) => {
  return {
    type: Action.EARNING_LIST_FAIL,
    payload: error,
  };
};

/////////////ADD UNAVAILABLE DATES///////////////////
export const addUnavailableDatesStart = (params: object) => {
  return {
    type: Action.ADD_UNAVAILABLEDATES_START,
    payload: params,
  };
};
export const addUnavailableDatesSuccess = (payload: object) => {
  return {
    type: Action.ADD_UNAVAILABLEDATES_SUCCESS,
    addUnavailableDatesData: payload,
  };
};
export const addUnavailableDatesFail = (error?: string) => {
  return {
    type: Action.ADD_UNAVAILABLEDATES_FAIL,
    payload: error,
  };
};

/////////////GET UNAVAILABLE DATES///////////////////
export const getUnavailableDatesStart = () => {
  return {
    type: Action.GET_UNAVAILABLEDATES_START,
  };
};
export const getUnavailableDatesSuccess = (payload: object) => {
  return {
    type: Action.GET_UNAVAILABLEDATES_SUCCESS,
    getUnavailableDatesData: payload,
  };
};
export const getUnavailableDatesFail = (error?: string) => {
  return {
    type: Action.GET_UNAVAILABLEDATES_FAIL,
    payload: error,
  };
};

/////////////CAR TRIP HISTORY LIST///////////////////
export const ownerTHListStart = (params: object) => {
  return {
    type: Action.OWNER_TH_LIST_START,
    payload: params,
  };
};
export const ownerTHListSuccess = (payload: object) => {
  return {
    type: Action.OWNER_TH_LIST_SUCCESS,
    ownerTHListData: payload,
  };
};
export const ownerTHListFail = (error?: string) => {
  return {
    type: Action.OWNER_TH_LIST_FAIL,
    payload: error,
  };
};

/////////////BLOCK CUSTOMER///////////////////
export const blockCustomerStart = (params: object) => {
  return {
    type: Action.BLOCK_CUSTOMER_START,
    payload: params,
  };
};
export const blockCustomerSuccess = (payload: object) => {
  return {
    type: Action.BLOCK_CUSTOMER_SUCCESS,
    blockCustomerData: payload,
  };
};
export const blockCustomerFail = (error?: string) => {
  return {
    type: Action.BLOCK_CUSTOMER_FAIL,
    payload: error,
  };
};

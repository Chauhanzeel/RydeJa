import { Action } from "../constantActions/index";
import { CarOwnerInterface, CarOwnerStateProps } from "./interface";

const initialState: CarOwnerStateProps = {
  isLoading: false,
  isLoadingCarList: false,
  error: null,
  ownerCarListData: null,
  ownerCarListLux: null,
  carBrandListData: null,
  carOwnerCreateCarData: null,
  switchToCustomerData: null,
  featuresListData: null,
  carInfoListData: null,
  uploadCarImagesData: null,
  transactionListData: null,
  ownerReviewListData: null,
  earningListData: null,
  ownerCarViewData: null,
  addUnavailableDatesData: null,
  getUnavailableDatesData: null,
  carOwnerUpdateCarData: null,
  ownerTHListData: null,
  blockCustomerData: null,
};

const carOwnerReducer = (state = initialState, action: CarOwnerInterface) => {
  switch (action.type) {
    case Action.RESET_ALL:
      return {
        ...initialState,
      };
      break;

    case Action.OWNER_CAR_VIEW_START:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case Action.OWNER_CAR_VIEW_SUCCESS:
      return {
        ...state,
        ownerCarViewData: action.ownerCarViewData,
        isLoading: false,
      };
      break;
    case Action.OWNER_CAR_VIEW_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      break;

    case Action.OWNER_CAR_LIST_START:
      return {
        ...state,
        isLoadingCarList: true,
      };
      break;
    case Action.OWNER_CAR_LIST_SUCCESS:
      return {
        ...state,
        ownerCarListData:
          action.ownerCarListData !== null && action.ownerCarListData,
        isLoadingCarList: false,
      };
      break;
    case Action.OWNER_CAR_LIST_FAIL:
      return {
        ...state,
        isLoadingCarList: false,
        error: action.payload,
      };
      break;

    case Action.OWNER_CARLUX_LIST_START:
      return {
        ...state,
        isLoadingCarList: true,
      };
      break;
    case Action.OWNER_CARLUX_LIST_SUCCESS:
      return {
        ...state,
        ownerCarListLux: action?.ownerCarListLux,
        isLoadingCarList: false,
      };
      break;
    case Action.OWNER_CARLUX_LIST_FAIL:
      return {
        ...state,
        isLoadingCarList: false,
        error: action.payload,
      };
      break;

    case Action.EARNING_LIST_START:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case Action.EARNING_LIST_SUCCESS:
      return {
        ...state,
        earningListData: action.earningListData,
        isLoading: false,
      };
      break;
    case Action.EARNING_LIST_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      break;

    case Action.CAR_BRAND_LIST_START:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case Action.CAR_BRAND_LIST_SUCCESS:
      return {
        ...state,
        carBrandListData: action.carBrandListData,
        isLoading: false,
      };
      break;
    case Action.CAR_BRAND_LIST_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      break;

    case Action.CAR_OWNER_CREATE_CAR_START:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case Action.CAR_OWNER_CREATE_CAR_SUCCESS:
      return {
        ...state,
        carOwnerCreateCarData: action.carOwnerCreateCarData,
        isLoading: false,
      };
      break;
    case Action.CAR_OWNER_CREATE_CAR_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      break;

    case Action.CAR_OWNER_UPDATE_CAR_START:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case Action.CAR_OWNER_UPDATE_CAR_SUCCESS:
      return {
        ...state,
        carOwnerUpdateCarData: action.carOwnerUpdateCarData,
        isLoading: false,
      };
      break;
    case Action.CAR_OWNER_UPDATE_CAR_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      break;

    case Action.SWITCH_TO_CUSTOMER_START:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case Action.SWITCH_TO_CUSTOMER_SUCCESS:
      return {
        ...state,
        switchToCustomerData: action.switchToCustomerData,
        isLoading: false,
      };
      break;
    case Action.SWITCH_TO_CUSTOMER_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      break;

    case Action.FEATURE_LIST_START:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case Action.FEATURE_LIST_SUCCESS:
      return {
        ...state,
        featuresListData: action.featuresListData,
        isLoading: false,
      };
      break;
    case Action.FEATURE_LIST_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      break;

    case Action.CAR_INFO_LIST_START:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case Action.CAR_INFO_LIST_SUCCESS:
      return {
        ...state,
        carInfoListData: action.carInfoListData,
        isLoading: false,
      };
      break;
    case Action.CAR_INFO_LIST_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      break;

    case Action.UPLOAD_CAR_IMAGES_START:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case Action.UPLOAD_CAR_IMAGES_SUCCESS:
      return {
        ...state,
        uploadCarImagesData: action.uploadCarImagesData,
        isLoading: false,
      };
      break;
    case Action.UPLOAD_CAR_IMAGES_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      break;

    case Action.OWNER_TRANSACTION_LIST_START:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case Action.OWNER_TRANSACTION_LIST_SUCCESS:
      return {
        ...state,
        transactionListData: action.transactionListData,
        isLoading: false,
      };
      break;
    case Action.OWNER_TRANSACTION_LIST_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      break;

    case Action.OWNER_REVIEW_LIST_START:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case Action.OWNER_REVIEW_LIST_SUCCESS:
      return {
        ...state,
        ownerReviewListData: action.ownerReviewListData,
        isLoading: false,
      };
      break;
    case Action.OWNER_REVIEW_LIST_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      break;

    case Action.ADD_UNAVAILABLEDATES_START:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case Action.ADD_UNAVAILABLEDATES_SUCCESS:
      return {
        ...state,
        addUnavailableDatesData: action.addUnavailableDatesData,
        isLoading: false,
      };
      break;
    case Action.ADD_UNAVAILABLEDATES_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      break;

    case Action.GET_UNAVAILABLEDATES_START:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case Action.GET_UNAVAILABLEDATES_SUCCESS:
      return {
        ...state,
        getUnavailableDatesData: action.getUnavailableDatesData,
        isLoading: false,
      };
      break;
    case Action.GET_UNAVAILABLEDATES_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      break;

    case Action.OWNER_TH_LIST_START:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case Action.OWNER_TH_LIST_SUCCESS:
      return {
        ...state,
        ownerTHListData: action.ownerTHListData,
        isLoading: false,
      };
      break;
    case Action.OWNER_TH_LIST_FAIL:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      break;

    case Action.BLOCK_CUSTOMER_START:
      return {
        ...state,
        isLoading: true,
      };
      break;
    case Action.BLOCK_CUSTOMER_SUCCESS:
      return {
        ...state,
        blockCustomerData: action.blockCustomerData,
        isLoading: false,
      };
      break;
    case Action.BLOCK_CUSTOMER_FAIL:
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

export default carOwnerReducer;

export interface AuthInterface {
  auth: object | any;
  type: string;
  userData: object | any;
  loginData: object | any;
  refreshData: object | any;
  data: object | any;
  payload: object | any;
  logoutData: object | any;
  signupData: object | any;
  error: string;
  chatData: any;
  isLoading: boolean;
  isGoogleLoading: boolean;
  googleSignUpData: any | object;
  fbSignUpData: any | object;
  forgotPassData: any | object;
  verifyOtpData: any | object;
  resendOtpData: any | object;
  resetPassData: any | object;
  mapData: any;
}

export interface AuthStateProps {
  isLoading: boolean;
  isGoogleLoading: boolean;
  error: string;
  userData: object | any;
  loginData: object | any;
  refreshData: object | any;
  logoutUser: object | any;
  signupData: object | any;
  switchMode: object | any;
  chatRooms: any;
  chatData: any;
  googleSignUpData: any | object;
  fbSignUpData: any | object;
  forgotPassData: any | object;
  verifyOtpData: any | object;
  resendOtpData: any | object;
  resetPassData: any | object;
  mapData: any;
}

export interface CustomerInterface {
  isLoading: boolean;
  isLoadingCarList: boolean;
  error: string;
  type: string;
  data: object | any;
  payload: object | any;
  carListData: object | any;
  carListlux: any;
  carTypeListData: object | any;
  recentlyViewCarListData: object | any;
  parishListData: object | any;
  reviewListData: object | any;
  favouriteCarListData: object | any;
  favouriteCarAddData: object | any;
  favouriteCarRemoveData: object | any;
  driverLicenseCreateData: object | any;
  closeAccountData: object | any;
  chatListData: object | any;
  callListData: object | any;
  customerContactListData: object | any;
  carViewData: object | any;
  rentalCarData: object | any;
  bookedTripListData: object | any;
  historyTripListData: object | any;
  switchToOwnerData: object | any;
  rentalCarViewData: object | any;
  rentalCarDatesData: object | any;
  rentalCarAddressData: object | any;
  saveCard: object | any;
  saveCardList: object | any;
  viewCard: object | any;
  deleteCard: object | any;
  updateCard: object | any;
  makePaymentData: object | any;
  cancleTripData: object | any;
  insuranceProtectionData: object | any;
  customerCallData: object | any;
  customerCallEndData: object | any;
  bookingCancelData: Object | any;
  bookingCancelReasonList: Object | any;
  validationObj: Object | any;
  reservCarData: Object | any;
  amountDetailsData: object | any;
  promoListData: object | any;
  stripeAccDetailsData?: object | any;
  addFundData?: object | any;
  completeBookingData?: object | any;
  reviewData?: object | any;
  reserveCarBookData?: object | any;
  refundAmountData?: object | any;
  rentalCarPIData?: object | any;
  confirmPaymentData?: object | any;
}

export interface CustomerStateProps {
  isLoading: boolean;
  isLoadingCarList: boolean;
  error: string;
  carListData: object | any;
  carListlux: any;
  carTypeListData: object | any;
  recentlyViewCarListData: object | any;
  parishListData: object | any;
  reviewListData: object | any;
  favouriteCarListData: object | any;
  favouriteCarAddData: object | any;
  favouriteCarRemoveData: object | any;
  driverLicenseCreateData: object | any;
  closeAccountData: object | any;
  chatListData: object | any;
  callListData: object | any;
  customerContactListData: object | any;
  carViewData: object | any;
  bookedTripListData: object | any;
  historyTripListData: object | any;
  switchToOwnerData: object | any;
  rentalCarViewData: object | any;
  rentalCarDatesData: object | any;
  rentalCarAddressData: object | any;
  saveCard: object | any;
  saveCardList: object | any;
  viewCard: object | any;
  deleteCard: object | any;
  updateCard: object | any;
  makePaymentData: object | any;
  cancleTripData: object | any;
  insuranceProtectionData: object | any;
  customerCallData: object | any;
  customerCallEndData: object | any;
  bookingCancelData: Object | any;
  bookingCancelReasonList: Object | any;
  validationObj: Object | any;
  reservCarData: Object | any;
  amountDetailsData: object | any;
  promoListData: object | any;
  stripeAccDetailsData?: object | any;
  addFundData?: object | any;
  completeBookingData?: object | any;
  reviewData?: object | any;
  reserveCarBookData?: object | any;
  refundAmountData?: object | any;
  rentalCarPIData?: object | any;
  confirmPaymentData?: object | any;
}

export interface CarOwnerInterface {
  isLoading: boolean;
  isLoadingCarList: boolean;
  error: string;
  type: string;
  data: object | any;
  payload: object | any;
  carBrandListData: object | any;
  carOwnerCreateCarData: object | any;
  switchToCustomerData: object | any;
  featuresListData: object | any;
  carInfoListData: object | any;
  uploadCarImagesData: object | any;
  transactionListData: object | any;
  ownerCallData?: object | any;
  ownerReviewListData?: object | any;
  ownerCarListData?: object | any;
  ownerCarListLux?: any;
  earningListData?: object | any;
  ownerCarViewData?: object | any;
  addUnavailableDatesData?: object | any;
  getUnavailableDatesData?: object | any;
  stripeAccDetailsData?: object | any;
  carOwnerUpdateCarData?: object | any;
  ownerTHListData?: object | any;
  blockCustomerData?: object | any;
}

export interface CarOwnerStateProps {
  isLoading: boolean;
  isLoadingCarList: boolean;
  error: string;
  carBrandListData: object | any;
  carOwnerCreateCarData: object | any;
  switchToCustomerData: object | any;
  featuresListData: object | any;
  carInfoListData: object | any;
  uploadCarImagesData: object | any;
  transactionListData: object | any;
  ownerCallData?: object | any;
  ownerReviewListData?: object | any;
  ownerCarListData?: object | any;
  ownerCarListLux?: any;
  earningListData?: object | any;
  ownerCarViewData?: object | any;
  addUnavailableDatesData?: object | any;
  getUnavailableDatesData?: object | any;
  stripeAccDetailsData?: object | any;
  carOwnerUpdateCarData?: object | any;
  ownerTHListData?: object | any;
  blockCustomerData?: object | any;
}

export interface UserInterface {
  isLoading: boolean;
  error: string;
  type: string;
  data: object | any;
  payload: object | any;
  countryListData: object | any;
  languageListData: object | any;
  profileDetailsData: object | any;
  updatePhoneNumberData: object | any;
  updateProfileData: object | any;
  sendChatData: object | any;
  chatHistoryData: object | any;
  changeEmailData: object | any;
  storeData?: any;
  stripeAccount: object | any;
  cardToken: object | any;
  changeManualTransmissionData: object | any;
  changePasswordData: object | any;
  stripePaymentData?: object | any;
  notificationSettingsData?: object | any;
  cardUpdateData?: object | any;
  stripeBalanceData?: object | any;
  createBankAcc?: object | any;
  updateBankDetailsData?: object | any;
}

export interface UserStateProps {
  isLoading: boolean;
  error: string;
  countryListData: object | any;
  languageListData: object | any;
  profileDetailsData: object | any;
  updatePhoneNumberData: object | any;
  updateProfileData: object | any;
  changeEmailData: object | any;
  storeData?: any;
  stripeAccount?: object | any;
  cardToken?: object | any;
  changeManualTransmissionData?: object | any;
  changePasswordData?: object | any;
  stripePaymentData?: object | any;
  notificationSettingsData?: object | any;
  cardUpdateData?: object | any;
  stripeBalanceData?: object | any;
  createBankAcc?: object | any;
  updateBankDetailsData?: object | any;
}

interface ReducerType {
  data: object;
}

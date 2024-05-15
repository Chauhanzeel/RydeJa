import { NavigationProp, RouteProp } from "@react-navigation/native";
import {
  AuthInterface,
  CarOwnerInterface,
  CustomerInterface,
  UserInterface,
} from "../../reducers/interface";

export interface AllProps {
  cryptoData: Array<object | null>;
  ventureData: Array<object | null>;
}

export interface AndroidProps {
  path: string;
  description: string;
  notification: boolean;
  useDownloadManager: boolean;
  mime: string;
  mediaScannable: boolean;
}

export interface FileOptionsProps {
  fileCache: boolean;
  addAndroidDownloads: AndroidProps;
}

export interface IosProps {
  path: string;
  fileCache: boolean;
}

export interface ConfigProps {
  ios: IosProps;
  android: AndroidProps;
}

export interface ContactUsProps {
  navigation: NavigationProp<any, any>;
}

export interface logoutDataInterface {
  auth: { logoutUser: object };
}

export interface GradientProps {
  name: string;
}

export interface CreatePasswordProps {
  route: RouteProp<any, any>;
}

export interface CreateProfileProps {
  navigation: NavigationProp<any, any>;
}

export interface CreateProfileStateProps {
  user: { userData: object | any; isLoading: boolean };
  auth: { logoutUser: object };
}

export interface ImageProps {
  didCancel?: string;
  errorCode?: string;
  errorMessage?: string;
  path: string;
  height?: number;
  mime?: string;
  size?: number;
  width?: number;
}

export interface GetApprovedProps {
  route: RouteProp<any, any>;
}

export interface EmailVerificationProps {
  route: RouteProp<any, any>;
}
export interface IndustryDetailsProps {
  route: RouteProp<any, any>;
}
export interface RealEStateDetailsProps {
  route: RouteProp<any, any>;
}

export interface HomeProps {}

export interface VerifyEmailProps {
  route: RouteProp<any, any>;
}
export interface SelectorStateProps {
  user: userStateProps;
  auth: { logoutUser: object };
  customer: customerStateProps;
}

interface customerStateProps {
  callListData: object | any;
  carListData: object | any;
  carTypeListData: object | any;
  chatListData: object | any;
  closeAccountData: object | any;
  customerContactListData: object | any;
  driverLicenseCreateData: object | any;
  error: object | any;
  favouriteCarAddData: object | any;
  favouriteCarListData: object | any;
  favouriteCarRemoveData: object | any;
  isLoading: boolean | any;
  parishListData: object | any;
  recentlyViewCarListData: object | any;
  reviewListData: object | any;
}
interface userStateProps {
  countryListData: object | any;
  error: object | any;
  isLoading: boolean | any;
  languageListData: object | any;
  profileDetailsData: object | any;
  updatePhoneNumberData: object | any;
  updateProfileData: object | any;
}

export interface FundsDetailsProps {
  route: RouteProp<any, any>;
}

export interface CryptoInvestedProps {}

export interface FundsDetailsStateProps {
  user: fundsDetailsProps;
  auth: { logoutUser: object };
}

export interface ReducerStateProps {
  user: UserInterface;
  auth: AuthInterface;
  customer: CustomerInterface;
  carOwner: CarOwnerInterface;
  payment: UserInterface;
}

interface fundsDetailsProps {
  fundInvestData: object | any;
  InvestJournyData: object | any;
  isLoading: boolean;
  interestData: object | any;
  isInterestLoading: boolean;
}

export interface CryptoInvestedStateProps {
  user: cryptoInvestedProps;
  auth: { logoutUser: object };
}

interface cryptoInvestedProps {
  fundManWithInvest: object | any;
  isLoading: boolean;
}

export interface HomeStateProps {
  user: UserStateProps;
  auth: { logoutUser: object; isLoading: boolean };
}

interface UserStateProps {
  getLiveDealsData: object | any;
  fundData: object | any;
  isLoading: boolean;
  userToken: object;
  getVentureAssetsData: object | any;
  invetsorRedirectionInfo: object | any;
  investorDashboardData: object | any;
  investmentDocData: object | any;
}

export interface ScrollProps {
  nativeEvent: { contentOffset: { x: string | number } };
}

export interface LoginProps {
  navigation?: NavigationProp<any, any>;
  route: RouteProp<any, any>;
}

export interface LoginStateProps {
  auth: AuthProps;
}

interface AuthProps {
  loginData?: object;
  userData?: object;
  twitterData?: { name: string; email: string } | any;
  isLoading?: boolean;
  signupData?: object | any;
}

export interface OtpVerificationProps {
  route: RouteProp<any, any>;
}

export interface OtpStateProps {
  auth: { otpData: { message: string } };
}

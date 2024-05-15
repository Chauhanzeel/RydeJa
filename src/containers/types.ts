import { RouteProp } from "@react-navigation/native";

export interface LoginProps {}

export interface HomeProps {}

interface logoutType {
  logoutUser: object;
}

export interface logoutDataInterface {
  auth: logoutType;
}

interface loginType {
  loginData: object;
  userData: object;
}
export interface loginUserInterface {
  auth: loginType;
}

export interface PasswordOtpProps {
  route: RouteProp<any, any>;
}

export interface CommonProps {
  route: RouteProp<any, any>;
}

export interface FilterModalProps {
  route: RouteProp<any, any>;
}

export interface CarInfoProps {
  carInfo: any;
}

export interface CarFeatureProps {
  route: RouteProp<any, any>;
}
export interface ReviewProps {
  route: RouteProp<any, any>;
}

export interface InsuranceProps {
  route: RouteProp<any, any>;
}

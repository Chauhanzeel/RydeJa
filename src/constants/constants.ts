import { Platform } from "react-native";
import _ from "lodash";

export const labelConst = {
  nextTxt: "Next",

  getStarted: "Get Started",
  introTxt1: "We provide professional taxi services for you",
  introTxt2: "Your satisfaction is our number one priority",
  introTxt3: "Let's make your day great with Taxio right now!",
};

export const getOr = (object: any, path: string, def: any) => {
  return _.defaultTo(_.get(object, path, def), def);
};
export const size = (array: any) => {
  return _.size(array);
};
export const avoidSingleWordLastLine = (paragraph: any) => {
  // Split the paragraph into lines by newline character (\n)
  const lines = paragraph?.split("\n");

  // Check if the last line contains only one word
  const lastLineWords = lines[lines?.length - 1]?.trim()?.split(" ");
  if (lastLineWords?.length === 1) {
    // Move the single word to the previous line
    lines[lines?.length - 2] += " " + lastLineWords[0];
    // Remove the last line
    lines?.pop();
  }

  // Join the lines back together with newline characters
  const modifiedParagraph = lines?.join("\n");
  return modifiedParagraph;
};

export const alwaysBounceVertical = false;

export const toastConst: any = {
  logoutAlert: "logout alert",
  logoutTxt: "Are you sure you want to logout ?",
  successToast: "success",
  successFullySignIn: "Successfully SignIn",
  toastBottom: "bottom",
  toastTop: "top",
  errorToast: "error",
  errorSignin: "error in signin",
  infoNotFound: "userInfo not found",
  errorFetchingData: "error in data fetching",
  enterEmailPass: "enter all fields",
  somethingWentWrongTxt: "Something Went Wrong",
  successSignUp: "SuccessFully Signup",
  successSignOut: "successfully signout",
  yesTxt: "yes",
  noTxt: "No",
  passChange: "successfully updated your password",
};

export const StripeUri = `https://api.stripe.com`;
export const LocationUri = "https://nominatim.openstreetmap.org";
export const BaseCustomerUri = "https://api.kmt-studio.com/api/v1/customer";
export const BaseOwnerUri = "https://api.kmt-studio.com/api/v1/car-owner";
export const BaseUserUri = "https://api.kmt-studio.com/api/v1";
export const BaseCommonUri = "https://api.kmt-studio.com/api/v1/common";
export const MeruceBaseUri =
  "http://api.kmt-studio.com:3000/.well-known/mercure";

export const STRIPE_PUBLIC_KEY =
  "pk_test_51N3vAZDnhaqQ5swUPg5amVMPzv8R5pV8bXVlNGRvljC22W2svwEPMTENteXoZpriiWnszgqcTw0EnpEDPsffN28o00jlxQnecZ";
export const STRIPE_SECRET_KEY =
  "sk_test_51N3vAZDnhaqQ5swUbYA2qKCigf4mh3X7jlctYFBepunZ2knBgJ4MD5v6QMtTd02YFKagEPWGqzsZ6jItRdDmRFft00fKdEy4DK";

export const ToastVisibility = 7000;

export const validationReg: any = {
  emailReg: /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
  passwordReg:
    /^(?!.*[s])(?=.*[a-z])(?=.*[A-Z])((?=.*[0-9])|(?=.*[!@#$%^&*]))(?=.{8,})/,
};

export const keyboardVerticalOffsetValue = Platform.OS === "ios" ? 40 : 120;
export const NOTIFICATION_CHANNEL_ID = "10001";
export const FCM_TOKEN = "FCM_TOKEN";
export const MaxCharCount = 150;

export const GOOGLE_CLIENT_ID =
  Platform.OS === "ios"
    ? "603478696273-n43k3nqhm3h39rp5t2vhv5cdikutbff4.apps.googleusercontent.com"
    : "603478696273-ri2s8p7ukap00nd2ljplthvneotod00e.apps.googleusercontent.com";

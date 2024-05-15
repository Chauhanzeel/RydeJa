import loginUserApi from "../api/loginApi";
import logoutUserApi from "../api/logoutApi";
import countryListApi from "../api/countryListApi";
import langListApi from "../api/langListApi";
import mercureSendMsgApi from "../api/mercureSendMsgApi";
import userEndPointApi from "../api/userEndPointApi";
import ApiSX from "../api/ApiSX";

interface serviceInterface {
  // payload: object;
  payload: any;
}

export const googleSignUpService = (params: serviceInterface) => {
  let googlesignup = new loginUserApi("login/google");
  return googlesignup
    .post(params.payload)
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

export const fbSignUpService = (params: serviceInterface) => {
  let fbsignup = new loginUserApi("login/facebook");
  return fbsignup
    .post(params.payload)
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

export const loginUserService = (params: serviceInterface) => {
  let loginuserapi = new loginUserApi("login");
  return loginuserapi
    .post(params.payload)
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

export const refreshTokenService = (params: serviceInterface) => {
  let loginuserapi = new loginUserApi("refresh-token");
  return loginuserapi
    .post(params.payload)
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

export const signUpUserService = (params: serviceInterface) => {
  let signupapi = new userEndPointApi("register");
  return signupapi
    .post(params.payload)
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

export const logoutUserService = (params: serviceInterface) => {
  let logoutuserapi = new logoutUserApi("user/logout");
  return logoutuserapi
    .post(params.payload)
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

export const forgotPassService = (params: serviceInterface) => {
  let forgotpassapi = new loginUserApi("forgot-password");
  return forgotpassapi
    .post(params.payload)
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

export const verifyOtpService = (params: serviceInterface) => {
  let verifyotpapi = new loginUserApi("verify-otp");
  return verifyotpapi
    .post(params.payload)
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

export const resendOtpService = (params: serviceInterface) => {
  let resendotpapi = new loginUserApi("resend-otp");
  return resendotpapi
    .post(params.payload)
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

export const resetPassService = (params: serviceInterface) => {
  let resetpassapi = new loginUserApi("reset-password");
  return resetpassapi
    .post(params.payload)
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

export const languageListService = (params: serviceInterface) => {
  let languageListapi = new langListApi("language/list");
  return languageListapi
    .get(params.payload)
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

export const countryListService = (params: serviceInterface) => {
  let countryListapi = new countryListApi("country/list");
  return countryListapi
    .get(params.payload)
    .then((response) => {
      return response;
    })
    .catch((error) => console.log("error :", error));
};

export const topicSendMessageService = (params: serviceInterface | any) => {
  let mercureSendApi = new mercureSendMsgApi("send-message-");
  return mercureSendApi
    .get(params.payload)
    .then((response: any) => {
      return response;
    })
    .catch((error: any) => console.log("error ser :", error));
};

export const mapLocationService = (params: serviceInterface | any) => {
  let apiSX = new ApiSX("reverse");
  return apiSX
    .get(params.data)
    .then((response: any) => {
      return response;
    })
    .catch((error: any) => console.log("error ser :", error));
};

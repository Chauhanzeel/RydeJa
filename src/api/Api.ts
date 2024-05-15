import AsyncStorage from "@react-native-async-storage/async-storage";
import _ from "lodash";
import {
  BaseCommonUri,
  BaseCustomerUri,
  BaseOwnerUri,
} from "../constants/constants";
export default class Index {
  endPoint: string;
  defaults: any;
  constructor(endPoint: string) {
    this.endPoint = endPoint;
  }

  async url(params: object) {
    let defaults = { ...this.defaults, ...params };
    let queryParams = Object.keys(defaults)
      .map((key) => `${key}=${encodeURIComponent(defaults[key])}`)
      .join("&");

    let token: string | any = await AsyncStorage.getItem("loginUserData");
    let access = JSON.parse(token);
    let baseUrl =
      access?.user?.role === "ROLE_CUSTOMER" ? BaseCustomerUri : BaseOwnerUri;
    console.log(`${baseUrl}\/${this.endPoint}\?${queryParams}`);

    return `${baseUrl}\/${this.endPoint}\?${queryParams}`;
  }

  async get(params?: Array<string>) {
    let url = await this.url(params);
    let token: string | any = await AsyncStorage.getItem("loginUserData");
    let access = JSON.parse(token);
    let accessToken = access?.data ? access?.data.token : access?.token;

    return fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        Accept: "application/json",
        Authorization: token ? `Bearer ${accessToken}` : undefined,
      },
      // body: formBody,
    })
      .then((response) => response.json())
      .catch((error) => console.log("error :", error));
  }

  async postImage(params: any) {
    let url = await this.url(params);
    let data = new FormData();
    let token: string | any = await AsyncStorage.getItem("loginUserData");
    let access = JSON.parse(token);
    let accessToken = access?.data ? access?.data.token : access?.token;

    if (params.file) {
      data.append("file", {
        uri: params.file,
        name: "image.jpg",
        type: "image/jpg",
      });
    } else if (_.get(params, "files", null)) {
      _.map(params.files, (item, index) => {
        data.append("files[" + index + "]", item);
      });
      data.append("car", _.get(params, "car", null));
    }

    return fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: token ? `Bearer ${accessToken}` : undefined,
      },
      body: data,
    }).then((response) => response.json());
  }

  async postImage1(params: any) {
    let url = await this.url(params);
    let data = new FormData();
    let token: string | any = await AsyncStorage.getItem("loginUserData");
    let access = JSON.parse(token);
    let accessToken = access?.data ? access?.data.token : access?.token;

    // _.forEach(params, (value, key) => {
    //   if (key == "files") {
    //     for (let index = 0; index < _.size(value); index++) {
    //       const element = value[index];
    //       data.append(key + "[" + index + "]", element);
    //     }
    //   } else if (_.isArray(value)) {
    //     for (let index = 0; index < _.size(value); index++) {
    //       const element = value[index];
    //       data.append(key + "[" + index + "]", [element]);
    //     }
    //   } else {
    //     data.append(key, value);
    //   }
    // });

    return fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: token ? `Bearer ${accessToken}` : undefined,
      },
      body: params,
    }).then((response) => response.json());
  }

  async post(params?: any) {
    let url = await this.url(params);

    let data = new FormData();
    let token: string | any = await AsyncStorage.getItem("loginUserData");
    let access = JSON.parse(token);
    let accessToken = access?.data ? access?.data.token : access?.token;

    var formBody = <any>[];
    for (var ob in params) {
      var encodedKey = encodeURIComponent(ob);
      var encodedValue = encodeURIComponent(params[ob]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    let headers: any = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: token ? `Bearer ${accessToken}` : undefined,
    };

    var paramsData = JSON.stringify(params);

    return fetch(url, {
      method: "POST",
      headers: headers,
      body: paramsData,
    }).then((response) => response.json());
  }

  async delete(params: any) {
    let url = await this.url(params);

    let token: string | any = await AsyncStorage.getItem("loginUserData");
    let access = JSON.parse(token);
    let accessToken = access?.data ? access?.data.token : access?.token;

    var formBody = <any>[];
    for (var ob in params) {
      var encodedKey = encodeURIComponent(ob);
      var encodedValue = encodeURIComponent(params[ob]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    let headers: any = {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: token ? `Bearer ${accessToken}` : undefined,
    };

    return fetch(url, {
      method: "DELETE",
      headers: headers,
    }).then((response) => response.json());
  }
}

import AsyncStorage from "@react-native-async-storage/async-storage";
import { BaseUserUri } from "../constants/constants";

export default class Index {
  baseUrl: string;
  endPoint: string;
  defaults: any;
  constructor(endPoint: string) {
    this.baseUrl = BaseUserUri;
    this.endPoint = endPoint;
    // this.defaults = defaults || {};
  }

  url(params: object) {
    let defaults = { ...this.defaults, ...params };
    let queryParams = Object.keys(defaults)
      .map((key) => `${key}=${encodeURIComponent(defaults[key])}`)
      .join("&");

    return `${this.baseUrl}\/${this.endPoint}\?${queryParams}`;
  }

  // async get(objectId: any) {
  //   console.log("objectId :",);

  //   let url = `${this.baseUrl}\/${this.endPoint}`;

  //   let token: string | any = await AsyncStorage.getItem('loginUserData');
  //   let access = JSON.parse(token);
  //   let headers: any = {
  //     'Content-Type': 'application/json',
  //     // 'Content-Type': 'text/plain',
  //     Accept: 'application/json',
  //     Authorization: token ? `Bearer ${access.token}` : undefined,
  //   };

  //   var paramsData = JSON.stringify(objectId);

  //   return fetch(url, {
  //     method: 'GET',
  //     headers: headers,
  //     body: paramsData,
  //   }).then(response => response.json());
  //   // return fetch(url).then(response => response.json());
  // }

  async get(params?: Array<string>) {
    let url = this.url(params);
    let data = new FormData();
    console.log("auth get url :", url);

    let token: string | any = await AsyncStorage.getItem("loginUserData");
    let access = JSON.parse(token);
    let accessToken = access?.data ? access?.data.token : access?.token;

    var formBody: any = [];
    for (var ob in params) {
      var encodedKey = encodeURIComponent(ob);
      var encodedValue = encodeURIComponent(params[ob]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

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
    let url = this.url(params);
    console.log("auth postimage url :", url);

    let data = new FormData();
    let token: string | any = await AsyncStorage.getItem("loginUserData");
    let access = JSON.parse(token);
    let accessToken = access?.data ? access?.data.token : access?.token;

    Object.keys(params).forEach((key) => {
      data.append(key, params[key]);
    });
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
        Authorization: token ? `Bearer ${accessToken}` : undefined,
      },
      body: data,
    }).then((response) => response.json());
  }

  async post(params: any) {
    let url = this.url(params);
    console.log("auth post url :", url);
    let data = new FormData();

    let token: string | any = await AsyncStorage.getItem("loginUserData");
    let access = JSON.parse(token);
    let accessToken = access?.data ? access?.data.token : access?.token;

    var formBody = <any>[];
    // formBody.push('is_mobile_api' + "=" + '1');
    for (var ob in params) {
      var encodedKey = encodeURIComponent(ob);
      var encodedValue = encodeURIComponent(params[ob]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    let headers: any = {
      "Content-Type": "application/json",
      // 'Content-Type': 'text/plain',
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

  query01(params: object) {
    return fetch(this.url(params)).then((response) => response.json());
  }

  query(params: object) {
    return fetch(this.url(params))
      .then((response) => response.json())
      .then((json) => {
        if (json.message) throw json.message;
        return Array.isArray(json) ? json : [json];
      });
  }
}

import {
  StripeUri,
  STRIPE_SECRET_KEY,
  STRIPE_PUBLIC_KEY,
} from "../constants/constants";
export default class Index {
  endPoint: string;
  defaults: any;
  baseUrl: string;
  constructor(endPoint: string) {
    this.endPoint = endPoint;
    this.baseUrl = StripeUri;
  }

  url(params: any) {
    let defaults = { ...this.defaults, ...params };
    let queryParams = Object.keys(defaults)
      .map((key) => `${key}=${encodeURIComponent(defaults[key])}`)
      .join("&");

    return `${this.baseUrl}\/${this.endPoint}`;
  }

  get(objectId: any) {
    let url = `${this.baseUrl}\/${this.endPoint}\/${objectId}`;
    return fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;",
        Accept: "application/json",
        authorization: "Bearer " + STRIPE_SECRET_KEY,
      },
    }).then((response) => response.json());
  }

  get1() {
    let url = `${this.baseUrl}\/${this.endPoint}`;
    return fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;",
        Accept: "application/json",
        authorization: "Bearer " + STRIPE_SECRET_KEY,
      },
    }).then((response) => response.json());
  }

  optinal() {
    let url = `${this.baseUrl}\/${this.endPoint}`;
    return fetch(url, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;",
        Accept: "application/json",
        authorization: "Bearer " + STRIPE_SECRET_KEY,
      },
    }).then((response) => response.json());
  }
  delete() {
    let url = `${this.baseUrl}\/${this.endPoint}`;
    return fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;",
        Accept: "application/json",
        authorization: "Bearer " + STRIPE_SECRET_KEY,
      },
    }).then((response) => response.json());
  }
  post(params: any) {
    // let url = this.url(params);
    let url = `${this.baseUrl}\/${this.endPoint}`;

    console.log(url);

    var formBody = <any>[];
    for (var ob in params) {
      var encodedKey = encodeURIComponent(ob);
      var encodedValue = encodeURIComponent(params[ob]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;",
        Accept: "application/json",
        authorization: "Bearer " + STRIPE_SECRET_KEY,
      },
      body: formBody,
    }).then((response) => response.json());
  }

  post01(params: any) {
    // let url = this.url(params);
    let url = `${this.baseUrl}\/${this.endPoint}`;

    console.log(url);

    var formBody = <any>[];
    for (var ob in params) {
      var encodedKey = encodeURIComponent(ob);
      var encodedValue = encodeURIComponent(params[ob]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;",
        Accept: "application/json",
        authorization: "Bearer " + STRIPE_PUBLIC_KEY,
      },
      body: formBody,
    }).then((response) => response.json());
  }

  query(params: any) {
    return fetch(this.url(params), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;",
        Accept: "application/json",
        authorization: "Bearer " + STRIPE_SECRET_KEY,
      },
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.message) throw json.message;
        return Array.isArray(json) ? json : [json];
      });
  }
}

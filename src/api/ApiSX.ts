import _ from "lodash";
import { LocationUri } from "../constants/constants";
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

    let baseUrl = LocationUri;
    return `${baseUrl}\/${this.endPoint}\?${queryParams}`;
  }
  async get(params?: Array<string>) {
    let url = await this.url(params);

    console.log(url, params);

    return fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response)
      .catch((error) => console.log("error :", error));
  }
}

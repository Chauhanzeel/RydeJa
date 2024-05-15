import { MeruceBaseUri } from "../constants/constants";
import { URL, URLSearchParams } from "react-native-url-polyfill";

export default class Index {
  constructor(endPoint) {
    this.baseUrl = MeruceBaseUri;
    this.endPoint = endPoint;
    // this.defaults = defaults || {};
  }

  async get(params) {
    const url = new URL(MeruceBaseUri);
    url.searchParams.append("topic", "send-message-" + params.id);
    const eventSource = new EventSource(url);
    eventSource.onmessage = (e) => {
      return e;
    }; // do something with the
  }
}

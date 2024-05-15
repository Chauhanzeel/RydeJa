const io = require("socket.io-client/dist/socket.io");
import { chatStart } from "../actions/authActions";
import { store } from "../store/store";

export default class SocketServices {
  static socket = io("http://192.168.29.16:3000");

  static newMessage = (mesData) => {
    SocketServices.socket.emit("newMessage", mesData);
    store.dispatch(chatStart(mesData));
  };
}

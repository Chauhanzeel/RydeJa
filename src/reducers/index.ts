import { combineReducers } from "redux";

import authReducer from "./authReducer";
import customerReducer from "./customerReducer";
import userReducer from "./userReducer";
import carOwnerReducer from "./carOwnerReducer";
import paymentReducer from "./paymentReducer";

const rootReducer = combineReducers({
  auth: authReducer,
  customer: customerReducer,
  user: userReducer,
  payment: paymentReducer,
  carOwner: carOwnerReducer,
});
export default rootReducer;

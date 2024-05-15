import { all, call } from "redux-saga/effects";

import authSaga from "./authSaga";
import customerSaga from "./customerSaga";
import userSaga from "./userSaga";
import carOwnerSaga from "./carOwnerSaga";
import paymentSaga from "./paymentSaga";

function* rootSaga() {
  yield all([
    call(authSaga),
    call(customerSaga),
    call(userSaga),
    call(carOwnerSaga),
    call(paymentSaga),
  ]);
}

export default rootSaga;

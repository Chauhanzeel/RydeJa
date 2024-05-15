import _ from "lodash";
import { navigate, replace } from "../navigators/RootNavigation";
class BookingValidation {
  static Check(data: object, route: object) {
    if (
      _.get(data, "profilePicture", null) == false ||
      _.get(data, "profilePicture", null) == null
    ) {
      replace("ProfilePhoto", { rentalCarObj: route });
    } else if (
      _.get(data, "phoneNumber", null) == false ||
      _.get(data, "phoneNumber", null) == null
    ) {
      replace("EnterPhoneNumber", { rentalCarObj: route });
    } else if (
      _.get(data, "isPhoneVerified", null) == false ||
      _.get(data, "isPhoneVerified", null) == null
    ) {
      replace("VerifyPhoneNumber", { rentalCarObj: route });
    } else if (
      _.get(data, "driverLicense", null) == null ||
      _.get(data, "driverLicense", null) == false
    ) {
      replace("DriverLicense", { rentalCarObj: route });
    } else if (
      _.get(data, "isPaymentMethod", null) == false ||
      _.get(data, "isPaymentMethod", null) == null
    ) {
      replace("PaymentCard", { rentalCarObj: route });
    } else {
      replace("CurrentAddress", { rentalCarObj: route });
    }
  }
}
export default BookingValidation;

import OffersSvg from "../../assets/Images/Notification/Offers.svg";
import LocationSvg from "../../assets/Images/Notification/Location.svg";
import PaymentSvg from "../../assets/Images/Notification/Payment.svg";
import WalletSvg from "../../assets/Images/Notification/Wallet.svg";

import React from "react";

export const notificationToday = [
  {
    name: "30% Special Discount!",
    NotificationDesc: "Special promotion only valid today",
    notificationImg: <OffersSvg />,
  },
  {
    name: "Top Up E-Wallet Successful!",
    NotificationDesc: "You have to top up your e-wallet",
    notificationImg: <LocationSvg />,
  },
];

export const notificationDec = [
  {
    name: "Payment Successful!",
    NotificationDesc: "You have made a taxi payment",
    notificationImg: <PaymentSvg />,
  },
  {
    name: "Credit Card Connected!",
    NotificationDesc: "Credit Card has been linked!",
    notificationImg: <WalletSvg />,
  },
];

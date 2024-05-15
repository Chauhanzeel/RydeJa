import React from "react";

import PaypalSvg from "../../assets/Images/Social/Paypal.svg";
import Googlesvg from "../../assets/Images/Social/Google.svg";
import AppleSvg from "../../assets/Images/Social/Apple.svg";
import CreditCardSvg from "../../assets/Images/CreditCard.svg";

export const PaymentMode = [
  // {
  //   id: 1,
  //   paymentImg: <PaypalSvg />,
  //   paymentMethod: 'PayPal',
  // },
  // {
  //   id: 2,
  //   paymentImg: <Googlesvg />,
  //   paymentMethod: 'Google Pay',
  // },
  // {
  //   id: 3,
  //   paymentImg: <AppleSvg />,
  //   paymentMethod: 'Apple Pay',
  // },
  {
    id: 4,
    paymentImg: <CreditCardSvg />,
    paymentMethod: "Credit or debit card",
  },
];

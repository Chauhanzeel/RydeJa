import React from "react";
import PaypalSvg from "../../assets/Images/Social/Paypal.svg";
import Googlesvg from "../../assets/Images/Social/Google.svg";
import AppleSvg from "../../assets/Images/Social/Apple.svg";
import MasterCardSvg from "../../assets/Images/Social/Master.svg";

export const paymentData = [
  {
    id: 1,
    paymentImg: <PaypalSvg />,
    paymentMethod: "PayPal",
    status: "Connected",
  },
  {
    id: 2,
    paymentImg: <Googlesvg />,
    paymentMethod: "Google Pay",
    status: "Connected",
  },
  {
    id: 3,
    paymentImg: <AppleSvg />,
    paymentMethod: "Apple Pay",
    status: "Connected",
  },
  {
    id: 4,
    paymentImg: <MasterCardSvg height={30} width={35} />,
    paymentMethod: "•••• •••• •••• •••• 4679",
    status: "Connected",
  },
];

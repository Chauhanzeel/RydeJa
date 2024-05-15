import React from "react";

import DiscountYellow from "../../assets/Images/DiscountYellow.svg";
import DiscountPurple from "../../assets/Images/DiscountPurple.svg";
import DiscountGreen from "../../assets/Images/DiscountGreen.svg";
import DiscountRed from "../../assets/Images/DiscountRed.svg";

export const discounts = [
  {
    name: "Discount 35% Off",
    offerDesc: "Special promo only valid for today!",
    discountSrc: <DiscountYellow />,
  },
  {
    name: "Special 25% Off",
    offerDesc: "Special Weekend Deals Promo",
    discountSrc: <DiscountPurple />,
  },
  {
    name: "Special 20% Off",
    offerDesc: "Special promo only valid for today!",
    discountSrc: <DiscountRed />,
  },
  {
    name: "Cashback 15%",
    offerDesc: "Special Week Promo",
    discountSrc: <DiscountGreen />,
  },
  {
    name: "Discount 35% Off",
    offerDesc: "Special Weekend Deals Promo",
    discountSrc: <DiscountYellow />,
  },
  {
    name: "Cashback 15%",
    offerDesc: "New user special promo",
    discountSrc: <DiscountPurple />,
  },
];

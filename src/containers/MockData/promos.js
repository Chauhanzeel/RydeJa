import React from "react";
import DiscountYellow from "../../assets/Images/DiscountYellow.svg";
import DiscountPurple from "../../assets/Images/DiscountPurple.svg";
import DiscountGreen from "../../assets/Images/DiscountGreen.svg";
import DiscountRed from "../../assets/Images/DiscountRed.svg";

export const Promos = [
  {
    id: 1,
    name: "Special 25% Off",
    offerDesc: "Special promo only today!",
    discountSrc: <DiscountYellow />,
  },
  {
    id: 2,
    name: "Discount 30% Off",
    offerDesc: "SNew user special promo",
    discountSrc: <DiscountPurple />,
  },
  {
    id: 3,
    name: "Special 20% Off",
    offerDesc: "Special promo only today!",
    discountSrc: <DiscountRed />,
  },
  {
    id: 4,
    name: "Discount 40% Off",
    offerDesc: "Special promo only valid today",
    discountSrc: <DiscountGreen />,
  },
  {
    id: 5,
    name: "Discount 35% Off",
    offerDesc: "SSpecial promo only today!",
    discountSrc: <DiscountYellow />,
  },
];

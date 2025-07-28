import React from "react";
import { Link } from "react-router-dom";

export default function CategoryBox({ img, discount, title, price }) {
  return (
<div className="relative w-full h-full min-h-[500px] rounded-lg overflow-hidden shadow-md group cursor-pointer">
      <img src={img} alt={title}className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"/>
      <div className="absolute inset-0  bg-opacity-40 flex flex-col justify-center items-start p-6 text-white">
        <span className="bg-bgColor px-3 py-1 rounded-full font-semibold text-sm mb-2">
          Exclusive Offer {discount}%
        </span>
        <Link to="/" className="inline-block bg-mainColor hover:bg-mainColor-dark transition-colors px-5 py-2 rounded-md font-semibold">
          Shop Deals Now
        </Link>
      </div>
    </div>
  );
}

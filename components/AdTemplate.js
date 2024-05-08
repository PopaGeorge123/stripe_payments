"use client"

import Link from "next/link";
import React from "react";

const AdComponent = ({ ad , index}) => {
    return (
      <div className="flex items-center justify-between bg-gray-100 py-1">
        <div className="flex">
        <h1 className="text-xl font-bold text-left my-5 mx-5">{index+1}</h1>
          <img
            className="object-cover mx-1 w-32 h-32 rounded-lg"
            src={ad.imageUrl}
            alt="current ranked"
            width="10"
            height="10"
          />
        </div>
        <h1 className="text-xl font-bold text-center">{ad.title}</h1>
        <Link className="bg-pink-500 text-white px-2 py-2 rounded-lg uppercase font-bold text-sm hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500"
          href={ad.url}
        >
          Visit
        </Link>
      </div>
    );
  };
  
    export default AdComponent;
"use client"

import React from "react";

const AdComponent = ({ ad }) => {
    return (
      <div className="flex items-center justify-between bg-gray-100 p-8">
        <div className="flex-none mr-8">
          <img
            className="object-cover w-32 h-32 rounded-lg"
            src={ad.imageUrl}
            alt="current ranked"
            width={100}
            height={100}
          />
        </div>
        <h1 className="text-4xl font-bold text-center">{ad.title}</h1>
        <button className="bg-pink-500 text-white px-2 py-2 rounded-lg uppercase font-bold text-lg hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500">
          Visit this Website
        </button>
      </div>
    );
  };
  
    export default AdComponent;
"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ViewsIcn from '../public/assets/images/views-img.svg';
import VisitsIcn from '../public/assets/images/visits.svg';
import downArrow from '../public/assets/images/down.svg';

import AdTemplate from '@/components/AdTemplate';

const CurrentPost = () => {
  const [opened, setOpened] = useState(false);
  const [openedBuyers, setOpenedBuyers] = useState(false);
  const [currentAdCfg, setCurrentAdCfg] = useState({});
  const [currentAd, setCurrentAd] = useState({});
  const [allAds, setAllAds] = useState([]);

  useEffect(() => {
    const fetchCurrentAd = async () => {
      const res = await fetch('/api/ads/current');
      const data = await res.json();
      //console.log("DATA FROM SERVER:", data.data);
      setCurrentAdCfg(data.data[0]);
      setCurrentAd(data.data[1]);
      setAllAds(data.data[2]);
    };
    fetchCurrentAd();
  }, []);

  const updateLinkVisited = async () => {
    try {
      const res = await fetch('/api/ads/update', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          update: "currentAdAccesses"
        })
      });
  
      if (!res.ok) {
        throw new Error('Failed to update link visited');
      }
      const data = await res.json();
      console.log("DATA FROM SERVER:", data);
    } catch (error) {
      console.error('Error updating link visited:', error);
    }
  };
  
  

  return (
    <div>
      <h1 className='text-center text-6xl'>#{currentAdCfg.currentAdCount}</h1>
      <div className="my-5 mx-auto px-4 md:max-w-3xl lg:max-w-4xl border rounded-md">
        <h1 className='text-center font-mono text-xl'>{currentAd.title}</h1>
        <div className='flex justify-center items-center'>
          {currentAd.imageUrl &&
          <Image 
            className='object-cover mx-5 my-5'
            src={currentAd.imageUrl}
            alt='current ranked'
            width='350'
            height='350'
          />
          }
        </div>
        {currentAd.url && (
          <div className="flex justify-center">
            <Link onClick={updateLinkVisited} href={currentAd.url} className='rounded bg-purple-700 px-2 py-2 text-white text-center'>
              Visit Website
            </Link>
          </div>
        )}
        <div className="flex pb-2" 
          onClick={()=>setOpened(!opened)}
          style={{ cursor: "pointer" }}
        >
          <Image 
              className='object-cover mx-1'
              src={ViewsIcn}
              alt='current ranked'
              width='20'
              height='20'
            />
            <h1 className='text-slate-500 mx-1'>{currentAdCfg.currentAdViews}</h1>
            <h1 className='text-slate-500'>views</h1>
            <Image 
                className='object-cover ml-3'
                src={VisitsIcn}
                alt='current ranked'
                width='24'
                height='24'
              />
            <h1 className='text-slate-500 mx-1'>{currentAdCfg.currentAdAccesses}</h1>
            <h1 className='text-slate-500'>views</h1>
        </div>
        {opened && (
          <div className="my-5 mx-auto px-4 md:max-w-3xl lg:max-w-4xl border rounded-md bg-slate-100">
            <div className='flex my-2'>
              <Image 
                className='object-cover mx-1'
                src={ViewsIcn}
                alt='current ranked'
                width='20'
                height='20'
              />
              <h1 className='mx-1'>show how many people saw your advertisement</h1>
            </div>
            <div className='flex my-2'>
              <Image 
                className='object-cover mx-1'
                src={VisitsIcn}
                alt='current ranked'
                width='22'
                height='22'
              />
              <h1 className='mx-1'>show how many people visited your advertisement</h1>
            </div>
          </div>
        )}
        <div className="flex pb-2" 
          onClick={()=>setOpenedBuyers(!openedBuyers)}
          style={{ cursor: "pointer" }}
        >
          <Image 
            className='object-cover mx-1'
            src={downArrow}
            alt='current ranked'
            width='24'
            height='24'
          /> <h1 className='text-slate-500 mx-1'>All Buyers</h1>
        </div>
      </div>
      {openedBuyers && (
          <div className="my-5 mx-auto px-4 md:max-w-3xl lg:max-w-4xl border rounded-md bg-slate-100">
            <h1 className='text-center'>{openedBuyers == true?'Close':'All Buyers'}</h1>
            
            {allAds.map((ad, index) => (
              <AdTemplate key={index} ad={ad} />
            ))}

          </div>
        )}
    </div>
  );
};

export default CurrentPost;

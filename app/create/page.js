"use client"

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import Image from 'next/image';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function CreateAd() {
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [email, setEmail] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isValidUrl, setIsValidUrl] = useState(false);

  const validateUrl = (url) => {
    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlRegex.test(url);
  };

  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setImageUrl(url);
    setIsValidUrl(validateUrl(url));
  };

  const handleSubmit = async () => {

    if (!title || !url || !email || !imageUrl) {
      alert('No data provided');
      return;
    }

    if (!isValidUrl) {
      alert('Invalid image URL');
      return;
    }

    setUploading(true);

    try {
      const jsonObject = {
        title:  title,
        url:  url,
        email: email,
        imageUrl : imageUrl
      };

      const response = await fetch('/api/ads/create', {
        method: 'POST',
        body: JSON.stringify(jsonObject),
      });

      const data = await response.json();
      const stripe = await stripePromise;
      const { error } = await stripe.redirectToCheckout({
        sessionId: data.session.id,
      });

    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex-col mx-5 max-w-xl mt-8 p-6 bg-white shadow-md rounded-md">
        <h1 className="text-2xl font-bold mb-5">Upload your Ad</h1>

        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          placeholder="Your title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded-md"
        />

        <label htmlFor="url" className="block text-sm font-medium text-gray-700">
          URL
        </label>
        <input
          type="text"
          id="url"
          placeholder="Link to your website"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded-md"
        />

        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded-md"
        />

        <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
          Image URL
        </label>
        <input
          type="text"
          id="imageUrl"
          placeholder="Your image link"
          value={imageUrl}
          onChange={handleImageUrlChange}
          className="w-full px-4 py-2 mb-4 border rounded-md"
        />

        <button
          onClick={handleSubmit}
          disabled={uploading}
          className={`bg-blue-500 text-white px-4 py-2 rounded-md ${
            uploading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </div>

      <div className="flex-col mx-1 mt-8 p-6 bg-white shadow-md rounded-md mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-center">Preview your Ad image</h1>
        {!isValidUrl && <h1 className="text-sm mb-4 text-center mt-5 text-gray-400">No image added yet</h1>}
      {isValidUrl && (
        <Image
          className="object-cover my-5 border rounded-md"
          src={imageUrl}
          alt="No image found"
          width="500"
          height="500"
        />
      )}
      
      </div>
    </div>
  );
}

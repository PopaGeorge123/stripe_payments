"use client"

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

export default function CreateAd() {
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [email, setEmail] = useState('');
  const [imageUrl, setImageUrl] = useState('');


  const handleSubmit = async () => {

    if (!title || !url || !email || !imageUrl) {
      alert('No data provided');
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
    <div className="max-w-xl mx-auto mt-8 p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-4">Upload your Ad</h1>

      <label className='block text-sm font-medium text-gray-700'>Title</label>
      <input type='text' placeholder='Your title' value={title} onChange={(e) => setTitle(e.target.value)} className='w-full px-4 py-2 mb-4 border rounded-md' />

      <label className='block text-sm font-medium text-gray-700'>URL</label>
      <input type='text' placeholder='Link to your website' value={url} onChange={(e) => setUrl(e.target.value)} className='w-full px-4 py-2 mb-4 border rounded-md' />

      <label className='block text-sm font-medium text-gray-700'>Email</label>
      <input type='email' placeholder='Your email' value={email} onChange={(e) => setEmail(e.target.value)} className='w-full px-4 py-2 mb-4 border rounded-md' />
      
      <label className='block text-sm font-medium text-gray-700'>Image URL</label>
      <input type='email' placeholder='Your image link' value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className='w-full px-4 py-2 mb-4 border rounded-md' />
      
      <button
        onClick={handleSubmit}
        disabled={uploading}
        className={`bg-blue-500 text-white px-4 py-2 rounded-md ${uploading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>
    </div>
  );
}

'use client';
import { Ad } from './ad';
import { SanityDocument } from 'next-sanity';
import { useEffect, useState } from 'react';


const POSTS_QUERY = `*[
  _type == "ad"
]|order(publishedAt desc)[0...12]{
  _id,
  image,
  link
}`;

export const Ads = () => {
  const [ads, setAds] = useState<SanityDocument[]>([]);

  useEffect(() => {
    fetch('/api/sanity', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: POSTS_QUERY }),
    })
      .then((res) => res.json() as Promise<SanityDocument[]>)
      .then(setAds);
  }, []);



  if (ads?.length === 0) return <></>;

  return <Ad ads={ads} />;
};

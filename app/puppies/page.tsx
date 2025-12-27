// File: d:\my repo\poodleshub\client\app\puppies\page.tsx

import { puppiesApi, Puppy } from '../lib/api/puppies';
import { BondedPair } from '../data/puppies';
import { getSeoData, generateMetadataFromSeo } from '../lib/seo-helper';
import PuppiesClient from './PuppiesClient';

// Generate metadata for the page
export async function generateMetadata() {
  const seoData = await getSeoData('PAGE', 'puppies');
  
  if (!seoData) {
    return {
      title: 'Available Puppies | PuppyHub USA',
      description: 'Browse our selection of adorable, healthy puppies available for adoption at PuppyHub USA.'
    };
  }
  
  return generateMetadataFromSeo(seoData);
}

// Fetch initial data on the server
async function getPuppiesData() {
  try {
    const puppies = await puppiesApi.getAll();
    return {
      puppies,
      bondedPairs: [] // Add bonded pairs logic if needed
    };
  } catch (error) {
    console.error('Failed to fetch puppies:', error);
    return {
      puppies: [],
      bondedPairs: []
    };
  }
}

export default async function PuppiesPage() {
  const { puppies, bondedPairs } = await getPuppiesData();
  
  return <PuppiesClient initialPuppies={puppies} initialBondedPairs={bondedPairs} />;
}
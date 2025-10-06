
"use client";

import { useState, useEffect } from 'react';
import SolarStoryCard from './SolarStoryCard';

export default function SolarStoryLoader() {
  const [stormData, setStormData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/solar-story');
        
        if (!response.ok) {
          throw new Error(`Erro ${response.status}`);
        }
        
        const data = await response.json();
        setStormData(data.stormData);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <section className="w-full flex flex-col items-center justify-center space-y-6 mt-24 md:mt-32">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center">
        Latest News from the Sun
      </h2>
      <SolarStoryCard 
        stormData={stormData}
        isLoading={isLoading}
        error={error}
      />
    </section>
  );
}
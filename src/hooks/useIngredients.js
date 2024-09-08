// hooks/usePricePredictions.js

import { useState, useEffect } from 'react';
import { getPricePredictions } from '../api/pricePrediction';
import { ingredients } from '../types/ingredients';

const usePricePredictions = (date) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPricePredictions = async () => {
      try {
        // Replace with your actual API endpoint
        console.log("my date is ", date)
        const response = await getPricePredictions(date);

        // Add URL to each item based on the ingredient name
        const resultsWithUrls = response.results.map(item => ({
          ...item,
          url: ingredients[item.ingredient] || 'https://example.com/images/default.jpg' // Fallback URL
        }));

        setData({ results: resultsWithUrls });
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPricePredictions();
  }, [date]);

  return { data, loading, error };
};

export default usePricePredictions;

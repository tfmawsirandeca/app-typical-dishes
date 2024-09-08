import { useState, useEffect } from 'react';
import { getPricePredictions } from '../api/pricePrediction';
import { europeDishes } from '../types/dishesTypical';

const usePricePredictions = (date) => {
  const [dishesWithPrices, setDishesWithPrices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getPricePredictions(date);

        // Create a price map from the fetched data
        const priceMap = result.results.reduce((acc, item) => {
          acc[item.ingredient] = {
            price: item.price_forecasted,
            unit: item.measurement
          };
          return acc;
        }, {});

        // Calculate the price for each dish
        const calculatedDishes = Object.entries(europeDishes).map(([dishName, dishInfo]) => {
          let totalPrice = 0;

          if (dishInfo.ingredients) {
            totalPrice = Object.entries(dishInfo.ingredients).reduce((sum, [ingredient, quantity]) => {
              const cleanQuantity = parseFloat(quantity.replace(/[^\d.]/g, ''));
              const measurement = quantity.replace(/[0-9\s.]/g, '').trim();

              const ingredientInfo = priceMap[ingredient] || { price: 0, unit: '' };
              let ingredientPrice = ingredientInfo.price;
                 

              // Convert units if necessary
              if (measurement === 'g' && ingredientInfo.unit === 'kg') {
                ingredientPrice /= 1000; // Convert kg to g
              } else if (measurement === 'ml' && ingredientInfo.unit === 'L') {
                ingredientPrice /= 1000; // Convert L to ml
              } else if (measurement === 'kg' && ingredientInfo.unit === 'g') {
                ingredientPrice *= 1000; // Convert g to kg
              } else if (measurement === 'L' && ingredientInfo.unit === 'ml') {
                ingredientPrice *= 1000; // Convert ml to L
              }

              // console.log("ingredient is ", ingredient)
              // console.log("cleanQuantity is ", cleanQuantity)
              // console.log("ingredientPrice is ", ingredientPrice)
              const subtotal = ingredientPrice * cleanQuantity;
              // console.log("subtotal is ", subtotal)
              return sum + subtotal;
            }, 0);
          }

          return {
            name: dishName,
            url: dishInfo.url,
            description: dishInfo.description,
            price: totalPrice.toFixed(2), // Round price to two decimals
          };
        });

        setDishesWithPrices(calculatedDishes);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [date]);

  return { dishesWithPrices, loading, error };
};

export default usePricePredictions;

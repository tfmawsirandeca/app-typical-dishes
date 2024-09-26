// src/utils/calculateSalePrice.js

export const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};


// Helper function to normalize ingredient units and convert quantities
const normalizeAndConvert = (unit, quantity) => {
  switch (unit) {
    case "kg":
      return quantity.includes("g") ? parseFloat(quantity) / 1000 : parseFloat(quantity);
    case "L":
      return quantity.includes("ml") ? parseFloat(quantity) / 1000 : parseFloat(quantity);
    case "kg":
      return parseFloat(quantity) / 5000;
    case "kg":
      return parseFloat(quantity) / 100000;
    case "TONELADA":
      return parseFloat(quantity) / 1000000;
    case "UNIDAD":
      return parseFloat(quantity);
    default:
      return parseFloat(quantity);
  }
};

const calculateDishPrice = (ingredients, ingredientPrices) => {
  let totalPrice = 0;

  for (const [ingredient, portion] of Object.entries(ingredients)) {
    const priceInfo = ingredientPrices[ingredient.toUpperCase()];
    if (priceInfo) {
      let quantity = portion.toLowerCase();

      if (quantity.includes("al gusto")) continue;

      if (quantity.includes(" ")) {
        quantity = quantity.split(" ")[0];
      }

      const normalizedQuantity = normalizeAndConvert(priceInfo.unit, quantity);
      totalPrice += priceInfo.price * normalizedQuantity;
    }
  }

  return totalPrice;
};


// utils/util.js
export const getAvailableDates = () => {
  const dates = [];
  const today = new Date();
  
  // Get the last day of the current month
  const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  
  // Loop from today to the last day of the month
  for (let d = today; d <= lastDayOfMonth; d.setDate(d.getDate() + 1)) {
    const dateString = d.toISOString().split('T')[0]; // Format date as 'YYYY-MM-DD'
    dates.push({
      label: dateString,
      value: dateString,
    });
  }
  
  return dates;
};

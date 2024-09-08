import axios from "axios";
// import { API_URL } from "react-native-dotenv";

// Crear una instancia de Axios con configuración base
const api = axios.create({
  baseURL: "https://rseae398n6.execute-api.us-east-1.amazonaws.com/Prod",
});

// Función para obtener predicciones de precios
export const getPricePredictions = async (date) => {
  try {
    const response = await api.post(
      "/invoke",
      { date },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("API Error:", error);
    throw error; // Propagar el error para manejarlo en el componente
  }
};

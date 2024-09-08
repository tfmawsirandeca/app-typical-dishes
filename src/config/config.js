// src/config/config.js
import { config } from 'dotenv';

config();

export const API_BASE_URL = process.env.API_BASE_URL;

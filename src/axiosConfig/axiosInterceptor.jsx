// src/utils/axiosInterceptor.jsx
import axios from 'axios';
import { API_URL } from './config';

// Crear una instancia de Axios con configuración básica
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000, // Tiempo de espera en milisegundos (10 segundos)
});

// Interceptor de solicitudes (puedes agregar logs o headers si necesitas)
api.interceptors.request.use(
  config => {
    // No se agrega token, solo se retorna la configuración
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Interceptor de respuestas (puede ser útil para manejo de errores globales)
api.interceptors.response.use(
  response => response,
  error => {
    console.error('Error en la respuesta de la API:', error.message);
    return Promise.reject(error);
  }
);

export default api;

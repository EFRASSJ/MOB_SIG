import axios from 'axios';

class ApiService {
    constructor() {
        this.api = axios.create({
            baseURL: 'https://api.example.com', // Cambia esto por la URL base de tu API
            timeout: 10000, // Tiempo máximo de espera en milisegundos
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        });

        // Configurar interceptores
        this.api.interceptors.request.use(this.handleRequest, this.handleError);
        this.api.interceptors.response.use(this.handleResponse, this.handleError);
    }

    // Interceptor para solicitudes
    handleRequest(config) {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }

    // Interceptor para respuestas
    handleResponse(response) {
        return response;
    }

    // Manejo de errores global
    handleError(error) {
        if (error.response && error.response.status === 401) {
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }

    // Método para realizar solicitudes GET
    get(url, params = {}) {
        return this.api.get(url, { params });
    }

    // Método para realizar solicitudes POST
    post(url, data) {
        return this.api.post(url, data);
    }

    // Método para realizar solicitudes PUT
    put(url, data) {
        return this.api.put(url, data);
    }

    // Método para realizar solicitudes DELETE
    delete(url) {
        return this.api.delete(url);
    }
}

const apiService = new ApiService();
export default apiService;
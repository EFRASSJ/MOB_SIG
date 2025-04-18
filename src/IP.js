
import axios from "axios";


// Configura la URL base
  ip="192.168.0.125";

    const api = axios.create({

        baseURL: `http://${ip}:8080`, 
        headers:{
            "Content-Type": "application/json"
        },

      })  

export default api;

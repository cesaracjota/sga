import axios from "axios";
import { ToastChakra } from "../helpers/toast";

const baseURL = process.env.REACT_APP_API_URL;

// Register user
const register = async (userData) => {

    const response = await axios.post(`${baseURL}/usuarios`, userData);
    if(response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
        ToastChakra('Usuario registrado', 'Bienvenido a la plataforma', 'success', 2500);
    }

    return response.data;
}

// Login user
const login = async (userData) => {
    
        const response = await axios.post(`${baseURL}/login`, userData);

        if(response.data) {
            localStorage.setItem("user", JSON.stringify(response.data));
            ToastChakra('Bienvenido', 'Iniciando sesión', 'loading', 2500);
        }
    
        return response.data;
}

// Logout user
const logout = () => {
    ToastChakra('Cerrando sesión', 'Hasta pronto!', 'loading', 1000);
    localStorage.removeItem("user");
    // localStorage.removeItem("chakra-ui-color-mode");
    // window.location.reload();
}

const authService = {
    register,
    login,
    logout
}

export default authService;
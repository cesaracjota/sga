import axios from "axios";
import { ToastChakra } from "../helpers/toast";

const API_URL = process.env.REACT_APP_API_URL;

// Get libro

const getAllGrados = async () => {
    const response = await axios.get(`${API_URL}/grados`);
    return response.data;
}

const getGrado = async (id) => {
    const response = await axios.get(`${API_URL}/grados/${id}`);
    return response.data;
}

// Create grado

const createGrado = async (data, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-token': token
        }
    }
    const response = await axios.post(`${API_URL}/grados`, data, config);
    if (response.status === 201 || response.status === 200) {
        ToastChakra('GRADO REGISTRADO', 'El grado se ha creado correctamente', 'success', 1500, 'bottom');
        return response.data;
    }
}

// Update grado

const updateGrado = async (data, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-token': token
        }
    }
    const response = await axios.put(`${API_URL}/grados/${data._id}`, data, config);
    if (response.status === 200 || response.status === 201) {
        ToastChakra('GRADO MODIFICADO', 'El grado ha sido modificada correctamente', 'success', 1500, 'bottom');
    }
    return response.data;
}

// Delete grado

const deleteGrado = async (id, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-token': token
        }
    };
    const response = await axios.delete(`${API_URL}/grados/${id}`, config);
    if (response.status === 200 || response.status === 201) {
        ToastChakra('GRADO ELIMINADO', 'El grado se ha eliminado correctamente', 'success', 1500, 'bottom');
        return response.data;
    }
}

const gradoService = {
    getAllGrados,
    getGrado,
    createGrado,
    updateGrado,
    deleteGrado,
}

export default gradoService;
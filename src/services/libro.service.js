import axios from "axios";
import { ToastChakra } from "../helpers/toast";

const API_URL = process.env.REACT_APP_API_URL;

// Get libro

const getAllLibros = async () => {
    const response = await axios.get(`${API_URL}/libros`);
    return response.data;
}

const getLibro= async (id) => {
    const response = await axios.get(`${API_URL}/libros/${id}`);
    return response.data;
}

// Create libro

const createLibro = async (libroData, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-token': token
        }
    }
    const response = await axios.post(`${API_URL}/libros`, libroData, config);
    if (response.status === 201 || response.status === 200) {
        ToastChakra('LIBRO REGISTRADO', 'El libro se ha creado correctamente', 'success', 1500, 'bottom');
        return response.data;
    }
}

// Update libro

const updateLibro = async (libroData, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-token': token
        }
    }
    const response = await axios.put(`${API_URL}/libros/${libroData._id}`, libroData, config);
    if (response.status === 200 || response.status === 201) {
        ToastChakra('LIBRO MODIFICADO', 'El libro ha sido modificada correctamente', 'success', 1500, 'bottom');
    }
    return response.data;
}

// Delete libro

const deleteLibro = async (id, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-token': token
        }
    };
    const response = await axios.delete(`${API_URL}/libros/${id}`, config);
    if (response.status === 200 || response.status === 201) {
        ToastChakra('LIBRO ELIMINADO', 'El libro se ha eliminado correctamente', 'success', 1500, 'bottom');
        return response.data;
    }
}

const libroService = {
    getAllLibros,
    getLibro,
    createLibro,
    updateLibro,
    deleteLibro,
}

export default libroService;
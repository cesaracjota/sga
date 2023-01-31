import axios from "axios";
import { ToastChakra } from "../helpers/toast";

const API_URL = process.env.REACT_APP_API_URL;

const getAllPrestamoLibros = async () => {
    const response = await axios.get(`${API_URL}/prestamo_libros`);
    return response.data;
}

const getPrestamoLibro = async (id) => {
    const response = await axios.get(`${API_URL}/prestamo_libros/${id}`);
    return response.data;
}

const getLibroByCodigo = async (codigo) => {

    const response = await axios.get(`${API_URL}/prestamo_libros/libros/${codigo}`);

    return response.data;
}

const registrarPrestamoLibro = async (data, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-token': token
        }
    }

    const response = await axios.post(`${API_URL}/prestamo_libros`, data, config);
    
    if (response.status === 201 || response.status === 200) {
        ToastChakra('PRESTAMO DE LIBRO REGISTRADO', 'El registro de préstamo se ha creado correctamente', 'success', 1500, 'bottom');
    }

    return response.data;
}

const updatePrestamoLibro = async (data, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-token': token
        }
    }
    const response = await axios.put(`${API_URL}/prestamo_libros/${data._id}`, data, config);
    
    if (response.status === 200 || response.status === 201) {
        ToastChakra('DEVOLUCIÓN DE LIBRO REGISTRADO', 'La devolución de libro ha sido registrada correctamente', 'success', 1500, 'bottom');
    }

    return response.data;
}

const deletePrestamoLibro = async (id, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-token': token
        }
    };
    const response = await axios.delete(`${API_URL}/prestamo_libros/${id}`, config);
    if (response.status === 200 || response.status === 201) {
        ToastChakra('PRESTAMO DEL LIBRO ELIMINADO', 'El prestamo del libro se ha eliminado correctamente', 'success', 1500, 'bottom');
        return response.data;
    }
}

const prestamoLibroService = {
    getAllPrestamoLibros,
    getPrestamoLibro,
    getLibroByCodigo,
    registrarPrestamoLibro,
    updatePrestamoLibro,
    deletePrestamoLibro,
}

export default prestamoLibroService;
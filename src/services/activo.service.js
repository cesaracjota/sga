import axios from "axios";
import { ToastChakra } from "../helpers/toast";

const API_URL = process.env.REACT_APP_API_URL;

const getAllActivos = async () => {
    const response = await axios.get(`${API_URL}/activos`);
    return response.data;
}

const getActivo = async (id) => {
    const response = await axios.get(`${API_URL}/activos/${id}`);
    return response.data;
}

const createActivo = async (data, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-token': token
        }
    }
    const response = await axios.post(`${API_URL}/activos`, data, config);
    if (response.status === 201 || response.status === 200) {
        ToastChakra('ACTIVO / EQUIPO REGISTRADO', 'El activo / equipo se ha creado correctamente', 'success', 1500, 'bottom');
        return response.data;
    }
}

const updateActivo = async (data, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-token': token
        }
    }
    const response = await axios.put(`${API_URL}/activos/${data._id}`, data, config);
    if (response.status === 200 || response.status === 201) {
        ToastChakra('ACTIVO / EQUIPO MODIFICADO', 'El activo / activo ha sido modificada correctamente', 'success', 1500, 'bottom');
    }
    return response.data;
}

const deleteActivo = async (id, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-token': token
        }
    };
    const response = await axios.delete(`${API_URL}/activos/${id}`, config);
    if (response.status === 200 || response.status === 201) {
        ToastChakra('ACTIVO / EQUIPO ELIMINADO', 'El activo / activo se ha eliminado correctamente', 'success', 1500, 'bottom');
        return response.data;
    }
}

const activoService = {
    getAllActivos,
    getActivo,
    createActivo,
    updateActivo,
    deleteActivo,
}

export default activoService;
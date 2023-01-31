import axios from "axios";
import { ToastChakra } from "../helpers/toast";

const API_URL = process.env.REACT_APP_API_URL;

const getAllMapas = async () => {
    const response = await axios.get(`${API_URL}/mapas`);
    return response.data;
}

const getMapa = async (id) => {
    const response = await axios.get(`${API_URL}/mapas/${id}`);
    return response.data;
}

const createMapa = async (data, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-token': token
        }
    }
    const response = await axios.post(`${API_URL}/mapas`, data, config);
    
    if (response.status === 201 || response.status === 200) {
        ToastChakra('MAPA REGISTRADO', 'La mapa se ha creado correctamente', 'success', 1500, 'bottom');
    }

    return response.data;
}

const updateMapa = async (data, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-token': token
        }
    }
    const response = await axios.put(`${API_URL}/mapas/${data._id}`, data, config);
    if (response.status === 200 || response.status === 201) {
        ToastChakra('MAPA MODIFICADO', 'La mapa ha sido modificada correctamente', 'success', 1500, 'bottom');
    }
    return response.data;
}

const deleteMapa = async (id, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-token': token
        }
    };
    const response = await axios.delete(`${API_URL}/mapas/${id}`, config);
    if (response.status === 200 || response.status === 201) {
        ToastChakra('MAPA ELIMINADO', 'La mapa se ha eliminado correctamente', 'success', 1500, 'bottom');
        return response.data;
    }
}

const mapaService = {
    getAllMapas,
    getMapa,
    createMapa,
    updateMapa,
    deleteMapa,
}

export default mapaService;
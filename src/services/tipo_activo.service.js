import axios from "axios";
import { ToastChakra } from "../helpers/toast";

const API_URL = process.env.REACT_APP_API_URL;

const getAllTiposActivo = async () => {
    const response = await axios.get(`${API_URL}/tipos_activo`);
    return response.data;
}

const getTipoActivo = async (id) => {
    const response = await axios.get(`${API_URL}/tipos_activo/${id}`);
    return response.data;
}

const createTipoActivo = async (data, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-token': token
        }
    }
    const response = await axios.post(`${API_URL}/tipos_activo`, data, config);
    if (response.status === 201 || response.status === 200) {
        ToastChakra('CATEGORIA REGISTRADO', 'La categoria se ha creado correctamente', 'success', 1500, 'bottom');
        return response.data;
    }
}

const updateTipoActivo = async (data, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-token': token
        }
    }
    const response = await axios.put(`${API_URL}/tipos_activo/${data._id}`, data, config);
    if (response.status === 200 || response.status === 201) {
        ToastChakra('CATEGORIA MODIFICADO', 'La categoria ha sido modificada correctamente', 'success', 1500, 'bottom');
    }
    return response.data;
}

const deleteTipoActivo = async (id, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-token': token
        }
    };
    const response = await axios.delete(`${API_URL}/tipos_activo/${id}`, config);
    if (response.status === 200 || response.status === 201) {
        ToastChakra('CATEGORIA ELIMINADO', 'La categoria se ha eliminado correctamente', 'success', 1500, 'bottom');
        return response.data;
    }
}

const tipos_activoService = {
    getAllTiposActivo,
    getTipoActivo,
    createTipoActivo,
    updateTipoActivo,
    deleteTipoActivo,
}

export default tipos_activoService;
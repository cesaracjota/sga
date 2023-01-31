import axios from "axios";
import { ToastChakra } from "../helpers/toast";

const API_URL = process.env.REACT_APP_API_URL;

const getAllUniformes = async () => {
    const response = await axios.get(`${API_URL}/uniformes`);
    return response.data;
}

const getUniforme = async (id) => {
    const response = await axios.get(`${API_URL}/uniformes/${id}`);
    return response.data;
}

const createUniforme = async (data, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-token': token
        }
    }
    const response = await axios.post(`${API_URL}/uniformes`, data, config);
    if (response.status === 201 || response.status === 200) {
        ToastChakra('ARTICULO REGISTRADO', 'El articulo se ha creado correctamente', 'success', 1500, 'bottom');
        return response.data;
    }
}

const updateUniforme = async (data, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-token': token
        }
    }
    const response = await axios.put(`${API_URL}/uniformes/${data._id}`, data, config);
    if (response.status === 200 || response.status === 201) {
        ToastChakra('ARTICULO MODIFICADO', 'El articulo ha sido modificada correctamente', 'success', 1500, 'bottom');
    }
    return response.data;
}

const deleteUniforme = async (id, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-token': token
        }
    };
    const response = await axios.delete(`${API_URL}/uniformes/${id}`, config);
    if (response.status === 200 || response.status === 201) {
        ToastChakra('ARTICULO ELIMINADO', 'El articulo se ha eliminado correctamente', 'success', 1500, 'bottom');
        return response.data;
    }
}

const uniformeService = {
    getAllUniformes,
    getUniforme,
    createUniforme,
    updateUniforme,
    deleteUniforme,
}

export default uniformeService;
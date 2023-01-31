import axios from "axios";
import { ToastChakra } from "../helpers/toast";

const API_URL = process.env.REACT_APP_API_URL;

const getAllCategoriasUniforme = async () => {
    const response = await axios.get(`${API_URL}/categoria_uniforme`);
    return response.data;
}

const getCategoriaUniforme = async (id) => {
    const response = await axios.get(`${API_URL}/categoria_uniforme/${id}`);
    return response.data;
}

const createCategoriaUniforme = async (data, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-token': token
        }
    }
    const response = await axios.post(`${API_URL}/categoria_uniforme`, data, config);
    if (response.status === 201 || response.status === 200) {
        ToastChakra('CATEGORIA REGISTRADO', 'La categoria se ha creado correctamente', 'success', 1500, 'bottom');
        return response.data;
    }
}

const updateCategoriaUniforme = async (data, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-token': token
        }
    }
    const response = await axios.put(`${API_URL}/categoria_uniforme/${data._id}`, data, config);
    if (response.status === 200 || response.status === 201) {
        ToastChakra('CATEGORIA MODIFICADO', 'La categoria ha sido modificada correctamente', 'success', 1500, 'bottom');
    }
    return response.data;
}

const deleteCategoriaUniforme = async (id, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-token': token
        }
    };
    const response = await axios.delete(`${API_URL}/categoria_uniforme/${id}`, config);
    if (response.status === 200 || response.status === 201) {
        ToastChakra('CATEGORIA ELIMINADO', 'La categoria se ha eliminado correctamente', 'success', 1500, 'bottom');
        return response.data;
    }
}

const categoriaUniformeService = {
    getAllCategoriasUniforme,
    getCategoriaUniforme,
    createCategoriaUniforme,
    updateCategoriaUniforme,
    deleteCategoriaUniforme,
}

export default categoriaUniformeService;
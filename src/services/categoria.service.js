import axios from "axios";
import { ToastChakra } from "../helpers/toast";

const API_URL = process.env.REACT_APP_API_URL;

// Get category

const getAllCategories = async () => {
    const response = await axios.get(`${API_URL}/categorias`);
    return response.data;
}

const getCategory = async (id) => {
    const response = await axios.get(`${API_URL}/categorias/${id}`);
    return response.data;
}

// Create category

const createCategory = async (categoryData, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-token': token
        }
    }
    const response = await axios.post(`${API_URL}/categorias`, categoryData, config);
    if (response.status === 201 || response.status === 200) {
        ToastChakra('CATEGORIA CREADA', 'La categoria se ha creado correctamente', 'success', 1500, 'bottom');
        return response.data;
    }
}

// Update category

const updateCategory = async (categoryData, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-token': token
        }
    }
    const response = await axios.put(`${API_URL}/categorias/${categoryData._id}`, categoryData, config);
    if (response.status === 200 || response.status === 201) {
        ToastChakra('CATEGORIA MODIFICADA', 'La categoria ha sido modificada correctamente', 'success', 1500, 'bottom');
    }
    return response.data;
}

// Delete category

const deleteCategory = async (id, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-token': token
        }
    };
    const response = await axios.delete(`${API_URL}/categorias/${id}`, config);
    if (response.status === 200 || response.status === 201) {
        ToastChakra('CATEGORIA ELIMINADA', 'La categoria se ha eliminado correctamente', 'success', 1500, 'bottom');
        return response.data;
    }
}

const categoryService = {
    getAllCategories,
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
}

export default categoryService;
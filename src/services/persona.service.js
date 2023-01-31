import axios from "axios";
import { ToastChakra } from "../helpers/toast";
// import { ToastChakra } from "../helpers/toast";

const baseURL = process.env.REACT_APP_API_URL;

// Get all phrases
const getAllUsuarios = async (token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-token': token
        },
    }
    const response = await axios.get(`${baseURL}/usuarios`, config);
    return response.data.usuarios;
}

// Get a specific user

const getUser = async (id, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-token': token
        },
    }
    const response = await axios.get(`${baseURL}/usuarios/${id}`, config);
    return response.data.usuario;
}

// Create a new user


const createUser = async (data, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-token': token
        },
    }
    const response = await axios.post(`${baseURL}/usuarios`, data, config);
    if (response.status === 200 || response.status === 201) {
        ToastChakra('USUARIO CREADO', 'El usuario se ha creado correctamente','success', 1500, 'bottom');
        return response.data.usuario;
    }
}

// Update a user


const updateUser = async (data, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-token': token
        },
    }
    const response = await axios.put(`${baseURL}/usuarios/${data.uid}`, data, config);
    if (response.status === 200 || response.status === 201) {
        ToastChakra('USUARIO MODIFICADO', 'El usuario se ha modificado correctamente','success', 1500, 'bottom');
        return response.data.usuario;
    }
}

// Delete a user


const deleteUser = async (id, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-token': token
        },
    }
    const response = await axios.delete(`${baseURL}/usuarios/${id}`, config);
    if (response.status === 200 || response.status === 201) {
        ToastChakra('USUARIO ELIMINADO', 'El usuario se ha eliminado correctamente','success', 1500, 'bottom');
        return response.data.usuario;
    }
}

const personaService = {
    getAllUsuarios,
    getUser,
    createUser,
    updateUser,
    deleteUser,
}

export default personaService;
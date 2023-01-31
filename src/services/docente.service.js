import axios from "axios";
import { ToastChakra } from "../helpers/toast";

const API_URL = process.env.REACT_APP_API_URL;

const getAllDocentes = async () => {
    const response = await axios.get(`${API_URL}/docentes`);
    return response.data;
}

const getDocente = async (id) => {
    const response = await axios.get(`${API_URL}/docentes/${id}`);
    return response.data;
}

const getDocenteByDni = async (dni) => {
    const response = await axios.get(`${API_URL}/docentes/dni/${dni}`);
    return response.data;
}

// Create Docente

const createDocente = async (data, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-token': token
        }
    }
    const response = await axios.post(`${API_URL}/docentes`, data, config);
    if (response.status === 201 || response.status === 200) {
        ToastChakra('DOCENTE REGISTRADO', 'El registro se ha creado correctamente', 'success', 1500, 'bottom');
        return response.data;
    }
}

// Update Docente

const updateDocente = async (data, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-token': token
        }
    }
    const response = await axios.put(`${API_URL}/docentes/${data._id}`, data, config);
    
    if (response.status === 200 || response.status === 201) {
        ToastChakra('DOCENTE MODIFICADO', 'El registro ha sido modificada correctamente', 'success', 1500, 'bottom');
    }

    return response.data;
}

// Delete Docente

const deleteDocente = async (id, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-token': token
        }
    };
    const response = await axios.delete(`${API_URL}/docentes/${id}`, config);
    if (response.status === 200 || response.status === 201) {
        ToastChakra('DOCENTE ELIMINADO', 'El registro se ha eliminado correctamente', 'success', 1500, 'bottom');
        return response.data;
    }
}

const docenteService = {
    getAllDocentes,
    getDocente,
    createDocente,
    updateDocente,
    deleteDocente,
    getDocenteByDni,
}

export default docenteService;
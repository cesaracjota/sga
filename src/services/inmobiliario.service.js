import axios from "axios";
import { ToastChakra } from "../helpers/toast";

const API_URL = process.env.REACT_APP_API_URL;

const GETALL = async () => {
    const response = await axios.get(`${API_URL}/inmobiliarios`);
    return response.data;
}

const GET = async (id) => {
    const response = await axios.get(`${API_URL}/inmobiliarios/${id}`);
    return response.data;
}

const CREATE = async (data, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-token': token
        }
    }
    const response = await axios.post(`${API_URL}/inmobiliarios`, data, config);
    if (response.status === 201 || response.status === 200) {
        ToastChakra('INMOBILIARIO REGISTRADO', 'El inmobiliario se ha creado correctamente', 'success', 1500, 'bottom');
        return response.data;
    }
}

const UPDATE = async (data, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-token': token
        }
    }
    const response = await axios.put(`${API_URL}/inmobiliarios/${data._id}`, data, config);
    if (response.status === 200 || response.status === 201) {
        ToastChakra('INMOBILIARIO MODIFICADO', 'El inmobiliario ha sido modificada correctamente', 'success', 1500, 'bottom');
    }
    return response.data;
}

const DELETE = async (id, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-token': token
        }
    };
    const response = await axios.delete(`${API_URL}/inmobiliarios/${id}`, config);
    if (response.status === 200 || response.status === 201) {
        ToastChakra('INMOBILIARIO ELIMINADO', 'El inmobiliario se ha eliminado correctamente', 'success', 1500, 'bottom');
        return response.data;
    }
}

const inmobiliarioService = {
    GETALL,
    GET,
    CREATE,
    UPDATE,
    DELETE,
}

export default inmobiliarioService;
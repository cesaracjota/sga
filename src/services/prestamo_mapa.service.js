import axios from "axios";
import { ToastChakra } from "../helpers/toast";

const API_URL = process.env.REACT_APP_API_URL;

const GETALL = async () => {
    const response = await axios.get(`${API_URL}/prestamo_mapas`);
    return response.data;
}

const GET = async (id) => {
    const response = await axios.get(`${API_URL}/prestamo_mapas/${id}`);
    return response.data;
}

const GETBYCODIGO = async (codigo) => {

    const response = await axios.get(`${API_URL}/prestamo_mapas/mapas/${codigo}`);

    return response.data;
}

const REGISTER = async (data, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-token': token
        }
    }

    const response = await axios.post(`${API_URL}/prestamo_mapas`, data, config);
    
    if (response.status === 201 || response.status === 200) {
        ToastChakra('PRESTAMO DE MAPAS REGISTRADO', 'El registro de mapas se ha creado correctamente', 'success', 1500, 'bottom');
    }

    return response.data;
}

const UPDATE = async (data, token) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            'x-token': token
        }
    }
    const response = await axios.put(`${API_URL}/prestamo_mapas/${data._id}`, data, config);
    
    if (response.status === 200 || response.status === 201) {
        ToastChakra('DEVOLUCIÓN DE MAPA REGISTRADO', 'La devolución de la mapa ha sido registrada correctamente', 'success', 1500, 'bottom');
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
    const response = await axios.delete(`${API_URL}/prestamo_mapas/${id}`, config);
    if (response.status === 200 || response.status === 201) {
        ToastChakra('PRESTAMO DE LA MAPA ELIMINADO', 'El prestamo de la mapa se ha eliminado correctamente', 'success', 1500, 'bottom');
        return response.data;
    }
}

const prestamoMapaService = {
    GETALL,
    GET,
    GETBYCODIGO,
    REGISTER,
    UPDATE,
    DELETE,
}

export default prestamoMapaService;